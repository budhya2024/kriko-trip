"use client";

import React from "react";

interface FeatureCard {
  id: string;
  bgColor: string;
  title: string;
  icon: React.ReactNode;
}

const features: FeatureCard[] = [
  {
    id: "curated-tours",
    bgColor: "bg-[#E9F7AC]",
    title: "Expertly Curated Tours.",
    icon: (
      // Suitcase with Orbiting Airplane SVG
      <svg
        className="w-10 h-10 text-gray-950"
        viewBox="0 0 44 44"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Handle */}
        <path d="M18 10V6.5c0-.8.7-1.5 1.5-1.5h5c.8 0 1.5.7 1.5 1.5V10" />
        {/* Suitcase Body */}
        <rect x="14" y="10" width="16" height="22" rx="3" />
        <line x1="14" y1="16" x2="30" y2="16" />
        <line x1="14" y1="26" x2="30" y2="26" />
        {/* Wheels */}
        <circle cx="17.5" cy="33.5" r="1.5" fill="currentColor" stroke="none" />
        <circle cx="26.5" cy="33.5" r="1.5" fill="currentColor" stroke="none" />
        {/* Orbit Ring */}
        <path d="M8 22C8 16.5 15 13 24 14.5C32.5 16 36.5 21 35 25C33.5 29 26 32 17 30.5C12 29.5 9 26.5 8.5 24" />
        {/* Small Plane on Orbit */}
        <path
          d="M8.5 20.5L6 18.5L7.5 17L10.5 18L13.5 15L14.5 15.5L13 18.5L15.5 19.5L15 20.5L12.5 20L10.5 22L8.5 20.5Z"
          fill="currentColor"
          stroke="none"
        />
      </svg>
    ),
  },
  {
    id: "affordable-packages",
    bgColor: "bg-[#F0F2F5]",
    title: "Affordable & Flexible Packages.",
    icon: (
      // Price Tag with Star SVG
      <svg
        className="w-10 h-10 text-gray-950"
        viewBox="0 0 44 44"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Angled Tag Body */}
        <path d="M12 21L23 10L33 20L22 31C21.4 31.6 20.6 32 19.8 32H13C11.9 32 11 31.1 11 30V23.2C11 22.4 11.4 21.6 12 21Z" />
        {/* Tag Loop Hole */}
        <circle cx="25.5" cy="14.5" r="1.8" fill="currentColor" stroke="none" />
        {/* String loop */}
        <path d="M26.5 13.5L30.5 9.5" strokeWidth="1.8" />
        {/* Star in Center */}
        <polygon
          points="18.5,21.5 19.8,24.5 23,24.8 20.6,27 21.3,30.2 18.5,28.6 15.7,30.2 16.4,27 14,24.8 17.2,24.5"
          fill="currentColor"
          stroke="none"
        />
      </svg>
    ),
  },
  {
    id: "support",
    bgColor: "bg-[#E2E6FF]",
    title: "24/7 Customer Support.",
    icon: (
      // Headset with Question Speech Bubble SVG
      <svg
        className="w-10 h-10 text-gray-950"
        viewBox="0 0 44 44"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Headset Arc */}
        <path d="M11 23V19C11 12.9 15.9 8 22 8C28.1 8 33 12.9 33 19V23" />
        {/* Left Ear Cushion */}
        <rect x="8" y="20.5" width="4.5" height="9" rx="2" fill="currentColor" />
        {/* Right Ear Cushion */}
        <rect x="31.5" y="20.5" width="4.5" height="9" rx="2" fill="currentColor" />
        {/* Mic Arm */}
        <path d="M33 27V29C33 31.2 31.2 33 29 33H25" />
        <circle cx="23.5" cy="33" r="1.5" fill="currentColor" stroke="none" />
        {/* Question Bubble in Center */}
        <path d="M17.5 18.5C17.5 16 19.5 14 22 14C24.5 14 26.5 16 26.5 18.5C26.5 20.5 24.5 21.5 23.5 22.5V23.5" />
        <circle cx="23" cy="26" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    id: "guides",
    bgColor: "bg-[#BEE9D2]",
    title: "Certified & Experienced Guides.",
    icon: (
      // Award Medal with Checkmark SVG
      <svg
        className="w-10 h-10 text-gray-950"
        viewBox="0 0 44 44"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Top Ribbons */}
        <path d="M15 8H20L17.5 14L15 8Z" fill="currentColor" stroke="none" />
        <path d="M24 8H29L26.5 14L24 8Z" fill="currentColor" stroke="none" />
        {/* Scalloped Award Medallion Circle */}
        <circle cx="22" cy="22" r="9" />
        <path
          d="M22 11C23 11 23.5 11.5 24.5 12C25.5 12.5 26.5 12.5 27.5 13.5C28.5 14.5 28.5 15.5 29 16.5C29.5 17.5 30 18 30 19C30 20 29.5 20.5 29 21.5C28.5 22.5 28.5 23.5 27.5 24.5C26.5 25.5 25.5 25.5 24.5 26C23.5 26.5 23 27 22 27C21 27 20.5 26.5 19.5 26C18.5 25.5 17.5 25.5 16.5 24.5C15.5 23.5 15.5 22.5 15 21.5C14.5 20.5 14 20 14 19C14 18 14.5 17.5 15 16.5C15.5 15.5 15.5 14.5 16.5 13.5C17.5 12.5 18.5 12.5 19.5 12C20.5 11.5 21 11 22 11Z"
          strokeWidth="1.2"
        />
        {/* Checkmark inside */}
        <path d="M19 22L21 24L25 20" strokeWidth="2.4" />
        {/* Hanging Ribbon Tails at bottom */}
        <path d="M17 29L14 36L18.5 34.5L21 36L20 29" fill="currentColor" stroke="none" />
        <path d="M27 29L30 36L25.5 34.5L23 36L24 29" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
];

export default function WhyTravelWithUs() {
  return (
    <section className="w-full bg-white py-14 sm:py-18 lg:py-20 overflow-hidden">
      <div className="container">
        {/* Header with decorative floating blue dot */}
        <div className="text-center max-w-2xl mx-auto relative">
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-gray-950 tracking-tight">
            Why Travel with Us?
          </h2>
          <p className="mt-3 text-gray-500 text-sm sm:text-base leading-relaxed">
            We specialize in crafting personalized journeys that suit every
            traveler&apos;s dream.
          </p>

          {/* Floating light blue dot matching reference */}
          <div className="hidden md:block absolute -top-1 -right-20 lg:-right-32 w-3.5 h-3.5 rounded-full bg-[#1877F2]/60" />
        </div>

        {/* 4 Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 mt-12 sm:mt-14">
          {features.map((item) => (
            <div
              key={item.id}
              className={`${item.bgColor} rounded-[26px] p-7 sm:p-8 min-h-[200px] sm:min-h-[225px] flex flex-col justify-between items-start transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg cursor-pointer group`}
            >
              {/* Icon */}
              <div className="shrink-0 transition-transform duration-300 group-hover:scale-110">
                {item.icon}
              </div>

              {/* Title */}
              <h3 className="text-[17px] sm:text-[18px] font-bold text-gray-950 leading-snug tracking-tight mt-6">
                {item.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

