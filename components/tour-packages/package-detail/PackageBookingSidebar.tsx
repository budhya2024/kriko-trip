"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Clock,
  Users,
  Tag,
  Share2,
  Send,
  ArrowDown,
  Download,
  User,
  Phone,
  Mail,
  MessageSquare,
} from "lucide-react";
import BankingDatePicker from "@/components/shared/DateTimePicker";
import CountryPhoneSelect from "@/components/shared/CountryPhoneSelect";
import { useAuth } from "@/components/shared/AuthContext";

interface PackageBookingSidebarProps {
  title: string;
  price: number;
  originalPrice: number;
  savings: number;
  duration: string;
  nights?: number;
  days?: number;
}

/**
 * Renders the right-column booking/enquiry form (with Download Brochure & Share)
 * and the mobile sticky bottom booking action bar.
 */
export default function PackageBookingSidebar({
  title,
  price,
  originalPrice,
  savings,
  duration,
  nights,
  days,
}: PackageBookingSidebarProps) {
  const { user, isLoggedIn } = useAuth();
  const [countryCode, setCountryCode] = useState("+91");
  const [sidebarForm, setSidebarForm] = useState({
    name: "",
    phone: "",
    email: "",
    travelDate: "",
    travellers: "1",
    message: "",
  });
  const [isQuoteSubmitted, setIsQuoteSubmitted] = useState(false);

  const bookingFormRef = useRef<HTMLDivElement>(null);
  const [isFormInView, setIsFormInView] = useState(false);

  useEffect(() => {
    if (user && isLoggedIn) {
      setSidebarForm((prev) => ({
        ...prev,
        name: prev.name || user.name || "",
        email: prev.email || user.email || "",
      }));
    }
  }, [user, isLoggedIn]);

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
      const firstInput =
        bookingFormRef.current.querySelector<HTMLInputElement>("input");
      if (firstInput) {
        setTimeout(() => firstInput.focus({ preventScroll: true }), 450);
      }
    } else {
      const el = document.getElementById("booking-form");
      el?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
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
        `Thank you ${sidebarForm.name || ""}! Your booking request for "${title}" has been received. Our holiday specialist will call you on ${countryCode} ${sidebarForm.phone || ""} shortly.`
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

  return (
    <>
      {/* ════ RIGHT COLUMN: SIDEBAR FORM (Inside lg:col-span-4) ════ */}
      <div
        id="booking-form"
        ref={bookingFormRef}
        className="lg:col-span-4 lg:sticky lg:top-24 scroll-mt-24 print:hidden"
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

          {/* Deal & Price Box */}
          {savings > 0 ? (
            <div className="rounded-xl border border-[#FDE68A] bg-[#FFFDF7] p-4 sm:p-5 mb-5 flex items-center justify-between shadow-2xs">
              <div className="flex flex-col items-start">
                <span className="text-xs font-semibold text-[#C2410C] uppercase tracking-wide mb-1">
                  SPECIAL OFFER
                </span>
                <div className="flex items-center gap-1.5 text-xs sm:text-[13px] font-semibold text-[#1E293B] mb-2.5">
                  <Clock className="w-3.5 h-3.5 text-[#1E293B] stroke-[2.2]" />
                  <span>
                    {nights && days ? `${nights} Nights / ${days} Days` : duration}
                  </span>
                </div>
                <span className="badge-shine relative overflow-hidden inline-flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-[#F59E0B] to-[#F97316] text-white text-xs font-semibold shadow-2xs rounded-md">
                  <Tag className="w-3.5 h-3.5 stroke-[2.2]" />
                  Save ₹{savings.toLocaleString("en-IN")}
                </span>
              </div>

              <div className="flex flex-col text-right items-end">
                <div className="flex items-center justify-end gap-1.5 text-[11px] font-semibold text-[#475569] uppercase tracking-wide">
                  <span>STARTING FROM</span>
                  <span className="line-through text-slate-400 font-semibold">
                    ₹{originalPrice.toLocaleString("en-IN")}
                  </span>
                </div>
                <span className="text-2xl sm:text-[30px] font-extrabold text-[#0F172A] leading-tight my-0.5">
                  ₹{price.toLocaleString("en-IN")}
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
                  <span>{duration}</span>
                </div>
              </div>
              <div className="flex flex-col text-right items-end">
                <span className="text-[11px] font-medium text-gray-500 uppercase tracking-wide">
                  STARTING FROM
                </span>
                <span className="text-2xl sm:text-[30px] font-extrabold text-[#0F172A] leading-tight my-0.5">
                  ₹{price.toLocaleString("en-IN")}
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

          {/* Enquiry Form */}
          <form onSubmit={handleQuoteSubmit} className="space-y-3">
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

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <div className="relative flex items-center rounded-lg border border-gray-300 focus-within:border-[#1877F2] bg-white transition-colors shadow-2xs">
                <CountryPhoneSelect
                  value={countryCode}
                  onChange={(code) => setCountryCode(code)}
                  buttonClassName="rounded-l-lg"
                />
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

            <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
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
                      setSidebarForm({
                        ...sidebarForm,
                        travellers: e.target.value,
                      })
                    }
                    className="w-full text-xs sm:text-sm text-gray-800 outline-none bg-transparent font-normal min-w-0"
                  />
                </div>
              </div>
            </div>

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

      {/* ─── MOBILE STICKY BOTTOM BAR ─── */}
      <aside
        aria-label="Mobile booking action bar"
        className={`lg:hidden print:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-gray-200/90 shadow-[0_-2px_15px_rgba(0,0,0,0.08)] px-4 py-2.5 flex items-center justify-between transition-all duration-300 ${
          isFormInView
            ? "opacity-0 pointer-events-none translate-y-full"
            : "opacity-100 translate-y-0"
        }`}
      >
        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-1.5 leading-none mb-1">
            <span className="text-[10.5px] font-normal text-gray-500">
              Starting from
            </span>
            {originalPrice > price && (
              <span className="line-through text-gray-400 text-xs font-normal">
                ₹{originalPrice.toLocaleString("en-IN")}
              </span>
            )}
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-lg font-semibold text-gray-900 leading-tight">
              ₹{price.toLocaleString("en-IN")}
            </span>
            <span className="text-[11px] text-gray-400 font-normal">
              / person
            </span>
          </div>
          {savings > 0 && (
            <div className="mt-1">
              <span className="badge-shine relative overflow-hidden inline-flex items-center gap-1 px-2.5 py-0.5 bg-gradient-to-r from-[#F59E0B] to-[#F97316] text-white text-[10px] font-medium shadow-2xs rounded-md">
                <Tag className="w-2.5 h-2.5 stroke-[2.2]" />
                <span>Save ₹{savings.toLocaleString("en-IN")}</span>
              </span>
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={scrollToBookingForm}
          className="px-5 py-2.5 rounded-lg bg-[#1877F2] hover:bg-[#00285C] active:scale-95 text-white font-medium text-xs sm:text-sm shadow-xs transition-colors cursor-pointer flex items-center gap-1.5 shrink-0 ml-3"
        >
          <span>Book Now</span>
          <ArrowDown className="w-3.5 h-3.5 opacity-90" />
        </button>
      </aside>
    </>
  );
}

