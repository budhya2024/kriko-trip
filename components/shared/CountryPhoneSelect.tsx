"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import { Search, ChevronDown, Check, X } from "lucide-react";

export interface CountryOption {
  name: string;
  code: string;
  flag: string;
  iso: string;
}

export const COUNTRIES: CountryOption[] = [
  { name: "India", code: "+91", flag: "🇮🇳", iso: "IN" },
  { name: "United States", code: "+1", flag: "🇺🇸", iso: "US" },
  { name: "United Kingdom", code: "+44", flag: "🇬🇧", iso: "GB" },
  { name: "United Arab Emirates", code: "+971", flag: "🇦🇪", iso: "AE" },
  { name: "Australia", code: "+61", flag: "🇦🇺", iso: "AU" },
  { name: "Canada", code: "+1", flag: "🇨🇦", iso: "CA" },
  { name: "Singapore", code: "+65", flag: "🇸🇬", iso: "SG" },
  { name: "Malaysia", code: "+60", flag: "🇲🇾", iso: "MY" },
  { name: "Thailand", code: "+66", flag: "🇹🇭", iso: "TH" },
  { name: "Saudi Arabia", code: "+966", flag: "🇸🇦", iso: "SA" },
  { name: "Qatar", code: "+974", flag: "🇶🇦", iso: "QA" },
  { name: "Oman", code: "+968", flag: "🇴🇲", iso: "OM" },
  { name: "Kuwait", code: "+965", flag: "🇰🇼", iso: "KW" },
  { name: "Bahrain", code: "+973", flag: "🇧🇭", iso: "BH" },
  { name: "Germany", code: "+49", flag: "🇩🇪", iso: "DE" },
  { name: "France", code: "+33", flag: "🇫🇷", iso: "FR" },
  { name: "Italy", code: "+39", flag: "🇮🇹", iso: "IT" },
  { name: "Spain", code: "+34", flag: "🇪🇸", iso: "ES" },
  { name: "Switzerland", code: "+41", flag: "🇨🇭", iso: "CH" },
  { name: "Netherlands", code: "+31", flag: "🇳🇱", iso: "NL" },
  { name: "Austria", code: "+43", flag: "🇦🇹", iso: "AT" },
  { name: "Belgium", code: "+32", flag: "🇧🇪", iso: "BE" },
  { name: "Ireland", code: "+353", flag: "🇮🇪", iso: "IE" },
  { name: "Portugal", code: "+351", flag: "🇵🇹", iso: "PT" },
  { name: "Greece", code: "+30", flag: "🇬🇷", iso: "GR" },
  { name: "Sweden", code: "+46", flag: "🇸🇪", iso: "SE" },
  { name: "Norway", code: "+47", flag: "🇳🇴", iso: "NO" },
  { name: "Denmark", code: "+45", flag: "🇩🇰", iso: "DK" },
  { name: "Finland", code: "+358", flag: "🇫🇮", iso: "FI" },
  { name: "Poland", code: "+48", flag: "🇵🇱", iso: "PL" },
  { name: "Czech Republic", code: "+420", flag: "🇨🇿", iso: "CZ" },
  { name: "Turkey", code: "+90", flag: "🇹🇷", iso: "TR" },
  { name: "Japan", code: "+81", flag: "🇯🇵", iso: "JP" },
  { name: "South Korea", code: "+82", flag: "🇰🇷", iso: "KR" },
  { name: "China", code: "+86", flag: "🇨🇳", iso: "CN" },
  { name: "Hong Kong", code: "+852", flag: "🇭🇰", iso: "HK" },
  { name: "Taiwan", code: "+886", flag: "🇹🇼", iso: "TW" },
  { name: "Indonesia", code: "+62", flag: "🇮🇩", iso: "ID" },
  { name: "Vietnam", code: "+84", flag: "🇻🇳", iso: "VN" },
  { name: "Philippines", code: "+63", flag: "🇵🇭", iso: "PH" },
  { name: "New Zealand", code: "+64", flag: "🇳🇿", iso: "NZ" },
  { name: "Maldives", code: "+960", flag: "🇲🇻", iso: "MV" },
  { name: "Sri Lanka", code: "+94", flag: "🇱🇰", iso: "LK" },
  { name: "Nepal", code: "+977", flag: "🇳🇵", iso: "NP" },
  { name: "Bhutan", code: "+975", flag: "🇧🇹", iso: "BT" },
  { name: "Bangladesh", code: "+880", flag: "🇧🇩", iso: "BD" },
  { name: "Mauritius", code: "+230", flag: "🇲🇺", iso: "MU" },
  { name: "Egypt", code: "+20", flag: "🇪🇬", iso: "EG" },
  { name: "South Africa", code: "+27", flag: "🇿🇦", iso: "ZA" },
  { name: "Kenya", code: "+254", flag: "🇰🇪", iso: "KE" },
  { name: "Morocco", code: "+212", flag: "🇲🇦", iso: "MA" },
  { name: "Mexico", code: "+52", flag: "🇲🇽", iso: "MX" },
  { name: "Brazil", code: "+55", flag: "🇧🇷", iso: "BR" },
  { name: "Argentina", code: "+54", flag: "🇦🇷", iso: "AR" },
  { name: "Colombia", code: "+57", flag: "🇨🇴", iso: "CO" },
  { name: "Russia", code: "+7", flag: "🇷🇺", iso: "RU" },
];

