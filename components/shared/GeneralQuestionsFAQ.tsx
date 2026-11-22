import React from "react";
import FaqAccordionList, { FaqDisplayItem } from "./FaqAccordionList";
import { getFaqs } from "@/lib/api/server/faqs";
import type { FaqScope } from "@/lib/api/contracts";

const fallbackFaqData: FaqDisplayItem[] = [
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

interface GeneralQuestionsFAQProps {
  scope?: FaqScope;
}

export default async function GeneralQuestionsFAQ({
  scope = "general",
}: GeneralQuestionsFAQProps) {
  const cmsFaqs = await getFaqs(scope);

  const displayItems: FaqDisplayItem[] =
    cmsFaqs.length > 0
      ? cmsFaqs.map((f) => ({
          id: f.id,
          question: f.question,
          answer: f.answer,
        }))
      : fallbackFaqData;

  return (
    <section className="w-full py-8 md:py-16 bg-white">
      <div className="container max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="section-title">
            General Questions
          </h2>
          <p className="section-details max-w-xl mx-auto">
            We&apos;re committed to offering more than just products—we provide
            exceptional experiences.
          </p>
        </div>

        <FaqAccordionList items={displayItems} />
      </div>
    </section>
  );
}
