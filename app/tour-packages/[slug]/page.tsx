import React from "react";
import { notFound } from "next/navigation";
import { Header, Footer } from "@/components/shared";
import PackageDetailView from "@/components/tour-packages/PackageDetailView";
import {
  getPackage,
  getPackageSlugs,
  getRelatedPackages,
} from "@/lib/api/server/packages";
import type { TourPackage } from "@/components/tour-packages/types";
import type { PackageDetail, PackageListItem } from "@/lib/api/contracts";

type PageParams = { slug: string };

interface PackageDetailsPageProps {
  params: Promise<PageParams>;
}

export async function generateStaticParams() {
  const slugs = await getPackageSlugs();
  if (!slugs || slugs.length === 0) {
    return [{ slug: "not-found" }];
  }
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PackageDetailsPageProps) {
  const { slug } = await params;
  const pkg = await getPackage(slug);

  if (!pkg) {
    return {
      title: "Package Details | KrikoTrip",
      description: "Explore world-class tour packages with KrikoTrip.",
    };
  }

  const title =
    pkg.seo?.title || `${pkg.title} - ${pkg.days}D / ${pkg.nights}N | KrikoTrip`;
  const description =
    pkg.seo?.metaDescription || pkg.shortDescription || pkg.overview;
  const coverImage =
    pkg.coverImageUrl ||
    "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=80";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: coverImage,
          width: 1200,
          height: 630,
          alt: pkg.title,
        },
      ],
    },
  };
}

const mapDetailToTourPackage = (detail: PackageDetail): TourPackage => {
  const fallbackImage =
    "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=80";
  const cover = detail.coverImageUrl || fallbackImage;
  const galleryUrls =
    detail.gallery && detail.gallery.length > 0
      ? detail.gallery.map((g) => g.url)
      : [cover];

  return {
    id: detail.id,
    slug: detail.slug,
    title: detail.title,
    subtitle: detail.subtitle,
    location:
      detail.locationLabel || `${detail.destination.name}, ${detail.country}`,
    destination: detail.destination.name,
    duration: `${detail.days} Days / ${detail.nights} Nights`,
    days: detail.days,
    nights: detail.nights,
    travelType: detail.travelType,
    category: detail.category,
    price: Math.round(detail.pricePaise / 100),
    pricePaise: detail.pricePaise,
    originalPrice: detail.originalPricePaise
      ? Math.round(detail.originalPricePaise / 100)
      : undefined,
    originalPricePaise: detail.originalPricePaise,
    rating: detail.ratingAvg,
    reviewsCount: detail.reviewsCount,
    description: detail.shortDescription || detail.overview,
    image: cover,
    images: galleryUrls,
    featured: detail.isFeatured,
    badgeLabel: detail.badgeLabel,
    overview: detail.overview,
    highlights: detail.highlights,
    itinerary: (detail.itinerary || []).map((d) => ({
      day: d.dayNumber,
      title: d.title,
      description: d.description,
      transport: d.transport,
      meals: d.meals,
      stay: d.stay,
      activities: d.activities,
    })),
    inclusions: detail.inclusions || [],
    exclusions: detail.exclusions || [],
    hotelName: detail.hotel?.name || undefined,
    hotelStars: detail.hotel?.stars || undefined,
    hotel: detail.hotel,
    tripFacts: detail.tripFacts,
    faqs: detail.faqs || [],
  };
};

const mapListItemToTourPackage = (item: PackageListItem): TourPackage => {
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
      `${item.days} Days package in ${item.destination.name}`,
    image: cover,
    images: [cover],
    featured: item.isFeatured,
    badgeLabel: item.badgeLabel,
  };
};

export default async function PackageDetailsPage({
  params,
}: PackageDetailsPageProps) {
  const { slug } = await params;
  const [detail, relatedItems] = await Promise.all([
    getPackage(slug),
    getRelatedPackages(slug),
  ]);

  if (!detail) {
    notFound();
  }

  const pkg = mapDetailToTourPackage(detail);
  const relatedPackages = relatedItems.map(mapListItemToTourPackage);

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <Header />

      <main className="flex-1">
        <PackageDetailView pkg={pkg} relatedPackages={relatedPackages} />
      </main>

      <Footer />
    </div>
  );
}
