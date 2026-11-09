"use client";

import React, { useState } from "react";
import {
  User,
  Mail,
  FileText,
  MessageSquare,
  CheckCircle2,
  MapPin,
  ExternalLink,
  PhoneCall,
  Clock,
  Send,
  Navigation,
  Sparkles,
} from "lucide-react";

const countryOptions = [
  { code: "+91", flag: "🇮🇳", label: "India (+91)" },
  { code: "+1", flag: "🇺🇸", label: "USA / Canada (+1)" },
  { code: "+44", flag: "🇬🇧", label: "UK (+44)" },
  { code: "+971", flag: "🇦🇪", label: "UAE (+971)" },
  { code: "+61", flag: "🇦🇺", label: "Australia (+61)" },
  { code: "+65", flag: "🇸🇬", label: "Singapore (+65)" },
  { code: "+60", flag: "🇲🇾", label: "Malaysia (+60)" },
  { code: "+66", flag: "🇹🇭", label: "Thailand (+66)" },
  { code: "+49", flag: "🇩🇪", label: "Germany (+49)" },
  { code: "+33", flag: "🇫🇷", label: "France (+33)" },
  { code: "+81", flag: "🇯🇵", label: "Japan (+81)" },
];

const contactCards = [
  {
    icon: PhoneCall,
    title: "Call Us Directly",
    primary: "+1 (800) 456-7890",
    secondary: "+91 98765 43210",
    badge: "24/7 Priority Support",
    action: "tel:+18004567890",
  },
  {
    icon: Mail,
    title: "Email Inquiries",
    primary: "contact@krikotrip.com",
    secondary: "bookings@krikotrip.com",
    badge: "Replies within 2 hours",
    action: "mailto:contact@krikotrip.com",
  },
  {
    icon: MapPin,
    title: "Headquarters",
    primary: "Skyline Plaza, 5th Floor",
    secondary: "123 Main Street, Los Angeles, CA",
    badge: "Open for Client Visits",
    action: "https://maps.google.com/?q=Los+Angeles+CA",
  },
  {
    icon: Clock,
    title: "Office Hours",
    primary: "Mon – Sat: 9:00 AM – 8:00 PM",
    secondary: "Sunday: 10:00 AM – 4:00 PM",
    badge: "Pacific Standard Time",
    action: null,
  },
];

