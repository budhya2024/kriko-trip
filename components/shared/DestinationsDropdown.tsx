"use client";

import React from "react";
import Link from "next/link";

export interface DestinationColumn {
  continent: string;
  countries: { name: string; code: string }[];
}

export const destinationColumns: DestinationColumn[] = [
  {
    continent: "North India",
    countries: [
      { name: "Kashmir Valley", code: "in" },
      { name: "Leh Ladakh", code: "in" },
      { name: "Manali & Kullu", code: "in" },
      { name: "Shimla Hills", code: "in" },
      { name: "Rishikesh & Haridwar", code: "in" },
      { name: "Amritsar Heritage", code: "in" },
    ],
  },
  {
    continent: "South India",
    countries: [
      { name: "Kerala Backwaters", code: "in" },
      { name: "Munnar Tea Hills", code: "in" },
      { name: "Ooty & Nilgiris", code: "in" },
      { name: "Coorg Coffee Hills", code: "in" },
      { name: "Hampi Ruins", code: "in" },
      { name: "Rameshwaram", code: "in" },
    ],
  },
  {
    continent: "East & Northeast",
    countries: [
      { name: "Sundarban Mangroves", code: "in" },
      { name: "Darjeeling Queen", code: "in" },
      { name: "Gangtok & Sikkim", code: "in" },
      { name: "Shillong, Meghalaya", code: "in" },
      { name: "Kaziranga Safari", code: "in" },
      { name: "Puri, Odisha", code: "in" },
    ],
  },
  {
    continent: "West India",
    countries: [
      { name: "North & South Goa", code: "in" },
      { name: "Jaipur Pink City", code: "in" },
      { name: "Udaipur Lake Palace", code: "in" },
      { name: "Jaisalmer Desert", code: "in" },
      { name: "Rann of Kutch", code: "in" },
      { name: "Mahabaleshwar", code: "in" },
    ],
  },
  {
    continent: "Central & Heritage",
    countries: [
      { name: "Varanasi Ghats", code: "in" },
      { name: "Agra & Taj Mahal", code: "in" },
      { name: "Khajuraho Temples", code: "in" },
      { name: "Bandhavgarh Tiger", code: "in" },
      { name: "Kanha National Park", code: "in" },
    ],
  },
  {
    continent: "Islands & Coastal",
    countries: [
      { name: "Andaman & Nicobar", code: "in" },
      { name: "Havelock Island", code: "in" },
      { name: "Neil Island", code: "in" },
      { name: "Lakshadweep Islands", code: "in" },
      { name: "Gokarna Coastal", code: "in" },
    ],
  },
];

export function getDestinationUrl(name: string): string {
  const lower = name.toLowerCase();
  if (lower.includes("andaman")) return "/tour-packages?destination=Andaman";
  if (lower.includes("kashmir")) return "/tour-packages?destination=Kashmir";
  if (lower.includes("ladakh") || lower.includes("leh"))
    return "/tour-packages?destination=Ladakh";
  if (
    lower.includes("kerala") ||
    lower.includes("munnar") ||
    lower.includes("alleppey") ||
    lower.includes("ooty") ||
    lower.includes("coorg")
  )
    return "/tour-packages?destination=Kerala";
  if (
    lower.includes("rajasthan") ||
    lower.includes("jaipur") ||
    lower.includes("jodhpur") ||
    lower.includes("udaipur") ||
    lower.includes("jaisalmer") ||
    lower.includes("hampi") ||
    lower.includes("khajuraho") ||
    lower.includes("varanasi")
  )
    return "/tour-packages?destination=Rajasthan";
  if (lower.includes("goa") || lower.includes("gokarna"))
    return "/tour-packages?destination=Goa";
  if (
    lower.includes("himachal") ||
    lower.includes("manali") ||
    lower.includes("shimla") ||
    lower.includes("kullu") ||
    lower.includes("rishikesh")
  )
    return "/tour-packages?destination=Himachal";
  if (lower.includes("sundarban")) return "/tour-packages?destination=Sundarban";
  return `/tour-packages?destination=${encodeURIComponent(name.split(" ")[0])}`;
}

interface DestinationsDropdownProps {
  isOpen: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

/**
 * Desktop Destinations Mega-Menu Dropdown rendered from the site header.
 */
export default function DestinationsDropdown({
  isOpen,
  onMouseEnter,
  onMouseLeave,
}: DestinationsDropdownProps) {
  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`absolute left-0 right-0 top-full bg-white border-t border-gray-100 shadow-[0_20px_45px_rgba(0,0,0,0.12)] transition-all duration-300 z-50 ${
        isOpen
          ? "opacity-100 visible translate-y-0"
          : "opacity-0 invisible -translate-y-2 pointer-events-none"
      }`}
    >
      <div className="container relative py-10 px-6 sm:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-8 gap-y-8">
          {destinationColumns.map((col) => (
            <div key={col.continent} className="flex flex-col">
              <h3 className="text-[17px] font-bold text-gray-950 mb-5 tracking-tight border-b border-gray-100 pb-2">
                {col.continent}
              </h3>

              <ul className="flex flex-col space-y-3.5">
                {col.countries.map((country) => (
                  <li key={country.name}>
                    <Link
                      href={getDestinationUrl(country.name)}
                      className="flex items-center text-sm font-normal text-gray-700 hover:text-[#0284c7] transition-all group py-0.5"
                    >
                      <span className="group-hover:translate-x-1 transition-transform duration-150">
                        {country.name}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

