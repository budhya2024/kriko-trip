"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Clock,
  Star,
  Users,
  Compass,
  Building,
  Utensils,
  Car,
  Languages,
  PawPrint,
  Calendar,
  Leaf,
  Tag,
  Navigation,
  CheckCircle2,
  XCircle,
  ChevronDown,
  Share2,
  Heart,
  Send,
  ArrowUpRight,
  Download,
  User,
  Phone,
  Mail,
  MessageSquare,
} from "lucide-react";
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
  // Itinerary accordion state (Day 1 expanded by default)
  const [openDays, setOpenDays] = useState<number[]>([1]);
  const [isSaved, setIsSaved] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);

  // FAQ accordion state (FAQ 0 expanded by default)
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Sidebar Quote Form State (Matches reference screenshot)
  const [sidebarForm, setSidebarForm] = useState({
    name: "",
    phone: "",
    email: "",
    travelDate: "",
    travellers: "1",
    message: "",
  });
  const [isQuoteSubmitted, setIsQuoteSubmitted] = useState(false);

  const originalPrice = pkg.originalPrice || Math.round(pkg.price * 1.25);
  const savings = originalPrice - pkg.price;
  const discountPercent = Math.round((savings / originalPrice) * 100);

  // 4 high-res gallery photos for the collage matching Screenshot 1
  const galleryImages = [
    pkg.image,
    pkg.images?.[1] ||
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80",
    pkg.images?.[2] ||
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    pkg.images?.[3] ||
      "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=800&q=80",
  ];

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

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2000);
    }
  };

  const handleDownloadBrochure = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  const handleQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsQuoteSubmitted(true);
    setTimeout(() => {
      setIsQuoteSubmitted(false);
      alert(
        `Thank you ${sidebarForm.name || ""}! Your inquiry for "${pkg.title}" has been received. Our holiday specialist will call you on ${sidebarForm.phone || ""} shortly.`
      );
      setSidebarForm({
        name: "",
        phone: "",
        email: "",
        travelDate: "",
        travellers: "1",
        message: "",
      });
    }, 1000);
  };

  const faqs = [
    {
      q: `What are the must-visit places in ${pkg.location}?`,
      a: `In ${pkg.location}, must-visit attractions include iconic historical landmarks, pristine beaches, scenic view points, and local cultural markets—all covered in our curated itinerary.`,
    },
    {
      q: "Do tour packages include entrance fees?",
      a: "Yes! All standard monument tickets, national park permits, and entry passes mentioned in the itinerary are included in the package price.",
    },
    {
      q: "What type of accommodation is included?",
      a: `We provide verified luxury accommodations (${pkg.hotelStars || 5}-Star Resorts / Luxury Hotels) with daily breakfast, private bathrooms, Wi-Fi, and 24-hour front desk support.`,
    },
    {
      q: "Will I get a full refund if I cancel my trip?",
      a: "Yes, free cancellation is available up to 7 days prior to departure for a 100% full refund minus minimal banking gateway fees.",
    },
  ];

  return (
    <div className="w-full bg-[#FFFFFF] font-sans antialiased text-[#111827]">
      {/* ─── TOP HERO BANNER WITH SCENIC BACKGROUND & BREADCRUMB ─── */}
      <section className="relative w-full overflow-hidden bg-[#00285C] py-10 sm:py-12 lg:py-14">
        {/* Background Image with Ambient Dark Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src={pkg.image}
            alt={pkg.title}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-30 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#001433]/95 via-[#00285C]/85 to-[#00285C]/75" />
        </div>

        {/* Content Container */}
        <div className="container relative z-10 text-left">
          {/* Breadcrumb Navigation on Top with Background */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-xs sm:text-[13px] text-white/80 mb-2.5 font-normal"
          >
            <Link
              href="/"
              className="hover:text-white transition-colors"
            >
              Home
            </Link>
            <span className="text-white/40">/</span>
            <Link
              href="/tour-packages"
              className="hover:text-white transition-colors"
            >
              Tour Packages
            </Link>
            <span className="text-white/40">/</span>
            <span className="text-sky-300 font-medium truncate max-w-xs sm:max-w-md">
              {pkg.title}
            </span>
          </nav>

          {/* Package Heading */}
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight leading-snug">
            {pkg.title}
          </h1>
        </div>
      </section>

      {/* ─── MAIN 2-COLUMN SECTION: LEFT HAS ALL CONTENT, RIGHT ONLY HAS THE FORM ─── */}
      <section className="py-8 sm:py-10 lg:py-12">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            {/* ════ LEFT COLUMN: ALL TOUR DETAILS (lg:col-span-8) ════ */}
            <div className="lg:col-span-8 space-y-10 sm:space-y-12">
              {/* ─── 1. PHOTO GALLERY COLLAGE (Inside Left Column) ─── */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-3.5">
                {/* Left Tall Vertical Photo */}
                <div className="sm:col-span-6 relative aspect-[4/3] sm:aspect-auto sm:h-[400px] rounded-2xl overflow-hidden bg-gray-100 border border-gray-150 shadow-xs group">
                  <Image
                    src={galleryImages[0]}
                    alt={`${pkg.title} - Main Feature`}
                    fill
                    priority
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 460px"
                    className="object-cover group-hover:scale-102 transition-transform duration-500"
                  />
                </div>

                {/* Right 3 Photos: 1 Wide Top, 2 Half-width Bottom */}
                <div className="sm:col-span-6 flex flex-col gap-3 sm:gap-3.5 sm:h-[400px]">
                  {/* Top Wide Photo */}
                  <div className="relative w-full h-[180px] sm:h-[192px] rounded-2xl overflow-hidden bg-gray-100 border border-gray-150 shadow-xs group">
                    <Image
                      src={galleryImages[1]}
                      alt={`${pkg.title} - Landmark`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 460px"
                      className="object-cover group-hover:scale-102 transition-transform duration-500"
                    />
                  </div>

                  {/* Bottom 2 Photos Side-by-Side */}
                  <div className="grid grid-cols-2 gap-3 sm:gap-3.5 flex-1">
                    <div className="relative w-full h-full min-h-[120px] rounded-2xl overflow-hidden bg-gray-100 border border-gray-150 shadow-xs group">
                      <Image
                        src={galleryImages[2]}
                        alt={`${pkg.title} - Experience 1`}
                        fill
                        sizes="(max-width: 1024px) 25vw, 230px"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="relative w-full h-full min-h-[120px] rounded-2xl overflow-hidden bg-gray-100 border border-gray-150 shadow-xs group">
                      <Image
                        src={galleryImages[3]}
                        alt={`${pkg.title} - Experience 2`}
                        fill
                        sizes="(max-width: 1024px) 25vw, 230px"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* ─── 2. ABOUT TOUR PACKAGE ─── */}
              <div>
                <h2 className="text-2xl sm:text-[26px] font-bold text-gray-900 mb-3 tracking-tight">
                  About Tour Package
                </h2>
                <p className="text-sm sm:text-[15px] text-gray-600 leading-relaxed font-normal mb-7">
                  {pkg.overview || pkg.description}
                </p>

                {/* 9-Item Specs Box in Clean Rounded Border Card */}
                <div className="rounded-2xl border border-gray-200/90 bg-white p-6 sm:p-8 shadow-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-7 gap-x-8">
                    {/* Accomodation */}
                    <div className="flex items-center gap-3.5">
                      <Building className="w-5 h-5 text-gray-500 shrink-0 stroke-[1.6]" />
                      <div>
                        <span className="block text-xs sm:text-[13px] text-gray-500 font-normal">
                          Accomodation
                        </span>
                        <span className="text-sm sm:text-[15px] font-semibold text-gray-900">
                          {pkg.hotelStars || 5} Star Hotel
                        </span>
                      </div>
                    </div>

                    {/* Meals */}
                    <div className="flex items-center gap-3.5">
                      <Utensils className="w-5 h-5 text-gray-500 shrink-0 stroke-[1.6]" />
                      <div>
                        <span className="block text-xs sm:text-[13px] text-gray-500 font-normal">
                          Meals
                        </span>
                        <span className="text-sm sm:text-[15px] font-semibold text-gray-900">
                          Breakfast & Dinner
                        </span>
                      </div>
                    </div>

                    {/* Transportation */}
                    <div className="flex items-center gap-3.5">
                      <Car className="w-5 h-5 text-gray-500 shrink-0 stroke-[1.6]" />
                      <div>
                        <span className="block text-xs sm:text-[13px] text-gray-500 font-normal">
                          Transportation
                        </span>
                        <span className="text-sm sm:text-[15px] font-semibold text-gray-900">
                          Taxi,Car
                        </span>
                      </div>
                    </div>

                    {/* Group Size */}
                    <div className="flex items-center gap-3.5">
                      <Users className="w-5 h-5 text-gray-500 shrink-0 stroke-[1.6]" />
                      <div>
                        <span className="block text-xs sm:text-[13px] text-gray-500 font-normal">
                          Group Size
                        </span>
                        <span className="text-sm sm:text-[15px] font-semibold text-gray-900">
                          10-20
                        </span>
                      </div>
                    </div>

                    {/* Language */}
                    <div className="flex items-center gap-3.5">
                      <Languages className="w-5 h-5 text-gray-500 shrink-0 stroke-[1.6]" />
                      <div>
                        <span className="block text-xs sm:text-[13px] text-gray-500 font-normal">
                          Language
                        </span>
                        <span className="text-sm sm:text-[15px] font-semibold text-gray-900">
                          English, Spanish
                        </span>
                      </div>
                    </div>

                    {/* Animal */}
                    <div className="flex items-center gap-3.5">
                      <PawPrint className="w-5 h-5 text-gray-500 shrink-0 stroke-[1.6]" />
                      <div>
                        <span className="block text-xs sm:text-[13px] text-gray-500 font-normal">
                          Animal
                        </span>
                        <span className="text-sm sm:text-[15px] font-semibold text-gray-900">
                          Cat, Pet only
                        </span>
                      </div>
                    </div>

                    {/* Age Range */}
                    <div className="flex items-center gap-3.5">
                      <Calendar className="w-5 h-5 text-gray-500 shrink-0 stroke-[1.6]" />
                      <div>
                        <span className="block text-xs sm:text-[13px] text-gray-500 font-normal">
                          Age Range
                        </span>
                        <span className="text-sm sm:text-[15px] font-semibold text-gray-900">
                          18-45 (Year)
                        </span>
                      </div>
                    </div>

                    {/* Season */}
                    <div className="flex items-center gap-3.5">
                      <Leaf className="w-5 h-5 text-gray-500 shrink-0 stroke-[1.6]" />
                      <div>
                        <span className="block text-xs sm:text-[13px] text-gray-500 font-normal">
                          Season
                        </span>
                        <span className="text-sm sm:text-[15px] font-semibold text-gray-900">
                          Winter Season
                        </span>
                      </div>
                    </div>

                    {/* Category */}
                    <div className="flex items-center gap-3.5">
                      <Tag className="w-5 h-5 text-gray-500 shrink-0 stroke-[1.6]" />
                      <div>
                        <span className="block text-xs sm:text-[13px] text-gray-500 font-normal">
                          Category
                        </span>
                        <span className="text-sm sm:text-[15px] font-semibold text-gray-900">
                          Adventure
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ─── 3. TOUR ITINERARY ─── */}
              <div>
                {/* Header with Title & Expand / Collapse */}
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl sm:text-[26px] font-bold text-gray-900 tracking-tight">
                    Tour Itinerary
                  </h2>
                  <div className="flex items-center gap-2">
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

                {/* Sub-header with Blue Navigation Icon & Departure Time */}
                <div className="flex items-center gap-2.5 mb-5">
                  <div className="w-6 h-6 rounded-full bg-[#1877F2] text-white flex items-center justify-center shrink-0 shadow-xs">
                    <Navigation className="w-3 h-3 fill-white text-white" />
                  </div>
                  <div className="text-sm sm:text-base font-semibold text-gray-900">
                    <span>{pkg.location} </span>
                    <span className="font-normal text-gray-500 text-xs sm:text-sm">
                      ( Departure: 8:00 am - 8:30am )
                    </span>
                  </div>
                </div>

                {/* Itinerary Card with Dividers & Pin Icons */}
                <div className="rounded-2xl border border-gray-200/90 bg-white p-5 sm:p-7 shadow-xs divide-y divide-gray-150">
                  {pkg.itinerary.map((dayItem) => {
                    const isOpen = openDays.includes(dayItem.day);
                    const dayPadded =
                      dayItem.day < 10 ? `0${dayItem.day}` : dayItem.day;

                    return (
                      <div key={dayItem.day} className="py-4.5 first:pt-1 last:pb-1">
                        <button
                          type="button"
                          onClick={() => toggleDay(dayItem.day)}
                          className="w-full flex items-center justify-between text-left cursor-pointer group"
                        >
                          <div className="flex items-center gap-3 pr-4">
                            <MapPin className="w-4 h-4 text-gray-800 shrink-0" strokeWidth={2} />
                            <span className="font-semibold text-gray-900 text-sm sm:text-[15px] shrink-0">
                              Day-{dayPadded}
                            </span>
                            <span className="text-sm sm:text-[15px] font-normal text-gray-700 group-hover:text-[#1877F2] transition-colors line-clamp-1">
                              {dayItem.title}
                            </span>
                          </div>
                          <ChevronDown
                            className={`w-4 h-4 text-gray-500 transition-transform duration-200 shrink-0 ${
                              isOpen ? "rotate-180 text-[#1877F2]" : ""
                            }`}
                          />
                        </button>

                        {/* Expandable Day Details */}
                        {isOpen && (
                          <div className="mt-3.5 pt-3 text-xs sm:text-sm text-gray-600 space-y-3 pl-7 animate-in fade-in">
                            <p className="leading-relaxed font-normal">
                              {dayItem.description}
                            </p>

                            {/* Day Details Badges */}
                            <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-gray-100">
                              {dayItem.meals && (
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-50 text-amber-800 border border-amber-200 text-xs font-normal">
                                  <Utensils className="w-3 h-3 text-amber-600" />
                                  <span>{dayItem.meals}</span>
                                </span>
                              )}
                              {dayItem.stay && (
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-50 text-[#1877F2] border border-blue-200 text-xs font-normal">
                                  <Building className="w-3 h-3 text-[#1877F2]" />
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

              {/* ─── 4. PACKAGE FEATURES LIST ─── */}
              <div>
                <h2 className="text-2xl sm:text-[26px] font-bold text-gray-900 mb-6 tracking-tight">
                  Package Features List
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Include Features Column */}
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">
                      Include Features
                    </h3>
                    <ul className="space-y-3.5">
                      {pkg.inclusions.map((item, idx) => (
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

                  {/* Exclude Features Column */}
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">
                      Exclude Features
                    </h3>
                    <ul className="space-y-3.5">
                      {pkg.exclusions.map((item, idx) => (
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
              <div>
                <h2 className="text-2xl sm:text-[26px] font-bold text-gray-900 mb-4 tracking-tight">
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
                        Health & Safety Guidelines
                      </strong>{" "}
                      – COVID-19 regulations, vaccinations, or travel restrictions.
                    </span>
                  </div>
                </div>
              </div>

              {/* ─── 6. FREQUENTLY ASKED & QUESTION ─── */}
              <div>
                <h2 className="text-2xl sm:text-[26px] font-bold text-gray-900 mb-4 tracking-tight">
                  Frequently Asked & Question
                </h2>
                <div className="space-y-3">
                  {faqs.map((faq, idx) => {
                    const isOpen = openFaq === idx;
                    return (
                      <div
                        key={idx}
                        className="rounded-xl overflow-hidden transition-all duration-200"
                      >
                        <button
                          type="button"
                          onClick={() => setOpenFaq(isOpen ? null : idx)}
                          className={`w-full p-4 sm:p-4.5 flex items-center justify-between text-left cursor-pointer transition-colors ${
                            isOpen
                              ? "bg-[#EAECEF]"
                              : "bg-[#F3F4F6] hover:bg-[#EAECEF]"
                          }`}
                        >
                          <span className="text-sm sm:text-[15px] font-medium text-gray-800 pr-4">
                            {faq.q}
                          </span>
                          <ChevronDown
                            className={`w-4 h-4 text-gray-500 transition-transform duration-200 shrink-0 ${
                              isOpen ? "rotate-180 text-[#1877F2]" : ""
                            }`}
                          />
                        </button>
                        {isOpen && (
                          <div className="p-4 sm:p-5 bg-white border border-gray-150 border-t-0 rounded-b-xl text-xs sm:text-sm text-gray-600 font-normal leading-relaxed animate-in fade-in">
                            {faq.a}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* ════ RIGHT COLUMN: SIDEBAR FORM (Inside lg:col-span-4) ════ */}
            <div className="lg:col-span-4 lg:sticky lg:top-24">
              <div className="bg-white rounded-2xl border border-gray-200/90 shadow-sm p-5 sm:p-6 relative">
                {/* Top Row: Download Brochure & Share */}
                <div className="flex items-center gap-3 mb-5">
                  <button
                    type="button"
                    onClick={handleDownloadBrochure}
                    className="flex-1 py-3 px-4 rounded-xl border border-gray-200 hover:border-[#1877F2] bg-white hover:bg-blue-50/40 text-[#00285C] font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-2xs transition-colors cursor-pointer"
                  >
                    <Download className="w-4 h-4 text-[#1877F2]" />
                    <span>Download Brochure</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleShare}
                    aria-label="Share package"
                    className="w-11 h-11 rounded-xl border border-gray-200 hover:border-gray-300 bg-white hover:bg-gray-50 flex items-center justify-center text-gray-600 shadow-2xs transition-colors cursor-pointer shrink-0"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Deal & Price Box */}
                <div className="rounded-xl bg-[#F0F5FF] p-4.5 mb-5 flex items-center justify-between border border-blue-100/70">
                  {/* Left Side */}
                  <div className="flex flex-col items-start">
                    <span className="inline-block px-2 py-0.5 rounded-md bg-[#00285C] text-white text-[10px] font-semibold uppercase tracking-wider mb-1">
                      DEAL {pkg.id.slice(0, 8).toUpperCase()}
                    </span>
                    <span className="block text-xs font-semibold text-[#1877F2] uppercase tracking-wider mb-1">
                      BEST VALUE DEAL
                    </span>
                    <span className="flex items-center gap-1.5 text-xs font-medium text-[#00285C]">
                      <Clock className="w-3.5 h-3.5 text-[#1877F2]" />
                      <span>{pkg.duration}</span>
                    </span>
                  </div>

                  {/* Right Side */}
                  <div className="flex flex-col text-right">
                    <span className="text-[11px] font-medium text-gray-500 uppercase tracking-wider">
                      STARTING FROM
                    </span>
                    <span className="text-2xl sm:text-3xl font-bold text-[#00285C] leading-tight">
                      ₹{pkg.price.toLocaleString("en-IN")}
                    </span>
                    <span className="text-xs text-gray-500 font-normal">
                      per person
                    </span>
                  </div>
                </div>

                {/* Form Subtitle */}
                <p className="text-sm font-normal text-gray-700 mb-4">
                  Share your details and we&apos;ll contact you shortly.
                </p>

                {/* Form with Floating Outlined Labels */}
                <form onSubmit={handleQuoteSubmit} className="space-y-4">
                  {/* Row 1: Name & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {/* Name */}
                    <div className="relative">
                      <label className="absolute -top-2 left-3 px-1.5 bg-white text-[11px] font-medium text-gray-500 z-10 leading-none">
                        Name
                      </label>
                      <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border border-gray-250 focus-within:border-[#1877F2] bg-white transition-colors">
                        <User className="w-4 h-4 text-gray-400 shrink-0" />
                        <input
                          type="text"
                          required
                          placeholder="Enter your name"
                          value={sidebarForm.name}
                          onChange={(e) =>
                            setSidebarForm({ ...sidebarForm, name: e.target.value })
                          }
                          className="w-full text-xs sm:text-sm text-gray-800 outline-none bg-transparent placeholder:text-gray-400 font-normal"
                        />
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="relative">
                      <label className="absolute -top-2 left-3 px-1.5 bg-white text-[11px] font-medium text-gray-500 z-10 leading-none">
                        Phone
                      </label>
                      <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border border-gray-250 focus-within:border-[#1877F2] bg-white transition-colors">
                        <Phone className="w-4 h-4 text-gray-400 shrink-0" />
                        <input
                          type="tel"
                          required
                          placeholder="Enter your number"
                          value={sidebarForm.phone}
                          onChange={(e) =>
                            setSidebarForm({ ...sidebarForm, phone: e.target.value })
                          }
                          className="w-full text-xs sm:text-sm text-gray-800 outline-none bg-transparent placeholder:text-gray-400 font-normal"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Row 2: Email */}
                  <div className="relative">
                    <label className="absolute -top-2 left-3 px-1.5 bg-white text-[11px] font-medium text-gray-500 z-10 leading-none">
                      Email
                    </label>
                    <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border border-gray-250 focus-within:border-[#1877F2] bg-white transition-colors">
                      <Mail className="w-4 h-4 text-gray-400 shrink-0" />
                      <input
                        type="email"
                        required
                        placeholder="Enter your email"
                        value={sidebarForm.email}
                        onChange={(e) =>
                          setSidebarForm({ ...sidebarForm, email: e.target.value })
                        }
                        className="w-full text-xs sm:text-sm text-gray-800 outline-none bg-transparent placeholder:text-gray-400 font-normal"
                      />
                    </div>
                  </div>

                  {/* Row 3: Travel Date & No. of Travellers */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {/* Travel Date */}
                    <div className="relative">
                      <label className="absolute -top-2 left-3 px-1.5 bg-white text-[11px] font-medium text-gray-500 z-10 leading-none">
                        Travel Date
                      </label>
                      <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border border-gray-250 focus-within:border-[#1877F2] bg-white transition-colors">
                        <Calendar className="w-4 h-4 text-gray-400 shrink-0" />
                        <input
                          type="date"
                          value={sidebarForm.travelDate}
                          onChange={(e) =>
                            setSidebarForm({ ...sidebarForm, travelDate: e.target.value })
                          }
                          className="w-full text-xs sm:text-sm text-gray-800 outline-none bg-transparent font-normal"
                        />
                      </div>
                    </div>

                    {/* No. of Travellers */}
                    <div className="relative">
                      <label className="absolute -top-2 left-3 px-1.5 bg-white text-[11px] font-medium text-gray-500 z-10 leading-none">
                        No. of Travellers
                      </label>
                      <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border border-gray-250 focus-within:border-[#1877F2] bg-white transition-colors">
                        <Users className="w-4 h-4 text-gray-400 shrink-0" />
                        <input
                          type="number"
                          min="1"
                          max="50"
                          value={sidebarForm.travellers}
                          onChange={(e) =>
                            setSidebarForm({ ...sidebarForm, travellers: e.target.value })
                          }
                          className="w-full text-xs sm:text-sm text-gray-800 outline-none bg-transparent font-normal"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Row 4: Message (Optional) */}
                  <div className="relative">
                    <label className="absolute -top-2 left-3 px-1.5 bg-white text-[11px] font-medium text-gray-500 z-10 leading-none">
                      Message (Optional)
                    </label>
                    <div className="flex items-start gap-2.5 px-3.5 py-2.5 rounded-xl border border-gray-250 focus-within:border-[#1877F2] bg-white transition-colors">
                      <MessageSquare className="w-4 h-4 text-gray-400 shrink-0 mt-1" />
                      <textarea
                        rows={2}
                        placeholder="Tell us about any special requirements"
                        value={sidebarForm.message}
                        onChange={(e) =>
                          setSidebarForm({ ...sidebarForm, message: e.target.value })
                        }
                        className="w-full text-xs sm:text-sm text-gray-800 outline-none bg-transparent placeholder:text-gray-400 font-normal resize-none"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isQuoteSubmitted}
                    className="w-full py-3.5 sm:py-4 rounded-xl text-white font-medium text-sm sm:text-base shadow-md hover:brightness-110 active:scale-98 transition-all flex items-center justify-center gap-2.5 cursor-pointer"
                    style={{
                      background:
                        "linear-gradient(90deg, #18367C 0%, #1D449C 50%, #2546A5 100%)",
                    }}
                  >
                    <Send className="w-4 h-4 text-white" />
                    <span>
                      {isQuoteSubmitted ? "Submitting Request..." : "Get Best Quote"}
                    </span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── BOTTOM SECTION: RELEVANT PACKAGE (Inside .container) ─── */}
      {relatedPackages && relatedPackages.length > 0 && (
        <section className="bg-white py-14 sm:py-20 border-t border-gray-200">
          <div className="container">
            {/* Centered Header */}
            <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
                Relevant Package
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 mt-2 font-normal">
                A curated list of inspiration the most tour & travel based on different destinations.
              </p>
            </div>

            {/* 3-Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {relatedPackages.slice(0, 3).map((rPkg) => {
                const rOriginalPrice =
                  rPkg.originalPrice && rPkg.originalPrice > rPkg.price
                    ? rPkg.originalPrice
                    : Math.round(rPkg.price * 1.25);
                const rSavings = rOriginalPrice - rPkg.price;
                const rDiscount = Math.round((rSavings / rOriginalPrice) * 100);

                return (
                  <div
                    key={rPkg.id}
                    className="group bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                  >
                    {/* Photo with Yellow Discount Tag on Top Right */}
                    <div className="relative w-full aspect-[16/10] overflow-hidden bg-gray-100">
                      <Image
                        src={rPkg.image}
                        alt={rPkg.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 380px"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {/* Yellow Discount Tag */}
                      <div className="absolute top-3 right-3 z-10 px-2.5 py-1 rounded-md bg-[#FACC15] text-gray-950 text-[11px] font-semibold shadow-xs">
                        -{rDiscount}% OFF
                      </div>
                      <div className="absolute bottom-3 left-3 z-10 px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-xs text-white text-[11px] font-normal">
                        {rPkg.travelType}
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-5 flex flex-col flex-1 justify-between text-left">
                      <div>
                        <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-1.5">
                          <MapPin className="w-3.5 h-3.5 text-[#1877F2]" />
                          <span className="font-normal">
                            {rPkg.location}, {rPkg.destination}
                          </span>
                        </div>
                        <h3 className="text-base font-semibold text-gray-900 group-hover:text-[#1877F2] transition-colors line-clamp-2 leading-snug">
                          <Link href={`/tour-packages/${rPkg.id}`}>
                            {rPkg.title}
                          </Link>
                        </h3>
                        <p className="text-xs text-gray-500 mt-1 font-normal">
                          Duration: {rPkg.duration}
                        </p>
                      </div>

                      {/* Card Footer: Book Now Button (Left) & Starting From, Original & Sales Price (Right) */}
                      <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between gap-3">
                        {/* Book Now Button: Fully Rounded with White Text */}
                        <Link
                          href={`/tour-packages/${rPkg.id}`}
                          className="inline-flex items-center gap-1.5 px-4.5 sm:px-5 py-2.5 rounded-full bg-[#1877F2] hover:bg-[#00285C] text-white text-xs sm:text-[13px] font-semibold transition-all duration-200 shadow-xs hover:shadow-md active:scale-95 cursor-pointer shrink-0"
                          style={{ backgroundColor: "#1877F2", color: "#ffffff" }}
                        >
                          <span>Book Now</span>
                          <ArrowUpRight className="w-4 h-4 stroke-[2.2] text-white" />
                        </Link>

                        {/* Starting From & Prices Matching Screenshot format */}
                        <div className="flex flex-col text-right items-end">
                          <span className="text-[11px] sm:text-xs text-gray-500 font-normal leading-none mb-1">
                            Starting From
                          </span>
                          <div className="flex items-center justify-end gap-2 leading-none">
                            <span className="text-sm sm:text-base text-gray-400 line-through font-normal">
                              ₹{rOriginalPrice.toLocaleString("en-IN")}
                            </span>
                            <span className="text-xl sm:text-2xl font-bold text-[#110F0F] leading-tight">
                              ₹{rPkg.price.toLocaleString("en-IN")}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pagination Dots */}
            <div className="flex items-center justify-center gap-2 mt-8">
              <span className="w-6 h-2 rounded-full bg-[#1877F2]" />
              <span className="w-2 h-2 rounded-full bg-gray-300" />
              <span className="w-2 h-2 rounded-full bg-gray-300" />
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
