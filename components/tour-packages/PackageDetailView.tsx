"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Users, Star } from "lucide-react";
import { TourPackage } from "./types";
import { PackageDetailedInfo } from "./packageDetailData";
import RelevantPackagesSlider from "./RelevantPackagesSlider";
import PackageReviewsSection from "./PackageReviewsSection";
import {
  PackageGallerySection,
  PackageAboutSpecs,
  PackageItinerarySection,
  PackageBookingSidebar,
} from "./package-detail";

interface PackageDetailViewProps {
  pkg: TourPackage & PackageDetailedInfo;
  relatedPackages: TourPackage[];
}

export default function PackageDetailView({
  pkg,
  relatedPackages,
}: PackageDetailViewProps) {
  const originalPrice = pkg.originalPrice || Math.round(pkg.price * 1.25);
  const savings = originalPrice - pkg.price;

  // Split title if it contains parenthesis route details
  const parenMatch = pkg.title.match(/^(.*?)\s*\((.*?)\)\s*$/);
  const mainTitle = parenMatch ? parenMatch[1].trim() : pkg.title;

  return (
    <div className="w-full bg-[#FFFFFF] font-sans antialiased text-[#111827] pb-0 relative">
      {/* ─── TOP HERO BANNER WITH SCENIC BACKGROUND & BREADCRUMB ─── */}
      <section className="relative w-full overflow-hidden bg-black py-7 sm:py-9 flex items-center h-60 sm:h-80">
        <div className="absolute inset-0 z-0">
          <Image
            src={pkg.image}
            alt={pkg.title}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center scale-105"
          />
          <div className="absolute inset-0 bg-black/65" />
        </div>

        <div className="container relative z-10 text-left px-6 sm:px-10 lg:px-12">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-xs sm:text-[13px] text-white/80 mb-2.5 font-normal print:hidden"
          >
            <Link
              href="/"
              className="hover:text-white transition-colors whitespace-nowrap"
            >
              Home
            </Link>
            <span className="text-white/40">/</span>
            <Link
              href="/tour-packages"
              className="hover:text-white transition-colors whitespace-nowrap"
            >
              Tour Packages
            </Link>
            <span className="text-white/40">/</span>
            <span className="text-sky-300 font-medium truncate max-w-xs sm:max-w-md">
              {mainTitle}
            </span>
          </nav>

          <h1 className="text-xl sm:text-2xl lg:text-[28px] font-semibold text-white tracking-tight leading-snug max-w-4xl">
            {mainTitle}
          </h1>

          {/* Rating & Total Booked Trips Row */}
          <div className="mt-2.5 flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-[13px] text-white/90">
            <span className="inline-flex items-center gap-1.5">
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span className="font-medium text-white">
                {pkg.rating.toFixed(1)}
              </span>
              <span className="text-white/75 font-normal">
                ({pkg.reviewsCount} Reviews)
              </span>
            </span>

            <span className="text-white/30">•</span>

            <span className="inline-flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-sky-300" />
              <span className="font-medium text-white">
                {(
                  pkg.bookedCount ?? pkg.reviewsCount * 8 + pkg.days * 12
                ).toLocaleString()}
                +
              </span>
              <span className="text-white/75 font-normal">Trips Booked</span>
            </span>
          </div>
        </div>
      </section>

      {/* ─── MAIN 2-COLUMN SECTION: LEFT HAS ALL CONTENT, RIGHT HAS BOOKING FORM ─── */}
      <section className="py-8 sm:py-10 lg:py-12">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 print:block gap-8 lg:gap-10 items-start">
            {/* ════ LEFT COLUMN: ALL TOUR DETAILS (lg:col-span-8) ════ */}
            <div className="lg:col-span-8 print:col-span-12 space-y-10 sm:space-y-12">
              <PackageGallerySection
                title={pkg.title}
                mainImage={pkg.image}
                images={pkg.images}
              />

              <PackageAboutSpecs
                overview={pkg.overview || pkg.description}
                hotelStars={pkg.hotelStars}
              />

              <PackageItinerarySection
                location={pkg.location}
                hotelStars={pkg.hotelStars}
                hotelName={pkg.hotelName}
                packageImages={Array.from(
                  new Set([pkg.image, ...(pkg.images || [])].filter(Boolean))
                )}
                itinerary={pkg.itinerary}
                inclusions={pkg.inclusions}
                exclusions={pkg.exclusions}
              />

              <PackageReviewsSection
                packageTitle={mainTitle}
                destination={pkg.destination || pkg.location}
                rating={pkg.rating}
                reviewsCount={pkg.reviewsCount}
              />
            </div>

            {/* ════ RIGHT COLUMN: SIDEBAR FORM & MOBILE STICKY BAR ════ */}
            <PackageBookingSidebar
              title={pkg.title}
              price={pkg.price}
              originalPrice={originalPrice}
              savings={savings}
              duration={pkg.duration}
              nights={pkg.nights}
              days={pkg.days}
            />
          </div>
        </div>
      </section>

      {/* ─── BOTTOM SECTION: RELEVANT PACKAGE SLIDER ─── */}
      <RelevantPackagesSlider packages={relatedPackages} />
    </div>
  );
}
