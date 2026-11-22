"use client";

import React, { useState } from "react";
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { apiSend } from "@/lib/api/http";

interface NewsletterFormProps {
  source?: string;
}

export default function NewsletterForm({ source = "blog_sidebar" }: NewsletterFormProps) {
  const [email, setEmail] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      await apiSend("/newsletter/subscriptions", "POST", {
        email: email.trim(),
        source,
        honeypot: honeypot || undefined,
      });
      setIsSuccess(true);
      setEmail("");
      setHoneypot("");
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : "Failed to subscribe. Please try again.";
      setErrorMessage(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#00285C] text-white rounded-xl p-5 shadow-sm text-left">
      <h4 className="text-sm sm:text-base font-semibold text-white mb-1.5">
        Subscribe to Our Newsletter
      </h4>
      <p className="text-xs text-blue-100/90 font-normal leading-relaxed mb-3.5">
        Get the latest updates and travel guides right in your inbox.
      </p>

      {isSuccess ? (
        <div className="p-3 rounded-md bg-[#083570] border border-emerald-400/40 text-emerald-300 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
          <span>Thank you for subscribing to our travel newsletter!</span>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-2.5">
          <div style={{ display: "none" }} aria-hidden="true">
            <input
              type="text"
              name="newsletter_verification_code"
              tabIndex={-1}
              autoComplete="off"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
            />
          </div>

          {errorMessage && (
            <div className="p-2 rounded bg-rose-950/80 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <input
            type="email"
            required
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-3 rounded-md bg-[#083570] border border-white/20 text-white placeholder:text-blue-100 text-xs focus:outline-none focus:bg-[#0a4187] transition-colors font-normal"
          />

          <button
            type="submit"
            disabled={isSubmitting || !email.trim()}
            className="w-full py-3 rounded-md bg-[#03ADFF] hover:bg-[#0092db] disabled:opacity-60 text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm cursor-pointer flex items-center justify-center gap-2"
          >
            {isSubmitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
            <span>{isSubmitting ? "SUBSCRIBING..." : "SUBSCRIBE"}</span>
          </button>
        </form>
      )}
    </div>
  );
}
