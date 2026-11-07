"use client";

import React, { useState, useMemo, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Header, Footer, PageHeader } from "@/components/shared";
import { blogPosts } from "@/components/blogs/data";
import { Clock, ArrowRight, Search, Tag, ChevronLeft, ChevronRight, X } from "lucide-react";

const categories = [
  "All",
  "Beach & Islands",
  "Adventure",
  "Culture & Luxury",
  "Honeymoon",
];

const POSTS_PER_PAGE = 6;

export default function BlogListPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const articlesTopRef = useRef<HTMLDivElement>(null);

  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      const matchesCategory =
        selectedCategory === "All" || post.category === selectedCategory;
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (post.tags && post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const currentPosts = filteredPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);

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
          {/* ─── Search Bar & Category Filters Row ─── */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 pb-6 border-b border-gray-200">
            {/* Category Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => {
                    setSelectedCategory(cat);
                    setCurrentPage(1);
                  }}
                  className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? "bg-[#1877F2] text-white shadow-md shadow-blue-500/20"
                      : "bg-white text-gray-700 hover:bg-blue-50 hover:text-[#1877F2] hover:border-blue-200 border border-gray-200 shadow-2xs"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Input Bar */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search articles & places..."
                className="w-full pl-10 pr-9 py-2.5 rounded-full bg-white border border-gray-200 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:outline-none focus:border-[#1877F2] focus:ring-2 focus:ring-blue-100 transition-all shadow-2xs"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    setCurrentPage(1);
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer p-0.5"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* ─── Responsive Blog Cards Grid (Mobile: 1 col, Tab: 2 col, Desktop: 3 col) ─── */}
          {currentPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
              {currentPosts.map((post) => (
                <article
                  key={post.slug}
                  className="bg-white rounded-2xl border border-gray-200 hover:border-blue-300 transition-colors duration-200 overflow-hidden flex flex-col group h-full cursor-pointer"
                >
                  {/* Top: Card Image with Pill Category Badge */}
                  <div className="relative w-full aspect-[16/10] overflow-hidden bg-gray-100 cursor-pointer">
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
                      <span className="px-3 py-1 rounded-full bg-white/95 backdrop-blur-xs text-[#0B132A] text-[11px] font-bold tracking-wider uppercase shadow-xs border border-gray-100">
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
                          <Clock className="w-3.5 h-3.5 text-[#1877F2] shrink-0" strokeWidth={2} />
                          <span>{post.readTime}</span>
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="text-[17px] sm:text-[18px] font-bold text-[#0B132A] group-hover:text-[#1877F2] transition-colors leading-[1.3] line-clamp-2 mb-2.5">
                        <Link href={`/blogs/${post.slug}`} className="cursor-pointer">
                          {post.title}
                        </Link>
                      </h3>

                      {/* Excerpt */}
                      <p className="text-xs sm:text-[13px] text-gray-500 leading-relaxed line-clamp-2 mb-3.5">
                        {post.excerpt}
                      </p>

                      {/* Tags Row - Website Blue Accent Palette */}
                      <div className="flex flex-wrap items-center gap-2 mb-4">
                        {(post.tags || ["Sundarban", "Wildlife", "Tiger Trail"]).map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              setSearchQuery(tag);
                              setCurrentPage(1);
                            }}
                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50/70 hover:bg-blue-100/80 border border-blue-100 text-[#1877F2] text-xs font-semibold transition-all cursor-pointer"
                          >
                            <Tag className="w-2.5 h-2.5 text-[#1877F2] shrink-0" />
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
                        className="w-8 h-8 rounded-full bg-gray-50 group-hover:bg-blue-50 text-gray-800 group-hover:text-[#1877F2] flex items-center justify-center transition-all group-hover:translate-x-1 cursor-pointer"
                      >
                        <ArrowRight className="w-4 h-4 stroke-[2]" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="bg-white rounded-xl p-12 text-center border border-gray-200">
              <p className="text-base font-bold text-gray-900">
                No articles found
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Try clearing your search query or choosing another category.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory("All");
                  setSearchQuery("");
                  setCurrentPage(1);
                }}
                className="mt-4 px-6 py-2.5 rounded-full bg-[#1877F2] hover:bg-blue-600 text-white text-xs sm:text-sm font-bold transition-all shadow-xs cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          )}

          {/* ─── Professional Pagination Bar ─── */}
          {totalPages > 1 && (
            <div className="mt-12 sm:mt-16 pt-8 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              {/* Left: Article Count Info */}
              <div className="text-xs sm:text-sm text-gray-500 font-medium">
                Showing{" "}
                <span className="font-bold text-gray-900">
                  {startIndex + 1}–{Math.min(startIndex + POSTS_PER_PAGE, filteredPosts.length)}
                </span>{" "}
                of <span className="font-bold text-gray-900">{filteredPosts.length}</span> articles
              </div>

              {/* Right: Pagination Controls */}
              <div className="flex items-center gap-2">
                {/* Prev Button */}
                <button
                  type="button"
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="inline-flex items-center gap-1 px-4 py-2 rounded-full border border-gray-200 bg-white text-xs sm:text-sm font-semibold text-gray-700 hover:bg-blue-50 hover:text-[#1877F2] hover:border-blue-200 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer shadow-2xs"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span className="hidden sm:inline">Prev</span>
                </button>

                {/* Page Numbers */}
                <div className="flex items-center gap-1.5">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      type="button"
                      onClick={() => goToPage(page)}
                      className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center justify-center ${
                        currentPage === page
                          ? "bg-[#1877F2] text-white shadow-md shadow-blue-500/25"
                          : "bg-white text-gray-700 hover:bg-blue-50 hover:text-[#1877F2] border border-gray-200 shadow-2xs"
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
                  className="inline-flex items-center gap-1 px-4 py-2 rounded-full border border-gray-200 bg-white text-xs sm:text-sm font-semibold text-gray-700 hover:bg-blue-50 hover:text-[#1877F2] hover:border-blue-200 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer shadow-2xs"
                >
                  <span className="hidden sm:inline">Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}

