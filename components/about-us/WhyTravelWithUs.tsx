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
    bgColor: "bg-[#E5F4A3]",
    title: "Expertly Curated Tours.",
    icon: (
      // Suitcase with Orbiting Airplane SVG
      <svg
        className="w-9 h-9 sm:w-10 sm:h-10 text-gray-950"
        viewBox="0 0 44 44"
        fill="none"
      >
        {/* Handle */}
        <path
          d="M18 9V6.5C18 5.7 18.7 5 19.5 5H24.5C25.3 5 26 5.7 26 6.5V9"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        {/* Suitcase Body */}
        <rect x="15" y="9" width="14" height="21" rx="3" fill="currentColor" />
        {/* Horizontal divider lines */}
        <line x1="17" y1="15" x2="27" y2="15" stroke="#E5F4A3" strokeWidth="1.5" />
        <line x1="17" y1="24" x2="27" y2="24" stroke="#E5F4A3" strokeWidth="1.5" />
        {/* Wheels */}
        <circle cx="18" cy="32" r="1.5" fill="currentColor" />
        <circle cx="26" cy="32" r="1.5" fill="currentColor" />
        {/* Orbit Ring */}
        <path
          d="M7 21C7 15.5 14 12.5 23 13.8C31.5 15.2 35.5 20 34.2 24C32.8 28 25.5 30.5 17 29.2C11.5 28.2 8.5 25.5 8 23"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        {/* Airplane flying on the orbit */}
        <path
          d="M9.5 19.5L6.5 17.5L8 16L11 17.5L14 14.5L15 15L13.5 18L16 19L15.5 20L13 19.5L11 21.5L9.5 19.5Z"
          fill="currentColor"
          stroke="none"
        />
      </svg>
    ),
  },
  {
    id: "affordable-packages",
    bgColor: "bg-[#F1F3F5]",
    title: "Affordable & Flexible Packages.",
    icon: (
      // Price Tag with Cutout Star SVG
      <svg
        className="w-9 h-9 sm:w-10 sm:h-10 text-gray-950"
        viewBox="0 0 44 44"
        fill="none"
      >
        {/* Tag Body angled */}
        <path
          d="M13 22L24 11C24.8 10.2 26 10.2 26.8 11L35 19.2C35.8 20 35.8 21.2 35 22L24 33C23.2 33.8 22 34 21 33.5L13 29.5C12 29 11.5 28 11.5 27V23.5C11.5 22.9 12.1 22.3 13 22Z"
          fill="currentColor"
        />
        {/* Hole */}
        <circle cx="28.5" cy="16" r="1.8" fill="#F1F3F5" />
        {/* Loop string */}
        <path
          d="M29.8 14.7L33.5 11C34.3 10.2 34.3 9 33.5 8.2C32.7 7.4 31.5 7.4 30.7 8.2L27.5 12"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        {/* Star in Center (Cutout) */}
        <polygon
          points="21,19 22.3,22.2 25.5,22.6 23.2,24.8 23.8,28 21,26.4 18.2,28 18.8,24.8 16.5,22.6 19.7,22.2"
          fill="#F1F3F5"
        />
      </svg>
    ),
  },
  {
    id: "support",
    bgColor: "bg-[#ECEBFF]",
    title: "24/7 Customer Support.",
    icon: (
      // Headset with Question Speech Bubble SVG
      <svg
        className="w-9 h-9 sm:w-10 sm:h-10 text-gray-950"
        viewBox="0 0 44 44"
        fill="none"
      >
        {/* Headset Arc */}
        <path
          d="M11 22V18.5C11 12.7 15.9 8 22 8C28.1 8 33 12.7 33 18.5V22"
          stroke="currentColor"
          strokeWidth="2.8"
          strokeLinecap="round"
        />
        {/* Left Ear Cushion */}
        <rect x="8.5" y="19.5" width="5" height="10" rx="2.5" fill="currentColor" />
        {/* Right Ear Cushion */}
        <rect x="30.5" y="19.5" width="5" height="10" rx="2.5" fill="currentColor" />
        {/* Mic Arm */}
        <path
          d="M32 27C32 31.5 28.5 34.5 24 34.5H22"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <circle cx="21" cy="34.5" r="1.6" fill="currentColor" />
        {/* Question Bubble in Center */}
        <circle cx="22" cy="20.5" r="7.5" fill="currentColor" />
        {/* Cutout question mark */}
        <path
          d="M20 18.5C20 17.2 21 16.2 22.2 16.2C23.4 16.2 24.4 17.2 24.4 18.5C24.4 19.8 23.2 20.5 22.4 21.3V22"
          stroke="#ECEBFF"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <circle cx="22.4" cy="24.2" r="0.9" fill="#ECEBFF" />
      </svg>
    ),
  },
  {
    id: "guides",
    bgColor: "bg-[#C4EBD4]",
    title: "Certified & Experienced Guides.",
    icon: (
      // Award Medal with Checkmark SVG
      <svg
        className="w-9 h-9 sm:w-10 sm:h-10 text-gray-950"
        viewBox="0 0 44 44"
        fill="none"
      >
        {/* Top Ribbons */}
        <path d="M15.5 11L13 5H19L17 11Z" fill="currentColor" />
        <path d="M28.5 11L31 5H25L27 11Z" fill="currentColor" />
        {/* Scalloped Medal Circle */}
        <circle cx="22" cy="21" r="9" stroke="currentColor" strokeWidth="1.8" />
        <path
          d="M22 10.5C23 10.5 23.5 11 24.4 11.5C25.3 12 26.2 12 27.1 12.9C28 13.8 28 14.7 28.5 15.6C29 16.5 29.5 17 29.5 18.1C29.5 19.2 29 19.7 28.5 20.6C28 21.5 28 22.4 27.1 23.3C26.2 24.2 25.3 24.2 24.4 24.7C23.5 25.2 23 25.7 22 25.7C21 25.7 20.5 25.2 19.6 24.7C18.7 24.2 17.8 24.2 16.9 23.3C16 22.4 16 21.5 15.5 20.6C15 19.7 14.5 19.2 14.5 18.1C14.5 17 15 16.5 15.5 15.6C16 14.7 16 13.8 16.9 12.9C17.8 12 18.7 12 19.6 11.5C20.5 11 21 10.5 22 10.5Z"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
        />
        {/* Checkmark inside */}
        <path
          d="M19 21L21 23L25.5 18.5"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Bottom Ribbon Tails */}
        <path d="M17 27L14 36L18.5 34.5L21 36L20 27" fill="currentColor" />
        <path d="M27 27L30 36L25.5 34.5L23 36L24 27" fill="currentColor" />
      </svg>
    ),
  },
];

export default function WhyTravelWithUs() {
  return (
    <section className="w-full bg-white py-6 sm:py-8 md:py-12">
      <div className="container">
        {/* 4 Feature Cards Grid Matching Reference Screenshot */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {features.map((item) => (
            <div
              key={item.id}
              className={`${item.bgColor} rounded-2xl sm:rounded-[22px] p-6 sm:p-7 min-h-[170px] sm:min-h-[190px] flex flex-col justify-between items-start transition-all duration-300 hover:-translate-y-1 hover:shadow-md cursor-pointer group`}
            >
              {/* Icon */}
              <div className="shrink-0 transition-transform duration-300 group-hover:scale-105">
                {item.icon}
              </div>

              {/* Title */}
              <h3 className="text-base sm:text-[17px] font-bold text-gray-950 leading-snug tracking-tight mt-6 sm:mt-8">
                {item.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
