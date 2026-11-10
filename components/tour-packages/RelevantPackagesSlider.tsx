"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { MapPin, ArrowUpRight } from "lucide-react";
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
    <section className="bg-white py-8 sm:py-16">
      <div className="container">
        {/* Centered Header (Clean & Minimalist, No Arrows) */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
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
                slidesPerView: 3,
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

// ─── Clean Card without any image navigation arrows or dots ───
function RelevantPackageCard({ pkg }: { pkg: TourPackage }) {
  const originalPrice =
    pkg.originalPrice && pkg.originalPrice > pkg.price
      ? pkg.originalPrice
      : Math.round(pkg.price * 1.25);
  const savings = originalPrice - pkg.price;
  const discountPercent = Math.round((savings / originalPrice) * 100);

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col justify-between h-full">
      {/* Photo with Yellow Discount Tag on Top Right & Travel Type on Bottom Left (No arrows, no dots) */}
      <Link
        href={`/tour-packages/${pkg.id}`}
        className="block relative w-full aspect-[16/10] overflow-hidden bg-gray-100 select-none cursor-pointer"
        aria-label={pkg.title}
      >
        <Image
          src={pkg.image}
          alt={pkg.title}
          fill
          sizes="(max-width: 768px) 100vw, 380px"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Yellow Discount Tag */}
        <div className="absolute top-3 right-3 z-10 px-2.5 py-1 rounded-md bg-[#FACC15] text-gray-950 text-[11px] font-semibold shadow-xs pointer-events-none">
          -{discountPercent}% OFF
        </div>

        {/* Travel Type Badge */}
        <div className="absolute bottom-3 left-3 z-10 px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-xs text-white text-[11px] font-normal pointer-events-none">
          {pkg.travelType}
        </div>
      </Link>

      {/* Card Body */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between text-left">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#1877F2] shrink-0" />
            <span className="font-normal truncate">
              {pkg.location}, {pkg.destination}
            </span>
          </div>
          <h3 className="text-sm sm:text-base font-semibold text-gray-900 group-hover:text-[#1877F2] transition-colors line-clamp-2 leading-snug">
            <Link href={`/tour-packages/${pkg.id}`}>
              {pkg.title}
            </Link>
          </h3>
          <p className="text-xs text-gray-500 mt-1 font-normal">
            Duration: {pkg.duration}
          </p>
        </div>

        {/* Card Footer: Book Now Button (Left) & Starting From, Original & Sales Price (Right) */}
        <div className="pt-3.5 mt-3 border-t border-gray-100 flex items-center justify-between gap-2 min-w-0">
          {/* Book Now Button */}
          <Link
            href={`/tour-packages/${pkg.id}`}
            className="inline-flex items-center gap-1 px-3.5 sm:px-4 py-1.5 rounded-full bg-[#1877F2] hover:bg-[#00285C] text-white text-[11px] sm:text-xs font-semibold shadow-2xs hover:shadow-xs transition-colors active:scale-95 cursor-pointer shrink-0"
          >
            <span>Book Now</span>
            <ArrowUpRight className="w-3 h-3 stroke-[2.2] text-white" />
          </Link>

          {/* Starting From & Prices */}
          <div className="flex flex-col text-right items-end shrink-0 min-w-0">
            <span className="text-[9px] text-gray-400 font-normal leading-none mb-0.5">
              Starting From
            </span>
            <div className="flex items-baseline justify-end gap-1 leading-none">
              <span className="text-[10px] text-gray-400 line-through font-normal">
                ₹{originalPrice.toLocaleString("en-IN")}
              </span>
              <span className="text-[12.5px] sm:text-[13px] font-bold text-gray-900 leading-tight">
                ₹{pkg.price.toLocaleString("en-IN")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
