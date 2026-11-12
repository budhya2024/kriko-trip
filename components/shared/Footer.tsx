"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaPinterestP,
} from "react-icons/fa6";
import Image from "next/image";
import footerBg from "@/public/assets/images/footer-bg-1-2-2.webp";
import { Phone, Mail, ChevronDown } from "lucide-react";

const topDestinations = [
  "Andaman & Nicobar Tour",
  "Kashmir & Gulmarg Tour",
  "Kerala Backwaters Tour",
  "Goa Beach Holiday Tour",
  "Royal Rajasthan Tour",
  "Himachal & Manali Tour",
  "Leh Ladakh Adventure Tour",
  "Sundarban Mangrove Tour",
  "Varanasi Heritage Tour",
  "Darjeeling & Sikkim Tour",
  "Ooty & Nilgiris Tour",
];

const popularSearches = [
  "Adventure Trekking",
  "Himalayan Hiking",
  "Holiday Packages",
  "Flights And Hotels",
  "Honeymoon Trip",
  "Andaman Vacation Package",
  "Thar Desert Safari",
  "Last-Minute Deals",
  "Summer Vacation",
  "Sundarban Wildlife Safari",
  "Kashmir Luxury Tours",
];

const resources = [
  "About KrikoTrip",
  "Travel Gallery",
  "Health & Safety Measure",
  "Visa Processing",
  "Customize Tour",
  "Travel Inspirations",
  "Traveler Reviews",
  "Terms & Condition",
  "Sitemap",
];

