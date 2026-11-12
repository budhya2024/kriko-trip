import React from "react";
import Link from "next/link";
import { Header, Footer, PageHeader } from "@/components/shared";
import {
  ShieldCheck,
  HeartPulse,
  Car,
  Building2,
  Compass,
  PhoneCall,
  CheckCircle2,
  Mail,
} from "lucide-react";

export const metadata = {
  title: "Health & Safety Measure | KrikoTrip Travel Agency",
  description:
    "Explore KrikoTrip's comprehensive health, hygiene, vehicle, accommodation, and emergency safety protocols designed to keep every traveler safe.",
};

const safetyPillars = [
  {
    icon: Car,
    title: "Sanitized & Verified Transit",
    description:
      "Every private cab, tempo traveller, and partner ferry undergoes pre-trip sanitization, mechanical safety checks, and driver verification.",
  },
  {
    icon: Building2,
    title: "Hygiene-Audited Stays",
    description:
      "Partner hotels, resorts, and houseboats are vetted for room sanitation, safe drinking water, fire safety compliance, and 24/7 reception support.",
  },
  {
    icon: Compass,
    title: "Certified Activity Safety",
    description:
      "Licensed instructors, life jackets, and safety briefings are mandatory for snorkeling, boating, snow sports, and forest excursions.",
  },
  {
    icon: HeartPulse,
    title: "24/7 On-Ground Assistance",
    description:
      "Our round-the-clock operations desk coordinates immediate local medical support, pharmacy access, and emergency travel adjustments.",
  },
];

const detailedMeasures = [
  {
    id: "transit-safety",
    title: "1. Road, Ferry & Transfer Safety",
    points: [
      "All vehicles are sanitized prior to every airport pickup and inter-city transfer, equipped with first-aid kits and emergency contact cards.",
      "Experienced, licensed regional drivers trained specifically for Himalayan mountain terrain (Kashmir, Gangtok, Manali) and coastal routes.",
      "Strict speed-limit adherence, scheduled driver rest intervals, and GPS tracking on long-haul sightseeing circuits.",
      "In island destinations (Andaman & Lakshadweep) and Sundarban river cruises, only government-certified vessels with life-saving equipment are used.",
    ],
  },
  {
    id: "stay-hygiene",
    title: "2. Accommodation & Dining Hygiene",
    points: [
      "Partner accommodations maintain strict housekeeping protocols, fresh laundered linens, and regular deep-cleaning of high-touch surfaces.",
      "Hygienic kitchen standards and sealed or filtered drinking water are prioritized across all included breakfast and dinner meal plans.",
      "Special dietary needs, allergies, and infant meal requests are communicated in advance to hotel chefs upon booking.",
    ],
  },
  {
    id: "destination-precautions",
    title: "3. Destination-Specific Health Precautions",
    points: [
      "High-Altitude Destinations (Kashmir, Gangtok, Manali): Gradual acclimatization pacing, warm-weather advisories, and access to portable oxygen where required.",
      "Island & Water Activities (Andaman, Lakshadweep, Goa): Certified safety divers, well-fitted life vests, and weather-checked sea excursion schedules.",
      "Eco & Wildlife Zones (Sundarban, Meghalaya, Kerala): Guided movement within permitted zones, insect-repellent advisories, and safe footwear recommendations.",
    ],
  },
  {
    id: "traveler-checklist",
    title: "4. Recommended Traveler Readiness",
    points: [
      "Carry your valid government-issued photo ID (Passport, Aadhaar, or Voter ID) and digital/printed copies of permits and vouchers.",
      "Pack personal prescription medications along with basic motion-sickness, fever, and first-aid essentials for remote excursions.",
      "Inform our travel coordinator ahead of departure about any pre-existing medical conditions, mobility needs, or food allergies.",
      "Follow local environmental, wildlife, and safety guidelines issued by tour guides and regional authorities at all times.",
    ],
  },
];

export default function HealthAndSafetyPage() {
  const lastUpdated = "November 12, 2026";

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      <Header />

      <main className="flex-1">
        {/* Page Banner Header */}
        <PageHeader
          title="Health & Safety Measure"
          subtitle="Travel with complete peace of mind. Learn about the verified hygiene, transport, stay, and emergency protocols we uphold on every KrikoTrip journey."
          bgImage="https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=2000&q=80"
          breadcrumb="Health & Safety Measure"
        />

        <div className="container py-10 sm:py-16 space-y-10">
          {/* ─── 4 Safety Pillars Summary Cards ─── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {safetyPillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.title}
                  className="bg-white rounded-xl p-6 border border-gray-200/80 shadow-2xs flex flex-col gap-3"
                >
                  <div className="w-11 h-11 rounded-lg bg-sky-50 text-[#1877F2] flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 stroke-[2]" />
                  </div>
                  <h2 className="text-base font-semibold text-gray-900 leading-snug">
                    {pillar.title}
                  </h2>
                  <p className="text-xs sm:text-[13px] text-gray-600 leading-relaxed font-normal">
                    {pillar.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* ─── Detailed Safety Protocols Document ─── */}
          <article className="bg-white rounded-xl p-6 sm:p-10 border border-gray-200/80 shadow-2xs space-y-9">
            <div className="pb-5 border-b border-gray-100 flex flex-wrap items-center justify-between gap-3 text-xs text-gray-500">
              <div className="inline-flex items-center gap-2 text-[#00285C] font-medium">
                <ShieldCheck className="w-4 h-4 text-[#1877F2]" />
                <span>KrikoTrip Verified Safe Travel Standards</span>
              </div>
              <span className="font-normal">Last Updated: {lastUpdated}</span>
            </div>

            {detailedMeasures.map((section) => (
              <section key={section.id} id={section.id} className="space-y-3">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900 tracking-tight">
                  {section.title}
                </h2>
                <ul className="space-y-2.5 text-xs sm:text-sm text-gray-600 leading-relaxed">
                  {section.points.map((point) => (
                    <li key={point} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#1877F2] shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </section>
            ))}

            {/* ─── 24/7 Emergency Assistance Box ─── */}
            <div className="rounded-xl bg-[#F8FAFC] border border-gray-200/80 p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
              <div className="space-y-1.5">
                <h3 className="text-base font-semibold text-gray-900">
                  24/7 Travel Safety &amp; Emergency Desk
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 font-normal">
                  Need immediate travel assistance or have specific health &amp; accessibility questions before booking?
                </p>
                <div className="flex flex-wrap items-center gap-4 pt-1 text-xs sm:text-sm font-medium text-gray-700">
                  <a
                    href="tel:+918250338715"
                    className="inline-flex items-center gap-1.5 text-[#1877F2] hover:underline"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>+91 8250338715</span>
                  </a>
                  <a
                    href="mailto:info@krikotrip.com"
                    className="inline-flex items-center gap-1.5 text-[#1877F2] hover:underline"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>info@krikotrip.com</span>
                  </a>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <Link
                  href="/contact-us"
                  className="px-5 py-2.5 rounded-lg bg-[#1877F2] hover:bg-[#00285C] text-white text-xs sm:text-sm font-medium transition-colors"
                >
                  Contact Support
                </Link>
                <Link
                  href="/tour-packages"
                  className="px-5 py-2.5 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 text-xs sm:text-sm font-medium transition-colors"
                >
                  Explore Packages
                </Link>
              </div>
            </div>
          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
}

