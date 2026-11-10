"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import brandLogo from "@/public/assets/images/brand-logo.png";
import {
  Search,
  User,
  ChevronDown,
  X,
  Plus,
  Minus,
} from "lucide-react";

// ─── Navigation & Mega Menu Data (Indian Destinations) ─────────────────────
const destinationColumns = [
  {
    continent: "North India",
    countries: [
      { name: "Kashmir Valley", code: "in" },
      { name: "Leh Ladakh", code: "in" },
      { name: "Manali & Kullu", code: "in" },
      { name: "Shimla Hills", code: "in" },
      { name: "Rishikesh & Haridwar", code: "in" },
      { name: "Amritsar Heritage", code: "in" },
    ],
  },
  {
    continent: "South India",
    countries: [
      { name: "Kerala Backwaters", code: "in" },
      { name: "Munnar Tea Hills", code: "in" },
      { name: "Ooty & Nilgiris", code: "in" },
      { name: "Coorg Coffee Hills", code: "in" },
      { name: "Hampi Ruins", code: "in" },
      { name: "Rameshwaram", code: "in" },
    ],
  },
  {
    continent: "East & Northeast",
    countries: [
      { name: "Sundarban Mangroves", code: "in" },
      { name: "Darjeeling Queen", code: "in" },
      { name: "Gangtok & Sikkim", code: "in" },
      { name: "Shillong, Meghalaya", code: "in" },
      { name: "Kaziranga Safari", code: "in" },
      { name: "Puri, Odisha", code: "in" },
    ],
  },
  {
    continent: "West India",
    countries: [
      { name: "North & South Goa", code: "in" },
      { name: "Jaipur Pink City", code: "in" },
      { name: "Udaipur Lake Palace", code: "in" },
      { name: "Jaisalmer Desert", code: "in" },
      { name: "Rann of Kutch", code: "in" },
      { name: "Mahabaleshwar", code: "in" },
    ],
  },
  {
    continent: "Central & Heritage",
    countries: [
      { name: "Varanasi Ghats", code: "in" },
      { name: "Agra & Taj Mahal", code: "in" },
      { name: "Khajuraho Temples", code: "in" },
      { name: "Bandhavgarh Tiger", code: "in" },
      { name: "Kanha National Park", code: "in" },
    ],
  },
  {
    continent: "Islands & Coastal",
    countries: [
      { name: "Andaman & Nicobar", code: "in" },
      { name: "Havelock Island", code: "in" },
      { name: "Neil Island", code: "in" },
      { name: "Lakshadweep Islands", code: "in" },
      { name: "Gokarna Coastal", code: "in" },
    ],
  },
];

const travelPackageSubItems = [
  "Honeymoon Special",
  "Family Vacation",
  "Adventure Trekking",
  "Luxury Cruise",
  "Wildlife Safari",
  "Weekend Getaway",
];

const navItems = [
  {
    name: "Home",
    href: "/",
    isActive: true,
    hasDropdown: false,
  },
  {
    name: "Destinations",
    href: "/#featured-destinations",
    hasDropdown: true,
    isMegaMenu: true,
  },
  {
    name: "Travel Package",
    href: "/tour-packages",
    hasDropdown: true,
    isMegaMenu: false,
    subItems: travelPackageSubItems,
  },
  {
    name: "Gallery",
    href: "/gallery",
    hasDropdown: false,
  },
  {
    name: "Blogs",
    href: "/blogs",
    hasDropdown: false,
  },
  {
    name: "About",
    href: "/about-us",
    hasDropdown: false,
  },
  {
    name: "Contact",
    href: "/contact-us",
    hasDropdown: false,
  },
];

// ─── Header Component ───────────────────────────────────────────────────────
import AuthModal from "./AuthModal";
import SearchModal from "./SearchModal";

