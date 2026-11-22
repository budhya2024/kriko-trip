import React from "react";
import { getFeaturedPackages } from "@/lib/api/server/packages";
import PopularPackagesSlider from "./PopularPackagesSlider";

export default async function PopularPackages() {
  const packages = await getFeaturedPackages();

  if (!packages || packages.length === 0) {
    return null;
  }

  return (
    <section className="w-full bg-white pb-8 md:pb-16 relative overflow-hidden">
      <div className="container relative z-20">
        <div className="text-center max-w-2xl mx-auto pb-6 md:pb-8">
          <h2 className="section-title">Popular Package</h2>
          <p className="section-details max-w-xl mx-auto">
            A curated list of the most popular travel packages based on different
            destinations.
          </p>
        </div>

        <PopularPackagesSlider packages={packages} />
      </div>
    </section>
  );
}
