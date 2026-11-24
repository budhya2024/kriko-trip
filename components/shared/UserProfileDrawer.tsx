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
  Check,
  Tag,
  AlertCircle,
  Loader2,
  Award,
  Sparkles,
  RotateCw,
  ArrowDownLeft,
  ArrowUpRight,
  Compass,
} from "lucide-react";
import {
  deleteMyAvatar,
  uploadMyAvatar,
  fetchMyLoyaltyTransactions,
  type LoyaltyTransactionItem,
} from "@/lib/api/customer";
import { fetchMyBookings, fetchMyBookingDetail } from "@/lib/api/enquiries";
import { useAuth, TripHistoryItem } from "./AuthContext";

function getStatusBadgeClass(status: string): string {
  switch (status) {
    case "Confirmed":
      return "bg-emerald-50 text-emerald-700 border border-emerald-200";
    case "Completed":
      return "bg-blue-50 text-blue-700 border border-blue-200";
    case "Cancelled":
      return "bg-rose-50 text-rose-700 border border-rose-200";
    case "In Progress":
      return "bg-indigo-50 text-indigo-700 border border-indigo-200";
    case "New":
      return "bg-sky-50 text-sky-700 border border-sky-200";
    case "Pending":
    default:
      return "bg-amber-50 text-amber-700 border border-amber-200";
  }
}

function getStatusPillClass(status: string): string {
  switch (status) {
    case "Confirmed":
      return "bg-emerald-500 text-white";
    case "Completed":
      return "bg-blue-600 text-white";
    case "Cancelled":
      return "bg-rose-500 text-white";
    case "In Progress":
      return "bg-indigo-500 text-white";
    case "New":
      return "bg-sky-500 text-white";
    case "Pending":
    default:
      return "bg-amber-500 text-white";
  }
}

