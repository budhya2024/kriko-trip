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
} from "lucide-react";
import { SortOption } from "./types";
import { useScrollLock } from "@/components/shared/useScrollLock";

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
}

const travelTypes = [
  { id: "Couple", label: "Couple", icon: User },
  { id: "Family", label: "Family", icon: Users },
  { id: "Honeymoon", label: "Honeymoon", icon: Heart },
  { id: "Leisure", label: "Leisure", icon: Palmtree },
  { id: "Adventure", label: "Adventure", icon: Mountain },
  { id: "Group", label: "Group", icon: Users2 },
];

const tourThemes = [
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

const destinationsList = [
  { id: "Kashmir", label: "Kashmir" },
  { id: "Gangtok", label: "Gangtok" },
  { id: "Sundarban", label: "Sundarban" },
  { id: "Kerala", label: "Kerala" },
  { id: "Andaman", label: "Andaman" },
  { id: "Lakshadweep", label: "Lakshadweep" },
  { id: "Manali", label: "Manali" },
  { id: "Rajasthan", label: "Rajasthan" },
  { id: "Goa", label: "Goa" },
  { id: "Meghalaya", label: "Meghalaya" },
];

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
}: FilterSidebarProps) {
  const [isTravelTypeOpen, setIsTravelTypeOpen] = useState(true);
  const [isThemeOpen, setIsThemeOpen] = useState(true);
  const [isBudgetOpen, setIsBudgetOpen] = useState(true);
  const [isDestinationOpen, setIsDestinationOpen] = useState(true);
  const [isSortOpen, setIsSortOpen] = useState(false);

  useScrollLock(Boolean(isMobileOpen));

  const sortLabels: Record<SortOption, string> = {
    popular: "Most Popular",
    "price-low": "Price: Low to High",
    "price-high": "Price: High to Low",
    duration: "Longest Duration",
  };

  const content = (
    <div className="bg-white rounded-2xl border border-gray-200/80 shadow-2xs p-5 sm:p-6 flex flex-col gap-6">
      {/* ─── Top Header: Filters & Clear All ─── */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-100">
        <div className="flex items-center gap-2.5">
          {/* Custom 3-line filter icon */}
          <svg
            className="w-4.5 h-4.5 text-gray-500"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          >
            <line x1="4" y1="7" x2="20" y2="7" />
            <line x1="7" y1="12" x2="17" y2="12" />
            <line x1="10" y1="17" x2="14" y2="17" />
          </svg>
          <h3 className="text-[16px] font-medium text-gray-700 tracking-tight">
            Filters
          </h3>
        </div>

        <button
          type="button"
          onClick={onClearAll}
          className="text-[13.5px] font-normal text-gray-400 hover:text-[#1877F2] transition-colors cursor-pointer"
        >
          Clear All
        </button>
      </div>

      {/* ─── Sort By Box with vertical divider ─── */}
      <div className="relative">
        <div className="flex items-center rounded-xl sm:rounded-2xl border border-gray-200/90 overflow-hidden bg-white text-[14px]">
          <div className="px-4 py-3 font-medium text-gray-600 border-r border-gray-200/90 select-none shrink-0 text-[13.5px]">
            Sort By
          </div>
          <button
            type="button"
            onClick={() => setIsSortOpen(!isSortOpen)}
            className="flex-1 px-4 py-3 flex items-center justify-between text-gray-600 hover:bg-gray-50/50 transition-colors cursor-pointer focus:outline-none"
          >
            <span className="truncate font-normal text-[13.5px]">
              {sortLabels[sortBy]}
            </span>
            <ChevronDown
              className={`w-4 h-4 text-gray-400 transition-transform ${
                isSortOpen ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>

        {/* Dropdown Menu */}
        {isSortOpen && (
          <div className="absolute top-full left-0 right-0 mt-1.5 bg-white border border-gray-200/90 rounded-xl shadow-lg z-20 py-1.5 animate-in fade-in duration-150">
            {(
              ["popular", "price-low", "price-high", "duration"] as SortOption[]
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
                    ? "bg-blue-50 text-[#1877F2] font-medium"
                    : "text-gray-600 hover:bg-gray-50 font-normal"
                }`}
              >
                {sortLabels[option]}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ─── Accordion 1: Travel Type ─── */}
      <div>
        <button
          type="button"
          onClick={() => setIsTravelTypeOpen(!isTravelTypeOpen)}
          className="w-full flex items-center justify-between text-left text-[15px] font-medium text-gray-700 mb-3.5 cursor-pointer focus:outline-none"
        >
          <span>Travel Type</span>
          {isTravelTypeOpen ? (
            <ChevronUp className="w-4 h-4 text-gray-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-400" />
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
                  className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-full border text-[13px] transition-all duration-150 cursor-pointer ${
                    isSelected
                      ? "border-[#1877F2] bg-blue-50/60 text-[#1877F2] font-medium shadow-2xs"
                      : "border-gray-200/90 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50/50 font-normal"
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 shrink-0 ${
                      isSelected ? "text-[#1877F2]" : "text-gray-500"
                    }`}
                    strokeWidth={1.5}
                  />
                  <span>{type.label}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* ─── Divider & Accordion: Tour Theme ─── */}
      <div className="border-t border-gray-100 pt-5">
        <button
          type="button"
          onClick={() => setIsThemeOpen(!isThemeOpen)}
          className="w-full flex items-center justify-between text-left text-[15px] font-medium text-gray-700 mb-3.5 cursor-pointer focus:outline-none"
        >
          <span>Tour Theme</span>
          {isThemeOpen ? (
            <ChevronUp className="w-4 h-4 text-gray-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-400" />
          )}
        </button>

        {isThemeOpen && (
          <div className="grid grid-cols-2 gap-2.5">
            {tourThemes.map((theme) => {
              const isSelected = selectedTheme === theme.id;
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
                      ? "border-[#1877F2] bg-blue-50/60 text-[#1877F2] font-medium shadow-2xs"
                      : "border-gray-200/90 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50/50 font-normal"
                  }`}
                >
                  <Icon
                    className={`w-3.5 h-3.5 shrink-0 ${
                      isSelected ? "text-[#1877F2]" : "text-gray-500"
                    }`}
                    strokeWidth={1.5}
                  />
                  <span className="truncate">{theme.label}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* ─── Divider & Accordion 2: Budget (Per Person) ─── */}
      <div className="border-t border-gray-100 pt-5">
        <button
          type="button"
          onClick={() => setIsBudgetOpen(!isBudgetOpen)}
          className="w-full flex items-center justify-between text-left text-[15px] font-medium text-gray-700 mb-3.5 cursor-pointer focus:outline-none"
        >
          <span>Budget (Per Person)</span>
          {isBudgetOpen ? (
            <ChevronUp className="w-4 h-4 text-gray-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-400" />
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
                  className={`py-2.5 px-3 rounded-full border text-[13px] transition-all duration-150 cursor-pointer text-center ${
                    isSelected
                      ? "border-[#1877F2] bg-blue-50/60 text-[#1877F2] font-medium shadow-2xs"
                      : "border-gray-200/90 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50/50 font-normal"
                  }`}
                >
                  <span>{b.label}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* ─── Divider & Accordion 3: Destination Filter ─── */}
      <div className="border-t border-gray-100 pt-5">
        <button
          type="button"
          onClick={() => setIsDestinationOpen(!isDestinationOpen)}
          className="w-full flex items-center justify-between text-left text-[15px] font-medium text-gray-700 mb-3.5 cursor-pointer focus:outline-none"
        >
          <span>Destination</span>
          {isDestinationOpen ? (
            <ChevronUp className="w-4 h-4 text-gray-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-400" />
          )}
        </button>

        {isDestinationOpen && (
          <div className="grid grid-cols-2 gap-2.5">
            {destinationsList.map((dest) => {
              const isSelected = selectedDestination === dest.id;
              return (
                <button
                  key={dest.id}
                  type="button"
                  onClick={() =>
                    onSelectDestination(isSelected ? null : dest.id)
                  }
                  className={`flex items-center justify-center gap-1.5 py-2.5 px-2.5 rounded-full border text-[13px] transition-all duration-150 cursor-pointer ${
                    isSelected
                      ? "border-[#1877F2] bg-blue-50/60 text-[#1877F2] font-medium shadow-2xs"
                      : "border-gray-200/90 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50/50 font-normal"
                  }`}
                >
                  <MapPin
                    className={`w-3.5 h-3.5 shrink-0 ${
                      isSelected ? "text-[#1877F2]" : "text-gray-400"
                    }`}
                    strokeWidth={1.5}
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
      {/* Desktop Sticky Sidebar */}
      <aside className="hidden lg:block w-72 xl:w-80 shrink-0 sticky top-28 self-start">
        {content}
      </aside>

      {/* Mobile Drawer Overlay */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-[120] lg:hidden flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
            onClick={onCloseMobile}
          />

          {/* Drawer Body */}
          <div className="relative w-full max-w-xs bg-white h-full overflow-y-auto p-4 z-10 shadow-2xl flex flex-col">
            <div className="flex items-center justify-between pb-3 mb-2 border-b border-gray-100">
              <span className="font-medium text-gray-700 text-base">Filters</span>
              <button
                type="button"
                onClick={onCloseMobile}
                className="p-1.5 rounded-full hover:bg-gray-100 text-gray-400"
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
