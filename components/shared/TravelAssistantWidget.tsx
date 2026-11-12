"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  X,
  Send,
  RotateCcw,
  PhoneCall,
  MapPin,
  Clock,
  ArrowRight,
  Star,
} from "lucide-react";
import { initialTourPackages } from "@/components/tour-packages/data";
import { TourPackage } from "@/components/tour-packages/types";
import { useAuth } from "./AuthContext";
import { openCallbackModal } from "./RequestCallbackWidget";

interface ChatMessage {
  id: number;
  sender: "assistant" | "user";
  text: string;
  packages?: TourPackage[];
  filterDestination?: string;
  showCallbackCta?: boolean;
  callbackDestination?: string;
}

const DESTINATION_NAMES = [
  "Kashmir",
  "Gangtok",
  "Sundarban",
  "Kerala",
  "Andaman",
  "Lakshadweep",
  "Manali",
  "Rajasthan",
  "Goa",
  "Meghalaya",
];

const QUICK_PROMPTS = [
  "Kashmir Trips",
  "Andaman Packages",
  "Under ₹25,000",
  "Honeymoon Ideas",
  "Family Tours",
  "Request a Call Back",
];

function buildAssistantReply(query: string): Omit<ChatMessage, "id" | "sender"> {
  const lower = query.toLowerCase().trim();

  // Check if user wants callback or human travel agent assistance
  if (
    lower.includes("call") ||
    lower.includes("agent") ||
    lower.includes("speak") ||
    lower.includes("custom") ||
    lower.includes("contact") ||
    lower.includes("discount") ||
    lower.includes("offer")
  ) {
    const mentionedDest = DESTINATION_NAMES.find((d) =>
      lower.includes(d.toLowerCase())
    );
    return {
      text: mentionedDest
        ? `Our ${mentionedDest} destination experts can tailor a custom itinerary with Upto 30% OFF. Tap below to request an instant callback!`
        : "I can connect you right away with our senior travel planner for a custom quote and Upto 30% OFF deals.",
      showCallbackCta: true,
      callbackDestination: mentionedDest || "",
    };
  }

  // Match specific destination from the 10 destinations
  const matchedDest = DESTINATION_NAMES.find((d) =>
    lower.includes(d.toLowerCase())
  );
  if (matchedDest) {
    const matches = initialTourPackages.filter(
      (pkg) =>
        pkg.destination.toLowerCase() === matchedDest.toLowerCase() ||
        pkg.title.toLowerCase().includes(matchedDest.toLowerCase())
    );
    return {
      text:
        matches.length > 0
          ? `Here are our handpicked ${matchedDest} tour packages:`
          : `Explore curated ${matchedDest} trips crafted by our specialists:`,
      packages: matches.slice(0, 3),
      filterDestination: matchedDest,
      callbackDestination: matchedDest,
      showCallbackCta: true,
    };
  }

  // Budget query (e.g. under 20k, under 25000, cheap, budget)
  const budgetMatch = lower.match(/(\d{2,6})\s*(k)?/);
  if (
    lower.includes("budget") ||
    lower.includes("cheap") ||
    lower.includes("under") ||
    lower.includes("below")
  ) {
    let maxPrice = 25000;
    if (budgetMatch) {
      const rawNum = parseInt(budgetMatch[1], 10);
      maxPrice =
        budgetMatch[2] || rawNum < 1000 ? rawNum * 1000 : rawNum;
    }
    const affordable = initialTourPackages
      .filter((pkg) => pkg.price <= maxPrice)
      .sort((a, b) => a.price - b.price)
      .slice(0, 3);

    if (affordable.length > 0) {
      return {
        text: `Here are popular tour packages starting under ₹${maxPrice.toLocaleString("en-IN")} per person:`,
        packages: affordable,
        showCallbackCta: true,
      };
    }
  }

  // Travel type / theme queries
  if (lower.includes("honeymoon") || lower.includes("couple") || lower.includes("romantic")) {
    const romantic = initialTourPackages
      .filter((p) => p.travelType === "Honeymoon" || p.travelType === "Couple")
      .slice(0, 3);
    return {
      text: "Here are our top-rated Honeymoon & Couple getaways:",
      packages: romantic,
      showCallbackCta: true,
    };
  }

  if (lower.includes("family") || lower.includes("group") || lower.includes("kids")) {
    const familyPkgs = initialTourPackages
      .filter((p) => p.travelType === "Family" || p.travelType === "Group")
      .slice(0, 3);
    return {
      text: "Great choices! These Family & Group packages include comfortable stays and guided sightseeing:",
      packages: familyPkgs,
      showCallbackCta: true,
    };
  }

  if (lower.includes("beach") || lower.includes("island") || lower.includes("sea")) {
    const beachPkgs = initialTourPackages
      .filter((p) => p.theme === "Beaches")
      .slice(0, 3);
    return {
      text: "Looking for turquoise water and sandy beaches? Take a look at these island & coastal trips:",
      packages: beachPkgs,
      showCallbackCta: true,
    };
  }

  if (
    lower.includes("hill") ||
    lower.includes("mountain") ||
    lower.includes("snow") ||
    lower.includes("adventure") ||
    lower.includes("nature")
  ) {
    const hillPkgs = initialTourPackages
      .filter(
        (p) =>
          p.theme === "Hills" ||
          p.theme === "Nature" ||
          p.travelType === "Adventure"
      )
      .slice(0, 3);
    return {
      text: "Here are our scenic hill station & nature escape packages:",
      packages: hillPkgs,
      showCallbackCta: true,
    };
  }

  if (lower.includes("popular") || lower.includes("best") || lower.includes("all")) {
    return {
      text: "Here are some of our travelers' highest-rated packages right now:",
      packages: initialTourPackages.slice(0, 3),
      showCallbackCta: true,
    };
  }

  return {
    text: "I can help you explore trips across Kashmir, Gangtok, Sundarban, Kerala, Andaman, Lakshadweep, Manali, Rajasthan, Goa, and Meghalaya. Type a destination, budget (e.g. 'Under 25000'), or tap a quick suggestion below!",
    showCallbackCta: true,
  };
}

