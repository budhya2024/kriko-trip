import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumb?: string;
  bgImage?: string;
}

export default function PageHeader({
  title,
  subtitle,
  breadcrumb,
  bgImage = "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=2000&q=80",
}: PageHeaderProps) {
  const currentBreadcrumb = breadcrumb || title;

  return (
    <section className="relative w-full overflow-hidden bg-[#00285C] h-[240px] sm:h-[280px] lg:h-[350px] flex items-center">
      {/* Background Image with Controlled Opacity so the Color Shade Shines Through */}
      <Image
        src={bgImage}
        alt={title}
        fill
        priority
        sizes="100vw"
        className="object-cover object-center opacity-40 scale-105"
      />

      {/* Rich Brand Navy Color Shade Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#001D47]/92 via-[#00285C]/85 to-[#083D7C]/78 z-10" />

      {/* Ambient Blue Color Shade Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(24,119,242,0.22),transparent_60%)] z-10 pointer-events-none" />

      {/* Decorative Subtle Concentric Rings */}
      <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full border border-white/10 pointer-events-none z-10" />
      <div className="absolute -bottom-24 -right-12 w-64 h-64 rounded-full border border-white/5 pointer-events-none z-10" />

      {/* Content Container (Left-Aligned) */}
      <div className="container relative z-20 text-left px-6 sm:px-10 lg:px-12">
        {/* Page Title */}
        <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white tracking-tight leading-tight">
          {title}
        </h1>

        {/* Optional Subtitle */}
        {subtitle && (
          <p className="text-sm sm:text-base text-gray-200 mt-2.5 max-w-2xl font-normal leading-relaxed">
            {subtitle}
          </p>
        )}

        {/* Left-Aligned Breadcrumbs */}
        <nav
          aria-label="Breadcrumb"
          className="mt-4 flex items-center gap-2 text-xs sm:text-sm font-medium"
        >
          <Link
            href="/"
            className="text-white/80 hover:text-white transition-colors"
          >
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-white/50 shrink-0" />
          <span className="text-sky-300 font-semibold">
            {currentBreadcrumb}
          </span>
        </nav>
      </div>
    </section>
  );
}
