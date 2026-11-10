"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { MapPin, Clock, ArrowRight } from "lucide-react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

interface SpecialOfferItem {
  id: number;
  image: string;
  location: string;
  duration: string;
  title: string;
  description: string;
  originalPrice: number;
  price: number;
  savings: number;
  href: string;
}

const specialOffersData: SpecialOfferItem[] = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
    location: "Arunachal Pradesh",
    duration: "7 Nights / 8 Days",
    title: "Arunachal Highlands 7 Nights / 8 Days",
    description:
      "Explore the pristine beauty of Arunachal Pradesh, one of Northeast India's most breathtaking Himalayan destinations.",
    originalPrice: 32221,
    price: 28999,
    savings: 3222,
    href: "/tour-packages",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=80",
    location: "Andaman Islands",
    duration: "5 Nights / 6 Days",
    title: "Andaman Tropical Beach & Coral Reef Stay",
    description:
      "Unwind on Radhanagar Beach, luxury catamaran cruise to Havelock Island, and crystal clear coral snorkeling.",
    originalPrice: 24500,
    price: 18500,
    savings: 6000,
    href: "/tour-packages/andaman-short-stay",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80",
    location: "Kashmir Valley",
    duration: "6 Nights / 7 Days",
    title: "Kashmir Paradise & Gulmarg Snow Gondola",
    description:
      "Glide on Dal Lake shikara rides, marvel at snow-capped Gulmarg slopes, and explore Betaab Valley pine forests.",
    originalPrice: 35000,
    price: 28999,
    savings: 6001,
    href: "/tour-packages/kashmir-valley-paradise",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    location: "Kerala (Munnar & Alleppey)",
    duration: "5 Nights / 6 Days",
    title: "Kerala Backwaters & Munnar Tea Plantations",
    description:
      "Sail on traditional luxury houseboats in Alleppey and explore mist-clad tea plantations in Munnar hills.",
    originalPrice: 32000,
    price: 26999,
    savings: 5001,
    href: "/tour-packages/kerala-backwaters-munnar",
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80",
    location: "Rajasthan (Jaipur & Udaipur)",
    duration: "6 Nights / 7 Days",
    title: "Royal Rajasthan Heritage Forts & Palaces",
    description:
      "Discover grand Rajput forts, golden sunset desert safaris in Thar, and romantic boat rides on Lake Pichola.",
    originalPrice: 42000,
    price: 34999,
    savings: 7001,
    href: "/tour-packages/rajasthan-royal-heritage",
  },
];

