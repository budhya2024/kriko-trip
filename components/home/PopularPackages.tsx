"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { ArrowUpRight, MapPin, MoveHorizontal } from "lucide-react";

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
  image: string;
  href: string;
}

const packages: PackageCard[] = [
  {
    id: 1,
    badge: "Solo Tour",
    title: "Culture & Cuisine Discovery",
    destination: "Saudi Arabia",
    duration: "5 Days/4 Nights",
    price: 18999,
    originalPrice: 24999,
    image:
      "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80",
    href: "/tour-packages/andaman-short-stay",
  },
  {
    id: 2,
    badge: "Family Tour",
    title: "Vatican & Christian Heritage",
    destination: "Rome, Italy",
    duration: "6 Days/5 Nights",
    price: 32500,
    originalPrice: 42000,
    image:
      "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80",
    href: "/tour-packages/andaman-wonders",
  },
  {
    id: 3,
    badge: "Group Tour",
    title: "Norway Northern Lights & Fjords",
    destination: "Norway",
    duration: "6 Days/5 Nights",
    price: 48999,
    originalPrice: 64000,
    image:
      "https://images.unsplash.com/photo-1528164344705-475426879c0d?auto=format&fit=crop&w=800&q=80",
    href: "/tour-packages/dubai-luxury-desert",
  },
  {
    id: 4,
    badge: "Adventure Tour",
    title: "Egypt Pyramids & Nile Cruise",
    destination: "Cairo, Egypt",
    duration: "5 Days/4 Nights",
    price: 39500,
    originalPrice: 52000,
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    href: "/tour-packages/best-of-andaman",
  },
  {
    id: 5,
    badge: "Couple Tour",
    title: "Bali Tropical Island Getaway",
    destination: "Bali, Indonesia",
    duration: "7 Days/6 Nights",
    price: 28999,
    originalPrice: 38000,
    image:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80",
    href: "/tour-packages/bali-island-escape",
  },
  {
    id: 6,
    badge: "Luxury Tour",
    title: "Swiss Alps Mountain Panorama",
    destination: "Switzerland",
    duration: "6 Days/5 Nights",
    price: 84999,
    originalPrice: 109999,
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80",
    href: "/tour-packages/swiss-alps-express",
  },
];

export default function PopularPackages() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="w-full bg-[#f6f9fd] py-8 md:py-16 relative overflow-hidden">
      {/* ─── Background Decorative Illustrations ─── */}


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
        <div className="">
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
                  slidesPerView: 2.15,
                  spaceBetween: 20,
                },
                1024: {
                  slidesPerView: 3.2,
                  spaceBetween: 24,
                },
                1280: {
                  slidesPerView: 3.4,
                  spaceBetween: 26,
                },
              }}
              className="w-full !overflow-visible !py-4"
            >
              {packages.map((pkg) => (
                <SwiperSlide key={pkg.id}>
                  <div className="bg-white rounded-2xl p-3.5 sm:p-4 shadow-[0_8px_25px_rgba(0,0,0,0.06)] hover:shadow-[0_16px_35px_rgba(0,0,0,0.12)] transition-all duration-300 border border-gray-100 flex flex-col h-full group">
                    {/* Image Container with Badge, Mini Dots & Diagonal Shine Hover Layer */}
                    <Link
                      href={pkg.href}
                      className="block relative w-full aspect-[4/3] rounded-lg overflow-hidden bg-gray-100 image-shine cursor-pointer"
                    >
                      <Image
                        src={pkg.image}
                        alt={pkg.title}
                        fill
                        sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
                        className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                      />

                      {/* Top Badges: Tour Type on Left + Percent OFF on Right */}
                      <div className="absolute top-3 inset-x-3 flex items-center justify-between z-10 pointer-events-none">
                        <span className="bg-[#FFDE14] text-gray-950 text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                          {pkg.badge}
                        </span>
                        <span className="bg-[#EF4444] text-white text-[11px] font-extrabold px-2.5 py-1 rounded-full shadow-sm tracking-wide">
                          {Math.round(((pkg.originalPrice - pkg.price) / pkg.originalPrice) * 100)}% OFF
                        </span>
                      </div>

                      {/* Mini Thumbnail Dots (as seen in Card 1) */}
                      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10">
                        <span className="w-1.5 h-1.5 rounded-full bg-white/80" />
                        <span className="w-1.5 h-1.5 rounded-full bg-white/80" />
                        <span className="w-4 h-1.5 rounded-full bg-[#1877F2]" />
                      </div>
                    </Link>

                    {/* Card Content Area */}
                    <div className="pt-4 pb-2 px-1 flex-1 flex flex-col justify-between">
                      <div>
                        {/* Title */}
                        <Link href={pkg.href}>
                          <h3 className="text-[17px] sm:text-[18px] font-bold text-gray-950 hover:text-[#1877F2] transition-colors line-clamp-1">
                            {pkg.title}
                          </h3>
                        </Link>

                        {/* Location & Duration Meta */}
                        <div className="flex items-center gap-2 mt-2 text-[13px] text-gray-500">
                          <span className="flex items-center gap-1 font-medium text-gray-600">
                            <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                            {pkg.destination}
                          </span>
                          <span className="text-gray-300">↔</span>
                          <span className="font-normal text-gray-500">
                            {pkg.duration}
                          </span>
                        </div>
                      </div>

                      {/* Bottom Footer Row: Book Now Button (Left) & Starting From, Original & Sales Price (Right) */}
                      <div className="flex items-center justify-between pt-4 mt-3 border-t border-gray-100/90 gap-2">
                        {/* Book Now Button: Fully Rounded with White Text */}
                        <Link
                          href={pkg.href}
                          className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#1877F2] hover:bg-[#00285C] text-white text-[13px] font-bold shadow-xs hover:shadow-md transition-all duration-200 active:scale-95 cursor-pointer shrink-0"
                          style={{ backgroundColor: "#1877F2", color: "#ffffff" }}
                        >
                          <span>Book Now</span>
                          <ArrowUpRight className="w-4 h-4 stroke-[2.5] text-white" />
                        </Link>

                        {/* Starting From, Original Price & Sales Price */}
                        <div className="flex flex-col text-right items-end">
                          <span className="text-[11px] sm:text-xs text-gray-500 font-medium leading-none mb-1">
                            Starting From
                          </span>
                          <div className="flex items-center justify-end gap-2 leading-none">
                            <span className="text-sm sm:text-base text-gray-400 line-through font-semibold">
                              ₹{pkg.originalPrice.toLocaleString("en-IN")}
                            </span>
                            <span className="text-xl sm:text-2xl font-extrabold text-[#110F0F] leading-tight">
                              ₹{pkg.price.toLocaleString("en-IN")}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            /* SSR Initial Grid Fallback */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {packages.slice(0, 3).map((pkg) => (
                <div
                  key={pkg.id}
                  className="bg-white rounded-3xl p-4 shadow-sm border border-gray-100"
                >
                  <div className="relative w-full aspect-[4/3] rounded-full overflow-hidden bg-gray-100">
                    <Image
                      src={pkg.image}
                      alt={pkg.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="pt-4">
                    <h3 className="text-lg font-bold text-gray-900 truncate">
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

