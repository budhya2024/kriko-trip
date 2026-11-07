"use client";

import React, { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "What Services Does Your Travel Agency Provide?",
    answer:
      "A travel agency typically provides a wide range of services to ensure a smooth and enjoyable travel experience. As like- Hotel booking, Flight Booking, Visa & Customized Travel Package etc.",
  },
  {
    question: "Do You Offer Customized Travel Packages?",
    answer:
      "Yes, absolutely! We specialize in tailoring customized holiday itineraries based on your budget, travel dates, preferred destinations, luxury villa upgrades, and specific activities.",
  },
  {
    question: "How do I book a tour or vacation package?",
    answer:
      "You can book directly through our website, submit our quick trip inquiry form, or connect directly with our certified holiday advisors via WhatsApp or phone call.",
  },
  {
    question: "Do You Provide Visa Assistance?",
    answer:
      "Yes, we offer complete visa guidance including document checklists, appointment booking, visa application filing, and embassy interview preparation for all major travel destinations.",
  },
  {
    question: "What is your cancellation and refund policy?",
    answer:
      "We provide flexible cancellation options. Cancellations made 30+ days prior to travel receive up to a 90% refund (less non-refundable flight and partner hotel fees).",
  },
];

export default function GeneralQuestionsFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="w-full py-14 sm:py-20 bg-white">
      <div className="container max-w-4xl mx-auto px-4 sm:px-6">
        {/* Section Title & Details */}
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="section-title">
            General Questions
          </h2>
          <p className="section-details max-w-xl mx-auto">
            We&apos;re committed to offering more than just products—we provide
            exceptional experiences.
          </p>
        </div>

        {/* Smooth Accordion List (Borderless) */}
        <div className="space-y-3.5 sm:space-y-4">
          {faqData.map((item, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={idx}
                className={`rounded-xl transition-all duration-300 overflow-hidden ${isOpen
                  ? "bg-white shadow-[0_8px_25px_rgba(0,0,0,0.06)] p-5 sm:p-6"
                  : "bg-[#F3F4F6] hover:bg-[#EBEEF2] p-5 sm:p-6"
                  }`}
              >
                {/* Accordion Header */}
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full flex items-center justify-between gap-4 text-left cursor-pointer focus:outline-none select-none"
                >
                  <span
                    className={`text-[15px] sm:text-[16px] font-bold leading-snug transition-colors duration-200 ${isOpen ? "text-[#1877F2]" : "text-gray-950"
                      }`}
                  >
                    {item.question}
                  </span>

                  {/* Smooth Rotating Triangle Arrow */}
                  <div className="shrink-0 ml-2">
                    <svg
                      viewBox="0 0 10 6"
                      fill="currentColor"
                      className={`w-2.5 h-2.5 transition-transform duration-300 ease-in-out ${isOpen
                        ? "text-[#1877F2] rotate-180"
                        : "text-[#4B5563] rotate-0"
                        }`}
                    >
                      <path d="M0 0L5 6L10 0H0Z" />
                    </svg>
                  </div>
                </button>

                {/* Smooth Animated Opening & Closing Content */}
                <div
                  className={`grid transition-all duration-300 ease-in-out ${isOpen
                    ? "grid-rows-[1fr] opacity-100 mt-3 pt-1"
                    : "grid-rows-[0fr] opacity-0 mt-0 pt-0"
                    }`}
                >
                  <div className="overflow-hidden">
                    <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed font-normal">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
