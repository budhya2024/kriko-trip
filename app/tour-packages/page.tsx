import React from "react";
import Link from "next/link";
import { Header, Footer, ScrollToTop } from "@/components/shared";
import { TourPackagesContent } from "@/components/tour-packages";

export const metadata = {
  title: "Tour Packages | KrikoTrip Travel Agency",
  description:
    "Explore curated holiday and tour packages worldwide. Choose your perfect vacation by destination, budget, and travel type with KrikoTrip.",
};

export default function TourPackagesPage() {
  return (
    <div className="min-h-screen bg-[#f8f9fb] flex flex-col font-sans">
      {/* Global Header */}
      <Header />

      {/* Main Page Area */}
      <main className="flex-1">
        {/* Subpage Hero & Breadcrumbs */}
        <section className="w-full bg-[#08182B] text-white py-14 sm:py-16 text-center relative overflow-hidden">
          {/* Subtle Ambient Decorative Circles */}
          <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full border border-white/10 pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-60 h-60 rounded-full border border-white/5 pointer-events-none" />

          <div className="container relative z-10">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
              Tour Packages
            </h1>
            <p className="text-sm sm:text-base text-gray-300 mt-2 max-w-xl mx-auto font-normal">
              Find and book your dream vacation with customized itineraries and
              unbeatable offers.
            </p>
            <div className="flex items-center justify-center gap-2 mt-4 text-xs sm:text-sm text-gray-300 font-medium">
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <span>/</span>
              <span className="text-[#1877F2]">Tour Packages</span>
            </div>
          </div>
        </section>

        {/* Interactive Tour Packages Filter & Grid Section */}
        <TourPackagesContent />
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Scroll to Top Floating Button */}
      <ScrollToTop />
    </div>
  );
}

