import React from "react";
import Link from "next/link";
import { Header, Footer } from "@/components/shared";
import { ContactFormSection } from "@/components/contact-us";

export const metadata = {
  title: "Contact Us | KrikoTrip Travel Agency",
  description:
    "Get in touch with KrikoTrip Travel Agency. Contact our travel experts, find our office location on the map, or send a trip inquiry.",
};

export default function ContactUsPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      {/* Global Header */}
      <Header />

      {/* Main Page Content */}
      <main className="flex-1">
        {/* Subpage Hero & Breadcrumbs */}
        <section className="w-full bg-[#08182B] text-white py-12 sm:py-14 text-center relative overflow-hidden">
          {/* Concentric Decorative Rings */}
          <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full border border-white/10 pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-60 h-60 rounded-full border border-white/5 pointer-events-none" />

          <div className="container relative z-10">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
              Contact Us
            </h1>
            <div className="flex items-center justify-center gap-2 mt-3 text-sm text-gray-300 font-medium">
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <span>/</span>
              <span className="text-[#1877F2]">Contact Us</span>
            </div>
          </div>
        </section>

        {/* Form & Google Map Section */}
        <ContactFormSection />
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
