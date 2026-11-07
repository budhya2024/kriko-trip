"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import offerImg1 from "@/public/assets/images/home1-offer-img2-4-2.webp";
import offerImg2 from "@/public/assets/images/home1-offer-img3-4-2.webp";
import offerImg3 from "@/public/assets/images/home1-offer-img4-4-2.webp";
import offerImg4 from "@/public/assets/images/home1-offer-img5-4-2.webp";

interface OfferCard {
  id: number;
  image: typeof offerImg1;
  title: string;
  href: string;
}

const offers: OfferCard[] = [
  {
    id: 1,
    image: offerImg1,
    title: "Exclusive Tour Package Offer",
    href: "#",
  },
  {
    id: 2,
    image: offerImg2,
    title: "Save Upto 40% OFF - Family Travel Tour",
    href: "#",
  },
  {
    id: 3,
    image: offerImg3,
    title: "Bali, Indonesia - Total Price $299.00",
    href: "#",
  },
  {
    id: 4,
    image: offerImg4,
    title: "Travel Around The World - 30% OFF",
    href: "#",
  },
];

export default function SpecialOffers() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="w-full bg-white py-8 md:py-16 ">
      <div className="container">
        {/* Section Header */}
        <div className="text-center max-w-lg mx-auto pb-6 md:pb-8">
          <h2 className="section-title">
            Discounts &amp; Offers
          </h2>
          <p className="section-details max-w-xl mx-auto">
            A curated list of the most popular travel packages based on different
            destinations.
          </p>
        </div>

        {/* Swiper Slider */}
        <div className="">
          {mounted ? (
            <Swiper
              modules={[Pagination, Autoplay]}
              autoplay={{
                delay: 3500,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              loop={true}
              pagination={{
                clickable: true,
                el: ".custom-offers-pagination",
              }}
              breakpoints={{
                320: {
                  slidesPerView: 1,
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
                    className="group block  rounded-xl overflow-hidden  transition-all duration-300 relative focus:outline-none"
                  >
                    <div className="relative w-full overflow-hidden bg-gray-100">
                      <Image
                        src={offer.image}
                        alt={offer.title}
                        className="w-full h-auto object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        priority
                      />
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            /* Static SSR / Initial Grid */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {offers.slice(0, 3).map((offer) => (
                <div
                  key={offer.id}
                  className="rounded-2xl sm:rounded-3xl overflow-hidden shadow-xs bg-gray-100"
                >
                  <Image
                    src={offer.image}
                    alt={offer.title}
                    className="w-full h-auto object-cover"
                    priority
                  />
                </div>
              ))}
            </div>
          )}

          {/* Bottom Custom Large Width Dot Pagination */}
          <div className="custom-offers-pagination mt-4" />
        </div>
      </div>
    </section>
  );
}