interface CountryPhoneSelectProps {
  value: string;
  onChange: (code: string, country?: CountryOption) => void;
  className?: string;
  buttonClassName?: string;
}

export default function CountryPhoneSelect({
  value,
  onChange,
  className = "",
  buttonClassName = "",
}: CountryPhoneSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Find currently selected country
  const selectedCountry = useMemo(() => {
    return (
      COUNTRIES.find((c) => c.code === value) ||
      COUNTRIES.find((c) => c.iso === "IN") ||
      COUNTRIES[0]
    );
  }, [value]);

  // Filter countries based on search
  const filteredCountries = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return COUNTRIES;
    return COUNTRIES.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.code.toLowerCase().includes(q) ||
        c.iso.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  // Click outside to close
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Focus search input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);
    } else {
      setSearchQuery("");
    }
  }, [isOpen]);

  const handleSelect = (country: CountryOption) => {
    onChange(country.code, country);
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className={`relative shrink-0 ${className}`}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Select Country Code"
        aria-expanded={isOpen}
        className={`flex items-center gap-1.5 px-2.5 py-3 bg-gray-50 hover:bg-gray-100 text-xs sm:text-sm font-medium text-gray-800 transition-colors cursor-pointer border-r border-gray-200 select-none ${buttonClassName}`}
      >
        <span className="text-base leading-none select-none">
          {selectedCountry.flag}
        </span>
        <span className="font-semibold text-gray-800 tracking-tight">
          {selectedCountry.code}
        </span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-200 ${
            isOpen ? "rotate-180 text-[#1877F2]" : ""
          }`}
        />
      </button>

      {/* Dropdown Popover */}
      {isOpen && (
        <div className="absolute left-0 top-[calc(100%+6px)] z-[100] w-[280px] sm:w-[320px] bg-white rounded-xl border border-gray-200 shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
          {/* Search Header */}
          <div className="p-2.5 border-b border-gray-100 bg-gray-50/70">
            <div className="relative flex items-center">
              <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 pointer-events-none" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search country or code..."
                className="w-full pl-8 pr-7 py-1.5 text-xs bg-white border border-gray-200 rounded-lg outline-none focus:border-[#1877F2] text-gray-800 placeholder:text-gray-400 font-normal"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2 p-0.5 text-gray-400 hover:text-gray-600 rounded"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>

          {/* Country List */}
          <div className="max-h-56 overflow-y-auto p-1 divide-y divide-gray-50 scrollbar-thin">
            {filteredCountries.length > 0 ? (
              filteredCountries.map((c) => {
                const isSelected =
                  c.code === selectedCountry.code &&
                  c.name === selectedCountry.name;
                return (
                  <button
                    key={`${c.iso}-${c.code}`}
                    type="button"
                    onClick={() => handleSelect(c)}
                    className={`w-full flex items-center justify-between px-2.5 py-2 text-left rounded-lg text-xs sm:text-[13px] transition-colors cursor-pointer group ${
                      isSelected
                        ? "bg-blue-50 text-[#1877F2] font-semibold"
                        : "hover:bg-gray-100/80 text-gray-700"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="text-base shrink-0 leading-none">
                        {c.flag}
                      </span>
                      <span className="truncate group-hover:text-gray-900">
                        {c.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0 ml-2">
                      <span
                        className={`text-xs font-semibold ${
                          isSelected ? "text-[#1877F2]" : "text-gray-500"
                        }`}
                      >
                        {c.code}
                      </span>
                      {isSelected && (
                        <Check className="w-3.5 h-3.5 text-[#1877F2] shrink-0 stroke-[2.5]" />
                      )}
                    </div>
                  </button>
                );
              })
            ) : (
              <div className="py-6 text-center text-xs text-gray-400">
                No countries found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

