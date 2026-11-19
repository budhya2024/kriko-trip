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
  Clock,
  Tag,
} from "lucide-react";
import { openCallbackModal } from "@/components/shared";

import "swiper/css";

interface PackageCard {
  id: number;
  badge: string;
  badgeColor?: string;
  title: string;
  destination: string;
  duration: string;
  price: number;
  originalPrice: number;
  description?: string;
  image: string;
  images: string[];
  href: string;
}

const packages: PackageCard[] = [
  {
    id: 1,
    badge: "Couple Tour",
    title: "Andaman Tropical Island Stay",
    destination: "Andaman, India",
    duration: "5D/4N",
    price: 18500,
    originalPrice: 22000,
    image:
      "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=800&q=80",
    ],
    href: "/tour-packages/andaman-short-stay",
  },
  {
    id: 2,
    badge: "Family Tour",
    title: "Andaman Wonders & Havelock",
    destination: "Andaman, India",
    duration: "6D/5N",
    price: 28999,
    originalPrice: 34000,
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=800&q=80",
    ],
    href: "/tour-packages/andaman-wonders",
  },
  {
    id: 3,
    badge: "Group Tour",
    title: "Best of Andaman & Neil Island",
    destination: "Andaman, India",
    duration: "7D/6N",
    price: 38500,
    originalPrice: 44000,
    image:
      "https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80",
    ],
    href: "/tour-packages/best-of-andaman",
  },
  {
    id: 4,
    badge: "Honeymoon Special",
    title: "Kashmir Paradise & Gulmarg Snow",
    destination: "Kashmir, India",
    duration: "6D/5N",
    price: 32500,
    originalPrice: 39000,
    image:
      "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    ],
    href: "/tour-packages/kashmir-valley-paradise",
  },
  {
    id: 5,
    badge: "Heritage Tour",
    title: "Royal Rajasthan Forts & Palaces",
    destination: "Rajasthan, India",
    duration: "7D/6N",
    price: 34999,
    originalPrice: 42000,
    image:
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    ],
    href: "/tour-packages/rajasthan-royal-heritage",
  },
  {
    id: 6,
    badge: "Nature Tour",
    title: "Kerala Backwaters & Munnar Hills",
    destination: "Kerala, India",
    duration: "6D/5N",
    price: 26999,
    originalPrice: 32000,
    image:
      "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80",
    ],
    href: "/tour-packages/kerala-backwaters-munnar",
  },
];

