'use client'

import React, { useMemo, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ChevronLeft, ChevronRight, Clock } from 'lucide-react'
import type { BlogCategory, BlogListItem } from '@/lib/api/contracts'

interface BlogListClientProps {
  initialPosts: BlogListItem[]
  categories: BlogCategory[]
}

const POSTS_PER_PAGE = 9

export default function BlogListClient({
  initialPosts,
  categories,
}: BlogListClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [currentPage, setCurrentPage] = useState<number>(1)
  const articlesTopRef = useRef<HTMLDivElement>(null)

  const filteredPosts = useMemo(() => {
    if (selectedCategory === 'all') {
      return initialPosts
    }
    return initialPosts.filter(
      (p) => p.category.slug === selectedCategory || p.category.name === selectedCategory,
    )
  }, [initialPosts, selectedCategory])

  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / POSTS_PER_PAGE))
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE
  const currentPosts = filteredPosts.slice(startIndex, startIndex + POSTS_PER_PAGE)

  const handleSelectCategory = (catSlug: string) => {
    setSelectedCategory(catSlug)
    setCurrentPage(1)
  }

  const goToPage = (page: number) => {
    setCurrentPage(page)
    if (articlesTopRef.current) {
      articlesTopRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const formatDate = (dateStr: string | null | undefined): string => {
    if (!dateStr) return 'Recent'
    const date = new Date(dateStr)
    if (isNaN(date.getTime())) return dateStr
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }

  return (
    <div ref={articlesTopRef} className="container py-10 sm:py-14 lg:py-16">
      {categories.length > 0 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 sm:mb-10 no-scrollbar">
          <button
            type="button"
            onClick={() => handleSelectCategory('all')}
            className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all shrink-0 cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-[#00285C] text-white shadow-sm'
                : 'bg-white text-gray-600 hover:text-gray-900 border border-gray-200'
            }`}
          >
            All Stories ({initialPosts.length})
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => handleSelectCategory(cat.slug)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all shrink-0 cursor-pointer ${
                selectedCategory === cat.slug
                  ? 'bg-[#00285C] text-white shadow-sm'
                  : 'bg-white text-gray-600 hover:text-gray-900 border border-gray-200'
              }`}
            >
              {cat.name} ({cat.postCount})
            </button>
          ))}
        </div>
      )}

      {currentPosts.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-gray-200">
          <p className="text-gray-500 text-sm">No stories found in this category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {currentPosts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-2xl border border-gray-200/90 transition-colors duration-200 overflow-hidden flex flex-col group h-full cursor-pointer hover:border-gray-300"
            >
              <div className="relative w-full aspect-[16/10] overflow-hidden bg-gray-100 cursor-pointer image-shine">
                <Link href={`/blogs/${post.slug}`} className="block w-full h-full relative cursor-pointer">
                  <Image
                    src={post.coverUrl || 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1000&q=80'}
                    alt={post.coverAlt || post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                </Link>

                <div className="absolute top-3.5 left-3.5 z-10 pointer-events-none">
                  <span className="px-2.5 py-0.5 rounded-md bg-white/95 text-gray-800 text-[11px] font-medium tracking-wide uppercase shadow-xs border border-gray-100">
                    {post.badgeLabel || post.category.name || 'TRAVEL GUIDE'}
                  </span>
                </div>
              </div>

              <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between text-left">
                <div>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500 font-normal mb-2.5">
                    <div className="flex items-center gap-1.5">
                      <div className="relative w-5 h-5 sm:w-5.5 sm:h-5.5 rounded-full overflow-hidden bg-gray-100 border border-gray-200 shrink-0">
                        <Image
                          src={post.author.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'}
                          alt={post.author.name}
                          fill
                          sizes="24px"
                          className="object-cover rounded-full"
                        />
                      </div>
                      <span className="font-semibold text-gray-800">
                        {post.author.name}
                      </span>
                    </div>
                    <span className="text-gray-300 font-light">|</span>
                    <span>{formatDate(post.publishedAt)}</span>
                    <span className="text-gray-300 font-light">|</span>
                    <div className="flex items-center gap-1.5 text-gray-500 font-normal">
                      <Clock className="w-3.5 h-3.5 text-amber-500 shrink-0" strokeWidth={1.8} />
                      <span>{post.readTimeMinutes} Min Read</span>
                    </div>
                  </div>

                  <h3 className="text-[16px] sm:text-[17px] font-medium text-gray-900 group-hover:text-[#1877F2] transition-colors leading-snug line-clamp-2 mb-2.5">
                    <Link href={`/blogs/${post.slug}`} className="cursor-pointer">
                      {post.title}
                    </Link>
                  </h3>

                  <p className="text-xs sm:text-[13px] text-gray-500 leading-relaxed line-clamp-2 font-normal mb-4">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-4 mt-auto border-t border-gray-100 flex items-center justify-between">
                  <Link
                    href={`/blogs/${post.slug}`}
                    className="text-[13px] sm:text-[13.5px] font-semibold text-gray-900 group-hover:text-[#1877F2] transition-colors cursor-pointer"
                  >
                    Read Story
                  </Link>
                  <Link
                    href={`/blogs/${post.slug}`}
                    aria-label={`Read story: ${post.title}`}
                    className="text-gray-900 group-hover:text-[#1877F2] transition-transform duration-200 group-hover:translate-x-1 cursor-pointer flex items-center justify-center p-1"
                  >
                    <ArrowRight className="w-4 h-4 stroke-[2]" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="mt-12 sm:mt-16 flex items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => goToPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            aria-label="Previous Page"
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg border border-gray-200 bg-white text-gray-600 flex items-center justify-center hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
            <button
              key={pageNum}
              type="button"
              onClick={() => goToPage(pageNum)}
              className={`w-9 h-9 sm:w-10 sm:h-10 rounded-lg text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${
                currentPage === pageNum
                  ? 'bg-[#00285C] text-white shadow-xs'
                  : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
              }`}
            >
              {pageNum}
            </button>
          ))}

          <button
            type="button"
            onClick={() => goToPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            aria-label="Next Page"
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg border border-gray-200 bg-white text-gray-600 flex items-center justify-center hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  )
}
