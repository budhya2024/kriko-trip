"use client";

import React from "react";
import { PhoneCall, Mail, MapPin, Clock } from "lucide-react";

const contactDetails = [
  {
    icon: PhoneCall,
    title: "Call Directly",
    primary: "+1 (800) 456-7890",
    secondary: "+1 (213) 555-0199",
    hrefPrimary: "tel:+18004567890",
    hrefSecondary: "tel:+12135550199",
    description: "Toll-free 24/7 dedicated travel support",
    badge: "24/7 Available",
  },
  {
    icon: Mail,
    title: "Email Us",
    primary: "support@krikotrip.com",
    secondary: "bookings@krikotrip.com",
    hrefPrimary: "mailto:support@krikotrip.com",
    hrefSecondary: "mailto:bookings@krikotrip.com",
    description: "Average response within 2 business hours",
    badge: "Fast Response",
  },
  {
    icon: MapPin,
    title: "Headquarters",
    primary: "Skyline Plaza, 5th Floor",
    secondary: "123 Main Street, Los Angeles, CA",
    hrefPrimary: "https://maps.google.com/?q=Los+Angeles+CA",
    hrefSecondary: "https://maps.google.com/?q=Los+Angeles+CA",
    description: "Visit us for personalized vacation planning",
    badge: "Open for Visits",
  },
  {
    icon: Clock,
    title: "Office Hours",
    primary: "Mon - Sat: 9:00 AM - 8:00 PM",
    secondary: "Sunday: 10:00 AM - 4:00 PM",
    hrefPrimary: null,
    hrefSecondary: null,
    description: "Emergency support is active around the clock",
    badge: "Standard PST",
  },
];

export default function ContactInfoCards() {
  return (
    <section className="w-full py-12 lg:py-16 bg-[#F8FAFC]">
      <div className="container">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <span className="inline-block text-[#1877F2] text-xs sm:text-sm font-bold uppercase tracking-wider bg-blue-50 px-3.5 py-1.5 rounded-lg border border-blue-100">
            Reach Out To Us
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-950 mt-3 tracking-tight">
            We Are Here To Help You Plan
          </h2>
          <p className="text-sm sm:text-base text-gray-600 mt-2.5 leading-relaxed">
            Have questions about a destination, package, or custom booking?
            Connect with our certified travel specialists today.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactDetails.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-xl border border-gray-200/90 p-6 flex flex-col justify-between hover:shadow-lg hover:border-blue-200 transition-all duration-300 group"
              >
                <div>
                  {/* Top: Icon + Badge */}
                  <div className="flex items-center justify-between gap-2 mb-5">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#1877F2] flex items-center justify-center group-hover:bg-[#1877F2] group-hover:text-white transition-colors duration-300 shadow-xs">
                      <Icon className="w-5 h-5 stroke-[2.2]" />
                    </div>
                    <span className="text-[11px] font-semibold text-gray-500 bg-gray-50 px-2.5 py-1 rounded-md border border-gray-150">
                      {item.badge}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-bold text-gray-950 mb-2.5">
                    {item.title}
                  </h3>

                  {/* Details */}
                  <div className="space-y-1 text-sm font-semibold text-gray-800">
                    {item.hrefPrimary ? (
                      <a
                        href={item.hrefPrimary}
                        className="block hover:text-[#1877F2] transition-colors truncate"
                      >
                        {item.primary}
                      </a>
                    ) : (
                      <p className="truncate">{item.primary}</p>
                    )}

                    {item.hrefSecondary ? (
                      <a
                        href={item.hrefSecondary}
                        className="block text-gray-600 hover:text-[#1877F2] transition-colors truncate text-[13px] font-medium"
                      >
                        {item.secondary}
                      </a>
                    ) : (
                      <p className="text-gray-500 text-[13px] font-medium truncate">
                        {item.secondary}
                      </p>
                    )}
                  </div>
                </div>

                {/* Subtitle / Description */}
                <p className="text-xs text-gray-500 mt-5 pt-3.5 border-t border-gray-100 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
