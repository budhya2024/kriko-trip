"use client";

import React from "react";
import HeroSearchForm from "./HeroSearchForm";

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-[440px] sm:min-h-[480px] lg:min-h-[520px] flex flex-col justify-between overflow-visible bg-[#092c42]">
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
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/40 to-black/65" />
      </div>

      {/* Main Hero Header Text (Vertically Centered in Middle on Left Side) */}
      <div className="relative z-10 container my-auto pt-16 pb-8 sm:pt-20 sm:pb-10 lg:pt-20 lg:pb-12 text-left">
        <h1 className="text-3xl sm:text-4xl lg:text-[46px] font-extrabold text-white tracking-tight leading-[1.18] drop-shadow-md">
          All-in-one Travel Booking
        </h1>
        <p className="mt-2.5 text-sm sm:text-base lg:text-[15.5px] text-white/95 font-medium max-w-xl drop-shadow-sm leading-relaxed">
          Highlights convenience and simplicity, Best for agencies with online &amp; mobile-friendly services.
        </p>
      </div>

      {/* Booking Search Card Component (Half in and half out of Hero Section) */}
      <div className="relative z-30 container translate-y-6 sm:translate-y-10 md:translate-y-1/2">
        <HeroSearchForm />
      </div>
    </section>
  );
}
