"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  PhoneCall,
  X,
  User,
  Mail,
  MapPin,
  Sparkles,
  CheckCircle2,
  Send,
} from "lucide-react";
import CountryPhoneSelect from "./CountryPhoneSelect";
import { useAuth } from "./AuthContext";

/**
 * Site-wide bottom floating "Request a Call Back" CTA with an "Instant 30% OFF"
 * badge that opens a focused callback lead form modal.
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
    destination: "",
  });

  // Pre-fill lead fields from authenticated user profile when opening
  const handleOpenModal = () => {
    if (isLoggedIn && user) {
      setFormData((prev) => ({
        ...prev,
        name: prev.name || user.name || "",
        phone: prev.phone || user.phone?.replace(/^\+\d+\s*/, "") || "",
        email: prev.email || user.email || "",
      }));
    }
    setIsSubmitted(false);
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  // Close modal on Escape & lock body scroll while open
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen]);

  // Keep auth pages clean and distraction-free
  if (pathname === "/login" || pathname === "/register") {
    return null;
  }

  const isPackageDetailPage = Boolean(
    pathname &&
      pathname.startsWith("/tour-packages/") &&
      pathname !== "/tour-packages"
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) return;
    setIsSubmitted(true);
  };

  const handleResetAndClose = () => {
    setIsSubmitted(false);
    setFormData({
      name: "",
      phone: "",
      email: "",
      destination: "",
    });
    setIsOpen(false);
  };

  return (
    <>
      {/* ─── Site-Wide Floating Bottom Button + Instant 30% OFF Badge ─── */}
      <div
        className={`fixed right-4 sm:right-6 z-[85] flex flex-col items-end ${
          isPackageDetailPage ? "bottom-[96px] lg:bottom-6" : "bottom-4 sm:bottom-6"
        }`}
      >
        <button
          type="button"
          onClick={handleOpenModal}
          aria-label="Request a Call Back - Instant 30% Off"
          className="group relative flex flex-col items-end cursor-pointer focus:outline-none"
        >
          {/* Floating Instant 30% OFF Tag */}
          <span className="badge-shine inline-flex items-center gap-1 px-2.5 py-0.5 mb-1 rounded-full bg-gradient-to-r from-[#F59E0B] to-[#EA580C] text-white text-[10.5px] sm:text-[11px] font-medium shadow-md border border-white/40 tracking-wide">
            <Sparkles className="w-3 h-3 shrink-0" />
            <span>Instant 30% OFF</span>
          </span>

          {/* Main Request a Call Back Button */}
          <span className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-full bg-[#00285C] group-hover:bg-[#1877F2] text-white text-xs sm:text-sm font-medium shadow-[0_8px_24px_rgba(0,40,92,0.28)] border border-white/15 transition-all duration-200 group-active:scale-95">
            <span className="w-6 h-6 rounded-full bg-white/15 flex items-center justify-center shrink-0">
              <PhoneCall className="w-3.5 h-3.5 text-[#03ADFF] group-hover:text-white transition-colors" />
            </span>
            <span>Request a Call Back</span>
          </span>
        </button>
      </div>

      {/* ─── Lead Form Modal ─── */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[135] flex items-center justify-center p-4"
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
          <div className="relative w-full max-w-[430px] bg-white rounded-xl border border-gray-200 shadow-2xl overflow-hidden z-10 max-h-[92vh] flex flex-col animate-in fade-in duration-150">
            {/* Header */}
            <div className="px-5 py-4 flex items-start justify-between border-b border-gray-100 bg-[#F8FAFC]">
              <div className="min-w-0 pr-3">
                <span className="badge-shine inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-[#F59E0B] to-[#EA580C] text-white text-[10.5px] font-medium mb-1.5 shadow-2xs">
                  <Sparkles className="w-3 h-3 shrink-0" />
                  <span>Instant 30% OFF</span>
                </span>
                <h3
                  id="callback-lead-modal-title"
                  className="text-base sm:text-lg font-semibold text-gray-900 leading-tight"
                >
                  Request a Call Back
                </h3>
                <p className="text-xs text-gray-500 mt-0.5 font-normal">
                  Leave your details and get an instant 30% off deal from our travel expert.
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
                    with your Instant 30% OFF offer.
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
                className="p-5 space-y-3.5 overflow-y-auto"
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

                {/* Email (Optional) */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Email Address <span className="text-gray-400 font-normal">(Optional)</span>
                  </label>
                  <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg border border-gray-300 focus-within:border-[#1877F2] bg-white transition-colors">
                    <Mail className="w-4 h-4 text-gray-400 shrink-0" />
                    <input
                      type="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full text-xs sm:text-sm text-gray-800 outline-none bg-transparent placeholder:text-gray-400 font-normal"
                    />
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
                  <span>Get Instant 30% OFF Callback</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}

