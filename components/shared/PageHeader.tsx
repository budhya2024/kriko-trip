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
    <section className="relative w-full overflow-hidden bg-black h-[240px] sm:h-[280px] lg:h-[350px] flex items-center">
      {/* Background Image */}
      <Image
        src={bgImage}
        alt={title}
        fill
        priority
        sizes="100vw"
        className="object-cover object-center scale-105"
      />

      {/* Black Layer Above Image */}
      <div className="absolute inset-0 bg-black/60 z-10" />



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
            className="text-white/80 hover:text-white transition-colors whitespace-nowrap"
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
