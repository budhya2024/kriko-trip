"use client";

import React, { useState } from "react";

export interface FaqDisplayItem {
  id?: string;
  question: string;
  answer: string;
}

interface FaqAccordionListProps {
  items: FaqDisplayItem[];
}

export default function FaqAccordionList({ items }: FaqAccordionListProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="space-y-3.5 sm:space-y-4">
      {items.map((item, idx) => {
        const isOpen = openIndex === idx;

        return (
          <div
            key={item.id ?? idx}
            className={`rounded-xl transition-all duration-300 overflow-hidden ${
              isOpen
                ? "bg-white shadow-[0_8px_25px_rgba(0,0,0,0.06)] p-4 sm:p-6"
                : "bg-[#F3F4F6] hover:bg-[#EBEEF2] p-4 sm:p-6"
            }`}
          >
            <button
              type="button"
              onClick={() => toggle(idx)}
              className="w-full flex items-center justify-between gap-3 sm:gap-4 text-left cursor-pointer focus:outline-none select-none"
            >
              <span
                className={`text-sm sm:text-base md:text-lg font-semibold leading-snug transition-colors duration-200 ${
                  isOpen ? "text-[#1877F2]" : "text-gray-950"
                }`}
              >
                {item.question}
              </span>

              <div className="shrink-0 ml-2">
                <svg
                  viewBox="0 0 10 6"
                  fill="currentColor"
                  className={`w-2.5 h-2.5 transition-transform duration-300 ease-in-out ${
                    isOpen ? "text-[#1877F2] rotate-180" : "text-[#4B5563] rotate-0"
                  }`}
                >
                  <path d="M0 0L5 6L10 0H0Z" />
                </svg>
              </div>
            </button>

            <div
              className={`grid transition-all duration-300 ease-in-out ${
                isOpen
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
  );
}
