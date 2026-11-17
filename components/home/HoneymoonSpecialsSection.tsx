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
  PhoneCall,
  Tag,
} from "lucide-react";
import { openCallbackModal } from "@/components/shared";

import "swiper/css";

interface HoneymoonPackage {
  id: number;
  badge: string;
  title: string;
  destination: string;
  duration: string;
  price: number;
  originalPrice: number;
  image: string;
  images: string[];
  href: string;
}

const honeymoonPackages: HoneymoonPackage[] = [
  {
    id: 1,
    badge: "Honeymoon Special",
    title: "Kashmir Paradise & Gulmarg Snow Retreat",
    destination: "Kashmir, India",
    duration: "6D/5N",
    price: 32500,
    originalPrice: 39000,
    image:
      "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1527668752968-14dc70a27c95?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=800&q=80",
    ],
    href: "/tour-packages/kashmir-valley-paradise",
  },
  {
    id: 2,
    badge: "Couple Special",
    title: "Andaman Tropical Beach & Candlelight Escape",
    destination: "Andaman, India",
    duration: "6D/5N",
    price: 38500,
    originalPrice: 48000,
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=800&q=80",
    ],
    href: "/tour-packages/best-of-andaman",
  },
  {
    id: 3,
    badge: "Romantic Luxury",
    title: "Kerala Backwaters & Munnar Hills Bliss",
    destination: "Kerala, India",
    duration: "6D/5N",
    price: 26999,
    originalPrice: 34500,
    image:
      "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80",
    ],
    href: "/tour-packages/kerala-backwaters-munnar",
  },
  {
    id: 4,
    badge: "Honeymoon Special",
    title: "Lakshadweep Coral Haven & Island Sunset",
    destination: "Lakshadweep, India",
    duration: "5D/4N",
    price: 36500,
    originalPrice: 45000,
    image:
      "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=800&q=80",
    ],
    href: "/tour-packages/lakshadweep-coral-retreat",
  },
  {
    id: 5,
    badge: "Heritage Romance",
    title: "Royal Rajasthan Lake Palace & Heritage Luxury",
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
    badge: "Couple Special",
    title: "Andaman Wonders & Havelock Island Retreat",
    destination: "Andaman, India",
    duration: "6D/5N",
    price: 28999,
    originalPrice: 34000,
    image:
      "https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80",
    ],
    href: "/tour-packages/andaman-wonders",
  },
];

