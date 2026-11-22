"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, X, MapPin, Clock, ArrowRight, Compass, Sparkles, Loader2 } from "lucide-react";
import type { PackageListItem } from "@/lib/api/contracts";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const POPULAR_SEARCH_TAGS = [
  "Andaman",
  "Kashmir",
  "Kerala",
  "Goa",
  "Rajasthan",
  "Himachal",
  "Sundarban",
  "Honeymoon",
  "Family",
];

const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=600&q=80";

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<PackageListItem[]>([]);
  const [featuredPackages, setFeaturedPackages] = useState<PackageListItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);

      const controller = new AbortController();
      fetch("/api/v1/packages?featured=true&limit=3", { signal: controller.signal })
        .then((res) => res.json())
        .then((json: { data?: PackageListItem[] }) => {
          if (json.data) setFeaturedPackages(json.data);
        })
        .catch(() => {});

      return () => {
        controller.abort();
      };
    } else {
      document.body.style.overflow = "";
      setQuery("");
      setResults([]);
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    const trimmed = query.trim();
    if (!trimmed) {
      setResults([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      fetch(`/api/v1/packages?q=${encodeURIComponent(trimmed)}&limit=6`, {
        signal: controller.signal,
      })
        .then((res) => res.json())
        .then((json: { data?: PackageListItem[] }) => {
          setResults(json.data || []);
          setIsLoading(false);
        })
        .catch((err: unknown) => {
          if (err instanceof DOMException && err.name === "AbortError") {
            return;
          }
          setResults([]);
          setIsLoading(false);
        });
    }, 250);

    return () => {
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-start sm:items-center sm:justify-start sm:p-4 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-150">
      <div
        className="fixed inset-0 z-0"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative z-10 w-full sm:max-w-2xl bg-white sm:rounded-2xl flex flex-col h-full sm:h-auto sm:max-h-[85vh] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-150">
        <div className="p-3.5 sm:p-4 border-b border-gray-150 bg-white flex items-center gap-2.5 shrink-0">
          <div className="relative flex-1 flex items-center">
            {isLoading ? (
              <Loader2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-[#1877F2] animate-spin pointer-events-none" />
            ) : (
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400 pointer-events-none" />
            )}
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search destination, packages, hills, beach..."
              className="w-full bg-[#f4f5f7] text-gray-900 text-sm sm:text-base font-normal pl-10 pr-10 py-2.5 sm:py-3 rounded-full outline-none border border-transparent focus:border-[#1877F2] focus:bg-white transition-all"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-600 flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Clear query"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            className="px-3 py-2 text-xs sm:text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer shrink-0"
          >
            Cancel
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-5">
          {query.trim() && !isLoading && results.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-3 px-1">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Search Results
                </span>
                <span className="text-xs font-medium text-[#1877F2]">
                  {results.length} {results.length === 1 ? "package" : "packages"} found
                </span>
              </div>

              <div className="divide-y divide-gray-100">
                {results.map((pkg) => {
                  const priceInr = Math.round(pkg.pricePaise / 100);
                  const displayImg = pkg.coverImageUrl || DEFAULT_IMAGE;
                  const durationStr = `${pkg.days}D / ${pkg.nights}N`;

                  return (
                    <Link
                      key={pkg.id}
                      href={`/tour-packages/${pkg.slug}`}
                      onClick={onClose}
                      className="flex items-center gap-3.5 py-3 hover:bg-blue-50/50 rounded-xl px-2.5 transition-colors group cursor-pointer"
                    >
                      <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                        <Image
                          src={displayImg}
                          alt={pkg.title}
                          fill
                          sizes="80px"
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] sm:text-[11px] font-semibold text-[#1877F2] bg-blue-50 px-2 py-0.5 rounded-md capitalize">
                            {pkg.travelType}
                          </span>
                          <span className="text-[11px] text-gray-400 flex items-center gap-1 font-normal">
                            <Clock className="w-3 h-3" />
                            {durationStr}
                          </span>
                        </div>

                        <h4 className="text-xs sm:text-sm font-semibold text-gray-900 group-hover:text-[#1877F2] transition-colors line-clamp-1 leading-snug">
                          {pkg.title}
                        </h4>

                        <div className="flex items-center justify-between mt-1.5">
                          <span className="text-[11px] text-gray-500 flex items-center gap-1 font-normal">
                            <MapPin className="w-3 h-3 text-gray-400 shrink-0" />
                            {pkg.locationLabel || pkg.destination.name}
                          </span>

                          <span className="text-xs sm:text-sm font-bold text-gray-900 group-hover:text-[#1877F2]">
                            ₹{priceInr.toLocaleString("en-IN")}
                          </span>
                        </div>
                      </div>

                      <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-[#1877F2] group-hover:translate-x-0.5 transition-all shrink-0 hidden sm:block" />
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          {query.trim() && !isLoading && results.length === 0 && (
            <div className="py-12 text-center flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 mb-3">
                <Compass className="w-6 h-6 stroke-[1.8]" />
              </div>
              <h4 className="text-base font-semibold text-gray-900 mb-1">
                No tour packages found
              </h4>
              <p className="text-xs sm:text-sm text-gray-500 max-w-xs font-normal">
                We couldn&apos;t find any package matching &ldquo;{query}&rdquo;. Try another destination or keyword.
              </p>

              <div className="mt-5 flex flex-wrap gap-1.5 justify-center max-w-sm">
                {POPULAR_SEARCH_TAGS.slice(0, 5).map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => setQuery(tag)}
                    className="px-3 py-1 rounded-full bg-gray-100 hover:bg-blue-50 hover:text-[#1877F2] text-xs text-gray-700 transition-colors cursor-pointer"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}

          {!query.trim() && (
            <>
              <div>
                <div className="flex items-center gap-1.5 mb-2.5 px-1 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>Popular Destinations</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {POPULAR_SEARCH_TAGS.map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => setQuery(tag)}
                      className="px-3.5 py-1.5 rounded-full bg-gray-100 hover:bg-[#1877F2] hover:text-white text-xs sm:text-sm text-gray-700 font-normal transition-all duration-150 cursor-pointer active:scale-95"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              {featuredPackages.length > 0 && (
                <div className="pt-2">
                  <div className="flex items-center justify-between mb-3 px-1">
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Featured Packages
                    </span>
                    <Link
                      href="/tour-packages"
                      onClick={onClose}
                      className="text-xs font-medium text-[#1877F2] hover:underline cursor-pointer"
                    >
                      View All
                    </Link>
                  </div>

                  <div className="divide-y divide-gray-100">
                    {featuredPackages.map((pkg) => {
                      const priceInr = Math.round(pkg.pricePaise / 100);
                      const displayImg = pkg.coverImageUrl || DEFAULT_IMAGE;
                      const durationStr = `${pkg.days}D / ${pkg.nights}N`;

                      return (
                        <Link
                          key={pkg.id}
                          href={`/tour-packages/${pkg.slug}`}
                          onClick={onClose}
                          className="flex items-center gap-3.5 py-2.5 hover:bg-gray-50 rounded-xl px-2 transition-colors group cursor-pointer"
                        >
                          <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                            <Image
                              src={displayImg}
                              alt={pkg.title}
                              fill
                              sizes="64px"
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>

                          <div className="flex-1 min-w-0">
                            <h4 className="text-xs sm:text-sm font-medium text-gray-900 group-hover:text-[#1877F2] transition-colors line-clamp-1 leading-snug">
                              {pkg.title}
                            </h4>
                            <div className="flex items-center gap-3 mt-1 text-[11px] text-gray-500 font-normal">
                              <span className="flex items-center gap-1">
                                <MapPin className="w-3 h-3 text-gray-400" />
                                {pkg.locationLabel || pkg.destination.name}
                              </span>
                              <span>•</span>
                              <span>{durationStr}</span>
                            </div>
                          </div>

                          <div className="text-right shrink-0">
                            <span className="text-xs sm:text-sm font-semibold text-[#1877F2]">
                              ₹{priceInr.toLocaleString("en-IN")}
                            </span>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        <div className="p-3 bg-gray-50/80 border-t border-gray-100 flex items-center justify-between px-4 sm:px-5 shrink-0">
          <span className="text-[11px] sm:text-xs text-gray-500 font-normal">
            Need customized tour planning?
          </span>
          <Link
            href="/contact-us"
            onClick={onClose}
            className="text-[11px] sm:text-xs font-semibold text-[#1877F2] hover:underline cursor-pointer"
          >
            Contact Experts
          </Link>
        </div>
      </div>
    </div>
  );
}
