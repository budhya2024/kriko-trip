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
    id: "andaman",
    name: "Andaman Islands",
    activities: "08 Activities",
    image:
      "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "kashmir",
    name: "Kashmir Valley",
    activities: "06 Activities",
    image:
      "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "kerala",
    name: "Kerala Backwaters",
    activities: "07 Activities",
    image:
      "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "goa",
    name: "Goa Beaches",
    activities: "09 Activities",
    image:
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "rajasthan",
    name: "Royal Rajasthan",
    activities: "08 Activities",
    image:
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "himachal",
    name: "Himachal (Manali)",
    activities: "05 Activities",
    image:
      "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "sundarban",
    name: "Sundarban Mangroves",
    activities: "04 Activities",
    image:
      "https://images.unsplash.com/photo-1484406566174-9da000fda645?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "ladakh",
    name: "Leh Ladakh",
    activities: "06 Activities",
    image:
      "https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "varanasi",
    name: "Varanasi Heritage",
    activities: "05 Activities",
    image:
      "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "darjeeling",
    name: "Darjeeling Hills",
    activities: "04 Activities",
    image:
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "ooty",
    name: "Ooty & Nilgiris",
    activities: "05 Activities",
    image:
      "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "rishikesh",
    name: "Rishikesh Yoga",
    activities: "06 Activities",
    image:
      "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=600&q=80",
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
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-y-6 sm:gap-y-10 gap-x-4 sm:gap-x-6 lg:gap-x-5">
          {destinations.map((item) => (
            <Link
              key={item.id}
              href={`#${item.id}`}
              className="group flex flex-col items-center text-center cursor-pointer"
            >
              {/* Circular Destination Image Container with Diagonal Shine Hover Effect */}
              <div className="w-full max-w-[140px] xs:max-w-[160px] sm:max-w-[190px] aspect-square rounded-full overflow-hidden relative shadow-sm transition-all duration-300 image-shine">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                  className="object-cover transition-transform duration-500"
                />
              </div>

              {/* Destination Title (top 12px margin) */}
              <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-950 mt-2.5 sm:mt-3 transition-colors duration-200 group-hover:text-[#1877F2] leading-tight">
                {item.name}
              </h3>
              <p className="text-[11px] sm:text-xs font-medium text-gray-500 mt-1">
                {item.activities}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
