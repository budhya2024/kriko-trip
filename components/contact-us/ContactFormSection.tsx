"use client";

import React, { useState } from "react";
import {
  Send,
  User,
  Mail,
  FileText,
  MessageSquare,
  CheckCircle2,
  MapPin,
  ExternalLink,
  MessageCircle,
  Phone,
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
    }, 800);
  };

  return (
    <section className="w-full py-10 lg:py-14 bg-white">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* ─── Left Column: Contact Form ─── */}
          <div className="lg:col-span-7 bg-white rounded-lg border border-gray-200/90 shadow-xs p-6 sm:p-7">
            <div className="mb-6">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-950 tracking-tight">
                Send Us a Message
              </h3>
            </div>

            {isSubmitted ? (
              <div className="p-8 rounded-lg bg-green-50 border border-green-200 text-center animate-in fade-in">
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
                  className="mt-4 inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-[#1877F2] hover:bg-blue-600 text-white text-xs font-semibold transition-colors cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-bold text-gray-800 uppercase tracking-wider mb-1.5">
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
                        className="w-full pl-10 pr-3.5 py-2.5 rounded-lg border border-gray-200 bg-gray-50/50 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:outline-none focus:border-[#1877F2] focus:bg-white transition-colors font-medium"
                      />
                    </div>
                  </div>

                  {/* Email Address */}
                  <div>
                    <label className="block text-xs font-bold text-gray-800 uppercase tracking-wider mb-1.5">
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
                        className="w-full pl-10 pr-3.5 py-2.5 rounded-lg border border-gray-200 bg-gray-50/50 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:outline-none focus:border-[#1877F2] focus:bg-white transition-colors font-medium"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Phone Number with Country Code Dropdown */}
                  <div>
                    <label className="block text-xs font-bold text-gray-800 uppercase tracking-wider mb-1.5">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <div className="flex items-center rounded-lg border border-gray-200 bg-gray-50/50 focus-within:border-[#1877F2] focus-within:bg-white transition-colors overflow-hidden">
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

                  {/* Subject Input Field (Replaced Service Type) */}
                  <div>
                    <label className="block text-xs font-bold text-gray-800 uppercase tracking-wider mb-1.5">
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
                        className="w-full pl-10 pr-3.5 py-2.5 rounded-lg border border-gray-200 bg-gray-50/50 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:outline-none focus:border-[#1877F2] focus:bg-white transition-colors font-medium"
                      />
                    </div>
                  </div>
                </div>

                {/* Message Textarea */}
                <div>
                  <label className="block text-xs font-bold text-gray-800 uppercase tracking-wider mb-1.5">
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
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-lg border border-gray-200 bg-gray-50/50 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:outline-none focus:border-[#1877F2] focus:bg-white transition-colors font-medium resize-none"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-1 flex justify-end">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-2.5 rounded-lg bg-[#1877F2] hover:bg-blue-600 active:scale-98 text-white text-sm font-bold transition-all shadow-xs cursor-pointer disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* ─── Right Column: Interactive Google Map & Quick Contact ─── */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            {/* Map Card */}
            <div className="bg-white rounded-lg border border-gray-200/90 shadow-xs overflow-hidden flex flex-col">
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
              <div className="relative w-full h-[300px] sm:h-[330px] bg-gray-100">
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

          </div>
        </div>
      </div>
    </section>
  );
}
