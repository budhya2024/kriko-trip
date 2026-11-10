"use client";

import React from "react";
import Image from "next/image";

export default function WhyBestAgency() {
  return (
    <section className="w-full bg-white py-8 md:py-16 overflow-hidden">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">

          {/* ─── Left Column: Content & Founder Bio ─── */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            <h2 className="section-title">
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

