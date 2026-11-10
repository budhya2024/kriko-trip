"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Quote } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

interface Testimonial {
  id: number;
  rating: number;
  title: string;
  comment: string;
  name: string;
  role: string;
  avatar: string;
  width?: string;
}

const testimonialsRow1: Testimonial[] = [
  {
    id: 1,
    rating: 5,
    title: "Average Experience",
    comment:
      "The tour was well-organized, and we enjoyed every bit of it. However, I wish we had more free time to explore on our own. Overall, a great experience!",
    name: "James Bonde",
    role: "KrikoTrip Traveler",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    width: "w-[320px] sm:w-[350px]",
  },
  {
    id: 2,
    rating: 5,
    title: "Average Experience",
    comment:
      "The tour was well-organized, and we enjoyed every bit of it. However, I wish we had more free time to explore on our own. Overall, a great experience!",
    name: "Michael D Linda",
    role: "KrikoTrip Traveler",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    width: "w-[370px] sm:w-[410px]",
  },
  {
    id: 3,
    rating: 5,
    title: "Average Experience",
    comment:
      "The tour was well-organized, and we enjoyed every bit of it. However, I wish we had more free time to explore on our own. Overall, a great experience!",
    name: "Amber Lashley",
    role: "KrikoTrip Traveler",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
    width: "w-[330px] sm:w-[360px]",
  },
  {
    id: 4,
    rating: 5,
    title: "Memorable Vacation",
    comment:
      "Our vacation exceeded all expectations! The private driver was punctual, hotels were top-notch, and customer support was always available.",
    name: "Sophia Turner",
    role: "KrikoTrip Traveler",
    avatar:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80",
    width: "w-[380px] sm:w-[420px]",
  },
];

const testimonialsRow2: Testimonial[] = [
  {
    id: 5,
    rating: 5,
    title: "Unforgettable Journey",
    comment:
      "Booking with KrikoTrip was the best decision for our family! The guide in Andaman was exceptionally knowledgeable and friendly.",
    name: "Lucas Walker",
    role: "KrikoTrip Traveler",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    width: "w-[350px] sm:w-[380px]",
  },
  {
    id: 6,
    rating: 5,
    title: "Top-Tier Organization",
    comment:
      "Everything from flight coordination to private island tours went seamlessly. Zero stress and pure adventure from start to finish!",
    name: "Emma Watson",
    role: "KrikoTrip Traveler",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80",
    width: "w-[380px] sm:w-[415px]",
  },
  {
    id: 7,
    rating: 5,
    title: "Incredible Memories",
    comment:
      "The tour was well-organized, and we enjoyed every bit of it. Highly recommend their personalized custom itinerary packages!",
    name: "David Miller",
    role: "KrikoTrip Traveler",
    avatar:
      "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&q=80",
    width: "w-[330px] sm:w-[360px]",
  },
  {
    id: 8,
    rating: 5,
    title: "Flawless Service",
    comment:
      "We took the 5 Days/6 Nights tour and had a wonderful time. Great hotel recommendations and very professional local team.",
    name: "Olivia Rodrigo",
    role: "KrikoTrip Traveler",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
    width: "w-[360px] sm:w-[395px]",
  },
];

const allMobileTestimonials: Testimonial[] = [
  ...testimonialsRow1,
  ...testimonialsRow2,
];

