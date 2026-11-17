"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Clock,
  Tag,
  Share2,
  Send,
  ArrowDown,
  Download,
  User,
  Phone,
  Mail,
  Check,
  ChevronLeft,
  ArrowRight,
  Plus,
  Minus,
  Sparkles,
  Plane,
  Train,
  FileCheck,
  ShieldCheck,
  Smartphone,
  RotateCcw,
  Users,
  Calendar,
  X,
} from "lucide-react";
import CountryPhoneSelect from "@/components/shared/CountryPhoneSelect";
import BankingDatePicker from "@/components/shared/DateTimePicker";
import { useAuth } from "@/components/shared/AuthContext";
import { MdVerifiedUser } from "react-icons/md";
import { createPortal } from "react-dom";
import { useScrollLock } from "@/components/shared/useScrollLock";

interface PackageBookingSidebarProps {
  title: string;
  price: number;
  originalPrice: number;
  savings: number;
  duration: string;
  nights?: number;
  days?: number;
}

const TOUR_PLAN_DATES = [
  { id: "5days", label: "In 5 Days" },
  { id: "15days", label: "In 15 Days" },
  { id: "1month", label: "In 1 Month" },
  { id: "2months", label: "In 2-3 Months" },
];

const DURATION_OPTIONS = [
  { id: "3-4", label: "3-4 Days" },
  { id: "5-6", label: "5-6 Days", isRecommended: true },
  { id: "7-8", label: "7-8 Days" },
  { id: "8-10", label: "8-10 Days" },
];

const ITINERARY_OPTIONS = [
  {
    id: "relaxed",
    title: "Relaxed",
    desc: "Chill Mode: Just one fun thing a day, I'm here to relax.",
  },
  {
    id: "easy",
    title: "Easy",
    desc: "Easy & Breezy: 1–2 activities a day, with plenty of downtime.",
  },
  {
    id: "balanced",
    title: "Balanced",
    desc: "See-It-All: Hit all the must-dos and big attractions, nice and balanced.",
  },
  {
    id: "packed",
    title: "Packed",
    desc: "Non-Stop Explorer: Pack it up, I want to make the most of every day!",
  },
];

const MEAL_OPTIONS = [
  { id: "breakfast", label: "Only breakfast" },
  { id: "all_meals", label: "Include all meals" },
];

const TRANSPORT_OPTIONS = [
  { id: "flights", label: "Flights", icon: Plane },
  { id: "train", label: "Train", icon: Train },
];

const SERVICE_OPTIONS = [
  { id: "visa", label: "Visa", icon: FileCheck },
  { id: "insurance", label: "Travel Insurance", icon: ShieldCheck },
  { id: "esim", label: "eSIM", icon: Smartphone },
];

