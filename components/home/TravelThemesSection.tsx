"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

interface ThemeItem {
  id: string;
  name: string;
  image: string;
  href: string;
  colSpan: string;
  heightClass: string;
}

const themes: ThemeItem[] = [
  {
    id: "cities",
    name: "Cities",
    image:
      "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=1400&q=80",
    href: "/tour-packages?theme=cities",
    colSpan: "lg:col-span-8",
    heightClass: "h-[220px] sm:h-[290px] lg:h-[340px]",
  },
  {
    id: "cruise",
    name: "Cruise",
    image:
      "https://images.unsplash.com/photo-1548574505-5e239809ee19?auto=format&fit=crop&w=1000&q=80",
    href: "/tour-packages?theme=cruise",
    colSpan: "lg:col-span-4",
    heightClass: "h-[220px] sm:h-[290px] lg:h-[340px]",
  },
  {
    id: "heritage",
    name: "Heritage",
    image:
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=900&q=80",
    href: "/tour-packages?theme=heritage",
    colSpan: "lg:col-span-4",
    heightClass: "h-[220px] sm:h-[270px] lg:h-[310px]",
  },
  {
    id: "hill-stations",
    name: "Hill Stations",
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&q=80",
    href: "/tour-packages?theme=hills",
    colSpan: "lg:col-span-4",
    heightClass: "h-[220px] sm:h-[270px] lg:h-[310px]",
  },
  {
    id: "beach",
    name: "Beach",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80",
    href: "/tour-packages?theme=beach",
    colSpan: "lg:col-span-4",
    heightClass: "h-[220px] sm:h-[270px] lg:h-[310px]",
  },
];

export default function TravelThemesSection() {
  return (
    <section className="w-full bg-white py-10 sm:py-14 lg:py-18">
      <div className="container">
        
        {/* ─── Header: Matching Reference Left-Aligned Title ─── */}
        <div className="mb-5 sm:mb-7">
          <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-bold text-[#08182B] tracking-tight">
            Choose Your Travel Theme
          </h2>
        </div>

        {/* ─── Bento Grid Layout Matching Reference Screenshot ─── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3.5 sm:gap-5">
          {themes.map((theme) => (
            <Link
              key={theme.id}
              href={theme.href}
              className={`group relative rounded-2xl sm:rounded-3xl overflow-hidden bg-gray-100 ${theme.colSpan} ${theme.heightClass} transition-all duration-300 transform active:scale-[0.99] cursor-pointer`}
            >
              {/* Background Photo */}
              <Image
                src={theme.image}
                alt={theme.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover object-center group-hover:scale-106 transition-transform duration-500 ease-out"
              />

              {/* Gradient Shade for High Legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent group-hover:from-black/85 transition-colors duration-300" />

              {/* Bottom Left Title Matching Reference */}
              <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 z-10">
                <span className="text-xl sm:text-2xl lg:text-[26px] font-bold text-white tracking-tight drop-shadow-xs">
                  {theme.name}
                </span>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
