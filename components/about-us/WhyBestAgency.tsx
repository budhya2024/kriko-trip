"use client";

import React from "react";
import Image from "next/image";

export default function WhyBestAgency() {
  return (
    <section className="w-full bg-white py-16 sm:py-20 lg:py-24 overflow-hidden">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">

          {/* ─── Left Column: Content & Founder Bio ─── */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-bold text-gray-950 tracking-tight leading-[1.15]">
              Why We&apos;re Best Agency
            </h2>

            <h3 className="text-lg sm:text-[19px] font-bold text-gray-900 mt-4 sm:mt-5 leading-snug">
              Welcome to KrikoTrip Travel Agency – Your Gateway to
              Unforgettable Journeys!
            </h3>

            <div className="mt-5 sm:mt-6 space-y-4 text-gray-600 text-[15px] sm:text-[16px] leading-relaxed">
              <p>
                KrikoTrip Travel Agency is a trusted name in the travel
                industry, offering seamless travel planning, personalized
                itineraries, and unforgettable adventures. With years of
                experience and a network of global partners, we ensure a
                hassle-free and memorable journey for every traveler.
              </p>
              <p>
                We believe that travel is more than just moving from one place to
                another—it&apos;s about discovering new cultures, creating
                unforgettable experiences, and making lifelong memories.
              </p>
            </div>

            {/* Founder Signature & Info */}
            <div className="flex items-center gap-5 sm:gap-6 mt-8 sm:mt-10 pt-2">
              <div className="shrink-0">
                <Image
                  src="/assets/images/founder-signature.png"
                  alt="Robert Harringson Signature"
                  width={110}
                  height={55}
                  className="w-24 sm:w-28 h-auto object-contain mix-blend-multiply"
                />
              </div>

              <div className="flex flex-col text-left">
                <h4 className="text-[17px] font-bold text-gray-950 leading-tight">
                  Robert Harringson
                </h4>
                <p className="text-sm font-medium text-gray-500 mt-1">
                  Founder at KrikoTrip
                </p>
              </div>
            </div>

            {/* Decorative Blue Dot matching reference */}
            <div className="w-3.5 h-3.5 rounded-full bg-[#1877F2]/60 mt-8 sm:mt-10" />
          </div>

          {/* ─── Right Column: Visual Photo Collage ─── */}
          <div className="lg:col-span-6 flex items-center justify-center lg:justify-end">
            <div className="relative w-full max-w-lg lg:max-w-none group">
              <Image
                src="/assets/images/why-best-agency.png"
                alt="Why We're Best Agency - Travel experiences"
                width={700}
                height={720}
                priority
                className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-[1.02]"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