export default function SpecialOffers() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="w-full bg-white py-10 md:py-16">
      <div className="container">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto pb-8 md:pb-10">
          <h2 className="section-title">
            Discounts &amp; Offers
          </h2>
          <p className="section-details max-w-xl mx-auto">
            Limited-time seasonal special offers with exclusive discounts across India&apos;s premier destinations.
          </p>
        </div>

        {/* Swiper Slider with Reference Special Offer Box */}
        <div>
          {mounted ? (
            <Swiper
              modules={[Pagination, Autoplay]}
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              loop={true}
              pagination={{
                clickable: true,
                el: ".custom-offers-pagination",
              }}
              breakpoints={{
                320: {
                  slidesPerView: 1,
                  spaceBetween: 16,
                },
                640: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 24,
                },
              }}
              className="w-full !pb-3"
            >
              {specialOffersData.map((offer) => (
                <SwiperSlide key={offer.id}>
                  {/* Exact Special Offer Box Matching Screenshot */}
                  <div className="rounded-2xl border-2 border-[#FBBF24] overflow-hidden bg-white shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full group">
                    {/* Top Header Strip: 🔥 SPECIAL OFFER ✨ */}
                    <div className="bg-gradient-to-r from-[#F59E0B] to-[#EA580C] text-white py-1.5 px-3 flex items-center justify-center gap-1.5 text-xs font-bold uppercase tracking-wider select-none shrink-0 shadow-2xs">
                      <span>🔥</span>
                      <span>SPECIAL OFFER</span>
                      <span>✨</span>
                    </div>

                    {/* Image Container with Location & Duration Overlay */}
                    <div className="relative w-full aspect-[16/10] overflow-hidden bg-gray-100 image-shine">
                      <Image
                        src={offer.image}
                        alt={offer.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                        priority
                      />
                      {/* Dark Gradient Overlay for Readability */}
                      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/85 via-black/45 to-transparent pointer-events-none" />

                      {/* Location & Duration Overlay */}
                      <div className="absolute bottom-2.5 inset-x-3 flex items-center justify-between text-white text-xs font-semibold z-10 pointer-events-none drop-shadow-sm">
                        <div className="flex items-center gap-1 truncate max-w-[55%]">
                          <MapPin className="w-3.5 h-3.5 text-white stroke-[2.2] shrink-0" />
                          <span className="truncate">{offer.location}</span>
                        </div>
                        <div className="flex items-center gap-1 shrink-0">
                          <Clock className="w-3.5 h-3.5 text-white stroke-[2.2] shrink-0" />
                          <span>{offer.duration}</span>
                        </div>
                      </div>
                    </div>

                    {/* White Card Body */}
                    <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between text-left">
                      <div>
                        {/* Title */}
                        <Link href={offer.href}>
                          <h3 className="text-base sm:text-[17px] font-bold text-gray-900 group-hover:text-[#EA580C] transition-colors line-clamp-2 leading-snug">
                            {offer.title}
                          </h3>
                        </Link>

                        {/* Description */}
                        <p className="text-xs text-gray-500 mt-2 leading-relaxed line-clamp-2 font-normal">
                          {offer.description}
                        </p>
                      </div>

                      {/* Pricing & Grab Offer Row */}
                      <div className="mt-4 pt-3.5 border-t border-gray-100 flex items-center justify-between gap-2.5">
                        {/* Left: Original Price, Save Pill, Sales Price, per Person */}
                        <div className="flex flex-col">
                          <div className="flex items-center gap-1.5 leading-none">
                            <span className="text-xs text-gray-400 line-through font-semibold">
                              ₹{offer.originalPrice.toLocaleString("en-IN")}
                            </span>
                            <span className="px-1.5 py-0.5 rounded border border-amber-300 bg-amber-50 text-[#C2410C] text-[10px] font-bold leading-none">
                              Save ₹{offer.savings.toLocaleString("en-IN")}
                            </span>
                          </div>
                          <span className="text-xl sm:text-2xl font-extrabold text-[#EA580C] leading-tight mt-1 mb-0.5">
                            ₹{offer.price.toLocaleString("en-IN")}
                          </span>
                          <span className="text-[11px] text-gray-500 font-medium leading-none">
                            per Person
                          </span>
                        </div>

                        {/* Right: Grab Offer Button */}
                        <Link
                          href={offer.href}
                          className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-2.5 rounded-full bg-gradient-to-r from-[#F59E0B] to-[#EA580C] hover:from-[#EA580C] hover:to-[#C2410C] text-white text-xs sm:text-[13px] font-bold shadow-sm hover:shadow-md transition-all active:scale-95 shrink-0 cursor-pointer"
                        >
                          <span>Grab Offer</span>
                          <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            /* SSR Static Initial Grid */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {specialOffersData.slice(0, 3).map((offer) => (
                <div
                  key={offer.id}
                  className="rounded-2xl border-2 border-[#FBBF24] overflow-hidden bg-white shadow-sm flex flex-col"
                >
                  <div className="bg-gradient-to-r from-[#F59E0B] to-[#EA580C] text-white py-1.5 px-3 flex items-center justify-center gap-1.5 text-xs font-bold uppercase tracking-wider">
                    <span>🔥 SPECIAL OFFER ✨</span>
                  </div>
                  <div className="relative w-full aspect-[16/10] bg-gray-100">
                    <Image
                      src={offer.image}
                      alt={offer.title}
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <h3 className="text-base font-bold text-gray-900 line-clamp-1">
                      {offer.title}
                    </h3>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-xl font-bold text-[#EA580C]">
                        ₹{offer.price.toLocaleString("en-IN")}
                      </span>
                      <span className="px-4 py-2 rounded-full bg-[#EA580C] text-white text-xs font-bold">
                        Grab Offer →
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Bottom Swiper Pagination Dots */}
          <div className="custom-offers-pagination mt-4" />
        </div>
      </div>
    </section>
  );
}
