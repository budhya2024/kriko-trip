"use client";

import React, { useState } from "react";
import {
  User,
  Mail,
  Phone,
  FileText,
  MessageSquare,
  CheckCircle2,
  MapPin,
  ExternalLink,
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
    <section className="w-full pt-8 lg:pt-14 pb-12 bg-white">
      <div className="container">
        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
          {/* Card 1: Office Address */}
          <div className="p-6 rounded-2xl border border-gray-200 bg-gray-50/60 hover:bg-white hover:border-[#1877F2]/40 transition-all flex items-start gap-4 shadow-2xs">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#1877F2] flex items-center justify-center shrink-0">
              <MapPin className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                Office Address
              </h4>
              <p className="text-sm font-bold text-gray-900 leading-snug">
                BL-A Shop-GLP/5 676 Green Land Park
              </p>
              <p className="text-xs text-gray-600 mt-0.5 font-medium">
                Sonarpur, Kolkata - 700103
              </p>
            </div>
          </div>

          {/* Card 2: Phone & WhatsApp */}
          <div className="p-6 rounded-2xl border border-gray-200 bg-gray-50/60 hover:bg-white hover:border-[#1877F2]/40 transition-all flex items-start gap-4 shadow-2xs">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#1877F2] flex items-center justify-center shrink-0">
              <Phone className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                Call & WhatsApp
              </h4>
              <a
                href="tel:+918250338715"
                className="text-base font-bold text-gray-900 hover:text-[#1877F2] transition-colors block"
              >
                +91 8250338715
              </a>
              <p className="text-xs text-gray-500 mt-0.5 font-medium">
                Mon - Sun: 9:00 AM - 9:00 PM IST
              </p>
            </div>
          </div>

          {/* Card 3: Email Support */}
          <div className="p-6 rounded-2xl border border-gray-200 bg-gray-50/60 hover:bg-white hover:border-[#1877F2]/40 transition-all flex items-start gap-4 shadow-2xs">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#1877F2] flex items-center justify-center shrink-0">
              <Mail className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                Email Support
              </h4>
              <a
                href="mailto:info@krikotrips.com"
                className="text-base font-bold text-gray-900 hover:text-[#1877F2] transition-colors block"
              >
                info@krikotrips.com
              </a>
              <p className="text-xs text-gray-500 mt-0.5 font-medium">
                Online support & fast response
              </p>
            </div>
          </div>
        </div>

        {/* Equal Height Grid for Form and Map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* ─── Left Column: Contact Form ─── */}
          <div className="lg:col-span-7 bg-white rounded-md border border-gray-200/90 shadow-xs p-6 sm:p-7 flex flex-col justify-between h-full">
            <div>
              <div className="mb-6">
                <h3 className="text-xl sm:text-2xl font-semibold text-[#00285C] tracking-tight">
                  Send Us a Message
                </h3>
              </div>

              {isSubmitted ? (
                <div className="p-8 rounded-md bg-blue-50/70 border border-blue-200 text-center animate-in fade-in">
                  <div className="w-12 h-12 rounded-full bg-[#00285C] text-white flex items-center justify-center mx-auto mb-3.5">
                    <CheckCircle2 className="w-6 h-6 text-[#03ADFF]" />
                  </div>
                  <h4 className="text-base font-semibold text-[#00285C]">
                    Message Sent Successfully!
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-600 mt-1.5 max-w-md mx-auto">
                    Thank you for reaching out to KrikoTrip. Our travel advisor will
                    contact you via phone ({countryCode}) or email shortly.
                  </p>
                  <button
                    type="button"
                    onClick={() => setIsSubmitted(false)}
                    className="mt-4 inline-flex items-center justify-center px-6 py-3 rounded-full bg-[#00285C] hover:bg-[#1877F2] text-white text-xs font-semibold transition-colors cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Full Name */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-800 uppercase tracking-wider mb-1.5">
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
                          className="w-full pl-10 pr-3.5 py-3 rounded-md border border-gray-200 bg-gray-50/50 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:outline-none focus:border-[#03ADFF] focus:bg-white transition-colors font-medium"
                        />
                      </div>
                    </div>

                    {/* Email Address */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-800 uppercase tracking-wider mb-1.5">
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
                          className="w-full pl-10 pr-3.5 py-3 rounded-md border border-gray-200 bg-gray-50/50 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:outline-none focus:border-[#03ADFF] focus:bg-white transition-colors font-medium"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Phone Number with Country Code Dropdown */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-800 uppercase tracking-wider mb-1.5">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <div className="flex items-center rounded-md border border-gray-200 bg-gray-50/50 focus-within:border-[#03ADFF] focus-within:bg-white transition-colors overflow-hidden">
                        {/* Country Dropdown */}
                        <select
                          value={countryCode}
                          onChange={(e) => setCountryCode(e.target.value)}
                          className="h-full py-3 pl-2.5 pr-1 bg-transparent text-xs sm:text-sm font-semibold text-gray-800 border-r border-gray-200 outline-none focus:outline-none cursor-pointer shrink-0"
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
                          className="w-full px-3 py-3 bg-transparent text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:outline-none font-medium border-0"
                        />
                      </div>
                    </div>

                    {/* Subject Input Field */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-800 uppercase tracking-wider mb-1.5">
                        Subject <span className="text-red-500">*</span>
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
                          placeholder="e.g. Tour Package Inquiry"
                          className="w-full pl-10 pr-3.5 py-3 rounded-md border border-gray-200 bg-gray-50/50 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:outline-none focus:border-[#03ADFF] focus:bg-white transition-colors font-medium"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Message Textarea */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-800 uppercase tracking-wider mb-1.5">
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
                        placeholder="Tell us about your desired destinations, travel dates, budget, or specific inquiries..."
                        className="w-full pl-10 pr-3.5 py-3 rounded-md border border-gray-200 bg-gray-50/50 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:outline-none focus:border-[#03ADFF] focus:bg-white transition-colors font-medium resize-none"
                      />
                    </div>
                  </div>

                  {/* Checkbox Above Submit Button */}
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
                      I agree to the terms & privacy policy and consent to be contacted regarding this inquiry.
                    </label>
                  </div>

                  {/* Center-Aligned Submit Button without Icon */}
                  <div className="pt-3 flex justify-center">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto inline-flex items-center justify-center px-10 py-3 rounded-full bg-[#00285C] hover:bg-[#1877F2] active:scale-98 text-white text-sm font-semibold transition-all shadow-xs cursor-pointer disabled:opacity-70"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Sending...</span>
                        </span>
                      ) : (
                        <span>Send Message</span>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* ─── Right Column: Interactive Google Map (Same Height as Form) ─── */}
          <div className="lg:col-span-5 bg-white rounded-md border border-gray-200/90 shadow-xs overflow-hidden flex flex-col h-full">
            {/* Map Header */}
            <div className="px-4 py-3 border-b border-gray-150 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#03ADFF]" />
                <span className="text-sm font-semibold text-[#00285C]">
                  KrikoTrip Office Location
                </span>
              </div>
              <a
                href="https://maps.google.com/?q=Sonarpur+Kolkata+700103"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-[#1877F2] hover:underline inline-flex items-center gap-1"
              >
                <span>Open Map</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Responsive Google Maps Embed Iframe (Expands to match exact form height) */}
            <div className="w-full flex-1 min-h-[380px] sm:min-h-[420px] bg-gray-100 flex flex-col">
              <iframe
                title="KrikoTrip Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14748.241355447664!2d88.4239!3d22.4419!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a02720d440939fb%3A0xb35a396e6255776a!2sSonarpur%2C%20Kolkata%2C%20West%20Bengal%20700103!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "380px" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full flex-1 min-h-[380px] sm:min-h-[420px] block filter grayscale-[10%] contrast-[105%]"
              />
            </div>

            {/* Map Footer Bar */}
            <div className="p-3.5 bg-gray-50/60 text-xs text-gray-600 flex items-center justify-between border-t border-gray-100 shrink-0">
              <span className="truncate">
                BL-A Shop-GLP/5 676 Green Land Park, Sonarpur
              </span>
              <span className="font-semibold text-gray-800 shrink-0 ml-2">
                Kolkata 700103
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