function TestimonialCard({
  item,
  isMobile = false,
}: {
  item: Testimonial;
  isMobile?: boolean;
}) {
  return (
    <div
      className={`${
        isMobile
          ? "w-full h-[255px] sm:h-[270px] shadow-xs"
          : `${item.width || "w-[340px] sm:w-[370px]"} h-[265px] sm:h-[280px] shrink-0`
      } bg-white rounded-2xl p-5 sm:p-7 border-0 flex flex-col justify-between select-none cursor-pointer`}
    >
      <div>
        {/* Star Rating in Logo Color */}
        <div className="flex items-center gap-1 mb-3 text-[#1877F2]">
          {[...Array(item.rating)].map((_, i) => (
            <svg
              key={i}
              className="w-4 h-4 fill-current"
              viewBox="0 0 24 24"
            >
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
          ))}
        </div>

        {/* Title */}
        <h4 className="text-[15px] sm:text-[16px] font-semibold text-gray-900 mb-1.5">
          {item.title}
        </h4>

        {/* Comment Text */}
        <p className="text-[13px] sm:text-sm text-gray-500 font-normal leading-relaxed line-clamp-4">
          {item.comment}
        </p>
      </div>

      {/* Reviewer Info */}
      <div className="flex items-center gap-3 mt-4 pt-3.5 border-t border-gray-100/90">
        <div className="relative w-9.5 h-9.5 sm:w-10 sm:h-10 rounded-full overflow-hidden shrink-0 border border-gray-100">
          <Image
            src={item.avatar}
            alt={item.name}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-col text-left">
          <span className="text-[14px] font-semibold text-gray-900 leading-tight">
            {item.name}
          </span>
          <span className="text-[11.5px] font-normal text-gray-400 mt-0.5">
            {item.role}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function TestimonialsSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="w-full bg-[#f6f9fd] py-8 md:py-16 relative overflow-hidden">
      {/* Testimonials Background Image */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image
          src="/assets/images/home1-testimonial-bg.png"
          alt="Testimonials background"
          fill
          sizes="100vw"
          className="object-cover object-center opacity-85"
        />
      </div>

      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 xl:gap-12 items-center">

          {/* ─── Left Side: Header & Big Featured Testimonial Card ─── */}
          <div className="w-full lg:col-span-5 flex flex-col justify-center">
            <h2 className="section-title">
              Hear It from Travelers
            </h2>
            <p className="section-details max-w-md">
              We go beyond just booking trips—we create unforgettable travel
              experiences that match your dreams!
            </p>

            {/* Big Featured Testimonial Card */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border-0 shadow-xs relative mt-6 sm:mt-10">
              {/* Decorative Large Quote Icon */}
              <div className="absolute top-6 right-6 text-blue-100 pointer-events-none">
                <Quote className="w-10 h-10 sm:w-12 sm:h-12 rotate-180" />
              </div>

              {/* 5 Rating Stars in Logo Color */}
              <div className="flex items-center gap-2 mb-3.5">
                <div className="flex items-center gap-1 text-[#1877F2]">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-4.5 h-4.5 fill-current"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
              </div>

              {/* Big Quote Headline */}
              <h3 className="text-lg sm:text-[22px] font-semibold text-gray-900 leading-snug mb-2.5">
                &ldquo;The Best Travel Agency We Have Ever Booked With!&rdquo;
              </h3>

              {/* Long Review Paragraph */}
              <p className="text-[13.5px] sm:text-[14.5px] text-gray-500 leading-relaxed font-normal">
                &ldquo;From the moment we inquired to the day we returned home,
                everything was handled with absolute perfection. The private guides,
                luxury resort reservations, and custom itinerary exceeded all our
                expectations.&rdquo;
              </p>

              {/* Reviewer Profile */}
              <div className="flex items-center gap-3.5 mt-5 pt-4 border-t border-gray-100">
                <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-full overflow-hidden shrink-0 ring-2 ring-[#1877F2]/20">
                  <Image
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80"
                    alt="Alexander Wright"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[14.5px] sm:text-base font-semibold text-gray-900 leading-tight">
                    Alexander Wright
                  </span>
                  <span className="text-[11.5px] sm:text-[12.5px] text-gray-400 font-normal mt-0.5">
                    Verified KrikoTrip Traveler • Family Tour
                  </span>
                </div>
              </div>
            </div>

            {/* ─── Mobile View: Interactive Swipeable Reviews Carousel ─── */}
            <div className="block lg:hidden w-full min-w-0 mt-8">
              <div className="flex items-center justify-between mb-3 px-1">
                <span className="text-xs font-semibold text-[#1877F2] tracking-wider uppercase">
                  More Customer Reviews
                </span>
                <span className="text-[11px] text-gray-400 font-normal">
                  Swipe to explore →
                </span>
              </div>

              {mounted ? (
                <Swiper
                  modules={[Autoplay]}
                  autoplay={{
                    delay: 3500,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                  }}
                  loop={true}
                  grabCursor={true}
                  slidesPerView={1.12}
                  spaceBetween={14}
                  breakpoints={{
                    480: {
                      slidesPerView: 1.3,
                      spaceBetween: 16,
                    },
                    640: {
                      slidesPerView: 1.8,
                      spaceBetween: 18,
                    },
                  }}
                  className="w-full !overflow-visible"
                >
                  {allMobileTestimonials.map((item) => (
                    <SwiperSlide key={`mob-${item.id}`} className="h-auto">
                      <TestimonialCard item={item} isMobile={true} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              ) : (
                <div className="flex gap-3.5 overflow-x-auto pb-4 scrollbar-none">
                  {allMobileTestimonials.slice(0, 3).map((item) => (
                    <div
                      key={`ssr-${item.id}`}
                      className="w-[85vw] max-w-[320px] shrink-0"
                    >
                      <TestimonialCard item={item} isMobile={true} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* ─── Desktop Right Side: Two Rows of Opposite Infinite Marquee Cards ─── */}
          <div className="hidden lg:flex lg:col-span-7 flex-col gap-5 sm:gap-6 w-full min-w-0 overflow-hidden relative">

            {/* Fade edges gradient for seamless slide-in/slide-out */}
            <div className="absolute top-0 bottom-0 left-0 w-8 sm:w-16 bg-gradient-to-r from-[#f6f9fd] to-transparent z-10 pointer-events-none" />
            <div className="absolute top-0 bottom-0 right-0 w-8 sm:w-16 bg-gradient-to-l from-[#f6f9fd] to-transparent z-10 pointer-events-none" />

            {/* Row 1: Sliding Left (Right to Left) */}
            <div className="overflow-hidden w-full">
              <div className="animate-marquee-left flex gap-5 sm:gap-6 items-center">
                {/* 1st copy */}
                {testimonialsRow1.map((item) => (
                  <TestimonialCard key={`r1-a-${item.id}`} item={item} />
                ))}
                {/* 2nd duplicated copy for 100% seamless infinite loop */}
                {testimonialsRow1.map((item) => (
                  <TestimonialCard key={`r1-b-${item.id}`} item={item} />
                ))}
              </div>
            </div>

            {/* Row 2: Sliding in Opposite Direction (Left to Right) */}
            <div className="overflow-hidden w-full">
              <div className="animate-marquee-right flex gap-5 sm:gap-6 items-center">
                {/* 1st copy */}
                {testimonialsRow2.map((item) => (
                  <TestimonialCard key={`r2-a-${item.id}`} item={item} />
                ))}
                {/* 2nd duplicated copy for 100% seamless infinite loop */}
                {testimonialsRow2.map((item) => (
                  <TestimonialCard key={`r2-b-${item.id}`} item={item} />
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
