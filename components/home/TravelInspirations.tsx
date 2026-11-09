"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { blogPosts } from "../blogs/data";

export default function TravelInspirations() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Show 2 cards at a time on desktop
  const cardsPerPage = 2;
  const maxIndex = Math.max(0, blogPosts.length - cardsPerPage);

  // Filter posts matching the reference home section
  const homePosts = blogPosts.filter(
    (p) =>
      p.slug === "tropical-escapes-beach-getaways" ||
      p.slug === "crystal-clear-waters-white-sands"
  );
  const displayPosts = homePosts.length >= 2 ? homePosts : blogPosts;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const visiblePosts = displayPosts.slice(currentIndex, currentIndex + cardsPerPage);

  return (
    <section className="w-full py-8 md:py-16 bg-white">
      <div className="container relative">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-10 sm:mb-12 relative">
          <h2 className="section-title">
            Travel Inspirations
          </h2>
          <p className="section-details max-w-xl mx-auto">
            A curated list of inspiration the most tour &amp; travel based on different destinations.
          </p>

        </div>

        {/* Carousel Wrapper with Side Arrows */}
        <div className="relative">


          {/* Cards Grid (2 Horizontal Cards matching reference screenshot) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-7">
            {visiblePosts.map((post) => (
              <article
                key={post.slug}
                className="bg-white  border border-gray-200  transition-colors duration-200 overflow-hidden flex flex-col sm:flex-row group"
              >
                {/* Left: Card Image with Diagonal Shine Hover Layer */}
                <div className="relative sm:w-[45%] h-80 overflow-hidden bg-gray-100 shrink-0 image-shine">
                  <Link href={`/blogs/${post.slug}`} className="block w-full h-full relative">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 30vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                  </Link>
                </div>

                {/* Right: Card Details */}
                <div className="p-6 sm:p-7 flex flex-col justify-center flex-1 text-left">
                  {/* Author Avatar (Circle), Name & Date (Above Title) */}
                  <div className="flex items-center gap-2 text-xs sm:text-[13px] text-gray-500 font-normal mb-2.5">
                    <div className="flex items-center gap-1.5">
                      <div className="relative w-5 h-5 rounded-full overflow-hidden bg-gray-100 border border-gray-200 shrink-0">
                        <Image
                          src={post.author.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"}
                          alt={post.author.name}
                          fill
                          sizes="20px"
                          className="object-cover rounded-full"
                        />
                      </div>
                      <span className="font-semibold text-gray-800">
                        {post.author.name}
                      </span>
                    </div>
                    <span className="text-gray-300">•</span>
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                      <span>{post.date}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl md:text-2xl font-semibold text-gray-950 leading-snug tracking-tight mb-2.5">
                    <Link
                      href={`/blogs/${post.slug}`}
                      className="hover:text-[#1877F2] transition-colors"
                    >
                      {post.title}
                    </Link>
                  </h3>

                  {/* Excerpt */}
                  <p className="text-sm md:text-base text-gray-500 leading-relaxed font-normal">
                    {post.excerpt}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

