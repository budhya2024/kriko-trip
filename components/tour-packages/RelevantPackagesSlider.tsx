"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { MapPin, ArrowUpRight, ChevronLeft, ChevronRight, Tag } from "lucide-react";
import type { TourPackage } from "./types";
import { getPricingDisplay } from "@/lib/pricing-display";
import { toPaise } from "@/lib/format";

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

function RelevantPackageCard({ pkg }: { pkg: TourPackage }) {
  const fallbackImage =
    "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=80";
  const images =
    pkg.images && pkg.images.length > 0
      ? pkg.images
      : pkg.image
        ? [pkg.image]
        : [fallbackImage];

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

  const pricePaise = pkg.pricePaise || toPaise(pkg.price);
  const origPaise =
    pkg.originalPricePaise ?? (pkg.originalPrice ? toPaise(pkg.originalPrice) : null);
  const pricing = getPricingDisplay(pricePaise, origPaise);
  const targetHref = `/tour-packages/${pkg.slug || pkg.id}`;

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col justify-between h-full">
      <div className="relative w-full aspect-[16/10] overflow-hidden bg-gray-100 select-none">
        <Link
          href={targetHref}
          className="absolute inset-0 z-10 cursor-pointer"
          aria-label={pkg.title}
        />

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
                sizes="(max-width: 768px) 100vw, 380px"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                priority={idx === 0}
              />
            </div>
          ))}
        </div>

        {pricing.hasDiscount ? (
          <div className="absolute top-3 right-3 z-20 px-2.5 py-1 rounded-md bg-[#FACC15] text-gray-950 text-[11px] font-semibold shadow-xs pointer-events-none">
            -{pricing.discountPercent}% OFF
          </div>
        ) : pkg.badgeLabel ? (
          <div className="absolute top-3 right-3 z-20 px-2.5 py-1 rounded-md bg-[#1877F2] text-white text-[11px] font-semibold shadow-xs pointer-events-none">
            {pkg.badgeLabel}
          </div>
        ) : null}

        <div className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-black/55 via-black/20 to-transparent pointer-events-none z-10" />

        <div className="absolute bottom-3 left-3 z-20 px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-xs text-white text-[11px] font-normal pointer-events-none capitalize">
          {pkg.travelType}
        </div>

        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={handlePrev}
              onTouchStart={(e) => e.stopPropagation()}
              aria-label="Previous photo"
              className="swiper-no-swiping absolute left-2 top-1/2 -translate-y-1/2 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-black/45 hover:bg-black/75 text-white flex items-center justify-center opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity z-20 cursor-pointer shadow-sm active:scale-90"
            >
              <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5]" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              onTouchStart={(e) => e.stopPropagation()}
              aria-label="Next photo"
              className="swiper-no-swiping absolute right-2 top-1/2 -translate-y-1/2 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-black/45 hover:bg-black/75 text-white flex items-center justify-center opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity z-20 cursor-pointer shadow-sm active:scale-90"
            >
              <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5]" />
            </button>
          </>
        )}

        {images.length > 1 && (
          <div
            onTouchStart={(e) => e.stopPropagation()}
            className="swiper-no-swiping absolute bottom-3.5 right-3 flex items-center gap-1 z-20"
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
      </div>

      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between text-left">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#1877F2] shrink-0" />
            <span className="font-normal truncate">
              {pkg.location || pkg.destination}
            </span>
          </div>
          <h3 className="text-sm sm:text-base font-semibold text-gray-900 group-hover:text-[#1877F2] transition-colors line-clamp-2 leading-snug">
            <Link href={targetHref}>
              {pkg.title}
            </Link>
          </h3>
          <p className="text-xs text-gray-500 mt-1 font-normal">
            Duration: {pkg.duration}
          </p>
        </div>

        <div className="pt-3.5 mt-3 border-t border-gray-100 flex items-center justify-between gap-2 min-w-0">
          <Link
            href={targetHref}
            className="inline-flex items-center gap-1 px-3.5 sm:px-4 py-1.5 rounded-full bg-[#1877F2] hover:bg-[#00285C] text-white text-[11px] sm:text-xs font-semibold shadow-2xs hover:shadow-xs transition-colors active:scale-95 cursor-pointer shrink-0"
          >
            <span>Book Now</span>
            <ArrowUpRight className="w-3 h-3 stroke-[2.2] text-white" />
          </Link>

          <div className="flex flex-col text-right items-end shrink-0 min-w-0">
            <div className="flex items-center gap-1 leading-none mb-0.5 justify-end">
              <span className="text-[9px] text-gray-400 font-normal leading-none">
                Starting From
              </span>
              {pricing.hasDiscount && (
                <span className="inline-flex items-center gap-0.5 px-1 py-0.2 rounded bg-amber-50 border border-amber-200 text-[#C2410C] text-[9px] font-bold leading-none">
                  <Tag className="w-2 h-2 stroke-[2.2]" />
                  Save {pricing.saveFormatted}
                </span>
              )}
            </div>
            <div className="flex items-baseline justify-end gap-1 leading-none">
              {pricing.hasDiscount && pricing.originalPriceFormatted && (
                <span className="text-[10px] text-gray-400 line-through font-normal">
                  {pricing.originalPriceFormatted}
                </span>
              )}
              <span className="text-[12.5px] sm:text-[13px] font-bold text-gray-900 leading-tight">
                {pricing.priceFormatted}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
