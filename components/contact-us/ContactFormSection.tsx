"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  User,
  Mail,
  FileText,
  MessageSquare,
  CheckCircle2,
  AlertCircle,
  MapPin,
  ExternalLink,
} from "lucide-react";
import CountryPhoneSelect from "@/components/shared/CountryPhoneSelect";
import { useSiteSettings, DEFAULT_SITE_SETTINGS } from "@/components/shared/SettingsContext";
import { apiSend } from "@/lib/api/http";
import { newIdempotencyKey } from "@/lib/idempotency";

export default function ContactFormSection() {
  const contextSettings = useSiteSettings();
  const settings = contextSettings ?? DEFAULT_SITE_SETTINGS;
  const address = settings.address || DEFAULT_SITE_SETTINGS.address || "";
  const mapEmbedUrl = settings.mapEmbedUrl || DEFAULT_SITE_SETTINGS.mapEmbedUrl || "";
  const openMapUrl = "https://maps.google.com/?q=" + encodeURIComponent(address || "Sonarpur Kolkata 700103");

  const [countryCode, setCountryCode] = useState("+91");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [agreed, setAgreed] = useState(false);
  const [honeypot, setHoneypot] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) {
      setErrorMessage("Please accept the terms and privacy policy to continue.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const idempotencyKey = newIdempotencyKey();
      await apiSend(
        "/contact-messages",
        "POST",
        {
          name: formData.name.trim(),
          email: formData.email.trim(),
          phoneCountryCode: countryCode,
          phone: formData.phone.trim(),
          subject: formData.subject.trim(),
          message: formData.message.trim(),
          consent: agreed,
          honeypot: honeypot || undefined,
        },
        {
          headers: {
            "Idempotency-Key": idempotencyKey,
          },
        },
      );

      setIsSubmitted(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
      setAgreed(false);
      setHoneypot("");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to send message. Please try again.";
      setErrorMessage(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="w-full pt-8 lg:pt-16 bg-white">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
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
                  <div style={{ display: "none" }} aria-hidden="true">
                    <input
                      type="text"
                      name="site_feedback_verification"
                      tabIndex={-1}
                      autoComplete="off"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                    />
                  </div>

                  {errorMessage && (
                    <div className="p-3 rounded-md bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                          placeholder="Enter your name"
                          className="w-full pl-10 pr-3.5 py-3 rounded-md border border-gray-200 bg-gray-50/50 text-sm text-gray-900 placeholder:text-gray-400 placeholder:font-normal outline-none focus:outline-none focus:border-[#03ADFF] focus:bg-white transition-colors font-normal"
                        />
                      </div>
                    </div>

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
                          placeholder="Enter your email"
                          className="w-full pl-10 pr-3.5 py-3 rounded-md border border-gray-200 bg-gray-50/50 text-sm text-gray-900 placeholder:text-gray-400 placeholder:font-normal outline-none focus:outline-none focus:border-[#03ADFF] focus:bg-white transition-colors font-normal"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-800 uppercase tracking-wider mb-1.5">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <div className="relative flex items-center rounded-md border border-gray-200 bg-gray-50/50 focus-within:border-[#03ADFF] focus-within:bg-white transition-colors">
                        <CountryPhoneSelect
                          value={countryCode}
                          onChange={(code) => setCountryCode(code)}
                          buttonClassName="rounded-l-md"
                        />

                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                          }
                          placeholder="Enter your phone number"
                          className="w-full px-3 py-3 bg-transparent text-sm text-gray-900 placeholder:text-gray-400 placeholder:font-normal outline-none focus:outline-none font-normal border-0 min-w-0"
                        />
                      </div>
                    </div>

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
                          placeholder="Enter subject"
                          className="w-full pl-10 pr-3.5 py-3 rounded-md border border-gray-200 bg-gray-50/50 text-sm text-gray-900 placeholder:text-gray-400 placeholder:font-normal outline-none focus:outline-none focus:border-[#03ADFF] focus:bg-white transition-colors font-normal"
                        />
                      </div>
                    </div>
                  </div>

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
                        placeholder="Enter your message..."
                        className="w-full pl-10 pr-3.5 py-3 rounded-md border border-gray-200 bg-gray-50/50 text-sm text-gray-900 placeholder:text-gray-400 placeholder:font-normal outline-none focus:outline-none focus:border-[#03ADFF] focus:bg-white transition-colors font-normal resize-none"
                      />
                    </div>
                  </div>

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
                      I agree to the{" "}
                      <Link href="/terms-of-service" className="underline text-[#1877F2] hover:text-[#00285C]">
                        terms
                      </Link>{" "}
                      &amp;{" "}
                      <Link href="/privacy-policy" className="underline text-[#1877F2] hover:text-[#00285C]">
                        privacy policy
                      </Link>{" "}
                      and consent to be contacted regarding this inquiry.
                    </label>
                  </div>

                  <div className="pt-3 flex justify-center">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-water-fill w-full sm:w-auto inline-flex items-center justify-center px-10 py-3 rounded-full bg-[#00285C] active:scale-98 text-white text-sm font-semibold transition-all shadow-xs cursor-pointer disabled:opacity-70"
                      style={{
                        ["--water-fill" as string]:
                          "linear-gradient(135deg, #1877F2 0%, #03ADFF 100%)",
                      }}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2 relative z-10">
                          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Sending...</span>
                        </span>
                      ) : (
                        <span className="relative z-10">Send Message</span>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

          <div className="lg:col-span-5 bg-white rounded-md border border-gray-200/90 shadow-xs overflow-hidden flex flex-col h-full">
            <div className="px-4 py-3 border-b border-gray-150 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#03ADFF]" />
                <span className="text-sm font-semibold text-[#00285C]">
                  KrikoTrip Office Location
                </span>
              </div>
              <a
                href={openMapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-[#1877F2] hover:underline inline-flex items-center gap-1"
              >
                <span>Open Map</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="w-full flex-1 min-h-[380px] sm:min-h-[420px] bg-gray-100 flex flex-col">
              <iframe
                title="KrikoTrip Location Map"
                src={mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "380px" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full flex-1 min-h-[380px] sm:min-h-[420px] block filter grayscale-[10%] contrast-[105%]"
              />
            </div>

            <div className="p-3.5 bg-gray-50/60 text-xs text-gray-600 flex items-center justify-between border-t border-gray-100 shrink-0">
              <span className="truncate">
                {address}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
