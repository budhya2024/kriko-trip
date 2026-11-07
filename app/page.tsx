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

        <HeroSection />


        <StatsBar />


        <Suspense fallback={null}>
          <PopularPackages />
        </Suspense>
        <FeaturedDestinations />


        <Suspense fallback={null}>
          <SpecialOffers />
        </Suspense>
        <GallerySection />
        <TestimonialsSection />

        <GeneralQuestionsFAQ />

        <TravelInspirations />
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
