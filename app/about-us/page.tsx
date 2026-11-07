import React from "react";
import Link from "next/link";
import { Header, Footer, ScrollToTop } from "@/components/shared";
import {
  WhyBestAgency,
  WhyTravelWithUs,
  BestServiceBanner,
} from "@/components/about-us";

export const metadata = {
  title: "About Us | KrikoTrip Travel Agency",
  description:
    "Discover KrikoTrip - Your trusted partner for seamless travel planning, curated tours, and unforgettable adventures worldwide.",
};

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      {/* Global Header */}
      <Header />

      {/* Main Page Content */}
      <main className="flex-1">
        {/* Subpage Hero & Breadcrumbs */}
        <section className="w-full bg-[#08182B] text-white py-14 sm:py-16 text-center relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full border border-white/10 pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-60 h-60 rounded-full border border-white/5 pointer-events-none" />
          
          <div className="container relative z-10">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
              About Us
            </h1>
            <div className="flex items-center justify-center gap-2 mt-3 text-sm text-gray-300 font-medium">
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <span>/</span>
              <span className="text-[#1877F2]">About Us</span>
            </div>
          </div>
        </section>

        {/* Section 1: Why We're Best Agency */}
        <WhyBestAgency />

        {/* Section 2: Why Travel with Us? */}
        <WhyTravelWithUs />

        {/* Section 3: We're Providing Best Service Ever! */}
        <BestServiceBanner />
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Scroll to Top Floating Button */}
      <ScrollToTop />
    </div>
  );
}

