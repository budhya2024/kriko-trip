"use client"

import React, { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import {
  MapPin,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

export interface GalleryPhotoItem {
  id: string
  title: string
  location: string | null
  category: {
    id: string
    slug: string
    name: string
  }
  imageUrl: string
  aspect: "landscape" | "portrait" | "wide"
  displayOrder: number
}

export interface GalleryCategoryItem {
  id: string
  slug: string
  name: string
  displayOrder: number
}

interface GalleryClientProps {
  categories: GalleryCategoryItem[]
  photos: GalleryPhotoItem[]
}

export default function GalleryClient({
  categories,
  photos,
}: GalleryClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All")
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null)

  const filteredPhotos =
    selectedCategory === "All"
      ? photos
      : photos.filter(
          (p) =>
            p.category.name === selectedCategory ||
            p.category.slug === selectedCategory
        )

  const activePhoto =
    activePhotoIndex !== null && activePhotoIndex < filteredPhotos.length
      ? filteredPhotos[activePhotoIndex]
      : null

  const handlePrevPhoto = useCallback(() => {
    if (activePhotoIndex === null) return
    setActivePhotoIndex((prev) =>
      prev !== null && prev > 0 ? prev - 1 : filteredPhotos.length - 1
    )
  }, [activePhotoIndex, filteredPhotos.length])

  const handleNextPhoto = useCallback(() => {
    if (activePhotoIndex === null) return
    setActivePhotoIndex((prev) =>
      prev !== null && prev < filteredPhotos.length - 1 ? prev + 1 : 0
    )
  }, [activePhotoIndex, filteredPhotos.length])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activePhotoIndex === null) return
      if (e.key === "Escape") setActivePhotoIndex(null)
      if (e.key === "ArrowLeft") handlePrevPhoto()
      if (e.key === "ArrowRight") handleNextPhoto()
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [activePhotoIndex, handlePrevPhoto, handleNextPhoto])

  useEffect(() => {
    if (activePhotoIndex !== null) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [activePhotoIndex])

  return (
    <section className="container py-10 sm:py-14 lg:py-16">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
          <button
            type="button"
            onClick={() => {
              setSelectedCategory("All")
              setActivePhotoIndex(null)
            }}
            className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
              selectedCategory === "All"
                ? "bg-[#1877F2] text-white shadow-xs"
                : "bg-white text-gray-700 hover:text-[#1877F2] hover:bg-blue-50/50 border border-gray-200/80"
            }`}
          >
            All Photos
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => {
                setSelectedCategory(cat.name)
                setActivePhotoIndex(null)
              }}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                selectedCategory === cat.name
                  ? "bg-[#1877F2] text-white shadow-xs"
                  : "bg-white text-gray-700 hover:text-[#1877F2] hover:bg-blue-50/50 border border-gray-200/80"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        <div className="text-xs text-gray-500 font-medium shrink-0">
          Showing <span className="font-semibold text-gray-900">{filteredPhotos.length}</span> of{" "}
          <span className="font-semibold text-gray-900">{photos.length}</span> photos
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredPhotos.map((photo, index) => (
          <div
            key={photo.id}
            onClick={() => setActivePhotoIndex(index)}
            className="group relative bg-white overflow-hidden border border-gray-200/90 shadow-2xs hover:border-gray-300 transition-all duration-300 cursor-pointer flex flex-col"
          >
            <div className="relative w-full aspect-[4/3] overflow-hidden bg-gray-100 image-shine">
              <Image
                src={photo.imageUrl}
                alt={photo.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              />

              <div className="absolute top-3.5 left-3.5 z-10 pointer-events-none">
                <span className="px-2.5 py-1 rounded-md bg-white/95 text-gray-800 text-[11px] font-medium tracking-wide uppercase shadow-xs border border-gray-100">
                  {photo.category.name}
                </span>
              </div>

              <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10 pointer-events-none">
                <div className="w-11 h-11 rounded-full bg-white/90 text-gray-900 flex items-center justify-center shadow-md transform scale-90 group-hover:scale-100 transition-transform duration-300">
                  <Maximize2 className="w-5 h-5 text-gray-800" />
                </div>
              </div>
            </div>

            <div className="p-4 sm:p-5 flex flex-col justify-between flex-1 text-left bg-white">
              <div>
                <h3 className="text-[15px] sm:text-[16px] font-medium text-gray-900 group-hover:text-[#1877F2] transition-colors leading-snug line-clamp-1 mb-1.5">
                  {photo.title}
                </h3>
                {photo.location && (
                  <p className="text-xs text-gray-500 flex items-center gap-1.5 line-clamp-1">
                    <MapPin className="w-3.5 h-3.5 text-[#03ADFF] shrink-0" />
                    <span>{photo.location}</span>
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {activePhoto && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6"
          onClick={() => setActivePhotoIndex(null)}
        >
          <button
            type="button"
            onClick={() => setActivePhotoIndex(null)}
            aria-label="Close Lightbox"
            className="absolute top-4 right-4 sm:top-6 sm:right-6 z-50 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              handlePrevPhoto()
            }}
            aria-label="Previous Photo"
            className="absolute left-2 sm:left-6 z-50 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              handleNextPhoto()
            }}
            aria-label="Next Photo"
            className="absolute right-2 sm:right-6 z-50 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div
            className="relative max-w-4xl w-full max-h-[90vh] flex flex-col bg-[#0B132A] rounded-2xl overflow-hidden border border-white/15 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-[55vh] sm:h-[65vh] bg-black">
              <Image
                src={activePhoto.imageUrl}
                alt={activePhoto.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 900px"
                className="object-contain"
              />
            </div>

            <div className="p-4 sm:p-6 bg-[#08182B] border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-white">
              <div>
                <h3 className="text-base sm:text-lg font-medium text-white line-clamp-1">
                  {activePhoto.title}
                </h3>
                {activePhoto.location && (
                  <p className="text-xs text-gray-400 flex items-center gap-1.5 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-[#03ADFF] shrink-0" />
                    <span>{activePhoto.location}</span>
                  </p>
                )}
              </div>

              <div className="text-xs text-gray-400 font-medium shrink-0">
                Capture{" "}
                <span className="text-white font-semibold">
                  {(activePhotoIndex ?? 0) + 1}
                </span>{" "}
                of <span className="text-white font-semibold">{filteredPhotos.length}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
