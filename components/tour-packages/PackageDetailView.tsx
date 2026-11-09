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
  ShieldCheck,
  Send,
  ArrowRight,
  ArrowUpRight,
  Lock,
  Download,
  User,
  Phone,
  Mail,
  MessageSquare,
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
  // Itinerary accordion state (Day 1 expanded by default)
  const [openDays, setOpenDays] = useState<number[]>([1]);
  const [isSaved, setIsSaved] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);

  // Sidebar Lead Form State (Matching Reference Screenshot media_1794201310034_07a0dcf4.png)
  const [sidebarForm, setSidebarForm] = useState({
    name: "",
    phone: "",
    email: "",
    travelDate: "",
    travellers: "1",
    message: "",
  });
  const [isQuoteSubmitted, setIsQuoteSubmitted] = useState(false);

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

  // FAQ accordion state (FAQ 0 expanded by default)
  const [openFaq, setOpenFaq] = useState<number | null>(0);

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

  const originalPrice = pkg.originalPrice || Math.round(pkg.price * 1.25);
  const savings = originalPrice - pkg.price;
  const discountPercent = Math.round((savings / originalPrice) * 100);
  const estimatedTotal = adults * pkg.price + children * Math.round(pkg.price * 0.6);

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

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2000);
    }
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setIsBookModalOpen(false);
      alert(
        `Thank you! Your booking inquiry for "${pkg.title}" has been received. Our travel specialist will contact you shortly.`
      );
    }, 1200);
  };

  const whatsappMessage = encodeURIComponent(
    `Hello KrikoTrip! I'm interested in booking the "${pkg.title}" (${pkg.duration}). Can you please share pricing and available dates for ${adults} Adults?`
  );

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
      {/* ─── TOP BREADCRUMB & TITLE META BAR ─── */}
      <div className="bg-white border-b border-gray-150 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-xs text-gray-500 mb-1.5 font-medium">
              <Link href="/" className="hover:text-[#1877F2] transition-colors">
                Home
              </Link>
              <span>/</span>
              <Link
                href="/tour-packages"
                className="hover:text-[#1877F2] transition-colors"
              >
                Tour Packages
              </Link>
              <span>/</span>
              <span className="text-gray-900 font-semibold truncate max-w-xs sm:max-w-md">
                {pkg.title}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#111827] tracking-tight">
              {pkg.title}
            </h1>
          </div>

          {/* Quick rating & actions */}
          <div className="flex items-center gap-4 text-xs sm:text-sm shrink-0">
            <div className="flex items-center gap-1.5 bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-200/60">
              <Star className="w-4 h-4 fill-[#F59E0B] text-[#F59E0B]" />
              <span className="font-bold text-gray-950">{pkg.rating}</span>
              <span className="text-gray-500">({pkg.reviewsCount} reviews)</span>
            </div>
            <button
              type="button"
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 text-gray-600 hover:text-[#1877F2] font-medium transition-colors cursor-pointer"
            >
              <Share2 className="w-4 h-4 text-gray-500" />
              <span>{copiedShare ? "Copied!" : "Share"}</span>
            </button>
            <button
              type="button"
              onClick={() => setIsSaved(!isSaved)}
              className="inline-flex items-center gap-1.5 text-gray-600 hover:text-rose-500 font-medium transition-colors cursor-pointer"
            >
              <Heart
                className={`w-4 h-4 ${
                  isSaved ? "fill-rose-500 text-rose-500" : "text-gray-500"
                }`}
              />
              <span>{isSaved ? "Saved" : "Save"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* ─── 1. PHOTO GALLERY COLLAGE (Exact Match: Screenshot 1) ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4">
          {/* Left Column: 1 Tall Vertical Photo (Dubai Frame style) */}
          <div className="lg:col-span-6 relative aspect-[4/3] sm:aspect-[16/11] lg:h-[480px] rounded-2xl overflow-hidden bg-gray-100 shadow-2xs group">
            <Image
              src={galleryImages[0]}
              alt={`${pkg.title} - Main Feature`}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 650px"
              className="object-cover group-hover:scale-102 transition-transform duration-500"
            />
          </div>

          {/* Right Column: 3 Photos (1 Wide Top, 2 Half-width Bottom) */}
          <div className="lg:col-span-6 flex flex-col gap-3 sm:gap-4 lg:h-[480px]">
            {/* Top Wide Photo (Burj Khalifa style) */}
            <div className="relative w-full h-[200px] sm:h-[228px] rounded-2xl overflow-hidden bg-gray-100 shadow-2xs group">
              <Image
                src={galleryImages[1]}
                alt={`${pkg.title} - Landmark`}
                fill
                sizes="(max-width: 1024px) 100vw, 650px"
                className="object-cover group-hover:scale-102 transition-transform duration-500"
              />
            </div>

            {/* Bottom 2 Photos Side-by-Side (Desert dune & Sunset Cruise style) */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 flex-1">
              <div className="relative w-full h-full min-h-[140px] rounded-2xl overflow-hidden bg-gray-100 shadow-2xs group">
                <Image
                  src={galleryImages[2]}
                  alt={`${pkg.title} - Experience 1`}
                  fill
                  sizes="(max-width: 1024px) 50vw, 320px"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="relative w-full h-full min-h-[140px] rounded-2xl overflow-hidden bg-gray-100 shadow-2xs group">
                <Image
                  src={galleryImages[3]}
                  alt={`${pkg.title} - Experience 2`}
                  fill
                  sizes="(max-width: 1024px) 50vw, 320px"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── MAIN 2-COLUMN SECTION (Left Content, Right Sticky Sidebar) ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* ════ LEFT COLUMN: MAIN CONTENT (lg:col-span-8) ════ */}
          <div className="lg:col-span-8 space-y-10 sm:space-y-12">
            {/* ─── 2. ABOUT TOUR PACKAGE (Exact Match: Screenshot 2) ─── */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111827] mb-3 tracking-tight">
                About Tour Package
              </h2>
              <p className="text-sm sm:text-[15px] text-gray-600 leading-relaxed font-normal mb-6">
                {pkg.overview || pkg.description}
              </p>

              {/* 9-Item Specs Box in Clean Rounded Border Card (Matches Screenshot 2) */}
              <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-2xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                  {/* Row 1, Col 1: Accomodation */}
                  <div className="flex items-center gap-3.5">
                    <Building className="w-6 h-6 text-gray-500 shrink-0 stroke-[1.8]" />
                    <div>
                      <span className="block text-xs sm:text-[13px] text-gray-500 font-medium">
                        Accomodation
                      </span>
                      <span className="text-sm sm:text-[15px] font-bold text-gray-900">
                        {pkg.hotelStars || 5} Star Hotel
                      </span>
                    </div>
                  </div>

                  {/* Row 1, Col 2: Meals */}
                  <div className="flex items-center gap-3.5">
                    <Utensils className="w-6 h-6 text-gray-500 shrink-0 stroke-[1.8]" />
                    <div>
                      <span className="block text-xs sm:text-[13px] text-gray-500 font-medium">
                        Meals
                      </span>
                      <span className="text-sm sm:text-[15px] font-bold text-gray-900">
                        Breakfast & Dinner
                      </span>
                    </div>
                  </div>

                  {/* Row 1, Col 3: Transportation */}
                  <div className="flex items-center gap-3.5">
                    <Car className="w-6 h-6 text-gray-500 shrink-0 stroke-[1.8]" />
                    <div>
                      <span className="block text-xs sm:text-[13px] text-gray-500 font-medium">
                        Transportation
                      </span>
                      <span className="text-sm sm:text-[15px] font-bold text-gray-900">
                        Taxi,Car
                      </span>
                    </div>
                  </div>

                  {/* Row 2, Col 1: Group Size */}
                  <div className="flex items-center gap-3.5">
                    <Users className="w-6 h-6 text-gray-500 shrink-0 stroke-[1.8]" />
                    <div>
                      <span className="block text-xs sm:text-[13px] text-gray-500 font-medium">
                        Group Size
                      </span>
                      <span className="text-sm sm:text-[15px] font-bold text-gray-900">
                        10-20
                      </span>
                    </div>
                  </div>

                  {/* Row 2, Col 2: Language */}
                  <div className="flex items-center gap-3.5">
                    <Languages className="w-6 h-6 text-gray-500 shrink-0 stroke-[1.8]" />
                    <div>
                      <span className="block text-xs sm:text-[13px] text-gray-500 font-medium">
                        Language
                      </span>
                      <span className="text-sm sm:text-[15px] font-bold text-gray-900">
                        English, Spanish
                      </span>
                    </div>
                  </div>

                  {/* Row 2, Col 3: Animal */}
                  <div className="flex items-center gap-3.5">
                    <PawPrint className="w-6 h-6 text-gray-500 shrink-0 stroke-[1.8]" />
                    <div>
                      <span className="block text-xs sm:text-[13px] text-gray-500 font-medium">
                        Animal
                      </span>
                      <span className="text-sm sm:text-[15px] font-bold text-gray-900">
                        Cat, Pet only
                      </span>
                    </div>
                  </div>

                  {/* Row 3, Col 1: Age Range */}
                  <div className="flex items-center gap-3.5">
                    <Calendar className="w-6 h-6 text-gray-500 shrink-0 stroke-[1.8]" />
                    <div>
                      <span className="block text-xs sm:text-[13px] text-gray-500 font-medium">
                        Age Range
                      </span>
                      <span className="text-sm sm:text-[15px] font-bold text-gray-900">
                        18-45 (Year)
                      </span>
                    </div>
                  </div>

                  {/* Row 3, Col 2: Season */}
                  <div className="flex items-center gap-3.5">
                    <Leaf className="w-6 h-6 text-gray-500 shrink-0 stroke-[1.8]" />
                    <div>
                      <span className="block text-xs sm:text-[13px] text-gray-500 font-medium">
                        Season
                      </span>
                      <span className="text-sm sm:text-[15px] font-bold text-gray-900">
                        Winter Season
                      </span>
                    </div>
                  </div>

                  {/* Row 3, Col 3: Category */}
                  <div className="flex items-center gap-3.5">
                    <Tag className="w-6 h-6 text-gray-500 shrink-0 stroke-[1.8]" />
                    <div>
                      <span className="block text-xs sm:text-[13px] text-gray-500 font-medium">
                        Category
                      </span>
                      <span className="text-sm sm:text-[15px] font-bold text-gray-900">
                        Adventure
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ─── 3. TOUR ITINERARY (Exact Match: Screenshot 3) ─── */}
            <div>
              {/* Header with Title & Expand All + */}
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111827] tracking-tight">
                  Tour Itinerary
                </h2>
                <button
                  type="button"
                  onClick={expandAllDays}
                  className="text-sm font-semibold text-[#1877F2] hover:underline cursor-pointer"
                >
                  Expand All +
                </button>
              </div>

              {/* Sub-header with Blue Navigation Icon & Departure Time */}
              <div className="flex items-center gap-2.5 mb-5">
                <div className="w-7 h-7 rounded-full bg-[#1877F2] text-white flex items-center justify-center shrink-0 shadow-xs">
                  <Navigation className="w-3.5 h-3.5 fill-white text-white" />
                </div>
                <div className="text-sm sm:text-base font-bold text-gray-900">
                  <span>{pkg.location} </span>
                  <span className="font-normal text-gray-500">
                    ( Deaprture: 8:00 am - 8:30am )
                  </span>
                </div>
              </div>

              {/* Itinerary Card with Dividers & Pin Icons (Matches Screenshot 3) */}
              <div className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-7 shadow-2xs divide-y divide-gray-150">
                {pkg.itinerary.map((dayItem) => {
                  const isOpen = openDays.includes(dayItem.day);
                  const dayPadded =
                    dayItem.day < 10 ? `0${dayItem.day}` : dayItem.day;

                  return (
                    <div key={dayItem.day} className="py-4 first:pt-1 last:pb-1">
                      <button
                        type="button"
                        onClick={() => toggleDay(dayItem.day)}
                        className="w-full flex items-center justify-between text-left cursor-pointer group"
                      >
                        <div className="flex items-center gap-3 pr-4">
                          <MapPin className="w-4 h-4 text-gray-900 shrink-0" strokeWidth={2.5} />
                          <span className="font-bold text-gray-950 text-sm sm:text-base shrink-0">
                            Day-{dayPadded}
                          </span>
                          <span className="text-sm sm:text-base font-medium text-gray-800 group-hover:text-[#1877F2] transition-colors line-clamp-1">
                            {dayItem.title}
                          </span>
                        </div>
                        <ChevronDown
                          className={`w-4 h-4 text-gray-600 transition-transform duration-200 shrink-0 ${
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
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-50 text-amber-800 border border-amber-200 text-xs font-medium">
                                <Utensils className="w-3 h-3 text-amber-600" />
                                <span>{dayItem.meals}</span>
                              </span>
                            )}
                            {dayItem.stay && (
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-50 text-[#1877F2] border border-blue-200 text-xs font-medium">
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

            {/* ─── 4. PACKAGE FEATURES LIST (Exact Match: Screenshot 4) ─── */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111827] mb-6 tracking-tight">
                Package Features List
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Include Features Column (Blue Circular Checkmarks) */}
                <div>
                  <h3 className="text-lg font-bold text-gray-950 mb-4">
                    Include Features
                  </h3>
                  <ul className="space-y-3.5">
                    {pkg.inclusions.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <CheckCircle2
                          className="w-5 h-5 text-[#1877F2] shrink-0 mt-0.5"
                          strokeWidth={2}
                        />
                        <span className="text-xs sm:text-sm text-gray-700 leading-normal">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Exclude Features Column (Red Circular Crossmarks) */}
                <div>
                  <h3 className="text-lg font-bold text-gray-950 mb-4">
                    Exclude Features
                  </h3>
                  <ul className="space-y-3.5">
                    {pkg.exclusions.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <XCircle
                          className="w-5 h-5 text-[#EF4444] shrink-0 mt-0.5"
                          strokeWidth={2}
                        />
                        <span className="text-xs sm:text-sm text-gray-700 leading-normal">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* ─── 5. ADDITIONAL INFO (Exact Match: Screenshot 5 Top) ─── */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111827] mb-4 tracking-tight">
                Additional Info
              </h2>
              <div className="space-y-3">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2
                    className="w-5 h-5 text-[#1877F2] shrink-0 mt-0.5"
                    strokeWidth={2}
                  />
                  <span className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                    <strong className="text-gray-900 font-bold">
                      Free Cancellation
                    </strong>{" "}
                    – Some tours offer free cancellation up to a certain period (e.g.,
                    24–48 hours before departure).
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2
                    className="w-5 h-5 text-[#1877F2] shrink-0 mt-0.5"
                    strokeWidth={2}
                  />
                  <span className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                    <strong className="text-gray-900 font-bold">
                      Health & Safety Guidelines
                    </strong>{" "}
                    – COVID-19 regulations, vaccinations, or travel restrictions.
                  </span>
                </div>
              </div>
            </div>

            {/* ─── 6. FREQUENTLY ASKED & QUESTION (Exact Match: Screenshot 5 Bottom) ─── */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111827] mb-4 tracking-tight">
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
                        <span className="text-sm sm:text-[15px] font-bold text-gray-900 pr-4">
                          {faq.q}
                        </span>
                        <ChevronDown
                          className={`w-4 h-4 text-gray-600 transition-transform duration-200 shrink-0 ${
                            isOpen ? "rotate-180 text-[#1877F2]" : ""
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="p-4 bg-white border border-gray-150 border-t-0 rounded-b-xl text-xs sm:text-sm text-gray-600 leading-relaxed animate-in fade-in">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ════ RIGHT COLUMN: SIDEBAR FORM (Exact Match: media_1794201310034_07a0dcf4.png) ════ */}
          <div className="lg:col-span-4 lg:sticky lg:top-24">
            <div className="bg-white rounded-3xl border border-gray-200/90 shadow-md p-5 sm:p-6 relative">
              {/* Top Row: Download Brochure & Share */}
              <div className="flex items-center gap-3 mb-5">
                <button
                  type="button"
                  onClick={handleDownloadBrochure}
                  className="flex-1 py-3 px-4 rounded-xl border border-gray-200 hover:border-[#1877F2] bg-white hover:bg-blue-50/40 text-[#00285C] font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-2xs transition-colors cursor-pointer"
                >
                  <Download className="w-4 h-4 text-[#1877F2]" />
                  <span>Download Brochure</span>
                </button>
                <button
                  type="button"
                  onClick={handleShare}
                  aria-label="Share package"
                  className="w-11 h-11 rounded-xl border border-gray-200 hover:border-gray-300 bg-white hover:bg-gray-50 flex items-center justify-center text-gray-700 shadow-2xs transition-colors cursor-pointer shrink-0"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>

              {/* Deal & Price Box */}
              <div className="rounded-2xl bg-[#F0F5FF] p-4.5 mb-5 flex items-center justify-between border border-blue-100/70">
                {/* Left Side */}
                <div className="flex flex-col items-start">
                  <span className="inline-block px-2 py-0.5 rounded-md bg-[#00285C] text-white text-[10px] font-extrabold uppercase tracking-wider mb-1">
                    DEAL {pkg.id.slice(0, 8).toUpperCase()}
                  </span>
                  <span className="block text-xs font-bold text-[#1877F2] uppercase tracking-wider mb-1">
                    BEST VALUE DEAL
                  </span>
                  <span className="flex items-center gap-1.5 text-xs font-bold text-[#00285C]">
                    <Clock className="w-3.5 h-3.5 text-[#1877F2]" />
                    <span>{pkg.duration}</span>
                  </span>
                </div>

                {/* Right Side */}
                <div className="flex flex-col text-right">
                  <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                    STARTING FROM
                  </span>
                  <span className="text-2xl sm:text-3xl font-extrabold text-[#00285C] leading-tight">
                    ₹{pkg.price.toLocaleString("en-IN")}
                  </span>
                  <span className="text-xs text-gray-500 font-medium">
                    per person
                  </span>
                </div>
              </div>

              {/* Form Subtitle */}
              <p className="text-sm font-semibold text-gray-800 mb-4">
                Share your details and we&apos;ll contact you shortly.
              </p>

              {/* Form with Floating Outlined Labels */}
              <form onSubmit={handleQuoteSubmit} className="space-y-4">
                {/* Row 1: Name & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {/* Name */}
                  <div className="relative">
                    <label className="absolute -top-2 left-3 px-1.5 bg-white text-[11px] font-semibold text-gray-500 z-10 leading-none">
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
                        className="w-full text-xs sm:text-sm text-gray-800 outline-none bg-transparent placeholder:text-gray-400 font-medium"
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="relative">
                    <label className="absolute -top-2 left-3 px-1.5 bg-white text-[11px] font-semibold text-gray-500 z-10 leading-none">
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
                        className="w-full text-xs sm:text-sm text-gray-800 outline-none bg-transparent placeholder:text-gray-400 font-medium"
                      />
                    </div>
                  </div>
                </div>

                {/* Row 2: Email */}
                <div className="relative">
                  <label className="absolute -top-2 left-3 px-1.5 bg-white text-[11px] font-semibold text-gray-500 z-10 leading-none">
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
                      className="w-full text-xs sm:text-sm text-gray-800 outline-none bg-transparent placeholder:text-gray-400 font-medium"
                    />
                  </div>
                </div>

                {/* Row 3: Travel Date & No. of Travellers */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {/* Travel Date */}
                  <div className="relative">
                    <label className="absolute -top-2 left-3 px-1.5 bg-white text-[11px] font-semibold text-gray-500 z-10 leading-none">
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
                        className="w-full text-xs sm:text-sm text-gray-800 outline-none bg-transparent font-medium"
                      />
                    </div>
                  </div>

                  {/* No. of Travellers */}
                  <div className="relative">
                    <label className="absolute -top-2 left-3 px-1.5 bg-white text-[11px] font-semibold text-gray-500 z-10 leading-none">
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
                        className="w-full text-xs sm:text-sm text-gray-800 outline-none bg-transparent font-medium"
                      />
                    </div>
                  </div>
                </div>

                {/* Row 4: Message (Optional) */}
                <div className="relative">
                  <label className="absolute -top-2 left-3 px-1.5 bg-white text-[11px] font-semibold text-gray-500 z-10 leading-none">
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
                      className="w-full text-xs sm:text-sm text-gray-800 outline-none bg-transparent placeholder:text-gray-400 font-medium resize-none"
                    />
                  </div>
                </div>

                {/* Submit Button (Matches Gradient & Icon from Screenshot) */}
                <button
                  type="submit"
                  disabled={isQuoteSubmitted}
                  className="w-full py-3.5 sm:py-4 rounded-xl text-white font-bold text-sm sm:text-base shadow-md hover:brightness-110 active:scale-98 transition-all flex items-center justify-center gap-2.5 cursor-pointer"
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
      </section>

      {/* ─── BOTTOM SECTION: RELEVANT PACKAGE (With Guaranteed Green Book Now Button & Both Prices) ─── */}
      {relatedPackages && relatedPackages.length > 0 && (
        <section className="bg-white py-14 sm:py-20 border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Centered Header */}
            <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111827] tracking-tight">
                Relevant Package
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 mt-2">
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
                      <div className="absolute top-3 right-3 z-10 px-2.5 py-1 rounded-md bg-[#FACC15] text-gray-950 text-[11px] font-bold shadow-xs">
                        -{rDiscount}% OFF
                      </div>
                      <div className="absolute bottom-3 left-3 z-10 px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-xs text-white text-[11px] font-medium">
                        {rPkg.travelType}
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-5 flex flex-col flex-1 justify-between text-left">
                      <div>
                        <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-1.5">
                          <MapPin className="w-3.5 h-3.5 text-[#1877F2]" />
                          <span>
                            {rPkg.location}, {rPkg.destination}
                          </span>
                        </div>
                        <h3 className="text-base font-bold text-gray-900 group-hover:text-[#1877F2] transition-colors line-clamp-2 leading-snug">
                          <Link href={`/tour-packages/${rPkg.id}`}>
                            {rPkg.title}
                          </Link>
                        </h3>
                        <p className="text-xs text-gray-500 mt-1">
                          Duration: {rPkg.duration}
                        </p>
                      </div>

                      {/* Card Footer: Book Now Button (Left) & Starting From, Original & Sales Price (Right) */}
                      <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between gap-3">
                        {/* Book Now Button with Dark Green Background & Cream Text (#285340 & #F6F3BC) */}
                        <Link
                          href={`/tour-packages/${rPkg.id}`}
                          className="inline-flex items-center gap-1.5 px-4.5 sm:px-5 py-2.5 rounded-xl text-xs sm:text-[13px] font-bold transition-all duration-200 shadow-xs hover:shadow-md hover:brightness-110 active:scale-95 cursor-pointer shrink-0"
                          style={{ backgroundColor: "#285340", color: "#F6F3BC" }}
                        >
                          <span>Book Now</span>
                          <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                        </Link>

                        {/* Starting From, Original Strikethrough Price & Sales Price */}
                        <div className="flex flex-col text-right items-end">
                          <span className="text-[11px] text-gray-500 font-medium leading-none mb-0.5">
                            Starting From
                          </span>
                          {/* Original Strikethrough Price & Savings */}
                          <div className="flex items-center justify-end gap-1.5 leading-none mb-1">
                            <span className="text-xs text-gray-400 line-through font-medium">
                              ₹{rOriginalPrice.toLocaleString("en-IN")}
                            </span>
                            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-full border border-emerald-200">
                              Save ₹{rSavings.toLocaleString("en-IN")}
                            </span>
                          </div>
                          {/* Sales Price */}
                          <div className="flex items-baseline justify-end gap-1">
                            <span className="text-lg sm:text-[21px] font-extrabold text-[#110F0F] leading-tight">
                              ₹{rPkg.price.toLocaleString("en-IN")}
                            </span>
                            <span className="text-[11px] text-gray-400 font-medium">/ person</span>
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

      {/* ─── BOOKING INQUIRY MODAL ─── */}
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

            <h3 className="text-xl font-bold text-[#111827] mb-1">
              Book This Tour
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
                  className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs sm:text-sm outline-none focus:border-[#1877F2]"
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
                    className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs sm:text-sm outline-none focus:border-[#1877F2]"
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
                    className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs sm:text-sm outline-none focus:border-[#1877F2]"
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
                  className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs sm:text-sm outline-none focus:border-[#1877F2] resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitted}
                  className="w-full py-3 rounded-full bg-[#1877F2] hover:bg-[#00285C] text-white text-xs sm:text-sm font-bold shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  {isSubmitted ? (
                    <span>Processing Reservation...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
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