/**
 * Floating Travel Assistant widget powered by the local `/assets/images/asistant.png`
 * asset, offering instant destination/package discovery and callback handoff.
 */
export default function TravelAssistantWidget() {
  const pathname = usePathname();
  const { user, isLoggedIn } = useAuth();

  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const msgCounterRef = useRef(2);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const getWelcomeMessage = (): ChatMessage => ({
    id: 1,
    sender: "assistant",
    text: `Hi${isLoggedIn && user?.name ? ` ${user.name.split(" ")[0]}` : ""}! I'm your KrikoTrip Travel Assistant. Tell me which destination, budget, or trip style you're planning!`,
  });

  const [messages, setMessages] = useState<ChatMessage[]>([
    getWelcomeMessage(),
  ]);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen]);

  // Hide on auth pages
  if (pathname === "/login" || pathname === "/register") {
    return null;
  }

  const normalizedPath = pathname?.replace(/\/$/, "") || "";
  const isTourListPage = normalizedPath === "/tour-packages";
  const isPackageDetailPage =
    normalizedPath.startsWith("/tour-packages/") && !isTourListPage;

  const sendQuery = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    const userMsg: ChatMessage = {
      id: msgCounterRef.current++,
      sender: "user",
      text: trimmed,
    };

    const replyData = buildAssistantReply(trimmed);
    const botMsg: ChatMessage = {
      id: msgCounterRef.current++,
      sender: "assistant",
      ...replyData,
    };

    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInputValue("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendQuery(inputValue);
  };

  const handleReset = () => {
    msgCounterRef.current = 2;
    setMessages([getWelcomeMessage()]);
  };

  // Keep launcher clear of the Request Callback bar on /tour-packages and sticky mobile bar on detail pages
  const launcherPositionClass = isTourListPage
    ? "bottom-[104px] lg:bottom-[120px] right-4 sm:right-6"
    : isPackageDetailPage
      ? "bottom-[96px] lg:bottom-6 right-4 sm:right-6"
      : "bottom-4 sm:bottom-6 right-4 sm:right-6";

  return (
    <>
      {/* ─── Floating Travel Assistant PNG Trigger + "Speak to our Experts" Shape ─── */}
      {!isOpen && (
        <div
          className={`fixed z-[45] flex flex-col items-center print:hidden ${launcherPositionClass}`}
        >
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            aria-label="Speak to our Experts"
            className="group flex flex-col items-center cursor-pointer focus:outline-none transition-transform duration-200 hover:-translate-y-1 active:scale-95"
          >
            <Image
              src="/assets/images/asistant.png"
              alt="KrikoTrip Travel Assistant"
              width={500}
              height={500}
              className="w-16 h-16 sm:w-20 sm:h-20 object-contain drop-shadow-[0_6px_14px_rgba(0,0,0,0.22)] transition-transform duration-300 group-hover:scale-105"
              priority
            />
            <span className="-mt-2 relative z-10 inline-flex items-center px-3 py-1 rounded-full bg-[#00285C] group-hover:bg-[#1877F2] text-white text-[11px] sm:text-xs font-medium shadow-[0_4px_14px_rgba(0,40,92,0.3)] border border-white/30 whitespace-nowrap transition-colors">
              Speak to our Experts
            </span>
          </button>
        </div>
      )}

      {/* ─── Travel Assistant Chat Popup ─── */}
      {isOpen && (
        <div
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[90] w-[calc(100vw-2rem)] sm:w-[390px] h-[520px] max-h-[82vh] bg-white rounded-xl border border-gray-200 shadow-2xl flex flex-col overflow-hidden animate-in fade-in duration-150 print:hidden"
          role="dialog"
          aria-modal="false"
          aria-label="KrikoTrip Travel Assistant"
        >
          {/* Header */}
          <div className="px-4 py-3 bg-[#00285C] text-white flex items-center justify-between gap-2 shrink-0">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-10 h-10 rounded-full bg-white p-0.5 shrink-0 flex items-center justify-center overflow-hidden">
                <Image
                  src="/assets/images/asistant.png"
                  alt="Travel Assistant Avatar"
                  width={40}
                  height={40}
                  className="w-9 h-9 object-contain"
                />
              </div>
              <div className="min-w-0">
                <h3 className="text-sm font-semibold text-white truncate leading-tight">
                  Travel Assistant
                </h3>
                <p className="text-[11px] text-sky-200 font-normal truncate">
                  Instant package & destination help
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1 shrink-0">
              <button
                type="button"
                onClick={handleReset}
                title="Reset conversation"
                aria-label="Reset conversation"
                className="w-8 h-8 rounded-lg flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close Travel Assistant"
                className="w-8 h-8 rounded-lg flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Body */}
          <div className="flex-1 overflow-y-auto p-3.5 space-y-3.5 bg-[#F8FAFC]">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"
                  }`}
              >
                <div
                  className={`max-w-[88%] rounded-2xl px-3.5 py-2.5 text-xs sm:text-[13px] leading-relaxed shadow-xs ${msg.sender === "user"
                    ? "bg-[#1877F2] text-white rounded-br-sm"
                    : "bg-white text-gray-700 border border-gray-200/80 rounded-bl-sm"
                    }`}
                >
                  {msg.text}
                </div>

                {/* Package Suggestions */}
                {msg.packages && msg.packages.length > 0 && (
                  <div className="w-full mt-2 space-y-2">
                    {msg.packages.map((pkg) => (
                      <div
                        key={pkg.id}
                        className="bg-white rounded-xl border border-gray-200/90 p-2.5 shadow-xs flex gap-2.5 items-center"
                      >
                        <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-gray-100">
                          <Image
                            src={pkg.image}
                            alt={pkg.title}
                            fill
                            sizes="64px"
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-1 text-[10.5px] text-gray-500">
                            <span className="inline-flex items-center gap-0.5 truncate">
                              <MapPin className="w-3 h-3 text-[#1877F2] shrink-0" />
                              {pkg.destination}
                            </span>
                            <span className="inline-flex items-center gap-0.5 text-amber-600 font-medium shrink-0">
                              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                              {pkg.rating.toFixed(1)}
                            </span>
                          </div>
                          <Link
                            href={`/tour-packages/${pkg.id}`}
                            onClick={() => setIsOpen(false)}
                            className="block text-xs font-semibold text-gray-900 hover:text-[#1877F2] truncate mt-0.5 transition-colors"
                          >
                            {pkg.title}
                          </Link>
                          <div className="flex items-center justify-between mt-1 gap-2">
                            <span className="inline-flex items-center gap-1 text-[10.5px] text-gray-500">
                              <Clock className="w-3 h-3" />
                              {pkg.duration}
                            </span>
                            <span className="text-xs font-semibold text-[#1877F2]">
                              ₹{pkg.price.toLocaleString("en-IN")}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}

                    {msg.filterDestination && (
                      <Link
                        href={`/tour-packages?destination=${encodeURIComponent(
                          msg.filterDestination
                        )}`}
                        onClick={() => setIsOpen(false)}
                        className="inline-flex items-center gap-1 text-[11.5px] font-medium text-[#1877F2] hover:underline pt-0.5"
                      >
                        <span>View all {msg.filterDestination} packages</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    )}
                  </div>
                )}

                {/* Callback Action Chip inside Chat */}
                {msg.showCallbackCta && (
                  <button
                    type="button"
                    onClick={() => {
                      setIsOpen(false);
                      openCallbackModal(msg.callbackDestination);
                    }}
                    className="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#00285C] hover:bg-[#1877F2] text-white text-[11.5px] font-medium transition-colors cursor-pointer"
                  >
                    <PhoneCall className="w-3 h-3" />
                    <span>
                      Request Call Back
                      {msg.callbackDestination
                        ? ` for ${msg.callbackDestination}`
                        : ""}
                    </span>
                  </button>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestion Chips */}
          <div className="px-3 py-2 bg-white border-t border-gray-100 flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0">
            {QUICK_PROMPTS.map((chip) => (
              <button
                key={chip}
                type="button"
                onClick={() => sendQuery(chip)}
                className="shrink-0 px-2.5 py-1 rounded-full bg-slate-100 hover:bg-blue-50 text-gray-700 hover:text-[#1877F2] text-[11px] font-medium border border-gray-200/70 transition-colors cursor-pointer"
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Input Form */}
          <form
            onSubmit={handleSubmit}
            className="p-2.5 bg-white border-t border-gray-200 flex items-center gap-2 shrink-0"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask about Kashmir, Goa, budget..."
              className="flex-1 min-w-0 px-3 py-2 rounded-lg border border-gray-200 focus:border-[#1877F2] text-xs sm:text-[13px] text-gray-800 outline-none bg-[#F8FAFC] focus:bg-white transition-colors"
            />
            <button
              type="submit"
              disabled={!inputValue.trim()}
              aria-label="Send message"
              className="w-9 h-9 rounded-lg bg-[#1877F2] hover:bg-[#00285C] disabled:opacity-45 disabled:hover:bg-[#1877F2] text-white flex items-center justify-center transition-colors shrink-0 cursor-pointer disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}

