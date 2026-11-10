import React from "react";
import Link from "next/link";
import { Header, Footer, PageHeader } from "@/components/shared";

export const metadata = {
  title: "Terms of Service | KrikoTrip Travel Agency",
  description:
    "Review KrikoTrip's booking terms, cancellation policies, payment schedules, and travel conditions before reserving your holiday tour package.",
};

export default function TermsOfServicePage() {
  const lastUpdated = "November 10, 2026";

  const sections = [
    {
      id: "agreement",
      title: "1. Agreement & Acceptance",
      content: (
        <>
          <p>
            These Terms of Service (&quot;Terms&quot;) govern the purchase, booking, and participation in all holiday packages, customized travel itineraries, cab transfers, hotel stays, and sightseeing tours arranged by <strong>KrikoTrip Travel Agency</strong> (&quot;KrikoTrip&quot;, &quot;we&quot;, &quot;our&quot;, or &quot;us&quot;).
          </p>
          <p className="mt-3">
            By paying an advance booking deposit, confirming an itinerary quotation via email/WhatsApp, or utilizing our website (
            <Link href="/" className="text-[#1877F2] hover:underline font-medium">
              krikotrip.com
            </Link>
            ), you (&quot;Client&quot;, &quot;Traveler&quot;, &quot;Passenger&quot;, or &quot;User&quot;) confirm that you are at least 18 years of age and agree to be legally bound by these Terms on behalf of yourself and all members of your traveling party.
          </p>
        </>
      ),
    },
    {
      id: "booking-process",
      title: "2. Booking & Confirmation Process",
      content: (
        <>
          <p>
            All tour reservations are subject to hotel room, vehicle, and transport availability at the time of final confirmation.
          </p>
          <ul className="list-disc pl-5 mt-3 space-y-2 text-gray-700">
            <li>
              <strong>Quotation Validity:</strong> Travel package quotations, seasonal discounts, and promotional rates provided by KrikoTrip are dynamic and valid for 48 hours unless explicitly stated otherwise in writing.
            </li>
            <li>
              <strong>Advance Token Deposit:</strong> A minimum initial advance of <strong>30% to 50%</strong> of the total package value is required to block hotels, ferries (e.g. Makruzz/Nautika in Andaman), and dedicated tourist vehicles.
            </li>
            <li>
              <strong>Official Booking Voucher:</strong> Once the advance deposit is verified, KrikoTrip issues an official digital Booking Confirmation Voucher specifying hotel names, meal plans, driver contact protocol, and day-wise itinerary details.
            </li>
          </ul>
        </>
      ),
    },
    {
      id: "pricing-payments",
      title: "3. Pricing, GST & Payment Schedule",
      content: (
        <>
          <p>
            All tour package prices on our platform are quoted in Indian Rupees (INR) and are inclusive of standard applicable GST (Goods and Services Tax) unless itemized separately.
          </p>
          <div className="mt-4 p-4 rounded-xl border border-gray-100 bg-gray-50/80 space-y-2 text-xs sm:text-[13px] text-gray-700">
            <div className="flex items-start gap-2">
              <span className="font-bold text-gray-900 w-32 shrink-0">Stage 1 (Booking):</span>
              <span>30% to 50% of the total cost upon confirming the itinerary.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-bold text-gray-900 w-32 shrink-0">Stage 2 (Pre-Travel):</span>
              <span>Remaining balance must be cleared at least 7 to 14 days prior to the date of travel.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-bold text-gray-900 w-32 shrink-0">Peak Season Policy:</span>
              <span>100% payment clearance is mandatory 21 days in advance for Christmas, New Year, Durga Puja, and peak holiday travel periods.</span>
            </div>
          </div>
          <p className="mt-3 text-xs text-gray-500">
            *Exclusions: Personal expenses (room service, laundry, telephone calls, alcoholic beverages), monument entry tickets not specified, adventure activity charges (scuba diving, paragliding), and gratuities/tips are not included.
          </p>
        </>
      ),
    },
    {
      id: "cancellation-refund",
      title: "4. Cancellation & Refund Policy",
      content: (
        <>
          <p>
            If you or any member of your traveling party needs to cancel a confirmed package, written notification must be submitted via email to{" "}
            <a href="mailto:info@krikotrip.com" className="text-[#1877F2] hover:underline font-semibold">
              info@krikotrip.com
            </a>
            . Cancellation fees are calculated from the timestamp the email notice is received:
          </p>

          <div className="mt-4 overflow-hidden rounded-xl border border-gray-200">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-gray-100/80 text-gray-900 font-bold border-b border-gray-200">
                <tr>
                  <th className="p-3 sm:p-3.5">Notice Period Prior to Departure</th>
                  <th className="p-3 sm:p-3.5 text-right">Applicable Cancellation Charge</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-700">
                <tr>
                  <td className="p-3 sm:p-3.5">30 or more days before departure</td>
                  <td className="p-3 sm:p-3.5 text-right font-medium text-emerald-700">15% of total package cost</td>
                </tr>
                <tr>
                  <td className="p-3 sm:p-3.5">15 to 29 days before departure</td>
                  <td className="p-3 sm:p-3.5 text-right font-medium text-amber-600">30% of total package cost</td>
                </tr>
                <tr>
                  <td className="p-3 sm:p-3.5">7 to 14 days before departure</td>
                  <td className="p-3 sm:p-3.5 text-right font-medium text-orange-600">50% of total package cost</td>
                </tr>
                <tr>
                  <td className="p-3 sm:p-3.5">Less than 7 days or No-Show</td>
                  <td className="p-3 sm:p-3.5 text-right font-bold text-red-600">100% (Non-refundable)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="mt-3 text-xs text-gray-500">
            <strong>Refund Processing Timeline:</strong> Approved refunds are credited back to the original source of payment within <strong>7 to 10 working bank days</strong> after deducting applicable bank gateway fees and non-recoverable supplier deposits.
          </p>
        </>
      ),
    },
    {
      id: "unforeseen-events",
      title: "5. Force Majeure & Itinerary Modifications",
      content: (
        <>
          <p>
            Travel often involves dynamic factors beyond our control, including adverse weather, monsoons, cyclones, road blockages, landslides, flight cancellations/delays, ferry suspensions, strikes, and local government curfews.
          </p>
          <ul className="list-disc pl-5 mt-3 space-y-2 text-gray-700">
            <li>
              <strong>Operational Changes:</strong> In the event of force majeure, KrikoTrip reserves the right to alter the sightseeing sequence, substitute hotels with equal category properties, or modify routes in the paramount interest of passenger safety.
            </li>
            <li>
              <strong>Additional Expenses:</strong> Any extra accommodation nights, detour transportation costs, or re-routed flights caused by weather delays or natural disasters must be borne directly by the traveler on the spot.
            </li>
          </ul>
        </>
      ),
    },
    {
      id: "documents-permits",
      title: "6. Identity Proofs & Forest / Island Permits",
      content: (
        <>
          <p>
            All adult passengers traveling within India must carry original, valid government identification (Aadhaar Card, Passport, Voter ID, or Driving License).
          </p>
          <ul className="list-disc pl-5 mt-3 space-y-2 text-gray-700">
            <li>
              <strong>Restricted Areas:</strong> Travelers visiting Sundarban Mangroves, Andaman Havelock/Neil Islands, or Ladakh/Sikkim border areas must provide ID photocopies in advance for official forest department and harbor entry permits.
            </li>
            <li>
              <strong>Foreign Travelers:</strong> Foreign nationals and NRI passport holders must carry a valid Indian visa or OCI card, along with valid passports having at least 6 months remaining validity.
            </li>
          </ul>
        </>
      ),
    },
    {
      id: "health-insurance",
      title: "7. Health, Fitness & Comprehensive Insurance",
      content: (
        <>
          <p>
            High-altitude destinations (such as Leh Ladakh, Gulmarg Snow, Spiti) and safari zones require a basic level of physical fitness. Travelers must notify us beforehand regarding any chronic heart or respiratory conditions.
          </p>
          <p className="mt-2.5">
            <strong>Travel Insurance Notice:</strong> We strongly urge all clients to acquire comprehensive personal travel insurance covering baggage loss, trip cancellation, personal accidents, and emergency medical repatriation.
          </p>
        </>
      ),
    },
    {
      id: "liability-jurisdiction",
      title: "8. Limitation of Liability & Governing Jurisdiction",
      content: (
        <>
          <p>
            While KrikoTrip exercises utmost diligence in vetting reliable transporters, boat crews, and luxury resorts, we act solely as an organizer and travel coordinator. We shall not be held liable for personal injury, sickness, theft, or property loss during third-party transport or hotel stays.
          </p>
          <p className="mt-3">
            <strong>Governing Law:</strong> Any dispute, claim, or legal matter arising out of or related to our services shall be subject to the exclusive jurisdiction of the competent courts in <strong>Kolkata, West Bengal, India</strong>.
          </p>
        </>
      ),
    },
    {
      id: "contact-support",
      title: "9. Customer Support & Assistance",
      content: (
        <>
          <p>
            For urgent trip clarifications, reservation adjustments, or grievance matters, our executive customer desk is accessible around the clock:
          </p>
          <div className="mt-4 p-4 rounded-xl border border-blue-100 bg-[#f8fafd] space-y-2 text-sm text-gray-800">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-900 w-28">Head Office:</span>
              <span>BL-A Shop-GLP/5 676 Green Land Park, Sonarpur, Kolkata - 700103, West Bengal</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-900 w-28">Helpline:</span>
              <a href="tel:+918250338715" className="text-[#1877F2] hover:underline font-medium">
                +91 8250338715
              </a>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-900 w-28">Support Email:</span>
              <a href="mailto:info@krikotrip.com" className="text-[#1877F2] hover:underline font-medium">
                info@krikotrip.com
              </a>
            </div>
          </div>
        </>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      <Header />

      <main className="flex-1">
        {/* Page Banner Header */}
        <PageHeader
          title="Terms of Service"
          subtitle="Please read our booking policies, cancellation matrix, and travel conditions carefully before making a reservation."
          bgImage="https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=2000&q=80"
          breadcrumb="Terms of Service"
        />

        {/* Content Section */}
        <div className="container py-10 sm:py-16">
          <article className=" bg-white  p-6 sm:p-10 border border-gray-200/80 shadow-2xs space-y-10">
            {/* Header Meta */}
            <div className="pb-6 border-b border-gray-100 flex flex-wrap items-center justify-between gap-3 text-xs text-gray-500">
              <span className="font-medium">
                Last Updated: {lastUpdated}
              </span>
            </div>

            {/* Document Sections */}
            {sections.map((section) => (
              <section
                key={section.id}
                id={section.id}
                className="scroll-mt-28 space-y-3 pt-2 first:pt-0"
              >
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 tracking-tight">
                  {section.title}
                </h2>

                <div className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  {section.content}
                </div>
              </section>
            ))}

            {/* Related Document Links */}
            <div className="pt-8 mt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
              <span className="text-gray-500">
                Curious about how we safeguard your personal data?
              </span>
              <Link
                href="/privacy-policy"
                className="font-semibold text-[#1877F2] flex items-center gap-1"
              >
                View Privacy Policy
              </Link>
            </div>
          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
}

