"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Quote } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { fetchTestimonials, type TestimonialItem } from "@/lib/api/reviews";

import "swiper/css";

interface CardTestimonial {
  id: string;
  rating: number;
  title: string;
  comment: string;
  name: string;
  role: string;
  avatar: string;
  packageTitle?: string;
  packageSlug?: string;
  width?: string;
}

const fallbackRow1: CardTestimonial[] = [
  {
    id: "fb-1",
    rating: 5,
    title: "Unforgettable Experience",
    comment:
      "The tour was well-organized, and we enjoyed every bit of it. Every transfer and hotel check-in was hassle-free. Overall, a great experience!",
    name: "James Bonde",
    role: "KrikoTrip Traveler",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    width: "w-[320px] sm:w-[350px]",
  },
  {
    id: "fb-2",
    rating: 5,
    title: "Flawless Coordination",
    comment:
      "The team was responsive, punctual, and very helpful throughout. We had zero stress and pure relaxation from start to finish!",
    name: "Michael D Linda",
    role: "KrikoTrip Traveler",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    width: "w-[370px] sm:w-[410px]",
  },
  {
    id: "fb-3",
    rating: 5,
    title: "Thoughtful Itinerary",
    comment:
      "We never felt rushed during sightseeing and still covered every highlight on our list. Highly recommend their custom packages!",
    name: "Amber Lashley",
    role: "KrikoTrip Traveler",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
    width: "w-[330px] sm:w-[360px]",
  },
  {
    id: "fb-4",
    rating: 5,
    title: "Memorable Vacation",
    comment:
      "Our vacation exceeded all expectations! The private driver was polite, hotels were top-notch, and customer support was always available.",
    name: "Sophia Turner",
    role: "KrikoTrip Traveler",
    avatar:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80",
    width: "w-[380px] sm:w-[420px]",
  },
];

const fallbackRow2: CardTestimonial[] = [
  {
    id: "fb-5",
    rating: 5,
    title: "Unforgettable Journey",
    comment:
      "Booking with KrikoTrip was the best decision for our family! The local guides were exceptionally knowledgeable and friendly.",
    name: "Lucas Walker",
    role: "KrikoTrip Traveler",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    width: "w-[350px] sm:w-[380px]",
  },
  {
    id: "fb-6",
    rating: 5,
    title: "Top-Tier Organization",
    comment:
      "Everything from transfer coordination to island activities went seamlessly. Exceptional service from beginning to end!",
    name: "Emma Watson",
    role: "KrikoTrip Traveler",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80",
    width: "w-[380px] sm:w-[415px]",
  },
  {
    id: "fb-7",
    rating: 5,
    title: "Incredible Memories",
    comment:
      "The resort was gorgeous and all activities were pre-arranged. A truly smooth and delightful holiday for our entire group.",
    name: "David Miller",
    role: "KrikoTrip Traveler",
    avatar:
      "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&q=80",
    width: "w-[330px] sm:w-[360px]",
  },
  {
    id: "fb-8",
    rating: 5,
    title: "Flawless Service",
    comment:
      "We took the tour package and had a wonderful time. Great hotel recommendations and very professional local team.",
    name: "Olivia Rodrigo",
    role: "KrikoTrip Traveler",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
    width: "w-[360px] sm:w-[395px]",
  },
];

const fallbackFeatured: CardTestimonial = {
  id: "fb-0",
  rating: 5,
  title: "The Best Travel Agency We Have Ever Booked With!",
  comment:
    "From the moment we inquired to the day we returned home, everything was handled with absolute perfection. The private guides, luxury resort reservations, and custom itinerary exceeded all our expectations.",
  name: "Alexander Wright",
  role: "Verified KrikoTrip Traveler • Family Tour",
  avatar:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80",
};