function PopularPackageCardItem({ pkg }: { pkg: PackageCard }) {
  const [activeImg, setActiveImg] = useState(0);
  const images = pkg.images && pkg.images.length > 0 ? pkg.images : [pkg.image];

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

  const savings = pkg.originalPrice - pkg.price;
  const discountPercent = Math.round((savings / pkg.originalPrice) * 100);

  return (
    <div className="bg-white rounded-2xl overflow-hidden transition-all duration-300 border border-gray-100 flex flex-col h-full group hover:shadow-xl shadow-sm">
      {/* ─── Image Container with Multiple Images Slider, Navigation Arrows & Dots: Full Width ─── */}
      <div className="relative w-full aspect-[4/3] sm:h-56 overflow-hidden bg-gray-100 select-none image-shine">
        {/* Top Badges: Tour Type on Left + Percent OFF on Right */}
        <div className="absolute top-2.5 inset-x-2.5 flex items-center justify-between z-20 pointer-events-none">
          <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-xs text-white text-[11px] font-medium drop-shadow-sm">
            {pkg.badge.replace(" Tour", "").replace(" Special", "")}
          </span>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#DE1D26] text-white text-[11px] font-bold shadow-sm tracking-wide">
            <Tag className="w-3 h-3 stroke-[2.2]" />
            {discountPercent}% OFF
          </span>
        </div>

        {/* Clickable Overlay to Package Page */}
        <Link
          href={pkg.href}
          className="absolute inset-0 z-10 cursor-pointer"
          aria-label={`View details of ${pkg.title}`}
        />

        {/* Sliding Images Container */}
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

        {/* Previous & Next Navigation Arrows (Visible on mobile or hover on desktop) */}
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous image"
              className="absolute left-2.5 top-1/2 -translate-y-1/2 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-black/45 hover:bg-black/75 text-white flex items-center justify-center transition-all z-20 cursor-pointer opacity-90 sm:opacity-0 sm:group-hover:opacity-100 shadow-sm active:scale-90"
            >
              <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5]" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next image"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-black/45 hover:bg-black/75 text-white flex items-center justify-center transition-all z-20 cursor-pointer opacity-90 sm:opacity-0 sm:group-hover:opacity-100 shadow-sm active:scale-90"
            >
              <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5]" />
            </button>
          </>
        )}

        {/* Subtle Dark Gradient at bottom of image for badge legibility */}
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/85 via-black/45 to-transparent pointer-events-none z-10" />

        {/* Dynamic Indicator Dots matching Active Image */}
        {images.length > 1 && (
          <div className="absolute bottom-9 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-20">
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

        {/* Location & Duration Badges at the bottom edge */}
        <div className="absolute inset-x-0 bottom-2.5 px-3.5 flex items-center justify-between text-white text-[13px] sm:text-[14px] font-semibold select-none z-20">
          {/* Location */}
          <div className="flex items-center gap-1.5 drop-shadow-sm">
            <MapPin className="w-4 h-4 shrink-0 text-white" strokeWidth={2.2} />
            <span className="truncate max-w-[130px]">{pkg.destination.split(",")[0]}</span>
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
          <Link href={pkg.href}>
            <h3 className="text-[14px] sm:text-[15px] font-semibold text-[#1877F2] hover:text-[#00285C] leading-snug line-clamp-2 transition-colors">
              {pkg.title}
            </h3>
          </Link>

          {/* Short Excerpt */}
          <p className="text-xs text-gray-500 mt-1.5 leading-relaxed line-clamp-2 font-normal">
            {pkg.description || `Discover the perfect ${pkg.destination.split(",")[0]} Tour package, with curated stays, airport transfers, and sightseeing.`}
          </p>
        </div>

        {/* Bottom Footer Row: View Details Button (Left) & Starting From, Original & Sales Price (Right) */}
        <div className="mt-3.5 pt-3 border-t border-gray-100 flex items-center justify-between gap-2 min-w-0">
          {/* View Details Button */}
          <Link
            href={pkg.href}
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
                ₹{pkg.originalPrice.toLocaleString("en-IN")}
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
              destination: pkg.destination,
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

export default function PopularPackages() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="w-full bg-white py-0 md:py-6 relative overflow-hidden">
      <div className="container relative z-20">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto pb-6 md:pb-8">
          <h2 className="section-title">
            Popular Package
          </h2>
          <p className="section-details max-w-xl mx-auto">
            A curated list of the most popular travel packages based on different
            destinations.
          </p>
        </div>

        {/* ─── Package Cards Swiper Slider ─── */}
        <div>
          {mounted ? (
            <Swiper
              modules={[Autoplay]}
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              loop={true}
              grabCursor={true}
              breakpoints={{
                320: {
                  slidesPerView: 1.15,
                  spaceBetween: 16,
                },
                640: {
                  slidesPerView: 2,
                  spaceBetween: 16,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 16,
                },
                1280: {
                  slidesPerView: 4,
                  spaceBetween: 16,
                },
              }}
              className="w-full pb-10!"
            >
              {packages.map((pkg) => (
                <SwiperSlide key={pkg.id}>
                  <PopularPackageCardItem pkg={pkg} />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            /* SSR Initial Grid Fallback */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {packages.slice(0, 3).map((pkg) => (
                <div
                  key={pkg.id}
                  className="bg-white rounded-2xl p-3.5 border border-gray-150"
                >
                  <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden bg-gray-100">
                    <Image
                      src={pkg.image}
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
      </div>
    </section>
  );
}
