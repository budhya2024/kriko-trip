import React, { Suspense } from "react";
import { Header, Footer, PageHeader } from "@/components/shared";
import TourPackagesContent from "@/components/tour-packages/TourPackagesContent";
import { getPackages, type GetPackagesFilters } from "@/lib/api/server/packages";
import { getAllDestinations } from "@/lib/api/server/destinations";
import { getTravelThemes } from "@/lib/api/server/themes";
import type { TourPackage, SortOption } from "@/components/tour-packages/types";
import type { PackageListItem } from "@/lib/api/contracts";

export const metadata = {
  title: "Tour Packages | KrikoTrip Travel Agency",
  description:
    "Explore curated holiday and tour packages worldwide. Choose your perfect vacation by destination, budget, and travel type with KrikoTrip.",
};

interface TourPackagesPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const mapItemToTourPackage = (item: PackageListItem): TourPackage => {
  const fallbackImage =
    "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=80";
  const cover = item.coverImageUrl || fallbackImage;

  return {
    id: item.id,
    slug: item.slug,
    title: item.title,
    subtitle: item.subtitle,
    location: item.locationLabel || `${item.destination.name}, ${item.country}`,
    destination: item.destination.name,
    duration: `${item.days} Days / ${item.nights} Nights`,
    days: item.days,
    nights: item.nights,
    travelType: item.travelType,
    category: item.category,
    price: Math.round(item.pricePaise / 100),
    pricePaise: item.pricePaise,
    originalPrice: item.originalPricePaise
      ? Math.round(item.originalPricePaise / 100)
      : undefined,
    originalPricePaise: item.originalPricePaise,
    rating: item.ratingAvg,
    reviewsCount: item.reviewsCount,
    description:
      item.subtitle ||
      `${item.days} Days and ${item.nights} Nights package in ${item.destination.name}`,
    image: cover,
    images: [cover],
    featured: item.isFeatured,
    badgeLabel: item.badgeLabel,
    itinerary: [],
    inclusions: [],
    exclusions: [],
  };
};

async function TourPackagesLoader({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;

  const rawDest = Array.isArray(params.destination)
    ? params.destination[0]
    : params.destination;
  const rawTheme = Array.isArray(params.theme)
    ? params.theme[0]
    : params.theme;
  const rawType = Array.isArray(params.type) ? params.type[0] : params.type;
  const rawBudget = Array.isArray(params.budget)
    ? params.budget[0]
    : params.budget;
  const rawSort = Array.isArray(params.sort) ? params.sort[0] : params.sort;
  const rawPage = Array.isArray(params.page) ? params.page[0] : params.page;
  const rawQ = Array.isArray(params.q) ? params.q[0] : params.q;

  let minPrice: number | undefined;
  let maxPrice: number | undefined;

  if (rawBudget === "0-20k") {
    minPrice = 0;
    maxPrice = 20000;
  } else if (rawBudget === "20-40k") {
    minPrice = 20001;
    maxPrice = 40000;
  } else if (rawBudget === "40-60k") {
    minPrice = 40001;
    maxPrice = 60000;
  } else if (rawBudget === "60-80k") {
    minPrice = 60001;
    maxPrice = 80000;
  } else if (rawBudget === "above-80k") {
    minPrice = 80001;
  }

  const pageNum = rawPage ? parseInt(rawPage, 10) : 1;

  const filters: GetPackagesFilters = {
    q: rawQ,
    destination: rawDest,
    theme: rawTheme,
    travelType: rawType,
    minPrice,
    maxPrice,
    sort: rawSort,
    page: isNaN(pageNum) || pageNum < 1 ? 1 : pageNum,
    limit: 12,
  };

  const [packagesResult, destinationsList, themesList] = await Promise.all([
    getPackages(filters),
    getAllDestinations(),
    getTravelThemes(),
  ]);

  const mappedPackages = packagesResult.data.map(mapItemToTourPackage);
  const formattedDestinations = destinationsList.map((d) => ({
    id: d.id,
    label: d.name,
    slug: d.slug,
  }));
  const formattedThemes = themesList.map((t) => ({
    id: t.id,
    label: t.name,
    slug: t.slug,
  }));

  return (
    <TourPackagesContent
      packages={mappedPackages}
      total={packagesResult.meta.total}
      page={packagesResult.meta.page}
      totalPages={packagesResult.meta.totalPages}
      destinations={formattedDestinations}
      themes={formattedThemes}
      initialTravelType={rawType || null}
      initialTheme={rawTheme || null}
      initialBudget={rawBudget || null}
      initialDestination={rawDest || null}
      initialSort={(rawSort as SortOption) || "popular"}
    />
  );
}

export default function TourPackagesPage({ searchParams }: TourPackagesPageProps) {
  return (
    <div className="min-h-screen bg-[#f8f9fb] flex flex-col font-sans">
      <Header />

      <main className="flex-1">
        <PageHeader
          title="Tour Packages"
          subtitle="Find and book your dream vacation with customized itineraries, transparent pricing, and unbeatable offers."
          bgImage="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2000&q=80"
        />

        <Suspense
          fallback={
            <div className="w-full py-20 text-center text-sm text-gray-500 font-medium">
              Loading tour packages...
            </div>
          }
        >
          <TourPackagesLoader searchParams={searchParams} />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}
