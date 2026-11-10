"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Compass,
  Mountain,
  Palmtree,
  Trees,
  Castle,
  Heart,
  Flame,
  Sun,
  ArrowUpRight,
} from "lucide-react";

export interface TravelTheme {
  id: string;
  name: string;
  tagline: string;
  packageCount: string;
  image: string;
  icon: React.ElementType;
  accentColor: string;
}

const travelThemes: TravelTheme[] = [
  {
    id: "beach-holidays",
    name: "Beach Holidays",
    tagline: "Sun, Turquoise Waters & Islands",
    packageCount: "14 Packages",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    icon: Palmtree,
    accentColor: "from-cyan-500/80 to-blue-600/90",
  },
  {
    id: "hill-stations",
    name: "Hill Stations",
    tagline: "Misty Valleys, Pines & Snow Peaks",
    packageCount: "18 Packages",
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80",
    icon: Mountain,
    accentColor: "from-emerald-500/80 to-teal-700/90",
  },
  {
    id: "wildlife-safari",
    name: "Wildlife Safari",
    tagline: "Tiger Reserves & National Parks",
    packageCount: "10 Packages",
    image:
      "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80",
    icon: Trees,
    accentColor: "from-amber-500/80 to-orange-700/90",
  },
  {
    id: "heritage-culture",
    name: "Heritage & Royal Forts",
    tagline: "Palaces, History & Living Traditions",
    packageCount: "12 Packages",
    image:
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80",
    icon: Castle,
    accentColor: "from-purple-500/80 to-indigo-700/90",
  },
  {
    id: "honeymoon-specials",
    name: "Romantic Honeymoon",
    tagline: "Private Backwaters & Hill Retreats",
    packageCount: "16 Packages",
    image:
      "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=800&q=80",
    icon: Heart,
    accentColor: "from-rose-500/80 to-pink-700/90",
  },
  {
    id: "adventure-trekking",
    name: "Adventure & Trekking",
    tagline: "High Passes, Rafting & Camping",
    packageCount: "09 Packages",
    image:
      "https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=800&q=80",
    icon: Compass,
    accentColor: "from-blue-500/80 to-sky-700/90",
  },
  {
    id: "spiritual-journeys",
    name: "Spiritual & Pilgrimage",
    tagline: "Ancient Ghats & Sacred Shrines",
    packageCount: "11 Packages",
    image:
      "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=800&q=80",
    icon: Sun,
    accentColor: "from-amber-600/80 to-yellow-700/90",
  },
  {
    id: "desert-camping",
    name: "Desert & Dunes Safari",
    tagline: "Golden Sands, Camels & Folk Nights",
    packageCount: "07 Packages",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    icon: Flame,
    accentColor: "from-orange-500/80 to-red-600/90",
  },
];

export default function TravelThemesSection() {
  return (
    <section className="w-full bg-white py-10 sm:py-16 lg:py-20 relative overflow-hidden">
      <div className="container relative z-10">
        
        {/* ─── Header: Badge, Title & Subtitle ─── */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-[#1877F2] text-[11px] sm:text-xs font-semibold uppercase tracking-wider mb-2.5">
            <Compass className="w-3.5 h-3.5" />
            <span>Discover by Style</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-bold text-gray-950 tracking-tight leading-tight">
            Choose Your Travel Theme
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 font-normal mt-2 max-w-lg mx-auto">
            From tropical beaches and snow-clad peaks to wildlife safaris and royal palaces, find your perfect trip.
          </p>
        </div>

        {/* ─── 8 Travel Theme Cards Grid ─── */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-5 lg:gap-6">
          {travelThemes.map((theme) => {
            const Icon = theme.icon;
            return (
              <Link
                key={theme.id}
                href={`/tour-packages?theme=${theme.id}`}
                className="group relative rounded-xl sm:rounded-2xl overflow-hidden aspect-[4/5] sm:aspect-[3/4] bg-gray-900 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer flex flex-col justify-between p-3.5 sm:p-5"
              >
                {/* Background Image with Zoom on Hover */}
                <Image
                  src={theme.image}
                  alt={theme.name}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out z-0"
                />

                {/* Multi-Stop Gradient Overlay for Perfect Legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20 group-hover:from-black/95 group-hover:via-black/50 transition-colors z-1" />

                {/* Top Badge: Theme Icon & Package Count */}
                <div className="relative z-10 flex items-center justify-between w-full">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-white/20 backdrop-blur-md border border-white/25 flex items-center justify-center text-white shadow-xs group-hover:bg-[#1877F2] group-hover:border-transparent transition-colors">
                    <Icon className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                  </div>
                  <span className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md bg-black/40 backdrop-blur-md border border-white/15 text-[10px] sm:text-[11px] font-medium text-white/90">
                    {theme.packageCount}
                  </span>
                </div>

                {/* Bottom Content: Name, Tagline & Explore Link */}
                <div className="relative z-10 text-left pt-6">
                  <h3 className="text-sm sm:text-base lg:text-lg font-bold text-white group-hover:text-sky-300 transition-colors leading-tight">
                    {theme.name}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-gray-300/90 font-normal line-clamp-1 mt-1">
                    {theme.tagline}
                  </p>

                  <div className="mt-2.5 pt-2.5 border-t border-white/15 flex items-center justify-between text-white/80 group-hover:text-white transition-colors">
                    <span className="text-[11px] sm:text-xs font-semibold">
                      Explore Tours
                    </span>
                    <div className="w-5 h-5 rounded-full bg-white/15 flex items-center justify-center group-hover:bg-[#1877F2] group-hover:translate-x-0.5 transition-all">
                      <ArrowUpRight className="w-3 h-3 text-white" />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
}
