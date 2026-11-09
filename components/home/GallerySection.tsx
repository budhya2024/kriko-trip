"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import gallery1 from "@/public/assets/images/gallery-img1-3-2.webp";
import gallery2 from "@/public/assets/images/gallery-img2-3-2.webp";
import gallery3 from "@/public/assets/images/gallery-img3-3-2.webp";
import gallery4 from "@/public/assets/images/gallery-img4-3-2.webp";
import gallery5 from "@/public/assets/images/gallery-img5-3-2.webp";
import gallery6 from "@/public/assets/images/gallery-img6-3-2.webp";

export default function GallerySection() {
  return (
    <section className="w-full bg-white py-8 md:py-16 relative overflow-hidden">
      <div className="container relative">
        <div className="flex flex-col lg:flex-row items-start gap-10 lg:gap-8 xl:gap-12">

          {/* ─── Left Header & CTA Block ─── */}
          <div className="w-full lg:w-[32%] xl:w-[30%] shrink-0 pt-2 lg:pt-8">
            <h2 className="section-title">
              KrikoTrip Gallery
            </h2>
            <p className="section-details max-w-sm">
              We go beyond just booking trips—we create unforgettable travel
              experiences that match your dreams!
            </p>

            {/* Book Your Trip Pill Button */}
            <Link
              href="#book-trip"
              className="inline-flex items-center gap-2 px-7 py-3.5 mt-8 rounded-full bg-[#111827] hover:bg-[#1877F2] text-white text-[15px] font-semibold transition-all duration-300 shadow-sm hover:shadow-md group cursor-pointer"
            >
              <span>Book Your Trip</span>
              <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          {/* ─── Right Collage Block ─── */}
          <div className="w-full lg:w-[68%] xl:w-[70%] relative">
            <div className="flex gap-3.5 sm:gap-4 items-start relative">

              {/* ── Left Sub-Cluster (64% of collage width) ── */}
              <div className="w-[64%] sm:w-[65%] flex flex-col gap-3.5 sm:gap-4">

                {/* Top Row: Blossom (gallery1) & Tall Bridge (gallery4) */}
                <div className="flex items-end gap-3.5 sm:gap-4">
                  {/* gallery1: Cherry blossom woman in red */}
                  <div className="w-[52%]  overflow-hidden shadow-xs group">
                    <Image
                      src={gallery1}
                      alt="Cherry blossom travel"
                      className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                      priority
                    />
                  </div>

                  {/* gallery4: Tall Bridge - sticks up higher than rest */}
                  <div className="w-[48%]  overflow-hidden shadow-xs -mt-10 sm:-mt-14 lg:-mt-16 group">
                    <Image
                      src={gallery4}
                      alt="Golden bridge Da Nang"
                      className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                      priority
                    />
                  </div>
                </div>

                {/* Middle: Wide Panoramic Longtail Boats (gallery2) */}
                <div className="w-full  overflow-hidden shadow-xs group">
                  <Image
                    src={gallery2}
                    alt="Thailand longtail boats on turquoise ocean"
                    className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                    priority
                  />
                </div>

                {/* Bottom Row: 2K+ Counter + Friends with Guitar (gallery3) */}
                <div className="flex items-center gap-3.5 sm:gap-4 pt-1">
                  {/* 2K+ Tour Completed Stat Widget */}
                  <div className="w-[40%] sm:w-[42%] flex items-center gap-2.5 sm:gap-3 shrink-0">
                    {/* Exact Traveler & Globe Icon */}
                    <div className="shrink-0 text-gray-950">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="45"
                        height="45"
                        viewBox="0 0 45 45"
                        className="w-10 h-10 sm:w-11 sm:h-11 fill-current"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M39.5961 15.81C38.1214 17.2519 40.2368 20.3608 36.9514 22.3862C35.0583 23.5533 38.0077 25.8843 36.9514 28.6109C36.7987 29.0049 36.7675 29.4023 36.987 29.8303C34.3992 31.822 31.1578 33.0065 27.6398 33.0065C26.7047 33.0065 25.7892 32.9228 24.9003 32.7625L24.5591 33.9508C25.5749 34.1416 26.6063 34.2374 27.6398 34.237C36.7906 34.237 44.209 26.8186 44.209 17.6679C44.209 8.51713 36.7906 1.09863 27.6398 1.09863C24.0648 1.09863 20.6088 2.24297 17.7454 4.37818C19.8919 7.68524 19.849 12.0313 17.6364 15.2956C18.4686 16.7537 19.665 16.797 20.1282 16.9774C21.8931 17.6654 23.2203 21.7429 24.3251 23.0528C25.9039 22.1413 27.6183 21.8503 29.3902 22.4059C29.0978 20.9689 27.4158 19.3471 26.9044 18.8961C25.0823 17.2898 25.8475 16.5076 27.2823 16.1104C28.9332 15.6532 31.4705 15.7057 31.9733 15.5987C33.1508 15.3482 33.4901 14.5201 32.5894 13.7393C31.5322 12.823 29.6808 11.8148 29.2499 10.9945C28.6541 9.8601 29.0869 9.52163 29.8556 9.28389C31.4176 8.80084 34.3657 8.73281 32.891 3.25178C38.0294 5.12385 41.8141 9.62587 42.7515 15.026C41.0332 15.0163 40.1027 15.3148 39.5961 15.81ZM6.48202 37.3493L1.40625 33.2101L3.25916 31.9816L8.22243 33.7703L25.2854 23.919C28.1145 22.2856 33.7222 24.5118 28.3539 27.6113L24.4524 29.8638L20.8244 42.4993L18.3959 43.9014L18.5658 33.213C18.5658 33.213 8.38195 38.8263 6.48202 37.3493ZM9.44719 1.09863C14.2276 1.09863 18.1034 4.97426 18.1034 9.7548C18.1034 14.5354 14.2277 18.411 9.44719 18.411C4.66673 18.411 0.791016 14.5353 0.791016 9.7548C0.791016 4.97435 4.66673 1.09863 9.44719 1.09863ZM4.16821 14.9772C4.53076 12.3859 6.75615 10.3914 9.44728 10.3914C12.1385 10.3914 14.3635 12.3858 14.7261 14.9772C16.0532 13.6358 16.8728 11.7911 16.8728 9.7548C16.8728 5.65356 13.5483 2.3291 9.4471 2.3291C5.34595 2.3291 2.02148 5.65356 2.02148 9.7548C2.02148 11.7911 2.84115 13.6357 4.16821 14.9772ZM6.98344 6.5076C6.98344 7.86841 8.08655 8.97152 9.44736 8.97152C10.8082 8.97152 11.9113 7.86841 11.9113 6.5076C11.9113 5.14714 10.8082 4.04402 9.44736 4.04402C8.08655 4.04411 6.98344 5.14714 6.98344 6.5076ZM8.08436 26.0411L10.5127 24.6391L18.2438 26.5637L13.7191 29.176L8.08436 26.0411ZM13.7464 24.1761C13.0102 22.6071 12.547 20.924 12.3768 19.1992C11.9812 19.3217 11.5781 19.4192 11.1702 19.4911C11.3316 20.9699 11.6927 22.4201 12.2436 23.8019L13.7464 24.1761Z"
                        />
                      </svg>
                    </div>
                    <div className="flex flex-col text-left">
                      <span className="text-2xl sm:text-[30px] font-extrabold text-gray-950 leading-none tracking-tight">
                        2K+
                      </span>
                      <span className="text-[12px] sm:text-[13px] font-medium text-gray-600 mt-1 leading-tight">
                        Tour Completed
                      </span>
                    </div>
                  </div>

                  {/* gallery3: Friends with guitar */}
                  <div className="w-[60%] sm:w-[58%]  overflow-hidden shadow-xs group">
                    <Image
                      src={gallery3}
                      alt="Friends travel with guitar"
                      className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                      priority
                    />
                  </div>
                </div>

              </div>

              {/* ── Right Sub-Cluster (36% of collage width) ── */}
              <div className="w-[36%] sm:w-[35%] flex flex-col gap-3.5 sm:gap-4">
                {/* Top: gallery5 Group Selfie */}
                <div className="w-full  overflow-hidden shadow-xs mt-6 sm:mt-8 lg:mt-10 group">
                  <Image
                    src={gallery5}
                    alt="Travelers group selfie"
                    className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                    priority
                  />
                </div>

                {/* Bottom: gallery6 Bali Temple Gate */}
                <div className="w-full  overflow-hidden shadow-xs group flex-1">
                  <Image
                    src={gallery6}
                    alt="Bali Gate of Heaven"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    priority
                  />
                </div>
              </div>

              {/* ─── Exact Center Floating Circular Passport Badge ─── */}
              <div className="absolute top-[37%] sm:top-[35%] left-[64%] sm:left-[65%] -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#1877F2] text-white flex items-center justify-center shadow-2xl border-[3.5px] sm:border-[4px] border-white transition-transform duration-300 hover:scale-110">
                  <svg
                    className="w-7 h-7 sm:w-8 sm:h-8"
                    viewBox="0 0 28 28"
                    fill="none"
                  >
                    {/* Back passport booklet */}
                    <rect
                      x="4"
                      y="3"
                      width="15"
                      height="19"
                      rx="2"
                      fill="#1877F2"
                      stroke="white"
                      strokeWidth="1.8"
                    />
                    <circle cx="11.5" cy="10" r="3.2" stroke="white" strokeWidth="1.3" />
                    <line x1="8.3" y1="10" x2="14.7" y2="10" stroke="white" strokeWidth="1.1" />
                    <line x1="11.5" y1="6.8" x2="11.5" y2="13.2" stroke="white" strokeWidth="1.1" />
                    <line x1="8" y1="16" x2="15" y2="16" stroke="white" strokeWidth="1.3" />
                    <line x1="8" y1="18.5" x2="13" y2="18.5" stroke="white" strokeWidth="1.3" />

                    {/* Front passport booklet */}
                    <rect
                      x="9"
                      y="6"
                      width="15"
                      height="19"
                      rx="2.2"
                      fill="#1877F2"
                      stroke="white"
                      strokeWidth="2"
                    />
                    <circle cx="16.5" cy="13" r="3.5" stroke="white" strokeWidth="1.5" />
                    <line x1="13" y1="13" x2="20" y2="13" stroke="white" strokeWidth="1.2" />
                    <line x1="16.5" y1="9.5" x2="16.5" y2="16.5" stroke="white" strokeWidth="1.2" />
                    <line
                      x1="13"
                      y1="19.5"
                      x2="20"
                      y2="19.5"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <line
                      x1="13"
                      y1="22"
                      x2="18"
                      y2="22"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
