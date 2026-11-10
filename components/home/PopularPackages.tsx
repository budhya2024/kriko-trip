"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { ArrowUpRight, MapPin, MoveHorizontal, Tag } from "lucide-react";

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
    badge: "Couple Tour",
    title: "Andaman Tropical Island Stay",
    destination: "Andaman, India",
    duration: "5 Days/4 Nights",
    price: 18500,
    originalPrice: 22000,
    image:
      "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80",
    href: "/tour-packages/andaman-short-stay",
  },
  {
    id: 2,
    badge: "Family Tour",
    title: "Andaman Wonders & Havelock",
    destination: "Andaman, India",
    duration: "6 Days/5 Nights",
    price: 28999,
    originalPrice: 34000,
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    href: "/tour-packages/andaman-wonders",
  },
  {
    id: 3,
    badge: "Group Tour",
    title: "Best of Andaman & Neil Island",
    destination: "Andaman, India",
    duration: "7 Days/6 Nights",
    price: 38500,
    originalPrice: 44000,
    image:
      "https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=800&q=80",
    href: "/tour-packages/best-of-andaman",
  },
  {
    id: 4,
    badge: "Honeymoon Special",
    title: "Kashmir Paradise & Gulmarg Snow",
    destination: "Kashmir, India",
    duration: "6 Days/5 Nights",
    price: 32500,
    originalPrice: 39000,
    image:
      "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=800&q=80",
    href: "/tour-packages/kashmir-valley-paradise",
  },
  {
    id: 5,
    badge: "Heritage Tour",
    title: "Royal Rajasthan Forts & Palaces",
    destination: "Rajasthan, India",
    duration: "7 Days/6 Nights",
    price: 34999,
    originalPrice: 42000,
    image:
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80",
    href: "/tour-packages/rajasthan-royal-heritage",
  },
  {
    id: 6,
    badge: "Nature Tour",
    title: "Kerala Backwaters & Munnar Hills",
    destination: "Kerala, India",
    duration: "6 Days/5 Nights",
    price: 26999,
    originalPrice: 32000,
    image:
      "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80",
    href: "/tour-packages/kerala-backwaters-munnar",
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
              className="w-full"
            >
              {packages.map((pkg) => (
                <SwiperSlide key={pkg.id}>
                  <div className="bg-white rounded-2xl p-3.5 sm:p-4  transition-all duration-300 border border-gray-100 flex flex-col h-full group">
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
                        <span className="bg-deep-red text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-sm tracking-wide inline-flex items-center gap-1">
                          <Tag className="w-3 h-3 stroke-[2.2]" />
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
                    <div className="pt-3.5 pb-2 px-1 flex-1 flex flex-col justify-between">
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
                          <span className="font-normal text-gray-500">
                            {pkg.duration}
                          </span>
                        </div>
                      </div>

                      {/* Bottom Footer Row: Book Now Button (Left) & Starting From, Original & Sales Price (Right) */}
                      <div className="flex items-center justify-between pt-3.5 mt-3 border-t border-gray-100 gap-2 min-w-0">
                        {/* Book Now Button: Liquid Water Fill Effect */}
                        <Link
                          href={pkg.href}
                          className="btn-water-fill inline-flex items-center gap-1 px-3.5 sm:px-4 py-1.5 rounded-full bg-[#1877F2] text-white text-[11px] sm:text-xs font-semibold shadow-2xs hover:shadow-md active:scale-95 cursor-pointer shrink-0"
                        >
                          <span className="relative z-10">Book Now</span>
                          <ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 stroke-[2] text-white relative z-10" />
                        </Link>

                        {/* Starting From, Original Price & Sales Price */}
                        <div className="flex flex-col text-right items-end shrink-0 min-w-0">
                          <div className="flex items-center gap-1.5 leading-none mb-1">
                            <span className="text-[10px] text-gray-400 font-normal">
                              Starting From
                            </span>
                            {pkg.originalPrice > pkg.price && (
                              <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-amber-50 border border-amber-200 text-[#C2410C] text-[10px] font-bold leading-none">
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

