import React from "react";
import Link from "next/link";

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
}: PageHeaderProps) {
  const currentBreadcrumb = breadcrumb || title;

  return (
    <section className="bg-white border-b border-gray-150 py-6 sm:py-8 transition-colors">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            {/* Breadcrumb Navigation on Top */}
            <nav
              aria-label="Breadcrumb"
              className="flex items-center gap-2 text-xs text-gray-500 mb-2 font-normal"
            >
              <Link
                href="/"
                className="hover:text-[#1877F2] transition-colors"
              >
                Home
              </Link>
              <span className="text-gray-300">/</span>
              <span className="text-gray-800 font-medium truncate max-w-xs sm:max-w-md">
                {currentBreadcrumb}
              </span>
            </nav>

            {/* Page Title in Brand Navy */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#00285C] tracking-tight leading-snug">
              {title}
            </h1>

            {/* Optional Subtitle */}
            {subtitle && (
              <p className="text-sm sm:text-[15px] text-gray-600 mt-2 max-w-2xl font-normal leading-relaxed">
                {subtitle}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
