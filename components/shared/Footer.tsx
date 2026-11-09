"use client";

import React from "react";
import Link from "next/link";
import {
  FaFacebookF,
  FaXTwitter,
  FaYoutube,
  FaLinkedinIn,
  FaGooglePlay,
} from "react-icons/fa6";
import Image from "next/image";
import footerBg from "@/public/assets/images/footer-bg-1-2-2.webp";

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
  return (
    <footer className="w-full bg-[#08182B] text-white relative overflow-hidden pt-8 md:pt-16 pb-6 md:pb-12">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">

          {/* ─── Column 1: Brand Logo, Address, Socials & App ─── */}
          <div className="lg:col-span-4 flex flex-col items-start pr-0 lg:pr-6">
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
              <p>Skyline Plaza, 5th Floor, 123 Main Street</p>
              <p>Los Angeles, CA 90001, USA</p>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-2.5 mb-6">
              {[
                { icon: FaFacebookF, href: "#", label: "Facebook" },
                { icon: FaXTwitter, href: "#", label: "X" },
                { icon: FaYoutube, href: "#", label: "YouTube" },
                { icon: FaLinkedinIn, href: "#", label: "LinkedIn" },
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

          {/* ─── Column 2: Top Destination ─── */}
          <div className="lg:col-span-3 text-left">
            <h3 className="text-white font-bold text-[18px] mb-5 tracking-tight">
              Top Destination
            </h3>
            <ul className="space-y-3">
              {topDestinations.map((item) => (
                <li key={item}>
                  <Link
                    href={`#${item.toLowerCase().replace(/[\s(),]+/g, "-")}`}
                    className="text-sm font-medium text-white/80 hover:text-white transition-colors duration-150 inline-block "
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ─── Column 3: Popular Search ─── */}
          <div className="lg:col-span-3 text-left">
            <h3 className="text-white font-bold text-[18px] mb-5 tracking-tight">
              Popular Search
            </h3>
            <ul className="space-y-3">
              {popularSearches.map((item) => (
                <li key={item}>
                  <Link
                    href={`#${item.toLowerCase().replace(/[\s&]+/g, "-")}`}
                    className="text-sm font-medium text-white/80 hover:text-white transition-colors duration-150 inline-block "
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ─── Column 4: Resources ─── */}
          <div className="lg:col-span-2 text-left">
            <h3 className="text-white font-bold text-[18px] mb-5 tracking-tight">
              Resources
            </h3>
            <ul className="space-y-3">
              {resources.map((item) => {
                const getHref = () => {
                  if (item === "Travel Inspirations") return "/blogs";
                  if (item === "Travel Gallery") return "/gallery";
                  if (item === "About KrikoTrip") return "/about-us";
                  return `#${item.toLowerCase().replace(/[\s&]+/g, "-")}`;
                };
                return (
                  <li key={item}>
                    <Link
                      href={getHref()}
                      className="text-sm font-medium text-white/80 hover:text-white transition-colors duration-150 inline-block "
                    >
                      {item}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

        </div>

        {/* ─── Bottom Copyright Bar ─── */}
        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-white/75">
          <p>
            © 2026 KrikoTrip Travel Agency. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="#privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="#terms" className="hover:text-white transition-colors">
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
