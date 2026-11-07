import { Suspense } from "react";
import { Header, Footer } from "@/components/shared";
import {
  HeroSection,
  StatsBar,
  FeaturedDestinations,
  SpecialOffers,
  PopularPackages,
  GallerySection,
  TestimonialsSection,
} from "@/components/home";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Top Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section with Search Bar Component */}
        <HeroSection />

        {/* Stats Counter Bar Section */}
        <StatsBar />

        {/* Popular Packages Slider Section */}
        <Suspense fallback={null}>
          <PopularPackages />
        </Suspense>

        {/* Featured Destinations (4 Circular Cards Grid) */}
        <FeaturedDestinations />

        {/* Discounts & Special Offers Section */}
        <Suspense fallback={null}>
          <SpecialOffers />
        </Suspense>

        {/* GoFly Gallery Section */}
        <GallerySection />

        {/* Client Testimonials Section with 2-Row Opposite Infinite Marquee */}
        <TestimonialsSection />
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
