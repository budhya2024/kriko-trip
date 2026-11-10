"use client";

import React, { useState } from "react";
import Image from "next/image";
import brandLogo from "@/public/assets/images/brand-logo.png";
import { X, Mail, Lock, User, Phone, Eye, EyeOff } from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultMode?: "login" | "register";
}

function GoogleIcon() {
  return (
    <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
      />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg className="w-4 h-4 shrink-0 fill-[#1877F2]" viewBox="0 0 24 24">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
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
        className="fixed inset-0 bg-black/55 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog Card (Clean professional rounded-xl, no large rounded borders) */}
      <div className="relative w-full max-w-[430px] bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden z-10 max-h-[92vh] flex flex-col animate-in fade-in zoom-in-95 duration-150">
        
        {/* Top Header */}
        <div className="px-6 pt-5 pb-3.5 flex items-center justify-between border-b border-gray-150 bg-gray-50/50">
          <div className="flex items-center gap-2">
            <Image
              src={brandLogo}
              alt="KrikoTrip Logo"
              width={115}
              height={30}
              className="h-7 w-auto object-contain"
            />
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-7 h-7 rounded-md hover:bg-gray-200/80 text-gray-500 hover:text-gray-800 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-4">
          
          {/* Welcome Text */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 tracking-tight">
              {mode === "login" ? "Welcome back" : "Create an account"}
            </h3>
            <p className="text-xs text-gray-500 font-normal mt-0.5">
              {mode === "login"
                ? "Enter your credentials to manage your bookings."
                : "Sign up to start planning your dream holidays."}
            </p>
          </div>

          {/* Clean Segmented Tab Switcher */}
          <div className="grid grid-cols-2 p-1 bg-gray-100 rounded-lg text-xs font-medium">
            <button
              type="button"
              onClick={() => setMode("login")}
              className={`py-2 rounded-md transition-all cursor-pointer ${
                mode === "login"
                  ? "bg-white text-gray-900 shadow-2xs font-semibold"
                  : "text-gray-600 hover:text-gray-900 font-normal"
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setMode("register")}
              className={`py-2 rounded-md transition-all cursor-pointer ${
                mode === "register"
                  ? "bg-white text-gray-900 shadow-2xs font-semibold"
                  : "text-gray-600 hover:text-gray-900 font-normal"
              }`}
            >
              Register
            </button>
          </div>

          {/* Social Logins: Official Google and Facebook styling */}
          <div className="grid grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={() => alert("Google Login")}
              className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700 text-xs font-medium transition-colors cursor-pointer shadow-2xs"
            >
              <GoogleIcon />
              <span>Google</span>
            </button>
            <button
              type="button"
              onClick={() => alert("Facebook Login")}
              className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700 text-xs font-medium transition-colors cursor-pointer shadow-2xs"
            >
              <FacebookIcon />
              <span>Facebook</span>
            </button>
          </div>

          {/* Divider */}
          <div className="relative flex items-center justify-center my-1">
            <div className="w-full border-t border-gray-200" />
            <span className="bg-white px-2.5 text-[11px] font-normal text-gray-400 uppercase tracking-wider absolute">
              Or with email
            </span>
          </div>

          {/* ─── Mode: SIGN IN FORM ─── */}
          {mode === "login" ? (
            <form onSubmit={handleLoginSubmit} className="space-y-3.5">
              {/* Email */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  <input
                    type="email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-lg border border-gray-300 bg-white text-xs sm:text-sm text-gray-900 placeholder:text-gray-400 placeholder:font-normal outline-none focus:border-[#1877F2] transition-colors shadow-2xs font-normal"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-medium text-gray-700">
                    Password
                  </label>
                  <a
                    href="#forgot"
                    onClick={(e) => {
                      e.preventDefault();
                      alert("Password reset instructions sent to your email!");
                    }}
                    className="text-xs font-medium text-[#1877F2] hover:underline"
                  >
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full pl-9 pr-9 py-2.5 rounded-lg border border-gray-300 bg-white text-xs sm:text-sm text-gray-900 placeholder:text-gray-400 placeholder:font-normal outline-none focus:border-[#1877F2] transition-colors shadow-2xs font-normal"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                    aria-label="Toggle password visibility"
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
                  Remember me on this device
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-2.5 rounded-lg bg-[#1877F2] hover:bg-blue-600 active:scale-[0.99] text-white text-xs sm:text-sm font-semibold transition-colors shadow-xs cursor-pointer mt-1"
              >
                Sign In
              </button>
            </form>
          ) : (
            /* ─── Mode: REGISTER FORM ─── */
            <form onSubmit={handleRegisterSubmit} className="space-y-3">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  <input
                    type="text"
                    required
                    value={registerName}
                    onChange={(e) => setRegisterName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-lg border border-gray-300 bg-white text-xs sm:text-sm text-gray-900 placeholder:text-gray-400 placeholder:font-normal outline-none focus:border-[#1877F2] transition-colors shadow-2xs font-normal"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  <input
                    type="email"
                    required
                    value={registerEmail}
                    onChange={(e) => setRegisterEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-lg border border-gray-300 bg-white text-xs sm:text-sm text-gray-900 placeholder:text-gray-400 placeholder:font-normal outline-none focus:border-[#1877F2] transition-colors shadow-2xs font-normal"
                  />
                </div>
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  <input
                    type="tel"
                    required
                    value={registerPhone}
                    onChange={(e) => setRegisterPhone(e.target.value)}
                    placeholder="Enter your phone number"
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-lg border border-gray-300 bg-white text-xs sm:text-sm text-gray-900 placeholder:text-gray-400 placeholder:font-normal outline-none focus:border-[#1877F2] transition-colors shadow-2xs font-normal"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={registerPassword}
                    onChange={(e) => setRegisterPassword(e.target.value)}
                    placeholder="Create a password"
                    className="w-full pl-9 pr-9 py-2.5 rounded-lg border border-gray-300 bg-white text-xs sm:text-sm text-gray-900 placeholder:text-gray-400 placeholder:font-normal outline-none focus:border-[#1877F2] transition-colors shadow-2xs font-normal"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                    aria-label="Toggle password visibility"
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
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    required
                    value={registerConfirmPassword}
                    onChange={(e) => setRegisterConfirmPassword(e.target.value)}
                    placeholder="Re-enter your password"
                    className="w-full pl-9 pr-9 py-2.5 rounded-lg border border-gray-300 bg-white text-xs sm:text-sm text-gray-900 placeholder:text-gray-400 placeholder:font-normal outline-none focus:border-[#1877F2] transition-colors shadow-2xs font-normal"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                    aria-label="Toggle password visibility"
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
              <div className="flex items-start gap-2 pt-0.5">
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
                className="w-full py-2.5 rounded-lg bg-[#1877F2] hover:bg-blue-600 active:scale-[0.99] text-white text-xs sm:text-sm font-semibold transition-colors shadow-xs cursor-pointer mt-1"
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
                  className="font-semibold text-[#1877F2] hover:underline cursor-pointer"
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
                  className="font-semibold text-[#1877F2] hover:underline cursor-pointer"
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