export default function ContactFormSection() {
  const [countryCode, setCountryCode] = useState("+91");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [agreed, setAgreed] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate quick submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
      setAgreed(false);
    }, 800);
  };

  return (
    <section className="w-full py-12 sm:py-16 lg:py-20 bg-[#F8FAFC]">
      <div className="container">
        {/* ─── Top Contact Information Cards ─── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12 sm:mb-16">
          {contactCards.map((card, idx) => {
            const Icon = card.icon;
            const content = (
              <div className="bg-white rounded-2xl border border-gray-200/90 p-5 sm:p-6 flex flex-col justify-between h-full transition-colors duration-200 hover:border-blue-200 shadow-2xs">
                <div>
                  <div className="w-11 h-11 rounded-xl bg-blue-50/90 text-[#00285C] flex items-center justify-center mb-4 border border-blue-100/70">
                    <Icon className="w-5 h-5 text-[#03ADFF]" />
                  </div>
                  <h4 className="text-sm font-bold text-[#00285C] uppercase tracking-wider mb-2">
                    {card.title}
                  </h4>
                  <p className="text-sm sm:text-[15px] font-semibold text-gray-900 leading-snug">
                    {card.primary}
                  </p>
                  <p className="text-xs text-gray-500 mt-1 leading-normal">
                    {card.secondary}
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-[11px] font-medium text-[#1877F2] bg-blue-50/80 px-2.5 py-1 rounded-md border border-blue-100/60">
                    {card.badge}
                  </span>
                  {card.action && (
                    <span className="text-xs font-semibold text-gray-400 group-hover:text-[#1877F2] transition-colors">
                      &rarr;
                    </span>
                  )}
                </div>
              </div>
            );

            return card.action ? (
              <a
                key={idx}
                href={card.action}
                target={card.action.startsWith("http") ? "_blank" : undefined}
                rel={card.action.startsWith("http") ? "noopener noreferrer" : undefined}
                className="group block"
              >
                {content}
              </a>
            ) : (
              <div key={idx} className="group block">
                {content}
              </div>
            );
          })}
        </div>

        {/* ─── Section Header ─── */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-50 text-[#00285C] text-xs font-semibold border border-blue-200/60 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#03ADFF]" />
            <span>Connect With Our Travel Experts</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#00285C] tracking-tight">
            Send Us a Message
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 mt-2.5 font-normal leading-relaxed">
            Planning your next family holiday, luxury honeymoon, or wildlife safari?
            Send us your inquiry and our certified destination planners will respond within 2 hours.
          </p>
        </div>

        {/* ─── Symmetrical Form and Map Grid (Exact Equal Height) ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* ─── Left Column: Contact Form (Full Height) ─── */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-gray-200/90 shadow-sm p-6 sm:p-8 flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-gray-100">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#00285C]">
                    Trip Inquiry & Message Form
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Fields marked with <span className="text-red-500">*</span> are required
                  </p>
                </div>
                <div className="hidden sm:flex items-center gap-1.5 text-xs font-medium text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200/70">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Advisors Online</span>
                </div>
              </div>

              {isSubmitted ? (
                <div className="py-12 px-6 rounded-xl bg-blue-50/60 border border-blue-100 text-center animate-in fade-in flex flex-col items-center justify-center h-full">
                  <div className="w-14 h-14 rounded-full bg-[#00285C] text-white flex items-center justify-center mb-4 shadow-sm">
                    <CheckCircle2 className="w-7 h-7 text-[#03ADFF]" />
                  </div>
                  <h4 className="text-lg font-bold text-[#00285C]">
                    Inquiry Received Successfully!
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-600 mt-2 max-w-md mx-auto leading-relaxed">
                    Thank you for contacting KrikoTrip. Our travel planner has received your request and will reach out to you directly via phone ({countryCode}) or email within 2 hours.
                  </p>
                  <button
                    type="button"
                    onClick={() => setIsSubmitted(false)}
                    className="mt-6 inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-[#00285C] hover:bg-[#1877F2] text-white text-xs font-semibold transition-colors cursor-pointer"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Full Name */}
                    <div>
                      <label className="block text-xs font-bold text-[#00285C] uppercase tracking-wider mb-1.5">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                          <User className="w-4 h-4" />
                        </div>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          placeholder="e.g. John Doe"
                          className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50/40 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:outline-none focus:border-[#03ADFF] focus:bg-white transition-colors font-medium"
                        />
                      </div>
                    </div>

                    {/* Email Address */}
                    <div>
                      <label className="block text-xs font-bold text-[#00285C] uppercase tracking-wider mb-1.5">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                          <Mail className="w-4 h-4" />
                        </div>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          placeholder="e.g. john@example.com"
                          className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50/40 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:outline-none focus:border-[#03ADFF] focus:bg-white transition-colors font-medium"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Phone Number with Country Code Dropdown */}
                    <div>
                      <label className="block text-xs font-bold text-[#00285C] uppercase tracking-wider mb-1.5">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <div className="flex items-center rounded-xl border border-gray-200 bg-gray-50/40 focus-within:border-[#03ADFF] focus-within:bg-white transition-colors overflow-hidden">
                        {/* Country Dropdown */}
                        <select
                          value={countryCode}
                          onChange={(e) => setCountryCode(e.target.value)}
                          className="h-full py-2.5 pl-2.5 pr-1 bg-transparent text-xs sm:text-sm font-semibold text-gray-800 border-r border-gray-200 outline-none focus:outline-none cursor-pointer shrink-0"
                        >
                          {countryOptions.map((c) => (
                            <option key={c.code} value={c.code}>
                              {c.flag} {c.code}
                            </option>
                          ))}
                        </select>

                        {/* Phone Input */}
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                          }
                          placeholder="98765 43210"
                          className="w-full px-3 py-2.5 bg-transparent text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:outline-none font-medium border-0"
                        />
                      </div>
                    </div>

                    {/* Subject Field */}
                    <div>
                      <label className="block text-xs font-bold text-[#00285C] uppercase tracking-wider mb-1.5">
                        Subject / Trip Type <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                          <FileText className="w-4 h-4" />
                        </div>
                        <input
                          type="text"
                          required
                          value={formData.subject}
                          onChange={(e) =>
                            setFormData({ ...formData, subject: e.target.value })
                          }
                          placeholder="e.g. Sundarban Tour Package Inquiry"
                          className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50/40 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:outline-none focus:border-[#03ADFF] focus:bg-white transition-colors font-medium"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Message Textarea */}
                  <div>
                    <label className="block text-xs font-bold text-[#00285C] uppercase tracking-wider mb-1.5">
                      Your Requirements / Message <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute top-3 left-3.5 pointer-events-none text-gray-400">
                        <MessageSquare className="w-4 h-4" />
                      </div>
                      <textarea
                        required
                        rows={4}
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        placeholder="Please share details such as destination, planned travel dates, number of travelers, budget, or specific inquiries..."
                        className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50/40 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:outline-none focus:border-[#03ADFF] focus:bg-white transition-colors font-medium resize-none leading-relaxed"
                      />
                    </div>
                  </div>

                  {/* Consent Checkbox */}
                  <div className="pt-1 flex items-start sm:items-center justify-start gap-2.5">
                    <input
                      type="checkbox"
                      id="consentCheckbox"
                      required
                      checked={agreed}
                      onChange={(e) => setAgreed(e.target.checked)}
                      className="w-4 h-4 mt-0.5 sm:mt-0 rounded border-gray-300 text-[#00285C] accent-[#00285C] focus:ring-0 outline-none cursor-pointer shrink-0"
                    />
                    <label
                      htmlFor="consentCheckbox"
                      className="text-xs text-gray-600 select-none cursor-pointer leading-tight"
                    >
                      I agree to the terms & privacy policy and consent to receive travel consultation regarding this inquiry.
                    </label>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2 flex justify-start">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full bg-[#00285C] hover:bg-[#1877F2] active:scale-98 text-white text-sm font-bold transition-all shadow-sm cursor-pointer disabled:opacity-70"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Sending Inquiry...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 text-[#03ADFF]" />
                          <span>Send Message</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Bottom Form Assurance Badge */}
            <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#03ADFF]" />
                <span>100% Privacy Protected & No Spam</span>
              </span>
              <span className="font-medium text-[#00285C]">Avg. Response: 2 Hrs</span>
            </div>
          </div>

          {/* ─── Right Column: Google Map (Exact Matching Height) ─── */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-gray-200/90 shadow-sm overflow-hidden flex flex-col h-full">
            {/* Map Header */}
            <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between bg-white shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#00285C] flex items-center justify-center shrink-0 border border-blue-100/60">
                  <MapPin className="w-4 h-4 text-[#03ADFF]" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#00285C] leading-none">
                    Office Location
                  </h4>
                  <p className="text-xs text-gray-500 mt-1">KrikoTrip Travel Agency</p>
                </div>
              </div>
              <a
                href="https://maps.google.com/?q=Los+Angeles+CA"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-[#1877F2] hover:text-[#00285C] inline-flex items-center gap-1 transition-colors"
              >
                <span>Directions</span>
                <Navigation className="w-3 h-3 text-[#03ADFF]" />
              </a>
            </div>

            {/* Map Body: flex-1 ensures it expands to match the exact height of the form */}
            <div className="relative w-full flex-1 min-h-[360px] sm:min-h-[420px] lg:min-h-0 bg-gray-100">
              <iframe
                title="KrikoTrip Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d105799.39077221008!2d-118.34300305!3d34.02047895!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2c75ddc27da13%3A0xe22fdf6f254608f4!2sLos%20Angeles%2C%20CA%2C%20USA!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full absolute inset-0"
              />
            </div>

            {/* Map Footer Bar */}
            <div className="p-4 sm:p-5 bg-gradient-to-r from-blue-50/50 via-slate-50 to-white text-xs text-gray-700 border-t border-gray-100 shrink-0">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#03ADFF] shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <p className="font-bold text-[#00285C]">
                    Skyline Plaza Headquarters
                  </p>
                  <p className="text-gray-600">
                    Skyline Plaza, 5th Floor, 123 Main Street, Los Angeles, CA 90001
                  </p>
                  <p className="text-[11px] text-gray-500 pt-0.5">
                    Client parking & private consultation suites available
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
