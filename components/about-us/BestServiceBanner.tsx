"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function BestServiceBanner() {
  return (
    <section className="w-full bg-white py-14 sm:py-18 lg:py-20 overflow-hidden">
      <div className="container">
        {/* Soft Lavender / Periwinkle Card Container */}
        <div className="relative w-full bg-[#EEF2FC] rounded-[28px] sm:rounded-[36px] p-8 sm:p-12 lg:p-14 text-center overflow-hidden shadow-xs">
          
          {/* Header with decorative floating blue dot */}
          <div className="relative inline-flex items-start justify-center">
            <h2 className="section-title">
              We&apos;re Providing Best Service Ever!
            </h2>
            <span className="w-3.5 h-3.5 rounded-full bg-[#1877F2]/60 ml-2.5 -mt-1 shrink-0" />
          </div>

          {/* Subtle Horizontal Divider with Center Accent */}
          <div className="w-full max-w-4xl mx-auto my-8 sm:my-10 relative flex items-center justify-center">
            <div className="w-full border-t border-gray-300/70" />
            <div className="absolute w-2 h-2 rotate-45 border-t border-r border-gray-400/80 bg-[#EEF2FC]" />
          </div>

          {/* 3 Feature Columns Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 text-left">
            {/* 1. Local Guidance */}
            <div className="flex items-start gap-4 sm:gap-4.5">
              <div className="w-12 h-12 rounded-full bg-[#FF9F00] text-white flex items-center justify-center shrink-0 shadow-xs">
                {/* Ribbon Medal Icon */}
                <svg
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="8" r="6" />
                  <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
                </svg>
              </div>
              <div>
                <h3 className="text-[18px] sm:text-[19px] font-bold text-gray-950 tracking-tight">
                  Local Guidance
                </h3>
                <p className="text-sm sm:text-[14px] text-gray-600 mt-1.5 leading-relaxed font-normal">
                  Travel agencies have experienced professionals guidance.
                </p>
              </div>
            </div>

            {/* 2. Deals & Discounts */}
            <div className="flex items-start gap-4 sm:gap-4.5">
              <div className="w-12 h-12 rounded-full bg-[#00A3FF] text-white flex items-center justify-center shrink-0 shadow-xs">
                {/* Bold Percent Icon */}
                <span className="text-xl font-black leading-none">%</span>
              </div>
              <div>
                <h3 className="text-[18px] sm:text-[19px] font-bold text-gray-950 tracking-tight">
                  Deals &amp; Discounts
                </h3>
                <p className="text-sm sm:text-[14px] text-gray-600 mt-1.5 leading-relaxed font-normal">
                  Agencies have special discounts on flights, hotels, &amp; packages.
                </p>
              </div>
            </div>

            {/* 3. Saves Money */}
            <div className="flex items-start gap-4 sm:gap-4.5">
              <div className="w-12 h-12 rounded-full bg-[#FF9F00] text-white flex items-center justify-center shrink-0 shadow-xs">
                {/* Wallet Icon */}
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="20" height="14" x="2" y="5" rx="2" />
                  <line x1="2" x2="22" y1="10" y2="10" />
                  <path d="M16 14h.01" strokeWidth="3" />
                </svg>
              </div>
              <div>
                <h3 className="text-[18px] sm:text-[19px] font-bold text-gray-950 tracking-tight">
                  Saves Money
                </h3>
                <p className="text-sm sm:text-[14px] text-gray-600 mt-1.5 leading-relaxed font-normal">
                  Avoids hidden fees &amp; tourist traps, Multi-destination &amp; budget-friendly options.
                </p>
              </div>
            </div>
          </div>

          {/* Blue CTA Pill Button */}
          <div className="mt-10 sm:mt-12 flex justify-center">
            <Link
              href="#special-offers"
              className="inline-flex items-center gap-3.5 px-7 sm:px-9 py-3.5 sm:py-4 rounded-full bg-[#1877F2] hover:bg-[#1565C0] text-white transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 cursor-pointer group"
            >
              <span className="text-sm sm:text-[15px] font-normal tracking-wide">
                Flat 30% Discounts All Packages
              </span>
              <span className="text-sm sm:text-[15px] font-bold tracking-tight inline-flex items-center gap-1 group-hover:underline">
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

