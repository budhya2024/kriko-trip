"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { MapPin, PhoneCall, Tag } from "lucide-react";
import { openCallbackModal } from "@/components/shared";

import "swiper/css";

interface TrendingDealVideo {
  id: string;
  location: string;
  countryOrRegion: string;
  title: string;
  discountBadge: string;
  price: number;
  videoUrl: string;
  poster: string;
  href: string;
}

const trendingDealVideos: TrendingDealVideo[] = [
  {
    id: "kashmir",
    location: "Kashmir",
    countryOrRegion: "Jammu & Kashmir",
    title: "Kashmir Paradise & Gulmarg Snow",
    discountBadge: "Upto 30% OFF",
    price: 32500,
    videoUrl: "https://assets.mixkit.co/videos/4132/4132-360.mp4",
    poster:
      "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=700&q=80",
    href: "/tour-packages?destination=Kashmir",
  },
  {
    id: "goa",
    location: "Goa",
    countryOrRegion: "Coastal India",
    title: "Goa Beaches & Luxury Stay",
    discountBadge: "25% OFF",
    price: 16999,
    videoUrl: "https://assets.mixkit.co/videos/2168/2168-360.mp4",
    poster:
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=700&q=80",
    href: "/tour-packages?destination=Goa",
  },
  {
    id: "andaman",
    location: "Andaman",
    countryOrRegion: "Andaman & Nicobar",
    title: "Andaman Tropical Island Stay",
    discountBadge: "20% OFF",
    price: 18500,
    videoUrl: "https://assets.mixkit.co/videos/1191/1191-360.mp4",
    poster:
      "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=700&q=80",
    href: "/tour-packages?destination=Andaman",
  },
  {
    id: "kerala",
    location: "Kerala",
    countryOrRegion: "God's Own Country",
    title: "Kerala Backwaters & Munnar Hills",
    discountBadge: "22% OFF",
    price: 26999,
    videoUrl: "https://assets.mixkit.co/videos/5030/5030-360.mp4",
    poster:
      "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=700&q=80",
    href: "/tour-packages?destination=Kerala",
  },
  {
    id: "gangtok",
    location: "Gangtok",
    countryOrRegion: "Sikkim & Nathula",
    title: "Gangtok & Tsomgo Lake Escape",
    discountBadge: "28% OFF",
    price: 23500,
    videoUrl: "https://assets.mixkit.co/videos/4396/4396-360.mp4",
    poster:
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=700&q=80",
    href: "/tour-packages?destination=Gangtok",
  },
  {
    id: "manali",
    location: "Manali",
    countryOrRegion: "Himachal Valley",
    title: "Manali Snow & Solang Adventure",
    discountBadge: "25% OFF",
    price: 21999,
    videoUrl: "https://assets.mixkit.co/videos/4132/4132-360.mp4",
    poster:
      "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=700&q=80",
    href: "/tour-packages?destination=Manali",
  },
  {
    id: "lakshadweep",
    location: "Lakshadweep",
    countryOrRegion: "Agatti & Bangaram",
    title: "Lakshadweep Coral Lagoon Retreat",
    discountBadge: "20% OFF",
    price: 36500,
    videoUrl: "https://assets.mixkit.co/videos/1191/1191-360.mp4",
    poster:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=700&q=80",
    href: "/tour-packages?destination=Lakshadweep",
  },
  {
    id: "sundarban",
    location: "Sundarban",
    countryOrRegion: "Mangrove Biosphere",
    title: "Sundarban Luxury Boat Safari",
    discountBadge: "22% OFF",
    price: 12999,
    videoUrl: "https://assets.mixkit.co/videos/5030/5030-360.mp4",
    poster:
      "https://images.unsplash.com/photo-1484406566174-9da000fda645?auto=format&fit=crop&w=700&q=80",
    href: "/tour-packages?destination=Sundarban",
  },
  {
    id: "meghalaya",
    location: "Meghalaya",
    countryOrRegion: "Shillong & Cherrapunji",
    title: "Meghalaya Living Root & Falls Tour",
    discountBadge: "24% OFF",
    price: 24999,
    videoUrl: "https://assets.mixkit.co/videos/41576/41576-360.mp4",
    poster:
      "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=700&q=80",
    href: "/tour-packages?destination=Meghalaya",
  },
  {
    id: "rajasthan",
    location: "Rajasthan",
    countryOrRegion: "Jaipur & Udaipur",
    title: "Royal Rajasthan Forts & Palaces",
    discountBadge: "20% OFF",
    price: 34999,
    videoUrl: "https://assets.mixkit.co/videos/41576/41576-360.mp4",
    poster:
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=700&q=80",
    href: "/tour-packages?destination=Rajasthan",
  },
];

