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
    <section className="w-full py-14 sm:py-18 bg-white border-t border-gray-100">
      <div className="container max-w-4xl mx-auto px-4 sm:px-6">
        {/* Section Heading */}
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#111827] tracking-tight">
            General Questions
          </h2>
          <p className="text-xs sm:text-sm text-[#4B5563] mt-2.5 max-w-md mx-auto leading-relaxed">
            We&apos;re committed to offering more than just products—we provide
            exceptional experiences.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5 sm:space-y-4">
          {faqData.map((item, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={idx}
                className={`rounded-xl transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? "bg-white border-2 border-[#3B82F6] shadow-xs p-5 sm:p-6"
                    : "bg-[#F3F4F6] hover:bg-[#EBEEF2] border-2 border-transparent p-5 sm:p-6"
                }`}
              >
                {/* Accordion Header */}
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full flex items-center justify-between gap-4 text-left cursor-pointer focus:outline-none select-none"
                >
                  <span className="text-[15px] sm:text-[16px] font-bold text-gray-950 leading-snug">
                    {item.question}
                  </span>

                  {/* Solid Triangle Dropdown Arrow matching reference image */}
                  <div className="shrink-0 ml-2">
                    {isOpen ? (
                      <svg
                        viewBox="0 0 10 6"
                        fill="currentColor"
                        className="w-2.5 h-2.5 text-[#3B82F6]"
                      >
                        <path d="M0 6L5 0L10 6H0Z" />
                      </svg>
                    ) : (
                      <svg
                        viewBox="0 0 10 6"
                        fill="currentColor"
                        className="w-2.5 h-2.5 text-[#4B5563]"
                      >
                        <path d="M0 0L5 6L10 0H0Z" />
                      </svg>
                    )}
                  </div>
                </button>

                {/* Accordion Content */}
                {isOpen && (
                  <div className="pt-3 text-xs sm:text-sm text-[#4B5563] leading-relaxed font-normal animate-in fade-in duration-150">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

