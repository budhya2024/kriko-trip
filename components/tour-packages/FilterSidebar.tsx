"use client";

import React, { useState } from "react";
import {
  SlidersHorizontal,
  ChevronDown,
  ChevronUp,
  User,
  Users,
  Heart,
  Palmtree,
  Mountain,
  Users2,
  X,
} from "lucide-react";
import { SortOption } from "./types";

interface FilterSidebarProps {
  selectedTravelType: string | null;
  onSelectTravelType: (type: string | null) => void;
  selectedBudget: string | null;
  onSelectBudget: (budget: string | null) => void;
  sortBy: SortOption;
  onChangeSortBy: (sort: SortOption) => void;
  onClearAll: () => void;
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
}

const travelTypes = [
  { id: "Couple", label: "Couple", icon: User },
  { id: "Family", label: "Family", icon: Users },
  { id: "Honeymoon", label: "Honeymoon", icon: Heart },
  { id: "Leisure", label: "Leisure", icon: Palmtree },
  { id: "Adventure", label: "Adventure", icon: Mountain },
  { id: "Group", label: "Group", icon: Users2 },
];

const budgetOptions = [
  { id: "all", label: "All Budgets" },
  { id: "under-500", label: "Under $500" },
  { id: "500-800", label: "$500 - $800" },
  { id: "800-plus", label: "$800+" },
];

export default function FilterSidebar({
  selectedTravelType,
  onSelectTravelType,
  selectedBudget,
  onSelectBudget,
  sortBy,
  onChangeSortBy,
  onClearAll,
  isMobileOpen,
  onCloseMobile,
}: FilterSidebarProps) {
  const [isTravelTypeOpen, setIsTravelTypeOpen] = useState(true);
  const [isBudgetOpen, setIsBudgetOpen] = useState(true);
  const [isSortOpen, setIsSortOpen] = useState(false);

  const sortLabels: Record<SortOption, string> = {
    popular: "Most Popular",
    "price-low": "Price: Low to High",
    "price-high": "Price: High to Low",
    duration: "Longest Duration",
  };

  const content = (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6 flex flex-col gap-6">
      {/* ─── Top Header: Filters & Clear All ─── */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-100">
        <div className="flex items-center gap-2.5">
          <SlidersHorizontal className="w-4 h-4 text-gray-900 stroke-[2.2]" />
          <h3 className="text-base sm:text-[17px] font-bold text-gray-950 tracking-tight">
            Filters
          </h3>
        </div>

        <button
          type="button"
          onClick={onClearAll}
          className="text-xs sm:text-[13px] font-semibold text-gray-400 hover:text-[#1877F2] transition-colors cursor-pointer"
        >
          Clear All
        </button>
      </div>

      {/* ─── Sort By Dropdown ─── */}
      <div className="relative">
        <div className="flex items-center justify-between border border-gray-200 rounded-xl px-3.5 py-2.5 bg-gray-50/50 hover:bg-gray-50 transition-colors">
          <span className="text-[13px] font-bold text-gray-900">Sort By</span>

          <button
            type="button"
            onClick={() => setIsSortOpen(!isSortOpen)}
            className="flex items-center gap-1.5 text-xs sm:text-[13px] font-medium text-gray-700 hover:text-[#1877F2] transition-colors cursor-pointer focus:outline-none"
          >
            <span>{sortLabels[sortBy]}</span>
            <ChevronDown className={`w-3.5 h-3.5 text-gray-500 transition-transform ${isSortOpen ? "rotate-180" : ""}`} />
          </button>
        </div>

        {/* Dropdown Menu */}
        {isSortOpen && (
          <div className="absolute top-full left-0 right-0 mt-1.5 bg-white border border-gray-200 rounded-xl shadow-lg z-20 py-1.5 animate-in fade-in duration-150">
            {(["popular", "price-low", "price-high", "duration"] as SortOption[]).map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => {
                  onChangeSortBy(option);
                  setIsSortOpen(false);
                }}
                className={`w-full text-left px-3.5 py-2 text-xs sm:text-[13px] transition-colors cursor-pointer ${
                  sortBy === option
                    ? "bg-blue-50 text-[#1877F2] font-semibold"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                {sortLabels[option]}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ─── Accordion: Travel Type ─── */}
      <div className="pb-4 border-b border-gray-100">
        <button
          type="button"
          onClick={() => setIsTravelTypeOpen(!isTravelTypeOpen)}
          className="w-full flex items-center justify-between text-left text-sm font-bold text-gray-950 mb-4 cursor-pointer focus:outline-none"
        >
          <span>Travel Type</span>
          {isTravelTypeOpen ? (
            <ChevronUp className="w-4 h-4 text-gray-500" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-500" />
          )}
        </button>

        {isTravelTypeOpen && (
          <div className="grid grid-cols-2 gap-2.5">
            {travelTypes.map((type) => {
              const isSelected = selectedTravelType === type.id;
              const Icon = type.icon;
              return (
                <button
                  key={type.id}
                  type="button"
                  onClick={() =>
                    onSelectTravelType(isSelected ? null : type.id)
                  }
                  className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl border text-xs sm:text-[13px] transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? "border-[#1877F2] bg-blue-50 text-[#1877F2] font-semibold shadow-xs"
                      : "border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50 font-medium"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 shrink-0" strokeWidth={2} />
                  <span>{type.label}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* ─── Accordion: Budget (Per Person) ─── */}
      <div>
        <button
          type="button"
          onClick={() => setIsBudgetOpen(!isBudgetOpen)}
          className="w-full flex items-center justify-between text-left text-sm font-bold text-gray-950 mb-4 cursor-pointer focus:outline-none"
        >
          <span>Budget (Per Person)</span>
          {isBudgetOpen ? (
            <ChevronUp className="w-4 h-4 text-gray-500" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-500" />
          )}
        </button>

        {isBudgetOpen && (
          <div className="flex flex-col gap-2">
            {budgetOptions.map((b) => {
              const isSelected =
                (!selectedBudget && b.id === "all") ||
                selectedBudget === b.id;
              return (
                <button
                  key={b.id}
                  type="button"
                  onClick={() =>
                    onSelectBudget(b.id === "all" ? null : b.id)
                  }
                  className={`w-full text-left px-3.5 py-2 rounded-lg text-xs sm:text-[13px] transition-all cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? "bg-blue-50 text-[#1877F2] font-semibold"
                      : "text-gray-600 hover:bg-gray-50 font-medium"
                  }`}
                >
                  <span>{b.label}</span>
                  {isSelected && (
                    <span className="w-2 h-2 rounded-full bg-[#1877F2]" />
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sticky Sidebar */}
      <aside className="hidden lg:block w-72 xl:w-80 shrink-0 sticky top-28 self-start">
        {content}
      </aside>

      {/* Mobile Drawer Overlay */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
            onClick={onCloseMobile}
          />

          {/* Drawer Body */}
          <div className="relative w-full max-w-xs bg-white h-full overflow-y-auto p-4 z-10 shadow-2xl flex flex-col">
            <div className="flex items-center justify-between pb-3 mb-2 border-b">
              <span className="font-bold text-gray-950 text-base">Filters</span>
              <button
                type="button"
                onClick={onCloseMobile}
                className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            {content}
          </div>
        </div>
      )}
    </>
  );
}