function TrendingDealVideoCard({ deal }: { deal: TrendingDealVideo }) {
  const [videoSrc, setVideoSrc] = useState(deal.videoUrl);

  const handleVideoError = () => {
    if (videoSrc !== "/assets/video/home2-banner-video-3-2.mp4") {
      setVideoSrc("/assets/video/home2-banner-video-3-2.mp4");
    }
  };

  return (
    <div className="group relative w-full aspect-[3/4.3] rounded-2xl overflow-hidden bg-slate-900 border border-gray-200/80 shadow-sm">
      {/* Clickable full-card overlay to open the filtered tour packages list page */}
      <Link
        href={deal.href}
        aria-label={`Explore ${deal.location} tour packages`}
        className="absolute inset-0 z-10 cursor-pointer"
      />

      {/* Background Destination Video Reel */}
      <video
        src={videoSrc}
        poster={deal.poster}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        onError={handleVideoError}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />

      {/* Top Gradient Scrim + Bottom Dark Readability Scrim */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-black/90 pointer-events-none" />

      {/* Top Overlay Badge: Discount Pill */}
      <div className="absolute top-3 left-3 z-20 pointer-events-none">
        <span className="badge-shine inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-gradient-to-r from-[#F59E0B] to-[#EA580C] text-white text-[11px] font-medium shadow-sm">
          <Tag className="w-3 h-3 stroke-[2]" />
          <span>{deal.discountBadge}</span>
        </span>
      </div>

      {/* Bottom Overlay: Location Info + Get a Call Back Button */}
      <div className="absolute inset-x-0 bottom-0 z-20 p-3.5 sm:p-4 flex flex-col gap-2.5 pointer-events-none">
        <Link href={deal.href} className="block group/link pointer-events-auto">
          {/* Location Badge */}
          <div className="inline-flex items-center gap-1.5 text-white text-sm sm:text-base font-semibold tracking-tight leading-tight">
            <MapPin className="w-4 h-4 text-[#03ADFF] shrink-0" />
            <span>{deal.location}</span>
          </div>

          <p className="text-xs text-white/85 truncate mt-0.5 font-normal group-hover/link:text-white transition-colors">
            {deal.title}
          </p>

          <p className="text-[11.5px] text-white/90 mt-1 font-medium">
            Starting ₹{deal.price.toLocaleString("en-IN")}{" "}
            <span className="text-white/65 font-normal">/ person</span>
          </p>
        </Link>

        {/* Bottom CTA: Get a Call Back */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            openCallbackModal(deal.location);
          }}
          className="pointer-events-auto w-full py-2.5 px-3 rounded-lg bg-[#1877F2] hover:bg-[#00285C] active:scale-[0.98] text-white text-xs sm:text-[13px] font-medium flex items-center justify-center gap-1.5 shadow-md transition-colors cursor-pointer"
        >
          <PhoneCall className="w-3.5 h-3.5 shrink-0" />
          <span>Get a Call Back</span>
        </button>
      </div>
    </div>
  );
}

/**
 * Home page "Top Trending Deals" destination video reel slider
 * featuring location labels and direct "Get a Call Back" buttons at the bottom of each card.
 */
export default function TrendingDealsVideoSlider() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section
      id="top-trending-deals"
      className="w-full bg-white py-8 md:py-16 border-t border-gray-100"
    >
      <div className="container">
        {/* Centered Section Header */}
        <div className="text-center max-w-xl mx-auto pb-6 md:pb-8">
          <h2 className="section-title">Top Trending Deals</h2>
          <p className="section-details max-w-xl mx-auto">
            Watch trending destination reels across Kashmir, Goa, Andaman, and more — and request an instant callback deal.
          </p>
        </div>

        {/* Video Slider (4 videos visible on desktop) */}
        {mounted ? (
          <Swiper
            modules={[Autoplay]}
            autoplay={{
              delay: 4500,
              disableOnInteraction: true,
              pauseOnMouseEnter: true,
            }}
            loop={true}
            breakpoints={{
              320: {
                slidesPerView: 1.25,
                spaceBetween: 14,
              },
              520: {
                slidesPerView: 2.15,
                spaceBetween: 16,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 18,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 20,
              },
              1280: {
                slidesPerView: 4,
                spaceBetween: 24,
              },
            }}
            className="w-full"
          >
            {trendingDealVideos.map((deal) => (
              <SwiperSlide key={deal.id}>
                <TrendingDealVideoCard deal={deal} />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
            {trendingDealVideos.slice(0, 4).map((deal) => (
              <div
                key={deal.id}
                className="w-full aspect-[3/4.3] rounded-2xl bg-slate-200 animate-pulse"
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

