"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Clock, ArrowRight } from "lucide-react";
import { TourPackage } from "./types";

interface PackageCardProps {
  pkg: TourPackage;
}

export default function PackageCard({ pkg }: PackageCardProps) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group h-full">
      {/* ─── Card Image with Location & Duration Overlay ─── */}
      <div className="relative w-full h-52 sm:h-56 overflow-hidden bg-gray-100">
        <Image
          src={pkg.image}
          alt={pkg.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Subtle Dark Gradient at bottom of image for badge legibility */}
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/85 via-black/40 to-transparent pointer-events-none" />

        {/* Location & Duration Badges */}
        <div className="absolute inset-x-0 bottom-2.5 px-3.5 flex items-center justify-between text-white text-[13px] sm:text-[14px] font-semibold select-none z-10">
          {/* Location */}
          <div className="flex items-center gap-1.5 drop-shadow-sm">
            <MapPin className="w-4 h-4 shrink-0 text-white" strokeWidth={2.2} />
            <span className="truncate max-w-[130px]">{pkg.location}</span>
          </div>

          {/* Duration */}
          <div className="flex items-center gap-1.5 drop-shadow-sm">
            <Clock className="w-4 h-4 shrink-0 text-white" strokeWidth={2.2} />
            <span className="whitespace-nowrap">{pkg.duration}</span>
          </div>
        </div>
      </div>

      {/* ─── Card Body ─── */}
      <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between">
        <div>
          {/* Package Title */}
          <h3 className="text-[16px] sm:text-[17px] font-bold text-gray-950 leading-snug line-clamp-2 group-hover:text-[#1877F2] transition-colors">
            {pkg.title}
          </h3>

          {/* Short Excerpt */}
          <p className="text-xs sm:text-[13px] text-gray-500 mt-2 leading-relaxed line-clamp-2">
            {pkg.description}
          </p>
        </div>

        {/* ─── Card Footer: Price & View Details Pill Button ─── */}
        <div className="mt-5 pt-3.5 border-t border-gray-100 flex items-center justify-between gap-3">
          <div className="flex flex-col text-left">
            <span className="text-[11px] font-medium text-gray-400 uppercase tracking-wider">
              Starting from
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-lg sm:text-xl font-extrabold text-[#1877F2]">
                ${pkg.price}
              </span>
              <span className="text-xs text-gray-400 font-medium">/ person</span>
            </div>
          </div>

          {/* Navy Pill "View Details →" Button */}
          <Link
            href={`#package-${pkg.id}`}
            className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-2.5 rounded-full bg-[#102A6B] hover:bg-[#1877F2] text-white text-xs sm:text-[13px] font-semibold transition-all duration-200 shadow-xs hover:shadow-md active:scale-95 shrink-0"
          >
            <span>View Details</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

