"use client";

import React, { useState } from "react";
import Image from "next/image";
import brandLogo from "@/public/assets/images/brand-logo.png";
import { X, Mail, Lock, User, Phone, Eye, EyeOff } from "lucide-react";
import { FaGoogle, FaFacebookF } from "react-icons/fa6";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultMode?: "login" | "register";
}

export default function AuthModal({
  isOpen,
  onClose,
  defaultMode = "login",
}: AuthModalProps) {
  const [mode, setMode] = useState<"login" | "register">(defaultMode);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Form states
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);

  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPhone, setRegisterPhone] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);

  if (!isOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Signed in successfully (demo)");
    onClose();
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (registerPassword !== registerConfirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    alert("Account created successfully (demo)");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-md bg-white rounded-xl shadow-2xl border border-gray-150 overflow-hidden z-10 max-h-[90vh] flex flex-col animate-in fade-in zoom-in-95 duration-200">
        {/* Top Header & Close Button */}
        <div className="px-6 pt-6 pb-4 flex items-center justify-between border-b border-gray-100">
          <div className="flex items-center gap-2">
            <Image
              src={brandLogo}
              alt="KrikoTrip Logo"
              width={120}
              height={32}
              className="h-8 w-auto object-contain"
            />
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-800 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Segmented Mode Switcher (Sign In / Register) */}
        <div className="px-6 pt-4">
          <div className="grid grid-cols-2 p-1 bg-gray-100 rounded-lg">
            <button
              type="button"
              onClick={() => setMode("login")}
              className={`py-2 text-xs sm:text-sm font-bold rounded-lg transition-all cursor-pointer ${
                mode === "login"
                  ? "bg-white text-gray-950 shadow-xs"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setMode("register")}
              className={`py-2 text-xs sm:text-sm font-bold rounded-lg transition-all cursor-pointer ${
                mode === "register"
                  ? "bg-white text-gray-950 shadow-xs"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Create Account
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-4">
          {/* Social Logins */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => alert("Google Login")}
              className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-700 text-xs font-semibold transition-colors cursor-pointer"
            >
              <FaGoogle className="w-3.5 h-3.5 text-red-500" />
              <span>Google</span>
            </button>
            <button
              type="button"
              onClick={() => alert("Facebook Login")}
              className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-700 text-xs font-semibold transition-colors cursor-pointer"
            >
              <FaFacebookF className="w-3.5 h-3.5 text-[#1877F2]" />
              <span>Facebook</span>
            </button>
          </div>

          {/* Divider */}
          <div className="relative flex items-center justify-center">
            <div className="w-full border-t border-gray-200" />
            <span className="bg-white px-3 text-[11px] font-semibold text-gray-400 uppercase tracking-wider absolute">
              Or with email
            </span>
          </div>

          {/* ─── Mode: SIGN IN FORM ─── */}
          {mode === "login" ? (
            <form onSubmit={handleLoginSubmit} className="space-y-3.5">
              {/* Email */}
              <div>
                <label className="block text-xs font-bold text-gray-800 mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-lg border border-gray-200 bg-gray-50/50 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:outline-none focus:border-[#1877F2] focus:bg-white transition-colors font-medium"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold text-gray-800">
                    Password
                  </label>
                  <a
                    href="#forgot"
                    onClick={(e) => {
                      e.preventDefault();
                      alert("Forgot password recovery link sent!");
                    }}
                    className="text-xs font-semibold text-[#1877F2] hover:underline"
                  >
                    Forgot?
                  </a>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-gray-200 bg-gray-50/50 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:outline-none focus:border-[#1877F2] focus:bg-white transition-colors font-medium"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Me */}
              <div className="flex items-center gap-2 pt-0.5">
                <input
                  type="checkbox"
                  id="rememberMe"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-[#1877F2] accent-[#1877F2] cursor-pointer"
                />
                <label
                  htmlFor="rememberMe"
                  className="text-xs text-gray-600 select-none cursor-pointer"
                >
                  Remember me for 30 days
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-2.5 rounded-lg bg-[#1877F2] hover:bg-blue-600 active:scale-98 text-white text-sm font-bold transition-all shadow-xs cursor-pointer mt-1"
              >
                Sign In
              </button>
            </form>
          ) : (
            /* ─── Mode: REGISTER FORM ─── */
            <form onSubmit={handleRegisterSubmit} className="space-y-3">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold text-gray-800 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    required
                    value={registerName}
                    onChange={(e) => setRegisterName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-lg border border-gray-200 bg-gray-50/50 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:outline-none focus:border-[#1877F2] focus:bg-white transition-colors font-medium"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-bold text-gray-800 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="email"
                    required
                    value={registerEmail}
                    onChange={(e) => setRegisterEmail(e.target.value)}
                    placeholder="john@example.com"
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-lg border border-gray-200 bg-gray-50/50 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:outline-none focus:border-[#1877F2] focus:bg-white transition-colors font-medium"
                  />
                </div>
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-xs font-bold text-gray-800 mb-1">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="tel"
                    required
                    value={registerPhone}
                    onChange={(e) => setRegisterPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-lg border border-gray-200 bg-gray-50/50 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:outline-none focus:border-[#1877F2] focus:bg-white transition-colors font-medium"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-bold text-gray-800 mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={registerPassword}
                    onChange={(e) => setRegisterPassword(e.target.value)}
                    placeholder="Create a strong password"
                    className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-gray-200 bg-gray-50/50 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:outline-none focus:border-[#1877F2] focus:bg-white transition-colors font-medium"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-xs font-bold text-gray-800 mb-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    required
                    value={registerConfirmPassword}
                    onChange={(e) => setRegisterConfirmPassword(e.target.value)}
                    placeholder="Re-enter password"
                    className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-gray-200 bg-gray-50/50 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:outline-none focus:border-[#1877F2] focus:bg-white transition-colors font-medium"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-start gap-2 pt-1">
                <input
                  type="checkbox"
                  id="agreeTerms"
                  required
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="w-4 h-4 mt-0.5 rounded border-gray-300 text-[#1877F2] accent-[#1877F2] cursor-pointer shrink-0"
                />
                <label
                  htmlFor="agreeTerms"
                  className="text-xs text-gray-600 select-none cursor-pointer leading-tight"
                >
                  I agree to the Terms of Service &amp; Privacy Policy.
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-2.5 rounded-lg bg-[#1877F2] hover:bg-blue-600 active:scale-98 text-white text-sm font-bold transition-all shadow-xs cursor-pointer mt-1"
              >
                Create Account
              </button>
            </form>
          )}

          {/* Bottom Switcher */}
          <div className="pt-2 text-center text-xs text-gray-600">
            {mode === "login" ? (
              <p>
                Don&apos;t have an account?{" "}
                <button
                  type="button"
                  onClick={() => setMode("register")}
                  className="font-bold text-[#1877F2] hover:underline cursor-pointer"
                >
                  Create one now
                </button>
              </p>
            ) : (
              <p>
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => setMode("login")}
                  className="font-bold text-[#1877F2] hover:underline cursor-pointer"
                >
                  Sign in here
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
