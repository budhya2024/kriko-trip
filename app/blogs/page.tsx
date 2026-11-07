"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Header, Footer, PageHeader } from "@/components/shared";
import { blogPosts } from "@/components/blogs/data";
import { Clock, ArrowRight, Search, Tag } from "lucide-react";

const categories = [
  "All",
  "Beach & Islands",
  "Adventure",
  "Culture & Luxury",
  "Honeymoon",
];

export default function BlogListPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

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

        <div className="container py-12 lg:py-16">
          {/* ─── Search Bar & Category Filters Row ─── */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 pb-6 border-b border-gray-200">
            {/* Category Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? "bg-[#1877F2] text-white shadow-xs"
                      : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Input (Clean rounded-lg) */}
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles & places..."
                className="w-full pl-10 pr-3.5 py-2 rounded-lg bg-white border border-gray-200 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:outline-none focus:border-[#1877F2] transition-colors"
              />
            </div>
          </div>

          {/* ─── 3-Column Blog Cards Grid (Matching Reference Screenshot) ─── */}
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
              {filteredPosts.map((post) => (
                <article
                  key={post.slug}
                  className="bg-white rounded-2xl border border-gray-200/90 shadow-xs hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col group h-full"
                >
                  {/* Top: Card Image with Pill Category Badge */}
                  <div className="relative w-full aspect-[16/10] overflow-hidden bg-gray-100">
                    <Link href={`/blogs/${post.slug}`} className="block w-full h-full relative">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                      />
                    </Link>

                    {/* Category / Badge on Top-Left */}
                    <div className="absolute top-3.5 left-3.5 z-10 pointer-events-none">
                      <span className="px-3 py-1 rounded-md bg-white text-gray-800 text-[10.5px] font-bold tracking-wider uppercase shadow-xs">
                        {post.badge || post.category || "TRAVEL GUIDE"}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between text-left">
                    <div>
                      {/* Meta Line: Date | Clock Read Time */}
                      <div className="flex items-center gap-2 text-xs text-gray-400 font-normal mb-2.5">
                        <span>{post.date}</span>
                        <span className="text-gray-300 font-light">|</span>
                        <div className="flex items-center gap-1 text-gray-500 font-normal">
                          <Clock className="w-3.5 h-3.5 text-amber-500 shrink-0" strokeWidth={2} />
                          <span>{post.readTime}</span>
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="text-[17px] sm:text-[18px] font-bold text-gray-950 group-hover:text-[#1877F2] transition-colors leading-[1.3] line-clamp-2 mb-2">
                        <Link href={`/blogs/${post.slug}`}>
                          {post.title}
                        </Link>
                      </h3>

                      {/* Excerpt */}
                      <p className="text-xs sm:text-[13px] text-gray-500 leading-relaxed line-clamp-2 mb-3.5">
                        {post.excerpt}
                      </p>

                      {/* Tags Row */}
                      <div className="flex flex-wrap items-center gap-2 mb-4">
                        {(post.tags || ["Sundarban", "Wildlife", "Tiger Trail"]).map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#FFFDF0] border border-amber-200/50 text-gray-700 text-[11px] font-medium"
                          >
                            <Tag className="w-2.5 h-2.5 text-amber-500 fill-amber-500 shrink-0" />
                            <span>{tag}</span>
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Footer: Read Article → */}
                    <div className="pt-3.5 mt-auto border-t border-gray-150/70 flex items-center justify-between">
                      <Link
                        href={`/blogs/${post.slug}`}
                        className="text-[13px] sm:text-[13.5px] font-semibold text-gray-950 group-hover:text-[#1877F2] transition-colors"
                      >
                        Read Article
                      </Link>
                      <Link
                        href={`/blogs/${post.slug}`}
                        aria-label={`Read article: ${post.title}`}
                        className="text-gray-900 group-hover:text-[#1877F2] group-hover:translate-x-1 transition-all"
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
                }}
                className="mt-4 px-5 py-2 rounded-full bg-[#1877F2] text-white text-xs font-bold"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}

