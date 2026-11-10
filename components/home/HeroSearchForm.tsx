"use client";

import React, { useState } from "react";
import { Search, Check } from "lucide-react";
import { FaSuitcaseRolling, FaBed, FaPassport } from "react-icons/fa";
import BankingDatePicker from "@/components/shared/BankingDatePicker";

export default function HeroSearchForm() {
  const [activeTab, setActiveTab] = useState<"tours" | "hotels" | "visa" | "experience">("tours");

  // Field states
  const [selectedDestination, setSelectedDestination] = useState<string>("Select");
  const [isDestinationOpen, setIsDestinationOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<{
    day: string;
    year: string;
    raw: string;
  }>({
    day: "Select Date",
    year: "Date",
    raw: "",
  });
  const [isDateOpen, setIsDateOpen] = useState(false);
  const [selectedTourType, setSelectedTourType] = useState<string>("Select");
  const [isTourTypeOpen, setIsTourTypeOpen] = useState(false);

  const destinations = [
    "Andaman & Nicobar Islands",
    "Kashmir & Ladakh",
    "Goa Coastal Beaches",
    "Kerala Backwaters (Alleppey)",
    "Rajasthan (Jaipur & Udaipur)",
    "Himachal Pradesh (Manali & Shimla)",
    "Sundarban Tiger Reserve",
  ];

  const tourTypes = [
    "Adventure & Trekking",
    "Beach & Island Tour",
    "Cultural & Historic",
    "Honeymoon Special",
    "Luxury Cruise",
    "Wildlife Safari",
  ];

  return (
    <div className="w-full max-w-[1280px] mx-auto">
      {/* Category Tabs: Smooth scroll on mobile without awkward wrapping */}
      <div className="flex items-center gap-2 sm:gap-2.5 px-2 sm:px-6 -mb-3 relative z-30 overflow-x-auto scrollbar-none pb-1">
        {/* Tours Tab */}
        <button
          type="button"
          onClick={() => setActiveTab("tours")}
          className={`shrink-0 flex items-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full font-semibold text-xs sm:text-[15px] transition-all duration-200 cursor-pointer ${
            activeTab === "tours"
              ? "bg-[#1877F2] text-white shadow-md shadow-blue-500/20"
              : "bg-white text-gray-800 hover:bg-gray-50 shadow-sm"
          }`}
        >
          <FaSuitcaseRolling className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span>Tours</span>
        </button>

        {/* Hotels Tab */}
        <button
          type="button"
          onClick={() => setActiveTab("hotels")}
          className={`shrink-0 flex items-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full font-semibold text-xs sm:text-[15px] transition-all duration-200 cursor-pointer ${
            activeTab === "hotels"
              ? "bg-[#1877F2] text-white shadow-md shadow-blue-500/20"
              : "bg-white text-gray-800 hover:bg-gray-50 shadow-sm"
          }`}
        >
          <FaBed className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#C5943A]" />
          <span>Hotels</span>
        </button>

        {/* Visa Tab */}
        <button
          type="button"
          onClick={() => setActiveTab("visa")}
          className={`shrink-0 flex items-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full font-semibold text-xs sm:text-[15px] transition-all duration-200 cursor-pointer ${
            activeTab === "visa"
              ? "bg-[#1877F2] text-white shadow-md shadow-blue-500/20"
              : "bg-white text-gray-800 hover:bg-gray-50 shadow-sm"
          }`}
        >
          <FaPassport className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#1877F2]" />
          <span>Visa</span>
        </button>

        {/* Experience Tab */}
        <button
          type="button"
          onClick={() => setActiveTab("experience")}
          className={`shrink-0 flex items-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full font-semibold text-xs sm:text-[15px] transition-all duration-200 cursor-pointer ${
            activeTab === "experience"
              ? "bg-brand-primary text-white shadow-md shadow-blue-500/20"
              : "bg-white text-gray-800 hover:bg-gray-50 shadow-sm"
          }`}
        >
          {/* Deep Red Badge with Wave/Activity */}
          <span className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-deep-red flex items-center justify-center text-white shrink-0 shadow-xs">
            <svg
              className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
            </svg>
          </span>
          <span>Experience</span>
        </button>
      </div>

      {/* Main White Search Box Container */}
      <div className="bg-white rounded-xl shadow-[0_15px_40px_rgba(0,0,0,0.12)] p-4 sm:pt-6 sm:pb-5 sm:px-7 border border-gray-100 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-2.5 sm:gap-3.5 items-center">

          {/* Field 1: Destination */}
          <div className="relative md:col-span-4">
            <button
              type="button"
              onClick={() => {
                setIsDestinationOpen(!isDestinationOpen);
                setIsDateOpen(false);
                setIsTourTypeOpen(false);
              }}
              className="w-full h-[60px] sm:h-[72px] flex items-center gap-3.5 px-3.5 sm:px-4 rounded-lg border border-gray-200/90 hover:border-blue-400 focus:border-[#1877F2] bg-white transition-all text-left group cursor-pointer"
            >
              {/* Target / Crosshair Icon */}
              <div className="shrink-0 text-gray-700 group-hover:text-[#1877F2] transition-colors">
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.9"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="7" />
                  <circle cx="12" cy="12" r="2" fill="currentColor" stroke="none" />
                  <line x1="12" y1="2" x2="12" y2="4.5" />
                  <line x1="12" y1="19.5" x2="12" y2="22" />
                  <line x1="2" y1="12" x2="4.5" y2="12" />
                  <line x1="19.5" y1="12" x2="22" y2="12" />
                </svg>
              </div>

              <div className="flex-1 min-w-0">
                <div className="text-[16px] font-semibold text-gray-900 truncate leading-snug">
                  {selectedDestination}
                </div>
                <div className="text-[13px] font-normal text-gray-500 leading-none mt-1">
                  Destination
                </div>
              </div>
            </button>

            {/* Destination Dropdown Menu */}
            {isDestinationOpen && (
              <div className="absolute left-0 top-[calc(100%+6px)] w-full bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50 animate-in fade-in duration-150">
                {destinations.map((dest) => (
                  <button
                    key={dest}
                    type="button"
                    onClick={() => {
                      setSelectedDestination(dest);
                      setIsDestinationOpen(false);
                    }}
                    className="w-full text-left px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors flex items-center justify-between cursor-pointer"
                  >
                    <span>{dest}</span>
                    {selectedDestination === dest && (
                      <Check className="w-4 h-4 text-[#1877F2]" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Field 2: Date */}
          <div className="relative md:col-span-3">
            {/* Native Mobile Date Input Overlay (Ensures immediate native picker & visible placeholder on mobile phones) */}
            <input
              type="date"
              aria-label="Select Date"
              value={selectedDate.raw}
              onChange={(e) => {
                if (e.target.value) {
                  const d = new Date(e.target.value);
                  setSelectedDate({
                    day: d.toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    }),
                    year: "Date",
                    raw: e.target.value,
                  });
                }
              }}
              className="md:hidden absolute inset-0 w-full h-full opacity-0 z-20 cursor-pointer"
            />

            <button
              type="button"
              onClick={() => {
                setIsDateOpen(!isDateOpen);
                setIsDestinationOpen(false);
                setIsTourTypeOpen(false);
              }}
              className="w-full h-[60px] sm:h-[72px] flex items-center gap-3.5 px-3.5 sm:px-4 rounded-lg border border-gray-200/90 hover:border-blue-400 focus:border-[#1877F2] bg-white transition-all text-left group cursor-pointer"
            >
              {/* Calendar with "8" inside icon */}
              <div className="shrink-0 text-gray-700 group-hover:text-[#1877F2] transition-colors">
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.9"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="4" width="18" height="17" rx="3" />
                  <line x1="16" y1="2" x2="16" y2="5" />
                  <line x1="8" y1="2" x2="8" y2="5" />
                  <line x1="3" y1="9" x2="21" y2="9" />
                  <text
                    x="12"
                    y="17"
                    textAnchor="middle"
                    fontSize="7"
                    fontWeight="bold"
                    fill="currentColor"
                    stroke="none"
                    fontFamily="sans-serif"
                  >
                    8
                  </text>
                </svg>
              </div>

              <div className="flex-1 min-w-0">
                <div className="text-[16px] font-semibold text-gray-900 truncate leading-snug">
                  {selectedDate.day}
                </div>
                <div className="text-[13px] font-normal text-gray-500 leading-none mt-1">
                  {selectedDate.year}
                </div>
              </div>
            </button>

            {/* Slice & Axis Banking Style Date Picker Dropdown */}
            {isDateOpen && (
              <div className="absolute left-0 top-[calc(100%+6px)] w-[300px] sm:w-[320px] z-50">
                <BankingDatePicker
                  inline={true}
                  value={selectedDate.raw}
                  onChange={(val) => {
                    if (val) {
                      const parts = val.split("-");
                      const d = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
                      setSelectedDate({
                        day: d.toLocaleDateString("en-US", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        }),
                        year: "Date",
                        raw: val,
                      });
                    } else {
                      setSelectedDate({
                        day: "Select Date",
                        year: "Date",
                        raw: "",
                      });
                    }
                    setIsDateOpen(false);
                  }}
                  onClose={() => setIsDateOpen(false)}
                />
              </div>
            )}
          </div>

          {/* Field 3: Tour Types */}
          <div className="relative md:col-span-3">
            <button
              type="button"
              onClick={() => {
                setIsTourTypeOpen(!isTourTypeOpen);
                setIsDestinationOpen(false);
                setIsDateOpen(false);
              }}
              className="w-full h-[60px] sm:h-[72px] flex items-center gap-3.5 px-3.5 sm:px-4 rounded-lg border border-gray-200/90 hover:border-blue-400 focus:border-[#1877F2] bg-white transition-all text-left group cursor-pointer"
            >
              {/* List with 3 bullets & lines icon */}
              <div className="shrink-0 text-gray-700 group-hover:text-[#1877F2] transition-colors">
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="4.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
                  <line x1="9.5" y1="6.5" x2="20.5" y2="6.5" />
                  <circle cx="4.5" cy="12" r="1.5" fill="currentColor" stroke="none" />
                  <line x1="9.5" y1="12" x2="20.5" y2="12" />
                  <circle cx="4.5" cy="17.5" r="1.5" fill="currentColor" stroke="none" />
                  <line x1="9.5" y1="17.5" x2="20.5" y2="17.5" />
                </svg>
              </div>

              <div className="flex-1 min-w-0">
                <div className="text-[16px] font-semibold text-gray-900 truncate leading-snug">
                  {selectedTourType}
                </div>
                <div className="text-[13px] font-normal text-gray-500 leading-none mt-1">
                  Tour Types
                </div>
              </div>
            </button>

            {/* Tour Types Dropdown Menu */}
            {isTourTypeOpen && (
              <div className="absolute left-0 top-[calc(100%+6px)] w-full bg-white rounded-lg shadow-xl border border-gray-100 py-2 z-50 animate-in fade-in duration-150">
                {tourTypes.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => {
                      setSelectedTourType(type);
                      setIsTourTypeOpen(false);
                    }}
                    className="w-full text-left px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors flex items-center justify-between cursor-pointer"
                  >
                    <span>{type}</span>
                    {selectedTourType === type && (
                      <Check className="w-4 h-4 text-[#1877F2]" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Field 4: Search Button */}
          <div className="md:col-span-2">
            <button
              type="button"
              className="w-full h-[52px] sm:h-[72px] bg-[#1877F2] hover:bg-[#1466d3] text-white font-bold rounded-full flex items-center justify-center gap-2 text-[15px] sm:text-[16px] tracking-wide shadow-xs hover:shadow-md transition-all duration-200 active:scale-[0.98] cursor-pointer"
            >
              <Search className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.4]" />
              <span>SEARCH</span>
            </button>
          </div>

        </div>

        {/* Bottom Custom Itinerary Note */}
        <div className="mt-4 pt-1 text-left">
          <p className="text-sm text-gray-600">
            Can&apos;t find what you&apos;re looking for? create your{" "}
            <a
              href="#custom-itinerary"
              className="text-[#1877F2] font-semibold hover:underline cursor-pointer"
            >
              Custom Itinerary
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
