"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Clock,
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
  ChevronLeft,
  ChevronRight,
  Share2,
  Heart,
  Send,
  ArrowUpRight,
  ArrowDown,
  Download,
  User,
  Phone,
  Mail,
  MessageSquare,
  Activity,
  Ticket,
  Percent,
  Crown,
} from "lucide-react";
import { TourPackage } from "./types";
import { PackageDetailedInfo } from "./packageDetailData";
import BankingDatePicker from "@/components/shared/DateTimePicker";
import RelevantPackagesSlider from "./RelevantPackagesSlider";
import CountryPhoneSelect from "@/components/shared/CountryPhoneSelect";
import { useAuth } from "@/components/shared/AuthContext";

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

  // Country code state for phone field
  const [countryCode, setCountryCode] = useState("+91");

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
  const [minDate, setMinDate] = useState<string>("2026-11-01");
  const [mounted, setMounted] = useState(false);

  // User Profile & Loyalty Rewards State
  const { user, isLoggedIn, updateProfile } = useAuth();
  const [applyLoyalty, setApplyLoyalty] = useState(false);

  // Professional Coupon Code State
  const [couponInput, setCouponInput] = useState("");
  const [couponError, setCouponError] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<{
    code: string;
    discountAmount: number;
    discountText: string;
  } | null>(null);

  // Available loyalty points (actual user points or demo 1,450 points)
  const availableLoyaltyPoints = user?.loyaltyPoints ?? 1450;

  // Coupon calculations
  const couponDiscount = appliedCoupon ? appliedCoupon.discountAmount : 0;
  const priceAfterCoupon = Math.max(0, pkg.price - couponDiscount);

  // Max points redeemable cannot exceed remaining package price (1 point = ₹1)
  const redeemableLoyaltyPoints = Math.min(availableLoyaltyPoints, priceAfterCoupon);
  const loyaltyDiscount = applyLoyalty ? redeemableLoyaltyPoints : 0;

  // Total discount & final effective payable price
  const totalSavings = couponDiscount + loyaltyDiscount;
  const finalPrice = Math.max(0, pkg.price - totalSavings);

  const availableCoupons = [
    { code: "KRIKO10", discountPercent: 10, discountText: "10% OFF" },
    { code: "EXPLORE2000", discountFixed: 2000, discountText: "₹2,000 OFF" },
    { code: "FESTIVE15", discountPercent: 15, discountText: "15% OFF" },
  ];

  const handleApplyCoupon = (codeToApply?: string) => {
    const raw = (codeToApply || couponInput).trim().toUpperCase();
    if (!raw) {
      setCouponError("Please enter a valid coupon code");
      return;
    }

    const matched = availableCoupons.find((c) => c.code === raw);
    let discount = 0;
    let label = "DISCOUNT";

    if (matched) {
      if (matched.discountPercent) {
        discount = Math.round((pkg.price * matched.discountPercent) / 100);
        label = matched.discountText;
      } else if (matched.discountFixed) {
        discount = matched.discountFixed;
        label = matched.discountText;
      }
    } else if (raw === "WELCOME" || raw === "TRAVEL" || raw === "HOLIDAY") {
      discount = Math.round((pkg.price * 10) / 100);
      label = "10% OFF";
    } else {
      setCouponError("Invalid coupon code. Try 'KRIKO10' or 'EXPLORE2000'");
      return;
    }

    setAppliedCoupon({
      code: raw,
      discountAmount: discount,
      discountText: label,
    });
    setCouponError("");
    setCouponInput("");
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponError("");
    setCouponInput("");
  };

  useEffect(() => {
    setMounted(true);
    const today = new Date();
    const y = today.getFullYear();
    const m = String(today.getMonth() + 1).padStart(2, "0");
    const d = String(today.getDate()).padStart(2, "0");
    setMinDate(`${y}-${m}-${d}`);
  }, []);

  // Auto-fill form details if user is logged in
  useEffect(() => {
    if (user && isLoggedIn) {
      setSidebarForm((prev) => ({
        ...prev,
        name: prev.name || user.name || "",
        email: prev.email || user.email || "",
      }));
    }
  }, [user, isLoggedIn]);

  // Mobile Scroll & Form Visibility Tracking
  const bookingFormRef = useRef<HTMLDivElement>(null);
  const [isFormInView, setIsFormInView] = useState(false);

  useEffect(() => {
    const target = bookingFormRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsFormInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  const scrollToBookingForm = () => {
    if (bookingFormRef.current) {
      bookingFormRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      const firstInput = bookingFormRef.current.querySelector<HTMLInputElement>("input");
      if (firstInput) {
        setTimeout(() => firstInput.focus({ preventScroll: true }), 450);
      }
    } else {
      const el = document.getElementById("booking-form");
      el?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const originalPrice = pkg.originalPrice || Math.round(pkg.price * 1.25);
  const savings = originalPrice - pkg.price;
  const discountPercent = Math.round((savings / originalPrice) * 100);

  // Split title if it contains parenthesis route details (e.g. "Kerala Backwaters (2 nts Munnar + ...)")
  const parenMatch = pkg.title.match(/^(.*?)\s*\((.*?)\)\s*$/);
  const mainTitle = parenMatch ? parenMatch[1].trim() : pkg.title;

  const fallbackImages = [
    "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=800&q=80",
  ];

  // 4 high-res gallery photos for the collage matching Screenshot 1
  const galleryImages = [
    pkg.images?.[0] || pkg.image || fallbackImages[0],
    pkg.images?.[1] || fallbackImages[1],
    pkg.images?.[2] || fallbackImages[2],
    pkg.images?.[3] || fallbackImages[3],
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

      // If loyalty points were redeemed and user is logged in, deduct them
      if (applyLoyalty && loyaltyDiscount > 0 && user && isLoggedIn) {
        updateProfile({
          loyaltyPoints: Math.max(0, user.loyaltyPoints - loyaltyDiscount),
        });
      }

      let discountMsg = "";
      if (totalSavings > 0) {
        const parts = [];
        if (couponDiscount > 0 && appliedCoupon) {
          parts.push(`Coupon (${appliedCoupon.code}): -₹${couponDiscount.toLocaleString("en-IN")}`);
        }
        if (loyaltyDiscount > 0) {
          parts.push(`Loyalty Points (${redeemableLoyaltyPoints} pts): -₹${loyaltyDiscount.toLocaleString("en-IN")}`);
        }
        discountMsg = ` Total savings applied: ₹${totalSavings.toLocaleString("en-IN")} (${parts.join(", ")}). Final payable: ₹${finalPrice.toLocaleString("en-IN")}.`;
      }

      alert(
        `Thank you ${sidebarForm.name || ""}! Your booking request for "${pkg.title}" has been received.${discountMsg} Our holiday specialist will call you on ${countryCode} ${sidebarForm.phone || ""} shortly.`
      );
      setSidebarForm({
        name: "",
        phone: "",
        email: "",
        travelDate: "",
        travellers: "1",
        message: "",
      });
      setApplyLoyalty(false);
      setAppliedCoupon(null);
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
    <div className="w-full bg-[#FFFFFF] font-sans antialiased text-[#111827] pb-20 lg:pb-0 relative">
      {/* ─── TOP HERO BANNER WITH SCENIC BACKGROUND & BREADCRUMB ─── */}
      <section className="relative w-full overflow-hidden bg-black py-7 sm:py-9 flex items-center min-h-[160px] sm:min-h-[190px]">
        {/* Background Image with Black Layer Above */}
        <div className="absolute inset-0 z-0">
          <Image
            src={pkg.image}
            alt={pkg.title}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center scale-105"
          />
          {/* Black Layer Above Image */}
          <div className="absolute inset-0 bg-black/65" />
        </div>

        {/* Content Container with Generous Left Spacing for Main Heading */}
        <div className="container relative z-10 text-left px-6 sm:px-10 lg:px-12">
          {/* Breadcrumb Navigation on Top with Background */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-xs sm:text-[13px] text-white/80 mb-2.5 font-normal"
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

          {/* Package Heading: Refined, Elegant Typography */}
          <h1 className="text-xl sm:text-2xl lg:text-[28px] font-semibold text-white tracking-tight leading-snug max-w-4xl">
            {mainTitle}
          </h1>
        </div>
      </section>

      {/* ─── MAIN 2-COLUMN SECTION: LEFT HAS ALL CONTENT, RIGHT ONLY HAS THE FORM ─── */}
      <section className="py-8 sm:py-10 lg:py-12">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            {/* ════ LEFT COLUMN: ALL TOUR DETAILS (lg:col-span-8) ════ */}
            <div className="lg:col-span-8 space-y-10 sm:space-y-12">
              {/* ─── 1. PHOTO GALLERY COLLAGE (Always shows all 4 photos side-by-side) ─── */}
              <div className="grid grid-cols-2 gap-2 sm:gap-3.5 h-[220px] xs:h-[270px] sm:h-[380px] md:h-[430px]">
                {/* Left Tall Vertical Photo */}
                <div className="relative w-full h-full rounded-md overflow-hidden bg-gray-100 group">
                  <Image
                    src={galleryImages[0]}
                    alt={`${pkg.title} - Main Feature`}
                    fill
                    priority
                    sizes="(max-width: 1024px) 50vw, 460px"
                    className="object-cover group-hover:scale-102 transition-transform duration-500"
                  />
                </div>

                {/* Right 3 Photos (1 Wide Top, 2 Half-width Bottom in a 2x2 grid) */}
                <div className="grid grid-cols-2 grid-rows-2 gap-2 sm:gap-3.5 h-full">
                  {/* Top Wide Photo (Spans 2 columns across Row 1) */}
                  <div className="col-span-2 relative w-full h-full rounded-md overflow-hidden bg-gray-100 group">
                    <Image
                      src={galleryImages[1]}
                      alt={`${pkg.title} - Landmark`}
                      fill
                      priority
                      sizes="(max-width: 1024px) 50vw, 460px"
                      className="object-cover group-hover:scale-102 transition-transform duration-500"
                    />
                  </div>

                  {/* Bottom Left Photo (Row 2 Col 1) */}
                  <div className="relative w-full h-full rounded-md overflow-hidden bg-gray-100 group">
                    <Image
                      src={galleryImages[2]}
                      alt={`${pkg.title} - Experience 1`}
                      fill
                      priority
                      sizes="(max-width: 1024px) 25vw, 230px"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Bottom Right Photo (Row 2 Col 2) */}
                  <div className="relative w-full h-full rounded-md overflow-hidden bg-gray-100 group">
                    <Image
                      src={galleryImages[3]}
                      alt={`${pkg.title} - Experience 2`}
                      fill
                      priority
                      sizes="(max-width: 1024px) 25vw, 230px"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
              </div>

              {/* ─── Mobile Quick Booking Bar (Refined, professional typography without heavy bold) ─── */}
              <div className="lg:hidden p-3.5 rounded-xl bg-gray-50/90 border border-gray-200/80 flex items-center justify-between shadow-2xs">
                <div>
                  <span className="text-[11px] font-normal text-gray-500 block mb-0.5">
                    Starting from
                  </span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-xl font-semibold text-gray-900 leading-tight">
                      ₹{pkg.price.toLocaleString("en-IN")}
                    </span>
                    <span className="text-[11px] text-gray-400 font-normal">/ person</span>
                  </div>
                  {savings > 0 && (
                    <span className="inline-block text-[10.5px] font-medium text-amber-800 bg-amber-50 border border-amber-200/60 px-1.5 py-0.5 rounded mt-0.5">
                      Save ₹{savings.toLocaleString("en-IN")}
                    </span>
                  )}
                </div>
                <button
                  type="button"
                  onClick={scrollToBookingForm}
                  className="px-4 py-2 rounded-lg bg-[#1877F2] hover:bg-[#00285C] active:scale-95 text-white font-medium text-xs sm:text-sm shadow-xs transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <span>Book Now</span>
                  <ArrowDown className="w-3.5 h-3.5 opacity-80" />
                </button>
              </div>

              {/* ─── 2. ABOUT TOUR PACKAGE ─── */}
              <div className="mt-10">
                <h2 className="text-2xl sm:text-[26px] font-semibold text-gray-900 mb-3 tracking-tight">
                  About Tour Package
                </h2>
                <p className="text-sm sm:text-[15px] text-gray-600 leading-relaxed font-normal mb-7">
                  {pkg.overview || pkg.description}
                </p>

                {/* 9-Item Specs Box in Clean Rounded Border Card */}
                <div className="rounded-2xl border border-gray-200/90 bg-white p-4 sm:p-8 shadow-xs">
                  <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-y-5 sm:gap-y-7 gap-x-4 sm:gap-x-8">
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
              <div className="mt-10">
                {/* Header with Title & Expand / Collapse */}
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl sm:text-[26px] font-semibold text-gray-900 tracking-tight">
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

                {/* Itinerary Card with Dividers, Pin Icons & Spacing Matching Screenshot */}
                <div className="rounded-2xl border border-gray-200 bg-white px-6 sm:px-8 py-2 shadow-xs">
                  {pkg.itinerary.map((dayItem) => {
                    const isOpen = openDays.includes(dayItem.day);
                    const dayPadded =
                      dayItem.day < 10 ? `0${dayItem.day}` : dayItem.day;

                    return (
                      <div key={dayItem.day} className="py-5 sm:py-6 first:pt-4 last:pb-4 border-b border-gray-100 last:border-0">
                        <button
                          type="button"
                          onClick={() => toggleDay(dayItem.day)}
                          className="w-full flex items-center justify-between text-left cursor-pointer group"
                        >
                          <div className="flex items-center pr-4 flex-1">
                            {/* Pin Icon */}
                            <MapPin className="w-4 h-4 text-black shrink-0 stroke-[2.2]" />
                            {/* Day Number */}
                            <span className="font-semibold text-gray-950 text-sm sm:text-base shrink-0 mx-2.5">
                              Day-{dayPadded}
                            </span>
                            {/* Main Heading with Left Side Space */}
                            <span className="text-sm sm:text-base font-normal text-gray-800 group-hover:text-[#1877F2] transition-colors ml-6 sm:ml-10 line-clamp-1">
                              {dayItem.title}
                            </span>
                          </div>

                          {/* Caret Down Icon matching screenshot */}
                          <div className="shrink-0 text-gray-500 pl-2">
                            <svg
                              className={`w-3.5 h-3.5 fill-gray-500 transition-transform duration-200 ${isOpen ? "rotate-180" : ""
                                }`}
                              viewBox="0 0 24 24"
                            >
                              <path d="M7 10l5 5 5-5z" />
                            </svg>
                          </div>
                        </button>

                        {/* Expandable Day Details (Matching Reference Screenshot Structure with Smooth Dropdown) */}
                        <div
                          className={`grid transition-all duration-300 ease-in-out ${isOpen
                            ? "grid-rows-[1fr] opacity-100 mt-4 pt-1"
                            : "grid-rows-[0fr] opacity-0 mt-0 pt-0"
                            }`}
                        >
                          <div className="overflow-hidden">
                            <div className="text-sm sm:text-[15px] text-gray-700 space-y-4 pl-0 sm:pl-2">
                              {/* Description Paragraph */}
                              <p className="leading-relaxed font-normal text-gray-600">
                                {dayItem.description}
                              </p>

                              {/* 4 Details Rows with Blue Icons and Exact Colon Alignment */}
                              <div className="space-y-3 pt-2">
                                {/* Transport */}
                                <div className="flex items-start sm:items-center gap-2.5 text-xs sm:text-sm">
                                  <svg className="w-4 h-4 text-[#1877F2] fill-[#1877F2] shrink-0 mt-0.5 sm:mt-0" viewBox="0 0 24 24">
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

                                {/* Activities */}
                                <div className="flex items-start sm:items-center gap-2.5 text-xs sm:text-sm">
                                  <svg className="w-4 h-4 text-[#1877F2] shrink-0 mt-0.5 sm:mt-0" viewBox="0 0 24 24" fill="none">
                                    <circle cx="12" cy="12" r="9" fill="#1877F2" />
                                    <path d="M7 12h2.5l1.5-3 2 6 1.5-3H17" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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

                                {/* Meals */}
                                <div className="flex items-start sm:items-center gap-2.5 text-xs sm:text-sm">
                                  <svg className="w-4 h-4 text-[#1877F2] shrink-0 mt-0.5 sm:mt-0" viewBox="0 0 24 24" fill="none" stroke="#1877F2" strokeWidth="2">
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

                                {/* Accomodation */}
                                <div className="flex items-start sm:items-center gap-2.5 text-xs sm:text-sm">
                                  <svg className="w-4 h-4 text-[#1877F2] shrink-0 mt-0.5 sm:mt-0" viewBox="0 0 24 24" fill="none" stroke="#1877F2" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                  </svg>
                                  <span className="font-semibold text-gray-950 w-28 sm:w-32 shrink-0">
                                    Accomodation
                                  </span>
                                  <span className="text-gray-900 font-semibold shrink-0">:</span>
                                  <span className="text-gray-700 font-normal ml-1">
                                    {dayItem.stay || pkg.hotelName || "Luxury Heritage Resort"}
                                  </span>
                                </div>
                              </div>
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
                <h2 className="text-2xl sm:text-[26px] font-semibold text-gray-900 mb-6 tracking-tight">
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
              <div className="mt-10">
                <h2 className="text-2xl sm:text-[26px] font-semibold text-gray-900 mb-4 tracking-tight">
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
              <div className="mt-10">
                <h2 className="text-2xl sm:text-[26px] font-semibold text-gray-900 mb-4 tracking-tight">
                  Frequently Asked & Question
                </h2>
                <div className="space-y-3.5">
                  {faqs.map((faq, idx) => {
                    const isOpen = openFaq === idx;
                    return (
                      <div
                        key={idx}
                        className={`rounded-xl transition-all duration-300 overflow-hidden ${isOpen
                          ? "bg-white shadow-[0_8px_25px_rgba(0,0,0,0.06)] p-5 sm:p-6 "
                          : "bg-[#F3F4F6] hover:bg-[#EBEEF2] p-5 sm:p-6"
                          }`}
                      >
                        {/* Accordion Header */}
                        <button
                          type="button"
                          onClick={() => setOpenFaq(isOpen ? null : idx)}
                          className="w-full flex items-center justify-between gap-4 text-left cursor-pointer focus:outline-none select-none"
                        >
                          <span
                            className={`text-sm sm:text-base font-semibold leading-snug transition-colors duration-200 ${isOpen ? "text-[#1877F2]" : "text-gray-900"
                              }`}
                          >
                            {faq.q}
                          </span>

                          {/* Smooth Rotating Triangle Arrow Like Home Page */}
                          <div className="shrink-0 ml-2">
                            <svg
                              viewBox="0 0 10 6"
                              fill="currentColor"
                              className={`w-2.5 h-2.5 transition-transform duration-300 ease-in-out ${isOpen
                                ? "text-[#1877F2] rotate-180"
                                : "text-[#4B5563] rotate-0"
                                }`}
                            >
                              <path d="M0 0L5 6L10 0H0Z" />
                            </svg>
                          </div>
                        </button>

                        {/* Smooth Animated Opening & Closing Dropdown */}
                        <div
                          className={`grid transition-all duration-300 ease-in-out ${isOpen
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
            </div>

            {/* ════ RIGHT COLUMN: SIDEBAR FORM (Inside lg:col-span-4) ════ */}
            <div
              id="booking-form"
              ref={bookingFormRef}
              className="lg:col-span-4 lg:sticky lg:top-24 scroll-mt-24"
            >
              <div className="bg-white rounded-xl border border-gray-200/90 shadow-sm p-5 sm:p-6 relative">
                {/* Top Row: Download Brochure & Share */}
                <div className="flex items-center gap-2.5 mb-5">
                  <button
                    type="button"
                    onClick={handleDownloadBrochure}
                    className="flex-1 py-2.5 px-3.5 rounded-lg border border-gray-200 hover:border-[#1877F2] bg-white hover:bg-blue-50/40 text-[#00285C] font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-2xs transition-colors cursor-pointer"
                  >
                    <Download className="w-4 h-4 text-[#1877F2]" />
                    <span>Download Brochure</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleShare}
                    aria-label="Share package"
                    className="w-10 h-10 rounded-lg border border-gray-200 hover:border-gray-300 bg-white hover:bg-gray-50 flex items-center justify-center text-gray-600 shadow-2xs transition-colors cursor-pointer shrink-0"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Deal & Price Box (Matches Special Offer Reference Screenshot) */}
                {savings > 0 ? (
                  <div className="rounded-xl border border-[#FDE68A] bg-[#FFFDF7] p-4 sm:p-5 mb-5 flex items-center justify-between shadow-2xs">
                    {/* Left Side */}
                    <div className="flex flex-col items-start">
                      <span className="text-xs font-semibold text-[#C2410C] uppercase tracking-wide mb-1">
                        SPECIAL OFFER
                      </span>
                      <div className="flex items-center gap-1.5 text-xs sm:text-[13px] font-semibold text-[#1E293B] mb-2.5">
                        <Clock className="w-3.5 h-3.5 text-[#1E293B] stroke-[2.2]" />
                        <span>
                          {pkg.nights && pkg.days
                            ? `${pkg.nights} Nights / ${pkg.days} Days`
                            : pkg.duration}
                        </span>
                      </div>
                      <span className="badge-shine relative overflow-hidden inline-flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-[#F59E0B] to-[#F97316] text-white text-xs font-semibold shadow-2xs rounded-md">
                        <Tag className="w-3.5 h-3.5 stroke-[2.2]" />
                        Save ₹{savings.toLocaleString("en-IN")}
                      </span>
                    </div>

                    {/* Right Side */}
                    <div className="flex flex-col text-right items-end">
                      <div className="flex items-center justify-end gap-1.5 text-[11px] font-semibold text-[#475569] uppercase tracking-wide">
                        <span>STARTING FROM</span>
                        <span className="line-through text-slate-400 font-semibold">
                          ₹{originalPrice.toLocaleString("en-IN")}
                        </span>
                      </div>
                      <span className="text-2xl sm:text-[30px] font-extrabold text-[#0F172A] leading-tight my-0.5">
                        ₹{pkg.price.toLocaleString("en-IN")}
                      </span>
                      <span className="text-xs font-medium text-[#64748B]">
                        per person
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="rounded-2xl border border-gray-200 bg-gray-50/70 p-4 sm:p-5 mb-5 flex items-center justify-between shadow-2xs">
                    <div className="flex flex-col items-start">
                      <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                        STANDARD RATE
                      </span>
                      <div className="flex items-center gap-1.5 text-xs sm:text-[13px] font-semibold text-[#1E293B]">
                        <Clock className="w-3.5 h-3.5 text-[#1E293B] stroke-[2.2]" />
                        <span>{pkg.duration}</span>
                      </div>
                    </div>
                    <div className="flex flex-col text-right items-end">
                      <span className="text-[11px] font-medium text-gray-500 uppercase tracking-wide">
                        STARTING FROM
                      </span>
                      <span className="text-2xl sm:text-[30px] font-extrabold text-[#0F172A] leading-tight my-0.5">
                        ₹{pkg.price.toLocaleString("en-IN")}
                      </span>
                      <span className="text-xs font-medium text-[#64748B]">
                        per person
                      </span>
                    </div>
                  </div>
                )}

                {/* Form Subtitle */}
                <p className="text-xs sm:text-sm font-medium text-gray-700 mb-3.5">
                  Share your details and we&apos;ll contact you shortly.
                </p>

                {/* Form with Normal Rounded Inputs, Country Dropdown & Normal Placeholders */}
                <form onSubmit={handleQuoteSubmit} className="space-y-3">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Your Name <span className="text-red-500">*</span>
                    </label>
                    <div className="flex items-center gap-2.5 px-3 py-3 rounded-lg border border-gray-300 focus-within:border-[#1877F2] bg-white transition-colors shadow-2xs">
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

                  {/* Phone with Country Dropdown */}
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <div className="relative flex items-center rounded-lg border border-gray-300 focus-within:border-[#1877F2] bg-white transition-colors shadow-2xs">
                      {/* Country Code Dropdown with Map/Flag, Name & Search */}
                      <CountryPhoneSelect
                        value={countryCode}
                        onChange={(code) => setCountryCode(code)}
                        buttonClassName="rounded-l-lg"
                      />

                      {/* Phone Input */}
                      <div className="flex items-center gap-2 px-3 py-3 flex-1 min-w-0">
                        <Phone className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                        <input
                          type="tel"
                          required
                          placeholder="Enter your number"
                          value={sidebarForm.phone}
                          onChange={(e) =>
                            setSidebarForm({ ...sidebarForm, phone: e.target.value })
                          }
                          className="w-full text-xs sm:text-sm text-gray-800 outline-none bg-transparent placeholder:text-gray-400 font-normal min-w-0"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <div className="flex items-center gap-2.5 px-3 py-3 rounded-lg border border-gray-300 focus-within:border-[#1877F2] bg-white transition-colors shadow-2xs">
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

                  {/* Travel Date & No. of Travellers (Always 1 Row on Mobile and Desktop) */}
                  <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
                    {/* Travel Date */}
                    <div className="min-w-0 w-full">
                      <label className="block text-xs font-medium text-gray-700 mb-1 truncate">
                        Travel Date
                      </label>
                      <BankingDatePicker
                        value={sidebarForm.travelDate}
                        onChange={(dateStr) =>
                          setSidebarForm({ ...sidebarForm, travelDate: dateStr })
                        }
                        placeholder="Select Date"
                        className="w-full"
                        align="right"
                      />
                    </div>

                    {/* No. of Travellers */}
                    <div className="min-w-0 w-full">
                      <label className="block text-xs font-medium text-gray-700 mb-1 truncate">
                        Travellers
                      </label>
                      <div className="flex items-center gap-2 px-3 py-2.5 h-[46px] rounded-lg border border-gray-300 focus-within:border-[#1877F2] bg-white transition-colors shadow-2xs w-full min-w-0">
                        <Users className="w-4 h-4 text-gray-400 shrink-0" />
                        <input
                          type="number"
                          min="1"
                          max="50"
                          placeholder="1"
                          value={sidebarForm.travellers}
                          onChange={(e) =>
                            setSidebarForm({ ...sidebarForm, travellers: e.target.value })
                          }
                          className="w-full text-xs sm:text-sm text-gray-800 outline-none bg-transparent font-normal min-w-0"
                        />
                      </div>
                    </div>
                  </div>

                  {/* ─── Professional Coupon Code Apply Section ─── */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-medium text-gray-700 flex items-center gap-1.5">
                        <Ticket className="w-3.5 h-3.5 text-[#1877F2]" />
                        <span>Have a Coupon Code?</span>
                      </label>
                      {appliedCoupon && (
                        <span className="text-[11px] font-semibold text-emerald-600 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          Applied
                        </span>
                      )}
                    </div>

                    {!appliedCoupon ? (
                      <div className="space-y-1.5">
                        <div className="relative flex items-center rounded-lg border border-gray-300 focus-within:border-[#1877F2] bg-white transition-colors shadow-2xs overflow-hidden">
                          <div className="pl-3 pr-2 text-gray-400 shrink-0">
                            <Tag className="w-4 h-4" />
                          </div>
                          <input
                            type="text"
                            value={couponInput}
                            onChange={(e) => {
                              setCouponInput(e.target.value.toUpperCase());
                              setCouponError("");
                            }}
                            placeholder="ENTER COUPON CODE"
                            className="w-full text-xs sm:text-sm font-mono tracking-wider font-semibold text-gray-800 placeholder:text-gray-400 placeholder:font-normal placeholder:tracking-normal outline-none bg-transparent py-2.5"
                          />
                          <button
                            type="button"
                            onClick={() => handleApplyCoupon()}
                            disabled={!couponInput.trim()}
                            className="px-4 py-2 mr-1 my-1 rounded-md bg-[#1877F2] hover:bg-[#00285C] active:scale-95 disabled:opacity-40 disabled:pointer-events-none text-white text-xs font-semibold transition-all cursor-pointer shrink-0"
                          >
                            Apply
                          </button>
                        </div>

                        {couponError && (
                          <p className="text-[11px] text-red-600 font-medium pl-1 flex items-center gap-1">
                            <XCircle className="w-3 h-3 shrink-0" />
                            <span>{couponError}</span>
                          </p>
                        )}

                        {/* Suggested Quick Apply Badges */}
                        <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
                          <span className="text-[10px] text-gray-400 font-medium">Offers:</span>
                          {availableCoupons.map((c) => (
                            <button
                              key={c.code}
                              type="button"
                              onClick={() => handleApplyCoupon(c.code)}
                              className="text-[10px] font-mono font-semibold text-[#1877F2] bg-blue-50 hover:bg-blue-100 border border-blue-200/80 px-2 py-0.5 rounded-md transition-colors cursor-pointer flex items-center gap-1"
                            >
                              <span>{c.code}</span>
                              <span className="text-gray-500 font-normal">({c.discountText})</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    ) : (
                      /* Applied State Card */
                      <div className="p-2.5 rounded-lg bg-emerald-50/90 border border-emerald-200 flex items-center justify-between text-xs animate-in fade-in duration-200">
                        <div className="flex items-center gap-2 min-w-0">
                          <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                            <Percent className="w-3.5 h-3.5 stroke-[2.5]" />
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span className="font-mono font-semibold text-emerald-900 text-xs">
                                {appliedCoupon.code}
                              </span>
                              <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-200/80 px-1.5 py-0.5 rounded">
                                {appliedCoupon.discountText}
                              </span>
                            </div>
                            <span className="text-[11px] text-emerald-700 font-medium block truncate">
                              ₹{appliedCoupon.discountAmount.toLocaleString("en-IN")} discount applied!
                            </span>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={handleRemoveCoupon}
                          className="text-[11px] font-semibold text-red-600 hover:text-red-700 hover:underline cursor-pointer shrink-0 ml-2"
                        >
                          Remove
                        </button>
                      </div>
                    )}
                  </div>

                  {/* ─── Loyalty Points Redemption Section ─── */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-medium text-gray-700 flex items-center gap-1.5">
                        <Crown className="w-3.5 h-3.5 text-amber-500" />
                        <span>Kriko Loyalty Points</span>
                      </label>
                      {applyLoyalty && loyaltyDiscount > 0 && (
                        <span className="text-[11px] font-semibold text-amber-700 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          Redeemed
                        </span>
                      )}
                    </div>

                    {!applyLoyalty ? (
                      <div className="p-2.5 rounded-lg bg-amber-50/70 border border-amber-200/80 transition-all">
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2.5 min-w-0">
                            <div className="w-7 h-7 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                              <Crown className="w-3.5 h-3.5 stroke-[2.2]" />
                            </div>
                            <div className="min-w-0">
                              <div className="flex items-center gap-1.5 flex-wrap">
                                <span className="text-xs font-semibold text-gray-900">
                                  {availableLoyaltyPoints.toLocaleString("en-IN")} Points
                                </span>
                                <span className="text-[10px] font-semibold text-amber-800 bg-amber-200/80 px-1.5 py-0.2 rounded">
                                  ₹{availableLoyaltyPoints.toLocaleString("en-IN")} OFF
                                </span>
                              </div>
                              <p className="text-[10.5px] text-gray-500 truncate">
                                1 pt = ₹1 instant discount on this booking
                              </p>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => setApplyLoyalty(true)}
                            className="px-3 py-1.5 rounded-md bg-amber-500 hover:bg-amber-600 active:scale-95 text-white text-xs font-semibold transition-all cursor-pointer shrink-0 shadow-2xs"
                          >
                            Apply
                          </button>
                        </div>
                      </div>
                    ) : (
                      /* Loyalty Applied Card */
                      <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-300 flex items-center justify-between text-xs animate-in fade-in duration-200">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="w-7 h-7 rounded-full bg-amber-200 text-amber-800 flex items-center justify-center shrink-0">
                            <Crown className="w-3.5 h-3.5 stroke-[2.2]" />
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span className="font-semibold text-amber-950 text-xs">
                                {redeemableLoyaltyPoints.toLocaleString("en-IN")} Points Redeemed
                              </span>
                              <span className="text-[10px] font-semibold text-amber-900 bg-amber-200 px-1.5 py-0.5 rounded">
                                ₹{loyaltyDiscount.toLocaleString("en-IN")} OFF
                              </span>
                            </div>
                            <span className="text-[11px] text-amber-800 font-medium block truncate">
                              Instant loyalty cashback applied!
                            </span>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => setApplyLoyalty(false)}
                          className="text-[11px] font-semibold text-red-600 hover:text-red-700 hover:underline cursor-pointer shrink-0 ml-2"
                        >
                          Remove
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Combined Price Summary (Coupon + Loyalty) */}
                  {(appliedCoupon || (applyLoyalty && loyaltyDiscount > 0)) && (
                    <div className="p-3 rounded-lg bg-gray-50 border border-gray-200/80 space-y-1.5 text-xs text-gray-700 animate-in fade-in duration-150">
                      <div className="flex items-center justify-between">
                        <span>Original Price</span>
                        <span className="font-medium text-gray-500 line-through">
                          ₹{pkg.price.toLocaleString("en-IN")}
                        </span>
                      </div>

                      {appliedCoupon && (
                        <div className="flex items-center justify-between text-emerald-700 font-semibold">
                          <span className="flex items-center gap-1">
                            <Tag className="w-3 h-3 text-emerald-600" />
                            Coupon Savings ({appliedCoupon.code})
                          </span>
                          <span>- ₹{appliedCoupon.discountAmount.toLocaleString("en-IN")}</span>
                        </div>
                      )}

                      {applyLoyalty && loyaltyDiscount > 0 && (
                        <div className="flex items-center justify-between text-amber-800 font-semibold">
                          <span className="flex items-center gap-1">
                            <Crown className="w-3.5 h-3.5 text-amber-600" />
                            Loyalty Redeemed ({redeemableLoyaltyPoints.toLocaleString("en-IN")} pts)
                          </span>
                          <span>- ₹{loyaltyDiscount.toLocaleString("en-IN")}</span>
                        </div>
                      )}

                      {appliedCoupon && applyLoyalty && loyaltyDiscount > 0 && (
                        <div className="flex items-center justify-between text-gray-600 text-[11px] pt-0.5">
                          <span>Total Savings</span>
                          <span className="font-semibold text-emerald-700">
                            - ₹{totalSavings.toLocaleString("en-IN")}
                          </span>
                        </div>
                      )}

                      <div className="flex items-center justify-between pt-1.5 border-t border-gray-200 font-semibold text-gray-900 text-sm">
                        <span>Effective Price</span>
                        <span className="text-[#1877F2] font-extrabold text-base">
                          ₹{finalPrice.toLocaleString("en-IN")}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Message (Optional) */}
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Message (Optional)
                    </label>
                    <div className="flex items-start gap-2.5 px-3 py-3 rounded-lg border border-gray-300 focus-within:border-[#1877F2] bg-white transition-colors shadow-2xs">
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

                  {/* Submit Button (Price not shown in button) */}
                  <button
                    type="submit"
                    disabled={isQuoteSubmitted}
                    className="w-full py-3 rounded-lg text-white font-medium text-sm shadow-sm active:scale-98 transition-colors flex items-center justify-center gap-2 cursor-pointer mt-1 bg-[#1877F2] hover:bg-[#00285C]"
                  >
                    <Send className="w-4 h-4 text-white relative z-10" />
                    <span className="relative z-10">
                      {isQuoteSubmitted ? "Submitting Request..." : "Book Now"}
                    </span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── BOTTOM SECTION: RELEVANT PACKAGE SLIDER COMPONENT ─── */}
      <RelevantPackagesSlider packages={relatedPackages} />

      {/* ─── MOBILE STICKY BOTTOM BAR (Clean, professional typography without heavy bold) ─── */}
      <aside
        aria-label="Mobile booking action bar"
        className={`lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-gray-200/80 shadow-[0_-2px_15px_rgba(0,0,0,0.06)] px-4 py-2.5 flex items-center justify-between transition-all duration-300 ${
          isFormInView ? "opacity-0 pointer-events-none translate-y-full" : "opacity-100 translate-y-0"
        }`}
      >
        <div className="flex flex-col">
          <span className="text-[11px] font-normal text-gray-500 leading-none mb-1">
            Starting from
          </span>
          <div className="flex items-baseline gap-1">
            <span className="text-lg font-semibold text-gray-900 leading-tight">
              ₹{(totalSavings > 0 ? finalPrice : pkg.price).toLocaleString("en-IN")}
            </span>
            <span className="text-[11px] text-gray-400 font-normal">/ person</span>
          </div>
          {totalSavings > 0 ? (
            <span className="text-[10px] font-medium text-emerald-600 mt-0.5">
              ₹{totalSavings.toLocaleString("en-IN")} off applied
            </span>
          ) : savings > 0 ? (
            <span className="inline-block text-[10px] font-medium text-amber-800 bg-amber-50 border border-amber-200/60 px-1.5 py-0.5 rounded mt-0.5 w-fit">
              Save ₹{savings.toLocaleString("en-IN")}
            </span>
          ) : null}
        </div>
        <button
          type="button"
          onClick={scrollToBookingForm}
          className="px-5 py-2.5 rounded-lg bg-[#1877F2] hover:bg-[#00285C] active:scale-95 text-white font-medium text-xs sm:text-sm shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
        >
          <span>Book Now</span>
          <ArrowDown className="w-3.5 h-3.5 opacity-80" />
        </button>
      </aside>
    </div>
  );
}
