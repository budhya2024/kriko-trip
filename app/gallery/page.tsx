"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Header, Footer, PageHeader } from "@/components/shared";
import {
  MapPin,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface GalleryPhoto {
  id: string;
  title: string;
  location: string;
  category: "Wildlife & Safaris" | "Beaches & Islands" | "Luxury Resorts" | "Mountains & Lakes" | "Culture & Heritage";
  image: string;
  aspect?: "landscape" | "portrait" | "wide";
}

const galleryData: GalleryPhoto[] = [
  {
    id: "photo-1",
    title: "Sundarban Mangrove Safari & Spotted Deer",
    location: "Sundarban National Park, West Bengal",
    category: "Wildlife & Safaris",
    image: "https://images.unsplash.com/photo-1484406566174-9da000fda645?auto=format&fit=crop&w=1200&q=80",
    aspect: "landscape",
  },
  {
    id: "photo-2",
    title: "Eco Resort Lagoon & River Pavilion",
    location: "Hotel Sonar Bangla, Gosaba",
    category: "Luxury Resorts",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
    aspect: "landscape",
  },
  {
    id: "photo-3",
    title: "Radhanagar Beach & Turquoise Waters",
    location: "Havelock Island, Andaman",
    category: "Beaches & Islands",
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1200&q=80",
    aspect: "landscape",
  },
  {
    id: "photo-4",
    title: "Living Root Bridges & Misty Waterfalls",
    location: "Cherrapunji, Meghalaya",
    category: "Mountains & Lakes",
    image: "/assets/images/gallery-img4-3-2.webp",
    aspect: "portrait",
  },
  {
    id: "photo-5",
    title: "Traditional Houseboat on Palm-Fringed Backwaters",
    location: "Alleppey, Kerala",
    category: "Beaches & Islands",
    image: "https://images.unsplash.com/photo-1506665531195-3566af2b4dfa?auto=format&fit=crop&w=1200&q=80",
    aspect: "landscape",
  },
  {
    id: "photo-6",
    title: "Golden Temple Reflection at Sunset",
    location: "Amritsar, Punjab",
    category: "Culture & Heritage",
    image: "/assets/images/gallery-img1-3-2.webp",
    aspect: "landscape",
  },
  {
    id: "photo-7",
    title: "Snow-Covered Pine Slopes of Gulmarg",
    location: "Gulmarg, Kashmir",
    category: "Mountains & Lakes",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80",
    aspect: "landscape",
  },
  {
    id: "photo-8",
    title: "Five-Star Suite Bedroom with Forest View",
    location: "Sundarban Luxury Outing Resort",
    category: "Luxury Resorts",
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80",
    aspect: "landscape",
  },
  {
    id: "photo-9",
    title: "Sunset Thar Desert Camel Safari",
    location: "Sam Sand Dunes, Jaisalmer, Rajasthan",
    category: "Wildlife & Safaris",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
    aspect: "landscape",
  },
  {
    id: "photo-10",
    title: "Pristine Crescent Beach & Palm Groves",
    location: "Palolem Beach, South Goa",
    category: "Beaches & Islands",
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1200&q=80",
    aspect: "portrait",
  },
  {
    id: "photo-11",
    title: "Evening Ganga Aarti Along Historic Ghats",
    location: "Dashashwamedh Ghat, Varanasi",
    category: "Culture & Heritage",
    image: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1200&q=80",
    aspect: "landscape",
  },
  {
    id: "photo-12",
    title: "Ancient Monolithic Rock-Cut Kailasa Temple",
    location: "Ellora Caves, Maharashtra",
    category: "Culture & Heritage",
    image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80",
    aspect: "landscape",
  },
  {
    id: "photo-13",
    title: "Munnar Tea Plantation Hill Villa",
    location: "Munnar Hills, Kerala",
    category: "Luxury Resorts",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80",
    aspect: "landscape",
  },
  {
    id: "photo-14",
    title: "Mangrove Delta Safari Launch at Dawn",
    location: "Gosaba Waterways, Sundarbans",
    category: "Wildlife & Safaris",
    image: "/assets/images/gallery-img2-3-2.webp",
    aspect: "landscape",
  },
  {
    id: "photo-15",
    title: "Crystal Water Snorkeling & Coral Reef",
    location: "Havelock Island, Andaman, India",
    category: "Beaches & Islands",
    image: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=80",
    aspect: "landscape",
  },
  {
    id: "photo-16",
    title: "High Altitude Pangong Lake Reflection",
    location: "Pangong Tso, Ladakh",
    category: "Mountains & Lakes",
    image: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1200&q=80",
    aspect: "landscape",
  },
  {
    id: "photo-17",
    title: "Traditional Heritage City Celebration",
    location: "Jaipur Pink City, Rajasthan",
    category: "Culture & Heritage",
    image: "/assets/images/gallery-img5-3-2.webp",
    aspect: "landscape",
  },
  {
    id: "photo-18",
    title: "Sun-Drenched Agatti Coral Beach",
    location: "Agatti Island, Lakshadweep",
    category: "Beaches & Islands",
    image: "/assets/images/gallery-img6-3-2.webp",
    aspect: "landscape",
  },
];

export default function GalleryPage() {
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);

  const activePhoto =
    activePhotoIndex !== null ? galleryData[activePhotoIndex] : null;

  const handlePrevPhoto = useCallback(() => {
    if (activePhotoIndex === null) return;
    setActivePhotoIndex((prev) =>
      prev !== null && prev > 0 ? prev - 1 : galleryData.length - 1
    );
  }, [activePhotoIndex]);

  const handleNextPhoto = useCallback(() => {
    if (activePhotoIndex === null) return;
    setActivePhotoIndex((prev) =>
      prev !== null && prev < galleryData.length - 1 ? prev + 1 : 0
    );
  }, [activePhotoIndex]);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activePhotoIndex === null) return;
      if (e.key === "Escape") setActivePhotoIndex(null);
      if (e.key === "ArrowLeft") handlePrevPhoto();
      if (e.key === "ArrowRight") handleNextPhoto();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activePhotoIndex, handlePrevPhoto, handleNextPhoto]);

  // Lock body scroll when lightbox is open
  useEffect(() => {
    if (activePhotoIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [activePhotoIndex]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      {/* Global Header */}
      <Header />

      {/* Main Page Content */}
      <main className="flex-1">
        {/* Scenic Page Header with Scenic Background */}
        <PageHeader
          title="Travel Gallery"
          subtitle="A visual celebration of unforgettable adventures, exotic landscapes, and world-class luxury destinations."
          breadcrumb="Gallery"
          bgImage="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2000&q=80"
        />

        {/* ─── Gallery Section ─── */}
        <section className="container py-10 sm:py-14 lg:py-16">
          {/* Responsive Gallery Grid (1 col mobile, 2 col tab, 3 col desktop) */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {galleryData.map((photo, index) => (
              <div
                key={photo.id}
                onClick={() => setActivePhotoIndex(index)}
                className="group relative bg-white  overflow-hidden border border-gray-200/90 shadow-2xs hover:border-gray-300 transition-all duration-300 cursor-pointer flex flex-col"
              >
                {/* Photo Image Container with Linear Diagonal Shine Effect */}
                <div className="relative w-full aspect-[4/3] overflow-hidden bg-gray-100 image-shine">
                  <Image
                    src={photo.image}
                    alt={photo.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />

                  {/* Top Category Badge */}
                  <div className="absolute top-3.5 left-3.5 z-10 pointer-events-none">
                    <span className="px-2.5 py-1 rounded-md bg-white/95 text-gray-800 text-[11px] font-medium tracking-wide uppercase shadow-xs border border-gray-100">
                      {photo.category}
                    </span>
                  </div>

                  {/* Hover Overlay with Zoom Icon */}
                  <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10 pointer-events-none">
                    <div className="w-11 h-11 rounded-full bg-white/90 text-gray-900 flex items-center justify-center shadow-md transform scale-90 group-hover:scale-100 transition-transform duration-300">
                      <Maximize2 className="w-5 h-5 text-gray-800" />
                    </div>
                  </div>
                </div>

                {/* Caption Bar */}
                <div className="p-4 sm:p-5 flex flex-col justify-between flex-1 text-left bg-white">
                  <div>
                    <h3 className="text-[15px] sm:text-[16px] font-medium text-gray-900 group-hover:text-[#1877F2] transition-colors leading-snug line-clamp-1 mb-1.5">
                      {photo.title}
                    </h3>
                    <p className="text-xs text-gray-500 flex items-center gap-1.5 line-clamp-1">
                      <MapPin className="w-3.5 h-3.5 text-[#03ADFF] shrink-0" />
                      <span>{photo.location}</span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* ─── Interactive Lightbox Modal ─── */}
      {activePhoto && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6"
          onClick={() => setActivePhotoIndex(null)}
        >
          {/* Close Button */}
          <button
            type="button"
            onClick={() => setActivePhotoIndex(null)}
            aria-label="Close Lightbox"
            className="absolute top-4 right-4 sm:top-6 sm:right-6 z-50 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Previous Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handlePrevPhoto();
            }}
            aria-label="Previous Photo"
            className="absolute left-2 sm:left-6 z-50 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleNextPhoto();
            }}
            aria-label="Next Photo"
            className="absolute right-2 sm:right-6 z-50 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Main Modal Content Card */}
          <div
            className="relative max-w-4xl w-full max-h-[90vh] flex flex-col bg-[#0B132A] rounded-2xl overflow-hidden border border-white/15 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Image Box */}
            <div className="relative w-full h-[55vh] sm:h-[65vh] bg-black">
              <Image
                src={activePhoto.image}
                alt={activePhoto.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 900px"
                className="object-contain"
              />
            </div>

            {/* Modal Caption Footer */}
            <div className="p-4 sm:p-6 bg-[#08182B] border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-white">
              <div>
                <span className="inline-block px-2.5 py-0.5 rounded-md bg-[#00285C] text-sky-200 border border-blue-500/30 text-[11px] font-medium tracking-wide uppercase mb-1.5">
                  {activePhoto.category}
                </span>
                <h3 className="text-base sm:text-lg font-medium text-white line-clamp-1">
                  {activePhoto.title}
                </h3>
                <p className="text-xs text-gray-400 flex items-center gap-1.5 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-[#03ADFF] shrink-0" />
                  <span>{activePhoto.location}</span>
                </p>
              </div>

              {/* Counter */}
              <div className="text-xs text-gray-400 font-medium shrink-0">
                Capture{" "}
                <span className="text-white font-semibold">
                  {(activePhotoIndex ?? 0) + 1}
                </span>{" "}
                of <span className="text-white font-semibold">{galleryData.length}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Global Footer */}
      <Footer />
    </div>
  );
}

