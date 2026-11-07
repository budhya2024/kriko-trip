"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";

const faqs = [
  {
    q: "How early in advance should I plan and book my tour package?",
    a: "We recommend booking international holiday packages at least 30 to 60 days in advance to ensure the best flight rates, hotel availability, and ample time for visa stamping. For domestic trips, 2 to 3 weeks in advance is usually sufficient.",
  },
  {
    q: "Can I customize the destinations and duration of an existing package?",
    a: "Yes, absolutely! Every package listed on KrikoTrip can be customized. You can add extra days, upgrade hotels to luxury villas, include private sightseeing transfers, or combine multiple destinations according to your preferences.",
  },
  {
    q: "What is your cancellation and refund policy?",
    a: "We offer flexible cancellation policies. Cancellations made 30+ days prior to travel receive up to a 90% refund (less non-refundable airline or hotel fees). Detailed cancellation schedules are shared transparently prior to confirmation.",
  },
  {
    q: "Do you provide emergency on-trip assistance while traveling?",
    a: "Yes. All KrikoTrip travelers are assigned a 24/7 dedicated travel concierge accessible via WhatsApp and telephone to assist with flights, logistics, medical emergencies, or local itinerary adjustments anywhere in the world.",
  },
];

export default function ContactFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="w-full py-12 lg:py-16 bg-[#F8FAFC] border-t border-gray-150">
      <div className="container max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-blue-50 border border-blue-100 text-[#1877F2] text-xs font-bold uppercase tracking-wider mb-2">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-950 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-gray-600 mt-2">
            Quick answers to common questions about our tours, bookings, and support.
          </p>
        </div>

        <div className="space-y-3.5">
          {faqs.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-xl border border-gray-200/90 overflow-hidden transition-all shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                >
                  <span className="text-[14.5px] sm:text-base font-bold text-gray-900">
                    {item.q}
                  </span>
                  <div className="w-7 h-7 rounded-lg bg-gray-50 flex items-center justify-center shrink-0 text-gray-600">
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-[#1877F2]" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </div>
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-sm text-gray-600 leading-relaxed border-t border-gray-100/70 animate-in fade-in duration-200">
                    {item.a}
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

