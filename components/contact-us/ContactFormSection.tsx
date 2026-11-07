"use client";

import React, { useState } from "react";
import {
  CheckCircle2,
  MapPin,
  ExternalLink,
  MessageCircle,
  Phone,
  ChevronDown,
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

const destinations = [
  "Maldives",
  "Bali, Indonesia",
  "Andaman",
  "Switzerland",
  "Dubai, UAE",
  "Thailand",
  "Costa Rica",
  "Kashmir",
  "Other Destination",
];

export default function ContactFormSection() {
  const [countryCode, setCountryCode] = useState("+91");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    destination: "Maldives",
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
        destination: "Maldives",
        message: "",
      });
      setAgreed(false);
    }, 800);
  };

  return (
    <section className="w-full py-12 lg:py-16 bg-white">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* ─── Left Column: Contact Form (Matching Reference Text Style) ─── */}
          <div className="lg:col-span-7 bg-[#F4F6FD] rounded-xl p-6 sm:p-9 shadow-xs border border-[#E9EDF8]">
            {/* Header: Get in Touch! */}
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#111827] tracking-tight">
                Get in Touch!
              </h2>
              <p className="text-xs sm:text-sm text-[#4B5563] mt-2.5 max-w-md mx-auto leading-relaxed">
                We&apos;re excited to hear from you! Whether you have a question
                about our services, want to discuss a new project.
              </p>
            </div>

            {isSubmitted ? (
              <div className="p-8 rounded-xl bg-white border border-green-200 text-center animate-in fade-in shadow-xs">
                <div className="w-12 h-12 rounded-full bg-green-500 text-white flex items-center justify-center mx-auto mb-3.5">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-gray-950">
                  Message Sent Successfully!
                </h4>
                <p className="text-xs sm:text-sm text-gray-600 mt-1.5 max-w-md mx-auto">
                  Thank you for reaching out to KrikoTrip. Our travel advisor will
                  contact you via phone ({countryCode}) or email shortly.
                </p>
                <button
                  type="button"
                  onClick={() => setIsSubmitted(false)}
                  className="mt-4 inline-flex items-center justify-center px-6 py-2.5 rounded-lg bg-[#1877F2] hover:bg-blue-600 text-white text-xs font-semibold transition-colors cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  {/* Full Name */}
                  <div>
                    <label className="block text-sm font-semibold text-[#111827] mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="Wasington Mongla"
                      className="w-full px-4 py-3 rounded-lg bg-white border border-transparent shadow-xs text-sm text-gray-900 placeholder:text-[#9CA3AF] outline-none focus:outline-none focus:ring-1 focus:ring-[#1877F2]/40 transition-all font-medium"
                    />
                  </div>

                  {/* Email Address */}
                  <div>
                    <label className="block text-sm font-semibold text-[#111827] mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="info@example.com"
                      className="w-full px-4 py-3 rounded-lg bg-white border border-transparent shadow-xs text-sm text-gray-900 placeholder:text-[#9CA3AF] outline-none focus:outline-none focus:ring-1 focus:ring-[#1877F2]/40 transition-all font-medium"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  {/* Phone Number with Country Code Dropdown */}
                  <div>
                    <label className="block text-sm font-semibold text-[#111827] mb-2">
                      Phone Number
                    </label>
                    <div className="flex items-center rounded-lg bg-white border border-transparent shadow-xs overflow-hidden focus-within:ring-1 focus-within:ring-[#1877F2]/40 transition-all">
                      {/* Country Code Select */}
                      <select
                        value={countryCode}
                        onChange={(e) => setCountryCode(e.target.value)}
                        className="h-full py-3 pl-3 pr-1 bg-transparent text-xs sm:text-sm font-semibold text-gray-700 outline-none focus:outline-none cursor-pointer shrink-0 border-r border-gray-150"
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
                        placeholder="+92 567 *** ***"
                        className="w-full px-3.5 py-3 bg-transparent text-sm text-gray-900 placeholder:text-[#9CA3AF] outline-none focus:outline-none font-medium border-0"
                      />
                    </div>
                  </div>

                  {/* Where are you going? Dropdown Select */}
                  <div>
                    <label className="block text-sm font-semibold text-[#111827] mb-2">
                      Where are you going?
                    </label>
                    <div className="relative">
                      <select
                        value={formData.destination}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            destination: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 pr-10 rounded-lg bg-white border border-transparent shadow-xs text-sm text-gray-700 outline-none focus:outline-none focus:ring-1 focus:ring-[#1877F2]/40 transition-all font-medium appearance-none cursor-pointer"
                      >
                        {destinations.map((dest) => (
                          <option key={dest} value={dest}>
                            {dest}
                          </option>
                        ))}
                      </select>
                      <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-gray-400">
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Brief/Message */}
                <div>
                  <label className="block text-sm font-semibold text-[#111827] mb-2">
                    Brief/Message
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    placeholder="Write somethings about inquiry"
                    className="w-full px-4 py-3 rounded-lg bg-white border border-transparent shadow-xs text-sm text-gray-900 placeholder:text-[#9CA3AF] outline-none focus:outline-none focus:ring-1 focus:ring-[#1877F2]/40 transition-all font-medium resize-none"
                  />
                </div>

                {/* Checkbox Above Submit Button */}
                <div className="pt-1 flex items-start sm:items-center justify-start gap-2.5">
                  <input
                    type="checkbox"
                    id="consentCheckbox"
                    required
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="w-4 h-4 mt-0.5 sm:mt-0 rounded border-gray-300 text-[#1877F2] accent-[#1877F2] focus:ring-0 outline-none cursor-pointer shrink-0"
                  />
                  <label
                    htmlFor="consentCheckbox"
                    className="text-xs text-gray-600 select-none cursor-pointer leading-tight"
                  >
                    I agree to the terms & privacy policy and consent to be contacted regarding this inquiry.
                  </label>
                </div>

                {/* Center-Aligned Submit Button without Icon */}
                <div className="pt-2 flex justify-center">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto inline-flex items-center justify-center px-10 py-3 rounded-lg bg-[#1877F2] hover:bg-blue-600 active:scale-98 text-white text-sm font-bold transition-all shadow-xs cursor-pointer disabled:opacity-70"
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

          {/* ─── Right Column: Interactive Google Map & Quick Contact ─── */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            {/* Map Card */}
            <div className="bg-white rounded-xl border border-gray-200/90 shadow-xs overflow-hidden flex flex-col">
              {/* Map Header */}
              <div className="px-4 py-3 border-b border-gray-150 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#1877F2]" />
                  <span className="text-sm font-bold text-gray-950">
                    KrikoTrip Office Location
                  </span>
                </div>
                <a
                  href="https://maps.google.com/?q=Los+Angeles+CA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-[#1877F2] hover:underline inline-flex items-center gap-1"
                >
                  <span>Open Map</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* Responsive Google Maps Embed Iframe */}
              <div className="relative w-full h-[320px] sm:h-[350px] bg-gray-100">
                <iframe
                  title="KrikoTrip Location Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d105799.39077221008!2d-118.34300305!3d34.02047895!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2c75ddc27da13%3A0xe22fdf6f254608f4!2sLos%20Angeles%2C%20CA%2C%20USA!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full filter grayscale-[15%] contrast-[105%]"
                />
              </div>

              {/* Map Footer Bar */}
              <div className="p-3.5 bg-gray-50/60 text-xs text-gray-600 flex items-center justify-between border-t border-gray-100">
                <span className="truncate">
                  Skyline Plaza, 5th Floor, 123 Main Street, Los Angeles, CA
                </span>
                <span className="font-semibold text-gray-800 shrink-0 ml-2">
                  USA
                </span>
              </div>
            </div>

            {/* Quick Connect Assistance Card */}
            <div className="bg-[#08182B] text-white rounded-xl p-5 sm:p-6 shadow-xs">
              <h4 className="text-sm sm:text-base font-bold text-white mb-1">
                Need Immediate Assistance?
              </h4>
              <p className="text-xs text-gray-300 leading-relaxed mb-4">
                Chat with our travel coordinators on WhatsApp or dial directly.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-3">
                <a
                  href="https://wa.me/18004567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold transition-all shadow-xs"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp Chat</span>
                </a>

                <a
                  href="tel:+18004567890"
                  className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all border border-white/15"
                >
                  <Phone className="w-4 h-4 text-[#1877F2]" />
                  <span>+1 (800) 456-7890</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
