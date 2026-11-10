"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  X,
  Camera,
  Award,
  Calendar,
  MapPin,
  Lock,
  Eye,
  EyeOff,
  LogOut,
  User,
  Phone,
  Mail,
  CheckCircle2,
  Clock,
  Sparkles,
  ChevronRight,
  ShieldCheck,
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

  const [activeTab, setActiveTab] = useState<"trips" | "password" | "profile">("trips");

  // Photo upload ref
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [photoSuccess, setPhotoSuccess] = useState(false);

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
  const [profileMessage, setProfileMessage] = useState<string | null>(null);

  if (!isLoggedIn || !user || !isProfileDrawerOpen) return null;

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
          setPhotoSuccess(true);
          setTimeout(() => setPhotoSuccess(false), 2500);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle Password Update
  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword) {
      setPasswordMessage({ type: "error", text: "Please enter your current password" });
      return;
    }
    if (newPassword.length < 6) {
      setPasswordMessage({
        type: "error",
        text: "New password must be at least 6 characters long",
      });
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordMessage({ type: "error", text: "New passwords do not match" });
      return;
    }

    // Success simulation
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
    });
    setProfileMessage("Profile updated successfully!");
    setTimeout(() => setProfileMessage(null), 3000);
  };

  return (
    <div className="fixed inset-0 z-[160] overflow-hidden">
      {/* Dark Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity duration-300 animate-in fade-in"
        onClick={closeProfileDrawer}
      />

      {/* Right Slide-Over Panel */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        <div className="w-screen max-w-[440px] bg-white border-l border-gray-200 flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
          {/* ─── Drawer Header ─── */}
          <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/60">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <h2 className="text-base font-bold text-gray-900 tracking-tight">
                My Traveler Account
              </h2>
            </div>
            <button
              type="button"
              onClick={closeProfileDrawer}
              className="w-8 h-8 rounded-lg hover:bg-gray-200/80 text-gray-500 hover:text-gray-900 flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close drawer"
            >
              <X className="w-4 h-4 stroke-[2.2]" />
            </button>
          </div>

          {/* ─── Scrollable Body ─── */}
          <div className="flex-1 overflow-y-auto px-5 py-5 space-y-6">
            {/* ─── 1. User Profile Header with Photo Upload ─── */}
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-br from-[#073571] to-[#0A4899] text-white relative overflow-hidden shadow-sm">
              {/* Background decorative pattern */}
              <div className="absolute right-0 top-0 bottom-0 w-28 bg-white/5 rounded-l-full pointer-events-none" />

              {/* Avatar with Camera Upload Button */}
              <div className="relative shrink-0">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white/80 bg-white/10 relative shadow-sm">
                  <Image
                    src={user.avatar}
                    alt={user.name}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </div>

                {/* Upload Trigger Button */}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#1877F2] hover:bg-white text-white hover:text-[#1877F2] border-2 border-white flex items-center justify-center transition-colors cursor-pointer shadow-xs"
                  title="Upload profile photo"
                  aria-label="Upload profile photo"
                >
                  <Camera className="w-3 h-3 stroke-[2.2]" />
                </button>

                {/* Hidden File Input */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
              </div>

              {/* User Identity Info */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <h3 className="text-base font-bold text-white truncate">
                    {user.name}
                  </h3>
                  <span className="px-2 py-0.5 rounded-full bg-amber-400 text-gray-950 text-[10px] font-bold tracking-wide">
                    {user.tier}
                  </span>
                </div>
                <p className="text-xs text-white/80 truncate mt-0.5">
                  {user.email}
                </p>
                <p className="text-xs text-white/70 truncate mt-0.5">
                  {user.phone}
                </p>
              </div>
            </div>

            {/* Photo upload feedback */}
            {photoSuccess && (
              <div className="px-3 py-2 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium flex items-center gap-2 animate-in fade-in duration-200">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Profile photo updated successfully!</span>
              </div>
            )}

            {/* ─── 2. Loyalty Points Gold Card ─── */}
            <div className="p-4 sm:p-4.5 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-300 text-gray-950 border border-amber-300/80 shadow-xs relative overflow-hidden">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-amber-950 uppercase tracking-wider">
                    <Award className="w-4 h-4 text-amber-900" />
                    <span>KrikoTrip Loyalty Points</span>
                  </div>
                  <div className="mt-1 flex items-baseline gap-2">
                    <span className="text-2xl sm:text-3xl font-extrabold text-gray-950 tracking-tight">
                      {user.loyaltyPoints.toLocaleString("en-IN")}
                    </span>
                    <span className="text-xs font-bold text-amber-900">Points</span>
                  </div>
                </div>

                <div className="px-2.5 py-1 rounded-full bg-white/70 backdrop-blur-xs text-gray-900 text-xs font-bold shadow-2xs">
                  ₹{user.loyaltyPoints.toLocaleString("en-IN")} Discount Value
                </div>
              </div>

              {/* Progress Bar to Platinum */}
              <div className="mt-3 pt-3 border-t border-amber-600/20">
                <div className="flex items-center justify-between text-[11px] font-semibold text-amber-950 mb-1">
                  <span>Tier: Gold Explorer</span>
                  <span>550 pts to Platinum</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-amber-600/30 overflow-hidden">
                  <div className="h-full bg-amber-950 rounded-full w-[72%]" />
                </div>
                <p className="text-[10px] text-amber-900/90 mt-1.5 leading-snug">
                  Earn 10 points for every ₹1,000 spent on tour packages. Automatically redeemable at checkout.
                </p>
              </div>
            </div>

            {/* ─── 3. Navigation Tabs: Trip History / Password / Profile ─── */}
            <div className="flex items-center border-b border-gray-200">
              <button
                type="button"
                onClick={() => setActiveTab("trips")}
                className={`flex-1 py-2.5 text-xs sm:text-[13px] font-bold text-center border-b-2 transition-all cursor-pointer ${
                  activeTab === "trips"
                    ? "border-[#1877F2] text-[#1877F2]"
                    : "border-transparent text-gray-500 hover:text-gray-900"
                }`}
              >
                Trip History ({user.trips.length})
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("password")}
                className={`flex-1 py-2.5 text-xs sm:text-[13px] font-bold text-center border-b-2 transition-all cursor-pointer ${
                  activeTab === "password"
                    ? "border-[#1877F2] text-[#1877F2]"
                    : "border-transparent text-gray-500 hover:text-gray-900"
                }`}
              >
                Change Password
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("profile")}
                className={`flex-1 py-2.5 text-xs sm:text-[13px] font-bold text-center border-b-2 transition-all cursor-pointer ${
                  activeTab === "profile"
                    ? "border-[#1877F2] text-[#1877F2]"
                    : "border-transparent text-gray-500 hover:text-gray-900"
                }`}
              >
                Edit Profile
              </button>
            </div>

            {/* ─── TAB CONTENT 1: Trip History ─── */}
            {activeTab === "trips" && (
              <div className="space-y-3.5">
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span className="font-semibold text-gray-700">Past &amp; Upcoming Bookings</span>
                  <span>{user.trips.length} Bookings</span>
                </div>

                {user.trips.map((trip) => (
                  <div
                    key={trip.id}
                    className="p-3.5 rounded-xl border border-gray-200/90 bg-white hover:border-blue-300 hover:shadow-xs transition-all space-y-2.5"
                  >
                    <div className="flex items-start gap-3">
                      {/* Trip Thumbnail */}
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-100 shrink-0">
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
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
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

            {/* ─── TAB CONTENT 2: Change Password ─── */}
            {activeTab === "password" && (
              <form onSubmit={handlePasswordSubmit} className="space-y-4">
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
                  <label className="block text-xs font-medium text-gray-700 mb-1">
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
                      {showCurrentPass ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* New Password */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
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
                  <label className="block text-xs font-medium text-gray-700 mb-1">
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
                      {showConfirmPass ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
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

            {/* ─── TAB CONTENT 3: Edit Profile ─── */}
            {activeTab === "profile" && (
              <form onSubmit={handleProfileSubmit} className="space-y-4">
                {profileMessage && (
                  <div className="p-3 rounded-lg text-xs font-medium bg-emerald-50 border border-emerald-200 text-emerald-800">
                    {profileMessage}
                  </div>
                )}

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <div className="flex items-center gap-2 px-3 py-2.5 rounded-lg border border-gray-300 focus-within:border-[#1877F2] bg-white">
                    <User className="w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="w-full text-xs sm:text-sm text-gray-900 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <div className="flex items-center gap-2 px-3 py-2.5 rounded-lg border border-gray-300 focus-within:border-[#1877F2] bg-white">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      value={editPhone}
                      onChange={(e) => setEditPhone(e.target.value)}
                      className="w-full text-xs sm:text-sm text-gray-900 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <div className="flex items-center gap-2 px-3 py-2.5 rounded-lg border border-gray-300 focus-within:border-[#1877F2] bg-white">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <input
                      type="email"
                      value={editEmail}
                      onChange={(e) => setEditEmail(e.target.value)}
                      className="w-full text-xs sm:text-sm text-gray-900 outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-lg bg-[#1877F2] hover:bg-[#00285C] text-white font-semibold text-xs sm:text-sm shadow-xs transition-colors cursor-pointer"
                >
                  Save Profile Changes
                </button>
              </form>
            )}
          </div>

          {/* ─── Drawer Footer: Log Out ─── */}
          <div className="p-4 border-t border-gray-100 bg-gray-50 flex items-center justify-between">
            <span className="text-xs text-gray-500 font-medium">Signed in as {user.name}</span>
            <button
              type="button"
              onClick={logout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors cursor-pointer"
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
