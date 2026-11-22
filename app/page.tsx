import { Suspense } from "react";
import { Header, Footer, GeneralQuestionsFAQ } from "@/components/shared";
import {
  HeroSection,
  StatsBar,
  FeaturedDestinations,
  SpecialOffers,
  PopularPackages,
  TravelThemesSection,
  GallerySection,
  TravelInspirations,
  TestimonialsSection,
} from "@/components/home";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Header />

      <main className="flex-1">
        <Suspense fallback={null}>
          <HeroSection />
        </Suspense>

        <StatsBar />

        <Suspense fallback={null}>
          <SpecialOffers />
        </Suspense>

        <Suspense fallback={null}>
          <FeaturedDestinations />
        </Suspense>

        <Suspense fallback={null}>
          <TravelThemesSection />
        </Suspense>

        <Suspense fallback={null}>
          <PopularPackages />
        </Suspense>

        <GallerySection />
        <TestimonialsSection />

        <GeneralQuestionsFAQ />

        <TravelInspirations />
      </main>

      <Footer />
    </div>
  );
}