export default function Header() {
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isSupportDropdownOpen, setIsSupportDropdownOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<"login" | "register">("login");

  // Mobile Accordion state
  const [openMobileSection, setOpenMobileSection] = useState<string | null>("Destinations");
  const [openMobileContinent, setOpenMobileContinent] = useState<string | null>("Africa");

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Shortcut Ctrl/Cmd + K for Search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchModalOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);
  const supportDropdownRef = useRef<HTMLDivElement | null>(null);

  // Close support dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        supportDropdownRef.current &&
        !supportDropdownRef.current.contains(event.target as Node)
      ) {
        setIsSupportDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (isMobileDrawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileDrawerOpen]);

  const handleMouseEnter = (name: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveDropdown(name);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  return (
    <header className="w-full bg-white relative z-50 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)]">
      {/* ─── Top Header Bar ──────────────────────────────────────────────── */}
      <div className="container">
        <div className="flex items-center justify-between h-20 gap-3">

          {/* Logo (Desktop & Mobile) */}
          <Link href="/" className="flex items-center shrink-0">
            <Image
              src={brandLogo}
              alt="KrikoTrip Logo"
              priority
              className="h-10 sm:h-11 w-auto object-contain"
            />
          </Link>

          {/* Desktop Search Bar (Center) */}
          <div className="hidden lg:flex flex-1 max-w-xl mx-4 lg:mx-8">
            <button
              type="button"
              onClick={() => setIsSearchModalOpen(true)}
              className="relative w-full text-left cursor-pointer group"
            >
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-hover:text-[#1877F2] transition-colors">
                <Search className="w-[18px] h-[18px] stroke-[2]" />
              </div>
              <div className="w-full bg-[#f4f5f7] hover:bg-[#eceef2] text-gray-400 hover:text-gray-600 text-sm font-normal pl-11 pr-4 py-2.5 rounded-lg border border-transparent transition-all duration-200 flex items-center justify-between">
                <span>Find Your Perfect Tour Package</span>

              </div>
            </button>
          </div>

          {/* Desktop Right Utilities (Need Help?, Login) */}
          <div className="hidden lg:flex items-center gap-5 shrink-0">
            {/* Need Help? link */}
            <Link
              href="/contact-us"
              className="text-sm font-semibold text-[#0284c7] hover:text-[#0369a1] transition-colors"
            >
              Need Help?
            </Link>

            {/* Vertical Divider */}
            <div className="h-4 w-px bg-gray-200" />

            {/* Login Button */}
            <button
              type="button"
              onClick={() => {
                setAuthModalMode("login");
                setIsAuthModalOpen(true);
              }}
              className="flex items-center gap-2 bg-[#121820] hover:bg-black text-white px-5 py-2.5 rounded-full font-medium text-sm shadow-xs transition-all duration-200 active:scale-95 cursor-pointer"
            >
              <User className="w-4 h-4" />
              <span>Login</span>
            </button>
          </div>

          {/* ─── Mobile Top Header Elements ─────────────────────────────────── */}
          <div className="flex lg:hidden items-center gap-2 sm:gap-2.5">
            {/* Mobile Login Icon Button */}
            <button
              type="button"
              onClick={() => {
                setAuthModalMode("login");
                setIsAuthModalOpen(true);
              }}
              className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center bg-white text-gray-800 hover:bg-gray-50 transition-colors focus:outline-none cursor-pointer"
              aria-label="Login"
            >
              <User className="w-4 h-4 stroke-[2]" />
            </button>

            {/* Mobile Circular Search Button */}
            <button
              type="button"
              onClick={() => setIsSearchModalOpen(true)}
              className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center bg-white text-gray-800 hover:bg-gray-50 transition-colors focus:outline-none cursor-pointer"
              aria-label="Search"
            >
              <Search className="w-4 h-4 stroke-[2]" />
            </button>

            {/* Mobile 2-line Hamburger Menu Button */}
            <button
              type="button"
              onClick={() => setIsMobileDrawerOpen(true)}
              className="w-10 h-10 rounded-full border border-gray-200 flex flex-col items-center justify-center gap-[5px] bg-white hover:bg-gray-50 transition-colors focus:outline-none p-2"
              aria-label="Open navigation menu"
            >
              <span className="w-5 h-[2px] bg-gray-900 rounded-full" />
              <span className="w-3.5 h-[2px] bg-gray-900 rounded-full self-start ml-0.5" />
            </button>
          </div>

        </div>
      </div>

      {/* ─── Desktop Lower Navigation Bar ─────────────────────────────────── */}
      <div className="hidden lg:block border-t border-gray-100/90 relative">
        <div className="container">
          <div className="flex items-center justify-between h-14">

            {/* Nav Menu Links */}
            <nav className="flex items-center gap-7">
              {navItems.map((item) => (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => item.hasDropdown && handleMouseEnter(item.name)}
                  onMouseLeave={() => item.hasDropdown && handleMouseLeave()}
                >
                  <Link
                    href={item.href}
                    className={`flex items-center gap-1.5 text-[15px] font-semibold tracking-tight transition-colors py-4 ${item.isActive
                      ? "text-[#0284c7]"
                      : "text-gray-800 hover:text-[#0284c7]"
                      }`}
                  >
                    <span>{item.name}</span>
                    {item.hasDropdown && (
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === item.name ? "rotate-180 text-[#0284c7]" : "text-gray-600"
                          }`}
                      />
                    )}
                  </Link>

                  {/* Standard Dropdown for Travel Package */}
                  {item.hasDropdown && !item.isMegaMenu && item.subItems && (
                    <div
                      onMouseEnter={() => handleMouseEnter(item.name)}
                      onMouseLeave={handleMouseLeave}
                      className={`absolute left-0 top-full pt-1 transition-all duration-200 ${activeDropdown === item.name
                        ? "opacity-100 visible translate-y-0"
                        : "opacity-0 invisible -translate-y-2 pointer-events-none"
                        }`}
                    >
                      <div className="w-52 bg-white rounded-xl shadow-xl border border-gray-100 py-2 overflow-hidden">
                        {item.subItems.map((subItem) => (
                          <Link
                            key={subItem}
                            href="/tour-packages"
                            className="block px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                          >
                            {subItem}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Right Support Widget & Dropdown */}
            <div ref={supportDropdownRef} className="relative ml-auto lg:ml-0">
              {/* WhatsApp bar / toggle */}
              <button
                type="button"
                onClick={() => setIsSupportDropdownOpen(!isSupportDropdownOpen)}
                className="flex items-center gap-3 px-1 py-1.5 cursor-pointer bg-transparent hover:bg-transparent text-left outline-none border-0"
              >
                {/* WhatsApp Green Icon inside white circle */}
                <div className="w-9 h-9 rounded-full bg-white shadow-xs border border-gray-100 flex items-center justify-center shrink-0">
                  <svg
                    viewBox="0 0 24 24"
                    fill="#25D366"
                    className="w-5 h-5"
                  >
                    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2ZM12.05 20.15C10.56 20.15 9.11 19.75 7.85 19L7.55 18.82L4.43 19.64L5.26 16.59L5.07 16.29C4.24 14.97 3.81 13.46 3.81 11.91C3.81 7.37 7.5 3.69 12.05 3.69C14.25 3.69 16.32 4.55 17.88 6.11C19.44 7.67 20.3 9.74 20.3 11.94C20.3 16.48 16.6 20.15 12.05 20.15ZM16.57 14.33C16.32 14.2 15.1 13.6 14.87 13.52C14.65 13.43 14.48 13.39 14.32 13.64C14.15 13.89 13.68 14.45 13.53 14.62C13.39 14.78 13.24 14.81 12.99 14.68C12.74 14.56 11.94 14.29 10.99 13.44C10.25 12.78 9.75 11.96 9.61 11.71C9.46 11.46 9.59 11.33 9.72 11.2C9.83 11.09 9.97 10.91 10.09 10.76C10.22 10.62 10.26 10.51 10.34 10.35C10.42 10.18 10.38 10.04 10.32 9.91C10.26 9.79 9.77 8.58 9.56 8.08C9.36 7.59 9.16 7.66 9.01 7.65C8.87 7.64 8.71 7.64 8.54 7.64C8.38 7.64 8.11 7.7 7.89 7.95C7.66 8.19 7.03 8.78 7.03 9.99C7.03 11.2 7.91 12.37 8.03 12.53C8.16 12.7 9.76 15.17 12.22 16.23C12.8 16.48 13.26 16.63 13.61 16.74C14.2 16.93 14.74 16.9 15.16 16.84C15.63 16.77 16.61 16.25 16.81 15.68C17.02 15.11 17.02 14.62 16.96 14.52C16.89 14.41 16.74 14.34 16.57 14.22V14.33Z" />
                  </svg>
                </div>

                {/* WhatsApp Text */}
                <div className="flex flex-col text-left">
                  <span className="text-[12px] font-medium text-gray-500 leading-none">
                    WhatsApp
                  </span>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="text-[15px] font-bold text-gray-900 leading-tight tracking-tight">
                      +91 8250338715
                    </span>
                    {/* Exact solid down triangle dropdown icon */}
                    <svg
                      viewBox="0 0 10 6"
                      fill="currentColor"
                      className={`w-2.5 h-2.5 text-gray-900 transition-transform duration-300 ml-1 shrink-0 ${isSupportDropdownOpen ? "rotate-180" : ""
                        }`}
                    >
                      <path d="M0 0L5 6L10 0H0Z" />
                    </svg>
                  </div>
                </div>
              </button>

              {/* Floating Contact Support Card with Smooth Bottom Opening */}
              <div
                className={`absolute right-0 top-full pt-1.5 z-50 transition-all duration-300 ease-out origin-top ${isSupportDropdownOpen
                  ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
                  : "opacity-0 -translate-y-2.5 scale-95 pointer-events-none"
                  }`}
              >
                <div className="w-[280px] bg-white rounded-none shadow-[0_15px_35px_rgba(0,0,0,0.14)] border border-gray-100 p-4 flex flex-col gap-3.5">

                  {/* Mail Support Option */}
                  <a
                    href="mailto:info@krikotrips.com"
                    className="flex items-center gap-3.5 p-1 rounded-none hover:bg-gray-50/80 transition-colors group"
                  >
                    <div className="w-11 h-11 rounded-full bg-white shadow-xs border border-gray-100 flex items-center justify-center shrink-0">
                      {/* Exact Mail Support Icon: yellow envelope with letter & lines */}
                      <svg viewBox="0 0 32 32" fill="none" className="w-6 h-6">
                        <rect x="4" y="10" width="24" height="16" rx="2" fill="#FBBF24" stroke="#1F2937" strokeWidth="1.5" />
                        <rect x="7" y="5" width="18" height="10" rx="1.5" fill="white" stroke="#1F2937" strokeWidth="1.5" />
                        <path d="M10 8H22" stroke="#4B5563" strokeWidth="1.2" strokeLinecap="round" />
                        <path d="M10 11H18" stroke="#4B5563" strokeWidth="1.2" strokeLinecap="round" />
                        <path d="M4 12L16 20L28 12" stroke="#1F2937" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M4 25L12 18" stroke="#1F2937" strokeWidth="1.5" strokeLinecap="round" />
                        <path d="M28 25L20 18" stroke="#1F2937" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    </div>
                    <div className="flex flex-col text-left">
                      <span className="text-[13px] font-medium text-gray-500 leading-none">
                        Mail Support
                      </span>
                      <span className="text-[15px] font-bold text-gray-900 group-hover:text-blue-600 transition-colors mt-1">
                        info@krikotrips.com
                      </span>
                    </div>
                  </a>

                  {/* More Inquiry Option */}
                  <a
                    href="tel:+918250338715"
                    className="flex items-center gap-3.5 p-1 rounded-none hover:bg-gray-50/80 transition-colors group"
                  >
                    <div className="w-11 h-11 rounded-full bg-white shadow-xs border border-gray-100 flex items-center justify-center shrink-0">
                      {/* Exact More Inquery Icon: red LIVE chat bubble */}
                      <svg viewBox="0 0 32 32" fill="none" className="w-6 h-6">
                        <rect x="3" y="6" width="26" height="16" rx="3.5" fill="#EF4444" />
                        <path d="M7 22L5 27L12 22H7Z" fill="#EF4444" />
                        <text
                          x="16"
                          y="16.5"
                          fill="white"
                          fontSize="8"
                          fontWeight="800"
                          textAnchor="middle"
                          fontFamily="sans-serif"
                          letterSpacing="0.5"
                        >
                          LIVE
                        </text>
                      </svg>
                    </div>
                    <div className="flex flex-col text-left">
                      <span className="text-[13px] font-medium text-gray-500 leading-none">
                        More Inquery
                      </span>
                      <span className="text-[15px] font-bold text-gray-900 group-hover:text-blue-600 transition-colors mt-1">
                        +91 8250338715
                      </span>
                    </div>
                  </a>

                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ─── Desktop Destinations Mega Menu ──────────────────────────────── */}
        <div
          onMouseEnter={() => handleMouseEnter("Destinations")}
          onMouseLeave={handleMouseLeave}
          className={`absolute left-0 right-0 top-full bg-white border-t border-gray-100 shadow-[0_20px_45px_rgba(0,0,0,0.12)] transition-all duration-300 z-50 ${activeDropdown === "Destinations"
            ? "opacity-100 visible translate-y-0"
            : "opacity-0 invisible -translate-y-2 pointer-events-none"
            }`}
        >
          <div className="container relative py-10 px-6 sm:px-8">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-8 gap-y-8">
              {destinationColumns.map((col) => (
                <div key={col.continent} className="flex flex-col">
                  {/* Continent Header */}
                  <h3 className="text-[17px] font-bold text-gray-950 mb-5 tracking-tight border-b border-gray-100 pb-2">
                    {col.continent}
                  </h3>

                  {/* Countries List */}
                  <ul className="flex flex-col space-y-3.5">
                    {col.countries.map((country) => (
                      <li key={country.name}>
                        <Link
                          href={`#${country.name.toLowerCase().replace(/[\s,]+/g, "-")}`}
                          className="flex items-center text-sm font-normal text-gray-700 hover:text-[#0284c7] transition-all group py-0.5"
                        >
                          {/* Country Name */}
                          <span className="group-hover:translate-x-1 transition-transform duration-150">
                            {country.name}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* ─── Mobile Sidebar Navigation Drawer (Built into Header) ─────────── */}
      {/* Backdrop */}
      <div
        onClick={() => setIsMobileDrawerOpen(false)}
        className={`lg:hidden fixed inset-0 bg-black/50 backdrop-blur-xs z-50 transition-opacity duration-300 ${isMobileDrawerOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
          }`}
      />

      {/* Drawer Aside */}
      <aside
        className={`lg:hidden fixed top-0 left-0 bottom-0 w-[300px] sm:w-[330px] max-w-[85vw] bg-white z-50 shadow-2xl flex flex-col justify-between transition-transform duration-300 ease-in-out ${isMobileDrawerOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        {/* Drawer Header */}
        <div className="p-5 pb-3 flex items-center justify-between border-b border-gray-100">
          <Link href="/" onClick={() => setIsMobileDrawerOpen(false)} className="flex items-center">
            <Image
              src={brandLogo}
              alt="KrikoTrip Logo"
              priority
              className="h-9 w-auto object-contain"
            />
          </Link>

          {/* Close Button */}
          <button
            type="button"
            onClick={() => setIsMobileDrawerOpen(false)}
            className="w-9 h-9 rounded-full border border-gray-200/90 flex items-center justify-center text-gray-700 hover:bg-gray-100 transition-colors focus:outline-none"
            aria-label="Close menu"
          >
            <X className="w-4 h-4 stroke-[2.2]" />
          </button>
        </div>

        {/* Drawer Nav Links List */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-1">
          {/* Home */}
          <div className="py-2.5 border-b border-gray-50">
            <button
              type="button"
              onClick={() =>
                setOpenMobileSection(openMobileSection === "Home" ? null : "Home")
              }
              className="w-full flex items-center justify-between text-[16px] font-bold text-[#0284c7] text-left"
            >
              <span>Home</span>
              {openMobileSection === "Home" ? (
                <Minus className="w-4 h-4 text-[#0284c7] stroke-[2.5]" />
              ) : (
                <Plus className="w-4 h-4 text-[#0284c7] stroke-[2.5]" />
              )}
            </button>
            {openMobileSection === "Home" && (
              <div className="mt-2 pl-3 space-y-2 pt-1">
                {["Home Style 1", "Home Style 2", "Home Style 3"].map((h) => (
                  <Link
                    key={h}
                    href="#"
                    onClick={() => setIsMobileDrawerOpen(false)}
                    className="block text-sm font-medium text-gray-600 hover:text-blue-600"
                  >
                    {h}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Destinations */}
          <div className="py-2.5 border-b border-gray-50">
            <button
              type="button"
              onClick={() =>
                setOpenMobileSection(
                  openMobileSection === "Destinations" ? null : "Destinations"
                )
              }
              className={`w-full flex items-center justify-between text-[16px] font-bold text-left transition-colors ${openMobileSection === "Destinations" ? "text-[#0284c7]" : "text-gray-900"
                }`}
            >
              <span>Destinations</span>
              {openMobileSection === "Destinations" ? (
                <Minus className="w-4 h-4 text-[#0284c7] stroke-[2.5]" />
              ) : (
                <Plus className="w-4 h-4 text-gray-900 stroke-[2.5]" />
              )}
            </button>

            {/* Nested Continents & Countries */}
            {openMobileSection === "Destinations" && (
              <div className="mt-3 pl-2 space-y-2 animate-in fade-in duration-200">
                {destinationColumns.map((col) => {
                  const isExpanded = openMobileContinent === col.continent;
                  return (
                    <div key={col.continent} className="pt-1">
                      {/* Continent Row */}
                      <button
                        type="button"
                        onClick={() =>
                          setOpenMobileContinent(isExpanded ? null : col.continent)
                        }
                        className="w-full flex items-center justify-between text-[15px] font-bold text-gray-900 py-1.5 text-left"
                      >
                        <span>{col.continent}</span>
                        {isExpanded ? (
                          <Minus className="w-3.5 h-3.5 text-gray-800 stroke-[2.5]" />
                        ) : (
                          <Plus className="w-3.5 h-3.5 text-gray-800 stroke-[2.5]" />
                        )}
                      </button>

                      {/* Countries List */}
                      {isExpanded && (
                        <div className="mt-2 pl-2 space-y-0 border-l border-gray-100">
                          {col.countries.map((country) => (
                            <Link
                              key={country.name}
                              href="#"
                              onClick={() => setIsMobileDrawerOpen(false)}
                              className="flex items-center py-2 border-b border-gray-100 text-sm font-normal text-gray-700 hover:text-blue-600 transition-colors"
                            >
                              <span>{country.name}</span>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Travel Package */}
          <div className="py-2.5 border-b border-gray-50">
            <button
              type="button"
              onClick={() =>
                setOpenMobileSection(
                  openMobileSection === "Travel Package" ? null : "Travel Package"
                )
              }
              className={`w-full flex items-center justify-between text-[16px] font-bold text-left ${openMobileSection === "Travel Package" ? "text-[#0284c7]" : "text-gray-900"
                }`}
            >
              <span>Travel Package</span>
              {openMobileSection === "Travel Package" ? (
                <Minus className="w-4 h-4 text-[#0284c7] stroke-[2.5]" />
              ) : (
                <Plus className="w-4 h-4 text-gray-900 stroke-[2.5]" />
              )}
            </button>
            {openMobileSection === "Travel Package" && (
              <div className="mt-2 pl-3 space-y-2 pt-1">
                {travelPackageSubItems.map((pkg) => (
                  <Link
                    key={pkg}
                    href="#"
                    onClick={() => setIsMobileDrawerOpen(false)}
                    className="block text-sm font-medium text-gray-600 hover:text-blue-600 py-1"
                  >
                    {pkg}
                  </Link>
                ))}
              </div>
            )}
          </div>



          {/* Pages */}
          <div className="py-2.5 border-b border-gray-50">
            <button
              type="button"
              onClick={() =>
                setOpenMobileSection(openMobileSection === "Pages" ? null : "Pages")
              }
              className={`w-full flex items-center justify-between text-[16px] font-bold text-left ${openMobileSection === "Pages" ? "text-[#0284c7]" : "text-gray-900"
                }`}
            >
              <span>Pages</span>
              {openMobileSection === "Pages" ? (
                <Minus className="w-4 h-4 text-[#0284c7] stroke-[2.5]" />
              ) : (
                <Plus className="w-4 h-4 text-gray-900 stroke-[2.5]" />
              )}
            </button>
            {openMobileSection === "Pages" && (
              <div className="mt-2 pl-3 space-y-2 pt-1">
                {["About Us", "Our Team", "Pricing Plans", "FAQs", "Terms of Service"].map((p) => (
                  <Link
                    key={p}
                    href="#"
                    onClick={() => setIsMobileDrawerOpen(false)}
                    className="block text-sm font-medium text-gray-600 hover:text-blue-600 py-1"
                  >
                    {p}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Gallery */}
          <div className="py-2.5 border-b border-gray-50">
            <Link
              href="/gallery"
              onClick={() => setIsMobileDrawerOpen(false)}
              className="block text-[16px] font-bold text-gray-900 hover:text-blue-600"
            >
              Gallery
            </Link>
          </div>

          {/* Blogs */}
          <div className="py-2.5 border-b border-gray-50">
            <Link
              href="/blogs"
              onClick={() => setIsMobileDrawerOpen(false)}
              className="block text-[16px] font-bold text-gray-900 hover:text-blue-600"
            >
              Blogs &amp; Stories
            </Link>
          </div>

          {/* About Us */}
          <div className="py-2.5 border-b border-gray-50">
            <Link
              href="/about-us"
              onClick={() => setIsMobileDrawerOpen(false)}
              className="block text-[16px] font-bold text-gray-900 hover:text-blue-600"
            >
              About Us
            </Link>
          </div>

          {/* Contact */}
          <div className="py-2.5 border-b border-gray-50">
            <Link
              href="/contact-us"
              onClick={() => setIsMobileDrawerOpen(false)}
              className="block text-[16px] font-bold text-gray-900 hover:text-blue-600"
            >
              Contact Us
            </Link>
          </div>
        </div>

        {/* Drawer Footer: WhatsApp + Login Button */}
        <div className="p-5 pt-3 border-t border-gray-100 bg-white">
          {/* WhatsApp Card */}
          <div className="bg-[#f4f5f7]  p-3.5 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white shadow-xs border border-gray-100 flex items-center justify-center shrink-0">
              <svg viewBox="0 0 24 24" fill="#25D366" className="w-5 h-5">
                <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2ZM12.05 20.15C10.56 20.15 9.11 19.75 7.85 19L7.55 18.82L4.43 19.64L5.26 16.59L5.07 16.29C4.24 14.97 3.81 13.46 3.81 11.91C3.81 7.37 7.5 3.69 12.05 3.69C14.25 3.69 16.32 4.55 17.88 6.11C19.44 7.67 20.3 9.74 20.3 11.94C20.3 16.48 16.6 20.15 12.05 20.15ZM16.57 14.33C16.32 14.2 15.1 13.6 14.87 13.52C14.65 13.43 14.48 13.39 14.32 13.64C14.15 13.89 13.68 14.45 13.53 14.62C13.39 14.78 13.24 14.81 12.99 14.68C12.74 14.56 11.94 14.29 10.99 13.44C10.25 12.78 9.75 11.96 9.61 11.71C9.46 11.46 9.59 11.33 9.72 11.2C9.83 11.09 9.97 10.91 10.09 10.76C10.22 10.62 10.26 10.51 10.34 10.35C10.42 10.18 10.38 10.04 10.32 9.91C10.26 9.79 9.77 8.58 9.56 8.08C9.36 7.59 9.16 7.66 9.01 7.65C8.87 7.64 8.71 7.64 8.54 7.64C8.38 7.64 8.11 7.7 7.89 7.95C7.66 8.19 7.03 8.78 7.03 9.99C7.03 11.2 7.91 12.37 8.03 12.53C8.16 12.7 9.76 15.17 12.22 16.23C12.8 16.48 13.26 16.63 13.61 16.74C14.2 16.93 14.74 16.9 15.16 16.84C15.63 16.77 16.61 16.25 16.81 15.68C17.02 15.11 17.02 14.62 16.96 14.52C16.89 14.41 16.74 14.34 16.57 14.22V14.33Z" />
              </svg>
            </div>
            <div className="flex flex-col text-left">
              <span className="text-[12px] font-medium text-gray-500 leading-none">
                WhatsApp
              </span>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-[15px] font-bold text-gray-900 leading-tight">
                  +91 8250338715
                </span>
                <svg viewBox="0 0 10 6" fill="currentColor" className="w-2.5 h-2.5 text-gray-900 ml-0.5">
                  <path d="M0 0L5 6L10 0H0Z" />
                </svg>
              </div>
            </div>
          </div>


        </div>
      </aside>

      {/* Global Login / Register Popup Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        defaultMode={authModalMode}
      />

      {/* Global Search Modal Component */}
      <SearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
      />
    </header>
  );
}
