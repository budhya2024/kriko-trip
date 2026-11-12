"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  PhoneCall,
  X,
  User,
  Users,
  Mail,
  MapPin,
  Sparkles,
  Tag,
  CheckCircle2,
  Send,
} from "lucide-react";
import CountryPhoneSelect from "./CountryPhoneSelect";
import BankingDatePicker from "./DateTimePicker";
import { useAuth } from "./AuthContext";
import { useScrollLock } from "./useScrollLock";

/**
 * Dispatches a global event to open the site-wide Request a Call Back modal,
 * optionally pre-filling the destination field.
 */
export function openCallbackModal(destination?: string) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent("krikotrip:open-callback", {
      detail: { destination: destination || "" },
    })
  );
}

/**
 * Sticky bottom bar (mobile) & floating card (desktop) "Request a Call Back" CTA
 * matching the sticky booking bar design, rendered on the Tour Packages list page.
 */
export function TourListFloatingCallbackButton() {
  return (
    <aside
      aria-label="Request a Call Back"
      className="fixed bottom-0 left-0 right-0 lg:left-auto lg:bottom-5 lg:right-6 z-[44] bg-white/95 backdrop-blur-md border-t lg:border border-gray-200/90 shadow-[0_-2px_15px_rgba(0,0,0,0.08)] lg:shadow-[0_10px_30px_rgba(0,40,92,0.14)] lg:rounded-xl px-4 py-2.5 lg:px-5 lg:py-3 flex items-center justify-between gap-3 sm:gap-5 print:hidden"
    >
      {/* Left Info & Offer Tag (Matches Sticky Bar Reference Design) */}
      <div className="flex flex-col min-w-0">
        <span className="text-[10.5px] sm:text-xs font-normal text-gray-500 leading-none mb-1 truncate">
          Plan your dream trip
        </span>
        <div className="flex items-baseline gap-1.5">
          <span className="text-base sm:text-lg font-semibold text-gray-900 leading-tight truncate">
            Free Expert Quote
          </span>
        </div>
        <div className="mt-1">
          <span className="badge-shine relative overflow-hidden inline-flex items-center gap-1 px-2.5 py-0.5 bg-gradient-to-r from-[#F59E0B] to-[#F97316] text-white text-[10px] sm:text-[10.5px] font-medium shadow-2xs rounded-[6px]">
            <Tag className="w-2.5 h-2.5 stroke-[2.2]" />
            <span>Upto 30% OFF</span>
          </span>
        </div>
      </div>

      {/* Right CTA Button with Floating-Only Shine & Pulse Effects */}
      <button
        type="button"
        onClick={() => openCallbackModal()}
        aria-label="Request a Call Back - Upto 30% Off"
        className="group badge-shine relative overflow-hidden px-4 sm:px-5 py-2.5 rounded-lg bg-[#1877F2] hover:bg-[#00285C] active:scale-95 text-white font-medium text-xs sm:text-sm shadow-xs transition-all cursor-pointer flex items-center gap-2 shrink-0"
      >
        <span className="relative flex items-center justify-center">
          <span className="absolute -inset-1 rounded-full bg-white/30 animate-ping" />
          <PhoneCall className="relative w-3.5 h-3.5 sm:w-4 sm:h-4 opacity-95" />
        </span>
        <span>Request a Call Back</span>
      </button>
    </aside>
  );
}

/**
 * Global Request a Call Back lead form modal (mounted in layout without a floating button).
 */
