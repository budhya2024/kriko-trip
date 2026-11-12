"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X, Images } from "lucide-react";
import { useScrollLock } from "@/components/shared/useScrollLock";

interface PackageGallerySectionProps {
  title: string;
  mainImage: string;
  images?: string[];
}

const FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80",
];

/**
 * Renders the 4-photo collage grid with a "View All" trigger on the 4th tile
 * and a fullscreen lightbox modal to browse all package photos.
 */
export default function PackageGallerySection({
  title,
  mainImage,
  images,
}: PackageGallerySectionProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const allGalleryImages = useMemo(
    () =>
      Array.from(
        new Set([mainImage, ...(images || []), ...FALLBACK_IMAGES].filter(Boolean))
      ),
    [mainImage, images]
  );

  const galleryImages = allGalleryImages.slice(0, 4);
  const extraPhotosCount = Math.max(0, allGalleryImages.length - 4);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowLeft") {
        setLightboxIndex((prev) =>
          prev !== null ? (prev === 0 ? allGalleryImages.length - 1 : prev - 1) : null
        );
      }
      if (e.key === "ArrowRight") {
        setLightboxIndex((prev) =>
          prev !== null ? (prev === allGalleryImages.length - 1 ? 0 : prev + 1) : null
        );
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => {
      window.removeEventListener("keydown", handleKey);
    };
  }, [lightboxIndex, allGalleryImages.length]);

  useScrollLock(lightboxIndex !== null);

  return (
    <>
      {/* ─── 4-Photo Collage Grid ─── */}
      <div className="grid grid-cols-2 gap-2 sm:gap-3.5 h-[220px] xs:h-[270px] sm:h-[380px] md:h-[430px]">
        {/* Left Tall Vertical Photo */}
        <button
          type="button"
          onClick={() => setLightboxIndex(0)}
          aria-label="View main package photo"
          className="relative w-full h-full rounded-md overflow-hidden bg-gray-100 group cursor-pointer focus:outline-none"
        >
          <Image
            src={galleryImages[0]}
            alt={title}
            fill
            priority
            sizes="(max-width: 1024px) 50vw, 480px"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </button>

        {/* Right Collage Grid (2 Rows: 1 Wide Top, 2 Bottom Split) */}
        <div className="grid grid-cols-2 grid-rows-2 gap-2 sm:gap-3.5 h-full">
          {/* Top Wide Photo (Row 1 spanning 2 columns) */}
          <button
            type="button"
            onClick={() => setLightboxIndex(1)}
            aria-label="View package scenic photo"
            className="col-span-2 relative w-full h-full rounded-md overflow-hidden bg-gray-100 group cursor-pointer focus:outline-none"
          >
            <Image
              src={galleryImages[1]}
              alt={`${title} - Scenic View`}
              fill
              priority
              sizes="(max-width: 1024px) 50vw, 480px"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </button>

          {/* Bottom Left Photo (Row 2 Col 1) */}
          <button
            type="button"
            onClick={() => setLightboxIndex(2)}
            aria-label="View experience photo 1"
            className="relative w-full h-full rounded-md overflow-hidden bg-gray-100 group cursor-pointer focus:outline-none"
          >
            <Image
              src={galleryImages[2]}
              alt={`${title} - Experience 1`}
              fill
              priority
              sizes="(max-width: 1024px) 25vw, 230px"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </button>

          {/* Bottom Right Photo (Row 2 Col 2) with View All Overlay Link */}
          <div className="relative w-full h-full rounded-md overflow-hidden bg-gray-100 group">
            <button
              type="button"
              onClick={() => setLightboxIndex(3)}
              aria-label="View all package photos"
              className="relative w-full h-full block cursor-pointer focus:outline-none"
            >
              <Image
                src={galleryImages[3]}
                alt={`${title} - Experience 2`}
                fill
                priority
                sizes="(max-width: 1024px) 25vw, 230px"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
              <span className="print:hidden absolute bottom-2 right-2 sm:bottom-3 sm:right-3 inline-flex items-center justify-center w-8 h-8 sm:w-auto sm:h-auto sm:gap-1.5 sm:px-3 sm:py-1.5 rounded-full bg-white/95 hover:bg-white text-gray-900 text-xs font-medium shadow-md">
                <Images className="hidden sm:block w-3.5 h-3.5 text-[#1877F2] shrink-0" />
                <span className="sm:hidden font-semibold leading-none">
                  {extraPhotosCount > 0 ? `+${extraPhotosCount}` : allGalleryImages.length}
                </span>
                <span className="hidden sm:inline">
                  View All{extraPhotosCount > 0 ? ` (+${extraPhotosCount})` : ""}
                </span>
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* ─── Fullscreen Photo Gallery Lightbox Modal ─── */}
      {lightboxIndex !== null && allGalleryImages.length > 0 && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Package photo gallery"
          onClick={() => setLightboxIndex(null)}
          className="fixed inset-0 z-[140] bg-black/95 backdrop-blur-sm flex flex-col justify-between p-4 sm:p-6 select-none print:hidden"
        >
          {/* Top bar: counter & close button */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="flex items-center justify-between text-white/90 z-10"
          >
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-white/10 text-xs sm:text-sm font-medium tracking-wide">
                {lightboxIndex + 1} / {allGalleryImages.length}
              </span>
              <span className="hidden sm:inline text-sm font-medium text-white/75 truncate max-w-md">
                {title}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setLightboxIndex(null)}
              aria-label="Close gallery"
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Main image stage with prev/next arrows */}
          <div className="relative flex-1 flex items-center justify-center my-3 sm:my-4 min-h-0">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex((prev) =>
                  prev === null
                    ? 0
                    : (prev - 1 + allGalleryImages.length) % allGalleryImages.length
                );
              }}
              aria-label="Previous photo"
              className="absolute left-1 sm:left-4 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <div
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl h-[65vh] sm:h-[75vh]"
            >
              <Image
                src={allGalleryImages[lightboxIndex]}
                alt={`${title} - Photo ${lightboxIndex + 1}`}
                fill
                sizes="100vw"
                className="object-contain"
                priority
              />
            </div>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex((prev) =>
                  prev === null ? 0 : (prev + 1) % allGalleryImages.length
                );
              }}
              aria-label="Next photo"
              className="absolute right-1 sm:right-4 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Bottom thumbnail strip */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-1 max-w-full"
          >
            {allGalleryImages.map((imgUrl, idx) => {
              const isActive = idx === lightboxIndex;
              return (
                <button
                  key={`${imgUrl}-${idx}`}
                  type="button"
                  onClick={() => setLightboxIndex(idx)}
                  aria-label={`View photo ${idx + 1}`}
                  className={`relative w-16 h-12 sm:w-20 sm:h-14 rounded-lg overflow-hidden shrink-0 transition-all cursor-pointer border-2 ${
                    isActive
                      ? "border-white scale-105 opacity-100"
                      : "border-transparent opacity-50 hover:opacity-85"
                  }`}
                >
                  <Image
                    src={imgUrl}
                    alt={`${title} thumbnail ${idx + 1}`}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </button>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}

