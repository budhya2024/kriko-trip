import { Suspense } from "react";
import { Header, Footer, GeneralQuestionsFAQ } from "@/components/shared";
import {
  HeroSection,
  StatsBar,
  FeaturedDestinations,
  SpecialOffers,
  PopularPackages,
  GallerySection,
  TravelInspirations,
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

        {/* Travel Inspirations (Blog Stories Section) */}
        <TravelInspirations />

        {/* Client Testimonials Section with 2-Row Opposite Infinite Marquee */}
        <TestimonialsSection />

        {/* General Questions FAQ Section */}
        <GeneralQuestionsFAQ />
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
