"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import brandLogo from "@/public/assets/images/brand-logo.png";
import { Header, Footer } from "@/components/shared";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";

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

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Signed in successfully (demo)");
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      <Header />

      <main className="flex-1 flex items-center justify-center py-10 sm:py-16 px-4">
        {/* Card: Flat border, zero shadow */}
        <div className="w-full max-w-[420px] bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
          
          {/* Logo & Heading */}
          <div className="text-center mb-6">
            <Link href="/" className="inline-block mb-3">
              <Image
                src={brandLogo}
                alt="KrikoTrip Logo"
                width={125}
                height={32}
                className="h-7 w-auto mx-auto object-contain"
              />
            </Link>
            <h1 className="text-xl font-medium text-gray-900 tracking-tight">
              Sign In
            </h1>
            <p className="text-xs text-gray-500 font-normal mt-1">
              Enter your details to sign in to your account.
            </p>
          </div>

          {/* Social Logins: Flat, no shadow, normal font */}
          <div className="grid grid-cols-2 gap-2.5 mb-5">
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
          <div className="relative flex items-center justify-center mb-5">
            <div className="w-full border-t border-gray-200" />
            <span className="bg-white px-2.5 text-[11px] font-normal text-gray-400 uppercase tracking-wider absolute">
              Or with email
            </span>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-normal text-gray-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-lg border border-gray-300 bg-white text-xs sm:text-sm text-gray-900 placeholder:text-gray-400 placeholder:font-normal outline-none focus:border-[#1877F2] transition-colors font-normal"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-normal text-gray-700">
                  Password
                </label>
                <a
                  href="#forgot"
                  onClick={(e) => {
                    e.preventDefault();
                    alert("Password reset instructions sent to your email!");
                  }}
                  className="text-xs font-normal text-[#1877F2] hover:underline"
                >
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-gray-300 bg-white text-xs sm:text-sm text-gray-900 placeholder:text-gray-400 placeholder:font-normal outline-none focus:border-[#1877F2] transition-colors font-normal"
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

            <div className="flex items-center gap-2 pt-0.5">
              <input
                type="checkbox"
                id="pageRememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 text-[#1877F2] accent-[#1877F2] cursor-pointer"
              />
              <label
                htmlFor="pageRememberMe"
                className="text-xs text-gray-600 select-none cursor-pointer font-normal"
              >
                Remember me on this device
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-lg bg-[#1877F2] hover:bg-blue-600 active:scale-[0.99] text-white text-xs sm:text-sm font-medium transition-colors cursor-pointer flex items-center justify-center gap-1.5"
            >
              <span>Sign In</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>

          {/* Footer note */}
          <div className="mt-6 pt-4 border-t border-gray-150 text-center text-xs text-gray-600 font-normal">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="text-[#1877F2] hover:underline font-medium ml-0.5"
            >
              Register
            </Link>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
