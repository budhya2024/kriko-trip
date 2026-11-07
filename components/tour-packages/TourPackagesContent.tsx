"use client";

import React, { useState, useMemo } from "react";
import { SlidersHorizontal, Search, RefreshCw } from "lucide-react";
import FilterSidebar from "./FilterSidebar";
import PackageCard from "./PackageCard";
import { initialTourPackages } from "./data";
import { SortOption } from "./types";

export default function TourPackagesContent() {
  const [selectedTravelType, setSelectedTravelType] = useState<string | null>(null);
  const [selectedBudget, setSelectedBudget] = useState<string | null>(null);
  const [selectedDestination, setSelectedDestination] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>("popular");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Filter and Sort Logic
  const filteredPackages = useMemo(() => {
    let result = [...initialTourPackages];

    // Travel Type Filter
    if (selectedTravelType) {
      result = result.filter((p) => p.travelType === selectedTravelType);
    }

    // Destination Filter
    if (selectedDestination) {
      result = result.filter(
        (p) =>
          p.destination.toLowerCase() === selectedDestination.toLowerCase() ||
          p.location.toLowerCase().includes(selectedDestination.toLowerCase())
      );
    }

    // Budget Filter (INR matching reference screenshot)
    if (selectedBudget) {
      if (selectedBudget === "0-20k") {
        result = result.filter((p) => p.price <= 20000);
      } else if (selectedBudget === "20-40k") {
        result = result.filter((p) => p.price > 20000 && p.price <= 40000);
      } else if (selectedBudget === "40-60k") {
        result = result.filter((p) => p.price > 40000 && p.price <= 60000);
      } else if (selectedBudget === "60-80k") {
        result = result.filter((p) => p.price > 60000 && p.price <= 80000);
      } else if (selectedBudget === "above-80k") {
        result = result.filter((p) => p.price > 80000);
      }
    }

    // Sorting
    if (sortBy === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "duration") {
      result.sort((a, b) => b.days - a.days);
    } else {
      // Popular (rating * reviewsCount)
      result.sort((a, b) => b.rating * b.reviewsCount - a.rating * a.reviewsCount);
    }

    return result;
  }, [selectedTravelType, selectedBudget, selectedDestination, sortBy]);

  const handleClearAll = () => {
    setSelectedTravelType(null);
    setSelectedBudget(null);
    setSelectedDestination(null);
    setSortBy("popular");
  };

  const activeFiltersCount =
    (selectedTravelType ? 1 : 0) +
    (selectedBudget ? 1 : 0) +
    (selectedDestination ? 1 : 0);

  const budgetLabelMap: Record<string, string> = {
    "0-20k": "₹0 - ₹20k",
    "20-40k": "₹20 - ₹40k",
    "40-60k": "₹40 - ₹60k",
    "60-80k": "₹60 - ₹80k",
    "above-80k": "Above ₹80k",
  };

  return (
    <section className="w-full bg-[#f8f9fb] py-10 sm:py-14 lg:py-16">
      <div className="container">
        {/* ─── Top Bar: Results Count & Mobile Filter Toggle ─── */}
        <div className="flex items-center justify-between gap-4 mb-6">
          {/* Results Count */}
          <span className="text-xs sm:text-sm font-semibold text-gray-600">
            Showing{" "}
            <strong className="text-gray-950 font-bold">
              {filteredPackages.length}
            </strong>{" "}
            Packages
          </span>

          {/* Mobile Filter Toggle Button */}
          <button
            type="button"
            onClick={() => setIsMobileFilterOpen(true)}
            className="lg:hidden inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-gray-200 bg-white text-gray-800 text-xs sm:text-sm font-semibold shadow-xs hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <SlidersHorizontal className="w-4 h-4 text-[#1877F2]" />
            <span>Filters</span>
            {activeFiltersCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-[#1877F2] text-white text-[11px] font-bold flex items-center justify-center">
                {activeFiltersCount}
              </span>
            )}
          </button>
        </div>

        {/* ─── Active Filter Badges ─── */}
        {activeFiltersCount > 0 && (
          <div className="flex flex-wrap items-center gap-2 mb-6 animate-in fade-in">
            <span className="text-xs font-semibold text-gray-400">
              Active Filters:
            </span>

            {selectedDestination && (
              <button
                type="button"
                onClick={() => setSelectedDestination(null)}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-[#1877F2] text-xs font-semibold hover:bg-blue-100 transition-colors"
              >
                <span>Dest: {selectedDestination}</span>
                <span className="text-sm font-bold">×</span>
              </button>
            )}

            {selectedTravelType && (
              <button
                type="button"
                onClick={() => setSelectedTravelType(null)}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-[#1877F2] text-xs font-semibold hover:bg-blue-100 transition-colors"
              >
                <span>Type: {selectedTravelType}</span>
                <span className="text-sm font-bold">×</span>
              </button>
            )}

            {selectedBudget && (
              <button
                type="button"
                onClick={() => setSelectedBudget(null)}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-[#1877F2] text-xs font-semibold hover:bg-blue-100 transition-colors"
              >
                <span>Budget: {budgetLabelMap[selectedBudget] || selectedBudget}</span>
                <span className="text-sm font-bold">×</span>
              </button>
            )}

            <button
              type="button"
              onClick={handleClearAll}
              className="text-xs text-red-500 hover:text-red-700 font-semibold underline underline-offset-2 ml-1 cursor-pointer"
            >
              Reset all
            </button>
          </div>
        )}

        {/* ─── Main Content Layout: Sidebar + Grid ─── */}
        <div className="flex flex-col lg:flex-row items-start gap-8">
          {/* Left Sidebar */}
          <FilterSidebar
            selectedTravelType={selectedTravelType}
            onSelectTravelType={setSelectedTravelType}
            selectedBudget={selectedBudget}
            onSelectBudget={setSelectedBudget}
            selectedDestination={selectedDestination}
            onSelectDestination={setSelectedDestination}
            sortBy={sortBy}
            onChangeSortBy={setSortBy}
            onClearAll={handleClearAll}
            isMobileOpen={isMobileFilterOpen}
            onCloseMobile={() => setIsMobileFilterOpen(false)}
          />

          {/* Right Main Package Grid (3 Columns on Desktop) */}
          <div className="flex-1 w-full">
            {filteredPackages.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {filteredPackages.map((pkg) => (
                  <PackageCard key={pkg.id} pkg={pkg} />
                ))}
              </div>
            ) : (
              /* Empty State */
              <div className="bg-white rounded-xl p-12 text-center border border-gray-100 shadow-xs max-w-md mx-auto my-12">
                <div className="w-16 h-16 rounded-full bg-blue-50 text-[#1877F2] flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 stroke-[1.8]" />
                </div>
                <h3 className="text-lg font-bold text-gray-950">
                  No Tour Packages Found
                </h3>
                <p className="text-sm text-gray-500 mt-2 leading-relaxed">
                  We couldn&apos;t find any packages matching your filter criteria. Try
                  resetting your filters.
                </p>
                <button
                  type="button"
                  onClick={handleClearAll}
                  className="mt-5 inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#1877F2] hover:bg-blue-600 text-white text-xs sm:text-sm font-semibold transition-all shadow-xs cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Reset All Filters</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
