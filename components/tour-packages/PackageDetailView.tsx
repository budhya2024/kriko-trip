"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Clock,
  Star,
  Users,
  CheckCircle2,
  XCircle,
  Calendar,
  ChevronDown,
  ChevronRight,
  ShieldCheck,
  PhoneCall,
  Sparkles,
  Share2,
  Utensils,
  Bed,
  Car,
  Compass,
  ArrowRight,
  Check,
  Send,
  MessageCircle,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import { TourPackage } from "./types";
import { PackageDetailedInfo } from "./packageDetailData";

interface PackageDetailViewProps {
  pkg: TourPackage & PackageDetailedInfo;
  relatedPackages: TourPackage[];
}

export default function PackageDetailView({
  pkg,
  relatedPackages,
}: PackageDetailViewProps) {
  // Gallery state
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Itinerary accordion state (Day 1 expanded by default)
  const [openDays, setOpenDays] = useState<number[]>([1]);

  const toggleDay = (dayNum: number) => {
    setOpenDays((prev) =>
      prev.includes(dayNum) ? prev.filter((d) => d !== dayNum) : [...prev, dayNum]
    );
  };

  const expandAllDays = () => {
    setOpenDays(pkg.itinerary.map((d) => d.day));
  };

  const collapseAllDays = () => {
    setOpenDays([]);
  };

  // Booking calculator state
  const [travelDate, setTravelDate] = useState("");
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [bookingFormData, setBookingFormData] = useState({
    name: "",
    email: "",
    phone: "",
    specialRequests: "",
  });

  const originalPrice = pkg.originalPrice || Math.round(pkg.price * 1.22);
  const savings = originalPrice - pkg.price;
  const estimatedTotal = adults * pkg.price + children * Math.round(pkg.price * 0.6);

  const images = pkg.images && pkg.images.length > 0 ? pkg.images : [pkg.image];

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setIsBookModalOpen(false);
      alert(`Booking request for ${pkg.title} received! Our travel specialist will contact you shortly.`);
    }, 1200);
  };

  const whatsappMessage = encodeURIComponent(
    `Hello KrikoTrip! I am interested in booking the "${pkg.title}" (${pkg.duration}) for ${adults} Adults. Please share available dates and customized itinerary.`
  );

  return (
    <div className="w-full bg-[#F8FAFC]">
      {/* ─── Top Breadcrumbs & Page Header ─── */}
      <section className="bg-white border-b border-gray-200/80 py-5 sm:py-6">
        <div className="container">
          {/* Breadcrumb nav */}
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-1.5 text-xs text-gray-500 font-medium mb-3"
          >
            <Link href="/" className="hover:text-[#1877F2] transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
            <Link
              href="/tour-packages"
              className="hover:text-[#1877F2] transition-colors"
            >
              Tour Packages
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
            <span className="text-gray-900 font-semibold truncate max-w-[280px] sm:max-w-md">
              {pkg.title}
            </span>
          </nav>

          {/* Title Row with Badges */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded-full bg-[#00285C] text-white text-[11px] font-bold tracking-wide uppercase">
                  {pkg.travelType} Tour
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-[#1877F2] border border-blue-200/60 text-[11px] font-semibold">
                  {pkg.duration}
                </span>
                {pkg.featured && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-[11px] font-semibold">
                    <Sparkles className="w-3 h-3 text-amber-500" />
                    <span>Top Rated</span>
                  </span>
                )}
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-medium">
                  Free Cancellation (7 Days Prior)
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#00285C] tracking-tight leading-tight">
                {pkg.title}
              </h1>
            </div>

            {/* Quick Rating & Location Info Bar */}
            <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-gray-600 shrink-0">
              <div className="flex items-center gap-1.5 bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-200/70">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span className="font-bold text-gray-950">{pkg.rating}</span>
                <span className="text-gray-500 text-xs">
                  ({pkg.reviewsCount} reviews)
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-gray-700">
                <MapPin className="w-4 h-4 text-[#03ADFF] shrink-0" />
                <span className="font-semibold">{pkg.location}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Hero Photo Gallery Collage ─── */}
      <section className="container py-6 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4">
          {/* Main Large Featured Photo with Linear Diagonal Shine Hover Effect */}
          <div className="lg:col-span-8 relative aspect-[16/10] sm:aspect-[16/9] lg:h-[460px] rounded-2xl overflow-hidden bg-gray-100 border border-gray-200 shadow-xs image-shine cursor-pointer group">
            <Image
              src={images[activeImageIndex]}
              alt={`${pkg.title} - Main photo`}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 850px"
              className="object-cover group-hover:scale-102 transition-transform duration-500"
            />
            <div className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-black/60 backdrop-blur-xs text-white text-xs font-medium z-10 pointer-events-none">
              Photo {activeImageIndex + 1} of {images.length}
            </div>
          </div>

          {/* Right Thumbnails Column */}
          <div className="lg:col-span-4 grid grid-cols-3 lg:grid-cols-1 gap-3 sm:gap-4 lg:h-[460px]">
            {images.slice(0, 3).map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveImageIndex(idx)}
                className={`relative w-full aspect-[4/3] lg:aspect-auto lg:h-[142px] rounded-xl overflow-hidden bg-gray-100 border transition-all cursor-pointer ${
                  activeImageIndex === idx
                    ? "border-[#1877F2] ring-2 ring-[#1877F2]/40 shadow-sm"
                    : "border-gray-200 hover:border-gray-300 opacity-80 hover:opacity-100"
                }`}
              >
                <Image
                  src={img}
                  alt={`${pkg.title} thumbnail ${idx + 1}`}
                  fill
                  sizes="(max-width: 1024px) 33vw, 380px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Main Details & Sticky Booking Sidebar ─── */}
      <section className="container pb-16 sm:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* ─── Left Column: Itinerary, Inclusions, Overview (8 cols) ─── */}
          <div className="lg:col-span-8 space-y-8 sm:space-y-10">
            {/* Quick Specs Ribbon */}
            <div className="bg-white rounded-2xl border border-gray-200/90 p-5 sm:p-6 shadow-2xs grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 text-center">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#00285C] flex items-center justify-center mb-2">
                  <Clock className="w-5 h-5 text-[#03ADFF]" />
                </div>
                <span className="text-xs text-gray-500 font-medium">Duration</span>
                <span className="text-sm font-bold text-[#00285C] mt-0.5">
                  {pkg.duration}
                </span>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#00285C] flex items-center justify-center mb-2">
                  <Bed className="w-5 h-5 text-[#03ADFF]" />
                </div>
                <span className="text-xs text-gray-500 font-medium">Stay</span>
                <span className="text-sm font-bold text-[#00285C] mt-0.5">
                  {pkg.hotelStars}-Star Resort
                </span>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#00285C] flex items-center justify-center mb-2">
                  <Utensils className="w-5 h-5 text-[#03ADFF]" />
                </div>
                <span className="text-xs text-gray-500 font-medium">Meals</span>
                <span className="text-sm font-bold text-[#00285C] mt-0.5">
                  Daily Breakfast & Dinner
                </span>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#00285C] flex items-center justify-center mb-2">
                  <Car className="w-5 h-5 text-[#03ADFF]" />
                </div>
                <span className="text-xs text-gray-500 font-medium">Transfers</span>
                <span className="text-sm font-bold text-[#00285C] mt-0.5">
                  Private AC Vehicle
                </span>
              </div>
            </div>

            {/* Overview & Highlights */}
            <div className="bg-white rounded-2xl border border-gray-200/90 p-6 sm:p-8 shadow-2xs">
              <h2 className="text-xl sm:text-2xl font-bold text-[#00285C] mb-3">
                Tour Overview
              </h2>
              <p className="text-sm sm:text-[15px] text-gray-600 leading-relaxed font-normal">
                {pkg.overview}
              </p>

              {/* Highlights List */}
              <div className="mt-6 pt-6 border-t border-gray-150">
                <h3 className="text-base sm:text-lg font-bold text-[#00285C] mb-4 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#03ADFF]" />
                  <span>Key Tour Highlights</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {pkg.highlights.map((highlight, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#03ADFF] shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-gray-700 font-medium leading-snug">
                        {highlight}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Day-by-Day Interactive Itinerary */}
            <div className="bg-white rounded-2xl border border-gray-200/90 p-6 sm:p-8 shadow-2xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-[#00285C]">
                    Day-by-Day Detailed Itinerary
                  </h2>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Carefully paced itinerary for optimal relaxation and sightseeing
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={expandAllDays}
                    className="text-xs font-semibold text-[#1877F2] hover:underline cursor-pointer"
                  >
                    Expand All
                  </button>
                  <span className="text-gray-300">|</span>
                  <button
                    type="button"
                    onClick={collapseAllDays}
                    className="text-xs font-semibold text-gray-500 hover:text-gray-700 cursor-pointer"
                  >
                    Collapse All
                  </button>
                </div>
              </div>

              {/* Itinerary Timeline List */}
              <div className="space-y-4">
                {pkg.itinerary.map((dayItem) => {
                  const isOpen = openDays.includes(dayItem.day);
                  return (
                    <div
                      key={dayItem.day}
                      className="rounded-xl border border-gray-200 overflow-hidden transition-all duration-200"
                    >
                      {/* Accordion Header */}
                      <button
                        type="button"
                        onClick={() => toggleDay(dayItem.day)}
                        className={`w-full p-4 sm:p-5 flex items-center justify-between text-left cursor-pointer transition-colors ${
                          isOpen ? "bg-blue-50/70" : "bg-white hover:bg-gray-50"
                        }`}
                      >
                        <div className="flex items-center gap-3 sm:gap-4">
                          <span
                            className={`px-3 py-1 rounded-lg text-xs font-bold shrink-0 ${
                              isOpen
                                ? "bg-[#00285C] text-white shadow-xs"
                                : "bg-gray-100 text-gray-700"
                            }`}
                          >
                            Day {dayItem.day}
                          </span>
                          <span className="text-sm sm:text-base font-bold text-[#00285C] line-clamp-1">
                            {dayItem.title}
                          </span>
                        </div>
                        <ChevronDown
                          className={`w-4 h-4 text-gray-500 transition-transform duration-200 shrink-0 ml-2 ${
                            isOpen ? "rotate-180 text-[#1877F2]" : ""
                          }`}
                        />
                      </button>

                      {/* Accordion Body */}
                      {isOpen && (
                        <div className="p-4 sm:p-6 bg-white border-t border-gray-150 text-xs sm:text-sm text-gray-700 space-y-4 animate-in fade-in">
                          <p className="leading-relaxed font-normal">
                            {dayItem.description}
                          </p>

                          {/* Details Tags */}
                          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-gray-100">
                            {dayItem.meals && (
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-50 text-amber-800 border border-amber-200 text-xs font-medium">
                                <Utensils className="w-3.5 h-3.5 text-amber-600" />
                                <span>{dayItem.meals}</span>
                              </span>
                            )}
                            {dayItem.stay && (
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-50 text-[#00285C] border border-blue-200 text-xs font-medium">
                                <Bed className="w-3.5 h-3.5 text-[#03ADFF]" />
                                <span>Stay: {dayItem.stay}</span>
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Inclusions & Exclusions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Inclusions */}
              <div className="bg-white rounded-2xl border border-gray-200/90 p-6 shadow-2xs">
                <div className="flex items-center gap-2 pb-4 mb-4 border-b border-gray-100">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-[#00285C]">
                    What&apos;s Included
                  </h3>
                </div>
                <ul className="space-y-3">
                  {pkg.inclusions.map((inc, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-700 leading-normal"
                    >
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Exclusions */}
              <div className="bg-white rounded-2xl border border-gray-200/90 p-6 shadow-2xs">
                <div className="flex items-center gap-2 pb-4 mb-4 border-b border-gray-100">
                  <div className="w-8 h-8 rounded-lg bg-red-50 text-red-500 flex items-center justify-center font-bold">
                    <XCircle className="w-5 h-5 text-red-500" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-[#00285C]">
                    What&apos;s Excluded
                  </h3>
                </div>
                <ul className="space-y-3">
                  {pkg.exclusions.map((exc, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-500 leading-normal"
                    >
                      <span className="w-4 h-4 text-gray-400 shrink-0 text-center font-bold leading-none mt-0.5">
                        &times;
                      </span>
                      <span>{exc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Accommodation & Resort Showcase */}
            <div className="bg-white rounded-2xl border border-gray-200/90 p-6 sm:p-8 shadow-2xs">
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-gray-100">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#00285C]">
                    Featured Accommodation
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Pre-selected verified hotels for maximum comfort
                  </p>
                </div>
                <div className="flex items-center gap-1 text-amber-500">
                  {Array.from({ length: pkg.hotelStars }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>

              <div className="bg-slate-50 rounded-xl p-5 border border-slate-200/80">
                <h4 className="text-base font-bold text-gray-900 mb-1">
                  {pkg.hotelName}
                </h4>
                <p className="text-xs sm:text-sm text-gray-600 mb-3">
                  Room Category: <span className="font-semibold text-gray-800">{pkg.hotelRoom}</span>
                </p>
                <div className="flex flex-wrap items-center gap-2">
                  {pkg.hotelAmenities.map((amenity, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-md bg-white border border-gray-200 text-gray-700 text-xs font-medium"
                    >
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Custom Tour Inquiry Card */}
            <div className="p-6 sm:p-7 rounded-2xl bg-gradient-to-r from-blue-50/90 via-sky-50/70 to-indigo-50/50 border border-blue-200/80 flex flex-col sm:flex-row items-center justify-between gap-5 text-center sm:text-left shadow-2xs">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-[#00285C] mb-1">
                  Want to Customize This Itinerary?
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 font-normal max-w-md">
                  Add extra nights, luxury villa upgrades, private vehicle rentals, or special honeymoon surprises.
                </p>
              </div>
              <Link
                href="/contact-us"
                className="px-6 py-2.5 rounded-full bg-[#00285C] hover:bg-[#1877F2] text-white text-xs sm:text-sm font-semibold shadow-sm transition-all whitespace-nowrap cursor-pointer shrink-0"
              >
                Request Customization
              </Link>
            </div>
          </div>

          {/* ─── Right Column: Sticky Booking & Price Calculator (4 cols) ─── */}
          <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-5">
            {/* Main Booking Card */}
            <div className="bg-white rounded-2xl border border-gray-200/90 shadow-sm p-6 sm:p-7">
              {/* Pricing Box */}
              <div className="pb-5 mb-5 border-b border-gray-150">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-xs sm:text-sm text-gray-400 line-through font-medium">
                    ₹{originalPrice.toLocaleString("en-IN")}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-bold">
                    Save ₹{savings.toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-3xl sm:text-4xl font-extrabold text-[#00285C]">
                    ₹{pkg.price.toLocaleString("en-IN")}
                  </span>
                  <span className="text-xs text-gray-500 font-medium">
                    / person (twin sharing)
                  </span>
                </div>
                <p className="text-[11px] text-gray-500 mt-1">
                  *All taxes, permits, and hotel surcharges included
                </p>
              </div>

              {/* Booking Options Form */}
              <div className="space-y-4">
                {/* Select Date */}
                <div>
                  <label className="block text-xs font-bold text-[#00285C] uppercase tracking-wider mb-1.5">
                    Select Travel Date
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      value={travelDate}
                      onChange={(e) => setTravelDate(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50/50 text-xs sm:text-sm text-gray-800 outline-none focus:border-[#03ADFF] focus:bg-white font-medium"
                    />
                  </div>
                </div>

                {/* Adults Counter */}
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <div>
                    <span className="block text-xs sm:text-sm font-bold text-gray-900">
                      Adults (12+ yrs)
                    </span>
                    <span className="text-[11px] text-gray-500">₹{pkg.price.toLocaleString("en-IN")} each</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <button
                      type="button"
                      onClick={() => setAdults((prev) => Math.max(1, prev - 1))}
                      className="w-8 h-8 rounded-full border border-gray-200 bg-gray-50 text-gray-700 font-bold hover:bg-gray-100 flex items-center justify-center cursor-pointer transition-colors"
                    >
                      -
                    </button>
                    <span className="w-5 text-center text-sm font-bold text-gray-900">
                      {adults}
                    </span>
                    <button
                      type="button"
                      onClick={() => setAdults((prev) => prev + 1)}
                      className="w-8 h-8 rounded-full border border-gray-200 bg-gray-50 text-gray-700 font-bold hover:bg-gray-100 flex items-center justify-center cursor-pointer transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Children Counter */}
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <div>
                    <span className="block text-xs sm:text-sm font-bold text-gray-900">
                      Children (3-11 yrs)
                    </span>
                    <span className="text-[11px] text-gray-500">40% Discount</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <button
                      type="button"
                      onClick={() => setChildren((prev) => Math.max(0, prev - 1))}
                      className="w-8 h-8 rounded-full border border-gray-200 bg-gray-50 text-gray-700 font-bold hover:bg-gray-100 flex items-center justify-center cursor-pointer transition-colors"
                    >
                      -
                    </button>
                    <span className="w-5 text-center text-sm font-bold text-gray-900">
                      {children}
                    </span>
                    <button
                      type="button"
                      onClick={() => setChildren((prev) => prev + 1)}
                      className="w-8 h-8 rounded-full border border-gray-200 bg-gray-50 text-gray-700 font-bold hover:bg-gray-100 flex items-center justify-center cursor-pointer transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Total Estimate */}
                <div className="pt-2 flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-600 uppercase tracking-wider">
                    Estimated Total:
                  </span>
                  <span className="text-xl sm:text-2xl font-extrabold text-[#00285C]">
                    ₹{estimatedTotal.toLocaleString("en-IN")}
                  </span>
                </div>

                {/* Primary Book Button */}
                <button
                  type="button"
                  onClick={() => setIsBookModalOpen(true)}
                  className="w-full py-3 rounded-full bg-[#00285C] hover:bg-[#1877F2] text-white text-sm font-bold shadow-sm transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Book This Package</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                {/* WhatsApp Quick Inquiry Button */}
                <a
                  href={`https://wa.me/919876543210?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs sm:text-sm font-bold shadow-sm transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <FaWhatsapp className="w-4 h-4" />
                  <span>WhatsApp Instant Inquiry</span>
                </a>

                {/* Phone support */}
                <div className="pt-2 text-center">
                  <a
                    href="tel:+18004567890"
                    className="inline-flex items-center gap-1.5 text-xs text-gray-600 hover:text-[#1877F2] transition-colors font-medium"
                  >
                    <PhoneCall className="w-3.5 h-3.5 text-[#03ADFF]" />
                    <span>Call our specialist: +1 (800) 456-7890</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="bg-white rounded-2xl border border-gray-200/90 p-5 shadow-2xs space-y-3">
              <div className="flex items-center gap-3 text-xs text-gray-700">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>100% Best Price & Value Guarantee</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-gray-700">
                <CheckCircle2 className="w-4 h-4 text-[#03ADFF] shrink-0" />
                <span>Verified 4 & 5-Star Accommodations</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-gray-700">
                <Users className="w-4 h-4 text-[#03ADFF] shrink-0" />
                <span>24/7 Dedicated Ground Concierge</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Similar / Related Tour Packages Section ─── */}
      {relatedPackages && relatedPackages.length > 0 && (
        <section className="bg-white py-14 sm:py-20 border-t border-gray-200/80">
          <div className="container">
            <div className="mb-8 text-left">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#1877F2] bg-blue-50 px-2.5 py-1 rounded-md border border-blue-100">
                EXPLORE MORE TRIPS
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#00285C] mt-2 tracking-tight">
                Similar Holiday Packages
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
              {relatedPackages.slice(0, 3).map((rPkg) => (
                <div
                  key={rPkg.id}
                  className="group bg-white rounded-2xl overflow-hidden border border-gray-200/90 shadow-2xs hover:border-gray-300 transition-all duration-300 flex flex-col justify-between"
                >
                  {/* Photo with diagonal shine */}
                  <div className="relative w-full aspect-[16/10] overflow-hidden bg-gray-100 image-shine">
                    <Image
                      src={rPkg.image}
                      alt={rPkg.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 380px"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2.5 left-2.5 z-10">
                      <span className="px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-xs text-white text-[11px] font-medium">
                        {rPkg.travelType}
                      </span>
                    </div>
                    <div className="absolute bottom-2.5 right-2.5 z-10 px-2.5 py-0.5 rounded-md bg-white/95 text-xs font-semibold text-gray-800 shadow-xs">
                      {rPkg.duration}
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-5 flex flex-col flex-1 justify-between text-left">
                    <div>
                      <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-1.5">
                        <MapPin className="w-3.5 h-3.5 text-[#03ADFF]" />
                        <span>{rPkg.location}</span>
                      </div>
                      <h3 className="text-base font-bold text-gray-900 group-hover:text-[#1877F2] transition-colors line-clamp-2 leading-snug">
                        <Link href={`/tour-packages/${rPkg.id}`}>
                          {rPkg.title}
                        </Link>
                      </h3>
                    </div>

                    <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between">
                      <div>
                        <span className="text-xs text-gray-400 block leading-none">Starting from</span>
                        <span className="text-base sm:text-lg font-bold text-[#00285C]">
                          ₹{rPkg.price.toLocaleString("en-IN")}
                        </span>
                      </div>
                      <Link
                        href={`/tour-packages/${rPkg.id}`}
                        className="px-4 py-2 rounded-full bg-[#00285C] hover:bg-[#1877F2] text-white text-xs font-semibold transition-all inline-flex items-center gap-1 cursor-pointer"
                      >
                        <span>View Details</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── Booking Inquiry Modal ─── */}
      {isBookModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setIsBookModalOpen(false)}
        >
          <div
            className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setIsBookModalOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 flex items-center justify-center font-bold cursor-pointer"
            >
              &times;
            </button>

            <h3 className="text-xl font-bold text-[#00285C] mb-1">
              Reserve Your Tour Package
            </h3>
            <p className="text-xs text-gray-500 mb-5">
              {pkg.title} ({pkg.duration}) • Estimated Total: ₹{estimatedTotal.toLocaleString("en-IN")}
            </p>

            <form onSubmit={handleBookingSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={bookingFormData.name}
                  onChange={(e) =>
                    setBookingFormData({ ...bookingFormData, name: e.target.value })
                  }
                  placeholder="John Doe"
                  className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs sm:text-sm outline-none focus:border-[#03ADFF]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={bookingFormData.email}
                    onChange={(e) =>
                      setBookingFormData({ ...bookingFormData, email: e.target.value })
                    }
                    placeholder="john@example.com"
                    className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs sm:text-sm outline-none focus:border-[#03ADFF]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    value={bookingFormData.phone}
                    onChange={(e) =>
                      setBookingFormData({ ...bookingFormData, phone: e.target.value })
                    }
                    placeholder="+91 98765 43210"
                    className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs sm:text-sm outline-none focus:border-[#03ADFF]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                  Special Requests / Inquiries
                </label>
                <textarea
                  rows={3}
                  value={bookingFormData.specialRequests}
                  onChange={(e) =>
                    setBookingFormData({
                      ...bookingFormData,
                      specialRequests: e.target.value,
                    })
                  }
                  placeholder="Need flight assistance, specific room preferences, or vegetarian meal plan..."
                  className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs sm:text-sm outline-none focus:border-[#03ADFF] resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitted}
                  className="w-full py-3 rounded-full bg-[#00285C] hover:bg-[#1877F2] text-white text-xs sm:text-sm font-bold shadow-sm transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  {isSubmitted ? (
                    <span>Processing Reservation...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4 text-[#03ADFF]" />
                      <span>Confirm Reservation Request</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

