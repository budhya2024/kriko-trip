"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

interface DestinationItem {
  id: string;
  name: string;
  activities: string;
  image: string;
}

const destinations: DestinationItem[] = [
  {
    id: "jamaica",
    name: "Jamaica",
    activities: "02 Activities",
    image:
      "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "united-states",
    name: "United States",
    activities: "01 Activities",
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "jordan",
    name: "Jordan",
    activities: "01 Activities",
    image:
      "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "qatar",
    name: "Qatar",
    activities: "02 Activities",
    image:
      "https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "switzerland",
    name: "Switzerland",
    activities: "04 Activities",
    image:
      "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "thailand",
    name: "Thailand",
    activities: "03 Activities",
    image:
      "https://images.unsplash.com/photo-1506665531195-3566af2b4dfa?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "france",
    name: "France",
    activities: "05 Activities",
    image:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "japan",
    name: "Japan",
    activities: "06 Activities",
    image:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "italy",
    name: "Italy",
    activities: "04 Activities",
    image:
      "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "maldives",
    name: "Maldives",
    activities: "03 Activities",
    image:
      "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "greece",
    name: "Greece",
    activities: "04 Activities",
    image:
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "australia",
    name: "Australia",
    activities: "03 Activities",
    image:
      "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=600&q=80",
  },
];

export default function FeaturedDestinations() {
  return (
    <section
      id="featured-destinations"
      className="w-full bg-white py-8 md:py-16"
    >
      <div className="container">
        {/* ─── Header: Title & Subtitle ─── */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <h2 className="section-title">
            Featured Destinations
          </h2>
          <p className="section-details max-w-xl mx-auto">
            A curated list of the most popular travel packages based on different
            destinations.
          </p>
        </div>

        {/* ─── 12 Destination Circular Cards Grid (2 rows of 6 on desktop) ─── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-y-8 sm:gap-y-10 gap-x-5 sm:gap-x-6 lg:gap-x-5">
          {destinations.map((item) => (
            <Link
              key={item.id}
              href={`#${item.id}`}
              className="group flex flex-col items-center text-center cursor-pointer"
            >
              {/* Circular Destination Image Container */}
              <div className="w-full max-w-[190px] aspect-square rounded-full overflow-hidden relative shadow-sm  transition-all duration-300">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                  className="object-cover transition-transform duration-500 "
                />
              </div>

              {/* Destination Title (top 12px margin) */}
              <h3 className="text-base lg:text-xl font-bold text-gray-950 mt-3  transition-colors duration-200 group-hover:text-[#1877F2] tracking-tight">
                {item.name}
              </h3>
              <p className="text-xs sm:text-[13px] font-medium text-gray-500 mt-1">
                {item.activities}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