export default function RequestCallbackWidget() {
  const pathname = usePathname();
  const { user, isLoggedIn } = useAuth();

  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [countryCode, setCountryCode] = useState("+91");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    travelDate: "",
    travellers: "1",
    destination: "",
  });

  // Pre-fill lead fields from authenticated user profile when opening
  const handleOpenModal = (prefilledDestination?: string) => {
    setFormData((prev) => ({
      ...prev,
      name: prev.name || (isLoggedIn && user ? user.name || "" : ""),
      phone:
        prev.phone ||
        (isLoggedIn && user ? user.phone?.replace(/^\+\d+\s*/, "") || "" : ""),
      email: prev.email || (isLoggedIn && user ? user.email || "" : ""),
      destination:
        typeof prefilledDestination === "string" && prefilledDestination
          ? prefilledDestination
          : prev.destination,
    }));
    setIsSubmitted(false);
    setIsOpen(true);
  };

  // Auto-open Request a Call Back modal once for first-time visitors
  useEffect(() => {
    if (pathname === "/login" || pathname === "/register") return;

    try {
      const storageKey = "krikotrip_callback_auto_shown";
      if (localStorage.getItem(storageKey)) return;

      const timer = setTimeout(() => {
        try {
          localStorage.setItem(storageKey, "1");
        } catch {
          // Ignore storage write errors in restricted browsing modes
        }
        handleOpenModal();
      }, 1500);

      return () => clearTimeout(timer);
    } catch {
      // Ignore storage access errors
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Allow any section CTA (e.g., Top Trending Deals video slider) to trigger the callback modal
  useEffect(() => {
    const handleExternalOpen = (event: Event) => {
      const customEvent = event as CustomEvent<{ destination?: string }>;
      handleOpenModal(customEvent.detail?.destination);
    };

    window.addEventListener("krikotrip:open-callback", handleExternalOpen);
    return () => {
      window.removeEventListener("krikotrip:open-callback", handleExternalOpen);
    };
  });

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  useScrollLock(isOpen);

  // Close modal on Escape while open
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  // Keep auth pages clean and distraction-free
  if (pathname === "/login" || pathname === "/register") {
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !formData.name.trim() ||
      !formData.phone.trim() ||
      !formData.email.trim()
    ) {
      return;
    }
    setIsSubmitted(true);
  };

  const handleResetAndClose = () => {
    setIsSubmitted(false);
    setFormData({
      name: "",
      phone: "",
      email: "",
      travelDate: "",
      travellers: "1",
      destination: "",
    });
    setIsOpen(false);
  };

  return (
    <>
      {/* ─── Lead Form Modal ─── */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[140] flex items-center justify-center p-4 overflow-y-auto print:hidden"
          role="dialog"
          aria-modal="true"
          aria-labelledby="callback-lead-modal-title"
        >
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
            onClick={handleCloseModal}
          />

          {/* Modal Card */}
          <div className="relative my-auto w-full max-w-[430px] bg-white rounded-xl border border-gray-200 shadow-2xl overflow-visible z-10 flex flex-col animate-in fade-in duration-150">
            {/* Header */}
            <div className="px-5 py-4 flex items-start justify-between border-b border-gray-100 bg-[#F8FAFC] rounded-t-xl">
              <div className="min-w-0 pr-3">
                <span className="badge-shine inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-[#F59E0B] to-[#EA580C] text-white text-[10.5px] font-medium mb-1.5 shadow-2xs">
                  <Sparkles className="w-3 h-3 shrink-0" />
                  <span>Upto 30% OFF</span>
                </span>
                <h3
                  id="callback-lead-modal-title"
                  className="text-base sm:text-lg font-semibold text-gray-900 leading-tight"
                >
                  Request a Call Back
                </h3>
                <p className="text-xs text-gray-500 mt-0.5 font-normal">
                  Leave your details and get upto 30% off on your dream trip from our travel expert.
                </p>
              </div>
              <button
                type="button"
                onClick={handleCloseModal}
                aria-label="Close modal"
                className="w-8 h-8 rounded-lg hover:bg-gray-200/80 text-gray-500 hover:text-gray-800 flex items-center justify-center transition-colors cursor-pointer shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {isSubmitted ? (
              /* Success Confirmation */
              <div className="p-6 text-center space-y-3.5">
                <div className="w-12 h-12 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-base font-semibold text-gray-900">
                    Callback Request Received!
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                    Thank you, {formData.name}. Our travel advisor will call you shortly on{" "}
                    <span className="text-gray-800 font-medium">
                      {countryCode} {formData.phone}
                    </span>{" "}
                    with your Upto 30% OFF offer.
                  </p>
                </div>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={handleResetAndClose}
                    className="w-full py-2.5 rounded-lg bg-[#1877F2] hover:bg-[#00285C] text-white text-xs sm:text-sm font-medium transition-colors cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : (
              /* Minimal Lead Form */
              <form
                onSubmit={handleSubmit}
                className="p-5 space-y-3.5 overflow-visible"
              >
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg border border-gray-300 focus-within:border-[#1877F2] bg-white transition-colors">
                    <User className="w-4 h-4 text-gray-400 shrink-0" />
                    <input
                      type="text"
                      required
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full text-xs sm:text-sm text-gray-800 outline-none bg-transparent placeholder:text-gray-400 font-normal"
                    />
                  </div>
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <div className="relative flex items-center rounded-lg border border-gray-300 focus-within:border-[#1877F2] bg-white transition-colors">
                    <CountryPhoneSelect
                      value={countryCode}
                      onChange={(code) => setCountryCode(code)}
                      buttonClassName="rounded-l-lg"
                    />
                    <input
                      type="tel"
                      required
                      placeholder="Enter your mobile number"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="w-full px-3 py-2.5 bg-transparent text-xs sm:text-sm text-gray-800 outline-none placeholder:text-gray-400 font-normal border-0 min-w-0"
                    />
                  </div>
                </div>

                {/* Email Address */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg border border-gray-300 focus-within:border-[#1877F2] bg-white transition-colors">
                    <Mail className="w-4 h-4 text-gray-400 shrink-0" />
                    <input
                      type="email"
                      required
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full text-xs sm:text-sm text-gray-800 outline-none bg-transparent placeholder:text-gray-400 font-normal"
                    />
                  </div>
                </div>

                {/* Travel Date & Travellers (1 Row on Mobile and Desktop) */}
                <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
                  {/* Travel Date */}
                  <div className="min-w-0 w-full">
                    <label className="block text-xs font-medium text-gray-700 mb-1 truncate">
                      Travel Date
                    </label>
                    <BankingDatePicker
                      value={formData.travelDate}
                      onChange={(dateStr) =>
                        setFormData({ ...formData, travelDate: dateStr })
                      }
                      placeholder="Select Date"
                      className="w-full"
                      align="left"
                    />
                  </div>

                  {/* Travellers */}
                  <div className="min-w-0 w-full">
                    <label className="block text-xs font-medium text-gray-700 mb-1 truncate">
                      Travellers
                    </label>
                    <div className="flex items-center gap-2 px-3 py-2.5 h-[46px] rounded-lg border border-gray-300 focus-within:border-[#1877F2] bg-white transition-colors w-full min-w-0">
                      <Users className="w-4 h-4 text-gray-400 shrink-0" />
                      <input
                        type="number"
                        min="1"
                        max="50"
                        placeholder="1"
                        value={formData.travellers}
                        onChange={(e) =>
                          setFormData({ ...formData, travellers: e.target.value })
                        }
                        className="w-full text-xs sm:text-sm text-gray-800 outline-none bg-transparent font-normal min-w-0"
                      />
                    </div>
                  </div>
                </div>

                {/* Destination / Package Interest (Optional) */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Destination / Query <span className="text-gray-400 font-normal">(Optional)</span>
                  </label>
                  <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg border border-gray-300 focus-within:border-[#1877F2] bg-white transition-colors">
                    <MapPin className="w-4 h-4 text-gray-400 shrink-0" />
                    <input
                      type="text"
                      placeholder="e.g. Andaman, Kashmir, Kerala..."
                      value={formData.destination}
                      onChange={(e) =>
                        setFormData({ ...formData, destination: e.target.value })
                      }
                      className="w-full text-xs sm:text-sm text-gray-800 outline-none bg-transparent placeholder:text-gray-400 font-normal"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-3 rounded-lg bg-[#1877F2] hover:bg-[#00285C] active:scale-[0.99] text-white text-xs sm:text-sm font-medium shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer mt-1"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Get Upto 30% OFF Callback</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}