export default function UserProfileDrawer() {
  const {
    user,
    isLoggedIn,
    isProfileDrawerOpen,
    closeProfileDrawer,
    logout,
    updateAvatar,
    updateProfile,
    refreshMe,
  } = useAuth();

  const [activeTab, setActiveTab] = useState<"profile" | "trips" | "loyalty">("profile");
  const [selectedTrip, setSelectedTrip] = useState<TripHistoryItem | null>(null);
  const [voucherNotice, setVoucherNotice] = useState<string | null>(null);

  const [trips, setTrips] = useState<TripHistoryItem[]>([]);
  const [isLoadingTrips, setIsLoadingTrips] = useState(false);
  const [isLoadingDetail, setIsLoadingDetail] = useState(false);
  const [tripsError, setTripsError] = useState<string | null>(null);

  const [transactions, setTransactions] = useState<LoyaltyTransactionItem[]>([]);
  const [isLoadingTransactions, setIsLoadingTransactions] = useState(false);
  const [transactionsError, setTransactionsError] = useState<string | null>(null);

  const loadTrips = async () => {
    setIsLoadingTrips(true);
    setTripsError(null);
    try {
      const data = await fetchMyBookings();
      setTrips(Array.isArray(data) ? data : []);
    } catch {
      setTripsError("Failed to load your bookings.");
    } finally {
      setIsLoadingTrips(false);
    }
  };

  const handleSelectTrip = async (trip: TripHistoryItem) => {
    setSelectedTrip(trip);
    setIsLoadingDetail(true);
    try {
      const detail = await fetchMyBookingDetail(trip.bookingId);
      if (detail) {
        setSelectedTrip(detail);
      }
    } catch {
    } finally {
      setIsLoadingDetail(false);
    }
  };

  const loadTransactions = async () => {
    setIsLoadingTransactions(true);
    setTransactionsError(null);
    try {
      const data = await fetchMyLoyaltyTransactions();
      setTransactions(Array.isArray(data) ? data : []);
    } catch {
      setTransactionsError("Failed to load loyalty transaction history.");
    } finally {
      setIsLoadingTransactions(false);
    }
  };

  useEffect(() => {
    if (isProfileDrawerOpen && activeTab === "loyalty") {
      void loadTransactions();
      void refreshMe();
    } else if (isProfileDrawerOpen && activeTab === "trips") {
      void loadTrips();
    }
  }, [isProfileDrawerOpen, activeTab, refreshMe]);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [photoSuccess, setPhotoSuccess] = useState<string | null>(null);
  const [photoError, setPhotoError] = useState<string | null>(null);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);

  const [prevOpen, setPrevOpen] = useState(isProfileDrawerOpen);
  if (prevOpen !== isProfileDrawerOpen) {
    setPrevOpen(isProfileDrawerOpen);
    if (!isProfileDrawerOpen && selectedTrip !== null) {
      setSelectedTrip(null);
    }
  }

  const [editName, setEditName] = useState(user?.name || "");
  const [editPhone, setEditPhone] = useState(user?.phone || "");
  const [editLocation, setEditLocation] = useState(user?.location || "");
  const [editBio, setEditBio] = useState(user?.bio || "");
  const [profileMessage, setProfileMessage] = useState<string | null>(null);
  const [profileError, setProfileError] = useState<string | null>(null);
  const [isSavingProfile, setIsSavingProfile] = useState(false);

  const [prevUser, setPrevUser] = useState(user);
  if (prevUser !== user) {
    setPrevUser(user);
    if (user) {
      setEditName(user.name || "");
      setEditPhone(user.phone || "");
      setEditLocation(user.location || "");
      setEditBio(user.bio || "");
    }
  }

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setPhotoError("Image must be smaller than 5MB");
      setTimeout(() => setPhotoError(null), 3000);
      return;
    }

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      setPhotoError("Please select a JPEG, PNG, or WebP image");
      setTimeout(() => setPhotoError(null), 3000);
      return;
    }

    setIsUploadingAvatar(true);
    setPhotoError(null);

    try {
      const res = await uploadMyAvatar(file);
      updateAvatar(res.avatarUrl);
      setPhotoSuccess("Profile photo updated successfully!");
      setTimeout(() => setPhotoSuccess(null), 2500);
    } catch {
      setPhotoError("Failed to upload avatar. Please try again.");
      setTimeout(() => setPhotoError(null), 3000);
    } finally {
      setIsUploadingAvatar(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleRemovePhoto = async () => {
    setIsUploadingAvatar(true);
    setPhotoError(null);
    try {
      await deleteMyAvatar();
      updateAvatar("");
      setPhotoSuccess("Profile photo removed. Initial letter is now shown.");
      setTimeout(() => setPhotoSuccess(null), 2500);
    } catch {
      setPhotoError("Failed to remove avatar. Please try again.");
      setTimeout(() => setPhotoError(null), 3000);
    } finally {
      setIsUploadingAvatar(false);
    }
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileError(null);
    setProfileMessage(null);

    if (!editName.trim()) {
      setProfileError("Full name is required.");
      return;
    }

    setIsSavingProfile(true);
    try {
      await updateProfile({
        name: editName.trim(),
        phone: editPhone.trim(),
        location: editLocation.trim(),
        bio: editBio.trim(),
      });
      setProfileMessage("Personal profile details saved successfully!");
      setTimeout(() => setProfileMessage(null), 3000);
    } catch {
      setProfileError("Failed to save profile changes. Please try again.");
    } finally {
      setIsSavingProfile(false);
    }
  };

  if (!isLoggedIn || !user) return null;

  const initialLetter = user.name ? user.name.trim().charAt(0).toUpperCase() : "U";

  return (
    <div
      className={`fixed inset-0 z-[160] transition-opacity duration-300 ease-in-out ${
        isProfileDrawerOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        className={`fixed inset-0 bg-black/45 backdrop-blur-xs transition-opacity duration-300 ease-in-out ${
          isProfileDrawerOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={closeProfileDrawer}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-4 sm:pl-10">
        <div
          className={`w-screen max-w-[460px] bg-[#F8FAFC] border-l border-gray-200 flex flex-col shadow-2xl transition-transform duration-300 ease-out ${
            isProfileDrawerOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
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

          <div className="flex-1 overflow-y-auto px-5 py-5 space-y-5 bg-[#F8FAFC]">
            <div className="p-4 rounded-lg bg-[#0F172A] text-white relative">
              <div className="flex items-center gap-3.5">
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

                  <button
                    type="button"
                    disabled={isUploadingAvatar}
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#1877F2] hover:bg-blue-600 text-white flex items-center justify-center transition-colors cursor-pointer shadow-xs disabled:opacity-50"
                    title="Upload profile photo"
                    aria-label="Upload profile photo"
                  >
                    {isUploadingAvatar ? (
                      <Loader2 className="w-3 h-3 animate-spin" />
                    ) : (
                      <Camera className="w-3 h-3 stroke-[2.2]" />
                    )}
                  </button>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                </div>

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

              <div className="mt-3 pt-2.5 border-t border-gray-800/80 flex items-center justify-between text-xs text-gray-300">
                <button
                  type="button"
                  disabled={isUploadingAvatar}
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-blue-400 hover:text-blue-300 transition-colors cursor-pointer disabled:opacity-50"
                >
                  {isUploadingAvatar ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Camera className="w-3.5 h-3.5" />
                  )}
                  <span>Change Photo</span>
                </button>
                {user.avatar && (
                  <button
                    type="button"
                    disabled={isUploadingAvatar}
                    onClick={handleRemovePhoto}
                    className="inline-flex items-center gap-1 text-xs text-gray-400 hover:text-red-400 transition-colors cursor-pointer disabled:opacity-50"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Use Letter Avatar</span>
                  </button>
                )}
              </div>
            </div>

            {photoSuccess && (
              <div className="px-3.5 py-2.5 rounded-lg bg-emerald-50 text-emerald-800 text-xs font-medium flex items-center gap-2 animate-in fade-in duration-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{photoSuccess}</span>
              </div>
            )}

            {photoError && (
              <div className="px-3.5 py-2.5 rounded-lg bg-rose-50 text-rose-800 text-xs font-medium flex items-center gap-2 animate-in fade-in duration-200">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{photoError}</span>
              </div>
            )}

            <div
              onClick={() => {
                setActiveTab("loyalty");
                setSelectedTrip(null);
              }}
              className="p-3.5 rounded-lg bg-amber-50 hover:bg-amber-100/70 text-gray-900 cursor-pointer transition-colors group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-amber-100 group-hover:bg-amber-200/80 flex items-center justify-center text-amber-700 shrink-0 transition-colors">
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
                  <span className="block text-[10px] text-amber-800 font-medium group-hover:underline mt-0.5">
                    View History &rarr;
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center border-b border-gray-200">
              <button
                type="button"
                onClick={() => {
                  setActiveTab("profile");
                  setSelectedTrip(null);
                }}
                className={`relative pb-3 pt-1 px-4 text-xs sm:text-[13px] font-semibold transition-all duration-200 cursor-pointer outline-none focus:outline-none ${
                  activeTab === "profile"
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
                onClick={() => {
                  setActiveTab("trips");
                  setSelectedTrip(null);
                }}
                className={`relative pb-3 pt-1 px-4 text-xs sm:text-[13px] font-semibold transition-all duration-200 cursor-pointer outline-none focus:outline-none ${
                  activeTab === "trips"
                    ? "text-[#1877F2]"
                    : "text-gray-500 hover:text-gray-800"
                }`}
              >
                <span>Bookings</span>
                {activeTab === "trips" && (
                  <span className="absolute bottom-0 inset-x-0 h-0.5 bg-[#1877F2] rounded-full transition-all duration-300" />
                )}
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveTab("loyalty");
                  setSelectedTrip(null);
                }}
                className={`relative pb-3 pt-1 px-4 text-xs sm:text-[13px] font-semibold transition-all duration-200 cursor-pointer outline-none focus:outline-none ${
                  activeTab === "loyalty"
                    ? "text-[#1877F2]"
                    : "text-gray-500 hover:text-gray-800"
                }`}
              >
                <span>Loyalty</span>
                {activeTab === "loyalty" && (
                  <span className="absolute bottom-0 inset-x-0 h-0.5 bg-[#1877F2] rounded-full transition-all duration-300" />
                )}
              </button>
            </div>

            {activeTab === "profile" && (
              <form onSubmit={handleProfileSubmit} className="space-y-3.5 animate-in fade-in duration-200">
                {profileMessage && (
                  <div className="p-3 rounded-lg text-xs font-medium bg-emerald-50 text-emerald-800 flex items-center gap-2 animate-in fade-in duration-150">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{profileMessage}</span>
                  </div>
                )}

                {profileError && (
                  <div className="p-3 rounded-lg text-xs font-medium bg-rose-50 text-rose-800 flex items-center gap-2 animate-in fade-in duration-150">
                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                    <span>{profileError}</span>
                  </div>
                )}

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

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-semibold text-gray-700">
                      Email Address
                    </label>
                    <span className="text-[10px] text-gray-400">Read-only</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-gray-100 border border-gray-200 text-gray-500 cursor-not-allowed">
                    <Mail className="w-4 h-4 text-gray-400 shrink-0" />
                    <input
                      type="email"
                      readOnly
                      disabled
                      value={user.email}
                      className="w-full text-xs sm:text-sm text-gray-500 bg-transparent outline-none cursor-not-allowed font-normal"
                    />
                  </div>
                </div>

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

                <button
                  type="submit"
                  disabled={isSavingProfile}
                  className="w-full py-2.5 rounded-lg bg-[#1877F2] hover:bg-[#00285C] text-white font-semibold text-xs sm:text-sm shadow-xs transition-colors cursor-pointer outline-none focus:outline-none flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSavingProfile ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Saving Profile...</span>
                    </>
                  ) : (
                    <span>Save Profile Changes</span>
                  )}
                </button>
              </form>
            )}

            {activeTab === "trips" && (
              <div className="space-y-3.5 animate-in fade-in duration-200">
                {selectedTrip ? (
                  <div className="space-y-3.5 animate-in fade-in duration-150">
                    <button
                      type="button"
                      onClick={() => setSelectedTrip(null)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1877F2] hover:text-[#00285C] transition-colors cursor-pointer"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Back to All Bookings</span>
                    </button>

                    <div className="relative w-full aspect-[16/9] rounded-lg overflow-hidden bg-slate-900 text-white shadow-2xs">
                      <Image
                        src={selectedTrip.image || "/assets/images/packages/pkg-1.jpg"}
                        alt={selectedTrip.packageTitle}
                        fill
                        className="object-cover opacity-85"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />

                      <div className="absolute top-2.5 inset-x-2.5 flex items-center justify-between">
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-black/60 backdrop-blur-xs text-white">
                          #{selectedTrip.bookingId}
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${getStatusPillClass(
                            selectedTrip.status
                          )}`}
                        >
                          ✓ {selectedTrip.status}
                        </span>
                      </div>

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

                    {isLoadingDetail && (
                      <div className="p-2 text-center text-xs text-gray-500 flex items-center justify-center gap-1.5">
                        <Loader2 className="w-3.5 h-3.5 animate-spin text-[#1877F2]" />
                        <span>Updating trip details...</span>
                      </div>
                    )}

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

                      {selectedTrip.travellers && (
                        <div className="p-2.5 rounded-lg bg-white border border-gray-200/80 shadow-2xs space-y-1">
                          <div className="flex items-center gap-1 text-gray-400 text-[10px]">
                            <Users className="w-3 h-3 text-[#1877F2]" />
                            <span>Travellers</span>
                          </div>
                          <div className="font-bold text-gray-900 leading-tight text-[11px] sm:text-xs truncate">
                            {selectedTrip.travellers}
                          </div>
                        </div>
                      )}

                      {selectedTrip.mealPlan && (
                        <div className="p-2.5 rounded-lg bg-white border border-gray-200/80 shadow-2xs space-y-1">
                          <div className="flex items-center gap-1 text-gray-400 text-[10px]">
                            <Utensils className="w-3 h-3 text-[#1877F2]" />
                            <span>Meal Plan</span>
                          </div>
                          <div className="font-bold text-gray-900 leading-tight text-[11px] sm:text-xs truncate">
                            {selectedTrip.mealPlan}
                          </div>
                        </div>
                      )}
                    </div>

                    {(selectedTrip.hotelCategory || selectedTrip.pickupPoint) && (
                      <div className="p-3 rounded-lg bg-white border border-gray-200/80 shadow-2xs space-y-2 text-xs">
                        {selectedTrip.hotelCategory && (
                          <div>
                            <span className="text-[10px] font-semibold text-gray-400 block uppercase tracking-wider">
                              Hotel / Stay Category
                            </span>
                            <span className="font-bold text-gray-900 text-xs sm:text-[13px] mt-0.5 block">
                              {selectedTrip.hotelCategory}
                            </span>
                          </div>
                        )}
                        {selectedTrip.pickupPoint && (
                          <div className={selectedTrip.hotelCategory ? "pt-2 border-t border-gray-100" : ""}>
                            <span className="text-[10px] font-semibold text-gray-400 block uppercase tracking-wider">
                              Pickup &amp; Departure
                            </span>
                            <span className="font-medium text-gray-700 text-xs mt-0.5 block">
                              {selectedTrip.pickupPoint}
                            </span>
                          </div>
                        )}
                      </div>
                    )}

                    {selectedTrip.inclusions && selectedTrip.inclusions.length > 0 && (
                      <div className="p-3 rounded-lg bg-white border border-gray-200/80 shadow-2xs space-y-2">
                        <span className="text-xs font-bold text-gray-900 block">
                          Included in this Booking
                        </span>
                        <ul className="space-y-1.5 text-xs text-gray-700">
                          {selectedTrip.inclusions.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="p-3 rounded-lg bg-white border border-gray-200/80 shadow-2xs space-y-2 text-xs">
                      <span className="text-xs font-bold text-gray-900 block">
                        Payment &amp; Rewards
                      </span>

                      <div className="flex items-center justify-between text-gray-600">
                        <span>Base Package Fare</span>
                        <span className="font-medium text-gray-700">
                          ₹{(
                            selectedTrip.amount +
                            (selectedTrip.appliedCoupon?.discountAmount || 0) +
                            (selectedTrip.loyaltyRedeemed?.discountAmount || 0)
                          ).toLocaleString("en-IN")}
                        </span>
                      </div>

                      {selectedTrip.appliedCoupon && (
                        <div className="flex items-center justify-between text-emerald-700 font-semibold bg-emerald-50 px-2.5 py-1.5 rounded-md border border-emerald-200/80">
                          <div className="flex items-center gap-1.5">
                            <Tag className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            <span>
                              Coupon Applied (
                              <strong className="font-mono text-emerald-950">
                                {selectedTrip.appliedCoupon.code}
                              </strong>
                              )
                            </span>
                          </div>
                          <span>- ₹{selectedTrip.appliedCoupon.discountAmount.toLocaleString("en-IN")}</span>
                        </div>
                      )}

                      {selectedTrip.loyaltyRedeemed && (
                        <div className="flex items-center justify-between text-amber-800 font-semibold bg-amber-50 px-2.5 py-1.5 rounded-md border border-amber-200/80">
                          <div className="flex items-center gap-1.5">
                            <Crown className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                            <span>
                              Loyalty Redeemed ({selectedTrip.loyaltyRedeemed.points.toLocaleString("en-IN")} pts)
                            </span>
                          </div>
                          <span>- ₹{selectedTrip.loyaltyRedeemed.discountAmount.toLocaleString("en-IN")}</span>
                        </div>
                      )}

                      <div className="flex items-center justify-between text-gray-600 pt-0.5">
                        <span className="font-semibold text-gray-800">Final Quoted Price</span>
                        <span className="font-extrabold text-gray-900 text-sm">
                          ₹{selectedTrip.amount.toLocaleString("en-IN")}
                        </span>
                      </div>

                      {selectedTrip.paymentMode && (
                        <div className="flex items-center justify-between text-gray-600">
                          <span>Payment Mode</span>
                          <span className="text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-md text-[11px]">
                            {selectedTrip.paymentMode}
                          </span>
                        </div>
                      )}

                      {selectedTrip.pointsEarned > 0 && (
                        <div className="flex items-center justify-between pt-1.5 border-t border-gray-100 text-emerald-700 font-semibold">
                          <span>Rewards Points Earned</span>
                          <span>+{selectedTrip.pointsEarned} Points</span>
                        </div>
                      )}
                    </div>

                    {voucherNotice && (
                      <div className="p-2.5 rounded-lg bg-blue-50 border border-blue-200 text-blue-800 text-xs flex items-center justify-between">
                        <span>{voucherNotice}</span>
                        <button
                          type="button"
                          onClick={() => setVoucherNotice(null)}
                          className="font-bold ml-2 text-blue-600 hover:text-blue-900"
                        >
                          ✕
                        </button>
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() =>
                          setVoucherNotice("Booking voucher will be emailed upon confirmation.")
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
                  <>
                    <div className="flex items-center justify-between px-0.5 pb-0.5">
                      <span className="text-xs text-gray-800 font-bold tracking-tight">
                        Recent &amp; Past Bookings
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-medium text-gray-500">
                          {trips.length} {trips.length === 1 ? "Trip" : "Trips"}
                        </span>
                        <button
                          type="button"
                          disabled={isLoadingTrips}
                          onClick={() => void loadTrips()}
                          className="p-1 rounded-md text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer disabled:opacity-50"
                          title="Refresh bookings"
                        >
                          <RotateCw
                            className={`w-3.5 h-3.5 ${isLoadingTrips ? "animate-spin" : ""}`}
                          />
                        </button>
                      </div>
                    </div>

                    {isLoadingTrips && trips.length === 0 ? (
                      <div className="p-8 text-center bg-white rounded-lg border border-gray-100">
                        <Loader2 className="w-5 h-5 text-blue-600 animate-spin mx-auto mb-2" />
                        <p className="text-xs text-gray-500 font-medium">Loading your bookings...</p>
                      </div>
                    ) : tripsError ? (
                      <div className="p-4 bg-rose-50 text-rose-800 rounded-lg text-xs space-y-2">
                        <p className="font-semibold">{tripsError}</p>
                        <button
                          type="button"
                          onClick={() => void loadTrips()}
                          className="px-3 py-1 rounded bg-rose-600 text-white font-medium hover:bg-rose-700 transition-colors"
                        >
                          Try Again
                        </button>
                      </div>
                    ) : trips.length === 0 ? (
                      <div className="p-8 text-center bg-white rounded-lg border border-gray-100 space-y-2">
                        <Compass className="w-8 h-8 text-blue-500 mx-auto" />
                        <h5 className="text-xs font-bold text-gray-800">No Bookings Found</h5>
                        <p className="text-[11px] text-gray-500 max-w-xs mx-auto">
                          You haven&apos;t made any enquiries or bookings yet. Explore our tour packages to book your next trip!
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-2.5">
                        {trips.map((trip) => (
                          <div
                            key={trip.id}
                            onClick={() => void handleSelectTrip(trip)}
                            className="p-3.5 rounded-lg bg-white border border-gray-200/80 shadow-2xs transition-all cursor-pointer space-y-2.5 group hover:border-[#1877F2]/50"
                          >
                            <div className="flex items-start gap-3">
                              <div className="relative w-16 h-16 rounded-md overflow-hidden bg-gray-100 shrink-0">
                                <Image
                                  src={trip.image || "/assets/images/packages/pkg-1.jpg"}
                                  alt={trip.packageTitle}
                                  fill
                                  sizes="64px"
                                  className="object-cover"
                                />
                              </div>

                              <div className="min-w-0 flex-1">
                                <div className="flex items-center justify-between gap-1">
                                  <span className="text-[10px] font-mono text-gray-400">
                                    #{trip.bookingId}
                                  </span>
                                  <span
                                    className={`px-2 py-0.5 rounded-md text-[10px] font-semibold ${getStatusBadgeClass(
                                      trip.status
                                    )}`}
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
                    )}
                  </>
                )}
              </div>
            )}

            {activeTab === "loyalty" && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div className="p-4 rounded-xl bg-gradient-to-br from-[#0F172A] to-[#1E293B] text-white space-y-3 shadow-xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-amber-400/20 text-amber-400 flex items-center justify-center">
                        <Crown className="w-4 h-4 stroke-[2.2]" />
                      </div>
                      <div>
                        <span className="text-[11px] font-semibold text-gray-300 uppercase tracking-wider block">
                          Current Tier
                        </span>
                        <span className="text-sm font-bold text-amber-400">
                          {user.tier}
                        </span>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-white/10 text-white text-[11px] font-semibold backdrop-blur-xs">
                      1 Pt = ₹1.00
                    </span>
                  </div>

                  <div className="pt-2 border-t border-white/10 flex items-baseline justify-between">
                    <div>
                      <span className="text-2xl font-black text-white tracking-tight">
                        {user.loyaltyPoints.toLocaleString("en-IN")}
                      </span>
                      <span className="text-xs text-gray-300 ml-1.5 font-medium">Available Points</span>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-bold text-emerald-400">
                        ₹{user.loyaltyPoints.toLocaleString("en-IN")}
                      </span>
                      <span className="text-[11px] text-gray-400 block">Redemption Value</span>
                    </div>
                  </div>
                </div>

                <div className="p-3.5 rounded-lg bg-white border border-gray-100 shadow-2xs space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-900 uppercase tracking-wide flex items-center gap-1.5">
                      <Award className="w-3.5 h-3.5 text-blue-600" />
                      Membership Tiers &amp; Benefits
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center text-xs">
                    <div
                      className={`p-2 rounded-md border ${
                        user.tier === "Silver Explorer"
                          ? "border-blue-500 bg-blue-50/60 font-semibold"
                          : "border-gray-100 bg-gray-50/70"
                      }`}
                    >
                      <span className="block text-[11px] text-gray-800 font-bold truncate">Silver</span>
                      <span className="text-[10px] text-gray-500 block">0+ Pts</span>
                      <span className="text-[9px] text-blue-700 font-medium block mt-0.5">1% Earn Rate</span>
                    </div>

                    <div
                      className={`p-2 rounded-md border ${
                        user.tier === "Gold Explorer"
                          ? "border-amber-500 bg-amber-50/60 font-semibold"
                          : "border-gray-100 bg-gray-50/70"
                      }`}
                    >
                      <span className="block text-[11px] text-amber-900 font-bold truncate">Gold</span>
                      <span className="text-[10px] text-gray-500 block">1,000+ Pts</span>
                      <span className="text-[9px] text-amber-700 font-medium block mt-0.5">Priority Perks</span>
                    </div>

                    <div
                      className={`p-2 rounded-md border ${
                        user.tier === "Platinum Elite"
                          ? "border-purple-500 bg-purple-50/60 font-semibold"
                          : "border-gray-100 bg-gray-50/70"
                      }`}
                    >
                      <span className="block text-[11px] text-purple-900 font-bold truncate">Platinum</span>
                      <span className="text-[10px] text-gray-500 block">5,000+ Pts</span>
                      <span className="text-[9px] text-purple-700 font-medium block mt-0.5">VIP Travel</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between px-0.5">
                    <h4 className="text-xs font-bold text-gray-800 uppercase tracking-wide flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-gray-500" />
                      Points History
                    </h4>
                    <button
                      type="button"
                      disabled={isLoadingTransactions}
                      onClick={() => {
                        void loadTransactions();
                        void refreshMe();
                      }}
                      className="p-1 rounded-md text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer disabled:opacity-50"
                      title="Refresh activity"
                    >
                      <RotateCw
                        className={`w-3.5 h-3.5 ${isLoadingTransactions ? "animate-spin" : ""}`}
                      />
                    </button>
                  </div>

                  {isLoadingTransactions && transactions.length === 0 ? (
                    <div className="p-8 text-center bg-white rounded-lg border border-gray-100">
                      <Loader2 className="w-5 h-5 text-blue-600 animate-spin mx-auto mb-2" />
                      <p className="text-xs text-gray-500 font-medium">Loading transaction records...</p>
                    </div>
                  ) : transactionsError ? (
                    <div className="p-4 bg-rose-50 text-rose-800 rounded-lg text-xs space-y-2">
                      <p className="font-semibold">{transactionsError}</p>
                      <button
                        type="button"
                        onClick={() => void loadTransactions()}
                        className="px-3 py-1 rounded bg-rose-600 text-white font-medium hover:bg-rose-700 transition-colors"
                      >
                        Try Again
                      </button>
                    </div>
                  ) : transactions.length === 0 ? (
                    <div className="p-6 text-center bg-white rounded-lg border border-gray-100 space-y-1.5">
                      <Sparkles className="w-6 h-6 text-amber-500 mx-auto" />
                      <h5 className="text-xs font-bold text-gray-800">No Transactions Yet</h5>
                      <p className="text-[11px] text-gray-500 max-w-xs mx-auto">
                        Points earned on completed trips and admin adjustments will appear here.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {transactions.map((tx) => {
                        const isPositive = tx.points > 0;
                        const labelMap: Record<string, string> = {
                          earn: "Booking Points Earned",
                          adjust: "Account Adjustment",
                          reserve: "Reserved for Booking",
                          release: "Reservation Released",
                          commit: "Points Redeemed",
                          expire: "Points Expired",
                        };
                        const label = labelMap[tx.entryType] || "Loyalty Transaction";

                        return (
                          <div
                            key={tx.id}
                            className="p-3 bg-white rounded-lg border border-gray-100/90 shadow-2xs flex items-center justify-between gap-3"
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                                  tx.entryType === "earn"
                                    ? "bg-emerald-100 text-emerald-700"
                                    : tx.entryType === "adjust"
                                    ? "bg-blue-100 text-blue-700"
                                    : tx.entryType === "release"
                                    ? "bg-indigo-100 text-indigo-700"
                                    : "bg-amber-100 text-amber-800"
                                }`}
                              >
                                {isPositive ? (
                                  <ArrowDownLeft className="w-4 h-4 stroke-[2.2]" />
                                ) : (
                                  <ArrowUpRight className="w-4 h-4 stroke-[2.2]" />
                                )}
                              </div>

                              <div className="min-w-0">
                                <h5 className="text-xs font-bold text-gray-900 truncate">{label}</h5>
                                {tx.note && (
                                  <p className="text-[11px] text-gray-600 truncate">{tx.note}</p>
                                )}
                                <span className="text-[10px] text-gray-400 block">
                                  {new Date(tx.createdAt).toLocaleDateString("en-IN", {
                                    day: "numeric",
                                    month: "short",
                                    year: "numeric",
                                  })}
                                </span>
                              </div>
                            </div>

                            <div className="text-right shrink-0">
                              <span
                                className={`text-xs font-bold block ${
                                  isPositive ? "text-emerald-600" : "text-gray-900"
                                }`}
                              >
                                {isPositive ? `+${tx.points.toLocaleString("en-IN")}` : tx.points.toLocaleString("en-IN")}
                              </span>
                              <span className="text-[10px] text-gray-400">
                                Bal: {tx.balanceAfter.toLocaleString("en-IN")}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

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
