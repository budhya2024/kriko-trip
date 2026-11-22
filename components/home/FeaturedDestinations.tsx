import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getFeaturedDestinations } from "@/lib/api/server/destinations";

const DEFAULT_DESTINATION_IMAGE =
  "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=600&q=80";

export default async function FeaturedDestinations() {
  const destinations = await getFeaturedDestinations();

  if (destinations.length === 0) {
    return null;
  }

  return (
    <section
      id="featured-destinations"
      className="w-full bg-[#f6f9fd] py-8 md:py-16"
    >
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <h2 className="section-title">
            Featured Destinations
          </h2>
          <p className="section-details max-w-xl mx-auto">
            A curated list of the most popular travel packages based on different
            destinations.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-y-6 sm:gap-y-10 gap-x-4 sm:gap-x-6 lg:gap-x-5">
          {destinations.map((item) => (
            <Link
              key={item.id}
              href={`/tour-packages?destination=${encodeURIComponent(item.slug)}`}
              className="group flex flex-col items-center text-center cursor-pointer"
            >
              <div className="w-full max-w-[140px] xs:max-w-[160px] sm:max-w-[190px] aspect-square rounded-full overflow-hidden relative shadow-sm transition-all duration-300 image-shine">
                <Image
                  src={item.heroImageUrl || DEFAULT_DESTINATION_IMAGE}
                  alt={item.name}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                  className="object-cover transition-transform duration-500"
                />
              </div>

              <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-950 mt-2.5 sm:mt-3 transition-colors duration-200 group-hover:text-[#1877F2] leading-tight">
                {item.name}
              </h3>
              {item.activitiesLabel && (
                <p className="text-[11px] sm:text-xs font-medium text-gray-500 mt-1">
                  {item.activitiesLabel}
                </p>
              )}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
