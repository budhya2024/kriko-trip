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
  Headphones,
  Globe2,
  Ticket,
  CheckCircle2,
  XCircle,
  ChevronDown,
  Sparkles,
  Share2,
  Heart,
  Download,
  Calendar,
  Utensils,
  Bed,
  Car,
  ShieldCheck,
  Send,
  ArrowRight,
  Info,
  Check,
  FileText,
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

  // Review form state
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewName, setReviewName] = useState("");
  const [reviewEmail, setReviewEmail] = useState("");
  const [reviewComment, setReviewComment] = useState("");
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  const originalPrice = pkg.originalPrice || Math.round(pkg.price * 1.25);
  const savings = originalPrice - pkg.price;
  const discountPercent = Math.round((savings / originalPrice) * 100);
  const estimatedTotal = adults * pkg.price + children * Math.round(pkg.price * 0.6);

  const images = pkg.images && pkg.images.length >= 3 ? pkg.images : [
    pkg.image,
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=800&q=80",
  ];

  const galleryCaptions = [
    `${pkg.location} Heritage & Culture`,
    "Scenic Coastal & Nature Views",
    "Historic Landmarks & Sightseeing",
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

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setIsBookModalOpen(false);
      alert(`Thank you! Your booking inquiry for "${pkg.title}" has been received. Our travel specialist will reach out shortly.`);
    }, 1200);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setReviewSubmitted(true);
    setTimeout(() => {
      setReviewSubmitted(false);
      setReviewName("");
      setReviewEmail("");
      setReviewComment("");
      alert("Thank you for your review! It will be published after verification.");
    }, 1000);
  };

  const whatsappMessage = encodeURIComponent(
    `Hello KrikoTrip! I'm interested in the "${pkg.title}" (${pkg.duration}). Can you please share pricing and available dates for ${adults} Adults?`
  );

  const faqs = [
    {
      q: "What is included in the tour package price?",
      a: "Our tour package includes verified accommodation, daily gourmet breakfast, all inter-island ferries or private transfers, airport pick-up/drop-off, monument entry tickets, and 24/7 on-ground assistance.",
    },
    {
      q: "What documents or government IDs are required?",
      a: "All Indian citizens must carry a valid photo ID (Aadhaar Card, Passport, Voter ID, or Driving License). Foreign nationals require an Indian Visa and valid Passport. Certain restricted areas require permits arranged by our ground team.",
    },
    {
      q: "What is the cancellation and refund policy?",
      a: "Free cancellation is available up to 7 days prior to departure for a full refund minus minimal payment gateway charges. Cancellations within 3-6 days incur a 25% charge.",
    },
    {
      q: "Can you customize or extend the itinerary?",
      a: "Yes! All KrikoTrip packages can be fully customized. You can add extra days, upgrade to ocean-view luxury suites, book private car charters, or add romantic beach candlelight dinners.",
    },
  ];

  return (
    <div className="w-full bg-[#FAFAFA] font-sans antialiased text-gray-800">
      {/* ─── 1. HERO HEADER BANNER (Matches Screenshot Top Full-Bleed Banner) ─── */}
      <section className="relative w-full h-[360px] sm:h-[420px] lg:h-[480px] overflow-hidden flex items-center justify-center text-center">
        {/* Background Image */}
        <Image
          src={pkg.image}
          alt={pkg.title}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/45 to-black/75" />

        {/* Hero Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
          {/* Top Pill Offer Badge */}
          <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs sm:text-sm font-semibold mb-3 sm:mb-4 border border-white/25">
            <span>Enjoy up to {discountPercent}% Off per person</span>
          </div>

          {/* Centered Large White Title */}
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight sm:leading-tight mb-3 sm:mb-4 drop-shadow-md">
            {pkg.title}
          </h1>

          {/* Location Line */}
          <div className="inline-flex items-center gap-1.5 text-white/90 text-sm sm:text-base font-medium">
            <MapPin className="w-4 h-4 text-[#03ADFF] shrink-0" />
            <span>
              {pkg.location}, {pkg.destination}
            </span>
          </div>
        </div>
      </section>

      {/* ─── 2. SUB-NAV / META BAR (Directly below Hero) ─── */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 sm:py-4 flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
          {/* Left: Star rating & Category */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span className="font-bold text-gray-950">{pkg.rating}</span>
              <span className="text-gray-500 font-medium">
                ({pkg.reviewsCount} reviews)
              </span>
            </div>
            <span className="text-gray-300">|</span>
            <span className="font-semibold text-gray-700">
              {pkg.travelType} & Theme Tours
            </span>
          </div>

          {/* Right: Share & Wishlist */}
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 text-gray-600 hover:text-[#1877F2] font-medium transition-colors cursor-pointer"
            >
              <Share2 className="w-4 h-4" />
              <span>{copiedShare ? "Link Copied!" : "Share"}</span>
            </button>
            <button
              type="button"
              onClick={() => setIsSaved(!isSaved)}
              className="inline-flex items-center gap-1.5 text-gray-600 hover:text-rose-500 font-medium transition-colors cursor-pointer"
            >
              <Heart
                className={`w-4 h-4 ${
                  isSaved ? "fill-rose-500 text-rose-500" : ""
                }`}
              />
              <span>{isSaved ? "Saved" : "Save to Wishlist"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* ─── 3. MAIN 2-COLUMN SECTION (Left Content, Right Sticky Sidebar) ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* ════ LEFT COLUMN: MAIN CONTENT (lg:col-span-8) ════ */}
          <div className="lg:col-span-8 space-y-10">
            {/* Section A: About This Tour */}
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#00285C] mb-3">
                About This Tour
              </h2>
              <p className="text-sm sm:text-[15px] text-gray-600 leading-relaxed">
                {pkg.overview || pkg.description}
              </p>

              {/* 6-Item Icon Specs Grid (Matches screenshot 3x2 grid) */}
              <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3.5 sm:gap-4">
                {/* 1. Duration */}
                <div className="p-4 rounded-xl border border-gray-200 bg-white flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 text-[#1877F2] flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-[11px] text-gray-500 uppercase font-semibold">
                      Duration
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-gray-900">
                      {pkg.duration}
                    </span>
                  </div>
                </div>

                {/* 2. Tour Type */}
                <div className="p-4 rounded-xl border border-gray-200 bg-white flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 text-[#1877F2] flex items-center justify-center shrink-0">
                    <Compass className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-[11px] text-gray-500 uppercase font-semibold">
                      Tour Type
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-gray-900">
                      {pkg.travelType} Tour
                    </span>
                  </div>
                </div>

                {/* 3. Group Size */}
                <div className="p-4 rounded-xl border border-gray-200 bg-white flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 text-[#1877F2] flex items-center justify-center shrink-0">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-[11px] text-gray-500 uppercase font-semibold">
                      Group Size
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-gray-900">
                      Max 12 People
                    </span>
                  </div>
                </div>

                {/* 4. Live Guide */}
                <div className="p-4 rounded-xl border border-gray-200 bg-white flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 text-[#1877F2] flex items-center justify-center shrink-0">
                    <Headphones className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-[11px] text-gray-500 uppercase font-semibold">
                      Live Guide
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-gray-900">
                      English & Local
                    </span>
                  </div>
                </div>

                {/* 5. Language */}
                <div className="p-4 rounded-xl border border-gray-200 bg-white flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 text-[#1877F2] flex items-center justify-center shrink-0">
                    <Globe2 className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-[11px] text-gray-500 uppercase font-semibold">
                      Languages
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-gray-900">
                      English, Hindi
                    </span>
                  </div>
                </div>

                {/* 6. Transfers & Entry */}
                <div className="p-4 rounded-xl border border-gray-200 bg-white flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 text-[#1877F2] flex items-center justify-center shrink-0">
                    <Ticket className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-[11px] text-gray-500 uppercase font-semibold">
                      Entry & Permits
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-gray-900">
                      Included
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Section B: 3 Side-by-Side Gallery Thumbnails with Captions (Matches Screenshot) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {images.slice(0, 3).map((img, idx) => (
                <div key={idx} className="group">
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-gray-100 border border-gray-200 shadow-2xs">
                    <Image
                      src={img}
                      alt={galleryCaptions[idx] || `${pkg.title} photo ${idx + 1}`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 260px"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <p className="mt-2 text-xs sm:text-sm font-bold text-gray-800 text-center">
                    {galleryCaptions[idx]}
                  </p>
                </div>
              ))}
            </div>

            {/* Section C: Highlights of Tour (Matches Screenshot) */}
            <div className="pt-2">
              <h2 className="text-xl sm:text-2xl font-bold text-[#00285C] mb-4">
                Highlights of Tour
              </h2>
              <ul className="space-y-3">
                {pkg.highlights.map((highlight, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-blue-50 text-[#1877F2] flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3 stroke-[2.5]" />
                    </div>
                    <span className="text-sm text-gray-700 leading-normal">
                      {highlight}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Section D: Tour Itinerary (Matches Screenshot Accordion with Numbered Badges) */}
            <div className="pt-2">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl sm:text-2xl font-bold text-[#00285C]">
                  Tour Itinerary
                </h2>
                <div className="flex items-center gap-2 text-xs">
                  <button
                    type="button"
                    onClick={expandAllDays}
                    className="font-semibold text-[#1877F2] hover:underline cursor-pointer"
                  >
                    Expand All
                  </button>
                  <span className="text-gray-300">|</span>
                  <button
                    type="button"
                    onClick={collapseAllDays}
                    className="font-semibold text-gray-500 hover:text-gray-700 cursor-pointer"
                  >
                    Collapse All
                  </button>
                </div>
              </div>

              {/* Itinerary Accordion List */}
              <div className="space-y-3">
                {pkg.itinerary.map((dayItem) => {
                  const isOpen = openDays.includes(dayItem.day);
                  return (
                    <div
                      key={dayItem.day}
                      className="rounded-xl border border-gray-200 bg-white overflow-hidden transition-all duration-200"
                    >
                      {/* Accordion Trigger */}
                      <button
                        type="button"
                        onClick={() => toggleDay(dayItem.day)}
                        className={`w-full p-4 flex items-center justify-between text-left cursor-pointer transition-colors ${
                          isOpen ? "bg-[#F0F5FF]/70" : "hover:bg-gray-50"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-7 h-7 rounded-full bg-[#1877F2] text-white text-xs font-bold flex items-center justify-center shrink-0">
                            {dayItem.day}
                          </span>
                          <span className="text-sm sm:text-base font-bold text-[#00285C]">
                            Day {dayItem.day}: {dayItem.title}
                          </span>
                        </div>
                        <ChevronDown
                          className={`w-4 h-4 text-gray-500 transition-transform duration-200 shrink-0 ml-2 ${
                            isOpen ? "rotate-180 text-[#1877F2]" : ""
                          }`}
                        />
                      </button>

                      {/* Accordion Content */}
                      {isOpen && (
                        <div className="p-4 sm:p-5 bg-white border-t border-gray-100 text-xs sm:text-sm text-gray-600 space-y-3 animate-in fade-in">
                          <p className="leading-relaxed font-normal">
                            {dayItem.description}
                          </p>

                          {/* Day Details / Badges */}
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

            {/* Section E: Package Included on Map (Matches Screenshot) */}
            <div className="pt-2">
              <h2 className="text-xl sm:text-2xl font-bold text-[#00285C] mb-3">
                Package Included on Map
              </h2>
              <div className="w-full h-[320px] sm:h-[380px] rounded-xl overflow-hidden border border-gray-200 bg-gray-100 shadow-2xs relative">
                <iframe
                  title={`Map showing ${pkg.location}`}
                  src={`https://www.google.com/maps?q=${encodeURIComponent(
                    pkg.location + ", " + pkg.destination
                  )}&output=embed`}
                  className="w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            {/* Section F: Include and Exclude (Matches Screenshot 2 Columns) */}
            <div className="pt-2">
              <h2 className="text-xl sm:text-2xl font-bold text-[#00285C] mb-4">
                Include and Exclude
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-white p-6 rounded-xl border border-gray-200">
                {/* Included Column */}
                <div>
                  <h3 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wider text-emerald-700 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Included</span>
                  </h3>
                  <ul className="space-y-2.5">
                    {pkg.inclusions.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-700"
                      >
                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5 stroke-[2.5]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Excluded Column */}
                <div>
                  <h3 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wider text-rose-700 flex items-center gap-1.5">
                    <XCircle className="w-4 h-4 text-rose-500" />
                    <span>Excluded</span>
                  </h3>
                  <ul className="space-y-2.5">
                    {pkg.exclusions.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-500"
                      >
                        <span className="w-4 h-4 text-gray-400 font-bold text-center shrink-0 leading-none mt-0.5">
                          &times;
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Section G: Download Tour Brochure Banner (Matches Screenshot) */}
            <div className="relative rounded-xl overflow-hidden bg-gradient-to-r from-[#00285C] to-[#0A3D7E] text-white p-6 sm:p-7 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
              <div className="flex items-center gap-4 text-center sm:text-left">
                <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center shrink-0 border border-white/20">
                  <FileText className="w-6 h-6 text-[#03ADFF]" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold">
                    Download Tour Brochure
                  </h3>
                  <p className="text-xs sm:text-sm text-white/80">
                    Get detailed day-by-day itinerary, hotel details, and travel guidelines in PDF.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleDownloadBrochure}
                className="px-5 py-2.5 rounded-full bg-white hover:bg-gray-100 text-[#00285C] font-bold text-xs sm:text-sm transition-all shadow-sm cursor-pointer whitespace-nowrap inline-flex items-center gap-2 shrink-0"
              >
                <Download className="w-4 h-4 text-[#1877F2]" />
                <span>Download Brochure</span>
              </button>
            </div>

            {/* Section H: Tour Specifics / Important Information (Matches Screenshot) */}
            <div className="pt-2">
              <h2 className="text-xl sm:text-2xl font-bold text-[#00285C] mb-3">
                Tour Specifics
              </h2>
              <div className="bg-white p-5 sm:p-6 rounded-xl border border-gray-200 space-y-2.5 text-xs sm:text-sm text-gray-600">
                <p className="flex items-start gap-2">
                  <Info className="w-4 h-4 text-[#1877F2] shrink-0 mt-0.5" />
                  <span>
                    Valid government-issued photo ID (Aadhaar Card, Passport, or Voter ID) is mandatory for hotel check-ins and ferry boarding.
                  </span>
                </p>
                <p className="flex items-start gap-2">
                  <Info className="w-4 h-4 text-[#1877F2] shrink-0 mt-0.5" />
                  <span>
                    Ferry tickets and water activities are subject to weather and port authority clearance. KrikoTrip coordinates real-time backups.
                  </span>
                </p>
                <p className="flex items-start gap-2">
                  <Info className="w-4 h-4 text-[#1877F2] shrink-0 mt-0.5" />
                  <span>
                    Comfortable footwear, light cotton clothing, sunscreen, and beach hats are strongly recommended.
                  </span>
                </p>
              </div>
            </div>

            {/* Section I: Frequently Asked Questions (Matches Screenshot) */}
            <div className="pt-2">
              <h2 className="text-xl sm:text-2xl font-bold text-[#00285C] mb-4">
                Frequently Asked Questions
              </h2>
              <div className="space-y-3">
                {faqs.map((faq, idx) => {
                  const isOpen = openFaq === idx;
                  return (
                    <div
                      key={idx}
                      className="rounded-xl border border-gray-200 bg-white overflow-hidden transition-all duration-200"
                    >
                      <button
                        type="button"
                        onClick={() => setOpenFaq(isOpen ? null : idx)}
                        className="w-full p-4 flex items-center justify-between text-left cursor-pointer hover:bg-gray-50 transition-colors"
                      >
                        <span className="text-sm font-bold text-gray-900 pr-3">
                          {faq.q}
                        </span>
                        <ChevronDown
                          className={`w-4 h-4 text-gray-500 transition-transform duration-200 shrink-0 ${
                            isOpen ? "rotate-180 text-[#1877F2]" : ""
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="p-4 bg-gray-50/60 border-t border-gray-150 text-xs sm:text-sm text-gray-600 leading-relaxed animate-in fade-in">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Section J: Reviews & Rating / Leave a Review (Matches Screenshot) */}
            <div className="pt-2">
              <h2 className="text-xl sm:text-2xl font-bold text-[#00285C] mb-4">
                Reviews & Rating
              </h2>

              {/* Rating Summary Card */}
              <div className="bg-white p-6 rounded-xl border border-gray-200 mb-6 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="text-center sm:text-left">
                  <div className="flex items-baseline gap-2 justify-center sm:justify-start">
                    <span className="text-4xl font-extrabold text-[#00285C]">
                      {pkg.rating}
                    </span>
                    <span className="text-sm text-gray-500 font-medium">/ 5.0</span>
                  </div>
                  <div className="flex items-center gap-1 my-1.5 justify-center sm:justify-start">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>
                  <p className="text-xs text-gray-500">
                    Based on {pkg.reviewsCount} verified traveler reviews
                  </p>
                </div>

                <div className="w-full sm:w-auto text-xs text-gray-600 space-y-1.5 max-w-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-12 text-right">5 Stars</span>
                    <div className="flex-1 h-2 rounded-full bg-gray-100 overflow-hidden">
                      <div className="h-full bg-amber-400 rounded-full w-[88%]" />
                    </div>
                    <span className="w-8">88%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-12 text-right">4 Stars</span>
                    <div className="flex-1 h-2 rounded-full bg-gray-100 overflow-hidden">
                      <div className="h-full bg-amber-400 rounded-full w-[10%]" />
                    </div>
                    <span className="w-8">10%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-12 text-right">3 Stars</span>
                    <div className="flex-1 h-2 rounded-full bg-gray-100 overflow-hidden">
                      <div className="h-full bg-amber-400 rounded-full w-[2%]" />
                    </div>
                    <span className="w-8">2%</span>
                  </div>
                </div>
              </div>

              {/* Leave a Review Form */}
              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <h3 className="text-base font-bold text-gray-900 mb-1">
                  Leave a Review
                </h3>
                <p className="text-xs text-gray-500 mb-4">
                  Share your experience with other travelers planning their trip.
                </p>

                <form onSubmit={handleReviewSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                      Your Rating *
                    </label>
                    <div className="flex items-center gap-1.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setReviewRating(star)}
                          className="cursor-pointer"
                        >
                          <Star
                            className={`w-5 h-5 ${
                              star <= reviewRating
                                ? "fill-amber-400 text-amber-400"
                                : "text-gray-300"
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                        Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={reviewName}
                        onChange={(e) => setReviewName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full px-3.5 py-2 rounded-lg border border-gray-200 text-xs sm:text-sm outline-none focus:border-[#1877F2]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                        Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={reviewEmail}
                        onChange={(e) => setReviewEmail(e.target.value)}
                        placeholder="john@example.com"
                        className="w-full px-3.5 py-2 rounded-lg border border-gray-200 text-xs sm:text-sm outline-none focus:border-[#1877F2]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                      Review Comment *
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={reviewComment}
                      onChange={(e) => setReviewComment(e.target.value)}
                      placeholder="Write your detailed review about the tour pace, guide, and destinations..."
                      className="w-full px-3.5 py-2 rounded-lg border border-gray-200 text-xs sm:text-sm outline-none focus:border-[#1877F2] resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={reviewSubmitted}
                    className="px-6 py-2.5 rounded-full bg-[#00285C] hover:bg-[#1877F2] text-white text-xs sm:text-sm font-semibold transition-all cursor-pointer"
                  >
                    {reviewSubmitted ? "Submitting..." : "Submit Review"}
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* ════ RIGHT COLUMN: SIDEBAR CARDS (lg:col-span-4) ════ */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
            {/* ─── SIDEBAR CARD 1: Booking & Price Card (Matches Screenshot Soft Blue Card) ─── */}
            <div className="rounded-2xl p-6 sm:p-7 bg-[#F0F5FF] border border-blue-100/80 shadow-xs">
              <span className="text-xs font-medium text-gray-500 block mb-1">
                Starting from
              </span>

              {/* Price Row */}
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-3xl sm:text-4xl font-extrabold text-[#00285C]">
                  ₹{pkg.price.toLocaleString("en-IN")}
                </span>
                <span className="text-xs text-gray-600 font-medium">
                  / per person
                </span>
              </div>

              {/* Original strikethrough price */}
              <div className="flex items-center gap-2 mb-5">
                <span className="text-xs text-gray-400 line-through">
                  ₹{originalPrice.toLocaleString("en-IN")}
                </span>
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                  Save ₹{savings.toLocaleString("en-IN")}
                </span>
              </div>

              {/* Input Form Fields */}
              <div className="space-y-4">
                {/* Select Date */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Select Date
                  </label>
                  <input
                    type="date"
                    value={travelDate}
                    onChange={(e) => setTravelDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-blue-200 bg-white text-xs sm:text-sm text-gray-800 outline-none focus:border-[#1877F2]"
                  />
                </div>

                {/* Adults counter */}
                <div className="flex items-center justify-between py-2 border-b border-blue-200/60">
                  <div>
                    <span className="block text-xs sm:text-sm font-bold text-gray-900">
                      Adults (12+ yrs)
                    </span>
                    <span className="text-[11px] text-gray-500">
                      ₹{pkg.price.toLocaleString("en-IN")} each
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setAdults((prev) => Math.max(1, prev - 1))}
                      className="w-8 h-8 rounded-full border border-gray-200 bg-white text-gray-700 font-bold hover:bg-gray-100 flex items-center justify-center cursor-pointer transition-colors"
                    >
                      -
                    </button>
                    <span className="w-5 text-center text-sm font-bold text-gray-900">
                      {adults}
                    </span>
                    <button
                      type="button"
                      onClick={() => setAdults((prev) => prev + 1)}
                      className="w-8 h-8 rounded-full border border-gray-200 bg-white text-gray-700 font-bold hover:bg-gray-100 flex items-center justify-center cursor-pointer transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Children counter */}
                <div className="flex items-center justify-between py-2 border-b border-blue-200/60">
                  <div>
                    <span className="block text-xs sm:text-sm font-bold text-gray-900">
                      Children (3-11 yrs)
                    </span>
                    <span className="text-[11px] text-gray-500">40% Discount</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setChildren((prev) => Math.max(0, prev - 1))}
                      className="w-8 h-8 rounded-full border border-gray-200 bg-white text-gray-700 font-bold hover:bg-gray-100 flex items-center justify-center cursor-pointer transition-colors"
                    >
                      -
                    </button>
                    <span className="w-5 text-center text-sm font-bold text-gray-900">
                      {children}
                    </span>
                    <button
                      type="button"
                      onClick={() => setChildren((prev) => prev + 1)}
                      className="w-8 h-8 rounded-full border border-gray-200 bg-white text-gray-700 font-bold hover:bg-gray-100 flex items-center justify-center cursor-pointer transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Total */}
                <div className="flex items-center justify-between pt-1">
                  <span className="text-xs font-bold text-gray-600 uppercase">
                    Total:
                  </span>
                  <span className="text-xl sm:text-2xl font-extrabold text-[#00285C]">
                    ₹{estimatedTotal.toLocaleString("en-IN")}
                  </span>
                </div>

                {/* Blue CTA Button: Book This Tour (Matches Screenshot) */}
                <button
                  type="button"
                  onClick={() => setIsBookModalOpen(true)}
                  className="w-full py-3 rounded-full bg-[#1877F2] hover:bg-[#00285C] text-white text-sm font-bold shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Book This Tour</span>
                </button>

                {/* Secondary Ask a Question link */}
                <div className="text-center pt-1">
                  <a
                    href={`https://wa.me/919876543210?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold text-[#1877F2] hover:underline inline-flex items-center gap-1.5"
                  >
                    <FaWhatsapp className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Ask a Question / Custom Quote</span>
                  </a>
                </div>

                {/* Footer guarantee */}
                <div className="pt-3 border-t border-blue-200/50 flex items-center justify-center gap-1.5 text-[11px] text-gray-500">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Best price guaranteed & free cancellation</span>
                </div>
              </div>
            </div>

            {/* ─── SIDEBAR CARD 2: Customize Travel Package (Matches Screenshot Mint Card) ─── */}
            <div className="rounded-2xl p-6 sm:p-7 bg-[#EBF7EE] border border-emerald-100 shadow-xs">
              <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1.5">
                Customize Travel Package
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4">
                Need custom dates, private cab, luxury villas or honeymoon add-ons?
              </p>

              {/* Customer avatars & counter */}
              <div className="flex items-center gap-3 mb-5">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full border-2 border-white overflow-hidden bg-gray-200 relative">
                    <Image
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
                      alt="Traveler"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="w-8 h-8 rounded-full border-2 border-white overflow-hidden bg-gray-200 relative">
                    <Image
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80"
                      alt="Traveler"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="w-8 h-8 rounded-full border-2 border-white overflow-hidden bg-gray-200 relative">
                    <Image
                      src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=100&q=80"
                      alt="Traveler"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <span className="text-xs font-semibold text-gray-700">
                  500+ happy clients this month
                </span>
              </div>

              {/* Dark Pill Button: Book Consultation */}
              <Link
                href="/contact-us"
                className="w-full py-2.5 rounded-full bg-gray-900 hover:bg-[#00285C] text-white text-xs sm:text-sm font-bold transition-all shadow-sm flex items-center justify-center cursor-pointer"
              >
                Book Consultation
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 4. BOTTOM SECTION: RELEVANT PACKAGE (Matches Screenshot Bottom Grid) ─── */}
      {relatedPackages && relatedPackages.length > 0 && (
        <section className="bg-white py-14 sm:py-20 border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#00285C] tracking-tight">
                Relevant Package
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 mt-2">
                A curated list of inspiration the most tour & travel based on different destinations.
              </p>
            </div>

            {/* 3-Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {relatedPackages.slice(0, 3).map((rPkg) => {
                const rDiscount = rPkg.originalPrice
                  ? Math.round(
                      ((rPkg.originalPrice - rPkg.price) / rPkg.originalPrice) * 100
                    )
                  : 20;

                return (
                  <div
                    key={rPkg.id}
                    className="group bg-white rounded-2xl overflow-hidden border border-gray-200/90 shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                  >
                    {/* Photo with discount tag */}
                    <div className="relative w-full aspect-[16/10] overflow-hidden bg-gray-100">
                      <Image
                        src={rPkg.image}
                        alt={rPkg.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 380px"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {/* Discount Tag (Top Right) */}
                      <div className="absolute top-3 right-3 z-10 px-2.5 py-1 rounded-md bg-amber-400 text-gray-950 text-[11px] font-bold shadow-xs">
                        -{rDiscount}% OFF
                      </div>
                      <div className="absolute bottom-3 left-3 z-10 px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-xs text-white text-[11px] font-medium">
                        {rPkg.travelType}
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-5 flex flex-col flex-1 justify-between text-left">
                      <div>
                        <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-1.5">
                          <MapPin className="w-3.5 h-3.5 text-[#03ADFF]" />
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

                      <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between">
                        <div>
                          <span className="text-[11px] text-gray-400 block leading-none">
                            Starting from
                          </span>
                          <span className="text-base sm:text-lg font-extrabold text-[#00285C]">
                            ₹{rPkg.price.toLocaleString("en-IN")}
                          </span>
                        </div>
                        <Link
                          href={`/tour-packages/${rPkg.id}`}
                          className="px-4 py-2 rounded-full bg-[#1877F2] hover:bg-[#00285C] text-white text-xs font-bold transition-all inline-flex items-center gap-1 cursor-pointer"
                        >
                          <span>View Details</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ─── BOOKING MODAL POPUP ─── */}
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