export default function Footer() {
  const [openSection, setOpenSection] = useState<
    "destinations" | "searches" | "resources" | null
  >(null);

  const toggleSection = (section: "destinations" | "searches" | "resources") => {
    setOpenSection((prev) => (prev === section ? null : section));
  };

  return (
    <footer className="w-full bg-[#073571] text-white relative overflow-hidden pt-8 md:pt-16 pb-6 md:pb-12 print:hidden">
      {/* Decorative Background Pattern */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <Image
          src={footerBg}
          alt="Footer Background Pattern"
          fill
          sizes="100vw"
          className="object-cover object-bottom"
        />
      </div>



      <div className="container relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-8">

          {/* ─── Column 1: Brand Logo, Address, Socials & App ─── */}
          <div className="sm:col-span-2 lg:col-span-4 flex flex-col items-start pr-0 lg:pr-6">
            {/* Brand Logo */}
            <Link href="/" className="flex items-center gap-3 mb-6">
              <Image
                src="/assets/images/brand-logo.png"
                height={100}
                width={200}
                alt="KrikoTrip Logo"
                className="h-10 sm:h-11 w-auto object-contain brightness-0 invert"
              />
            </Link>

            {/* Agency Title & Address */}
            <div className="text-left space-y-1.5 mb-6 text-sm text-white/80 leading-relaxed font-medium">
              <p className="font-bold text-white text-[15px]">
                KrikoTrip Travel Agency
              </p>
              <p>BL-A Shop-GLP/5 676 Green Land Park</p>
              <p>Sonarpur, Kolkata - 700103</p>
              <p className="pt-1.5 flex items-center gap-2 text-white/90">
                <Phone className="w-3.5 h-3.5 text-[#03ADFF] shrink-0" />
                <a href="tel:+918250338715" className="hover:text-white transition-colors">
                  +91 8250338715
                </a>
              </p>
              <p className="flex items-center gap-2 text-white/90">
                <Mail className="w-3.5 h-3.5 text-[#03ADFF] shrink-0" />
                <a href="mailto:info@krikotrips.com" className="hover:text-white transition-colors break-all">
                  info@krikotrips.com
                </a>
              </p>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-2.5 mb-6">
              {[
                { icon: FaFacebookF, href: "#", label: "Facebook" },
                { icon: FaInstagram, href: "#", label: "Instagram" },
                { icon: FaYoutube, href: "#", label: "YouTube" },
                { icon: FaPinterestP, href: "#", label: "Pinterest" },
              ].map((s) => (
                <Link
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#1877F2] text-white/90 hover:text-white flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 shadow-sm"
                >
                  <s.icon className="w-3.5 h-3.5" />
                </Link>
              ))}
            </div>



          </div>

          {/* ─── Column 2: Top Destination (Smooth Accordion Dropdown on Mobile) ─── */}
          <div className="lg:col-span-3 text-left border-b border-white/10 pb-3 sm:border-b-0 sm:pb-0">
            <button
              type="button"
              onClick={() => toggleSection("destinations")}
              aria-expanded={openSection === "destinations"}
              className="w-full flex items-center justify-between text-white font-semibold sm:font-bold text-[16px] sm:text-[18px] sm:mb-5 tracking-tight sm:pointer-events-none cursor-pointer sm:cursor-default"
            >
              <span>Top Destination</span>
              <ChevronDown
                className={`w-4 h-4 text-white/80 sm:hidden transition-transform duration-300 ease-out ${
                  openSection === "destinations" ? "rotate-180" : ""
                }`}
              />
            </button>
            <div
              className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out sm:grid-rows-[1fr] sm:opacity-100 ${
                openSection === "destinations"
                  ? "grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <ul className="pt-3 sm:pt-0 space-y-2.5 sm:space-y-3">
                  {topDestinations.map((item) => (
                    <li key={item}>
                      <Link
                        href={`#${item.toLowerCase().replace(/[\s(),]+/g, "-")}`}
                        className="text-xs sm:text-sm font-medium text-white/80 hover:text-white transition-colors duration-150 inline-block"
                      >
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* ─── Column 3: Popular Search (Smooth Accordion Dropdown on Mobile) ─── */}
          <div className="lg:col-span-3 text-left border-b border-white/10 pb-3 sm:border-b-0 sm:pb-0">
            <button
              type="button"
              onClick={() => toggleSection("searches")}
              aria-expanded={openSection === "searches"}
              className="w-full flex items-center justify-between text-white font-semibold sm:font-bold text-[16px] sm:text-[18px] sm:mb-5 tracking-tight sm:pointer-events-none cursor-pointer sm:cursor-default"
            >
              <span>Popular Search</span>
              <ChevronDown
                className={`w-4 h-4 text-white/80 sm:hidden transition-transform duration-300 ease-out ${
                  openSection === "searches" ? "rotate-180" : ""
                }`}
              />
            </button>
            <div
              className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out sm:grid-rows-[1fr] sm:opacity-100 ${
                openSection === "searches"
                  ? "grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <ul className="pt-3 sm:pt-0 space-y-2.5 sm:space-y-3">
                  {popularSearches.map((item) => (
                    <li key={item}>
                      <Link
                        href={`#${item.toLowerCase().replace(/[\s&]+/g, "-")}`}
                        className="text-xs sm:text-sm font-medium text-white/80 hover:text-white transition-colors duration-150 inline-block"
                      >
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* ─── Column 4: Resources (Smooth Accordion Dropdown on Mobile) ─── */}
          <div className="lg:col-span-2 text-left border-b border-white/10 pb-3 sm:border-b-0 sm:pb-0">
            <button
              type="button"
              onClick={() => toggleSection("resources")}
              aria-expanded={openSection === "resources"}
              className="w-full flex items-center justify-between text-white font-semibold sm:font-bold text-[16px] sm:text-[18px] sm:mb-5 tracking-tight sm:pointer-events-none cursor-pointer sm:cursor-default"
            >
              <span>Resources</span>
              <ChevronDown
                className={`w-4 h-4 text-white/80 sm:hidden transition-transform duration-300 ease-out ${
                  openSection === "resources" ? "rotate-180" : ""
                }`}
              />
            </button>
            <div
              className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out sm:grid-rows-[1fr] sm:opacity-100 ${
                openSection === "resources"
                  ? "grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <ul className="pt-3 sm:pt-0 space-y-2.5 sm:space-y-3">
                  {resources.map((item) => {
                    const getHref = () => {
                      if (item === "Travel Inspirations") return "/blogs";
                      if (item === "Travel Gallery") return "/gallery";
                      if (item === "About KrikoTrip") return "/about-us";
                      if (item === "Health & Safety Measure") return "/health-and-safety";
                      if (item === "Terms & Condition") return "/terms-of-service";
                      return `#${item.toLowerCase().replace(/[\s&]+/g, "-")}`;
                    };
                    return (
                      <li key={item}>
                        <Link
                          href={getHref()}
                          className="text-xs sm:text-sm font-medium text-white/80 hover:text-white transition-colors duration-150 inline-block"
                        >
                          {item}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>

        </div>

        {/* ─── Bottom Copyright Bar ─── */}
        <div className="mt-10 sm:mt-14 pt-6 sm:pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-white/75 text-center sm:text-left">
          <p>
            © 2026 KrikoTrip Travel Agency. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link href="#cookies" className="hover:text-white transition-colors">
              Cookie Settings
            </Link>
          </div>
        </div>
      </div>
    </footer >
  );
}
