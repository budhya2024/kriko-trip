"use client";

import React, { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  User,
  Users,
  Heart,
  Palmtree,
  Mountain,
  Users2,
  MapPin,
  X,
  Landmark,
  Trees,
  Compass,
  type LucideIcon,
} from "lucide-react";
import type { SortOption } from "./types";

export interface FilterOptionItem {
  id: string;
  label: string;
  slug?: string;
}

interface FilterSidebarProps {
  selectedTravelType: string | null;
  onSelectTravelType: (type: string | null) => void;
  selectedTheme: string | null;
  onSelectTheme: (theme: string | null) => void;
  selectedBudget: string | null;
  onSelectBudget: (budget: string | null) => void;
  selectedDestination: string | null;
  onSelectDestination: (dest: string | null) => void;
  sortBy: SortOption;
  onChangeSortBy: (sort: SortOption) => void;
  onClearAll: () => void;
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
  destinations?: FilterOptionItem[];
  themes?: FilterOptionItem[];
}

const defaultTravelTypes = [
  { id: "Couple", label: "Couple", icon: User },
  { id: "Family", label: "Family", icon: Users },
  { id: "Honeymoon", label: "Honeymoon", icon: Heart },
  { id: "Leisure", label: "Leisure", icon: Palmtree },
  { id: "Adventure", label: "Adventure", icon: Mountain },
  { id: "Group", label: "Group", icon: Users2 },
];

const defaultThemes = [
  { id: "Beaches", label: "Beaches & Islands", icon: Palmtree },
  { id: "Hills", label: "Hills & Mountains", icon: Mountain },
  { id: "Heritage", label: "Heritage & Palaces", icon: Landmark },
  { id: "Nature", label: "Nature & Wildlife", icon: Trees },
  { id: "Honeymoon", label: "Romantic Escapes", icon: Heart },
  { id: "Adventure", label: "Snow & Adventure", icon: Compass },
];

const budgetRanges = [
  { id: "0-20k", label: "₹0 - ₹20k" },
  { id: "20-40k", label: "₹20 - ₹40k" },
  { id: "40-60k", label: "₹40 - ₹60k" },
  { id: "60-80k", label: "₹60 - ₹80k" },
  { id: "above-80k", label: "Above ₹80k" },
];

const defaultDestinations = [
  { id: "Andaman", label: "Andaman" },
  { id: "Kashmir", label: "Kashmir" },
  { id: "Kerala", label: "Kerala" },
  { id: "Rajasthan", label: "Rajasthan" },
  { id: "Goa", label: "Goa" },
  { id: "Himachal", label: "Himachal" },
  { id: "Ladakh", label: "Ladakh" },
  { id: "Sundarban", label: "Sundarban" },
];

const getThemeIcon = (name: string): LucideIcon => {
  const lower = name.toLowerCase();
  if (lower.includes("beach") || lower.includes("island")) return Palmtree;
  if (lower.includes("hill") || lower.includes("mountain")) return Mountain;
  if (lower.includes("heritage") || lower.includes("palace") || lower.includes("culture")) return Landmark;
  if (lower.includes("nature") || lower.includes("wildlife")) return Trees;
  if (lower.includes("romantic") || lower.includes("honeymoon")) return Heart;
  return Compass;
};

