"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
  X,
  Camera,
  Crown,
  Calendar,
  MapPin,
  LogOut,
  User,
  Phone,
  Mail,
  CheckCircle2,
  Trash2,
  FileText,
  ArrowLeft,
  ChevronRight,
  Clock,
  Users,
  Utensils,
  Download,
  ShieldCheck,
  Check,
} from "lucide-react";
import { useAuth, TripHistoryItem } from "./AuthContext";

export default function UserProfileDrawer() {
  const {
    user,
    isLoggedIn,
    isProfileDrawerOpen,
    closeProfileDrawer,
    logout,
    updateAvatar,
    updateProfile,
  } = useAuth();

  const [activeTab, setActiveTab] = useState<"profile" | "trips">("profile");
  const [selectedTrip, setSelectedTrip] = useState<TripHistoryItem | null>(null);

  // Photo upload ref
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [photoSuccess, setPhotoSuccess] = useState<string | null>(null);

  // Reset selected trip when drawer closes or tab switches
  useEffect(() => {
    if (!isProfileDrawerOpen) {
      setSelectedTrip(null);
    }
  }, [isProfileDrawerOpen]);

  // Profile edit state
  const [editName, setEditName] = useState(user?.name || "");
  const [editPhone, setEditPhone] = useState(user?.phone || "");
  const [editEmail, setEditEmail] = useState(user?.email || "");
  const [editLocation, setEditLocation] = useState(user?.location || "");
  const [editBio, setEditBio] = useState(user?.bio || "");
  const [profileMessage, setProfileMessage] = useState<string | null>(null);

  // Synchronize state when user changes or drawer opens
  useEffect(() => {
    if (user) {
      setEditName(user.name || "");
      setEditPhone(user.phone || "");
      setEditEmail(user.email || "");
      setEditLocation(user.location || "Kolkata, West Bengal");
      setEditBio(
        user.bio || "Passionate traveler & nature lover. Exploring the world one trip at a time."
      );
    }
  }, [user]);

  // Handle Photo Upload
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("Image must be smaller than 5MB");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          updateAvatar(reader.result);
          setPhotoSuccess("Profile photo updated successfully!");
          setTimeout(() => setPhotoSuccess(null), 2500);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle Remove Photo
  const handleRemovePhoto = () => {
    updateAvatar("");
    setPhotoSuccess("Profile photo removed. Initial letter is now shown.");
    setTimeout(() => setPhotoSuccess(null), 2500);
  };

  // Handle Profile Update
  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name: editName,
      phone: editPhone,
      email: editEmail,
      location: editLocation,
      bio: editBio,
    });
    setProfileMessage("Personal profile details saved successfully!");
    setTimeout(() => setProfileMessage(null), 3000);
  };

  if (!isLoggedIn || !user) return null;

  const initialLetter = user.name ? user.name.trim().charAt(0).toUpperCase() : "U";

  return (
    <div
      className={`fixed inset-0 z-[160] transition-opacity duration-300 ease-in-out ${isProfileDrawerOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
    >
      {/* ─── Smooth Backdrop ─── */}
      <div
        className={`fixed inset-0 bg-black/45 backdrop-blur-xs transition-opacity duration-300 ease-in-out ${isProfileDrawerOpen ? "opacity-100" : "opacity-0"
          }`}
        onClick={closeProfileDrawer}
      />

      {/* ─── Slide-Over Panel (Smooth ease-out translation, clean professional styling) ─── */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-4 sm:pl-10">
        <div
          className={`w-screen max-w-[460px] bg-[#F8FAFC] border-l border-gray-200 flex flex-col shadow-2xl transition-transform duration-300 ease-out ${isProfileDrawerOpen ? "translate-x-0" : "translate-x-full"
            }`}
        >
          {/* ─── Drawer Header ─── */}
          <div className="px-5 py-4 border-b border-gray-200 flex items-center justify-between bg-white shrink-0">
            <div>
              <h2 className="text-base font-bold text-gray-900 tracking-tight">
                Account &amp; Profile
              </h2>
              <p className="text-xs text-gray-500">
                Manage your personal info, bookings &amp; preferences
              </p>
            </div>
            <button
              type="button"
              onClick={closeProfileDrawer}
              className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-900 flex items-center justify-center transition-colors cursor-pointer outline-none focus:outline-none"
              aria-label="Close drawer"
            >
              <X className="w-4 h-4 stroke-[2.2]" />
            </button>
          </div>

          {/* ─── Scrollable Body (Changed to soft modern background) ─── */}
          <div className="flex-1 overflow-y-auto px-5 py-5 space-y-5 bg-[#F8FAFC]">
            {/* ─── 1. User Profile Header Card (Bg color used per box, no borders, subtle rounded-lg) ─── */}
            <div className="p-4 rounded-lg bg-[#0F172A] text-white relative">
              <div className="flex items-center gap-3.5">
                {/* Avatar with initial fallback */}
                <div className="relative shrink-0">
                  <div className="w-16 h-16 rounded-full overflow-hidden bg-[#1E293B] relative flex items-center justify-center">
                    {user.avatar ? (
                      <Image
                        src={user.avatar}
                        alt={user.name}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    ) : (
                      <span className="text-2xl font-bold text-white select-none">
                        {initialLetter}
                      </span>
                    )}
                  </div>

                  {/* Upload photo trigger */}
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#1877F2] hover:bg-blue-600 text-white flex items-center justify-center transition-colors cursor-pointer shadow-xs"
                    title="Upload profile photo"
                    aria-label="Upload profile photo"
                  >
                    <Camera className="w-3 h-3 stroke-[2.2]" />
                  </button>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                </div>

                {/* Info & Badges */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-base font-bold text-white truncate">
                      {user.name}
                    </h3>
                    <span className="px-2 py-0.5 rounded-md bg-amber-400 text-gray-950 text-[10px] font-bold tracking-wide">
                      {user.tier}
                    </span>
                  </div>
                  <p className="text-xs text-gray-300 truncate mt-0.5 font-normal">
                    {user.email}
                  </p>
                  <p className="text-xs text-gray-400 truncate font-normal">
                    {user.phone}
                  </p>
                </div>
              </div>

              {/* Photo Actions Row */}
              <div className="mt-3 pt-2.5 border-t border-gray-800/80 flex items-center justify-between text-xs text-gray-300">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-blue-400 hover:text-blue-300 transition-colors cursor-pointer"
                >
                  <Camera className="w-3.5 h-3.5" />
                  <span>Change Photo</span>
                </button>
                {user.avatar && (
                  <button
                    type="button"
                    onClick={handleRemovePhoto}
                    className="inline-flex items-center gap-1 text-xs text-gray-400 hover:text-red-400 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Use Letter Avatar</span>
                  </button>
                )}
              </div>
            </div>

            {/* Notification alert */}
            {photoSuccess && (
              <div className="px-3.5 py-2.5 rounded-lg bg-emerald-50 text-emerald-800 text-xs font-medium flex items-center gap-2 animate-in fade-in duration-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{photoSuccess}</span>
              </div>
            )}

            {/* ─── 2. Loyalty Points Summary Card (Bg color used per box, no border, circle shape icon) ─── */}
            <div className="p-3.5 rounded-lg bg-amber-50 text-gray-900">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 shrink-0">
                    <Crown className="w-4 h-4 text-amber-700 stroke-[2.2]" />
                  </div>
                  <div>
                    <span className="text-[11px] font-semibold text-amber-900 uppercase tracking-wide block">
                      Loyalty Rewards
                    </span>
                    <span className="text-base font-extrabold text-gray-900 leading-none">
                      {user.loyaltyPoints.toLocaleString("en-IN")}{" "}
                      <span className="text-xs font-semibold text-amber-800">Points</span>
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="inline-block px-2.5 py-1 rounded-md bg-amber-200/80 text-amber-950 text-xs font-bold">
                    ₹{user.loyaltyPoints.toLocaleString("en-IN")} Off
                  </span>
                  <span className="block text-[10px] text-gray-500 mt-0.5">
                    Valid on all tours
                  </span>
                </div>
              </div>
            </div>

            {/* ─── 3. Border-Bottom Smooth Tab Bar (Profile Info, Bookings, Password) ─── */}
            <div className="flex items-center border-b border-gray-200">
              <button
                type="button"
                onClick={() => {
                  setActiveTab("profile");
                  setSelectedTrip(null);
                }}
                className={`relative pb-3 pt-1 px-4 text-xs sm:text-[13px] font-semibold transition-all duration-200 cursor-pointer outline-none focus:outline-none ${activeTab === "profile"
                  ? "text-[#1877F2]"
                  : "text-gray-500 hover:text-gray-800"
                  }`}
              >
                <span>Profile Info</span>
                {activeTab === "profile" && (
                  <span className="absolute bottom-0 inset-x-0 h-0.5 bg-[#1877F2] rounded-full transition-all duration-300" />
                )}
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("trips")}
                className={`relative pb-3 pt-1 px-4 text-xs sm:text-[13px] font-semibold transition-all duration-200 cursor-pointer outline-none focus:outline-none ${activeTab === "trips"
                  ? "text-[#1877F2]"
                  : "text-gray-500 hover:text-gray-800"
                  }`}
              >
                <span>Bookings</span>
                {activeTab === "trips" && (
                  <span className="absolute bottom-0 inset-x-0 h-0.5 bg-[#1877F2] rounded-full transition-all duration-300" />
                )}
              </button>
            </div>

            {/* ─── TAB 1: Edit Profile Form (Per box bg color, no borders) ─── */}
            {activeTab === "profile" && (
              <form onSubmit={handleProfileSubmit} className="space-y-3.5 animate-in fade-in duration-200">
                {profileMessage && (
                  <div className="p-3 rounded-lg text-xs font-medium bg-emerald-50 text-emerald-800 flex items-center gap-2 animate-in fade-in duration-150">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{profileMessage}</span>
                  </div>
                )}

                {/* Full Name */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Full Name
                  </label>
                  <div className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-white border border-gray-200/90 focus-within:border-[#1877F2] transition-colors">
                    <User className="w-4 h-4 text-gray-400 shrink-0" />
                    <input
                      type="text"
                      required
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      placeholder="Enter full name"
                      className="w-full text-xs sm:text-sm text-gray-900 bg-transparent outline-none focus:outline-none ring-0 focus:ring-0 font-normal"
                    />
                  </div>
                </div>

                {/* Email Address */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Email Address
                  </label>
                  <div className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-white border border-gray-200/90 focus-within:border-[#1877F2] transition-colors">
                    <Mail className="w-4 h-4 text-gray-400 shrink-0" />
                    <input
                      type="email"
                      required
                      value={editEmail}
                      onChange={(e) => setEditEmail(e.target.value)}
                      placeholder="Enter email address"
                      className="w-full text-xs sm:text-sm text-gray-900 bg-transparent outline-none focus:outline-none ring-0 focus:ring-0 font-normal"
                    />
                  </div>
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <div className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-white border border-gray-200/90 focus-within:border-[#1877F2] transition-colors">
                    <Phone className="w-4 h-4 text-gray-400 shrink-0" />
                    <input
                      type="tel"
                      required
                      value={editPhone}
                      onChange={(e) => setEditPhone(e.target.value)}
                      placeholder="Enter phone number"
                      className="w-full text-xs sm:text-sm text-gray-900 bg-transparent outline-none focus:outline-none ring-0 focus:ring-0 font-normal"
                    />
                  </div>
                </div>

                {/* City / Location */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    City / Location
                  </label>
                  <div className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-white border border-gray-200/90 focus-within:border-[#1877F2] transition-colors">
                    <MapPin className="w-4 h-4 text-gray-400 shrink-0" />
                    <input
                      type="text"
                      value={editLocation}
                      onChange={(e) => setEditLocation(e.target.value)}
                      placeholder="e.g. Kolkata, West Bengal"
                      className="w-full text-xs sm:text-sm text-gray-900 bg-transparent outline-none focus:outline-none ring-0 focus:ring-0 font-normal"
                    />
                  </div>
                </div>

                {/* Bio / Preferences */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Travel Preferences / Bio
                  </label>
                  <div className="flex items-start gap-2 px-3 py-2 rounded-lg bg-white border border-gray-200/90 focus-within:border-[#1877F2] transition-colors">
                    <FileText className="w-4 h-4 text-gray-400 shrink-0 mt-1" />
                    <textarea
                      rows={2}
                      value={editBio}
                      onChange={(e) => setEditBio(e.target.value)}
                      placeholder="Add personal travel preferences or bio notes"
                      className="w-full text-xs sm:text-sm text-gray-900 bg-transparent outline-none focus:outline-none ring-0 focus:ring-0 font-normal resize-none"
                    />
                  </div>
                </div>

                {/* Save Button */}
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-lg bg-[#1877F2] hover:bg-[#00285C] text-white font-semibold text-xs sm:text-sm shadow-xs transition-colors cursor-pointer outline-none focus:outline-none"
                >
                  Save Profile Changes
                </button>
              </form>
            )}

            {/* ─── TAB 2: Trip History (List View & Full Booking Details View) ─── */}
            {activeTab === "trips" && (
              <div className="space-y-3.5 animate-in fade-in duration-200">
                {selectedTrip ? (
                  /* ─── FULL BOOKING HISTORY DETAILS VIEW ─── */
                  <div className="space-y-3.5 animate-in fade-in duration-150">
                    {/* Back Button */}
                    <button
                      type="button"
                      onClick={() => setSelectedTrip(null)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1877F2] hover:text-[#00285C] transition-colors cursor-pointer"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Back to All Bookings</span>
                    </button>

                    {/* Hero Card */}
                    <div className="relative w-full aspect-[16/9] rounded-lg overflow-hidden bg-slate-900 text-white shadow-2xs">
                      <Image
                        src={selectedTrip.image}
                        alt={selectedTrip.packageTitle}
                        fill
                        className="object-cover opacity-85"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />

                      {/* Badges on top */}
                      <div className="absolute top-2.5 inset-x-2.5 flex items-center justify-between">
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-black/60 backdrop-blur-xs text-white">
                          #{selectedTrip.bookingId}
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${selectedTrip.status === "Confirmed"
                            ? "bg-emerald-500 text-white"
                            : "bg-blue-600 text-white"
                            }`}
                        >
                          ✓ {selectedTrip.status}
                        </span>
                      </div>

                      {/* Title & destination on bottom */}
                      <div className="absolute bottom-2.5 left-2.5 right-2.5 text-left">
                        <h3 className="text-sm sm:text-base font-bold text-white leading-snug drop-shadow-sm">
                          {selectedTrip.packageTitle}
                        </h3>
                        <div className="flex items-center gap-1 text-xs text-gray-200 mt-1">
                          <MapPin className="w-3 h-3 text-[#1877F2] shrink-0" />
                          <span className="truncate">{selectedTrip.destination}</span>
                        </div>
                      </div>
                    </div>

                    {/* Quick Specs Grid (2 columns, subtle rounded-lg) */}
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="p-2.5 rounded-lg bg-white border border-gray-200/80 shadow-2xs space-y-1">
                        <div className="flex items-center gap-1 text-gray-400 text-[10px]">
                          <Calendar className="w-3 h-3 text-[#1877F2]" />
                          <span>Travel Dates</span>
                        </div>
                        <div className="font-bold text-gray-900 leading-tight text-[11px] sm:text-xs">
                          {selectedTrip.dates}
                        </div>
                      </div>

                      <div className="p-2.5 rounded-lg bg-white border border-gray-200/80 shadow-2xs space-y-1">
                        <div className="flex items-center gap-1 text-gray-400 text-[10px]">
                          <Clock className="w-3 h-3 text-[#1877F2]" />
                          <span>Duration</span>
                        </div>
                        <div className="font-bold text-gray-900 leading-tight text-[11px] sm:text-xs">
                          {selectedTrip.duration}
                        </div>
                      </div>

                      <div className="p-2.5 rounded-lg bg-white border border-gray-200/80 shadow-2xs space-y-1">
                        <div className="flex items-center gap-1 text-gray-400 text-[10px]">
                          <Users className="w-3 h-3 text-[#1877F2]" />
                          <span>Travellers</span>
                        </div>
                        <div className="font-bold text-gray-900 leading-tight text-[11px] sm:text-xs truncate">
                          {selectedTrip.travellers || "2 Adults"}
                        </div>
                      </div>

                      <div className="p-2.5 rounded-lg bg-white border border-gray-200/80 shadow-2xs space-y-1">
                        <div className="flex items-center gap-1 text-gray-400 text-[10px]">
                          <Utensils className="w-3 h-3 text-[#1877F2]" />
                          <span>Meal Plan</span>
                        </div>
                        <div className="font-bold text-gray-900 leading-tight text-[11px] sm:text-xs truncate">
                          {selectedTrip.mealPlan || "Breakfast & Dinner"}
                        </div>
                      </div>
                    </div>

                    {/* Hotel Stay & Pickup Box */}
                    <div className="p-3 rounded-lg bg-white border border-gray-200/80 shadow-2xs space-y-2 text-xs">
                      <div>
                        <span className="text-[10px] font-semibold text-gray-400 block uppercase tracking-wider">
                          Hotel / Stay Category
                        </span>
                        <span className="font-bold text-gray-900 text-xs sm:text-[13px] mt-0.5 block">
                          {selectedTrip.hotelCategory || "4-Star Luxury Resort Stay"}
                        </span>
                      </div>
                      <div className="pt-2 border-t border-gray-100">
                        <span className="text-[10px] font-semibold text-gray-400 block uppercase tracking-wider">
                          Pickup &amp; Departure
                        </span>
                        <span className="font-medium text-gray-700 text-xs mt-0.5 block">
                          {selectedTrip.pickupPoint || "Airport / City Station Pickup Included"}
                        </span>
                      </div>
                    </div>

                    {/* Inclusions Checklist */}
                    <div className="p-3 rounded-lg bg-white border border-gray-200/80 shadow-2xs space-y-2">
                      <span className="text-xs font-bold text-gray-900 block">
                        Included in this Booking
                      </span>
                      <ul className="space-y-1.5 text-xs text-gray-700">
                        {(selectedTrip.inclusions && selectedTrip.inclusions.length > 0
                          ? selectedTrip.inclusions
                          : [
                            "Private AC vehicle for all sightseeing & transfers",
                            "Daily complimentary buffet breakfast & dinner",
                            "Entry permits and govt. taxes included",
                            "24/7 dedicated trip support concierge",
                          ]
                        ).map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Payment & Rewards Breakdown */}
                    <div className="p-3 rounded-lg bg-white border border-gray-200/80 shadow-2xs space-y-2 text-xs">
                      <span className="text-xs font-bold text-gray-900 block">
                        Payment &amp; Rewards
                      </span>
                      <div className="flex items-center justify-between text-gray-600">
                        <span>Total Package Cost</span>
                        <span className="font-bold text-gray-900 text-sm">
                          ₹{selectedTrip.amount.toLocaleString("en-IN")}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-gray-600">
                        <span>Payment Status</span>
                        <span className="text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-md text-[11px]">
                          {selectedTrip.paymentMode || "Paid in Full via UPI"}
                        </span>
                      </div>
                      <div className="flex items-center justify-between pt-1.5 border-t border-gray-100 text-emerald-700 font-semibold">
                        <span>Rewards Points Earned</span>
                        <span>+{selectedTrip.pointsEarned} Points</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() =>
                          alert(
                            `Downloading confirmed voucher for booking #${selectedTrip.bookingId}...`
                          )
                        }
                        className="py-2.5 px-3 rounded-lg bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5 text-gray-600" />
                        <span>Download Voucher</span>
                      </button>
                      <a
                        href="https://wa.me/918250338715"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-2.5 px-3 rounded-lg bg-[#1877F2] hover:bg-blue-600 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>Support</span>
                      </a>
                    </div>
                  </div>
                ) : (
                  /* ─── BOOKINGS LIST VIEW ─── */
                  <>
                    <div className="flex items-center justify-between px-0.5 pb-0.5">
                      <span className="text-xs text-gray-800 font-bold tracking-tight">
                        Recent &amp; Past Bookings
                      </span>
                      <span className="text-[11px] font-medium text-gray-500">
                        {user.trips.length} {user.trips.length === 1 ? "Trip" : "Trips"}
                      </span>
                    </div>

                    <div className="space-y-2.5">
                      {user.trips.map((trip) => (
                        <div
                          key={trip.id}
                          onClick={() => setSelectedTrip(trip)}
                          className="p-3.5 rounded-lg bg-white border border-gray-200/80 shadow-2xs  transition-all cursor-pointer space-y-2.5 group"
                        >
                          <div className="flex items-start gap-3">
                            {/* Trip Thumbnail */}
                            <div className="relative w-16 h-16 rounded-md overflow-hidden bg-gray-100 shrink-0">
                              <Image
                                src={trip.image}
                                alt={trip.packageTitle}
                                fill
                                sizes="64px"
                                className="object-cover"
                              />
                            </div>

                            {/* Details */}
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center justify-between gap-1">
                                <span className="text-[10px] font-mono text-gray-400">
                                  #{trip.bookingId}
                                </span>
                                <span
                                  className={`px-2 py-0.5 rounded-md text-[10px] font-semibold ${trip.status === "Confirmed"
                                    ? "bg-emerald-50 text-emerald-700"
                                    : "bg-blue-50 text-blue-700"
                                    }`}
                                >
                                  {trip.status}
                                </span>
                              </div>

                              <h4 className="text-xs sm:text-sm font-semibold text-gray-900 truncate mt-0.5 group-hover:text-[#1877F2] transition-colors">
                                {trip.packageTitle}
                              </h4>

                              <div className="flex items-center gap-1.5 text-[11px] text-gray-500 mt-0.5">
                                <MapPin className="w-3 h-3 text-[#1877F2] shrink-0" />
                                <span className="truncate">{trip.destination}</span>
                              </div>
                            </div>
                          </div>

                          {/* Dates, Cost & Clickable Details Row */}
                          <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-600">
                            <div className="flex items-center gap-1 text-gray-500">
                              <Calendar className="w-3 h-3 text-gray-400" />
                              <span>{trip.dates}</span>
                            </div>
                            <div className="flex items-center gap-2.5">
                              <span className="font-bold text-gray-900">
                                ₹{trip.amount.toLocaleString("en-IN")}
                              </span>
                              <span className="text-[#1877F2] font-semibold text-xs flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
                                Details <ChevronRight className="w-3.5 h-3.5" />
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

          {/* ─── Drawer Footer: Log Out ─── */}
          <div className="p-4 border-t border-gray-200 bg-gray-50 flex items-center justify-between shrink-0">
            <div className="min-w-0 pr-2">
              <span className="text-xs font-medium text-gray-700 truncate block">
                {user.name}
              </span>
              <span className="text-[11px] text-gray-400 truncate block">
                {user.email}
              </span>
            </div>
            <button
              type="button"
              onClick={logout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors cursor-pointer shrink-0 outline-none focus:outline-none"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
