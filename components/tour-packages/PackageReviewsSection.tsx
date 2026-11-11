"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  Star,
  ThumbsUp,
  CheckCircle2,
  MessageSquarePlus,
  Send,
  X,
  UserCheck,
  Lock,
  LogIn,
} from "lucide-react";
import { useAuth } from "@/components/shared/AuthContext";
import AuthModal from "@/components/shared/AuthModal";

export interface PackageReview {
  id: string;
  author: string;
  location: string;
  tripType?: "Couple" | "Family" | "Friends" | "Solo";
  date: string;
  rating: number;
  title?: string;
  comment: string;
  helpfulCount: number;
  verified: boolean;
}

interface PackageReviewsSectionProps {
  packageTitle: string;
  destination: string;
  rating: number;
  reviewsCount: number;
}

function getInitialReviews(destination: string, packageTitle: string): PackageReview[] {
  return [
    {
      id: "rev-1",
      author: "Anirban Chatterjee",
      location: "Kolkata, India",
      tripType: "Family",
      date: "October 2026",
      rating: 5,
      title: `Unforgettable ${destination} experience with seamless arrangements`,
      comment: `Booked the ${packageTitle} with KrikoTrip for our family vacation. Every transfer, ferry, and hotel check-in was completely hassle-free. Our driver was punctual and polite, and the resort stay exceeded expectations.`,
      helpfulCount: 18,
      verified: true,
    },
    {
      id: "rev-2",
      author: "Priya & Rohan Sen",
      location: "Bengaluru, India",
      tripType: "Couple",
      date: "September 2026",
      rating: 5,
      title: "Well-paced itinerary and wonderful hospitality",
      comment: `We loved how thoughtfully the itinerary was planned for ${destination}. We never felt rushed during sightseeing and still covered every highlight on our list. Special thanks to the support concierge who checked in daily.`,
      helpfulCount: 14,
      verified: true,
    },
    {
      id: "rev-3",
      author: "Saurav Mukherjee",
      location: "Delhi NCR, India",
      tripType: "Friends",
      date: "August 2026",
      rating: 4,
      title: "Great value for money and clean accommodations",
      comment: `Everything promised in the package inclusions was delivered on time. Breakfast and dinner spreads at the hotel were delicious, and the local guide shared great stories throughout the trip.`,
      helpfulCount: 9,
      verified: true,
    },
    {
      id: "rev-4",
      author: "Meenakshi Iyer",
      location: "Chennai, India",
      tripType: "Solo",
      date: "July 2026",
      rating: 5,
      title: "Safe, organized, and truly memorable trip",
      comment: `As a solo traveler visiting ${destination} for the first time, KrikoTrip made me feel completely safe and cared for. Pickup from the airport was smooth and the suggested activities were spot-on.`,
      helpfulCount: 11,
      verified: true,
    },
  ];
}

const STAR_DISTRIBUTION = [
  { stars: 5, percentage: 78 },
  { stars: 4, percentage: 16 },
  { stars: 3, percentage: 4 },
  { stars: 2, percentage: 1 },
  { stars: 1, percentage: 1 },
];

