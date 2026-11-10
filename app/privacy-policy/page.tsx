import React from "react";
import Link from "next/link";
import { Header, Footer, PageHeader } from "@/components/shared";
import {
  ShieldCheck,
  Lock,
  Eye,
  FileText,
  UserCheck,
  BellRing,
  HelpCircle,
  Mail,
  Phone,
  MapPin,
  Clock,
} from "lucide-react";

export const metadata = {
  title: "Privacy Policy | KrikoTrip Travel Agency",
  description:
    "Learn how KrikoTrip collects, protects, uses, and safeguards your personal data when booking tour packages and browsing our travel platform.",
};

export default function PrivacyPolicyPage() {
  const lastUpdated = "November 10, 2026";

  const sections = [
    {
      id: "introduction",
      title: "1. Introduction & Overview",
      icon: ShieldCheck,
      content: (
        <>
          <p>
            Welcome to <strong>KrikoTrip Travel Agency</strong> (&quot;KrikoTrip&quot;, &quot;we&quot;, &quot;our&quot;, or &quot;us&quot;). We are dedicated to delivering unforgettable, reliable, and authentic travel experiences across India and international destinations.
          </p>
          <p className="mt-3">
            We value your trust above all else. This Privacy Policy details how we collect, process, store, and safeguard your personal information when you visit our website (
            <Link href="/" className="text-[#1877F2] hover:underline font-medium">
              krikotrip.com
            </Link>
            ), request a customized quotation, book a holiday package, or communicate with our travel consultants.
          </p>
          <p className="mt-3">
            By accessing our platform or booking our services, you acknowledge that you have read and agreed to the practices outlined in this policy.
          </p>
        </>
      ),
    },
    {
      id: "information-collected",
      title: "2. Information We Collect",
      icon: Eye,
      content: (
        <>
          <p>
            To successfully arrange your flights, hotels, permits, vehicle transfers, and guided itineraries, we may collect the following categories of information:
          </p>
          <ul className="list-disc pl-5 mt-3 space-y-2 text-gray-700">
            <li>
              <strong>Personal Contact Data:</strong> Full name, gender, date of birth, postal address, email address, mobile number, and emergency contact details.
            </li>
            <li>
              <strong>Government-Issued Identification:</strong> Aadhaar number, Passport details, Voter ID, or Driving License copies where mandated for flight ticketing, hotel check-ins, or restricted forest/island permits (e.g., Sundarban, Andaman, Ladakh, Sikkim).
            </li>
            <li>
              <strong>Travel &amp; Itinerary Preferences:</strong> Number of travelers, children&apos;s ages, room preferences, dietary requirements, arrival/departure dates, and special medical or accessibility requirements.
            </li>
            <li>
              <strong>Transaction &amp; Billing Records:</strong> Transaction reference IDs, invoice receipts, and preferred payment modes. <em>(Note: We do not store full credit/debit card numbers or CVVs on our servers; payments are processed securely through RBI-compliant payment gateways.)</em>
            </li>
            <li>
              <strong>Technical &amp; Usage Information:</strong> IP address, device type, browser specifications, operating system, pages visited, and referring URLs collected through analytical cookies.
            </li>
          </ul>
        </>
      ),
    },
    {
      id: "how-we-use",
      title: "3. How We Use Your Information",
      icon: FileText,
      content: (
        <>
          <p>We use your personal data strictly for legitimate travel-related purposes, including:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mt-4">
            <div className="p-3.5 rounded-lg border border-gray-100 bg-gray-50/70">
              <h4 className="text-sm font-bold text-gray-900 mb-1">Reservation Fulfilment</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Confirming resort rooms, flights, cab transfers, houseboat safaris, and ferry tickets in your name.
              </p>
            </div>
            <div className="p-3.5 rounded-lg border border-gray-100 bg-gray-50/70">
              <h4 className="text-sm font-bold text-gray-900 mb-1">Permits &amp; Authorizations</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Procuring entry permits from local tourism boards and forest departments where applicable.
              </p>
            </div>
            <div className="p-3.5 rounded-lg border border-gray-100 bg-gray-50/70">
              <h4 className="text-sm font-bold text-gray-900 mb-1">24/7 On-Trip Assistance</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Providing flight alerts, weather updates, vehicle tracking, and resolving unforeseen travel queries.
              </p>
            </div>
            <div className="p-3.5 rounded-lg border border-gray-100 bg-gray-50/70">
              <h4 className="text-sm font-bold text-gray-900 mb-1">Regulatory Compliance</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Fulfilling GST billing requirements, financial audits, and Indian tourist verification guidelines.
              </p>
            </div>
          </div>
        </>
      ),
    },
    {
      id: "sharing",
      title: "4. Sharing with Trusted Travel Partners",
      icon: UserCheck,
      content: (
        <>
          <p>
            <strong>We do not sell, rent, or trade your personal information to third-party marketing companies.</strong>
          </p>
          <p className="mt-2.5">
            We only disclose essential traveler details to verified service partners strictly on a need-to-know basis to fulfill your trip:
          </p>
          <ul className="list-disc pl-5 mt-3 space-y-2 text-gray-700">
            <li>
              <strong>Hotels, Resorts &amp; Houseboats:</strong> Guest names, contact details, and ID proof to guarantee room reservations and check-in.
            </li>
            <li>
              <strong>Airlines &amp; Transport Providers:</strong> Passenger manifests, dates of travel, and driver assignments for punctual pickup.
            </li>
            <li>
              <strong>Government &amp; Forest Authorities:</strong> Identity proofs required for Sundarban National Park permits, Neil/Havelock ferry clearances, or border area inner-line permits.
            </li>
            <li>
              <strong>Payment Gateways:</strong> Secure communication with encrypted banking partners to process online payments safely.
            </li>
          </ul>
        </>
      ),
    },
    {
      id: "security",
      title: "5. Data Security & Encryption",
      icon: Lock,
      content: (
        <>
          <p>
            We deploy multi-layered security measures to protect your personal records from unauthorized access, accidental loss, disclosure, or alteration:
          </p>
          <ul className="list-disc pl-5 mt-3 space-y-2 text-gray-700">
            <li>256-bit SSL (Secure Socket Layer) encryption across the entire website.</li>
            <li>Restricted internal access: only authorized tour coordinators assigned to your package can view your itinerary details.</li>
            <li>Regular server security audits and vulnerability assessments.</li>
            <li>Immediate anonymization or deletion of identity documents once all post-trip formalities are finalized.</li>
          </ul>
        </>
      ),
    },
    {
      id: "cookies",
      title: "6. Cookies & Analytical Tracking",
      icon: BellRing,
      content: (
        <>
          <p>
            Our website uses standard browser cookies and local storage tokens to enhance user experience, remember destination preferences, and maintain secure session states.
          </p>
          <p className="mt-2.5">
            You may adjust your browser settings to decline cookies at any time; however, certain interactive features of our tour booking calendar and price estimators may experience reduced functionality.
          </p>
        </>
      ),
    },
    {
      id: "your-rights",
      title: "7. Your Rights & Control",
      icon: HelpCircle,
      content: (
        <>
          <p>Under applicable Indian data protection principles, you possess the right to:</p>
          <ul className="list-disc pl-5 mt-3 space-y-2 text-gray-700">
            <li>Request a copy of the personal information stored in your booking dossier.</li>
            <li>Ask us to correct or update any inaccuracies in your contact details.</li>
            <li>Request the deletion of non-essential records (subject to mandatory tax or accounting retention laws).</li>
            <li>Opt out of marketing emails or festive discount WhatsApp alerts at any time by replying &quot;UNSUBSCRIBE&quot;.</li>
          </ul>
        </>
      ),
    },
    {
      id: "contact",
      title: "8. Grievance Officer & Contact Us",
      icon: Mail,
      content: (
        <>
          <p>
            If you have questions, feedback, or grievance requests concerning this Privacy Policy, please reach out directly to our dedicated Data Grievance Desk:
          </p>
          <div className="mt-4 p-4 rounded-xl border border-blue-100 bg-[#f8fafd] space-y-2 text-sm text-gray-800">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-900 w-28">Entity:</span>
              <span>KrikoTrip Travel Agency</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-900 w-28">Address:</span>
              <span>BL-A Shop-GLP/5 676 Green Land Park, Sonarpur, Kolkata - 700103, West Bengal, India</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-900 w-28">Phone:</span>
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
          title="Privacy Policy"
          subtitle="Your privacy is essential to us. Learn how we collect, protect, and handle your travel booking information."
          bgImage="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=2000&q=80"
          breadcrumb="Privacy Policy"
        />

        {/* Content Section */}
        <div className="container py-10 sm:py-16">
          <article className="max-w-4xl mx-auto bg-white rounded-2xl p-6 sm:p-10 border border-gray-200/80 shadow-2xs space-y-10">
              {/* Header Meta */}
              <div className="pb-6 border-b border-gray-100 flex flex-wrap items-center justify-between gap-3 text-xs text-gray-500">
                <span className="flex items-center gap-1.5 font-medium">
                  <Clock className="w-4 h-4 text-[#1877F2]" />
                  Last Updated: {lastUpdated}
                </span>
                <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200">
                  Active &amp; Compliant
                </span>
              </div>

              {/* Document Sections */}
              {sections.map((section) => {
                const IconComponent = section.icon;
                return (
                  <section
                    key={section.id}
                    id={section.id}
                    className="scroll-mt-28 space-y-3 pt-2 first:pt-0"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-[#1877F2] shrink-0">
                        <IconComponent className="w-4 h-4 stroke-[2.2]" />
                      </div>
                      <h2 className="text-lg sm:text-xl font-bold text-gray-900 tracking-tight">
                        {section.title}
                      </h2>
                    </div>

                    <div className="text-xs sm:text-sm text-gray-600 leading-relaxed pl-0 sm:pl-10">
                      {section.content}
                    </div>
                  </section>
                );
              })}

              {/* Related Document Links */}
              <div className="pt-8 mt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
                <span className="text-gray-500">
                  Looking for terms of booking and cancellation rules?
                </span>
                <Link
                  href="/terms-of-service"
                  className="font-semibold text-[#1877F2] hover:underline flex items-center gap-1"
                >
                  View Terms of Service &rarr;
                </Link>
              </div>
            </article>
        </div>
      </main>

      <Footer />
    </div>
  );
}

