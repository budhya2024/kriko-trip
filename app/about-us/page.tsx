import React from "react";
import { Header, Footer, PageHeader } from "@/components/shared";
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
        {/* Left-Aligned Subpage Hero & Breadcrumbs with Background Image */}
        <PageHeader
          title="About Us"
          subtitle="Your trusted partner for seamless travel planning, curated tours, and unforgettable adventures worldwide."
          bgImage="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=2000&q=80"
        />

        {/* Section 1: Why We're Best Agency */}
        <WhyBestAgency />

        {/* Section 2: Why Travel with Us? */}
        <WhyTravelWithUs />

        {/* Section 3: We're Providing Best Service Ever! */}
        <BestServiceBanner />
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
