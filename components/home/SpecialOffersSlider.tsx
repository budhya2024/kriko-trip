"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

export interface OfferSlideItem {
  id: string | number;
  image: string | StaticImageData;
  title: string;
  href: string;
}

interface SpecialOffersSliderProps {
  offers: OfferSlideItem[];
}

export default function SpecialOffersSlider({ offers }: SpecialOffersSliderProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div>
      {mounted ? (
        <Swiper
          modules={[Pagination, Autoplay]}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          loop={offers.length > 3}
          pagination={{
            clickable: true,
            el: ".custom-offers-pagination",
          }}
          breakpoints={{
            320: {
              slidesPerView: 1.2,
              spaceBetween: 14,
            },
            480: {
              slidesPerView: 1.25,
              spaceBetween: 16,
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 24,
            },
          }}
          className="w-full !pb-2"
        >
          {offers.map((offer) => (
            <SwiperSlide key={offer.id}>
              <Link
                href={offer.href}
                className="group block rounded-xl overflow-hidden transition-all duration-300 relative focus:outline-none"
              >
                <div className="relative w-full aspect-[4/3] overflow-hidden bg-gray-100 image-shine rounded-xl">
                  {typeof offer.image === "string" ? (
                    <Image
                      src={offer.image}
                      alt={offer.title}
                      fill
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      priority
                    />
                  ) : (
                    <Image
                      src={offer.image}
                      alt={offer.title}
                      className="w-full h-auto object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      priority
                    />
                  )}
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {offers.slice(0, 3).map((offer) => (
            <div
              key={offer.id}
              className="rounded-xl overflow-hidden shadow-xs bg-gray-100"
            >
              <div className="relative w-full aspect-[4/3]">
                {typeof offer.image === "string" ? (
                  <Image
                    src={offer.image}
                    alt={offer.title}
                    fill
                    className="object-cover"
                    priority
                  />
                ) : (
                  <Image
                    src={offer.image}
                    alt={offer.title}
                    className="w-full h-auto object-cover"
                    priority
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="custom-offers-pagination mt-4" />
    </div>
  );
}
