"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SlidersHorizontal, Search, RefreshCw, ChevronLeft, ChevronRight } from "lucide-react";
import FilterSidebar, { type FilterOptionItem } from "./FilterSidebar";
import PackageCard from "./PackageCard";
import type { TourPackage, SortOption } from "./types";

interface TourPackagesContentProps {
  packages: TourPackage[];
  total: number;
  page: number;
  totalPages: number;
  destinations?: FilterOptionItem[];
  themes?: FilterOptionItem[];
  initialTravelType?: string | null;
  initialTheme?: string | null;
  initialBudget?: string | null;
  initialDestination?: string | null;
  initialSort?: SortOption;
}

export default function TourPackagesContent({
  packages,
  total,
  page,
  totalPages,
  destinations = [],
  themes = [],
  initialTravelType = null,
  initialTheme = null,
  initialBudget = null,
  initialDestination = null,
  initialSort = "popular",
}: TourPackagesContentProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const selectedTravelType = searchParams.get("type") || initialTravelType;
  const selectedTheme = searchParams.get("theme") || initialTheme;
  const selectedBudget = searchParams.get("budget") || initialBudget;
  const selectedDestination = searchParams.get("destination") || initialDestination;
  const sortBy = (searchParams.get("sort") as SortOption) || initialSort;

  const updateFilters = (updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("page");

    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === undefined || value === "") {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });

    const queryString = params.toString();
    router.push(queryString ? `/tour-packages?${queryString}` : "/tour-packages");
  };

  const handleSelectTravelType = (type: string | null) => {
    updateFilters({ type });
  };

  const handleSelectTheme = (theme: string | null) => {
    updateFilters({ theme });
  };

  const handleSelectBudget = (budget: string | null) => {
    updateFilters({ budget });
  };

  const handleSelectDestination = (dest: string | null) => {
    updateFilters({ destination: dest });
  };

  const handleChangeSortBy = (sort: SortOption) => {
    updateFilters({ sort });
  };

  const handleClearAll = () => {
    router.push("/tour-packages");
  };

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(newPage));
    router.push(`/tour-packages?${params.toString()}`);
  };

  const activeFiltersCount =
    (selectedTravelType ? 1 : 0) +
    (selectedTheme ? 1 : 0) +
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
        <div className="flex items-center justify-between gap-4 mb-6">
          <span className="text-xs sm:text-sm font-semibold text-gray-600">
            Showing{" "}
            <strong className="text-gray-950 font-bold">
              {packages.length}
            </strong>{" "}
            of{" "}
            <strong className="text-gray-950 font-bold">
              {total}
            </strong>{" "}
            Packages
          </span>

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

        {activeFiltersCount > 0 && (
          <div className="flex flex-wrap items-center gap-2 mb-6 animate-in fade-in">
            <span className="text-xs font-semibold text-gray-400">
              Active Filters:
            </span>

            {selectedDestination && (
              <button
                type="button"
                onClick={() => handleSelectDestination(null)}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-[#1877F2] text-xs font-semibold hover:bg-blue-100 transition-colors cursor-pointer"
              >
                <span>Dest: {selectedDestination}</span>
                <span className="text-sm font-bold">×</span>
              </button>
            )}

            {selectedTravelType && (
              <button
                type="button"
                onClick={() => handleSelectTravelType(null)}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-[#1877F2] text-xs font-semibold hover:bg-blue-100 transition-colors cursor-pointer"
              >
                <span>Type: {selectedTravelType}</span>
                <span className="text-sm font-bold">×</span>
              </button>
            )}

            {selectedTheme && (
              <button
                type="button"
                onClick={() => handleSelectTheme(null)}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-[#1877F2] text-xs font-semibold hover:bg-blue-100 transition-colors cursor-pointer"
              >
                <span>Theme: {selectedTheme}</span>
                <span className="text-sm font-bold">×</span>
              </button>
            )}

            {selectedBudget && (
              <button
                type="button"
                onClick={() => handleSelectBudget(null)}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-[#1877F2] text-xs font-semibold hover:bg-blue-100 transition-colors cursor-pointer"
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

        <div className="flex flex-col lg:flex-row items-start gap-8">
          <FilterSidebar
            selectedTravelType={selectedTravelType}
            onSelectTravelType={handleSelectTravelType}
            selectedTheme={selectedTheme}
            onSelectTheme={handleSelectTheme}
            selectedBudget={selectedBudget}
            onSelectBudget={handleSelectBudget}
            selectedDestination={selectedDestination}
            onSelectDestination={handleSelectDestination}
            sortBy={sortBy}
            onChangeSortBy={handleChangeSortBy}
            onClearAll={handleClearAll}
            isMobileOpen={isMobileFilterOpen}
            onCloseMobile={() => setIsMobileFilterOpen(false)}
            destinations={destinations}
            themes={themes}
          />

          <div className="flex-1 w-full">
            {packages.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {packages.map((pkg) => (
                    <PackageCard key={pkg.id} pkg={pkg} />
                  ))}
                </div>

                {totalPages > 1 && (
                  <div className="mt-10 flex items-center justify-center gap-2">
                    <button
                      type="button"
                      disabled={page <= 1}
                      onClick={() => handlePageChange(page - 1)}
                      className="p-2 rounded-full border border-gray-200 bg-white text-gray-700 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors cursor-pointer"
                      aria-label="Previous Page"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                      <button
                        key={p}
                        type="button"
                        onClick={() => handlePageChange(p)}
                        className={`w-9 h-9 rounded-full text-xs font-bold transition-colors cursor-pointer ${
                          p === page
                            ? "bg-[#1877F2] text-white shadow-xs"
                            : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        {p}
                      </button>
                    ))}

                    <button
                      type="button"
                      disabled={page >= totalPages}
                      onClick={() => handlePageChange(page + 1)}
                      className="p-2 rounded-full border border-gray-200 bg-white text-gray-700 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors cursor-pointer"
                      aria-label="Next Page"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </>
            ) : (
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