export default function PackageReviewsSection({
  packageTitle,
  destination,
  rating,
  reviewsCount,
}: PackageReviewsSectionProps) {
  const { user, isLoggedIn } = useAuth();

  const initialReviews = useMemo(
    () => getInitialReviews(destination, packageTitle),
    [destination, packageTitle]
  );

  const [reviews, setReviews] = useState<PackageReview[]>(initialReviews);
  const [helpfulClicked, setHelpfulClicked] = useState<Record<string, boolean>>({});
  const [showAllReviews, setShowAllReviews] = useState(false);

  // Share Your Experience Modal & Auth Gate State
  const [isWritingReview, setIsWritingReview] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [reviewSubmittedNotice, setReviewSubmittedNotice] = useState(false);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewDescription, setReviewDescription] = useState("");

  // Close review modal on Escape & lock body scroll when modal is open
  useEffect(() => {
    if (!isWritingReview) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsWritingReview(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [isWritingReview]);

  const visibleReviews = showAllReviews ? reviews : reviews.slice(0, 3);

  const totalDisplayedCount =
    reviewsCount + (reviews.length - initialReviews.length);

  const handleToggleHelpful = (id: string) => {
    setHelpfulClicked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoggedIn || !user || !reviewDescription.trim()) return;

    const created: PackageReview = {
      id: `rev-user-${Date.now()}`,
      author: user.name || "KrikoTrip Traveler",
      location: user.location || "India",
      date: "Just now",
      rating: reviewRating,
      comment: reviewDescription.trim(),
      helpfulCount: 0,
      verified: true,
    };

    setReviews((prev) => [created, ...prev]);
    setReviewRating(5);
    setReviewDescription("");
    setIsWritingReview(false);
    setReviewSubmittedNotice(true);
    setTimeout(() => setReviewSubmittedNotice(false), 4000);
  };

  const getInitials = (name: string) =>
    name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase() || "")
      .join("");

  return (
    <div id="traveler-reviews" className="mt-10 scroll-mt-24">
      {/* Section Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <div>
          <h2 className="text-2xl sm:text-[26px] font-semibold text-gray-900 tracking-tight">
            Traveler Reviews
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5 font-normal">
            Verified experiences from travelers who booked {packageTitle}
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsWritingReview(true)}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-gray-200 hover:border-[#1877F2] bg-white hover:bg-blue-50/40 text-[#00285C] text-xs sm:text-sm font-medium shadow-2xs transition-colors cursor-pointer"
        >
          <MessageSquarePlus className="w-4 h-4 text-[#1877F2]" />
          <span>Share Your Experience</span>
        </button>
      </div>

      {/* Review Submitted Confirmation */}
      {reviewSubmittedNotice && (
        <div className="mb-4 px-4 py-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm font-medium flex items-center gap-2 animate-in fade-in duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Thank you! Your review has been added below.</span>
        </div>
      )}

      {/* ─── Share Your Experience Modal (Login Required; Rating + Description only) ─── */}
      {isWritingReview && (
        <div
          className="fixed inset-0 z-[130] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="share-experience-modal-title"
        >
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
            onClick={() => setIsWritingReview(false)}
          />

          {/* Modal Card */}
          <div className="relative w-full max-w-[440px] bg-white rounded-xl border border-gray-200 overflow-hidden z-10 max-h-[92vh] flex flex-col shadow-xl animate-in fade-in duration-150">
            {/* Modal Header */}
            <div className="px-5 py-4 flex items-center justify-between border-b border-gray-100 bg-[#F8FAFC]">
              <div className="min-w-0 pr-3">
                <h3
                  id="share-experience-modal-title"
                  className="text-base sm:text-lg font-semibold text-gray-900 leading-tight"
                >
                  Share Your Experience
                </h3>
                <p className="text-xs text-gray-500 truncate mt-0.5">
                  {packageTitle}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsWritingReview(false)}
                aria-label="Close modal"
                className="w-8 h-8 rounded-lg hover:bg-gray-200/80 text-gray-500 hover:text-gray-800 flex items-center justify-center transition-colors cursor-pointer shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {!isLoggedIn || !user ? (
              /* ─── Guest Gate: Cannot Review Without Login ─── */
              <div className="p-6 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-blue-50 border border-blue-100 text-[#1877F2] flex items-center justify-center mx-auto">
                  <Lock className="w-5 h-5" />
                </div>
                <div className="space-y-1.5">
                  <h4 className="text-sm sm:text-base font-semibold text-gray-900">
                    Sign In Required to Post a Review
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-500 leading-relaxed max-w-xs mx-auto">
                    Only logged-in travelers can share a review on KrikoTrip. Please sign in with your mobile number to continue.
                  </p>
                </div>
                <div className="pt-2 flex items-center justify-center gap-2.5">
                  <button
                    type="button"
                    onClick={() => setIsWritingReview(false)}
                    className="px-4 py-2.5 rounded-lg border border-gray-200 hover:bg-gray-50 text-xs sm:text-sm font-medium text-gray-700 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsWritingReview(false);
                      setIsAuthModalOpen(true);
                    }}
                    className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-[#1877F2] hover:bg-[#00285C] text-white text-xs sm:text-sm font-medium shadow-2xs transition-colors cursor-pointer"
                  >
                    <LogIn className="w-4 h-4" />
                    <span>Sign In to Review</span>
                  </button>
                </div>
              </div>
            ) : (
              /* ─── Logged-In Review Form: Rating & Description Only ─── */
              <form
                onSubmit={handleReviewSubmit}
                className="p-5 space-y-4 overflow-y-auto"
              >
                {/* Logged-In Reviewer Identity Banner */}
                <div className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-blue-50/70 border border-blue-100 text-xs text-gray-700">
                  <CheckCircle2 className="w-4 h-4 text-[#1877F2] shrink-0" />
                  <span className="truncate">
                    Posting as <strong className="font-semibold text-gray-900">{user.name}</strong>
                    {user.location ? ` • ${user.location}` : ""}
                  </span>
                </div>

                {/* Star Rating Picker */}
                <div className="flex items-center justify-between p-3 rounded-lg bg-[#F8FAFC] border border-gray-200/80">
                  <span className="text-xs sm:text-sm font-medium text-gray-700">
                    Your Rating <span className="text-red-500">*</span>
                  </span>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setReviewRating(star)}
                        aria-label={`Rate ${star} stars`}
                        className="p-0.5 cursor-pointer transition-transform active:scale-90"
                      >
                        <Star
                          className={`w-5 h-5 sm:w-5.5 sm:h-5.5 ${
                            star <= reviewRating
                              ? "text-[#F59E0B] fill-[#F59E0B]"
                              : "text-gray-300"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Review Description */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell other travelers about your trip experience, hotels, transfers, and highlights..."
                    value={reviewDescription}
                    onChange={(e) => setReviewDescription(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-lg border border-gray-300 focus:border-[#1877F2] bg-white text-xs sm:text-sm text-gray-800 outline-none resize-none"
                  />
                </div>

                {/* Footer Actions */}
                <div className="pt-2 flex items-center justify-end gap-2.5 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => setIsWritingReview(false)}
                    className="px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 text-xs sm:text-sm font-medium text-gray-700 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-1.5 px-5 py-2 rounded-lg bg-[#1877F2] hover:bg-[#00285C] text-white text-xs sm:text-sm font-medium shadow-2xs transition-colors cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Review</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Login AuthModal for Guest Reviewers */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        defaultMode="login"
      />

      {/* ─── Overall Rating Summary Card ─── */}
      <div className="rounded-xl border border-gray-200/90 bg-[#F8FAFC] p-4 sm:p-6 mb-5">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center">
          {/* Left Score Box */}
          <div className="sm:col-span-4 flex sm:flex-col items-center sm:items-start justify-between sm:justify-center gap-2 sm:border-r sm:border-gray-200 sm:pr-5">
            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-3xl sm:text-4xl font-semibold text-gray-900 tracking-tight">
                  {rating.toFixed(1)}
                </span>
                <span className="text-sm text-gray-400 font-normal">/ 5.0</span>
              </div>
              <div className="flex items-center gap-1 mt-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-4 h-4 ${
                      star <= Math.round(rating)
                        ? "text-[#F59E0B] fill-[#F59E0B]"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>
            <div className="text-right sm:text-left">
              <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-700 bg-emerald-50 border border-emerald-200/70 px-2 py-0.5 rounded-md">
                <UserCheck className="w-3 h-3" />
                Verified Ratings
              </span>
              <p className="text-[11px] sm:text-xs text-gray-500 mt-1">
                Based on {totalDisplayedCount} reviews
              </p>
            </div>
          </div>

          {/* Right Distribution Bars */}
          <div className="sm:col-span-8 space-y-1.5">
            {STAR_DISTRIBUTION.map((row) => (
              <div key={row.stars} className="flex items-center gap-2.5 text-xs">
                <span className="w-9 text-gray-600 font-medium flex items-center gap-0.5 shrink-0">
                  {row.stars}
                  <Star className="w-3 h-3 text-[#F59E0B] fill-[#F59E0B]" />
                </span>
                <div className="flex-1 h-2 rounded-full bg-gray-200 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-[#1877F2]"
                    style={{ width: `${row.percentage}%` }}
                  />
                </div>
                <span className="w-8 text-right text-gray-500 text-[11px] shrink-0">
                  {row.percentage}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── Individual Review Cards ─── */}
      <div className="space-y-3.5">
        {visibleReviews.map((review) => {
          const isHelpful = Boolean(helpfulClicked[review.id]);
          const displayHelpfulCount = review.helpfulCount + (isHelpful ? 1 : 0);

          return (
            <div
              key={review.id}
              className="rounded-xl border border-gray-200/90 bg-white p-4 sm:p-5 shadow-2xs space-y-3"
            >
              {/* Reviewer Header */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-full bg-blue-50 border border-blue-100 text-[#1877F2] font-semibold text-xs sm:text-sm flex items-center justify-center shrink-0">
                    {getInitials(review.author)}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-sm font-semibold text-gray-900 truncate">
                        {review.author}
                      </span>
                      {review.verified && (
                        <span className="inline-flex items-center gap-0.5 text-[10.5px] font-medium text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          Verified
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] sm:text-xs text-gray-500 flex items-center gap-1.5 flex-wrap mt-0.5">
                      <span>{review.location}</span>
                      {review.tripType && (
                        <>
                          <span className="text-gray-300">•</span>
                          <span>{review.tripType} Trip</span>
                        </>
                      )}
                      <span className="text-gray-300">•</span>
                      <span>{review.date}</span>
                    </div>
                  </div>
                </div>

                {/* Rating Stars */}
                <div className="flex items-center gap-0.5 shrink-0 bg-amber-50/90 border border-amber-200/70 px-2 py-1 rounded-md">
                  <Star className="w-3.5 h-3.5 text-[#F59E0B] fill-[#F59E0B]" />
                  <span className="text-xs font-semibold text-gray-900 ml-0.5">
                    {review.rating.toFixed(1)}
                  </span>
                </div>
              </div>

              {/* Review Content */}
              <div>
                {review.title && (
                  <h4 className="text-sm font-semibold text-gray-900 mb-1">
                    {review.title}
                  </h4>
                )}
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal">
                  {review.comment}
                </p>
              </div>

              {/* Helpful Action Footer */}
              <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs">
                <button
                  type="button"
                  onClick={() => handleToggleHelpful(review.id)}
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-[11px] font-medium transition-colors cursor-pointer ${
                    isHelpful
                      ? "bg-blue-50 border-blue-200 text-[#1877F2]"
                      : "bg-white border-gray-200 text-gray-500 hover:text-gray-800 hover:bg-gray-50"
                  }`}
                >
                  <ThumbsUp className="w-3 h-3" />
                  <span>Helpful ({displayHelpfulCount})</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Show More / Show Less Button */}
      {reviews.length > 3 && (
        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={() => setShowAllReviews((prev) => !prev)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-gray-200 hover:border-[#1877F2] bg-white hover:bg-blue-50/40 text-xs sm:text-sm font-medium text-gray-700 hover:text-[#1877F2] transition-colors cursor-pointer"
          >
            {showAllReviews
              ? "Show Fewer Reviews"
              : `Show All ${reviews.length} Reviews`}
          </button>
        </div>
      )}
    </div>
  );
}
