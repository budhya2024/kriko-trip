"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
  MapPin,
  Navigation,
  CheckCircle2,
  XCircle,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import { useScrollLock } from "@/components/shared/useScrollLock";
import { PackageDetailedInfo } from "../packageDetailData";

const DAY_FALLBACK_PHOTOS = [
  "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=600&q=80",
];

function DayPhotoStrip({ photos, title }: { photos: string[]; title: string }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activePhotoIdx, setActivePhotoIdx] = useState<number | null>(null);

  useEffect(() => {
    if (activePhotoIdx === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActivePhotoIdx(null);
      if (e.key === "ArrowLeft") {
        setActivePhotoIdx((prev) =>
          prev !== null ? (prev - 1 + photos.length) % photos.length : null
        );
      }
      if (e.key === "ArrowRight") {
        setActivePhotoIdx((prev) =>
          prev !== null ? (prev + 1) % photos.length : null
        );
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [activePhotoIdx, photos.length]);

  useScrollLock(activePhotoIdx !== null);

  const scrollByAmount = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = direction === "left" ? -220 : 220;
    scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
  };

  if (photos.length === 0) return null;

  return (
    <div className="pt-3 border-t border-gray-100/80 print:hidden">
      <div className="flex items-center justify-between mb-2.5">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-gray-500">
            Day Highlights Photos
          </span>
          <span className="px-2 py-0.5 rounded-full bg-blue-50 text-[#1877F2] text-[11px] font-medium">
            {photos.length} {photos.length === 1 ? "Photo" : "Photos"}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => scrollByAmount("left")}
            aria-label="Scroll day photos left"
            className="w-6 h-6 rounded-full border border-gray-200 bg-white hover:bg-gray-50 text-gray-600 flex items-center justify-center transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => scrollByAmount("right")}
            aria-label="Scroll day photos right"
            className="w-6 h-6 rounded-full border border-gray-200 bg-white hover:bg-gray-50 text-gray-600 flex items-center justify-center transition-colors cursor-pointer"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex items-center gap-2.5 overflow-x-auto snap-x snap-mandatory scrollbar-none scroll-smooth pb-1"
      >
        {photos.map((src, idx) => (
          <button
            key={`${src}-${idx}`}
            type="button"
            onClick={() => setActivePhotoIdx(idx)}
            aria-label={`Expand ${title} photo ${idx + 1}`}
            className="relative w-36 sm:w-44 h-24 sm:h-28 rounded-lg overflow-hidden bg-gray-100 shrink-0 snap-start border border-gray-200/70 cursor-pointer focus:outline-none group"
          >
            <Image
              src={src}
              alt={`${title} photo ${idx + 1}`}
              fill
              sizes="176px"
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </button>
        ))}
      </div>

      {/* Expanded Day Photo Lightbox */}
      {activePhotoIdx !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${title} photo preview`}
          onClick={() => setActivePhotoIdx(null)}
          className="fixed inset-0 z-[140] bg-black/95 backdrop-blur-sm flex flex-col justify-between p-4 sm:p-6 select-none"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="flex items-center justify-between text-white/90 z-10"
          >
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-white/10 text-xs sm:text-sm font-medium">
                {activePhotoIdx + 1} / {photos.length}
              </span>
              <span className="hidden sm:inline text-sm font-medium text-white/75 truncate max-w-md">
                {title}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setActivePhotoIdx(null)}
              aria-label="Close expanded photo"
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="relative flex-1 flex items-center justify-center my-3 min-h-0">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setActivePhotoIdx((prev) =>
                  prev === null ? 0 : (prev - 1 + photos.length) % photos.length
                );
              }}
              aria-label="Previous day photo"
              className="absolute left-1 sm:left-4 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <div
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl h-[65vh] sm:h-[75vh]"
            >
              <Image
                src={photos[activePhotoIdx]}
                alt={`${title} photo ${activePhotoIdx + 1}`}
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
                setActivePhotoIdx((prev) =>
                  prev === null ? 0 : (prev + 1) % photos.length
                );
              }}
              aria-label="Next day photo"
              className="absolute right-1 sm:right-4 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

interface PackageItinerarySectionProps {
  location: string;
  hotelStars?: number;
  hotelName?: string;
  packageImages?: string[];
  itinerary: PackageDetailedInfo["itinerary"];
  inclusions: string[];
  exclusions: string[];
}

/**
 * Renders the expandable Tour Itinerary, Include/Exclude Package Features,
 * Additional Info, and Frequently Asked Questions for a tour package.
 */
export default function PackageItinerarySection({
  location,
  hotelStars = 5,
  hotelName,
  packageImages = [],
  itinerary,
  inclusions,
  exclusions,
}: PackageItinerarySectionProps) {
  const [openDays, setOpenDays] = useState<number[]>([1]);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleDay = (dayNum: number) => {
    setOpenDays((prev) =>
      prev.includes(dayNum) ? prev.filter((d) => d !== dayNum) : [...prev, dayNum]
    );
  };

  const expandAllDays = () => {
    setOpenDays(itinerary.map((d) => d.day));
  };

  const collapseAllDays = () => {
    setOpenDays([]);
  };

  const faqs = [
    {
      q: `What are the must-visit places in ${location}?`,
      a: `In ${location}, must-visit attractions include iconic historical landmarks, pristine beaches, scenic view points, and local cultural markets—all covered in our curated itinerary.`,
    },
    {
      q: "Do tour packages include entrance fees?",
      a: "Yes! All standard monument tickets, national park permits, and entry passes mentioned in the itinerary are included in the package price.",
    },
    {
      q: "What type of accommodation is included?",
      a: `We provide verified luxury accommodations (${hotelStars}-Star Resorts / Luxury Hotels) with daily breakfast, private bathrooms, Wi-Fi, and 24-hour front desk support.`,
    },
    {
      q: "Will I get a full refund if I cancel my trip?",
      a: "Yes, free cancellation is available up to 7 days prior to departure for a 100% full refund minus minimal banking gateway fees.",
    },
  ];

  return (
    <>
      {/* ─── 3. TOUR ITINERARY ─── */}
      <div className="mt-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[22px] sm:text-[26px] font-semibold text-gray-900 mb-4 tracking-tight">
            Tour Itinerary
          </h2>
          <div className="flex items-center gap-2 print:hidden">
            <button
              type="button"
              onClick={expandAllDays}
              className="text-xs sm:text-sm font-medium text-[#1877F2] hover:underline cursor-pointer"
            >
              Expand All +
            </button>
            <span className="text-gray-300">|</span>
            <button
              type="button"
              onClick={collapseAllDays}
              className="text-xs sm:text-sm font-normal text-gray-500 hover:text-gray-700 cursor-pointer"
            >
              Collapse All
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2.5 mb-5">
          <div className="w-6 h-6 rounded-full bg-[#1877F2] text-white flex items-center justify-center shrink-0 shadow-xs">
            <Navigation className="w-3 h-3 fill-white text-white" />
          </div>
          <div className="text-sm sm:text-base font-semibold text-gray-900">
            <span>{location} </span>
            <span className="font-normal text-gray-500 text-xs sm:text-sm">
              ( Departure: 8:00 am - 8:30am )
            </span>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white px-6 sm:px-8 py-2 shadow-xs">
          {itinerary.map((dayItem) => {
            const isOpen = openDays.includes(dayItem.day);
            const dayPadded = dayItem.day < 10 ? `0${dayItem.day}` : dayItem.day;

            return (
              <div
                key={dayItem.day}
                className="py-5 sm:py-6 first:pt-4 last:pb-4 border-b border-gray-100 last:border-0"
              >
                <button
                  type="button"
                  onClick={() => toggleDay(dayItem.day)}
                  className="w-full flex items-center justify-between text-left cursor-pointer group"
                >
                  <div className="flex items-center pr-4 flex-1">
                    <MapPin className="w-4 h-4 text-black shrink-0 stroke-[2.2]" />
                    <span className="font-semibold text-gray-950 text-sm sm:text-base shrink-0 mx-2.5">
                      Day-{dayPadded}
                    </span>
                    <span className="text-sm sm:text-base font-normal text-gray-800 group-hover:text-[#1877F2] transition-colors ml-6 sm:ml-10 line-clamp-1">
                      {dayItem.title}
                    </span>
                  </div>

                  <div className="shrink-0 text-gray-500 pl-2 print:hidden">
                    <svg
                      className={`w-3.5 h-3.5 fill-gray-500 transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                      viewBox="0 0 24 24"
                    >
                      <path d="M7 10l5 5 5-5z" />
                    </svg>
                  </div>
                </button>

                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100 mt-4 pt-1"
                      : "grid-rows-[0fr] opacity-0 mt-0 pt-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="text-sm sm:text-[15px] text-gray-700 space-y-4 pl-0 sm:pl-2">
                      <p className="leading-relaxed font-normal text-gray-600">
                        {dayItem.description}
                      </p>

                      <div className="space-y-3 pt-2">
                        <div className="flex items-start sm:items-center gap-2.5 text-xs sm:text-sm">
                          <svg
                            className="w-4 h-4 text-[#1877F2] fill-[#1877F2] shrink-0 mt-0.5 sm:mt-0"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 2L2 12l10 10 10-10L12 2zm0 5.5l4.5 4.5-4.5 4.5-4.5-4.5 4.5-4.5z" />
                          </svg>
                          <span className="font-semibold text-gray-950 w-28 sm:w-32 shrink-0">
                            Transport
                          </span>
                          <span className="text-gray-900 font-semibold shrink-0">:</span>
                          <span className="text-gray-700 font-normal ml-1">
                            {dayItem.transport || "Car, Flight, Boat"}
                          </span>
                        </div>

                        <div className="flex items-start sm:items-center gap-2.5 text-xs sm:text-sm">
                          <svg
                            className="w-4 h-4 text-[#1877F2] shrink-0 mt-0.5 sm:mt-0"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <circle cx="12" cy="12" r="9" fill="#1877F2" />
                            <path
                              d="M7 12h2.5l1.5-3 2 6 1.5-3H17"
                              stroke="#ffffff"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <span className="font-semibold text-gray-950 w-28 sm:w-32 shrink-0">
                            Activities
                          </span>
                          <span className="text-gray-900 font-semibold shrink-0">:</span>
                          <span className="text-gray-700 font-normal ml-1">
                            {dayItem.activities && dayItem.activities.length > 0
                              ? dayItem.activities.join(", ")
                              : "Sightseeing, Guided Heritage Walk, Sunset Viewpoint, Cultural Show."}
                          </span>
                        </div>

                        <div className="flex items-start sm:items-center gap-2.5 text-xs sm:text-sm">
                          <svg
                            className="w-4 h-4 text-[#1877F2] shrink-0 mt-0.5 sm:mt-0"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#1877F2"
                            strokeWidth="2"
                          >
                            <circle cx="12" cy="12" r="9" />
                            <circle cx="12" cy="12" r="3.5" fill="#1877F2" stroke="none" />
                          </svg>
                          <span className="font-semibold text-gray-950 w-28 sm:w-32 shrink-0">
                            Meals
                          </span>
                          <span className="text-gray-900 font-semibold shrink-0">:</span>
                          <span className="text-gray-700 font-normal ml-1">
                            {dayItem.meals || "Breakfast, Lunch, Snacks"}
                          </span>
                        </div>

                        <div className="flex items-start sm:items-center gap-2.5 text-xs sm:text-sm">
                          <svg
                            className="w-4 h-4 text-[#1877F2] shrink-0 mt-0.5 sm:mt-0"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#1877F2"
                            strokeWidth="2"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                            />
                          </svg>
                          <span className="font-semibold text-gray-950 w-28 sm:w-32 shrink-0">
                            Accomodation
                          </span>
                          <span className="text-gray-900 font-semibold shrink-0">:</span>
                          <span className="text-gray-700 font-normal ml-1">
                            {dayItem.stay || hotelName || "Luxury Heritage Resort"}
                          </span>
                        </div>
                      </div>

                      {/* Day-wise Manual Horizontal Scroll Photo Strip */}
                      <DayPhotoStrip
                        photos={
                          dayItem.images && dayItem.images.length > 0
                            ? dayItem.images
                            : Array.from({ length: 5 }).map((_, imgIdx) => {
                                const pool = Array.from(
                                  new Set([...packageImages, ...DAY_FALLBACK_PHOTOS])
                                );
                                return pool[(dayItem.day * 2 + imgIdx) % pool.length];
                              })
                        }
                        title={dayItem.title}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ─── 4. PACKAGE FEATURES LIST ─── */}
      <div className="mt-10">
        <h2 className="text-[22px] sm:text-[26px] font-semibold text-gray-900 mb-4 tracking-tight">
          Package Features List
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">
              Include Features
            </h3>
            <ul className="space-y-3.5">
              {inclusions.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <CheckCircle2
                    className="w-4.5 h-4.5 text-[#1877F2] shrink-0 mt-0.5"
                    strokeWidth={1.8}
                  />
                  <span className="text-xs sm:text-sm text-gray-600 font-normal leading-normal">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">
              Exclude Features
            </h3>
            <ul className="space-y-3.5">
              {exclusions.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <XCircle
                    className="w-4.5 h-4.5 text-[#EF4444] shrink-0 mt-0.5"
                    strokeWidth={1.8}
                  />
                  <span className="text-xs sm:text-sm text-gray-600 font-normal leading-normal">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ─── 5. ADDITIONAL INFO ─── */}
      <div className="mt-10">
        <h2 className="text-[22px] sm:text-[26px] font-semibold text-gray-900 mb-4 tracking-tight">
          Additional Info
        </h2>
        <div className="space-y-3.5">
          <div className="flex items-start gap-2.5">
            <CheckCircle2
              className="w-4.5 h-4.5 text-[#1877F2] shrink-0 mt-0.5"
              strokeWidth={1.8}
            />
            <span className="text-xs sm:text-sm text-gray-600 font-normal leading-relaxed">
              <strong className="text-gray-800 font-medium">
                Free Cancellation
              </strong>{" "}
              – Some tours offer free cancellation up to a certain period (e.g.,
              24–48 hours before departure).
            </span>
          </div>
          <div className="flex items-start gap-2.5">
            <CheckCircle2
              className="w-4.5 h-4.5 text-[#1877F2] shrink-0 mt-0.5"
              strokeWidth={1.8}
            />
            <span className="text-xs sm:text-sm text-gray-600 font-normal leading-relaxed">
              <strong className="text-gray-800 font-medium">
                Health &amp; Safety Guidelines
              </strong>{" "}
              – COVID-19 regulations, vaccinations, or travel restrictions.
            </span>
          </div>
        </div>
      </div>

      {/* ─── 6. FREQUENTLY ASKED & QUESTION ─── */}
      <div className="mt-10">
        <h2 className="text-[22px] sm:text-[26px] font-semibold text-gray-900 mb-4 tracking-tight">
          Frequently Asked &amp; Question
        </h2>
        <div className="space-y-3.5">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className={`rounded-xl transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? "bg-white shadow-[0_8px_25px_rgba(0,0,0,0.06)] p-5 sm:p-6"
                    : "bg-[#F3F4F6] hover:bg-[#EBEEF2] p-5 sm:p-6"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between gap-4 text-left cursor-pointer focus:outline-none select-none"
                >
                  <span
                    className={`text-sm sm:text-base font-semibold leading-snug transition-colors duration-200 ${
                      isOpen ? "text-[#1877F2]" : "text-gray-900"
                    }`}
                  >
                    {faq.q}
                  </span>

                  <div className="shrink-0 ml-2 print:hidden">
                    <svg
                      viewBox="0 0 10 6"
                      fill="currentColor"
                      className={`w-2.5 h-2.5 transition-transform duration-300 ease-in-out ${
                        isOpen
                          ? "text-[#1877F2] rotate-180"
                          : "text-[#4B5563] rotate-0"
                      }`}
                    >
                      <path d="M0 0L5 6L10 0H0Z" />
                    </svg>
                  </div>
                </button>

                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100 mt-3 pt-1"
                      : "grid-rows-[0fr] opacity-0 mt-0 pt-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed font-normal">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