function TestimonialCard({
  item,
  isMobile = false,
}: {
  item: CardTestimonial;
  isMobile?: boolean;
}) {
  const content = (
    <div
      className={`${
        isMobile
          ? "w-full h-[255px] sm:h-[270px] shadow-xs"
          : `${item.width || "w-[340px] sm:w-[370px]"} h-[265px] sm:h-[280px] shrink-0`
      } bg-white rounded-2xl p-5 sm:p-7 border-0 flex flex-col justify-between select-none cursor-pointer transition-shadow hover:shadow-md`}
    >
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-1 text-[#1877F2]">
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
          {item.packageTitle && (
            <span className="text-[10.5px] font-medium text-[#1877F2] bg-blue-50 px-2 py-0.5 rounded-full truncate max-w-[140px]">
              {item.packageTitle}
            </span>
          )}
        </div>

        <h4 className="text-[15px] sm:text-[16px] font-semibold text-gray-900 mb-1.5 truncate">
          {item.title}
        </h4>

        <p className="text-[13px] sm:text-sm text-gray-500 font-normal leading-relaxed line-clamp-4">
          {item.comment}
        </p>
      </div>

      <div className="flex items-center gap-3 mt-4 pt-3.5 border-t border-gray-100/90">
        <div className="relative w-9.5 h-9.5 sm:w-10 sm:h-10 rounded-full overflow-hidden shrink-0 border border-gray-100">
          <Image
            src={item.avatar}
            alt={item.name}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-col text-left min-w-0">
          <span className="text-[14px] font-semibold text-gray-900 leading-tight truncate">
            {item.name}
          </span>
          <span className="text-[11.5px] font-normal text-gray-400 mt-0.5 truncate">
            {item.role}
          </span>
        </div>
      </div>
    </div>
  );

  if (item.packageSlug) {
    return (
      <Link href={`/tour-packages/${item.packageSlug}`} className="block">
        {content}
      </Link>
    );
  }

  return content;
}

export default function TestimonialsSection() {
  const [mounted, setMounted] = useState(false);
  const [liveTestimonials, setLiveTestimonials] = useState<CardTestimonial[]>([]);

  useEffect(() => {
    setMounted(true);
    let isMounted = true;
    fetchTestimonials(20)
      .then((items) => {
        if (!isMounted || !items || items.length === 0) return;
        const mapped: CardTestimonial[] = items.map((t: TestimonialItem, idx: number) => ({
          id: t.id,
          rating: t.rating || 5,
          title: t.title || "Wonderful Vacation Experience",
          comment: t.comment,
          name: t.authorName,
          role: t.tripType
            ? `Verified Traveler • ${t.tripType.charAt(0).toUpperCase() + t.tripType.slice(1)} Tour`
            : "Verified KrikoTrip Traveler",
          avatar:
            t.authorAvatarUrl ||
            (idx % 2 === 0
              ? "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
              : "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"),
          packageTitle: t.packageTitle,
          packageSlug: t.packageSlug,
          width: idx % 3 === 0 ? "w-[360px] sm:w-[400px]" : "w-[330px] sm:w-[360px]",
        }));
        setLiveTestimonials(mapped);
      })
      .catch(() => {
        setLiveTestimonials([]);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const hasLive = liveTestimonials.length > 0;
  const featured = hasLive ? liveTestimonials[0] : fallbackFeatured;

  const row1 = hasLive
    ? liveTestimonials.filter((_, i) => i % 2 === 0)
    : fallbackRow1;
  const row2 = hasLive
    ? liveTestimonials.filter((_, i) => i % 2 !== 0)
    : fallbackRow2;

  const mobileList = hasLive ? liveTestimonials : [fallbackFeatured, ...fallbackRow1, ...fallbackRow2];

  return (
    <section className="w-full bg-[#f6f9fd] py-8 md:py-16 relative overflow-hidden">
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
          <div className="w-full lg:col-span-5 flex flex-col justify-center">
            <h2 className="section-title">
              Hear It from Travelers
            </h2>
            <p className="section-details max-w-md">
              We go beyond just booking trips—we create unforgettable travel
              experiences that match your dreams!
            </p>

            <div className="hidden lg:block bg-white rounded-2xl p-6 sm:p-8 border-0 shadow-xs relative mt-6 sm:mt-10">
              <div className="absolute top-6 right-6 text-blue-100 pointer-events-none">
                <Quote className="w-10 h-10 sm:w-12 sm:h-12 rotate-180" />
              </div>

              <div className="flex items-center gap-2 mb-3.5">
                <div className="flex items-center gap-1 text-[#1877F2]">
                  {[...Array(featured.rating)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-4.5 h-4.5 fill-current"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
                {featured.packageTitle && (
                  <span className="text-xs font-medium text-[#1877F2] bg-blue-50 px-2.5 py-0.5 rounded-full">
                    {featured.packageTitle}
                  </span>
                )}
              </div>

              <h3 className="text-lg sm:text-[22px] font-semibold text-gray-900 leading-snug mb-2.5">
                &ldquo;{featured.title}&rdquo;
              </h3>

              <p className="text-[13.5px] sm:text-[14.5px] text-gray-500 leading-relaxed font-normal">
                &ldquo;{featured.comment}&rdquo;
              </p>

              <div className="flex items-center gap-3.5 mt-5 pt-4 border-t border-gray-100">
                <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-full overflow-hidden shrink-0 ring-2 ring-[#1877F2]/20">
                  <Image
                    src={featured.avatar}
                    alt={featured.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col text-left min-w-0">
                  <span className="text-[14.5px] sm:text-base font-semibold text-gray-900 leading-tight truncate">
                    {featured.name}
                  </span>
                  <span className="text-[11.5px] sm:text-[12.5px] text-gray-400 font-normal mt-0.5 truncate">
                    {featured.role}
                  </span>
                </div>
              </div>
            </div>

            <div className="block lg:hidden w-full min-w-0 mt-6 sm:mt-8">
              <div className="flex items-center justify-between mb-3 px-1" />

              {mounted ? (
                <Swiper
                  modules={[Autoplay]}
                  autoplay={{
                    delay: 3500,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                  }}
                  loop={mobileList.length > 2}
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
                  {mobileList.map((item) => (
                    <SwiperSlide key={`mob-${item.id}`} className="h-auto">
                      <TestimonialCard item={item} isMobile={true} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              ) : (
                <div className="flex gap-3.5 overflow-x-auto pb-4 scrollbar-none">
                  {mobileList.slice(0, 3).map((item) => (
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

          <div className="hidden lg:flex lg:col-span-7 flex-col gap-5 sm:gap-6 w-full min-w-0 overflow-hidden relative">
            <div className="absolute top-0 bottom-0 left-0 w-8 sm:w-16 bg-gradient-to-r from-[#f6f9fd] to-transparent z-10 pointer-events-none" />
            <div className="absolute top-0 bottom-0 right-0 w-8 sm:w-16 bg-gradient-to-l from-[#f6f9fd] to-transparent z-10 pointer-events-none" />

            <div className="overflow-hidden w-full">
              <div className="animate-marquee-left flex gap-5 sm:gap-6 items-center">
                {row1.map((item) => (
                  <TestimonialCard key={`r1-a-${item.id}`} item={item} />
                ))}
                {row1.map((item) => (
                  <TestimonialCard key={`r1-b-${item.id}`} item={item} />
                ))}
              </div>
            </div>

            <div className="overflow-hidden w-full">
              <div className="animate-marquee-right flex gap-5 sm:gap-6 items-center">
                {row2.map((item) => (
                  <TestimonialCard key={`r2-a-${item.id}`} item={item} />
                ))}
                {row2.map((item) => (
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
