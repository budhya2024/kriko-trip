"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Header, Footer, PageHeader } from "@/components/shared";
import { blogPosts } from "@/components/blogs/data";
import { Clock, ArrowRight, Tag, ChevronLeft, ChevronRight } from "lucide-react";

const POSTS_PER_PAGE = 8;

export default function BlogListPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const articlesTopRef = useRef<HTMLDivElement>(null);

  const totalPages = Math.max(1, Math.ceil(blogPosts.length / POSTS_PER_PAGE));
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const currentPosts = blogPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);

  const goToPage = (page: number) => {
    setCurrentPage(page);
    if (articlesTopRef.current) {
      articlesTopRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      {/* Global Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1">
        {/* Left-Aligned Page Header with Scenic Background */}
        <PageHeader
          title="Travel Inspirations"
          subtitle="A curated collection of destination guides, authentic travel stories, and expert holiday planning tips."
          breadcrumb="Blogs"
          bgImage="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=2000&q=80"
        />

        <div ref={articlesTopRef} className="container py-10 sm:py-14 lg:py-16">
          {/* ─── Responsive Blog Cards Grid (Mobile: 1 col, Tab: 2 col, Desktop: 3 col) ─── */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {currentPosts.map((post) => (
              <article
                key={post.slug}
                className="bg-white rounded-2xl border border-gray-200/90 transition-colors duration-200 overflow-hidden flex flex-col group h-full cursor-pointer hover:border-gray-300"
              >
                {/* Top: Card Image with Category Badge & Diagonal Shine Hover Layer */}
                <div className="relative w-full aspect-[16/10] overflow-hidden bg-gray-100 cursor-pointer image-shine">
                  <Link href={`/blogs/${post.slug}`} className="block w-full h-full relative cursor-pointer">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                  </Link>

                  {/* Category / Badge on Top-Left */}
                  <div className="absolute top-3.5 left-3.5 z-10 pointer-events-none">
                    <span className="px-3 py-1 rounded-md bg-white text-[#0B132A] text-[11px] font-bold tracking-wider uppercase shadow-xs border border-gray-100">
                      {post.badge || post.category || "TRAVEL GUIDE"}
                    </span>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between text-left">
                  <div>
                    {/* Meta Line: Date | Clock Read Time */}
                    <div className="flex items-center gap-2 text-xs sm:text-[13px] text-gray-400 font-normal mb-2.5">
                      <span>{post.date}</span>
                      <span className="text-gray-300 font-light">|</span>
                      <div className="flex items-center gap-1.5 text-gray-500 font-normal">
                        <Clock className="w-3.5 h-3.5 text-amber-500 shrink-0" strokeWidth={2} />
                        <span>{post.readTime}</span>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-[17px] sm:text-[18px] font-bold text-[#0B132A] group-hover:text-[#1877F2] transition-colors leading-[1.35] line-clamp-2 mb-2.5">
                      <Link href={`/blogs/${post.slug}`} className="cursor-pointer">
                        {post.title}
                      </Link>
                    </h3>

                    {/* Excerpt */}
                    <p className="text-xs sm:text-[13px] text-gray-500 leading-relaxed line-clamp-2 mb-3.5">
                      {post.excerpt}
                    </p>

                    {/* Tags Row - Amber/Golden Styled Tags from Screenshot */}
                    <div className="flex flex-wrap items-center gap-2 mb-4">
                      {(post.tags || ["Sundarban", "Wildlife", "Tiger Trail"]).map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#FFF9EE] border border-[#FEEFD6] text-[#78350F] text-xs font-semibold cursor-pointer hover:bg-amber-100/70 transition-colors"
                        >
                          <Tag className="w-2.5 h-2.5 text-amber-500 fill-amber-500 shrink-0" />
                          <span>{tag}</span>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Footer: Read Article → */}
                  <div className="pt-4 mt-auto border-t border-gray-100 flex items-center justify-between">
                    <Link
                      href={`/blogs/${post.slug}`}
                      className="text-[13.5px] sm:text-[14px] font-bold text-[#0B132A] group-hover:text-[#1877F2] transition-colors cursor-pointer"
                    >
                      Read Article
                    </Link>
                    <Link
                      href={`/blogs/${post.slug}`}
                      aria-label={`Read article: ${post.title}`}
                      className="text-gray-900 group-hover:text-[#1877F2] transition-transform duration-200 group-hover:translate-x-1 cursor-pointer flex items-center justify-center p-1"
                    >
                      <ArrowRight className="w-4 h-4 stroke-[2.2]" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* ─── Exact Screenshot Matched Pagination Bar ─── */}
          <div className="mt-12 sm:mt-16 pt-6 sm:pt-8 border-t border-gray-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 select-none">
            {/* Left: Article Count Info (Showing 1 to 8 of 8 articles) */}
            <div className="text-xs sm:text-sm text-gray-500 font-normal">
              Showing{" "}
              <span className="font-bold text-gray-900">
                {blogPosts.length > 0 ? startIndex + 1 : 0}
              </span>{" "}
              to{" "}
              <span className="font-bold text-gray-900">
                {Math.min(startIndex + POSTS_PER_PAGE, blogPosts.length)}
              </span>{" "}
              of{" "}
              <span className="font-bold text-gray-900">{blogPosts.length}</span>{" "}
              articles
            </div>

            {/* Right: Pagination Controls */}
            <div className="flex items-center gap-2">
              {/* Previous Button */}
              <button
                type="button"
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 sm:py-2 rounded-[3px] border border-gray-200/90 text-xs sm:text-sm font-medium transition-colors shadow-2xs disabled:bg-[#FAFAFA] disabled:text-gray-300 disabled:border-gray-200 disabled:cursor-not-allowed enabled:bg-white enabled:text-gray-700 enabled:hover:bg-gray-50 enabled:hover:text-gray-900 enabled:cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4 stroke-[1.8]" />
                <span>Previous</span>
              </button>

              {/* Page Numbers */}
              <div className="flex items-center gap-1.5">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    type="button"
                    onClick={() => goToPage(page)}
                    className={`w-9 h-9 rounded-[3px] text-xs sm:text-sm font-bold transition-all flex items-center justify-center ${
                      currentPage === page
                        ? "bg-[#064E3B] text-white shadow-xs cursor-default"
                        : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 shadow-2xs cursor-pointer"
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              {/* Next Button */}
              <button
                type="button"
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 sm:py-2 rounded-[3px] border border-gray-200/90 text-xs sm:text-sm font-medium transition-colors shadow-2xs disabled:bg-[#FAFAFA] disabled:text-gray-300 disabled:border-gray-200 disabled:cursor-not-allowed enabled:bg-white enabled:text-gray-700 enabled:hover:bg-gray-50 enabled:hover:text-gray-900 enabled:cursor-pointer"
              >
                <span>Next</span>
                <ChevronRight className="w-4 h-4 stroke-[1.8]" />
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}

