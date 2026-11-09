import React from "react";
import { notFound } from "next/navigation";
import { Header, Footer } from "@/components/shared";
import {
  initialTourPackages,
  getPackageDetails,
  PackageDetailView,
} from "@/components/tour-packages";

type PageParams = { slug: string };

interface PackageDetailsPageProps {
  params: Promise<PageParams> | PageParams;
}

async function resolveParams(params: Promise<PageParams> | PageParams): Promise<PageParams> {
  if (params && typeof (params as any).then === "function") {
    return await params;
  }
  return params as PageParams;
}

export async function generateStaticParams() {
  return initialTourPackages.map((pkg) => ({
    slug: pkg.id,
  }));
}

export async function generateMetadata({ params }: PackageDetailsPageProps) {
  const { slug } = await resolveParams(params);
  const pkg = getPackageDetails(slug);

  if (!pkg) {
    return {
      title: "Package Details | KrikoTrip",
      description: "Explore world-class tour packages with KrikoTrip.",
    };
  }

  return {
    title: `${pkg.title} - ${pkg.duration} | KrikoTrip`,
    description: pkg.description,
    openGraph: {
      title: pkg.title,
      description: pkg.description,
      images: [
        {
          url: pkg.image,
          width: 1200,
          height: 630,
          alt: pkg.title,
        },
      ],
    },
  };
}

export default async function PackageDetailsPage({
  params,
}: PackageDetailsPageProps) {
  const { slug } = await resolveParams(params);
  const pkg = getPackageDetails(slug);

  if (!pkg) {
    notFound();
  }

  // Filter 3 related packages (same destination or other top-rated packages)
  const relatedPackages = initialTourPackages.filter((p) => p.id !== pkg.id);

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      {/* Global Header */}
      <Header />

      {/* Main Package Details Content */}
      <main className="flex-1">
        <PackageDetailView pkg={pkg} relatedPackages={relatedPackages} />
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}

