import React from "react";
import { Header, Footer, PageHeader } from "@/components/shared";
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
        {/* Left-Aligned Subpage Hero & Breadcrumbs with Background Image */}
        <PageHeader
          title="Contact Us"
          subtitle="Get in touch with our certified destination planners for bookings, customized itineraries, and 24/7 travel assistance."
          bgImage="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=2000&q=80"
        />

        {/* Form & Google Map Section */}
        <ContactFormSection />
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
