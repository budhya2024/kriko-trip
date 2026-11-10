"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
  X,
  Camera,
  Award,
  Calendar,
  MapPin,
  Eye,
  EyeOff,
  LogOut,
  User,
  Phone,
  Mail,
  CheckCircle2,
  ShieldCheck,
  Trash2,
  Compass,
  FileText,
} from "lucide-react";
import { useAuth } from "./AuthContext";

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

  const [activeTab, setActiveTab] = useState<"profile" | "trips" | "password">("profile");

  // Photo upload ref
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [photoSuccess, setPhotoSuccess] = useState<string | null>(null);

  // Password change state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

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

  // Handle Password Update
  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword) {
      setPasswordMessage({ type: "error", text: "Please enter your current password." });
      return;
    }
    if (newPassword.length < 6) {
      setPasswordMessage({
        type: "error",
        text: "New password must be at least 6 characters long.",
      });
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordMessage({ type: "error", text: "New passwords do not match." });
      return;
    }

    setPasswordMessage({
      type: "success",
      text: "Password updated successfully!",
    });
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setTimeout(() => setPasswordMessage(null), 3500);
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
      className={`fixed inset-0 z-[160] transition-opacity duration-300 ease-in-out ${
        isProfileDrawerOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
    >
      {/* ─── Smooth Backdrop ─── */}
      <div
        className={`fixed inset-0 bg-black/45 backdrop-blur-xs transition-opacity duration-300 ease-in-out ${
          isProfileDrawerOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={closeProfileDrawer}
      />

      {/* ─── Slide-Over Panel (Smooth ease-out translation, clean professional styling) ─── */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-4 sm:pl-10">
        <div
          className={`w-screen max-w-[460px] bg-white border-l border-gray-200 flex flex-col shadow-2xl transition-transform duration-300 ease-out ${
            isProfileDrawerOpen ? "translate-x-0" : "translate-x-full"
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
              className="w-8 h-8 rounded-md border border-gray-200 hover:border-gray-300 hover:bg-gray-100 text-gray-500 hover:text-gray-900 flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close drawer"
            >
              <X className="w-4 h-4 stroke-[2.2]" />
            </button>
          </div>

          {/* ─── Scrollable Body ─── */}
          <div className="flex-1 overflow-y-auto px-5 py-5 space-y-5">
            {/* ─── 1. User Profile Header Card ─── */}
            <div className="p-4 rounded-lg bg-[#0F172A] text-white border border-gray-800 relative shadow-xs">
              <div className="flex items-center gap-3.5">
                {/* Avatar with initial fallback */}
                <div className="relative shrink-0">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white/70 bg-[#1E293B] relative flex items-center justify-center shadow-xs">
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
                    className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#1877F2] hover:bg-blue-600 text-white border-2 border-[#0F172A] flex items-center justify-center transition-colors cursor-pointer shadow-xs"
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
              <div className="mt-3 pt-3 border-t border-gray-800 flex items-center justify-between text-xs text-gray-300">
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
              <div className="px-3.5 py-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium flex items-center gap-2 animate-in fade-in duration-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{photoSuccess}</span>
              </div>
            )}

            {/* ─── 2. Loyalty Points Summary Card ─── */}
            <div className="p-3.5 rounded-lg border border-amber-200 bg-amber-50/70 text-gray-900 shadow-2xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-md bg-amber-100 border border-amber-200 flex items-center justify-center text-amber-700">
                    <Award className="w-4 h-4" />
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
                  <span className="inline-block px-2.5 py-1 rounded-md bg-amber-200/80 border border-amber-300 text-amber-950 text-xs font-bold shadow-2xs">
                    ₹{user.loyaltyPoints.toLocaleString("en-IN")} Off
                  </span>
                  <span className="block text-[10px] text-gray-500 mt-0.5">
                    Valid on all tours
                  </span>
                </div>
              </div>
            </div>

            {/* ─── 3. Professional Segmented Navigation Tabs ─── */}
            <div className="grid grid-cols-3 gap-1 p-1 bg-gray-100 rounded-lg border border-gray-200 text-xs font-medium">
              <button
                type="button"
                onClick={() => setActiveTab("profile")}
                className={`py-2 px-2 text-center rounded-md transition-all cursor-pointer truncate ${
                  activeTab === "profile"
                    ? "bg-white text-gray-900 font-bold shadow-xs border border-gray-200/80"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Profile Info
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("trips")}
                className={`py-2 px-2 text-center rounded-md transition-all cursor-pointer truncate ${
                  activeTab === "trips"
                    ? "bg-white text-gray-900 font-bold shadow-xs border border-gray-200/80"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Bookings ({user.trips.length})
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("password")}
                className={`py-2 px-2 text-center rounded-md transition-all cursor-pointer truncate ${
                  activeTab === "password"
                    ? "bg-white text-gray-900 font-bold shadow-xs border border-gray-200/80"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Password
              </button>
            </div>

            {/* ─── TAB 1: Edit Profile Form ─── */}
            {activeTab === "profile" && (
              <form onSubmit={handleProfileSubmit} className="space-y-3.5">
                {profileMessage && (
                  <div className="p-3 rounded-lg text-xs font-medium bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center gap-2 animate-in fade-in duration-150">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{profileMessage}</span>
                  </div>
                )}

                {/* Full Name */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Full Name
                  </label>
                  <div className="flex items-center gap-2 px-3 py-2.5 rounded-lg border border-gray-300 focus-within:border-[#1877F2] bg-white transition-colors">
                    <User className="w-4 h-4 text-gray-400 shrink-0" />
                    <input
                      type="text"
                      required
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      placeholder="Enter full name"
                      className="w-full text-xs sm:text-sm text-gray-900 outline-none font-normal"
                    />
                  </div>
                </div>

                {/* Email Address */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Email Address
                  </label>
                  <div className="flex items-center gap-2 px-3 py-2.5 rounded-lg border border-gray-300 focus-within:border-[#1877F2] bg-white transition-colors">
                    <Mail className="w-4 h-4 text-gray-400 shrink-0" />
                    <input
                      type="email"
                      required
                      value={editEmail}
                      onChange={(e) => setEditEmail(e.target.value)}
                      placeholder="Enter email address"
                      className="w-full text-xs sm:text-sm text-gray-900 outline-none font-normal"
                    />
                  </div>
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <div className="flex items-center gap-2 px-3 py-2.5 rounded-lg border border-gray-300 focus-within:border-[#1877F2] bg-white transition-colors">
                    <Phone className="w-4 h-4 text-gray-400 shrink-0" />
                    <input
                      type="tel"
                      required
                      value={editPhone}
                      onChange={(e) => setEditPhone(e.target.value)}
                      placeholder="Enter phone number"
                      className="w-full text-xs sm:text-sm text-gray-900 outline-none font-normal"
                    />
                  </div>
                </div>

                {/* City / Location */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    City / Location
                  </label>
                  <div className="flex items-center gap-2 px-3 py-2.5 rounded-lg border border-gray-300 focus-within:border-[#1877F2] bg-white transition-colors">
                    <MapPin className="w-4 h-4 text-gray-400 shrink-0" />
                    <input
                      type="text"
                      value={editLocation}
                      onChange={(e) => setEditLocation(e.target.value)}
                      placeholder="e.g. Kolkata, West Bengal"
                      className="w-full text-xs sm:text-sm text-gray-900 outline-none font-normal"
                    />
                  </div>
                </div>

                {/* Bio / Preferences */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Travel Preferences / Bio
                  </label>
                  <div className="flex items-start gap-2 px-3 py-2 rounded-lg border border-gray-300 focus-within:border-[#1877F2] bg-white transition-colors">
                    <FileText className="w-4 h-4 text-gray-400 shrink-0 mt-1" />
                    <textarea
                      rows={2}
                      value={editBio}
                      onChange={(e) => setEditBio(e.target.value)}
                      placeholder="Add personal travel preferences or bio notes"
                      className="w-full text-xs sm:text-sm text-gray-900 outline-none font-normal resize-none"
                    />
                  </div>
                </div>

                {/* Save Button */}
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-lg bg-[#1877F2] hover:bg-[#00285C] text-white font-semibold text-xs sm:text-sm shadow-xs transition-colors cursor-pointer"
                >
                  Save Profile Changes
                </button>
              </form>
            )}

            {/* ─── TAB 2: Trip History ─── */}
            {activeTab === "trips" && (
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-gray-500 pb-1">
                  <span className="font-semibold text-gray-700">Recent &amp; Past Bookings</span>
                  <span>{user.trips.length} Bookings</span>
                </div>

                {user.trips.map((trip) => (
                  <div
                    key={trip.id}
                    className="p-3 rounded-lg border border-gray-200 bg-white hover:border-blue-300 hover:shadow-2xs transition-all space-y-2.5"
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
                            className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                              trip.status === "Confirmed"
                                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                : "bg-blue-50 text-blue-700 border border-blue-200"
                            }`}
                          >
                            {trip.status}
                          </span>
                        </div>

                        <h4 className="text-xs sm:text-sm font-bold text-gray-900 truncate mt-0.5">
                          {trip.packageTitle}
                        </h4>

                        <div className="flex items-center gap-1.5 text-[11px] text-gray-500 mt-0.5">
                          <MapPin className="w-3 h-3 text-[#1877F2] shrink-0" />
                          <span className="truncate">{trip.destination}</span>
                        </div>
                      </div>
                    </div>

                    {/* Dates & Cost Footer */}
                    <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-600">
                      <div className="flex items-center gap-1 text-gray-500">
                        <Calendar className="w-3 h-3 text-gray-400" />
                        <span>{trip.dates}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-emerald-600 font-semibold">
                          +{trip.pointsEarned} pts
                        </span>
                        <span className="font-bold text-gray-900">
                          ₹{trip.amount.toLocaleString("en-IN")}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* ─── TAB 3: Change Password ─── */}
            {activeTab === "password" && (
              <form onSubmit={handlePasswordSubmit} className="space-y-3.5">
                <div className="flex items-center gap-2 pb-1 text-xs text-gray-600">
                  <ShieldCheck className="w-4 h-4 text-[#1877F2]" />
                  <span>Protect your account with a secure password</span>
                </div>

                {passwordMessage && (
                  <div
                    className={`p-3 rounded-lg text-xs font-medium ${
                      passwordMessage.type === "success"
                        ? "bg-emerald-50 border border-emerald-200 text-emerald-800"
                        : "bg-red-50 border border-red-200 text-red-700"
                    }`}
                  >
                    {passwordMessage.text}
                  </div>
                )}

                {/* Current Password */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Current Password
                  </label>
                  <div className="relative">
                    <input
                      type={showCurrentPass ? "text" : "password"}
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder="Enter current password"
                      className="w-full px-3 py-2.5 pr-10 rounded-lg border border-gray-300 focus:border-[#1877F2] outline-none text-xs sm:text-sm text-gray-900"
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrentPass(!showCurrentPass)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showCurrentPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* New Password */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showNewPass ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Min. 6 characters"
                      className="w-full px-3 py-2.5 pr-10 rounded-lg border border-gray-300 focus:border-[#1877F2] outline-none text-xs sm:text-sm text-gray-900"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPass(!showNewPass)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showNewPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Confirm New Password */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPass ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Re-enter new password"
                      className="w-full px-3 py-2.5 pr-10 rounded-lg border border-gray-300 focus:border-[#1877F2] outline-none text-xs sm:text-sm text-gray-900"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPass(!showConfirmPass)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-lg bg-[#1877F2] hover:bg-[#00285C] text-white font-semibold text-xs sm:text-sm shadow-xs transition-colors cursor-pointer"
                >
                  Update Password
                </button>
              </form>
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
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors cursor-pointer shrink-0 border border-transparent hover:border-red-200"
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
