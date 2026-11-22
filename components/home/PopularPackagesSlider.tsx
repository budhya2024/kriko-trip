"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Tag,
} from "lucide-react";
import type { PackageListItem } from "@/lib/api/contracts";
import { getPricingDisplay } from "@/lib/pricing-display";

import "swiper/css";

interface PopularPackagesSliderProps {
  packages: PackageListItem[];
}

const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80";

function PopularPackageCardItem({ pkg }: { pkg: PackageListItem }) {
  const images = pkg.coverImageUrl ? [pkg.coverImageUrl] : [DEFAULT_IMAGE];
  const [activeImg, setActiveImg] = useState(0);

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveImg((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveImg((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const pricing = getPricingDisplay(pkg.pricePaise, pkg.originalPricePaise);
  const href = `/tour-packages/${pkg.slug}`;
  const badgeText = pkg.badgeLabel || `${pkg.travelType.toUpperCase()} TOUR`;
  const durationText = `${pkg.days} Days/${pkg.nights} Nights`;

  return (
    <div className="bg-white rounded-2xl p-3.5 sm:p-4 transition-all duration-300 border border-gray-100 flex flex-col h-full group">
      <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden bg-gray-100 select-none">
        <Link
          href={href}
          className="absolute inset-0 z-10 cursor-pointer"
          aria-label={`View details of ${pkg.title}`}
        />

        <div
          className="flex h-full w-full transition-transform duration-400 ease-out"
          style={{ transform: `translateX(-${activeImg * 100}%)` }}
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

        <div className="absolute top-3 inset-x-3 flex items-center justify-between z-20 pointer-events-none">
          <span className="bg-[#FFDE14] text-gray-950 text-xs font-bold px-3 py-1 rounded-full shadow-sm">
            {badgeText}
          </span>
          {pricing.hasDiscount && (
            <span className="bg-[#DE1D26] text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-sm tracking-wide inline-flex items-center gap-1">
              <Tag className="w-3 h-3 stroke-[2.2]" />
              {pricing.discountPercent}% OFF
            </span>
          )}
        </div>

        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous image"
              className="absolute left-2 top-1/2 -translate-y-1/2 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white/90 hover:bg-white text-gray-800 flex items-center justify-center transition-all z-20 cursor-pointer opacity-90 sm:opacity-0 sm:group-hover:opacity-100 shadow-xs active:scale-90"
            >
              <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5]" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next image"
              className="absolute right-2 top-1/2 -translate-y-1/2 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white/90 hover:bg-white text-gray-800 flex items-center justify-center transition-all z-20 cursor-pointer opacity-90 sm:opacity-0 sm:group-hover:opacity-100 shadow-xs active:scale-90"
            >
              <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5]" />
            </button>
          </>
        )}

        {images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-20">
            {images.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setActiveImg(idx);
                }}
                aria-label={`Go to photo ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  activeImg === idx
                    ? "w-4 bg-white shadow-sm"
                    : "w-1.5 bg-white/60 hover:bg-white/90"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      <div className="pt-3.5 pb-2 px-1 flex-1 flex flex-col justify-between">
        <div>
          <Link href={href}>
            <h3 className="text-[14px] sm:text-[15px] font-semibold text-[#1877F2] hover:text-[#00285C] transition-colors line-clamp-1">
              {pkg.title}
            </h3>
          </Link>

          <div className="flex items-center gap-2 mt-1.5 text-xs text-gray-500">
            <span className="flex items-center gap-1 font-normal text-gray-600">
              <MapPin className="w-3 h-3 text-gray-400 shrink-0" />
              {pkg.destination.name}
            </span>
            <span className="text-gray-300">↔</span>
            <span className="font-normal text-gray-500">
              {durationText}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-3.5 mt-3 border-t border-gray-100 gap-2 min-w-0">
          <Link
            href={href}
            className="inline-flex items-center gap-1 px-3.5 sm:px-4 py-1.5 rounded-full bg-[#1877F2] hover:bg-[#00285C] text-white text-[11px] sm:text-xs font-semibold shadow-2xs hover:shadow-md transition-colors active:scale-95 cursor-pointer shrink-0"
          >
            <span className="relative z-10">Book Now</span>
            <ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 stroke-[2] text-white relative z-10" />
          </Link>

          <div className="flex flex-col text-right items-end shrink-0 min-w-0">
            <div className="flex items-center gap-1.5 leading-none mb-1">
              <span className="text-[10px] text-gray-400 font-normal">
                Starting From
              </span>
              {pricing.hasDiscount && (
                <span className="badge-shine relative overflow-hidden inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-amber-50 border border-amber-200 text-[#C2410C] text-[10px] font-bold leading-none">
                  <Tag className="w-2.5 h-2.5 stroke-[2.2]" />
                  Save {pricing.saveFormatted}
                </span>
              )}
            </div>
            <div className="flex items-baseline justify-end gap-1.5 leading-none">
              {pricing.hasDiscount && pricing.originalPriceFormatted && (
                <span className="text-[11px] text-gray-400 line-through font-normal">
                  {pricing.originalPriceFormatted}
                </span>
              )}
              <span className="text-[14px] sm:text-[15px] font-semibold text-gray-900 leading-tight">
                {pricing.priceFormatted}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PopularPackagesSlider({
  packages,
}: PopularPackagesSliderProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div>
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
              slidesPerView: 3.2,
              spaceBetween: 24,
            },
            1280: {
              slidesPerView: 3.4,
              spaceBetween: 24,
            },
          }}
          className="w-full"
        >
          {packages.map((pkg) => (
            <SwiperSlide key={pkg.id}>
              <PopularPackageCardItem pkg={pkg} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {packages.slice(0, 3).map((pkg) => (
            <div
              key={pkg.id}
              className="bg-white rounded-2xl p-3.5 border border-gray-150"
            >
              <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden bg-gray-100">
                <Image
                  src={pkg.coverImageUrl || DEFAULT_IMAGE}
                  alt={pkg.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="pt-3">
                <h3 className="text-sm font-semibold text-gray-900 truncate">
                  {pkg.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
