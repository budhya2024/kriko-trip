"use client";

import React, { useState } from "react";
import {
  Send,
  User,
  Mail,
  Phone,
  MessageSquare,
  CheckCircle2,
  MapPin,
  ExternalLink,
  MessageCircle,
  Headphones,
} from "lucide-react";

export default function ContactFormSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "Holiday Package Inquiry",
    travelers: "2 Travelers",
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
        subject: "Holiday Package Inquiry",
        travelers: "2 Travelers",
        message: "",
      });
    }, 900);
  };

  return (
    <section className="w-full py-12 lg:py-16 bg-white">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* ─── Left Column: Contact Form ─── */}
          <div className="lg:col-span-7 bg-white rounded-xl border border-gray-200/90 shadow-xs p-6 sm:p-8 lg:p-9">
            <div className="mb-7">
              <span className="text-[#1877F2] text-xs sm:text-sm font-bold uppercase tracking-wider">
                Send a Message
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-950 mt-1.5 tracking-tight">
                Plan Your Next Journey With Us
              </h3>
              <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                Fill in your details below and one of our dedicated holiday
                specialists will tailor the perfect itinerary for you.
              </p>
            </div>

            {isSubmitted ? (
              <div className="p-8 rounded-xl bg-green-50 border border-green-200 text-center animate-in fade-in">
                <div className="w-14 h-14 rounded-full bg-green-500 text-white flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h4 className="text-lg font-bold text-gray-950">
                  Message Sent Successfully!
                </h4>
                <p className="text-sm text-gray-600 mt-1.5 max-w-md mx-auto">
                  Thank you for reaching out to KrikoTrip. Our travel advisor will
                  contact you via phone or email within 2 hours.
                </p>
                <button
                  type="button"
                  onClick={() => setIsSubmitted(false)}
                  className="mt-5 inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-[#1877F2] hover:bg-blue-600 text-white text-xs font-semibold transition-colors cursor-pointer"
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
                        className="w-full pl-10 pr-3.5 py-3 rounded-lg border border-gray-200 bg-gray-50/50 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#1877F2] focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all font-medium"
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
                        className="w-full pl-10 pr-3.5 py-3 rounded-lg border border-gray-200 bg-gray-50/50 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#1877F2] focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all font-medium"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Phone Number */}
                  <div>
                    <label className="block text-xs font-bold text-gray-800 uppercase tracking-wider mb-1.5">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                        <Phone className="w-4 h-4" />
                      </div>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        placeholder="e.g. +1 (555) 000-0000"
                        className="w-full pl-10 pr-3.5 py-3 rounded-lg border border-gray-200 bg-gray-50/50 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#1877F2] focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all font-medium"
                      />
                    </div>
                  </div>

                  {/* Inquiry Topic */}
                  <div>
                    <label className="block text-xs font-bold text-gray-800 uppercase tracking-wider mb-1.5">
                      Trip / Service Type
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) =>
                        setFormData({ ...formData, subject: e.target.value })
                      }
                      className="w-full px-3.5 py-3 rounded-lg border border-gray-200 bg-gray-50/50 text-sm text-gray-900 focus:outline-none focus:border-[#1877F2] focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all font-medium"
                    >
                      <option value="Holiday Package Inquiry">Holiday Package</option>
                      <option value="Custom Honeymoon Tour">Custom Honeymoon</option>
                      <option value="Family Vacation">Family Vacation</option>
                      <option value="Group & Corporate Tour">Group & Corporate</option>
                      <option value="Flight & Hotel Bookings">Flight & Hotel</option>
                      <option value="Visa & Travel Insurance">Visa & Insurance</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-bold text-gray-800 uppercase tracking-wider mb-1.5">
                    Your Requirements / Message <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute top-3.5 left-3.5 pointer-events-none text-gray-400">
                      <MessageSquare className="w-4 h-4" />
                    </div>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      placeholder="Tell us about your desired destinations, travel dates, budget preferences, or specific activities..."
                      className="w-full pl-10 pr-3.5 py-3 rounded-lg border border-gray-200 bg-gray-50/50 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#1877F2] focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all font-medium resize-none"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <p className="text-xs text-gray-500">
                    🔒 We protect your data. Zero unsolicited spam.
                  </p>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-lg bg-[#1877F2] hover:bg-blue-600 active:scale-98 text-white text-sm font-bold transition-all shadow-sm cursor-pointer disabled:opacity-70"
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
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Map Card */}
            <div className="bg-white rounded-xl border border-gray-200/90 shadow-xs overflow-hidden flex flex-col">
              {/* Map Header */}
              <div className="px-5 py-4 border-b border-gray-150 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#1877F2]" />
                  <span className="text-sm font-bold text-gray-950">
                    KrikoTrip Headquarters
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
              <div className="p-4 bg-gray-50/60 text-xs text-gray-600 flex items-center justify-between border-t border-gray-100">
                <span className="truncate">
                  Skyline Plaza, 5th Floor, 123 Main Street, Los Angeles, CA
                </span>
                <span className="font-semibold text-gray-800 shrink-0 ml-2">
                  USA
                </span>
              </div>
            </div>

            {/* Quick Connect Assistance Card */}
            <div className="bg-[#08182B] text-white rounded-xl p-6 sm:p-7 relative overflow-hidden shadow-xs">
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-2">
                  <Headphones className="w-4 h-4 text-[#1877F2]" />
                  <span className="text-xs font-bold text-[#1877F2] uppercase tracking-wider">
                    Instant Connect
                  </span>
                </div>
                <h4 className="text-lg font-bold text-white mb-2">
                  Prefer To Speak Right Now?
                </h4>
                <p className="text-xs text-gray-300 leading-relaxed mb-5">
                  Connect with our holiday coordinators on WhatsApp or dial directly
                  for immediate tour reservations and quotes.
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
      </div>
    </section>
  );
}

