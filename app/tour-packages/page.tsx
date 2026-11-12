import React, { Suspense } from "react";
import {
  Header,
  Footer,
  PageHeader,
  TourListFloatingCallbackButton,
} from "@/components/shared";
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
        {/* Left-Aligned Subpage Hero & Breadcrumbs with Background Image */}
        <PageHeader
          title="Tour Packages"
          subtitle="Find and book your dream vacation with customized itineraries, transparent pricing, and unbeatable offers."
          bgImage="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2000&q=80"
        />

        {/* Interactive Tour Packages Filter & Grid Section */}
        <Suspense
          fallback={
            <div className="w-full py-20 text-center text-sm text-gray-500 font-medium">
              Loading tour packages...
            </div>
          }
        >
          <TourPackagesContent />
        </Suspense>
      </main>

      {/* Floating Callback CTA (Package List Page Only) */}
      <TourListFloatingCallbackButton />

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