/**
 * Renders the package booking sidebar card with a self-contained multi-step flow.
 * Consistent input font sizes, no outline halos, no travel date dropdown.
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

  // Step state: 1 (Details), 2 (Duration), 3 (Travellers), 4 (Itinerary), 5 (Meals & Services)
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [step1Errors, setStep1Errors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  // Step 1: User Details (Name, Phone, Email, Travel Date, Guests)
  const [sidebarForm, setSidebarForm] = useState({
    name: "",
    phone: "",
    email: "",
    travelDate: "",
    guests: 2,
  });

  // Step 2: Tour Plan Date & Duration
  const [selectedPlanDate, setSelectedPlanDate] = useState<string>("In 1 Month");
  const [selectedDuration, setSelectedDuration] = useState<string>("5-6 Days");

  // Step 3: Preferred Travel Mode & Travellers breakdown
  const [preferredTravel, setPreferredTravel] = useState<string>("flights");
  const [adults, setAdults] = useState<number>(2);
  const [children, setChildren] = useState<number>(0);
  const [infants, setInfants] = useState<number>(0);
  const [seniors, setSeniors] = useState<number>(0);

  // Step 4: Itinerary
  const [selectedItinerary, setSelectedItinerary] = useState<string>("easy");

  // Step 5: Meal Plan & Services & Transport
  const [selectedTransport, setSelectedTransport] = useState<string[]>([
    "flights",
  ]);
  const [selectedMeal, setSelectedMeal] = useState<string>("all_meals");
  const [selectedServices, setSelectedServices] = useState<string[]>([
    "insurance",
  ]);

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

  const [mounted, setMounted] = useState<boolean>(false);
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);

  // Automatically open the booking enquiry modal after 5 seconds on the travel details page
  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => {
      setIsPopupOpen(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  useScrollLock(isPopupOpen);

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
    // If mobile viewport (< 1024px), open the popup modal directly
    if (typeof window !== "undefined" && window.innerWidth < 1024) {
      setIsPopupOpen(true);
      return;
    }
    if (bookingFormRef.current) {
      bookingFormRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
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

  const totalTravellers = adults + children + infants + seniors;
  const displayName = sidebarForm.name.trim()
    ? sidebarForm.name.trim().split(" ")[0]
    : user?.name
      ? user.name.split(" ")[0]
      : "Traveler";

  const validateStep1 = () => {
    const errors: { [key: string]: string } = {};
    if (!sidebarForm.name.trim()) errors.name = "Please enter your name";
    if (!sidebarForm.phone.trim()) {
      errors.phone = "Please enter your phone number";
    } else if (sidebarForm.phone.trim().length < 7) {
      errors.phone = "Please enter a valid phone number";
    }
    if (!sidebarForm.email.trim()) {
      errors.email = "Please enter your email";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(sidebarForm.email.trim())) {
      errors.email = "Please enter a valid email address";
    }
    if (!sidebarForm.travelDate.trim()) {
      errors.travelDate = "Please select travel date";
    }
    if (!sidebarForm.guests || sidebarForm.guests < 1) {
      errors.guests = "Please enter number of guests";
    }
    setStep1Errors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNext = () => {
    if (currentStep === 1) {
      if (!validateStep1()) return;
    }
    if (currentStep === 3 && totalTravellers === 0) return;
    if (currentStep < 5) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const toggleTransport = (id: string) => {
    setSelectedTransport((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleService = (id: string) => {
    setSelectedServices((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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

  const handleResetForm = () => {
    setCurrentStep(1);
    setIsSubmitted(false);
    setSidebarForm({
      name: "",
      phone: "",
      email: "",
      travelDate: "",
      guests: 2,
    });
    setAdults(2);
    setChildren(0);
    setInfants(0);
    setSeniors(0);
    setSelectedPlanDate("In 1 Month");
    setPreferredTravel("flights");
    setSelectedServices(["insurance"]);
  };

  const renderFormContent = () => (
    isSubmitted ? (
      /* ═══ SUCCESS CONFIRMATION IN BOX (Fixed Stable Height) ═══ */
      <div className="py-2 text-center flex flex-col justify-between h-[420px] max-h-[420px] animate-in fade-in duration-300">
        <div>
          <div className="w-10 h-10 text-emerald-600 flex items-center justify-center mx-auto mb-1">
            <MdVerifiedUser className="w-8 h-8 text-emerald-600" />
          </div>
          <h3 className="text-base font-bold text-gray-900">
            Awesome {displayName}!
          </h3>
          <p className="text-xs sm:text-sm text-gray-600 mt-0.5">
            Your personalized booking request has been received.
          </p>
        </div>

        {/* Summary */}
        <div className="bg-gray-50 rounded-lg p-3 border border-gray-200 text-left space-y-1.5 text-xs sm:text-sm text-gray-700">
          <div className="flex justify-between py-0.5 border-b border-gray-200/60">
            <span className="text-gray-500">Travel Date:</span>
            <span className="font-semibold text-gray-900">
              {sidebarForm.travelDate || "Flexible"}
            </span>
          </div>
          <div className="flex justify-between py-0.5 border-b border-gray-200/60">
            <span className="text-gray-500">Guests:</span>
            <span className="font-semibold text-gray-900">
              {sidebarForm.guests} {sidebarForm.guests === 1 ? "Guest" : "Guests"}
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
              {preferredTravel === "flights" ? "Flight" : "Train"}
            </span>
          </div>
          <div className="flex justify-between py-0.5 border-b border-gray-200/60">
            <span className="text-gray-500">Meal Plan:</span>
            <span className="font-semibold text-gray-900">
              {selectedMeal === "all_meals"
                ? "Include all meals"
                : "Only breakfast"}
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
              {countryCode} {sidebarForm.phone}
            </strong>{" "}
            within 15 minutes.
          </p>
        </div>

        <button
          type="button"
          onClick={handleResetForm}
          className="w-full py-2.5 rounded-lg border border-gray-300 hover:border-gray-400 bg-white hover:bg-gray-50 text-gray-700 font-medium text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-colors cursor-pointer outline-none focus:outline-none"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Book Another Date / Edit</span>
        </button>
      </div>
    ) : (
      <form
        onSubmit={handleFinalSubmit}
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
              {currentStep === 2 && "Duration"}
              {currentStep === 3 && "Travellers"}
              {currentStep === 4 && "Itinerary"}
              {currentStep === 5 && "Meals & Services"}
            </span>
          </div>
          {/* Clean Progress Bar (no outline) */}
          <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#1877F2] rounded-full transition-all duration-300 ease-out"
              style={{ width: `${(currentStep / 5) * 100}%` }}
            />
          </div>
        </div>

        {/* ─── Scrollable Step Body with Fixed/Consistent Height ─── */}
        <div className="flex-1 py-2 overflow-y-auto min-h-0 pr-0.5">
          {/* ═══ STEP 1: CONTACT DETAILS (No travel date dropdown) ═══ */}
          {currentStep === 1 && (
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Your Name <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center gap-2 px-3 py-3 rounded-lg border border-gray-300 focus-within:border-[#1877F2] bg-white transition-colors">
                <User className="w-4 h-4 text-gray-400 shrink-0" />
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={sidebarForm.name}
                  onChange={(e) => {
                    setSidebarForm({
                      ...sidebarForm,
                      name: e.target.value,
                    });
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

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <div className="relative flex items-center rounded-lg border border-gray-300 focus-within:border-[#1877F2] bg-white transition-colors">
                <CountryPhoneSelect
                  value={countryCode}
                  onChange={(code) => setCountryCode(code)}
                  buttonClassName="rounded-l-lg py-3 border-none outline-none focus:outline-none"
                />
                <div className="flex items-center gap-2 px-3 py-2 flex-1 min-w-0">
                  <Phone className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                  <input
                    type="tel"
                    placeholder="Enter your number"
                    value={sidebarForm.phone}
                    onChange={(e) => {
                      setSidebarForm({
                        ...sidebarForm,
                        phone: e.target.value,
                      });
                      if (step1Errors.phone) {
                        setStep1Errors((prev) => ({
                          ...prev,
                          phone: "",
                        }));
                      }
                    }}
                    className="w-full text-xs sm:text-sm text-gray-800 outline-none focus:outline-none border-none bg-transparent placeholder:text-gray-400 font-normal min-w-0"
                  />
                </div>
              </div>
              {step1Errors.phone && (
                <p className="text-[11px] text-red-500 mt-1">
                  {step1Errors.phone}
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Email Address <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center gap-2 px-3 py-3 rounded-lg border border-gray-300 focus-within:border-[#1877F2] bg-white transition-colors">
                <Mail className="w-4 h-4 text-gray-400 shrink-0" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={sidebarForm.email}
                  onChange={(e) => {
                    setSidebarForm({
                      ...sidebarForm,
                      email: e.target.value,
                    });
                    if (step1Errors.email) {
                      setStep1Errors((prev) => ({
                        ...prev,
                        email: "",
                      }));
                    }
                  }}
                  className="w-full text-xs sm:text-sm text-gray-800 outline-none focus:outline-none border-none bg-transparent placeholder:text-gray-400 font-normal"
                />
              </div>
              {step1Errors.email && (
                <p className="text-[11px] text-red-500 mt-1">
                  {step1Errors.email}
                </p>
              )}
            </div>

            {/* Travel Date & Guest Number Row */}
            <div className="grid grid-cols-2 gap-2">
              {/* Travel Date */}
              <div className="min-w-0">
                <label className="block text-xs font-medium text-gray-700 mb-1 truncate">
                  Travel Date <span className="text-red-500">*</span>
                </label>
                <BankingDatePicker
                  value={sidebarForm.travelDate}
                  onChange={(dateStr) => {
                    setSidebarForm((prev) => ({
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

              {/* Guest Number */}
              <div className="min-w-0">
                <label className="block text-xs font-medium text-gray-700 mb-1 truncate">
                  Number of Guests <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center gap-2 px-3 h-[46px] rounded-lg border border-gray-300 focus-within:border-[#1877F2] bg-white transition-colors">
                  <Users className="w-4 h-4 text-gray-400 shrink-0" />
                  <input
                    type="number"
                    min="1"
                    max="99"
                    placeholder="e.g. 2"
                    value={sidebarForm.guests || ""}
                    onChange={(e) => {
                      const val = e.target.value === "" ? 0 : parseInt(e.target.value);
                      setSidebarForm((prev) => ({
                        ...prev,
                        guests: val,
                      }));
                      if (val > 0) {
                        setAdults(val);
                      }
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

        {/* ═══ STEP 2: DURATION ═══ */}
        {currentStep === 2 && (
          <div className="space-y-3">
            {/* Duration Selection */}
            <div>
              <h4 className="text-xs sm:text-sm font-semibold text-gray-800 mb-1.5">
                How long are you planning to travel for?
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {DURATION_OPTIONS.map((opt) => {
                  const isSelected = selectedDuration === opt.label;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setSelectedDuration(opt.label)}
                      className={`py-2 px-2.5 rounded-lg border text-left flex items-center justify-between transition-colors cursor-pointer outline-none focus:outline-none ${isSelected
                        ? "border-[#1877F2] bg-blue-50/20"
                        : "border-gray-200 hover:border-gray-300 bg-white"
                        }`}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <div
                          className={`w-4.5 h-4.5 rounded-full border-[1.5px] flex items-center justify-center shrink-0 transition-all ${isSelected
                            ? "border-[#1877F2] bg-white shadow-2xs"
                            : "border-gray-300 bg-white hover:border-gray-400"
                            }`}
                        >
                          {isSelected && (
                            <div className="w-2 h-2 rounded-full bg-[#1877F2]" />
                          )}
                        </div>
                        <span className="text-xs sm:text-sm text-gray-800 font-normal truncate">
                          {opt.label}
                        </span>
                      </div>

                      {opt.isRecommended && (
                        <span className="text-[9px] font-bold text-emerald-700 uppercase tracking-wider shrink-0">
                          sugested
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ═══ STEP 3: TRAVEL MODE & TRAVELLERS ═══ */}
        {currentStep === 3 && (
          <div className="space-y-3">
            {/* Preferred Travel Mode Selection */}
            <div>
              <h4 className="text-xs sm:text-sm font-semibold text-gray-800 mb-1.5">
                Which travel mode do you prefer?
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {TRANSPORT_OPTIONS.map((tr) => {
                  const isSelected = preferredTravel === tr.id;
                  const IconComp = tr.icon;
                  return (
                    <button
                      key={tr.id}
                      type="button"
                      onClick={() => setPreferredTravel(tr.id)}
                      className={`py-2 px-2.5 rounded-lg border text-left flex items-center justify-between transition-colors cursor-pointer outline-none focus:outline-none ${isSelected
                        ? "border-[#1877F2] bg-blue-50/20"
                        : "border-gray-200 hover:border-gray-300 bg-white"
                        }`}
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-4.5 h-4.5 rounded-full border-[1.5px] flex items-center justify-center shrink-0 transition-all ${isSelected
                            ? "border-[#1877F2] bg-white shadow-2xs"
                            : "border-gray-300 bg-white hover:border-gray-400"
                            }`}
                        >
                          {isSelected && (
                            <div className="w-2 h-2 rounded-full bg-[#1877F2]" />
                          )}
                        </div>
                        <span className="text-xs sm:text-sm font-normal text-gray-800">
                          {tr.label}
                        </span>
                      </div>
                      <IconComp className="w-4 h-4 text-gray-400" />
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <div className="mb-1">
                <h4 className="text-xs sm:text-sm font-semibold text-gray-800">
                  Who are you planning this vacation with?
                </h4>
                {totalTravellers === 0 && (
                  <p className="text-[11px] text-red-500 font-medium mt-0.5">
                    Please select at least one traveller.
                  </p>
                )}
              </div>

              <div className="space-y-2">
                {/* Adults */}
                <div className="py-2 px-3 rounded-lg border border-gray-200 bg-white flex items-center justify-between">
                  <div>
                    <span className="text-xs sm:text-sm font-medium text-gray-800 block">
                      Adults
                    </span>
                    <span className="text-[11px] text-gray-400 block">
                      18-60 years
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setAdults((c) => Math.max(0, c - 1))}
                      disabled={adults <= 0}
                      className="w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-40 flex items-center justify-center text-gray-700 cursor-pointer outline-none focus:outline-none"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-5 text-center text-xs sm:text-sm font-semibold text-gray-900">
                      {adults}
                    </span>
                    <button
                      type="button"
                      onClick={() => setAdults((c) => c + 1)}
                      className="w-7 h-7 rounded-full bg-blue-50 hover:bg-blue-100 text-[#1877F2] flex items-center justify-center cursor-pointer outline-none focus:outline-none"
                    >
                      <Plus className="w-3 h-3 stroke-[2.5]" />
                    </button>
                  </div>
                </div>

                {/* Children */}
                <div className="py-2 px-3 rounded-lg border border-gray-200 bg-white flex items-center justify-between">
                  <div>
                    <span className="text-xs sm:text-sm font-medium text-gray-800 block">
                      Children
                    </span>
                    <span className="text-[11px] text-gray-400 block">
                      5-18 years
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        setChildren((c) => Math.max(0, c - 1))
                      }
                      disabled={children <= 0}
                      className="w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-40 flex items-center justify-center text-gray-700 cursor-pointer outline-none focus:outline-none"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-5 text-center text-xs sm:text-sm font-semibold text-gray-900">
                      {children}
                    </span>
                    <button
                      type="button"
                      onClick={() => setChildren((c) => c + 1)}
                      className="w-7 h-7 rounded-full bg-blue-50 hover:bg-blue-100 text-[#1877F2] flex items-center justify-center cursor-pointer outline-none focus:outline-none"
                    >
                      <Plus className="w-3 h-3 stroke-[2.5]" />
                    </button>
                  </div>
                </div>

                {/* Infants */}
                <div className="py-2 px-3 rounded-lg border border-gray-200 bg-white flex items-center justify-between">
                  <div>
                    <span className="text-xs sm:text-sm font-medium text-gray-800 block">
                      Infants or Toddlers
                    </span>
                    <span className="text-[11px] text-gray-400 block">
                      0-5 years
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setInfants((c) => Math.max(0, c - 1))}
                      disabled={infants <= 0}
                      className="w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-40 flex items-center justify-center text-gray-700 cursor-pointer outline-none focus:outline-none"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-5 text-center text-xs sm:text-sm font-semibold text-gray-900">
                      {infants}
                    </span>
                    <button
                      type="button"
                      onClick={() => setInfants((c) => c + 1)}
                      className="w-7 h-7 rounded-full bg-blue-50 hover:bg-blue-100 text-[#1877F2] flex items-center justify-center cursor-pointer outline-none focus:outline-none"
                    >
                      <Plus className="w-3 h-3 stroke-[2.5]" />
                    </button>
                  </div>
                </div>

                {/* Senior Citizens */}
                <div className="py-2 px-3 rounded-lg border border-gray-200 bg-white flex items-center justify-between">
                  <div>
                    <span className="text-xs sm:text-sm font-medium text-gray-800 block">
                      Senior Citizens
                    </span>
                    <span className="text-[11px] text-gray-400 block">
                      60+ years
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setSeniors((c) => Math.max(0, c - 1))}
                      disabled={seniors <= 0}
                      className="w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-40 flex items-center justify-center text-gray-700 cursor-pointer outline-none focus:outline-none"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-5 text-center text-xs sm:text-sm font-semibold text-gray-900">
                      {seniors}
                    </span>
                    <button
                      type="button"
                      onClick={() => setSeniors((c) => c + 1)}
                      className="w-7 h-7 rounded-full bg-blue-50 hover:bg-blue-100 text-[#1877F2] flex items-center justify-center cursor-pointer outline-none focus:outline-none"
                    >
                      <Plus className="w-3 h-3 stroke-[2.5]" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ═══ STEP 4: ITINERARY STYLE ═══ */}
        {currentStep === 4 && (
          <div className="space-y-2">
            <h4 className="text-xs sm:text-sm font-semibold text-gray-800 mb-1">
              How do you want your itinerary?
            </h4>

            <div className="space-y-2">
              {ITINERARY_OPTIONS.map((item) => {
                const isSelected = selectedItinerary === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSelectedItinerary(item.id)}
                    className={`w-full py-2.5 px-3 rounded-lg border text-left flex items-start gap-2.5 transition-colors cursor-pointer outline-none focus:outline-none ${isSelected
                      ? "border-[#1877F2] bg-blue-50/20"
                      : "border-gray-200 hover:border-gray-300 bg-white"
                      }`}
                  >
                    <div
                      className={`w-4.5 h-4.5 rounded-full border-[1.5px] flex items-center justify-center mt-0.5 shrink-0 transition-all ${isSelected
                        ? "border-[#1877F2] bg-white shadow-2xs"
                        : "border-gray-300 bg-white hover:border-gray-400"
                        }`}
                    >
                      {isSelected && (
                        <div className="w-2 h-2 rounded-full bg-[#1877F2]" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <span className="text-xs sm:text-sm font-medium text-gray-800 block">
                        {item.title}
                      </span>
                      <p className="text-[11px] text-gray-500 mt-0.5 leading-snug">
                        {item.desc}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ═══ STEP 5: MEAL PLAN & SERVICES ═══ */}
        {currentStep === 5 && (
          <div className="space-y-3">
            {/* Meal Plan */}
            <div>
              <h4 className="text-xs sm:text-sm font-semibold text-gray-800 mb-1.5">
                What kind of meal plan would you prefer?
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {MEAL_OPTIONS.map((opt) => {
                  const isSelected = selectedMeal === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setSelectedMeal(opt.id)}
                      className={`py-2 px-2.5 rounded-lg border text-left flex items-center gap-2 transition-colors cursor-pointer outline-none focus:outline-none ${isSelected
                        ? "border-[#1877F2] bg-blue-50/20"
                        : "border-gray-200 hover:border-gray-300 bg-white"
                        }`}
                    >
                      <div
                        className={`w-4 h-4 rounded-full border-[1.5px] flex items-center justify-center shrink-0 transition-all ${isSelected
                          ? "border-[#1877F2] bg-white shadow-2xs"
                          : "border-gray-300 bg-white hover:border-gray-400"
                          }`}
                      >
                        {isSelected && (
                          <div className="w-2 h-2 rounded-full bg-[#1877F2]" />
                        )}
                      </div>
                      <span className="text-xs sm:text-sm font-normal text-gray-800 truncate">
                        {opt.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Additional Services */}
            <div>
              <h4 className="text-xs sm:text-sm font-semibold text-gray-800 mb-1.5">
                What all services you need?
              </h4>
              <div className="grid grid-cols-3 gap-1.5">
                {SERVICE_OPTIONS.map((srv) => {
                  const isSelected = selectedServices.includes(srv.id);
                  const IconComp = srv.icon;
                  return (
                    <button
                      key={srv.id}
                      type="button"
                      onClick={() => toggleService(srv.id)}
                      className={`py-2 px-2 rounded-lg border text-left flex items-center justify-between transition-colors cursor-pointer outline-none focus:outline-none ${isSelected
                        ? "border-[#1877F2] bg-blue-50/20"
                        : "border-gray-200 hover:border-gray-300 bg-white"
                        }`}
                    >
                      <div className="flex items-center gap-1 min-w-0">
                        <div
                          className={`w-3 h-3 rounded-xs border flex items-center justify-center shrink-0 ${isSelected
                            ? "border-[#1877F2] bg-[#1877F2] text-white"
                            : "border-gray-300 bg-white text-transparent"
                            }`}
                        >
                          <Check className="w-2 h-2 stroke-[3]" />
                        </div>
                        <span className="text-[11px] sm:text-xs font-normal text-gray-800 truncate">
                          {srv.label}
                        </span>
                      </div>
                      <IconComp className="w-3 h-3 text-gray-400 shrink-0 ml-0.5" />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
        </div>

        {/* ─── Navigation Buttons (Pinned at Bottom) ─── */}
        <div className="pt-2.5 mt-auto border-t border-gray-100 flex items-center gap-2 shrink-0">
          {currentStep > 1 && (
            <button
              type="button"
              onClick={handleBack}
              className="py-2.5 px-3 rounded-lg border border-gray-300 hover:border-gray-400 bg-white hover:bg-gray-50 text-gray-700 font-medium text-xs sm:text-sm flex items-center gap-1 transition-colors cursor-pointer shrink-0 outline-none focus:outline-none"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
          )}

          {currentStep === 1 ? (
            <button
              type="button"
              onClick={handleNext}
              className="flex-1 py-2.5 rounded-lg bg-[#1877F2] hover:bg-[#00285C] text-white font-medium text-xs sm:text-sm transition-colors cursor-pointer flex items-center justify-center gap-1.5 outline-none focus:outline-none shadow-xs"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send Enquiry</span>
            </button>
          ) : currentStep < 5 ? (
            <button
              type="button"
              onClick={handleNext}
              disabled={currentStep === 3 && totalTravellers === 0}
              className="flex-1 py-2.5 rounded-lg bg-[#1877F2] hover:bg-[#00285C] disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium text-xs sm:text-sm transition-colors cursor-pointer flex items-center justify-center gap-1.5 outline-none focus:outline-none"
            >
              <span>Next</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 py-2.5 rounded-lg bg-[#1877F2] hover:bg-[#00285C] disabled:opacity-50 text-white font-medium text-xs sm:text-sm transition-colors cursor-pointer flex items-center justify-center gap-1.5 outline-none focus:outline-none shadow-xs"
            >
              <Check className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>{isSubmitting ? "Submitting..." : "Submit"}</span>
            </button>
          )}
        </div>
      </form>
    )
  );

  return (
    <>
      {/* ════ RIGHT COLUMN: SIDEBAR FORM (Inside lg:col-span-4) ════ */}
      <div
        id="booking-form"
        ref={bookingFormRef}
        className="lg:col-span-4 lg:sticky lg:top-24 scroll-mt-24 print:hidden"
      >
        <div className="bg-white rounded-xl border border-gray-200 shadow-xs p-4 sm:p-5 relative transition-all">
          {/* Deal & Price Box */}
          {savings > 0 ? (
            <div className="rounded-xl border border-[#FDE68A] bg-[#FFFDF7] p-3.5 mb-4 flex items-center justify-between">
              <div className="flex flex-col items-start">
                <span className="text-xs font-semibold text-[#C2410C] uppercase tracking-wide mb-1">
                  SPECIAL OFFER
                </span>
                <div className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#1E293B] mb-2">
                  <Clock className="w-3.5 h-3.5 text-[#1E293B] stroke-[2.2]" />
                  <span>
                    {nights && days
                      ? `${nights} Nights / ${days} Days`
                      : duration}
                  </span>
                </div>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-gradient-to-r from-[#F59E0B] to-[#F97316] text-white text-xs font-semibold rounded-sm">
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
                <span className="text-xl sm:text-2xl font-extrabold text-[#0F172A] leading-tight my-0.5">
                  ₹{price.toLocaleString("en-IN")}
                </span>
                <span className="text-xs font-medium text-[#64748B]">
                  per person
                </span>
              </div>
            </div>
          ) : (
            <div className="rounded-xl border border-gray-200 bg-gray-50/70 p-3.5 mb-4 flex items-center justify-between">
              <div className="flex flex-col items-start">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                  STANDARD RATE
                </span>
                <div className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#1E293B]">
                  <Clock className="w-3.5 h-3.5 text-[#1E293B] stroke-[2.2]" />
                  <span>{duration}</span>
                </div>
              </div>
              <div className="flex flex-col text-right items-end">
                <span className="text-[11px] font-medium text-gray-500 uppercase tracking-wide">
                  STARTING FROM
                </span>
                <span className="text-xl sm:text-2xl font-extrabold text-[#0F172A] leading-tight my-0.5">
                  ₹{price.toLocaleString("en-IN")}
                </span>
                <span className="text-xs font-medium text-[#64748B]">
                  per person
                </span>
              </div>
            </div>
          )}

          {/* Verified Guarantee Trust Badge */}
          <div className="flex items-center gap-1.5 mb-2.5 text-emerald-700 text-xs font-medium">
            <MdVerifiedUser className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>100% Verified Partners & Best Price Guarantee</span>
          </div>

          {/* ════ MULTI-STEP FLOW MANAGED IN THIS SAME BOX ════ */}
          {renderFormContent()}
        </div>
      </div>

      {/* ════ POPUP MODAL (Automatically appears after 5s on travel details page) ════ */}
      {mounted && isPopupOpen && createPortal(
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={(e) => {
            if (e.target === e.currentTarget) handleClosePopup();
          }}
        >
          <div className="relative w-full max-w-[440px] bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 sm:p-5 max-h-[92vh] overflow-y-auto animate-in zoom-in-95 duration-200">
            {/* Close Button */}
            <button
              type="button"
              onClick={handleClosePopup}
              className="absolute top-3.5 right-3.5 w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-800 flex items-center justify-center transition-colors cursor-pointer z-10"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Modal Header */}
            <div className="mb-3 pr-8">
              <span className="text-[10.5px] font-bold text-[#1877F2] uppercase tracking-wider block mb-0.5">
                {savings > 0 ? `Special Offer • Save ₹${savings.toLocaleString("en-IN")}` : "Instant Tour Enquiry"}
              </span>
              <h3 className="text-sm sm:text-base font-semibold text-gray-900 leading-snug line-clamp-2">
                {title}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-base sm:text-lg font-bold text-[#0F172A]">
                  ₹{price.toLocaleString("en-IN")}
                </span>
                {originalPrice > price && (
                  <span className="text-xs text-gray-400 line-through">
                    ₹{originalPrice.toLocaleString("en-IN")}
                  </span>
                )}
                <span className="text-[11px] text-gray-500">per person</span>
              </div>
            </div>

            {renderFormContent()}
          </div>
        </div>,
        document.body
      )}

      {/* ─── MOBILE STICKY BOTTOM BAR ─── */}
      <aside
        aria-label="Mobile booking action bar"
        className={`lg:hidden print:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-gray-200/90 shadow-[0_-2px_15px_rgba(0,0,0,0.08)] px-4 py-2.5 flex items-center justify-between transition-all duration-300 ${isFormInView
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
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-gradient-to-r from-[#F59E0B] to-[#F97316] text-white text-[10px] font-medium rounded-md">
                <Tag className="w-2.5 h-2.5 stroke-[2.2]" />
                <span>Save ₹{savings.toLocaleString("en-IN")}</span>
              </span>
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={scrollToBookingForm}
          className="px-5 py-2.5 rounded-lg bg-[#1877F2] hover:bg-[#00285C] active:scale-95 text-white font-medium text-xs sm:text-sm transition-colors cursor-pointer flex items-center gap-1.5 shrink-0 ml-3 outline-none focus:outline-none"
        >
          <span>Book Now</span>
          <ArrowDown className="w-3.5 h-3.5 opacity-90" />
        </button>
      </aside>
    </>
  );
}
