"use client";

import React from "react";
import HeroSearchForm from "./HeroSearchForm";

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-[640px] lg:min-h-[700px] flex flex-col justify-between overflow-visible bg-[#092c42]">
      {/* Background Video: home2-banner-video-3-2.mp4 */}
      <div className="absolute inset-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/assets/video/home2-banner-video-3-2.mp4" type="video/mp4" />
        </video>
        {/* Soft natural tint overlay to maintain text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/30 to-black/55" />
      </div>

      {/* Main Hero Header Text */}
      <div className="relative z-10 container pt-24 pb-16 text-left">
        <h1 className="text-4xl sm:text-5xl lg:text-[62px] font-extrabold text-white tracking-tight leading-[1.15] drop-shadow-md">
          All-in-one Travel Booking
        </h1>
        <p className="mt-4 text-base sm:text-lg lg:text-[17px] text-white/95 font-medium max-w-2xl drop-shadow-sm leading-relaxed">
          Highlights convenience and simplicity, Best for agencies with online &amp; mobile-friendly services.
        </p>
      </div>

      {/* Booking Search Card Component at the Bottom */}
      <div className="relative z-20 container mt-auto">
        <HeroSearchForm />
      </div>

      {/* Bottom spacer to let the card breathe */}
      <div className="h-10 sm:h-14" />
    </section>
  );
}
