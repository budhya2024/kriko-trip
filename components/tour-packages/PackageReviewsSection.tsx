"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
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
  AlertCircle,
  MessageCircle,
} from "lucide-react";
import { useAuth } from "@/components/shared/AuthContext";
import AuthModal from "@/components/shared/AuthModal";
import {
  fetchPackageReviews,
  submitReview,
  voteReviewHelpful,
  type PublicReview,
  type PackageReviewsSummary,
} from "@/lib/api/reviews";

interface PackageReviewsSectionProps {
  packageTitle: string;
  destination: string;
  rating: number;
  reviewsCount: number;
  packageSlug?: string;
}

export default function PackageReviewsSection({
  packageTitle,
  destination,
  rating,
  reviewsCount,
  packageSlug,
}: PackageReviewsSectionProps) {
  const { user, isLoggedIn } = useAuth();

  const [reviews, setReviews] = useState<PublicReview[]>([]);
  const [summary, setSummary] = useState<PackageReviewsSummary | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [ratingFilter, setRatingFilter] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [isWritingReview, setIsWritingReview] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewTripType, setReviewTripType] = useState<"couple" | "family" | "friends" | "solo">("family");
  const [reviewComment, setReviewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [successNotice, setSuccessNotice] = useState<string | null>(null);
  const [hasAlreadyReviewed, setHasAlreadyReviewed] = useState(false);

  const [helpfulState, setHelpfulState] = useState<Record<string, { helpful: boolean; count: number }>>({});

  const loadReviews = useCallback(async (slug: string, filterRating: number | null, page: number) => {
    setIsLoading(true);
    try {
      const res = await fetchPackageReviews(slug, {
        page,
        limit: 10,
        ...(filterRating ? { rating: filterRating } : {}),
      });
      setReviews(res.data || []);
      if (res.summary) {
        setSummary(res.summary);
      }
      if (res.meta) {
        setTotalPages(res.meta.totalPages || 1);
      }
      const initialHelpful: Record<string, { helpful: boolean; count: number }> = {};
      (res.data || []).forEach((r) => {
        initialHelpful[r.id] = {
          helpful: Boolean(r.hasVotedHelpful),
          count: r.helpfulCount || 0,
        };
      });
      setHelpfulState((prev) => ({ ...prev, ...initialHelpful }));
    } catch {
      setReviews([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (packageSlug) {
      loadReviews(packageSlug, ratingFilter, currentPage);
    }
  }, [packageSlug, ratingFilter, currentPage, loadReviews]);

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

  const handleToggleHelpful = async (reviewId: string) => {
    if (!isLoggedIn) {
      setIsAuthModalOpen(true);
      return;
    }
    const current = helpfulState[reviewId] || { helpful: false, count: 0 };
    const nextHelpful = !current.helpful;
    const nextCount = nextHelpful ? current.count + 1 : Math.max(0, current.count - 1);
    setHelpfulState((prev) => ({
      ...prev,
      [reviewId]: { helpful: nextHelpful, count: nextCount },
    }));

    try {
      const res = await voteReviewHelpful(reviewId);
      setHelpfulState((prev) => ({
        ...prev,
        [reviewId]: { helpful: res.helpful, count: res.helpfulCount },
      }));
    } catch {
      setHelpfulState((prev) => ({
        ...prev,
        [reviewId]: current,
      }));
    }
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!packageSlug || !isLoggedIn || !user || reviewComment.trim().length < 10) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const result = await submitReview(packageSlug, {
        rating: reviewRating,
        comment: reviewComment.trim(),
        title: reviewTitle.trim() || null,
        tripType: reviewTripType,
        authorLocation: user.location || null,
      });

      setIsWritingReview(false);
      setReviewComment("");
      setReviewTitle("");
      setReviewRating(5);
      setHasAlreadyReviewed(true);

      const notice = result.status === "approved"
        ? "Your review has been verified and published!"
        : "Thank you! Your review has been submitted and will appear after moderation.";
      setSuccessNotice(notice);
      setTimeout(() => setSuccessNotice(null), 6000);

      loadReviews(packageSlug, ratingFilter, 1);
    } catch (err: unknown) {
      const errorMsg = (err as { message?: string })?.message || "Failed to submit review. Please try again.";
      if (errorMsg.includes("409") || errorMsg.toLowerCase().includes("already reviewed") || errorMsg.toLowerCase().includes("conflict")) {
        setHasAlreadyReviewed(true);
        setSubmitError("You have already reviewed this package.");
      } else {
        setSubmitError(errorMsg);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const getInitials = (name: string) =>
    name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase() || "")
      .join("");

  const formatDate = (iso: string) => {
    try {
      const d = new Date(iso);
      return d.toLocaleDateString("en-IN", {
        month: "short",
        year: "numeric",
      });
    } catch {
      return iso;
    }
  };

  const effectiveAvg = summary ? parseFloat(summary.ratingAvg) : rating;
  const effectiveCount = summary ? summary.reviewsCount : reviewsCount;

  const distribution = summary?.ratingDistribution || {
    "5": 0,
    "4": 0,
    "3": 0,
    "2": 0,
    "1": 0,
  };

  const starRows = [5, 4, 3, 2, 1].map((stars) => {
    const starKey = String(stars) as "1" | "2" | "3" | "4" | "5";
    const count = distribution[starKey] || 0;
    const percentage = effectiveCount > 0 ? Math.round((count / effectiveCount) * 100) : 0;
    return { stars, count, percentage };
  });

  return (
    <div id="traveler-reviews" className="mt-10 scroll-mt-24">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <div>
          <h2 className="text-2xl sm:text-[26px] font-semibold text-gray-900 tracking-tight">
            Traveler Reviews
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5 font-normal">
            Verified experiences from travelers who booked {packageTitle}
          </p>
        </div>

        {hasAlreadyReviewed ? (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 text-xs font-medium border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>You reviewed this tour</span>
          </span>
        ) : (
          <button
            type="button"
            onClick={() => setIsWritingReview(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-gray-200 hover:border-[#1877F2] bg-white hover:bg-blue-50/40 text-[#00285C] text-xs sm:text-sm font-medium shadow-2xs transition-colors cursor-pointer"
          >
            <MessageSquarePlus className="w-4 h-4 text-[#1877F2]" />
            <span>Share Your Experience</span>
          </button>
        )}
      </div>

      {successNotice && (
        <div className="mb-4 px-4 py-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm font-medium flex items-center gap-2 animate-in fade-in duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{successNotice}</span>
        </div>
      )}

      {isWritingReview && (
        <div
          className="fixed inset-0 z-[130] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="share-experience-modal-title"
        >
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
            onClick={() => setIsWritingReview(false)}
          />

          <div className="relative w-full max-w-[480px] bg-white rounded-xl border border-gray-200 overflow-hidden z-10 max-h-[92vh] flex flex-col shadow-xl animate-in fade-in duration-150">
            <div className="px-5 py-4 flex items-center justify-between border-b border-gray-100 bg-[#F8FAFC]">
              <div className="min-w-0 pr-3">
                <h3
                  id="share-experience-modal-title"
                  className="text-base sm:text-lg font-semibold text-gray-900 leading-tight"
                >
                  Share Your Experience
                </h3>
                <p className="text-xs text-gray-500 truncate mt-0.5">
                  {destination}
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
              <div className="p-6 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-blue-50 border border-blue-100 text-[#1877F2] flex items-center justify-center mx-auto">
                  <Lock className="w-5 h-5" />
                </div>
                <div className="space-y-1.5">
                  <h4 className="text-sm sm:text-base font-semibold text-gray-900">
                    Sign In Required to Post a Review
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-500 leading-relaxed max-w-xs mx-auto">
                    Only logged-in travelers can share a review on KrikoTrip. Please sign in to continue.
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
              <form
                onSubmit={handleReviewSubmit}
                className="p-5 space-y-4 overflow-y-auto"
              >
                {submitError && (
                  <div className="px-3.5 py-2.5 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                    <span>{submitError}</span>
                  </div>
                )}

                <div className="flex items-center justify-between gap-2.5 px-3 py-2.5 rounded-lg bg-blue-50/70 border border-blue-100">
                  <div className="min-w-0">
                    <span className="block text-[10px] uppercase tracking-wider text-gray-500 font-medium">
                      Selected Package
                    </span>
                    <span className="block text-xs sm:text-sm font-medium text-[#00285C] truncate">
                      {packageTitle}
                    </span>
                  </div>
                  <CheckCircle2 className="w-4 h-4 text-[#1877F2] shrink-0" />
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-[#F8FAFC] border border-gray-200/80">
                  <span className="text-xs sm:text-sm font-medium text-gray-700">
                    Overall Rating <span className="text-red-500">*</span>
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

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Trip Type
                  </label>
                  <select
                    value={reviewTripType}
                    onChange={(e) => setReviewTripType(e.target.value as "couple" | "family" | "friends" | "solo")}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white text-xs sm:text-sm text-gray-800 outline-none focus:border-[#1877F2]"
                  >
                    <option value="family">Family Trip</option>
                    <option value="couple">Couple Trip</option>
                    <option value="friends">Friends Trip</option>
                    <option value="solo">Solo Trip</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Headline / Title (optional)
                  </label>
                  <input
                    type="text"
                    maxLength={200}
                    placeholder="e.g. Memorable family vacation with great hospitality"
                    value={reviewTitle}
                    onChange={(e) => setReviewTitle(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white text-xs sm:text-sm text-gray-800 outline-none focus:border-[#1877F2]"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-medium text-gray-700">
                      Your Review <span className="text-red-500">*</span>
                    </label>
                    <span className="text-[11px] text-gray-400">
                      {reviewComment.length}/2000
                    </span>
                  </div>
                  <textarea
                    rows={4}
                    required
                    minLength={10}
                    maxLength={2000}
                    placeholder="Tell other travelers about your tour experience, accommodation, transport, and memorable moments..."
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-lg border border-gray-300 focus:border-[#1877F2] bg-white text-xs sm:text-sm text-gray-800 outline-none resize-none"
                  />
                </div>

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
                    disabled={isSubmitting || reviewComment.trim().length < 10}
                    className="inline-flex items-center gap-1.5 px-5 py-2 rounded-lg bg-[#1877F2] hover:bg-[#00285C] disabled:opacity-50 text-white text-xs sm:text-sm font-medium shadow-2xs transition-colors cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{isSubmitting ? "Submitting..." : "Submit Review"}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        defaultMode="login"
      />

      <div className="rounded-xl border border-gray-200/90 bg-[#F8FAFC] p-4 sm:p-6 mb-5">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center">
          <div className="sm:col-span-4 flex sm:flex-col items-center sm:items-start justify-between sm:justify-center gap-2 sm:border-r sm:border-gray-200 sm:pr-5">
            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-3xl sm:text-4xl font-semibold text-gray-900 tracking-tight">
                  {effectiveAvg > 0 ? effectiveAvg.toFixed(1) : "0.0"}
                </span>
                <span className="text-sm text-gray-400 font-normal">/ 5.0</span>
              </div>
              <div className="flex items-center gap-1 mt-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-4 h-4 ${
                      star <= Math.round(effectiveAvg)
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
                Based on {effectiveCount} reviews
              </p>
            </div>
          </div>

          <div className="sm:col-span-8 space-y-1.5">
            {starRows.map((row) => (
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

      <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-4 scrollbar-none">
        <button
          type="button"
          onClick={() => {
            setRatingFilter(null);
            setCurrentPage(1);
          }}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium shrink-0 transition-colors cursor-pointer ${
            ratingFilter === null
              ? "bg-[#1877F2] text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          All ({effectiveCount})
        </button>
        {[5, 4, 3, 2, 1].map((star) => {
          const starKey = String(star) as "1" | "2" | "3" | "4" | "5";
          const count = distribution[starKey] || 0;
          return (
            <button
              key={star}
              type="button"
              onClick={() => {
                setRatingFilter(star);
                setCurrentPage(1);
              }}
              className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium shrink-0 transition-colors cursor-pointer ${
                ratingFilter === star
                  ? "bg-[#1877F2] text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <span>{star}★</span>
              <span>({count})</span>
            </button>
          );
        })}
      </div>

      {isLoading ? (
        <div className="py-12 text-center text-gray-400 text-xs">
          Loading reviews...
        </div>
      ) : reviews.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-200 p-8 text-center bg-gray-50/50">
          <MessageCircle className="w-8 h-8 text-gray-300 mx-auto mb-2" />
          <h3 className="text-sm font-semibold text-gray-800">
            No reviews yet
          </h3>
          <p className="text-xs text-gray-500 mt-0.5 max-w-sm mx-auto">
            Be the first to review this tour! Share your feedback with future travelers.
          </p>
          {!hasAlreadyReviewed && (
            <button
              type="button"
              onClick={() => setIsWritingReview(true)}
              className="mt-3.5 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#1877F2] hover:bg-[#00285C] text-white text-xs font-medium shadow-2xs transition-colors cursor-pointer"
            >
              <MessageSquarePlus className="w-3.5 h-3.5" />
              <span>Write a Review</span>
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-3.5">
          {reviews.map((review) => {
            const helpfulData = helpfulState[review.id] || {
              helpful: Boolean(review.hasVotedHelpful),
              count: review.helpfulCount || 0,
            };

            return (
              <div
                key={review.id}
                className="rounded-xl border border-gray-200/90 bg-white p-4 sm:p-5 shadow-2xs space-y-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    {review.authorAvatarUrl ? (
                      <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 border border-gray-100">
                        <Image
                          src={review.authorAvatarUrl}
                          alt={review.authorName}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-blue-50 border border-blue-100 text-[#1877F2] font-semibold text-xs sm:text-sm flex items-center justify-center shrink-0">
                        {getInitials(review.authorName)}
                      </div>
                    )}
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-sm font-semibold text-gray-900 truncate">
                          {review.authorName}
                        </span>
                        {review.verifiedBooking && (
                          <span className="inline-flex items-center gap-0.5 text-[10.5px] font-medium text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            Verified Traveller
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] sm:text-xs text-gray-500 flex items-center gap-1.5 flex-wrap mt-0.5">
                        {review.authorLocation && <span>{review.authorLocation}</span>}
                        {review.tripType && (
                          <>
                            {review.authorLocation && <span className="text-gray-300">•</span>}
                            <span className="capitalize">{review.tripType} Trip</span>
                          </>
                        )}
                        <span className="text-gray-300">•</span>
                        <span>{formatDate(review.createdAt)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-0.5 shrink-0 bg-amber-50/90 border border-amber-200/70 px-2 py-1 rounded-md">
                    <Star className="w-3.5 h-3.5 text-[#F59E0B] fill-[#F59E0B]" />
                    <span className="text-xs font-semibold text-gray-900 ml-0.5">
                      {review.rating.toFixed(1)}
                    </span>
                  </div>
                </div>

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

                {review.adminReply && (
                  <div className="rounded-lg bg-blue-50/60 border border-blue-100 p-3 text-xs space-y-1">
                    <div className="flex items-center justify-between text-gray-600 font-semibold text-[11px]">
                      <span className="text-[#00285C] flex items-center gap-1">
                        <span>Response from KrikoTrip</span>
                      </span>
                      {review.adminRepliedAt && (
                        <span className="text-gray-400 font-normal">
                          {formatDate(review.adminRepliedAt)}
                        </span>
                      )}
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                      {review.adminReply}
                    </p>
                  </div>
                )}

                <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs">
                  <button
                    type="button"
                    onClick={() => handleToggleHelpful(review.id)}
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-[11px] font-medium transition-colors cursor-pointer ${
                      helpfulData.helpful
                        ? "bg-blue-50 border-blue-200 text-[#1877F2]"
                        : "bg-white border-gray-200 text-gray-500 hover:text-gray-800 hover:bg-gray-50"
                    }`}
                  >
                    <ThumbsUp className="w-3 h-3" />
                    <span>Helpful ({helpfulData.count})</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {totalPages > 1 && (
        <div className="mt-5 flex items-center justify-center gap-2">
          <button
            type="button"
            disabled={currentPage <= 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            className="px-3 py-1.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 disabled:opacity-40 text-xs font-medium text-gray-700 cursor-pointer"
          >
            Previous
          </button>
          <span className="text-xs text-gray-500">
            Page {currentPage} of {totalPages}
          </span>
          <button
            type="button"
            disabled={currentPage >= totalPages}
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            className="px-3 py-1.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 disabled:opacity-40 text-xs font-medium text-gray-700 cursor-pointer"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
