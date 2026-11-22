import { Suspense } from "react";
import { Header, Footer } from "@/components/shared";
import GeneralQuestionsFAQ from "@/components/shared/GeneralQuestionsFAQ";
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

        <Suspense fallback={null}>
          <GallerySection />
        </Suspense>
        <TestimonialsSection />

        <GeneralQuestionsFAQ />

        <Suspense fallback={null}>
          <TravelInspirations />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}
