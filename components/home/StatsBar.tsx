"use client";

import React from "react";

interface StatItem {
  id: string;
  number: string;
  label: string;
  icon: React.ReactNode;
}

export default function StatsBar() {
  const stats: StatItem[] = [
    {
      id: "tours",
      number: "1000+",
      label: "Tour Completed",
      icon: (
        // Globe + Airplane + Traveler Avatar SVG
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 45 45"
          className="w-10 h-10 sm:w-11 sm:h-11 text-[#1877F2] fill-current shrink-0"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M39.5961 15.81C38.1214 17.2519 40.2368 20.3608 36.9514 22.3862C35.0583 23.5533 38.0077 25.8843 36.9514 28.6109C36.7987 29.0049 36.7675 29.4023 36.987 29.8303C34.3992 31.822 31.1578 33.0065 27.6398 33.0065C26.7047 33.0065 25.7892 32.9228 24.9003 32.7625L24.5591 33.9508C25.5749 34.1416 26.6063 34.2374 27.6398 34.237C36.7906 34.237 44.209 26.8186 44.209 17.6679C44.209 8.51713 36.7906 1.09863 27.6398 1.09863C24.0648 1.09863 20.6088 2.24297 17.7454 4.37818C19.8919 7.68524 19.849 12.0313 17.6364 15.2956C18.4686 16.7537 19.665 16.797 20.1282 16.9774C21.8931 17.6654 23.2203 21.7429 24.3251 23.0528C25.9039 22.1413 27.6183 21.8503 29.3902 22.4059C29.0978 20.9689 27.4158 19.3471 26.9044 18.8961C25.0823 17.2898 25.8475 16.5076 27.2823 16.1104C28.9332 15.6532 31.4705 15.7057 31.9733 15.5987C33.1508 15.3482 33.4901 14.5201 32.5894 13.7393C31.5322 12.823 29.6808 11.8148 29.2499 10.9945C28.6541 9.8601 29.0869 9.52163 29.8556 9.28389C31.4176 8.80084 34.3657 8.73281 32.891 3.25178C38.0294 5.12385 41.8141 9.62587 42.7515 15.026C41.0332 15.0163 40.1027 15.3148 39.5961 15.81ZM6.48202 37.3493L1.40625 33.2101L3.25916 31.9816L8.22243 33.7703L25.2854 23.919C28.1145 22.2856 33.7222 24.5118 28.3539 27.6113L24.4524 29.8638L20.8244 42.4993L18.3959 43.9014L18.5658 33.213C18.5658 33.213 8.38195 38.8263 6.48202 37.3493ZM9.44719 1.09863C14.2276 1.09863 18.1034 4.97426 18.1034 9.7548C18.1034 14.5354 14.2277 18.411 9.44719 18.411C4.66673 18.411 0.791016 14.5353 0.791016 9.7548C0.791016 4.97435 4.66673 1.09863 9.44719 1.09863ZM4.16821 14.9772C4.53076 12.3859 6.75615 10.3914 9.44728 10.3914C12.1385 10.3914 14.3635 12.3858 14.7261 14.9772C16.0532 13.6358 16.8728 11.7911 16.8728 9.7548C16.8728 5.65356 13.5483 2.3291 9.4471 2.3291C5.34595 2.3291 2.02148 5.65356 2.02148 9.7548C2.02148 11.7911 2.84115 13.6357 4.16821 14.9772ZM6.98344 6.5076C6.98344 7.86841 8.08655 8.97152 9.44736 8.97152C10.8082 8.97152 11.9113 7.86841 11.9113 6.5076C11.9113 5.14714 10.8082 4.04402 9.44736 4.04402C8.08655 4.04411 6.98344 5.14714 6.98344 6.5076ZM8.08436 26.0411L10.5127 24.6391L18.2438 26.5637L13.7191 29.176L8.08436 26.0411ZM13.7464 24.1761C13.0102 22.6071 12.547 20.924 12.3768 19.1992C11.9812 19.3217 11.5781 19.4192 11.1702 19.4911C11.3316 20.9699 11.6927 22.4201 12.2436 23.8019L13.7464 24.1761Z"
          />
        </svg>
      ),
    },
    {
      id: "experience",
      number: "10+",
      label: "Travel Experience",
      icon: (
        // Backpacker with Cap SVG
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 48 48"
          fill="none"
          stroke="#1877F2"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-10 h-10 sm:w-11 sm:h-11 shrink-0"
        >
          {/* Cap */}
          <path d="M16 19c0-4.8 3.6-8.5 8-8.5s8 3.7 8 8.5" />
          <path d="M13.5 19h21c1.4 0 2.3.9 2 2.3l-.8 2.2H12.3l-.8-2.2c-.3-1.4.6-2.3 2-2.3z" />
          {/* Head & Neck */}
          <path d="M17.5 21.5v2.5c0 3.6 2.9 6.5 6.5 6.5s6.5-2.9 6.5-6.5v-2.5" />
          <path d="M21 30.5v3h6v-3" />
          {/* Shoulders & Body */}
          <path d="M12 43v-3.5c0-3.3 2.7-6 6-6h12c3.3 0 6 2.7 6 6V43" />
          {/* Backpack Straps */}
          <path d="M19 33.5v9.5" />
          <path d="M29 33.5v9.5" />
          <path d="M19 39.5h10" />
          {/* Backpack sides */}
          <path d="M12 36.5c-2.2 0-3.5 1.5-3.5 3.5V43" />
          <path d="M36 36.5c2.2 0 3.5 1.5 3.5 3.5V43" />
        </svg>
      ),
    },
    {
      id: "travelers",
      number: "1+",
      label: "Happy Traveler",
      icon: (
        // Safari/Bucket Hat with chin strap SVG
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 48 48"
          fill="none"
          stroke="#1877F2"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-10 h-10 sm:w-11 sm:h-11 shrink-0"
        >
          {/* Hat Crown */}
          <path d="M16.5 22L18.5 11.5C18.7 10 20 9 21.5 9H26.5C28 9 29.3 10 29.5 11.5L31.5 22" />
          <path d="M18 15h12" />
          <path d="M17 19h14" />
          {/* Wide Brim */}
          <path d="M10 22C10 22 14.5 26 24 26C33.5 26 38 22 38 22" />
          <path d="M8 22c0 0 4.5 5 16 5s16-5 16-5" />
          {/* Chin Strap */}
          <path d="M16 26.5l7 11.5" />
          <path d="M32 26.5l-7 11.5" />
          {/* Toggle Loop */}
          <circle cx="24" cy="40.5" r="2.2" />
          <path d="M24 42.7v2" />
        </svg>
      ),
    },
    {
      id: "retention",
      number: "10%",
      label: "Retention Rate",
      icon: (
        // Smiling Guide with Hat & Pack SVG
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 48 48"
          fill="none"
          stroke="#1877F2"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-10 h-10 sm:w-11 sm:h-11 shrink-0"
        >
          {/* Safari Hat */}
          <path d="M18 15c0-3.8 2.7-5.5 6-5.5s6 1.7 6 5.5" />
          <path d="M13 15.5c0 0 3 3.5 11 3.5s11-3.5 11-3.5" />
          <path d="M11 15.5c0 0 3.5 4.5 13 4.5s13-4.5 13-4.5" />
          {/* Face & Smile */}
          <path d="M17.5 19v2.5c0 3.6 2.9 6.5 6.5 6.5s6.5-2.9 6.5-6.5V19" />
          <circle cx="21" cy="22.5" r="1" fill="#1877F2" />
          <circle cx="27" cy="22.5" r="1" fill="#1877F2" />
          <path d="M21.5 25c.7.9 1.5 1.4 2.5 1.4s1.8-.5 2.5-1.4" />
          {/* Bedroll / Side Backpack tubes */}
          <rect x="8" y="30" width="5.5" height="10" rx="2.5" />
          <rect x="34.5" y="30" width="5.5" height="10" rx="2.5" />
          {/* Shoulders & Body */}
          <path d="M13.5 43v-3.5c0-3.3 2.7-6 6-6h9c3.3 0 6 2.7 6 6V43" />
          {/* Backpack Straps */}
          <path d="M20 33.5v9.5" />
          <path d="M28 33.5v9.5" />
          <path d="M20 39.5h8" />
        </svg>
      ),
    },
  ];

  return (
    <section className="w-full bg-[#f4f5f8] py-8 sm:py-10 border-y border-gray-200/60">
      <div className="container">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-0 items-center">
          {stats.map((item, idx) => (
            <div
              key={item.id}
              className={`flex items-center justify-start sm:justify-center px-3 sm:px-6 relative group ${idx < stats.length - 1
                ? "lg:border-r lg:border-dashed lg:border-gray-300"
                : ""
                } ${idx % 2 === 0
                  ? "max-lg:border-r max-lg:border-dashed max-lg:border-gray-300"
                  : ""
                }`}
            >
              <div className="flex items-center gap-3.5 sm:gap-4 transition-transform duration-200 ">
                {/* Blue Icon */}
                <div className="shrink-0 transition-transform duration-200 ">
                  {item.icon}
                </div>

                {/* Number & Text */}
                <div className="flex flex-col text-left">
                  <span className="text-2xl sm:text-4xl font-semibold text-black tracking-tight leading-none">
                    {item.number}
                  </span>
                  <span className="text-sm md:text-base font-semibold text-gray-800 tracking-tight mt-1.5 whitespace-nowrap">
                    {item.label}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

