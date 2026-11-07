"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Calendar, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { blogPosts } from "../blogs/data";

export default function TravelInspirations() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Show 2 cards at a time on desktop
  const cardsPerPage = 2;
  const maxIndex = Math.max(0, blogPosts.length - cardsPerPage);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const visiblePosts = blogPosts.slice(currentIndex, currentIndex + cardsPerPage);

  return (
    <section className="w-full py-14 sm:py-20 bg-[#F9FAFB]">
      <div className="container relative">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-10 sm:mb-12">
          <h2 className="section-title">
            Travel Inspirations
          </h2>
          <p className="section-details max-w-xl mx-auto">
            A curated list of inspiration the most tour &amp; travel based on different destinations.
          </p>
        </div>

        {/* Carousel Wrapper with Side Arrows */}
        <div className="relative">
          {/* Previous Arrow Button */}
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous article"
            className="absolute -left-3 sm:-left-5 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white border border-gray-200 shadow-md text-gray-700 hover:text-[#1877F2] hover:border-blue-300 flex items-center justify-center transition-all z-20 cursor-pointer active:scale-95"
          >
            <ChevronLeft className="w-4 h-4 stroke-[2.2]" />
          </button>

          {/* Next Arrow Button */}
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next article"
            className="absolute -right-3 sm:-right-5 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white border border-gray-200 shadow-md text-gray-700 hover:text-[#1877F2] hover:border-blue-300 flex items-center justify-center transition-all z-20 cursor-pointer active:scale-95"
          >
            <ChevronRight className="w-4 h-4 stroke-[2.2]" />
          </button>

          {/* Cards Grid (2 Horizontal Cards matching reference screenshot) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-7">
            {visiblePosts.map((post) => (
              <article
                key={post.slug}
                className="bg-white rounded-2xl border border-gray-200/90 shadow-xs hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col sm:flex-row group"
              >
                {/* Left: Card Image */}
                <div className="relative sm:w-5/12 h-52 sm:h-auto min-h-[200px] overflow-hidden bg-gray-100 shrink-0">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 30vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                </div>

                {/* Right: Card Details */}
                <div className="p-5 sm:p-6 flex flex-col justify-between flex-1">
                  <div>
                    {/* Location Badge */}
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-800 mb-2">
                      <MapPin className="w-3.5 h-3.5 text-gray-600 shrink-0" />
                      <span className="truncate">{post.location}</span>
                    </div>

                    {/* Title */}
                    <h3 className="text-base sm:text-[17px] font-bold text-gray-950 group-hover:text-[#1877F2] transition-colors leading-snug line-clamp-2">
                      <Link href={`/blogs/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h3>

                    {/* Date */}
                    <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium mt-2">
                      <Calendar className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                      <span>{post.date}</span>
                    </div>

                    {/* Thin Divider */}
                    <div className="border-t border-gray-150 my-3.5" />

                    {/* Excerpt */}
                    <p className="text-xs sm:text-[13px] text-gray-500 leading-relaxed line-clamp-2">
                      {post.excerpt}
                    </p>
                  </div>

                  {/* Read More Link */}
                  <div className="mt-4 pt-2">
                    <Link
                      href={`/blogs/${post.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1877F2] hover:text-blue-700 transition-colors"
                    >
                      <span>Read More</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* View All Blogs Button */}
        <div className="mt-10 sm:mt-12 text-center">
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[#102A6B] hover:bg-[#1877F2] text-white text-xs sm:text-sm font-bold transition-all shadow-xs active:scale-95 cursor-pointer"
          >
            <span>View All Travel Stories</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

