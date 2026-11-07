"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Header, Footer, PageHeader } from "@/components/shared";
import { blogPosts } from "@/components/blogs/data";
import { MapPin, Calendar, Clock, ArrowRight, Search, Tag } from "lucide-react";

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
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Featured post is the first one
  const featuredPost = filteredPosts[0];
  const regularPosts = filteredPosts.slice(1);

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

            {/* Search Input (No large rounded) */}
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

          {/* ─── Featured Hero Article (if available) ─── */}
          {featuredPost && (
            <div className="mb-12">
              <div className="bg-white rounded-2xl border border-gray-200/90 shadow-xs hover:shadow-lg transition-all duration-300 overflow-hidden grid grid-cols-1 lg:grid-cols-12 group">
                {/* Image (7 cols) */}
                <div className="relative lg:col-span-7 h-72 sm:h-96 lg:h-auto min-h-[300px] overflow-hidden bg-gray-100">
                  <Image
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1877F2] text-white text-xs font-bold shadow-md">
                      <Tag className="w-3.5 h-3.5" />
                      <span>{featuredPost.category}</span>
                    </span>
                  </div>
                </div>

                {/* Content (5 cols) */}
                <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
                  <div>
                    {/* Location & Read Time */}
                    <div className="flex items-center gap-4 text-xs font-semibold text-gray-600 mb-3">
                      <div className="flex items-center gap-1.5 text-gray-900">
                        <MapPin className="w-3.5 h-3.5 text-[#1877F2]" />
                        <span>{featuredPost.location}</span>
                      </div>
                      <span>•</span>
                      <div className="flex items-center gap-1 text-gray-500">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{featuredPost.readTime}</span>
                      </div>
                    </div>

                    {/* Title */}
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-gray-950 group-hover:text-[#1877F2] transition-colors leading-snug">
                      <Link href={`/blogs/${featuredPost.slug}`}>
                        {featuredPost.title}
                      </Link>
                    </h2>

                    {/* Excerpt */}
                    <p className="text-sm text-gray-600 mt-3.5 leading-relaxed line-clamp-3">
                      {featuredPost.excerpt}
                    </p>
                  </div>

                  {/* Author & CTA */}
                  <div className="mt-8 pt-5 border-t border-gray-150 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 border border-gray-200">
                        <Image
                          src={featuredPost.author.avatar}
                          alt={featuredPost.author.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-gray-900">
                          {featuredPost.author.name}
                        </p>
                        <p className="text-[11px] text-gray-500 font-medium">
                          {featuredPost.date}
                        </p>
                      </div>
                    </div>

                    <Link
                      href={`/blogs/${featuredPost.slug}`}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#1877F2] hover:bg-blue-600 text-white text-xs font-bold transition-all shadow-xs shrink-0"
                    >
                      <span>Read Story</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ─── Regular Articles Grid (Matching Reference Side-by-Side Cards) ─── */}
          {regularPosts.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-7">
              {regularPosts.map((post) => (
                <article
                  key={post.slug}
                  className="bg-white rounded-2xl border border-gray-200/90 shadow-xs hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col sm:flex-row group"
                >
                  {/* Left: Image */}
                  <div className="relative sm:w-5/12 h-52 sm:h-auto min-h-[200px] overflow-hidden bg-gray-100 shrink-0">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                  </div>

                  {/* Right: Details */}
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

                      {/* Date & Read Time */}
                      <div className="flex items-center gap-3 text-xs text-gray-500 font-medium mt-2">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                          <span>{post.date}</span>
                        </div>
                        <span>•</span>
                        <span>{post.readTime}</span>
                      </div>

                      {/* Divider */}
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
          ) : (
            !featuredPost && (
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
            )
          )}
        </div>
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}