export default function FilterSidebar({
  selectedTravelType,
  onSelectTravelType,
  selectedTheme,
  onSelectTheme,
  selectedBudget,
  onSelectBudget,
  selectedDestination,
  onSelectDestination,
  sortBy,
  onChangeSortBy,
  onClearAll,
  isMobileOpen,
  onCloseMobile,
  destinations,
  themes,
}: FilterSidebarProps) {
  const [isTravelTypeOpen, setIsTravelTypeOpen] = useState(true);
  const [isThemeOpen, setIsThemeOpen] = useState(true);
  const [isBudgetOpen, setIsBudgetOpen] = useState(true);
  const [isDestinationOpen, setIsDestinationOpen] = useState(true);
  const [isSortOpen, setIsSortOpen] = useState(false);

  const sortLabels: Record<SortOption, string> = {
    popular: "Most Popular",
    "price-low": "Price: Low to High",
    "price-high": "Price: High to Low",
    duration: "Longest Duration",
    newest: "Newest",
  };

  const activeDestinations =
    destinations && destinations.length > 0
      ? destinations.map((d) => ({ id: d.slug || d.label, label: d.label }))
      : defaultDestinations;

  const activeThemes =
    themes && themes.length > 0
      ? themes.map((t) => ({
          id: t.slug || t.label,
          label: t.label,
          icon: getThemeIcon(t.label),
        }))
      : defaultThemes;

  const content = (
    <div className="bg-white rounded-2xl border border-gray-200/90 shadow-xs p-5 sm:p-6 flex flex-col gap-6">
      <div className="flex items-center justify-between pb-4 border-b border-gray-150">
        <div className="flex items-center gap-2.5">
          <svg
            className="w-5 h-5 text-gray-800"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
          >
            <line x1="4" y1="7" x2="20" y2="7" />
            <line x1="7" y1="12" x2="17" y2="12" />
            <line x1="10" y1="17" x2="14" y2="17" />
          </svg>
          <h3 className="text-[17px] font-bold text-gray-950 tracking-tight">
            Filters
          </h3>
        </div>

        <button
          type="button"
          onClick={onClearAll}
          className="text-[14px] font-medium text-[#8E9BB0] hover:text-[#1877F2] transition-colors cursor-pointer"
        >
          Clear All
        </button>
      </div>

      <div className="relative">
        <div className="flex items-center rounded-xl sm:rounded-2xl border border-gray-200 overflow-hidden bg-white text-[14.5px]">
          <div className="px-5 py-3 font-bold text-gray-900 border-r border-gray-200 select-none shrink-0 text-[14px]">
            Sort By
          </div>
          <button
            type="button"
            onClick={() => setIsSortOpen(!isSortOpen)}
            className="flex-1 px-4 py-3 flex items-center justify-between text-gray-700 hover:bg-gray-50/50 transition-colors cursor-pointer focus:outline-none"
          >
            <span className="truncate font-medium text-[14px]">
              {sortLabels[sortBy] || sortLabels.popular}
            </span>
            <ChevronDown
              className={`w-4 h-4 text-gray-500 transition-transform ${
                isSortOpen ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>

        {isSortOpen && (
          <div className="absolute top-full left-0 right-0 mt-1.5 bg-white border border-gray-200 rounded-xl shadow-xl z-20 py-1.5 animate-in fade-in duration-150">
            {(
              ["popular", "price-low", "price-high", "duration", "newest"] as SortOption[]
            ).map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => {
                  onChangeSortBy(option);
                  setIsSortOpen(false);
                }}
                className={`w-full text-left px-4 py-2.5 text-[13.5px] transition-colors cursor-pointer ${
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

      <div>
        <button
          type="button"
          onClick={() => setIsTravelTypeOpen(!isTravelTypeOpen)}
          className="w-full flex items-center justify-between text-left text-[15.5px] font-bold text-gray-950 mb-3.5 cursor-pointer focus:outline-none"
        >
          <span>Travel Type</span>
          {isTravelTypeOpen ? (
            <ChevronUp className="w-4 h-4 text-gray-700" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-700" />
          )}
        </button>

        {isTravelTypeOpen && (
          <div className="grid grid-cols-2 gap-2.5">
            {defaultTravelTypes.map((type) => {
              const isSelected =
                selectedTravelType?.toLowerCase() === type.id.toLowerCase();
              const Icon = type.icon;
              return (
                <button
                  key={type.id}
                  type="button"
                  onClick={() =>
                    onSelectTravelType(isSelected ? null : type.id)
                  }
                  className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-full border text-[13.5px] transition-all duration-150 cursor-pointer ${
                    isSelected
                      ? "border-[#1877F2] bg-blue-50/60 text-[#1877F2] font-semibold shadow-xs"
                      : "border-gray-200 bg-white text-gray-800 hover:border-gray-300 hover:bg-gray-50/50 font-medium"
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 shrink-0 ${
                      isSelected ? "text-[#1877F2]" : "text-gray-700"
                    }`}
                    strokeWidth={1.8}
                  />
                  <span>{type.label}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      <div className="border-t border-gray-150 pt-5">
        <button
          type="button"
          onClick={() => setIsThemeOpen(!isThemeOpen)}
          className="w-full flex items-center justify-between text-left text-[15.5px] font-bold text-gray-950 mb-3.5 cursor-pointer focus:outline-none"
        >
          <span>Tour Theme</span>
          {isThemeOpen ? (
            <ChevronUp className="w-4 h-4 text-gray-700" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-700" />
          )}
        </button>

        {isThemeOpen && (
          <div className="grid grid-cols-2 gap-2.5">
            {activeThemes.map((theme) => {
              const isSelected =
                selectedTheme?.toLowerCase() === theme.id.toLowerCase() ||
                selectedTheme?.toLowerCase() === theme.label.toLowerCase();
              const Icon = theme.icon;
              return (
                <button
                  key={theme.id}
                  type="button"
                  onClick={() =>
                    onSelectTheme(isSelected ? null : theme.id)
                  }
                  className={`flex items-center justify-center gap-1.5 py-2.5 px-2.5 rounded-full border text-[13px] transition-all duration-150 cursor-pointer ${
                    isSelected
                      ? "border-[#1877F2] bg-blue-50/60 text-[#1877F2] font-semibold shadow-xs"
                      : "border-gray-200 bg-white text-gray-800 hover:border-gray-300 hover:bg-gray-50/50 font-medium"
                  }`}
                >
                  <Icon
                    className={`w-3.5 h-3.5 shrink-0 ${
                      isSelected ? "text-[#1877F2]" : "text-gray-700"
                    }`}
                    strokeWidth={1.8}
                  />
                  <span className="truncate">{theme.label}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      <div className="border-t border-gray-150 pt-5">
        <button
          type="button"
          onClick={() => setIsBudgetOpen(!isBudgetOpen)}
          className="w-full flex items-center justify-between text-left text-[15.5px] font-bold text-gray-950 mb-3.5 cursor-pointer focus:outline-none"
        >
          <span>Budget (Per Person)</span>
          {isBudgetOpen ? (
            <ChevronUp className="w-4 h-4 text-gray-700" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-700" />
          )}
        </button>

        {isBudgetOpen && (
          <div className="grid grid-cols-2 gap-2.5">
            {budgetRanges.map((b) => {
              const isSelected = selectedBudget === b.id;
              return (
                <button
                  key={b.id}
                  type="button"
                  onClick={() => onSelectBudget(isSelected ? null : b.id)}
                  className={`py-2.5 px-3 rounded-full border text-[13.5px] transition-all duration-150 cursor-pointer text-center ${
                    isSelected
                      ? "border-[#1877F2] bg-blue-50/60 text-[#1877F2] font-semibold shadow-xs"
                      : "border-gray-200 bg-white text-gray-800 hover:border-gray-300 hover:bg-gray-50/50 font-medium"
                  }`}
                >
                  <span>{b.label}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      <div className="border-t border-gray-150 pt-5">
        <button
          type="button"
          onClick={() => setIsDestinationOpen(!isDestinationOpen)}
          className="w-full flex items-center justify-between text-left text-[15.5px] font-bold text-gray-950 mb-3.5 cursor-pointer focus:outline-none"
        >
          <span>Destination</span>
          {isDestinationOpen ? (
            <ChevronUp className="w-4 h-4 text-gray-700" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-700" />
          )}
        </button>

        {isDestinationOpen && (
          <div className="grid grid-cols-2 gap-2.5 max-h-64 overflow-y-auto pr-1">
            {activeDestinations.map((dest) => {
              const isSelected =
                selectedDestination?.toLowerCase() === dest.id.toLowerCase() ||
                selectedDestination?.toLowerCase() === dest.label.toLowerCase();
              return (
                <button
                  key={dest.id}
                  type="button"
                  onClick={() =>
                    onSelectDestination(isSelected ? null : dest.id)
                  }
                  className={`flex items-center justify-center gap-1.5 py-2.5 px-2.5 rounded-full border text-[13px] transition-all duration-150 cursor-pointer ${
                    isSelected
                      ? "border-[#1877F2] bg-blue-50/60 text-[#1877F2] font-semibold shadow-xs"
                      : "border-gray-200 bg-white text-gray-800 hover:border-gray-300 hover:bg-gray-50/50 font-medium"
                  }`}
                >
                  <MapPin
                    className={`w-3.5 h-3.5 shrink-0 ${
                      isSelected ? "text-[#1877F2]" : "text-gray-500"
                    }`}
                  />
                  <span className="truncate">{dest.label}</span>
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
      <aside className="hidden lg:block w-72 xl:w-80 shrink-0 sticky top-28 self-start">
        {content}
      </aside>

      {isMobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
            onClick={onCloseMobile}
          />

          <div className="relative w-full max-w-xs bg-white h-full overflow-y-auto p-4 z-10 shadow-2xl flex flex-col">
            <div className="flex items-center justify-between pb-3 mb-2 border-b">
              <span className="font-bold text-gray-950 text-base">Filters</span>
              <button
                type="button"
                onClick={onCloseMobile}
                className="p-1.5 rounded-full hover:bg-gray-100 text-gray-500"
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