function HoneymoonPackageCardItem({ pkg }: { pkg: HoneymoonPackage }) {
  const [activeImg, setActiveImg] = useState(0);
  const images = pkg.images && pkg.images.length > 0 ? pkg.images : [pkg.image];
  const discountPercent = Math.round(
    ((pkg.originalPrice - pkg.price) / pkg.originalPrice) * 100
  );

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

  return (
    <div className="bg-white rounded-2xl overflow-hidden transition-all duration-300 border border-gray-100 flex flex-col h-full group hover:shadow-xl shadow-sm">
      {/* ─── Image Container: 100% Full Width (Edge-to-Edge), Slider, Arrows & Dots ─── */}
      <div className="relative w-full aspect-[4/3] overflow-hidden bg-gray-100 select-none">
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

        {/* Top Badges: Tour Type on Left + Percent OFF on Right */}
        <div className="absolute top-3 inset-x-3 flex items-center justify-between z-20 pointer-events-none">
          <span className="bg-[#FFDE14] text-gray-950 text-xs font-bold px-3 py-1 rounded-full shadow-sm">
            {pkg.badge}
          </span>
          <span className="bg-[#DE1D26] text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-sm tracking-wide inline-flex items-center gap-1">
            <Tag className="w-3 h-3 stroke-[2.2]" />
            {discountPercent}% OFF
          </span>
        </div>

        {/* Previous & Next Navigation Arrows */}
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

        {/* Dynamic Indicator Dots matching Active Image */}
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
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${activeImg === idx
                  ? "w-4 bg-white shadow-sm"
                  : "w-1.5 bg-white/60 hover:bg-white/90"
                  }`}
              />
            ))}
          </div>
        )}

        {/* Dynamic Indicator Dots matching Active Image */}
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
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${activeImg === idx
                  ? "w-4 bg-white shadow-sm"
                  : "w-1.5 bg-white/60 hover:bg-white/90"
                  }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Card Content Area - Only under-content has padding */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Title */}
          <Link href={pkg.href}>
            <h3 className="text-[14px] sm:text-[15px] font-semibold text-[#1877F2] hover:text-[#00285C] transition-colors line-clamp-1">
              {pkg.title}
            </h3>
          </Link>

          {/* Location & Duration Meta */}
          <div className="flex items-center gap-2 mt-1.5 text-xs text-gray-500">
            <span className="flex items-center gap-1 font-normal text-gray-600">
              <MapPin className="w-3 h-3 text-gray-400 shrink-0" />
              {pkg.destination}
            </span>
            <span className="text-gray-300">↔</span>
            <span className="font-normal text-gray-500">{pkg.duration}</span>
          </div>
        </div>

        {/* Bottom Footer Row: View Details Button & Starting From, Original & Sales Price */}
        <div className="flex items-center justify-between pt-3.5 mt-3 border-t border-gray-100 gap-2 min-w-0">
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
            <div className="flex items-center gap-1.5 leading-none mb-1">
              <span className="text-[10px] text-gray-400 font-normal">
                Starting From
              </span>
              {pkg.originalPrice > pkg.price && (
                <span className="badge-shine relative overflow-hidden inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-amber-50 border border-amber-200 text-[#C2410C] text-[10px] font-medium leading-none">
                  <Tag className="w-2.5 h-2.5 stroke-[2.2]" />
                  Save ₹{(pkg.originalPrice - pkg.price).toLocaleString("en-IN")}
                </span>
              )}
            </div>
            <div className="flex items-baseline justify-end gap-1.5 leading-none">
              <span className="text-[11px] text-gray-400 line-through font-normal">
                ₹{pkg.originalPrice.toLocaleString("en-IN")}
              </span>
              <span className="text-[14px] sm:text-[15px] font-semibold text-gray-900 leading-tight">
                ₹{pkg.price.toLocaleString("en-IN")}
              </span>
            </div>
          </div>
        </div>

        {/* Full-Width Bottom Request a Call Back Button */}
        <button
          type="button"
          onClick={() => openCallbackModal(pkg.destination)}
          className="mt-3 w-full py-2.5 px-3 rounded-lg bg-[#1877F2] hover:bg-[#00285C] active:scale-[0.99] text-white text-xs sm:text-[13px] font-medium flex items-center justify-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
        >
          <PhoneCall className="w-3.5 h-3.5 shrink-0" />
          <span>Request a Call Back</span>
        </button>
      </div>
    </div>
  );
}

export default function HoneymoonSpecialsSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="w-full bg-white pb-6 sm:pb-10 relative overflow-hidden">
      <div>
        {/* ─── Panoramic Scenic Banner with user specified background image ─── */}
        <div className="relative w-full overflow-hidden mb-8 sm:mb-10 flex items-center p-6 sm:p-10 lg:p-12 shadow-sm min-h-[220px] sm:min-h-[260px]">
          {/* Background Image: u1pr7tlcdqxxnwik2dnay9tfvk1o_group-tours-bg-new */}
          <Image
            src="/assets/images/group-tours-bg-new.webp"
            alt="Honeymoon & Romantic Mountain Panorama"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          {/* Subtle gradient overlay to enhance text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-transparent sm:from-white/90 sm:via-white/70 sm:to-transparent" />

          <div className="container relative z-10">
            {/* Banner Content */}
            <div className="max-w-2xl text-left mb-16 sm:mb-20">
              <h2 className="section-title">
                <span className="text-primary">Honeymoon Specials</span> That Turn Moments Into Memories.
              </h2>
              <p className="mt-2.5 sm:mt-3 text-sm sm:text-base text-white/90 sm:text-gray-700 leading-relaxed font-normal">
                Discover romantic destinations handcrafted for couples, with candlelit dinners, luxury private stays, and seamless transfers thoughtfully planned by our experts.
              </p>
              <div className="mt-5 sm:mt-6">
                <Link
                  href="/tour-packages?theme=Honeymoon"
                  className="inline-flex items-center gap-2 bg-primary hover:bg-[#c2410c] text-white font-semibold text-xs sm:text-sm px-6 py-2.5 rounded-full transition-all shadow-sm hover:shadow-md active:scale-95"
                >
                  <span>Explore honeymoon packages</span>

                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* ─── Honeymoon Package Cards Swiper Slider (Overlapping banner slightly like screenshot) ─── */}
        <div className="container -mt-24 sm:-mt-28 relative z-20">
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
              className="w-full pb-8!"
            >
              {honeymoonPackages.map((pkg) => (
                <SwiperSlide key={pkg.id}>
                  <HoneymoonPackageCardItem pkg={pkg} />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            /* SSR Initial Grid Fallback */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
              {honeymoonPackages.slice(0, 4).map((pkg) => (
                <HoneymoonPackageCardItem key={pkg.id} pkg={pkg} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
