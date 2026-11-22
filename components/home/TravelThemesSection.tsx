import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getTravelThemes } from "@/lib/api/server/themes";

const DEFAULT_THEME_IMAGE =
  "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=1400&q=80";

export default async function TravelThemesSection() {
  const themes = await getTravelThemes();

  if (themes.length === 0) {
    return null;
  }

  return (
    <section className="w-full bg-white py-8 md:py-16 relative overflow-hidden">
      <div className="container relative z-10">
        <div className="mb-6 md:mb-8 text-left">
          <h2 className="section-title">
            Choose Your Travel Theme
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-12 gap-2 sm:gap-5">
          {themes.map((theme, index) => {
            const isFirst = index === 0;
            const isLast = index === themes.length - 1 && themes.length % 2 === 1;
            const colSpan = isFirst
              ? "lg:col-span-8"
              : isLast
                ? "col-span-2 lg:col-span-4"
                : "lg:col-span-4";
            const heightClass = isFirst || index === 1
              ? "h-[220px] sm:h-[280px] lg:h-[320px]"
              : "h-[220px] sm:h-[260px] lg:h-[300px]";

            return (
              <Link
                key={theme.id}
                href={theme.linkUrl || `/tour-packages?theme=${encodeURIComponent(theme.slug)}`}
                className={`group relative rounded-md overflow-hidden bg-gray-100 ${colSpan} ${heightClass} transition-all duration-300 transform active:scale-[0.99] cursor-pointer`}
              >
                <Image
                  src={theme.photoUrl || DEFAULT_THEME_IMAGE}
                  alt={theme.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent group-hover:from-black/85 transition-colors duration-300" />

                <div className="absolute bottom-4 sm:bottom-6 left-5 sm:left-6 z-10">
                  <span className="text-base sm:text-xl md:text-2xl font-semibold text-white tracking-tight drop-shadow-sm">
                    {theme.name}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
