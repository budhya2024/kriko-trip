"use client";

import React, { useState, useMemo } from "react";
import { SlidersHorizontal, Search, RefreshCw } from "lucide-react";
import FilterSidebar from "./FilterSidebar";
import PackageCard from "./PackageCard";
import { initialTourPackages } from "./data";
import { SortOption, TourPackage } from "./types";

export default function TourPackagesContent() {
  const [selectedTravelType, setSelectedTravelType] = useState<string | null>(null);
  const [selectedBudget, setSelectedBudget] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>("popular");
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Filter and Sort Logic
  const filteredPackages = useMemo(() => {
    let result = [...initialTourPackages];

    // Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.location.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    // Travel Type Filter
    if (selectedTravelType) {
      result = result.filter((p) => p.travelType === selectedTravelType);
    }

    // Budget Filter
    if (selectedBudget) {
      if (selectedBudget === "under-500") {
        result = result.filter((p) => p.price < 500);
      } else if (selectedBudget === "500-800") {
        result = result.filter((p) => p.price >= 500 && p.price <= 800);
      } else if (selectedBudget === "800-plus") {
        result = result.filter((p) => p.price > 800);
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
  }, [searchQuery, selectedTravelType, selectedBudget, sortBy]);

  const handleClearAll = () => {
    setSelectedTravelType(null);
    setSelectedBudget(null);
    setSortBy("popular");
    setSearchQuery("");
  };

  const activeFiltersCount =
    (selectedTravelType ? 1 : 0) + (selectedBudget ? 1 : 0) + (searchQuery ? 1 : 0);

  return (
    <section className="w-full bg-[#f8f9fb] py-10 sm:py-14 lg:py-16">
      <div className="container">
        {/* ─── Top Bar: Search & Mobile Filter Toggle ─── */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-8">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search destination, package or keywords..."
              className="w-full bg-white border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-[#1877F2] focus:ring-2 focus:ring-blue-100 transition-all shadow-xs"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-gray-400 hover:text-gray-600"
              >
                Clear
              </button>
            )}
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-3">
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
              className="lg:hidden inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-gray-800 text-xs sm:text-sm font-semibold shadow-xs hover:bg-gray-50 transition-colors"
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
        </div>

        {/* ─── Active Filter Badges ─── */}
        {activeFiltersCount > 0 && (
          <div className="flex flex-wrap items-center gap-2 mb-6 animate-in fade-in">
            <span className="text-xs font-semibold text-gray-400">
              Active Filters:
            </span>

            {selectedTravelType && (
              <button
                type="button"
                onClick={() => setSelectedTravelType(null)}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#1877F2] text-xs font-semibold hover:bg-blue-100 transition-colors"
              >
                <span>Type: {selectedTravelType}</span>
                <span className="text-sm font-bold">×</span>
              </button>
            )}

            {selectedBudget && (
              <button
                type="button"
                onClick={() => setSelectedBudget(null)}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#1877F2] text-xs font-semibold hover:bg-blue-100 transition-colors"
              >
                <span>Budget: {selectedBudget}</span>
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
            sortBy={sortBy}
            onChangeSortBy={setSortBy}
            onClearAll={handleClearAll}
            isMobileOpen={isMobileFilterOpen}
            onCloseMobile={() => setIsMobileFilterOpen(false)}
          />

          {/* Right Main Package Grid (3 Columns on Desktop) */}
          <div className="flex-1 w-full">
            {filteredPackages.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-7">
                {filteredPackages.map((pkg) => (
                  <PackageCard key={pkg.id} pkg={pkg} />
                ))}
              </div>
            ) : (
              /* Empty State */
              <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 shadow-sm max-w-md mx-auto my-12">
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
                  className="mt-5 inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#1877F2] hover:bg-blue-600 text-white text-xs sm:text-sm font-semibold transition-all shadow-sm"
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

