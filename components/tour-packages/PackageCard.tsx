"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Clock, ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { TourPackage } from "./types";

interface PackageCardProps {
  pkg: TourPackage;
}

export default function PackageCard({ pkg }: PackageCardProps) {
  const images = pkg.images && pkg.images.length > 0 ? pkg.images : [pkg.image];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const originalPrice =
    pkg.originalPrice && pkg.originalPrice > pkg.price
      ? pkg.originalPrice
      : Math.round(pkg.price * 1.25);
  const savings = originalPrice - pkg.price;
  const discountPercent = Math.round((savings / originalPrice) * 100);

  return (
    <div className="bg-white rounded-xl overflow-hidden border border-gray-200/90 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col group h-full">
      {/* ─── Card Image Slider with Multiple Images & Indicator Dots ─── */}
      <div className="relative w-full h-52 sm:h-56 overflow-hidden bg-gray-100 select-none image-shine">
        {/* Top Badges: Travel Type & Discount Percent OFF */}
        <div className="absolute top-2.5 inset-x-2.5 flex items-center justify-between z-20 pointer-events-none">
          <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-xs text-white text-[11px] font-semibold drop-shadow-sm">
            {pkg.travelType}
          </span>
          <span className="px-2.5 py-1 rounded-full bg-[#EF4444] text-white text-[11px] font-extrabold shadow-sm tracking-wide">
            {discountPercent}% OFF
          </span>
        </div>

        {/* Clickable Overlay to Package Details Page */}
        <Link
          href={`/tour-packages/${pkg.id}`}
          className="absolute inset-0 z-10 cursor-pointer"
          aria-label={`View details of ${pkg.title}`}
        />

        {/* Sliding Images Container */}
        <div
          className="flex h-full w-full transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
        >
          {images.map((imgSrc, idx) => (
            <div key={idx} className="relative w-full h-full shrink-0">
              <Image
                src={imgSrc}
                alt={`${pkg.title} - photo ${idx + 1}`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover"
                priority={idx === 0}
              />
            </div>
          ))}
        </div>

        {/* Previous & Next Navigation Arrows (Visible on hover) */}
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous photo"
              className="absolute left-2.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/45 hover:bg-black/75 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20 cursor-pointer shadow-sm"
            >
              <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next photo"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/45 hover:bg-black/75 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20 cursor-pointer shadow-sm"
            >
              <ChevronRight className="w-4 h-4 stroke-[2.5]" />
            </button>
          </>
        )}

        {/* Subtle Dark Gradient at bottom of image for badge legibility */}
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/85 via-black/45 to-transparent pointer-events-none z-10" />

        {/* Pagination Indicator Dots */}
        {images.length > 1 && (
          <div className="absolute bottom-9 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-20">
            {images.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setCurrentImageIndex(idx);
                }}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  currentImageIndex === idx
                    ? "w-4 bg-white shadow-sm"
                    : "w-1.5 bg-white/60 hover:bg-white/90"
                }`}
              />
            ))}
          </div>
        )}

        {/* Location & Duration Badges at the bottom edge */}
        <div className="absolute inset-x-0 bottom-2.5 px-3.5 flex items-center justify-between text-white text-[13px] sm:text-[14px] font-semibold select-none z-20">
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
      <div className="p-5 sm:p-5 flex flex-col flex-1 justify-between">
        <div>
          {/* Package Title */}
          <h3 className="text-[16px] sm:text-[17px] font-bold text-gray-950 leading-snug line-clamp-2 group-hover:text-[#1877F2] transition-colors">
            <Link href={`/tour-packages/${pkg.id}`}>
              {pkg.title}
            </Link>
          </h3>

          {/* Short Excerpt */}
          <p className="text-xs sm:text-[13px] text-gray-500 mt-2 leading-relaxed line-clamp-2">
            {pkg.description}
          </p>
        </div>

        {/* ─── Card Footer: Book Now Button (Left) & Starting From, Original & Sales Price (Right) ─── */}
        <div className="mt-4 pt-3.5 border-t border-gray-100 flex items-center justify-between gap-3">
          {/* Book Now Button: Fully Rounded with White Text */}
          <Link
            href={`/tour-packages/${pkg.id}`}
            className="inline-flex items-center gap-1.5 px-4.5 sm:px-5 py-2.5 rounded-full bg-[#1877F2] hover:bg-[#00285C] text-white text-xs sm:text-[13px] font-bold transition-all duration-200 shadow-xs hover:shadow-md active:scale-95 shrink-0 cursor-pointer"
            style={{ backgroundColor: "#1877F2", color: "#ffffff" }}
          >
            <span>Book Now</span>
            <ArrowUpRight className="w-4 h-4 stroke-[2.5] text-white" />
          </Link>

          {/* Starting From & Prices Matching Screenshot format */}
          <div className="flex flex-col text-right items-end">
            <span className="text-[11px] sm:text-xs text-gray-500 font-medium leading-none mb-1">
              Starting From
            </span>
            <div className="flex items-center justify-end gap-2 leading-none">
              <span className="text-sm sm:text-base text-gray-400 line-through font-semibold">
                ₹{originalPrice.toLocaleString("en-IN")}
              </span>
              <span className="text-xl sm:text-2xl font-extrabold text-[#110F0F] leading-tight">
                ₹{pkg.price.toLocaleString("en-IN")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
