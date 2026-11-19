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
  ChevronRight,
  ChevronLeft,
  Plane,
  Train,
  Compass,
  Building,
  Car,
  Utensils,
  FileCheck,
  ShieldCheck,
  Smartphone,
  RotateCcw,
  Plus,
  Minus,
  Send,
} from "lucide-react";
import { MdVerifiedUser } from "react-icons/md";
import CountryPhoneSelect from "./CountryPhoneSelect";
import BankingDatePicker from "./DateTimePicker";
import { useAuth } from "./AuthContext";
import { useScrollLock } from "./useScrollLock";

/**
 * Dispatches a global event to open the site-wide Request a Call Back modal,
 * optionally pre-filling destination or full package details.
 */
export interface CallbackModalPayload {
  destination?: string;
  title?: string;
  price?: number;
  originalPrice?: number;
  savings?: number;
}

export function openCallbackModal(payload?: string | CallbackModalPayload) {
  if (typeof window === "undefined") return;
  const detail: CallbackModalPayload =
    typeof payload === "string" ? { destination: payload } : payload || {};
  window.dispatchEvent(
    new CustomEvent("krikotrip:open-callback", {
      detail,
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

const DURATION_OPTIONS = [
  { id: "3-4", label: "3-4 Days" },
  { id: "5-6", label: "5-6 Days", isRecommended: true },
  { id: "7-8", label: "7-8 Days" },
  { id: "8-10", label: "8-10 Days" },
];

const PREFERRED_TRAVEL_OPTIONS = [
  { id: "flights", label: "Flights Included", icon: Plane },
  { id: "without_flights", label: "Without Flights", icon: Compass },
  { id: "train", label: "Train / Ground Transport", icon: Train },
  { id: "undecided", label: "Undecided", icon: Compass },
];

const HOTEL_OPTIONS = [
  { id: "standard", label: "Standard (3-Star)", icon: Building },
  { id: "deluxe", label: "Deluxe (4-Star)", icon: Building },
  { id: "luxury", label: "Luxury (5-Star)", icon: Building },
  { id: "heritage", label: "Heritage / Resort", icon: Building },
];

const SERVICE_OPTIONS = [
  { id: "transfers", label: "Airport Transfers", icon: Car },
  { id: "sightseeing", label: "Sightseeing Tours", icon: Compass },
  { id: "meals", label: "All Meals Included", icon: Utensils },
  { id: "visa", label: "Visa Assistance", icon: FileCheck },
  { id: "insurance", label: "Travel Insurance", icon: ShieldCheck },
  { id: "esim", label: "eSIM", icon: Smartphone },
];

const isEmailValid = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
};

const isPhoneValid = (phone: string, code: string) => {
  const digits = phone.replace(/[^0-9]/g, "");
  if (code === "+91") {
    return digits.length === 10;
  }
  return digits.length >= 7 && digits.length <= 15;
};

/**
 * Global Request a Call Back modal powered by the unified 5-step enquiry form.
 */
export default function RequestCallbackWidget() {
  const pathname = usePathname();
  const { user, isLoggedIn } = useAuth();

  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [countryCode, setCountryCode] = useState("+91");

  // Step 1 Form Data
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    travelDate: "",
    guests: 2,
    destination: "",
  });

  const [step1Errors, setStep1Errors] = useState<{ [key: string]: string }>({});

  // Step 2-5 Options
  const [selectedDuration, setSelectedDuration] = useState<string>("5-6 Days");
  const [preferredTravel, setPreferredTravel] = useState<string>("flights");
  const [adults, setAdults] = useState<number>(2);
  const [children, setChildren] = useState<number>(0);
  const [infants, setInfants] = useState<number>(0);
  const [seniors, setSeniors] = useState<number>(0);
  const [selectedHotel, setSelectedHotel] = useState<string>("deluxe");
  const [selectedServices, setSelectedServices] = useState<string[]>(["insurance"]);
  const [specialNotes, setSpecialNotes] = useState<string>("");
  const [modalMeta, setModalMeta] = useState<CallbackModalPayload>({});

  useScrollLock(isOpen);

  // Pre-fill lead fields from authenticated user profile when opening
  const handleOpenModal = (payload?: CallbackModalPayload) => {
    setIsSubmitted(false);
    setCurrentStep(1);
    setStep1Errors({});
    setModalMeta(payload || {});
    setFormData((prev) => ({
      ...prev,
      name: user?.name || prev.name || "",
      email: user?.email || prev.email || "",
      destination: payload?.destination || prev.destination || "",
    }));
    setIsOpen(true);
  };

  useEffect(() => {
    const handleCustomOpen = (e: Event) => {
      const customEvent = e as CustomEvent<CallbackModalPayload>;
      handleOpenModal(customEvent.detail);
    };

    window.addEventListener("krikotrip:open-callback", handleCustomOpen);
    return () => {
      window.removeEventListener("krikotrip:open-callback", handleCustomOpen);
    };
  }, [user]);

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleResetAndClose = () => {
    setIsSubmitted(false);
    setCurrentStep(1);
    setModalMeta({});
    setFormData({
      name: "",
      phone: "",
      email: "",
      travelDate: "",
      guests: 2,
      destination: "",
    });
    setAdults(2);
    setChildren(0);
    setInfants(0);
    setSeniors(0);
    setSelectedDuration("5-6 Days");
    setPreferredTravel("flights");
    setSelectedHotel("deluxe");
    setSelectedServices(["insurance"]);
    setSpecialNotes("");
    setIsOpen(false);
  };

  const validateStep1 = () => {
    const errors: { [key: string]: string } = {};
    if (!formData.name.trim()) errors.name = "Please enter your name";
    if (!formData.phone.trim()) {
      errors.phone = "Please enter your phone number";
    } else if (formData.phone.trim().length < 7) {
      errors.phone = "Please enter a valid phone number";
    }
    if (!formData.email.trim()) {
      errors.email = "Please enter your email";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errors.email = "Please enter a valid email address";
    }
    if (!formData.travelDate.trim()) {
      errors.travelDate = "Please select travel date";
    }
    if (!formData.guests || formData.guests < 1) {
      errors.guests = "Please enter number of guests";
    }
    setStep1Errors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNext = () => {
    if (currentStep === 1) {
      if (!validateStep1()) return;
    }
    if (currentStep < 5) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const toggleService = (id: string) => {
    setSelectedServices((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleFinalSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (currentStep < 5) {
      handleNext();
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 700);
  };

  const displayName = formData.name.trim()
    ? formData.name.trim().split(" ")[0]
    : user?.name
      ? user.name.split(" ")[0]
      : "Traveler";

  return (
    <>
      {/* ─── Unified 5-Step Lead Form Modal ─── */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[140] flex items-center justify-center p-3 sm:p-4 overflow-y-auto print:hidden"
          role="dialog"
          aria-modal="true"
          aria-labelledby="callback-lead-modal-title"
        >
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/55 backdrop-blur-xs transition-opacity"
            onClick={handleCloseModal}
          />

          {/* Modal Card with Stable Fixed Dimensions */}
          <div className="relative my-auto w-full max-w-[460px] bg-white rounded-2xl border border-gray-200 shadow-2xl overflow-visible z-10 flex flex-col animate-in fade-in duration-150">
            {/* Header */}
            <div className="px-5 py-3.5 flex items-start justify-between border-b border-gray-100 bg-white rounded-t-2xl">
              <div className="min-w-0 pr-3">
                {/* Orange Shine Save Badge */}
                <div className="mb-1.5">
                  <span className="badge-shine relative overflow-hidden inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-[#F59E0B] to-[#EA580C] text-white text-[10.5px] font-semibold shadow-2xs">
                    <Tag className="w-2.5 h-2.5 stroke-[2.2]" />
                    <span>
                      {modalMeta.savings && modalMeta.savings > 0
                        ? `Save ₹${modalMeta.savings.toLocaleString("en-IN")}`
                        : "Save Upto 30% OFF"}
                    </span>
                  </span>
                </div>
                <h3
                  id="callback-lead-modal-title"
                  className="text-sm sm:text-base font-semibold text-gray-900 leading-snug line-clamp-2"
                >
                  {modalMeta.title ||
                    (formData.destination
                      ? `${formData.destination} Tour Package`
                      : "Request a Call Back")}
                </h3>
                {modalMeta.price && modalMeta.price > 0 ? (
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-base sm:text-lg font-bold text-[#0F172A]">
                      ₹{modalMeta.price.toLocaleString("en-IN")}
                    </span>
                    {modalMeta.originalPrice && modalMeta.originalPrice > modalMeta.price && (
                      <span className="text-xs text-gray-400 line-through">
                        ₹{modalMeta.originalPrice.toLocaleString("en-IN")}
                      </span>
                    )}
                    <span className="text-[11px] text-gray-500">per person</span>
                  </div>
                ) : (
                  <p className="text-xs text-gray-500 mt-0.5 font-normal">
                    Expert quote & customized tour plan within 15 minutes.
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={handleCloseModal}
                aria-label="Close modal"
                className="w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-800 flex items-center justify-center transition-colors cursor-pointer shrink-0 mt-0.5"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-4 sm:p-5">
              {isSubmitted ? (
                /* ═══ SUCCESS CONFIRMATION IN BOX ═══ */
                <div className="py-2 text-center flex flex-col justify-between h-[420px] max-h-[420px] animate-in fade-in duration-300">
                  <div>
                    <div className="w-10 h-10 text-emerald-600 flex items-center justify-center mx-auto mb-1">
                      <MdVerifiedUser className="w-8 h-8 text-emerald-600" />
                    </div>
                    <h3 className="text-base font-bold text-gray-900">
                      Awesome {displayName}!
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 mt-0.5">
                      Your personalized callback request has been received.
                    </p>
                  </div>

                  {/* Summary */}
                  <div className="bg-gray-50 rounded-lg p-3 border border-gray-200 text-left space-y-1.5 text-xs sm:text-sm text-gray-700">
                    {formData.destination && (
                      <div className="flex justify-between py-0.5 border-b border-gray-200/60">
                        <span className="text-gray-500">Destination:</span>
                        <span className="font-semibold text-gray-900">
                          {formData.destination}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between py-0.5 border-b border-gray-200/60">
                      <span className="text-gray-500">Travel Date:</span>
                      <span className="font-semibold text-gray-900">
                        {formData.travelDate || "Flexible"}
                      </span>
                    </div>
                    <div className="flex justify-between py-0.5 border-b border-gray-200/60">
                      <span className="text-gray-500">Guests:</span>
                      <span className="font-semibold text-gray-900">
                        {formData.guests} {formData.guests === 1 ? "Guest" : "Guests"}
                      </span>
                    </div>
                    <div className="flex justify-between py-0.5 border-b border-gray-200/60">
                      <span className="text-gray-500">Duration:</span>
                      <span className="font-semibold text-gray-900">
                        {selectedDuration}
                      </span>
                    </div>
                    <div className="flex justify-between py-0.5 border-b border-gray-200/60">
                      <span className="text-gray-500">Travel Mode:</span>
                      <span className="font-semibold text-gray-900 capitalize">
                        {preferredTravel === "flights" ? "Flight" : "Train / Land"}
                      </span>
                    </div>
                    <div className="flex justify-between py-0.5">
                      <span className="text-gray-500">Services:</span>
                      <span className="font-semibold text-gray-900 capitalize">
                        {selectedServices.length > 0
                          ? selectedServices
                              .map(
                                (id) =>
                                  SERVICE_OPTIONS.find((s) => s.id === id)?.label ||
                                  id
                              )
                              .join(", ")
                          : "Standard"}
                      </span>
                    </div>
                  </div>

                  <div className="bg-emerald-50/60 border border-emerald-200 rounded-lg p-2.5 text-left flex items-start gap-2">
                    <MdVerifiedUser className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <p className="text-xs text-emerald-950 leading-relaxed">
                      Our <strong>Verified Holiday Specialist</strong> will call you on{" "}
                      <strong>
                        {countryCode} {formData.phone}
                      </strong>{" "}
                      within 15 minutes with up to 30% discount.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleResetAndClose}
                    className="w-full py-2.5 rounded-lg bg-[#1877F2] hover:bg-[#00285C] text-white font-medium text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-colors cursor-pointer outline-none focus:outline-none"
                  >
                    <span>Done</span>
                  </button>
                </div>
              ) : (
                /* ═══ 5-STEP FORM (Fixed 420px Height Layout) ═══ */
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (currentStep < 5) {
                      handleNext();
                    }
                  }}
                  className="flex flex-col justify-between h-[420px] max-h-[420px]"
                >
                  {/* Step Header & Progress Bar */}
                  <div className="pb-1.5 border-b border-gray-100 shrink-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-semibold text-[#1877F2]">
                        Step {currentStep} of 5
                      </span>
                      <span className="text-xs text-gray-400">
                        {currentStep === 1 && "Contact Details"}
                        {currentStep === 2 && "Trip Duration"}
                        {currentStep === 3 && "Travel Mode"}
                        {currentStep === 4 && "Accommodation"}
                        {currentStep === 5 && "Review & Submit"}
                      </span>
                    </div>
                    {/* Clean Progress Bar */}
                    <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#1877F2] rounded-full transition-all duration-300 ease-out"
                        style={{ width: `${(currentStep / 5) * 100}%` }}
                      />
                    </div>
                  </div>

                  {/* ─── Scrollable Step Body ─── */}
                  <div className="flex-1 py-2 overflow-y-auto min-h-0 pr-0.5">
                    {/* ═══ STEP 1: CONTACT DETAILS ═══ */}
                    {currentStep === 1 && (
                      <div className="space-y-3">
                        {/* Name */}
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">
                            Your Name <span className="text-red-500">*</span>
                          </label>
                          <div className="flex items-center gap-2 px-3 h-[46px] rounded-lg border border-gray-300 focus-within:border-[#1877F2] bg-white transition-colors">
                            <User className="w-4 h-4 text-gray-400 shrink-0" />
                            <input
                              type="text"
                              placeholder="e.g. Rahul Sharma"
                              value={formData.name}
                              onChange={(e) => {
                                setFormData({ ...formData, name: e.target.value });
                                if (step1Errors.name) {
                                  setStep1Errors((prev) => ({ ...prev, name: "" }));
                                }
                              }}
                              className="w-full text-xs sm:text-sm text-gray-800 outline-none focus:outline-none border-none bg-transparent placeholder:text-gray-400 font-normal"
                            />
                          </div>
                          {step1Errors.name && (
                            <p className="text-[11px] text-red-500 mt-1">
                              {step1Errors.name}
                            </p>
                          )}
                        </div>

                        {/* Phone */}
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">
                            Phone Number <span className="text-red-500">*</span>
                          </label>
                          <div className="flex items-center gap-2 px-3 h-[46px] rounded-lg border border-gray-300 focus-within:border-[#1877F2] bg-white transition-colors">
                            <CountryPhoneSelect
                              value={countryCode}
                              onChange={(code) => setCountryCode(code)}
                            />
                            <div className="h-5 w-[1px] bg-gray-200 shrink-0" />
                            <input
                              type="tel"
                              maxLength={countryCode === "+91" ? 10 : 15}
                              placeholder="9876543210"
                              value={formData.phone}
                              onChange={(e) => {
                                const maxLen = countryCode === "+91" ? 10 : 15;
                                const clean = e.target.value.replace(/[^0-9]/g, "").slice(0, maxLen);
                                setFormData((prev) => ({
                                  ...prev,
                                  phone: clean,
                                }));
                                if (step1Errors.phone) {
                                  setStep1Errors((prev) => ({ ...prev, phone: "" }));
                                }
                              }}
                              onKeyDown={(e) => {
                                if (e.key === "Enter") e.preventDefault();
                              }}
                              className="w-full text-xs sm:text-sm text-gray-800 outline-none focus:outline-none border-none bg-transparent placeholder:text-gray-400 font-normal min-w-0"
                            />
                            {isPhoneValid(formData.phone, countryCode) && (
                              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 animate-in zoom-in-75 duration-200" />
                            )}
                          </div>
                          {step1Errors.phone && (
                            <p className="text-[11px] text-red-500 mt-1">
                              {step1Errors.phone}
                            </p>
                          )}
                        </div>

                        {/* Email */}
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">
                            Email Address <span className="text-red-500">*</span>
                          </label>
                          <div className="flex items-center gap-2 px-3 h-[46px] rounded-lg border border-gray-300 focus-within:border-[#1877F2] bg-white transition-colors">
                            <Mail className="w-4 h-4 text-gray-400 shrink-0" />
                            <input
                              type="email"
                              placeholder="you@example.com"
                              value={formData.email}
                              onChange={(e) => {
                                setFormData((prev) => ({ ...prev, email: e.target.value }));
                                if (step1Errors.email) {
                                  setStep1Errors((prev) => ({ ...prev, email: "" }));
                                }
                              }}
                              onKeyDown={(e) => {
                                if (e.key === "Enter") e.preventDefault();
                              }}
                              className="w-full text-xs sm:text-sm text-gray-800 outline-none focus:outline-none border-none bg-transparent placeholder:text-gray-400 font-normal min-w-0"
                            />
                            {isEmailValid(formData.email) && (
                              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 animate-in zoom-in-75 duration-200" />
                            )}
                          </div>
                          {step1Errors.email && (
                            <p className="text-[11px] text-red-500 mt-1">
                              {step1Errors.email}
                            </p>
                          )}
                        </div>

                        {/* Travel Date & Guests Row */}
                        <div className="grid grid-cols-2 gap-2">
                          {/* Travel Date */}
                          <div className="min-w-0">
                            <label className="block text-xs font-medium text-gray-700 mb-1 truncate">
                              Travel Date <span className="text-red-500">*</span>
                            </label>
                            <BankingDatePicker
                              value={formData.travelDate}
                              onChange={(dateStr) => {
                                setFormData((prev) => ({
                                  ...prev,
                                  travelDate: dateStr,
                                }));
                                if (step1Errors.travelDate) {
                                  setStep1Errors((prev) => ({
                                    ...prev,
                                    travelDate: "",
                                  }));
                                }
                              }}
                              placeholder="Select Date"
                              className="w-full"
                              align="center"
                              centerModal={true}
                            />
                            {step1Errors.travelDate && (
                              <p className="text-[11px] text-red-500 mt-1">
                                {step1Errors.travelDate}
                              </p>
                            )}
                          </div>

                          {/* Guests */}
                          <div className="min-w-0">
                            <label className="block text-xs font-medium text-gray-700 mb-1 truncate">
                              Guests <span className="text-red-500">*</span>
                            </label>
                            <div className="flex items-center gap-2 px-3 h-[46px] rounded-lg border border-gray-300 focus-within:border-[#1877F2] bg-white transition-colors">
                              <Users className="w-4 h-4 text-gray-400 shrink-0" />
                              <input
                                type="number"
                                min="1"
                                max="99"
                                placeholder="e.g. 2"
                                value={formData.guests || ""}
                                onChange={(e) => {
                                  const val =
                                    e.target.value === ""
                                      ? 0
                                      : parseInt(e.target.value);
                                  setFormData((prev) => ({
                                    ...prev,
                                    guests: val,
                                  }));
                                  if (val > 0) setAdults(val);
                                  if (step1Errors.guests) {
                                    setStep1Errors((prev) => ({
                                      ...prev,
                                      guests: "",
                                    }));
                                  }
                                }}
                                className="w-full text-xs sm:text-sm text-gray-800 outline-none focus:outline-none border-none bg-transparent placeholder:text-gray-400 font-normal min-w-0"
                              />
                            </div>
                            {step1Errors.guests && (
                              <p className="text-[11px] text-red-500 mt-1">
                                {step1Errors.guests}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* ═══ STEP 2: DURATION (Show one by one) ═══ */}
                    {currentStep === 2 && (
                      <div className="space-y-3">
                        <div>
                          <h4 className="text-xs sm:text-sm font-semibold text-gray-800 mb-2">
                            How long are you planning to travel for?
                          </h4>
                          <div className="space-y-2">
                            {DURATION_OPTIONS.map((opt) => {
                              const isSelected = selectedDuration === opt.label;
                              return (
                                <button
                                  key={opt.id}
                                  type="button"
                                  onClick={() => setSelectedDuration(opt.label)}
                                  className={`w-full py-2.5 px-3 rounded-lg border text-left flex items-center justify-between transition-colors cursor-pointer outline-none focus:outline-none ${
                                    isSelected
                                      ? "border-[#1877F2] bg-blue-50/20"
                                      : "border-gray-200 hover:border-gray-300 bg-white"
                                  }`}
                                >
                                  <div className="flex items-center gap-2.5 min-w-0">
                                    <div
                                      className={`w-4.5 h-4.5 rounded-full border-[1.5px] flex items-center justify-center shrink-0 transition-all ${
                                        isSelected
                                          ? "border-[#1877F2] bg-white shadow-2xs"
                                          : "border-gray-300 bg-white hover:border-gray-400"
                                      }`}
                                    >
                                      {isSelected && (
                                        <div className="w-2 h-2 rounded-full bg-[#1877F2]" />
                                      )}
                                    </div>
                                    <span className="text-xs sm:text-sm text-gray-800 font-normal">
                                      {opt.label}
                                    </span>
                                  </div>

                                  {opt.isRecommended && (
                                    <span className="text-[9.5px] font-bold text-emerald-700 uppercase tracking-wider shrink-0 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60">
                                      Suggested
                                    </span>
                                  )}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* ═══ STEP 3: TRAVEL MODE ═══ */}
                    {currentStep === 3 && (
                      <div className="space-y-3">
                        <div>
                          <h4 className="text-xs sm:text-sm font-semibold text-gray-800 mb-1.5">
                            Preferred Mode of Travel
                          </h4>
                          <div className="grid grid-cols-2 gap-2">
                            {PREFERRED_TRAVEL_OPTIONS.map((opt) => {
                              const isSelected = preferredTravel === opt.id;
                              const Icon = opt.icon;
                              return (
                                <button
                                  key={opt.id}
                                  type="button"
                                  onClick={() => setPreferredTravel(opt.id)}
                                  className={`p-2.5 rounded-lg border text-left flex items-center gap-2.5 transition-colors cursor-pointer outline-none focus:outline-none ${
                                    isSelected
                                      ? "border-[#1877F2] bg-blue-50/20"
                                      : "border-gray-200 hover:border-gray-300 bg-white"
                                  }`}
                                >
                                  <Icon
                                    className={`w-4 h-4 shrink-0 ${
                                      isSelected
                                        ? "text-[#1877F2]"
                                        : "text-gray-500"
                                    }`}
                                  />
                                  <span className="text-xs sm:text-sm font-normal text-gray-800 truncate">
                                    {opt.label}
                                  </span>
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        {/* Travellers Breakdown */}
                        <div className="pt-2 border-t border-gray-100">
                          <h4 className="text-xs sm:text-sm font-semibold text-gray-800 mb-1.5">
                            Travellers Breakdown
                          </h4>
                          <div className="grid grid-cols-2 gap-2">
                            <div className="flex items-center justify-between p-2 rounded-lg bg-gray-50 border border-gray-200">
                              <span className="text-xs text-gray-600">Adults (12+)</span>
                              <div className="flex items-center gap-2">
                                <button
                                  type="button"
                                  onClick={() => setAdults((prev) => Math.max(1, prev - 1))}
                                  className="w-5 h-5 rounded bg-white border border-gray-300 flex items-center justify-center text-xs"
                                >
                                  -
                                </button>
                                <span className="text-xs font-semibold">{adults}</span>
                                <button
                                  type="button"
                                  onClick={() => setAdults((prev) => prev + 1)}
                                  className="w-5 h-5 rounded bg-white border border-gray-300 flex items-center justify-center text-xs"
                                >
                                  +
                                </button>
                              </div>
                            </div>
                            <div className="flex items-center justify-between p-2 rounded-lg bg-gray-50 border border-gray-200">
                              <span className="text-xs text-gray-600">Kids (2-11)</span>
                              <div className="flex items-center gap-2">
                                <button
                                  type="button"
                                  onClick={() => setChildren((prev) => Math.max(0, prev - 1))}
                                  className="w-5 h-5 rounded bg-white border border-gray-300 flex items-center justify-center text-xs"
                                >
                                  -
                                </button>
                                <span className="text-xs font-semibold">{children}</span>
                                <button
                                  type="button"
                                  onClick={() => setChildren((prev) => prev + 1)}
                                  className="w-5 h-5 rounded bg-white border border-gray-300 flex items-center justify-center text-xs"
                                >
                                  +
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* ═══ STEP 4: ACCOMMODATION & SERVICES ═══ */}
                    {currentStep === 4 && (
                      <div className="space-y-3">
                        <div>
                          <h4 className="text-xs sm:text-sm font-semibold text-gray-800 mb-1.5">
                            Hotel Category
                          </h4>
                          <div className="grid grid-cols-2 gap-2">
                            {HOTEL_OPTIONS.map((opt) => {
                              const isSelected = selectedHotel === opt.id;
                              const Icon = opt.icon;
                              return (
                                <button
                                  key={opt.id}
                                  type="button"
                                  onClick={() => setSelectedHotel(opt.id)}
                                  className={`p-2.5 rounded-lg border text-left flex items-center gap-2 transition-colors cursor-pointer outline-none focus:outline-none ${
                                    isSelected
                                      ? "border-[#1877F2] bg-blue-50/20"
                                      : "border-gray-200 hover:border-gray-300 bg-white"
                                  }`}
                                >
                                  <Icon
                                    className={`w-4 h-4 shrink-0 ${
                                      isSelected
                                        ? "text-[#1877F2]"
                                        : "text-gray-500"
                                    }`}
                                  />
                                  <span className="text-xs sm:text-sm font-normal text-gray-800 truncate">
                                    {opt.label}
                                  </span>
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        {/* Add-on Services */}
                        <div className="pt-2 border-t border-gray-100">
                          <h4 className="text-xs sm:text-sm font-semibold text-gray-800 mb-1.5">
                            Add-on Services
                          </h4>
                          <div className="grid grid-cols-2 gap-1.5">
                            {SERVICE_OPTIONS.map((opt) => {
                              const isSelected = selectedServices.includes(opt.id);
                              return (
                                <button
                                  key={opt.id}
                                  type="button"
                                  onClick={() => toggleService(opt.id)}
                                  className={`py-1.5 px-2 rounded-lg border text-left flex items-center justify-between text-xs transition-colors cursor-pointer outline-none focus:outline-none ${
                                    isSelected
                                      ? "border-[#1877F2] bg-blue-50/20 text-[#1877F2] font-medium"
                                      : "border-gray-200 text-gray-700 bg-white"
                                  }`}
                                >
                                  <span className="truncate">{opt.label}</span>
                                  {isSelected && (
                                    <CheckCircle2 className="w-3.5 h-3.5 text-[#1877F2] shrink-0 ml-1" />
                                  )}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* ═══ STEP 5: REVIEW & SUBMIT ═══ */}
                    {currentStep === 5 && (
                      <div className="space-y-3">
                        <div>
                          <label className="block text-xs font-semibold text-gray-800 mb-1">
                            Special Requests / Notes (Optional)
                          </label>
                          <textarea
                            rows={3}
                            placeholder="Tell us about destinations, budget, preferences, or questions..."
                            value={specialNotes}
                            onChange={(e) => setSpecialNotes(e.target.value)}
                            className="w-full text-xs sm:text-sm p-2.5 rounded-lg border border-gray-300 focus:border-[#1877F2] outline-none text-gray-800 placeholder:text-gray-400 font-normal resize-none"
                          />
                        </div>

                        {/* Selections Summary */}
                        <div className="p-2.5 bg-gray-50 rounded-lg border border-gray-200 text-xs text-gray-600 space-y-1">
                          <div className="flex justify-between">
                            <span>Traveler:</span>
                            <span className="font-semibold text-gray-900">
                              {formData.name} ({countryCode} {formData.phone})
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Date & Duration:</span>
                            <span className="font-semibold text-gray-900">
                              {formData.travelDate} • {selectedDuration}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Travel Mode & Stay:</span>
                            <span className="font-semibold text-gray-900 capitalize">
                              {preferredTravel} • {selectedHotel}
                            </span>
                          </div>
                        </div>

                        <div className="p-2 bg-emerald-50/80 border border-emerald-200 rounded-lg flex items-center gap-2">
                          <MdVerifiedUser className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span className="text-[11px] text-emerald-950">
                            Verified Holiday Specialist assigned within 15 minutes.
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* ─── Pinned Bottom Navigation Buttons ─── */}
                  <div className="pt-2 border-t border-gray-100 flex items-center gap-2 shrink-0">
                    {currentStep > 1 && (
                      <button
                        type="button"
                        onClick={handleBack}
                        className="py-2.5 px-3.5 rounded-lg border border-gray-300 hover:border-gray-400 bg-white text-gray-700 text-xs sm:text-sm font-medium flex items-center gap-1 transition-colors cursor-pointer outline-none focus:outline-none"
                      >
                        <ChevronLeft className="w-3.5 h-3.5" />
                        <span>Back</span>
                      </button>
                    )}

                    {currentStep < 5 ? (
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-1 py-2.5 px-4 rounded-lg bg-[#1877F2] hover:bg-[#00285C] active:scale-[0.99] text-white text-xs sm:text-sm font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer outline-none focus:outline-none shadow-xs disabled:opacity-70"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            <span>Submitting...</span>
                          </>
                        ) : currentStep === 1 ? (
                          <>
                            <Send className="w-3.5 h-3.5" />
                            <span>Send Enquiry</span>
                          </>
                        ) : (
                          <>
                            <span>
                              {currentStep === 2
                                ? "Next: Travel Mode"
                                : currentStep === 3
                                ? "Next: Accommodation"
                                : "Next: Review & Submit"}
                            </span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </>
                        )}
                      </button>
                    ) : (
                      /* Step 5: Manual submit click only */
                      <button
                        type="button"
                        onClick={() => handleFinalSubmit()}
                        disabled={isSubmitting}
                        className="flex-1 py-2.5 px-4 rounded-lg bg-[#1877F2] hover:bg-[#00285C] active:scale-[0.99] text-white text-xs sm:text-sm font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer outline-none focus:outline-none shadow-xs disabled:opacity-70"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            <span>Submitting...</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-3.5 h-3.5" />
                            <span>Submit Details</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
