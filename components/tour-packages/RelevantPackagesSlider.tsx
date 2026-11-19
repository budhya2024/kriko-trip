"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import {
  MapPin,
  Clock,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  PhoneCall,
  Tag,
} from "lucide-react";
import { openCallbackModal } from "@/components/shared";
import { TourPackage } from "./types";

import "swiper/css";

interface RelevantPackagesSliderProps {
  packages: TourPackage[];
  title?: string;
  subtitle?: string;
}

export default function RelevantPackagesSlider({
  packages,
  title = "Relevant Package",
  subtitle = "A curated list of inspiration the most tour & travel based on different destinations.",
}: RelevantPackagesSliderProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!packages || packages.length === 0) return null;

  return (
    <section className="bg-white py-8 sm:py-16 print:hidden">
      <div className="container">
        {/* Centered Header (Clean & Minimalist, No Arrows) */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 tracking-tight">
            {title}
          </h2>
          {subtitle && (
            <p className="text-xs sm:text-sm text-gray-500 mt-2 font-normal">
              {subtitle}
            </p>
          )}
        </div>

        {/* ─── Swiper Carousel (No Arrows, No Dots, Smooth Autoplay & Drag) ─── */}
        {mounted ? (
          <Swiper
            modules={[Autoplay]}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            loop={packages.length > 3}
            grabCursor={true}
            breakpoints={{
              320: {
                slidesPerView: 1.15,
                spaceBetween: 16,
              },
              640: {
                slidesPerView: 2.15,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 3.5,
                spaceBetween: 24,
              },
            }}
            className="w-full"
          >
            {packages.map((pkg) => (
              <SwiperSlide key={pkg.id} className="h-auto">
                <RelevantPackageCard pkg={pkg} />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          /* SSR Static Fallback Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {packages.slice(0, 3).map((pkg) => (
              <RelevantPackageCard key={pkg.id} pkg={pkg} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

// ─── Relevant Package Card with Multiple Images Slider, Arrows & Indicator Dots ───
function RelevantPackageCard({ pkg }: { pkg: TourPackage }) {
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
    <div className="bg-white rounded-2xl overflow-hidden transition-all duration-300 border border-gray-100 flex flex-col h-full group hover:shadow-xl shadow-sm">
      {/* ─── Image Container with Multiple Images Slider, Navigation Arrows & Dots: Full Width ─── */}
      <div className="relative w-full aspect-[4/3] sm:h-56 overflow-hidden bg-gray-100 select-none image-shine">
        {/* Top Badges: Tour Type on Left + Percent OFF on Right */}
        <div className="absolute top-2.5 inset-x-2.5 flex items-center justify-between z-20 pointer-events-none">
          <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-xs text-white text-[11px] font-medium drop-shadow-sm">
            {pkg.travelType}
          </span>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#DE1D26] text-white text-[11px] font-bold shadow-sm tracking-wide">
            <Tag className="w-3 h-3 stroke-[2.2]" />
            {discountPercent}% OFF
          </span>
        </div>

        {/* Clickable Overlay to Package Page */}
        <Link
          href={`/tour-packages/${pkg.id}`}
          className="absolute inset-0 z-10 cursor-pointer"
          aria-label={`View details of ${pkg.title}`}
        />

        {/* Sliding Images Container */}
        <div
          className="flex h-full w-full transition-transform duration-400 ease-out"
          style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
        >
          {images.map((imgSrc, idx) => (
            <div key={idx} className="relative w-full h-full shrink-0">
              <Image
                src={imgSrc}
                alt={`${pkg.title} - photo ${idx + 1}`}
                fill
                sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                priority={idx === 0}
              />
            </div>
          ))}
        </div>

        {/* Previous & Next Navigation Arrows (Visible on hover or mobile) */}
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={handlePrev}
              onTouchStart={(e) => e.stopPropagation()}
              aria-label="Previous photo"
              className="swiper-no-swiping absolute left-2.5 top-1/2 -translate-y-1/2 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-black/45 hover:bg-black/75 text-white flex items-center justify-center transition-all z-20 cursor-pointer opacity-90 sm:opacity-0 sm:group-hover:opacity-100 shadow-sm active:scale-90"
            >
              <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5]" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              onTouchStart={(e) => e.stopPropagation()}
              aria-label="Next photo"
              className="swiper-no-swiping absolute right-2.5 top-1/2 -translate-y-1/2 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-black/45 hover:bg-black/75 text-white flex items-center justify-center transition-all z-20 cursor-pointer opacity-90 sm:opacity-0 sm:group-hover:opacity-100 shadow-sm active:scale-90"
            >
              <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5]" />
            </button>
          </>
        )}

        {/* Subtle Dark Gradient at bottom of image for badge legibility */}
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/85 via-black/45 to-transparent pointer-events-none z-10" />

        {/* Dynamic Indicator Dots matching Active Image */}
        {images.length > 1 && (
          <div
            onTouchStart={(e) => e.stopPropagation()}
            className="swiper-no-swiping absolute bottom-9 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-20"
          >
            {images.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setCurrentImageIndex(idx);
                }}
                aria-label={`Go to photo ${idx + 1}`}
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

      {/* Card Content Area - Only under-content has padding */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Title */}
          <Link href={`/tour-packages/${pkg.id}`}>
            <h3 className="text-[14px] sm:text-[15px] font-semibold text-[#1877F2] hover:text-[#00285C] leading-snug line-clamp-2 transition-colors">
              {pkg.title}
            </h3>
          </Link>

          {/* Short Excerpt */}
          <p className="text-xs text-gray-500 mt-1.5 leading-relaxed line-clamp-2 font-normal">
            {pkg.description || `Discover the perfect ${pkg.location} Tour package, with curated stays, airport transfers, and sightseeing.`}
          </p>
        </div>

        {/* Bottom Footer Row: View Details Button & Starting From, Original & Sales Price */}
        <div className="mt-3.5 pt-3 border-t border-gray-100 flex items-center justify-between gap-2 min-w-0">
          {/* View Details Button */}
          <Link
            href={`/tour-packages/${pkg.id}`}
            className="inline-flex items-center gap-1 px-3.5 sm:px-4 py-1.5 rounded-full border border-[#1877F2] text-[#1877F2] hover:bg-[#1877F2] hover:text-white text-[11px] sm:text-xs font-medium transition-colors active:scale-95 cursor-pointer shrink-0"
          >
            <span>View Details</span>
            <ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 stroke-[2]" />
          </Link>

          {/* Starting From, Original Price & Sales Price */}
          <div className="flex flex-col text-right items-end shrink-0 min-w-0">
            <div className="flex items-center gap-1 leading-none mb-0.5">
              <span className="text-[9px] text-gray-400 font-normal">
                Starting From
              </span>
              {savings > 0 && (
                <span className="badge-shine relative overflow-hidden inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-amber-50 border border-amber-200 text-[#C2410C] text-[9px] font-medium leading-none">
                  <Tag className="w-2 h-2 stroke-[2.2]" />
                  Save ₹{savings.toLocaleString("en-IN")}
                </span>
              )}
            </div>
            <div className="flex items-baseline justify-end gap-1 leading-none">
              <span className="text-[10px] text-gray-400 line-through font-normal">
                ₹{originalPrice.toLocaleString("en-IN")}
              </span>
              <span className="text-[14px] sm:text-[15px] font-bold text-gray-900 leading-tight">
                ₹{pkg.price.toLocaleString("en-IN")}
              </span>
            </div>
          </div>
        </div>

        {/* Full-Width Bottom Get Offer Button */}
        <button
          type="button"
          onClick={() =>
            openCallbackModal({
              destination: pkg.location,
              title: pkg.title,
              price: pkg.price,
              originalPrice: pkg.originalPrice,
              savings: (pkg.originalPrice || 0) - pkg.price,
            })
          }
          className="mt-3 w-full py-2.5 px-3 rounded-lg bg-[#1877F2] hover:bg-[#00285C] active:scale-[0.99] text-white text-xs sm:text-[13px] font-medium flex items-center justify-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
        >
          <Tag className="w-3.5 h-3.5 shrink-0" />
          <span>Get Offer</span>
        </button>
      </div>
    </div>
  );
}

