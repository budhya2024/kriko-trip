"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function BestServiceBanner() {
  return (
    <section className="w-full bg-white py-6 sm:py-10 md:py-14">
      <div className="container">
        {/* Soft Lavender / Periwinkle Card Container Matching Reference Image */}
        <div className="relative w-full bg-[#EEF2FC] rounded-2xl sm:rounded-[32px] p-7 sm:p-11 lg:p-14 text-center overflow-hidden shadow-xs">
          {/* Small Sky Blue Accent Dot in Top-Right Corner */}
          <div className="absolute top-6 right-6 sm:top-8 sm:right-8 w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full bg-[#60A5FA] pointer-events-none" />

          {/* Section Heading */}
          <h2 className="text-2xl sm:text-[28px] lg:text-[32px] font-bold text-gray-950 tracking-tight leading-snug">
            We&apos;re Providing Best Service Ever!
          </h2>

          {/* Subtle Horizontal Divider with Center Diamond Accent */}
          <div className="w-full max-w-4xl mx-auto my-7 sm:my-9 relative flex items-center justify-center">
            <div className="w-full border-t border-gray-300/60" />
            <div className="absolute w-2 h-2 rotate-45 border-t border-r border-gray-400/60 bg-[#EEF2FC]" />
          </div>

          {/* 3 Feature Columns Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 text-left">
            {/* 1. Local Guidance */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-[#FFA800] text-white flex items-center justify-center shrink-0 shadow-xs">
                {/* White Rosette Ribbon Medal Icon */}
                <svg
                  className="w-6 h-6 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="9" r="6" />
                  <circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M8.21 13.89L7 22L12 19L17 22L15.79 13.88" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg sm:text-[19px] font-bold text-gray-950 tracking-tight">
                  Local Guidance
                </h3>
                <p className="text-sm text-gray-600 mt-1 leading-relaxed font-normal">
                  Travel agencies have experienced professionals guidance.
                </p>
              </div>
            </div>

            {/* 2. Deals & Discounts */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-[#0095FF] text-white flex items-center justify-center shrink-0 shadow-xs">
                {/* Bold Percent Icon */}
                <span className="text-xl sm:text-2xl font-black leading-none text-white select-none">
                  %
                </span>
              </div>
              <div>
                <h3 className="text-lg sm:text-[19px] font-bold text-gray-950 tracking-tight">
                  Deals &amp; Discounts
                </h3>
                <p className="text-sm text-gray-600 mt-1 leading-relaxed font-normal">
                  Agencies have special discounts on flights, hotels, &amp; packages.
                </p>
              </div>
            </div>

            {/* 3. Saves Money */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-[#FFA800] text-white flex items-center justify-center shrink-0 shadow-xs">
                {/* White Wallet Icon */}
                <svg
                  className="w-5 h-5 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="6" width="20" height="13" rx="2" />
                  <line x1="2" y1="10" x2="22" y2="10" />
                  <path d="M16 14h.01" strokeWidth="3" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg sm:text-[19px] font-bold text-gray-950 tracking-tight">
                  Saves Money
                </h3>
                <p className="text-sm text-gray-600 mt-1 leading-relaxed font-normal">
                  Avoids hidden fees &amp; tourist traps, Multi-destination &amp; budget-friendly options.
                </p>
              </div>
            </div>
          </div>

          {/* Blue CTA Pill Button Matching Screenshot */}
          <div className="mt-9 sm:mt-11 flex justify-center">
            <Link
              href="/tour-packages"
              className="inline-flex items-center gap-3.5 px-7 sm:px-9 py-3 sm:py-3.5 rounded-full bg-[#1877F2] hover:bg-[#1466D3] text-white transition-all duration-300 shadow-md hover:shadow-lg active:scale-98 cursor-pointer group"
            >
              <span className="text-xs sm:text-sm font-medium tracking-wide text-white">
                Flat 30% Discounts All Packages
              </span>
              <span className="text-xs sm:text-sm font-semibold tracking-tight text-white inline-flex items-center gap-1 group-hover:underline">
                Check Offer
                <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
