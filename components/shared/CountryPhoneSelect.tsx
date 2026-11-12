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
  { name: "Afghanistan", code: "+93", flag: "🇦🇫", iso: "AF" },
  { name: "Albania", code: "+355", flag: "🇦🇱", iso: "AL" },
  { name: "Algeria", code: "+213", flag: "🇩🇿", iso: "DZ" },
  { name: "Andorra", code: "+376", flag: "🇦🇩", iso: "AD" },
  { name: "Angola", code: "+244", flag: "🇦🇴", iso: "AO" },
  { name: "Antigua and Barbuda", code: "+1-268", flag: "🇦🇬", iso: "AG" },
  { name: "Argentina", code: "+54", flag: "🇦🇷", iso: "AR" },
  { name: "Armenia", code: "+374", flag: "🇦🇲", iso: "AM" },
  { name: "Australia", code: "+61", flag: "🇦🇺", iso: "AU" },
  { name: "Austria", code: "+43", flag: "🇦🇹", iso: "AT" },
  { name: "Azerbaijan", code: "+994", flag: "🇦🇿", iso: "AZ" },
  { name: "Bahamas", code: "+1-242", flag: "🇧🇸", iso: "BS" },
  { name: "Bahrain", code: "+973", flag: "🇧🇭", iso: "BH" },
  { name: "Bangladesh", code: "+880", flag: "🇧🇩", iso: "BD" },
  { name: "Barbados", code: "+1-246", flag: "🇧🇧", iso: "BB" },
  { name: "Belarus", code: "+375", flag: "🇧🇾", iso: "BY" },
  { name: "Belgium", code: "+32", flag: "🇧🇪", iso: "BE" },
  { name: "Belize", code: "+501", flag: "🇧🇿", iso: "BZ" },
  { name: "Benin", code: "+229", flag: "🇧🇯", iso: "BJ" },
  { name: "Bhutan", code: "+975", flag: "🇧🇹", iso: "BT" },
  { name: "Bolivia", code: "+591", flag: "🇧🇴", iso: "BO" },
  { name: "Bosnia and Herzegovina", code: "+387", flag: "🇧🇦", iso: "BA" },
  { name: "Botswana", code: "+267", flag: "🇧🇼", iso: "BW" },
  { name: "Brazil", code: "+55", flag: "🇧🇷", iso: "BR" },
  { name: "Brunei", code: "+673", flag: "🇧🇳", iso: "BN" },
  { name: "Bulgaria", code: "+359", flag: "🇧🇬", iso: "BG" },
  { name: "Burkina Faso", code: "+226", flag: "🇧🇫", iso: "BF" },
  { name: "Burundi", code: "+257", flag: "🇧🇮", iso: "BI" },
  { name: "Cambodia", code: "+855", flag: "🇰🇭", iso: "KH" },
  { name: "Cameroon", code: "+237", flag: "🇨🇲", iso: "CM" },
  { name: "Canada", code: "+1", flag: "🇨🇦", iso: "CA" },
  { name: "Cape Verde", code: "+238", flag: "🇨🇻", iso: "CV" },
  { name: "Central African Republic", code: "+236", flag: "🇨🇫", iso: "CF" },
  { name: "Chad", code: "+235", flag: "🇹🇩", iso: "TD" },
  { name: "Chile", code: "+56", flag: "🇨🇱", iso: "CL" },
  { name: "China", code: "+86", flag: "🇨🇳", iso: "CN" },
  { name: "Colombia", code: "+57", flag: "🇨🇴", iso: "CO" },
  { name: "Comoros", code: "+269", flag: "🇰🇲", iso: "KM" },
  { name: "Congo (DRC)", code: "+243", flag: "🇨🇩", iso: "CD" },
  { name: "Congo (Republic)", code: "+242", flag: "🇨🇬", iso: "CG" },
  { name: "Costa Rica", code: "+506", flag: "🇨🇷", iso: "CR" },
  { name: "Croatia", code: "+385", flag: "🇭🇷", iso: "HR" },
  { name: "Cuba", code: "+53", flag: "🇨🇺", iso: "CU" },
  { name: "Cyprus", code: "+357", flag: "🇨🇾", iso: "CY" },
  { name: "Czech Republic", code: "+420", flag: "🇨🇿", iso: "CZ" },
  { name: "Denmark", code: "+45", flag: "🇩🇰", iso: "DK" },
  { name: "Djibouti", code: "+253", flag: "🇩🇯", iso: "DJ" },
  { name: "Dominica", code: "+1-767", flag: "🇩🇲", iso: "DM" },
  { name: "Dominican Republic", code: "+1-809", flag: "🇩🇴", iso: "DO" },
  { name: "Ecuador", code: "+593", flag: "🇪🇨", iso: "EC" },
  { name: "Egypt", code: "+20", flag: "🇪🇬", iso: "EG" },
  { name: "El Salvador", code: "+503", flag: "🇸🇻", iso: "SV" },
  { name: "Equatorial Guinea", code: "+240", flag: "🇬🇶", iso: "GQ" },
  { name: "Eritrea", code: "+291", flag: "🇪🇷", iso: "ER" },
  { name: "Estonia", code: "+372", flag: "🇪🇪", iso: "EE" },
  { name: "Eswatini", code: "+268", flag: "🇸🇿", iso: "SZ" },
  { name: "Ethiopia", code: "+251", flag: "🇪🇹", iso: "ET" },
  { name: "Fiji", code: "+679", flag: "🇫🇯", iso: "FJ" },
  { name: "Finland", code: "+358", flag: "🇫🇮", iso: "FI" },
  { name: "France", code: "+33", flag: "🇫🇷", iso: "FR" },
  { name: "Gabon", code: "+241", flag: "🇬🇦", iso: "GA" },
  { name: "Gambia", code: "+220", flag: "🇬🇲", iso: "GM" },
  { name: "Georgia", code: "+995", flag: "🇬🇪", iso: "GE" },
  { name: "Germany", code: "+49", flag: "🇩🇪", iso: "DE" },
  { name: "Ghana", code: "+233", flag: "🇬🇭", iso: "GH" },
  { name: "Greece", code: "+30", flag: "🇬🇷", iso: "GR" },
  { name: "Greenland", code: "+299", flag: "🇬🇱", iso: "GL" },
  { name: "Grenada", code: "+1-473", flag: "🇬🇩", iso: "GD" },
  { name: "Guatemala", code: "+502", flag: "🇬🇹", iso: "GT" },
  { name: "Guinea", code: "+224", flag: "🇬🇳", iso: "GN" },
  { name: "Guinea-Bissau", code: "+245", flag: "🇬🇼", iso: "GW" },
  { name: "Guyana", code: "+592", flag: "🇬🇾", iso: "GY" },
  { name: "Haiti", code: "+509", flag: "🇭🇹", iso: "HT" },
  { name: "Honduras", code: "+504", flag: "🇭🇳", iso: "HN" },
  { name: "Hong Kong", code: "+852", flag: "🇭🇰", iso: "HK" },
  { name: "Hungary", code: "+36", flag: "🇭🇺", iso: "HU" },
  { name: "Iceland", code: "+354", flag: "🇮🇸", iso: "IS" },
  { name: "Indonesia", code: "+62", flag: "🇮🇩", iso: "ID" },
  { name: "Iran", code: "+98", flag: "🇮🇷", iso: "IR" },
  { name: "Iraq", code: "+964", flag: "🇮🇶", iso: "IQ" },
  { name: "Ireland", code: "+353", flag: "🇮🇪", iso: "IE" },
  { name: "Israel", code: "+972", flag: "🇮🇱", iso: "IL" },
  { name: "Italy", code: "+39", flag: "🇮🇹", iso: "IT" },
  { name: "Ivory Coast", code: "+225", flag: "🇨🇮", iso: "CI" },
  { name: "Jamaica", code: "+1-876", flag: "🇯🇲", iso: "JM" },
  { name: "Japan", code: "+81", flag: "🇯🇵", iso: "JP" },
  { name: "Jordan", code: "+962", flag: "🇯🇴", iso: "JO" },
  { name: "Kazakhstan", code: "+7", flag: "🇰🇿", iso: "KZ" },
  { name: "Kenya", code: "+254", flag: "🇰🇪", iso: "KE" },
  { name: "Kiribati", code: "+686", flag: "🇰🇮", iso: "KI" },
  { name: "Kosovo", code: "+383", flag: "🇽🇰", iso: "XK" },
  { name: "Kuwait", code: "+965", flag: "🇰🇼", iso: "KW" },
  { name: "Kyrgyzstan", code: "+996", flag: "🇰🇬", iso: "KG" },
  { name: "Laos", code: "+856", flag: "🇱🇦", iso: "LA" },
  { name: "Latvia", code: "+371", flag: "🇱🇻", iso: "LV" },
  { name: "Lebanon", code: "+961", flag: "🇱🇧", iso: "LB" },
  { name: "Lesotho", code: "+266", flag: "🇱🇸", iso: "LS" },
  { name: "Liberia", code: "+231", flag: "🇱🇷", iso: "LR" },
  { name: "Libya", code: "+218", flag: "🇱🇾", iso: "LY" },
  { name: "Liechtenstein", code: "+423", flag: "🇱🇮", iso: "LI" },
  { name: "Lithuania", code: "+370", flag: "🇱🇹", iso: "LT" },
  { name: "Luxembourg", code: "+352", flag: "🇱🇺", iso: "LU" },
  { name: "Macau", code: "+853", flag: "🇲🇴", iso: "MO" },
  { name: "Madagascar", code: "+261", flag: "🇲🇬", iso: "MG" },
  { name: "Malawi", code: "+265", flag: "🇲🇼", iso: "MW" },
  { name: "Malaysia", code: "+60", flag: "🇲🇾", iso: "MY" },
  { name: "Maldives", code: "+960", flag: "🇲🇻", iso: "MV" },
  { name: "Mali", code: "+223", flag: "🇲🇱", iso: "ML" },
  { name: "Malta", code: "+356", flag: "🇲🇹", iso: "MT" },
  { name: "Marshall Islands", code: "+692", flag: "🇲🇭", iso: "MH" },
  { name: "Mauritania", code: "+222", flag: "🇲🇷", iso: "MR" },
  { name: "Mauritius", code: "+230", flag: "🇲🇺", iso: "MU" },
  { name: "Mexico", code: "+52", flag: "🇲🇽", iso: "MX" },
  { name: "Micronesia", code: "+691", flag: "🇫🇲", iso: "FM" },
  { name: "Moldova", code: "+373", flag: "🇲🇩", iso: "MD" },
  { name: "Monaco", code: "+377", flag: "🇲🇨", iso: "MC" },
  { name: "Mongolia", code: "+976", flag: "🇲🇳", iso: "MN" },
  { name: "Montenegro", code: "+382", flag: "🇲🇪", iso: "ME" },
  { name: "Morocco", code: "+212", flag: "🇲🇦", iso: "MA" },
  { name: "Mozambique", code: "+258", flag: "🇲🇿", iso: "MZ" },
  { name: "Myanmar", code: "+95", flag: "🇲🇲", iso: "MM" },
  { name: "Namibia", code: "+264", flag: "🇳🇦", iso: "NA" },
  { name: "Nauru", code: "+674", flag: "🇳🇷", iso: "NR" },
  { name: "Nepal", code: "+977", flag: "🇳🇵", iso: "NP" },
  { name: "Netherlands", code: "+31", flag: "🇳🇱", iso: "NL" },
  { name: "New Zealand", code: "+64", flag: "🇳🇿", iso: "NZ" },
  { name: "Nicaragua", code: "+505", flag: "🇳🇮", iso: "NI" },
  { name: "Niger", code: "+227", flag: "🇳🇪", iso: "NE" },
  { name: "Nigeria", code: "+234", flag: "🇳🇬", iso: "NG" },
  { name: "North Korea", code: "+850", flag: "🇰🇵", iso: "KP" },
  { name: "North Macedonia", code: "+389", flag: "🇲🇰", iso: "MK" },
  { name: "Norway", code: "+47", flag: "🇳🇴", iso: "NO" },
  { name: "Oman", code: "+968", flag: "🇴🇲", iso: "OM" },
  { name: "Pakistan", code: "+92", flag: "🇵🇰", iso: "PK" },
  { name: "Palau", code: "+680", flag: "🇵🇼", iso: "PW" },
  { name: "Palestine", code: "+970", flag: "🇵🇸", iso: "PS" },
  { name: "Panama", code: "+507", flag: "🇵🇦", iso: "PA" },
  { name: "Papua New Guinea", code: "+675", flag: "🇵🇬", iso: "PG" },
  { name: "Paraguay", code: "+595", flag: "🇵🇾", iso: "PY" },
  { name: "Peru", code: "+51", flag: "🇵🇪", iso: "PE" },
  { name: "Philippines", code: "+63", flag: "🇵🇭", iso: "PH" },
  { name: "Poland", code: "+48", flag: "🇵🇱", iso: "PL" },
  { name: "Portugal", code: "+351", flag: "🇵🇹", iso: "PT" },
  { name: "Puerto Rico", code: "+1-787", flag: "🇵🇷", iso: "PR" },
  { name: "Qatar", code: "+974", flag: "🇶🇦", iso: "QA" },
  { name: "Romania", code: "+40", flag: "🇷🇴", iso: "RO" },
  { name: "Russia", code: "+7", flag: "🇷🇺", iso: "RU" },
  { name: "Rwanda", code: "+250", flag: "🇷🇼", iso: "RW" },
  { name: "Saint Kitts and Nevis", code: "+1-869", flag: "🇰🇳", iso: "KN" },
  { name: "Saint Lucia", code: "+1-758", flag: "🇱🇨", iso: "LC" },
  { name: "Saint Vincent and the Grenadines", code: "+1-784", flag: "🇻🇨", iso: "VC" },
  { name: "Samoa", code: "+685", flag: "🇼🇸", iso: "WS" },
  { name: "San Marino", code: "+378", flag: "🇸🇲", iso: "SM" },
  { name: "Sao Tome and Principe", code: "+239", flag: "🇸🇹", iso: "ST" },
  { name: "Saudi Arabia", code: "+966", flag: "🇸🇦", iso: "SA" },
  { name: "Senegal", code: "+221", flag: "🇸🇳", iso: "SN" },
  { name: "Serbia", code: "+381", flag: "🇷🇸", iso: "RS" },
  { name: "Seychelles", code: "+248", flag: "🇸🇨", iso: "SC" },
  { name: "Sierra Leone", code: "+232", flag: "🇸🇱", iso: "SL" },
  { name: "Singapore", code: "+65", flag: "🇸🇬", iso: "SG" },
  { name: "Slovakia", code: "+421", flag: "🇸🇰", iso: "SK" },
  { name: "Slovenia", code: "+386", flag: "🇸🇮", iso: "SI" },
  { name: "Solomon Islands", code: "+677", flag: "🇸🇧", iso: "SB" },
  { name: "Somalia", code: "+252", flag: "🇸🇴", iso: "SO" },
  { name: "South Africa", code: "+27", flag: "🇿🇦", iso: "ZA" },
  { name: "South Korea", code: "+82", flag: "🇰🇷", iso: "KR" },
  { name: "South Sudan", code: "+211", flag: "🇸🇸", iso: "SS" },
  { name: "Spain", code: "+34", flag: "🇪🇸", iso: "ES" },
  { name: "Sri Lanka", code: "+94", flag: "🇱🇰", iso: "LK" },
  { name: "Sudan", code: "+249", flag: "🇸🇩", iso: "SD" },
  { name: "Suriname", code: "+597", flag: "🇸🇷", iso: "SR" },
  { name: "Sweden", code: "+46", flag: "🇸🇪", iso: "SE" },
  { name: "Switzerland", code: "+41", flag: "🇨🇭", iso: "CH" },
  { name: "Syria", code: "+963", flag: "🇸🇾", iso: "SY" },
  { name: "Taiwan", code: "+886", flag: "🇹🇼", iso: "TW" },
  { name: "Tajikistan", code: "+992", flag: "🇹🇯", iso: "TJ" },
  { name: "Tanzania", code: "+255", flag: "🇹🇿", iso: "TZ" },
  { name: "Thailand", code: "+66", flag: "🇹🇭", iso: "TH" },
  { name: "Timor-Leste", code: "+670", flag: "🇹🇱", iso: "TL" },
  { name: "Togo", code: "+228", flag: "🇹🇬", iso: "TG" },
  { name: "Tonga", code: "+676", flag: "🇹🇴", iso: "TO" },
  { name: "Trinidad and Tobago", code: "+1-868", flag: "🇹🇹", iso: "TT" },
  { name: "Tunisia", code: "+216", flag: "🇹🇳", iso: "TN" },
  { name: "Turkey", code: "+90", flag: "🇹🇷", iso: "TR" },
  { name: "Turkmenistan", code: "+993", flag: "🇹🇲", iso: "TM" },
  { name: "Tuvalu", code: "+688", flag: "🇹🇻", iso: "TV" },
  { name: "Uganda", code: "+256", flag: "🇺🇬", iso: "UG" },
  { name: "Ukraine", code: "+380", flag: "🇺🇦", iso: "UA" },
  { name: "United Arab Emirates", code: "+971", flag: "🇦🇪", iso: "AE" },
  { name: "United Kingdom", code: "+44", flag: "🇬🇧", iso: "GB" },
  { name: "United States", code: "+1", flag: "🇺🇸", iso: "US" },
  { name: "Uruguay", code: "+598", flag: "🇺🇾", iso: "UY" },
  { name: "Uzbekistan", code: "+998", flag: "🇺🇿", iso: "UZ" },
  { name: "Vanuatu", code: "+678", flag: "🇻🇺", iso: "VU" },
  { name: "Vatican City", code: "+379", flag: "🇻🇦", iso: "VA" },
  { name: "Venezuela", code: "+58", flag: "🇻🇪", iso: "VE" },
  { name: "Vietnam", code: "+84", flag: "🇻🇳", iso: "VN" },
  { name: "Yemen", code: "+967", flag: "🇾🇪", iso: "YE" },
  { name: "Zambia", code: "+260", flag: "🇿🇲", iso: "ZM" },
  { name: "Zimbabwe", code: "+263", flag: "🇿🇼", iso: "ZW" },
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
  const [selectedIso, setSelectedIso] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Resolve active country (preserves exact selection even when dial codes overlap, e.g. US vs Canada)
  const selectedCountry = useMemo(() => {
    if (selectedIso) {
      const byIso = COUNTRIES.find(
        (c) => c.iso === selectedIso && c.code === value
      );
      if (byIso) return byIso;
    }
    return (
      COUNTRIES.find((c) => c.code === value) ||
      COUNTRIES.find((c) => c.iso === "IN") ||
      COUNTRIES[0]
    );
  }, [value, selectedIso]);

  // Filter countries based on search query (by name, dial code, or ISO code)
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
    setSelectedIso(country.iso);
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
        <span className="font-medium text-gray-800 tracking-tight">
          {selectedCountry.code}
        </span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-200 ${isOpen ? "rotate-180 text-[#1877F2]" : ""
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
                className="w-full pl-8 pr-7 py-3 text-xs bg-white border border-gray-200 rounded-lg outline-none focus:border-[#1877F2] text-gray-800 placeholder:text-gray-400 font-normal"
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
          <div className="max-h-60 overflow-y-auto p-1 divide-y divide-gray-50 scrollbar-thin">
            {filteredCountries.length > 0 ? (
              filteredCountries.map((c) => {
                const isSelected = c.iso === selectedCountry.iso;
                return (
                  <button
                    key={c.iso}
                    type="button"
                    onClick={() => handleSelect(c)}
                    className={`w-full flex items-center justify-between px-2.5 py-2 text-left rounded-lg text-xs sm:text-[13px] transition-colors cursor-pointer group ${isSelected
                      ? "bg-blue-50 text-[#1877F2] font-medium"
                      : "hover:bg-gray-100/80 text-gray-700 font-normal"
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
                        className={`text-xs font-medium ${isSelected ? "text-[#1877F2]" : "text-gray-500"
                          }`}
                      >
                        {c.code}
                      </span>
                      {isSelected && (
                        <Check className="w-3.5 h-3.5 text-[#1877F2] shrink-0 stroke-[2.2]" />
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
