"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import brandLogo from "@/public/assets/images/brand-logo.png";
import { X, Phone, ArrowRight, ArrowLeft, RotateCcw, ShieldCheck, CheckCircle2, Sparkles } from "lucide-react";
import { useAuth } from "./AuthContext";

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
}: AuthModalProps) {
  const { login } = useAuth();
  // Steps: "phone" (enter mobile number) | "otp" (enter OTP)
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(30);
  const [isResendActive, setIsResendActive] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Reset modal state when opened/closed
  useEffect(() => {
    if (isOpen) {
      setStep("phone");
      setPhoneNumber("");
      setOtp(["", "", "", "", "", ""]);
      setErrorMessage("");
      setSuccessMessage("");
      setTimer(30);
      setIsResendActive(false);
    }
  }, [isOpen]);

  // Resend OTP countdown timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (step === "otp" && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            setIsResendActive(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  if (!isOpen) return null;

  // Handle phone number input (only digits, max 10)
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, "").slice(0, 10);
    setPhoneNumber(val);
    if (errorMessage) setErrorMessage("");
  };

  // Submit phone number to send OTP
  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneNumber.length !== 10) {
      setErrorMessage("Please enter a valid 10-digit mobile number");
      return;
    }
    setErrorMessage("");
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setStep("otp");
      setTimer(30);
      setIsResendActive(false);
      // Auto-focus first OTP input
      setTimeout(() => {
        otpInputRefs.current[0]?.focus();
      }, 100);
    }, 400);
  };

  // Handle single digit OTP input
  const handleOtpChange = (index: number, value: string) => {
    const cleanValue = value.replace(/\D/g, "").slice(-1);
    const newOtp = [...otp];
    newOtp[index] = cleanValue;
    setOtp(newOtp);
    if (errorMessage) setErrorMessage("");

    // Auto-advance to next input
    if (cleanValue && index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  // Handle backspace navigation between OTP boxes
  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  // Handle OTP paste
  const handleOtpPaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (!pasted) return;
    const newOtp = [...otp];
    for (let i = 0; i < 6; i++) {
      newOtp[i] = pasted[i] || "";
    }
    setOtp(newOtp);
    const nextIndex = Math.min(pasted.length, 5);
    otpInputRefs.current[nextIndex]?.focus();
  };

  // Resend OTP handler
  const handleResendOtp = () => {
    if (!isResendActive) return;
    setOtp(["", "", "", "", "", ""]);
    setTimer(30);
    setIsResendActive(false);
    setErrorMessage("");
    setSuccessMessage("OTP resent successfully!");
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  // Verify OTP submit
  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    const fullOtp = otp.join("");
    if (fullOtp.length < 6) {
      setErrorMessage("Please enter the complete 6-digit OTP");
      return;
    }
    setErrorMessage("");
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setSuccessMessage("Signed in successfully!");
      login({ phone: phoneNumber ? `+91 ${phoneNumber}` : "+91 98765 43210" });
      setTimeout(() => {
        onClose();
      }, 500);
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog Card (Flat border, zero heavy shadow, clean typography) */}
      <div className="relative w-full max-w-[400px] bg-white rounded-xl border border-gray-200 overflow-hidden z-10 max-h-[92vh] flex flex-col animate-in fade-in duration-150">

        {/* Top Header */}
        <div className="px-5 pt-4 pb-3 flex items-center justify-between border-b border-gray-100 bg-gray-50/50">
          <div className="flex items-center gap-2">
            <Image
              src={brandLogo}
              alt="KrikoTrip Logo"
              width={110}
              height={28}
              className="h-6.5 w-auto object-contain"
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

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4">

          {/* Title & Description */}
          <div>
            <h3 className="text-base sm:text-lg font-medium text-gray-900 tracking-tight">
              {step === "phone" ? "Sign In to KrikoTrip" : "Enter Verification Code"}
            </h3>
            <p className="text-xs text-gray-500 font-normal mt-0.5">
              {step === "phone"
                ? "Enter your mobile number to receive an OTP verification code."
                : `We've sent a 6-digit OTP to +91 ${phoneNumber}`}
            </p>
          </div>

          {/* Social Logins: Kept at top on step 1 */}
          {step === "phone" && (
            <>
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => alert("Google Login")}
                  className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700 text-xs font-normal transition-colors cursor-pointer"
                >
                  <GoogleIcon />
                  <span>Google</span>
                </button>
                <button
                  type="button"
                  onClick={() => alert("Facebook Login")}
                  className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700 text-xs font-normal transition-colors cursor-pointer"
                >
                  <FacebookIcon />
                  <span>Facebook</span>
                </button>
              </div>

              {/* Divider */}
              <div className="relative flex items-center justify-center my-1">
                <div className="w-full border-t border-gray-200" />
                <span className="bg-white px-2.5 text-[11px] font-normal text-gray-400 uppercase tracking-wider absolute">
                  Or with mobile number
                </span>
              </div>
            </>
          )}

          {/* Error & Success Messages */}
          {errorMessage && (
            <div className="px-3 py-2 rounded-lg bg-red-50 border border-red-200 text-red-600 text-xs font-normal">
              {errorMessage}
            </div>
          )}

          {successMessage && (
            <div className="px-3 py-2 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-normal flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-emerald-600" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* ─── STEP 1: MOBILE NUMBER INPUT ─── */}
          {step === "phone" && (
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div>
                <label className="block text-xs font-normal text-gray-700 mb-1">
                  Mobile Number
                </label>
                <div className="relative flex items-center">
                  {/* Country Prefix */}
                  <div className="absolute left-3 flex items-center gap-1.5 text-xs text-gray-700 font-normal border-r border-gray-200 pr-2.5 pointer-events-none">
                    <span className="text-sm">🇮🇳</span>
                    <span>+91</span>
                  </div>

                  <input
                    type="tel"
                    required
                    value={phoneNumber}
                    onChange={handlePhoneChange}
                    placeholder="Enter 10-digit number"
                    className="w-full pl-20 pr-3.5 py-3 rounded-lg border border-gray-300 bg-white text-xs sm:text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-[#1877F2] transition-colors font-normal tracking-wide"
                    autoFocus
                  />
                </div>
                <p className="text-[11px] text-gray-400 mt-1 font-normal">
                  An OTP will be sent via SMS for instant verification.
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 rounded-lg bg-[#1877F2] hover:bg-blue-600 active:scale-[0.99] disabled:opacity-60 text-white text-xs sm:text-sm font-medium transition-colors cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>{isLoading ? "Sending OTP..." : "Get OTP"}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              {/* Quick Fake / Demo Login Button */}
              <button
                type="button"
                onClick={() => {
                  login();
                  onClose();
                }}
                className="w-full py-2 px-3 rounded-lg border border-amber-300 bg-amber-50 hover:bg-amber-100/80 text-amber-950 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>⚡ Instant Demo Login (Open Profile Bar)</span>
              </button>

              {/* Privacy note */}
              <div className="pt-2 text-center">
                <p className="text-[11px] text-gray-400 font-normal leading-relaxed">
                  By continuing, you agree to KrikoTrip&apos;s{" "}
                  <a href="/terms-of-service" className="text-gray-600 underline hover:text-[#1877F2]">
                    Terms
                  </a>{" "}
                  and{" "}
                  <a href="/privacy-policy" className="text-gray-600 underline hover:text-[#1877F2]">
                    Privacy Policy
                  </a>.
                </p>
              </div>
            </form>
          )}

          {/* ─── STEP 2: OTP INPUT ─── */}
          {step === "otp" && (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              {/* Change Phone Banner */}
              <div className="flex items-center justify-between px-3 py-2 bg-gray-50 rounded-lg border border-gray-200 text-xs">
                <div className="flex items-center gap-1.5 text-gray-700 font-normal">
                  <Phone className="w-3.5 h-3.5 text-gray-400" />
                  <span>+91 {phoneNumber}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setStep("phone")}
                  className="text-[#1877F2] hover:underline font-normal cursor-pointer text-xs flex items-center gap-1"
                >
                  <ArrowLeft className="w-3 h-3" />
                  <span>Edit</span>
                </button>
              </div>

              {/* 6 Digit Inputs */}
              <div>
                <label className="block text-xs font-normal text-gray-700 mb-2">
                  Enter 6-Digit OTP
                </label>
                <div className="grid grid-cols-6 gap-2" onPaste={handleOtpPaste}>
                  {otp.map((digit, idx) => (
                    <input
                      key={idx}
                      ref={(el) => {
                        otpInputRefs.current[idx] = el;
                      }}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(idx, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                      className="w-full aspect-square text-center text-sm sm:text-base font-medium rounded-lg border border-gray-300 focus:border-[#1877F2] outline-none text-gray-900 bg-white transition-colors"
                    />
                  ))}
                </div>
              </div>

              {/* Resend Timer */}
              <div className="flex items-center justify-between text-xs font-normal text-gray-500 pt-1">
                {isResendActive ? (
                  <button
                    type="button"
                    onClick={handleResendOtp}
                    className="text-[#1877F2] hover:underline flex items-center gap-1 cursor-pointer font-normal"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Resend OTP</span>
                  </button>
                ) : (
                  <span>Resend OTP in <strong className="font-normal text-gray-700">{timer}s</strong></span>
                )}

                <div className="flex items-center gap-1 text-[11px] text-gray-400">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Secure Verification</span>
                </div>
              </div>

              {/* Verify Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 rounded-lg bg-[#1877F2] hover:bg-blue-600 active:scale-[0.99] disabled:opacity-60 text-white text-xs sm:text-sm font-medium transition-colors cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>{isLoading ? "Verifying..." : "Verify & Sign In"}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              {/* Back to Phone option */}
              <button
                type="button"
                onClick={() => setStep("phone")}
                className="w-full text-center text-xs text-gray-500 hover:text-gray-800 font-normal pt-1 cursor-pointer"
              >
                ← Back to enter another number
              </button>
            </form>
          )}

        </div>
      </div>
    </div>
  );
}
