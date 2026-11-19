"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";

interface BankingDatePickerProps {
  value: string; // YYYY-MM-DD
  onChange: (dateStr: string) => void;
  placeholder?: string;
  label?: string;
  minDate?: string; // YYYY-MM-DD
  className?: string;
  inline?: boolean;
  align?: "left" | "right" | "center";
  centerModal?: boolean;
  onClose?: () => void;
}

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// Weekdays starting on Monday matching reference screenshot
const WEEK_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function BankingDatePicker({
  value,
  onChange,
  placeholder = "Select date",
  minDate,
  className = "",
  inline = false,
  align = "left",
  centerModal = false,
  onClose,
}: BankingDatePickerProps) {
  const [isOpen, setIsOpen] = useState(inline);
  const [tripType, setTripType] = useState<"Round trip" | "One way">("Round trip");
  const [returnDate, setReturnDate] = useState<string>("");
  const containerRef = useRef<HTMLDivElement>(null);

  const handleClose = () => {
    setIsOpen(false);
    if (onClose) onClose();
  };

  // Base view date (Single active month)
  const [viewDate, setViewDate] = useState<Date>(() => {
    if (value) {
      const parts = value.split("-");
      if (parts.length === 3) {
        return new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, 1);
      }
    }
    return new Date("2026-11-01T00:00:00");
  });

  const [today, setToday] = useState<Date | null>(null);

  // Initialize client date inside useEffect for Next.js SSR/prerender safety
  useEffect(() => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    setToday(now);
    if (!value) {
      setViewDate(new Date(now.getFullYear(), now.getMonth(), 1));
    }
  }, [value]);

  // Effective min date: provided minDate or today (past dates and past months cannot be selected)
  const effectiveMinDate = useMemo(() => {
    if (minDate) {
      const parts = minDate.split("-");
      const d = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
      d.setHours(0, 0, 0, 0);
      return d;
    }
    return today;
  }, [minDate, today]);

  // Max selectable date: only upcoming year allowed (12 months from today, next 2+ years disabled)
  const maxDate = useMemo(() => {
    if (!today) return null;
    const max = new Date(today.getFullYear() + 1, today.getMonth(), today.getDate());
    max.setHours(23, 59, 59, 999);
    return max;
  }, [today]);

  // Sync viewDate if value changes externally
  useEffect(() => {
    if (value) {
      const parts = value.split("-");
      if (parts.length === 3) {
        setViewDate(new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, 1));
      }
    }
  }, [value]);

  // Click outside listener
  useEffect(() => {
    function handleClickOutside(event: MouseEvent | TouchEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        handleClose();
      }
    }
    if (isOpen || inline) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isOpen, inline]);

  // Selected date objects
  const selectedStartObj = value
    ? (() => {
      const parts = value.split("-");
      if (parts.length === 3) {
        const d = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
        d.setHours(0, 0, 0, 0);
        return d;
      }
      return null;
    })()
    : null;

  const selectedEndObj = returnDate
    ? (() => {
      const parts = returnDate.split("-");
      if (parts.length === 3) {
        const d = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
        d.setHours(0, 0, 0, 0);
        return d;
      }
      return null;
    })()
    : null;

  // Previous month navigation: disabled when at or before current month (no past months)
  const isPrevMonthDisabled = useMemo(() => {
    const minD = effectiveMinDate || today;
    if (!minD) return false;
    return (
      viewDate.getFullYear() < minD.getFullYear() ||
      (viewDate.getFullYear() === minD.getFullYear() &&
        viewDate.getMonth() <= minD.getMonth())
    );
  }, [viewDate, effectiveMinDate, today]);

  // Next month navigation: disabled when at or beyond max upcoming year
  const isNextMonthDisabled = useMemo(() => {
    if (!maxDate) return false;
    return (
      viewDate.getFullYear() > maxDate.getFullYear() ||
      (viewDate.getFullYear() === maxDate.getFullYear() &&
        viewDate.getMonth() >= maxDate.getMonth())
    );
  }, [viewDate, maxDate]);

  const handlePrevMonth = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (isPrevMonthDisabled) return;
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1));
  };

  const handleNextMonth = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (isNextMonthDisabled) return;
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1));
  };

  // Day click handler
  const handleSelectDay = (y: number, m: number, d: number) => {
    const monthStr = String(m + 1).padStart(2, "0");
    const dayStr = String(d).padStart(2, "0");
    const dateStr = `${y}-${monthStr}-${dayStr}`;

    const clickedDate = new Date(y, m, d);
    clickedDate.setHours(0, 0, 0, 0);

    if (tripType === "Round trip" && selectedStartObj && !selectedEndObj) {
      if (clickedDate >= selectedStartObj) {
        setReturnDate(dateStr);
        return;
      }
    }

    onChange(dateStr);
    setReturnDate("");
  };

  // Reset handler
  const handleReset = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    onChange("");
    setReturnDate("");
  };

  // Done handler: confirms and closes
  const handleDone = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleClose();
  };

  // Format date helper matching screenshot: "Fri, 24 May"
  const formatDatePill = (dateObj: Date | null, fallbackText = "Select date") => {
    if (!dateObj) return fallbackText;
    return dateObj.toLocaleDateString("en-US", {
      weekday: "short",
      day: "numeric",
      month: "short",
    });
  };

  // Format display for trigger input
  const formatTriggerDisplay = (dateObj: Date | null) => {
    if (!dateObj) return "";
    return dateObj.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  // Single Month Calculation
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Shift so Monday = 0, ..., Sunday = 6
  const firstDayOfWeek = (new Date(year, month, 1).getDay() + 6) % 7;

  const cells: {
    day: number | null;
    fullDate?: Date;
    isWeekendSat?: boolean;
    isWeekendSun?: boolean;
    isDisabled?: boolean;
    isStart?: boolean;
    isEnd?: boolean;
    isInRange?: boolean;
  }[] = [];

  // Empty leading cells
  for (let i = 0; i < firstDayOfWeek; i++) {
    cells.push({ day: null });
  }

  // Days in month
  for (let d = 1; d <= daysInMonth; d++) {
    const cellDate = new Date(year, month, d);
    cellDate.setHours(0, 0, 0, 0);

    const dayOfWeek = (cellDate.getDay() + 6) % 7;
    const isWeekendSat = dayOfWeek === 5;
    const isWeekendSun = dayOfWeek === 6;

    const isPast = effectiveMinDate ? cellDate < effectiveMinDate : false;
    const isTooFarFuture = maxDate ? cellDate > maxDate : false;
    const isDisabled = isPast || isTooFarFuture;

    const isStart =
      selectedStartObj && cellDate.getTime() === selectedStartObj.getTime();
    const isEnd =
      selectedEndObj && cellDate.getTime() === selectedEndObj.getTime();

    const isInRange =
      selectedStartObj &&
      selectedEndObj &&
      cellDate > selectedStartObj &&
      cellDate < selectedEndObj;

    cells.push({
      day: d,
      fullDate: cellDate,
      isWeekendSat,
      isWeekendSun,
      isDisabled,
      isStart: Boolean(isStart),
      isEnd: Boolean(isEnd),
      isInRange: Boolean(isInRange),
    });
  }

  return (
    <div ref={containerRef} className={`relative w-full min-w-0 ${className}`}>
      {/* ─── Clean Trigger Input (when not inline) ─── */}
      {!inline && (
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full h-[46px] flex items-center gap-2 px-3 py-2.5 rounded-lg border border-gray-300 hover:border-gray-400 focus:border-[#1877F2] bg-white transition-colors text-left cursor-pointer group min-w-0"
        >
          <Calendar className="w-4 h-4 text-[#1877F2] shrink-0" />
          {value ? (
            <span className="text-xs sm:text-sm font-medium text-gray-900 truncate">
              {formatTriggerDisplay(selectedStartObj)}
            </span>
          ) : (
            <span className="text-xs sm:text-sm font-normal text-gray-400 select-none truncate">
              {placeholder}
            </span>
          )}
        </button>
      )}

      {/* ─── Single Month Compact Reference Calendar (Zero Shadow, Reduced Height) ─── */}
      {(inline || isOpen) && (
        <>
          {/* Backdrop */}
          {!inline && (
            <div
              className={`fixed inset-0 z-[130] bg-black/45 backdrop-blur-xs transition-opacity ${align === "center" || centerModal ? "block" : "sm:hidden block"
                }`}
              onClick={handleClose}
            />
          )}

          {/* Calendar Card: Modal Centered when align === 'center' or centerModal */}
          <div
            className={
              inline
                ? "relative w-full bg-white rounded-lg border border-gray-200 p-3 sm:p-4 z-50"
                : align === "center" || centerModal
                  ? "fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[140] w-[90vw] max-w-[360px] bg-white rounded-2xl border border-gray-200 p-4 shadow-2xl max-h-[92vh] overflow-y-auto"
                  : `fixed sm:absolute left-1/2 -translate-x-1/2 sm:translate-x-0 ${align === "right"
                    ? "sm:right-0 sm:left-auto"
                    : "sm:left-0 sm:right-auto"
                  } top-1/2 -translate-y-1/2 sm:translate-y-0 sm:top-[calc(100%+6px)] z-[130] sm:z-50 w-[80vw] max-w-[340px] sm:w-[360px] bg-white rounded-xl border border-gray-200/90 p-3.5 sm:p-4 shadow-xl sm:shadow-lg max-h-[92vh] overflow-y-auto`
            }
          >


            {/* ─── Single Month Calendar Body ─── */}
            <div className="relative">
              {/* Month Title & Fast Nav */}
              <div className="mb-4 px-1 flex items-center justify-between relative">
                <div className="flex items-center gap-1.5 text-sm sm:text-base font-bold text-[#0F172A] select-none">
                  <span>{MONTH_NAMES[month]}</span>
                  <span className="text-xs font-normal text-gray-500">
                    {year}
                  </span>
                </div>

                {/* Left & Right Nav Chevrons + Close button */}
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    disabled={isPrevMonthDisabled}
                    onClick={() => handlePrevMonth()}
                    className={`w-6 h-6 rounded-md flex items-center justify-center transition-colors ${isPrevMonthDisabled
                      ? "text-gray-300 cursor-not-allowed"
                      : "text-[#3b82f6] hover:bg-blue-50 cursor-pointer"
                      }`}
                    aria-label="Previous Month"
                  >
                    <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
                  </button>
                  <button
                    type="button"
                    disabled={isNextMonthDisabled}
                    onClick={() => handleNextMonth()}
                    className={`w-6 h-6 rounded-md flex items-center justify-center transition-colors ${isNextMonthDisabled
                      ? "text-gray-300 cursor-not-allowed"
                      : "text-[#3b82f6] hover:bg-blue-50 cursor-pointer"
                      }`}
                    aria-label="Next Month"
                  >
                    <ChevronRight className="w-4 h-4 stroke-[2.5]" />
                  </button>
                  {!inline && (
                    <button
                      type="button"
                      onClick={handleClose}
                      className="w-6 h-6 rounded-md text-gray-400 hover:text-gray-700 hover:bg-gray-100 flex items-center justify-center transition-colors cursor-pointer ml-1"
                      aria-label="Close Calendar"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Weekday Row: Mon-Fri gray, Sat blue, Sun red */}
              <div className="grid grid-cols-7 gap-y-0.5 mb-1 text-center select-none">
                {WEEK_DAYS.map((wd, idx) => (
                  <span
                    key={wd}
                    className={`text-[11px] font-normal ${idx === 5
                      ? "text-[#93c5fd]"
                      : idx === 6
                        ? "text-[#f87171]"
                        : "text-gray-400"
                      }`}
                  >
                    {wd}
                  </span>
                ))}
              </div>

              {/* Days Grid: Compact row heights, solid blue circle on active, range ribbon */}
              <div className="grid grid-cols-7 gap-y-0.5 text-center">
                {cells.map((cell, idx) => {
                  if (!cell.day || !cell.fullDate) {
                    return (
                      <div
                        key={`empty-${idx}`}
                        className="h-7 sm:h-8 w-full"
                      />
                    );
                  }

                  const isHighlighted = cell.isStart || cell.isEnd;
                  const hasRange = Boolean(selectedStartObj && selectedEndObj);

                  return (
                    <div
                      key={`day-${cell.day}-${idx}`}
                      className="relative h-7 sm:h-8 flex items-center justify-center"
                    >
                      {/* Continuous Range Ribbon matching Screenshot */}
                      {hasRange && (
                        <>
                          {cell.isStart && (
                            <div className="absolute top-0 bottom-0 left-1/2 right-0 bg-[#EEF4FF] z-0" />
                          )}
                          {cell.isInRange && (
                            <div className="absolute inset-0 bg-[#EEF4FF] z-0" />
                          )}
                          {cell.isEnd && (
                            <div className="absolute top-0 bottom-0 left-0 right-1/2 bg-[#EEF4FF] z-0" />
                          )}
                        </>
                      )}

                      {cell.isDisabled ? (
                        <span className="text-xs sm:text-sm text-gray-300 font-normal select-none cursor-not-allowed relative z-10">
                          {cell.day}
                        </span>
                      ) : (
                        <button
                          type="button"
                          onClick={() =>
                            handleSelectDay(year, month, cell.day!)
                          }
                          className={`w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-full flex items-center justify-center text-xs sm:text-[13px] font-medium transition-all cursor-pointer relative z-10 ${isHighlighted
                            ? "bg-[#1877F2] text-white font-bold"
                            : cell.isWeekendSun
                              ? "text-[#ef4444] hover:bg-gray-100"
                              : cell.isWeekendSat
                                ? "text-[#60a5fa] hover:bg-gray-100"
                                : "text-[#1e293b] hover:bg-gray-100 active:scale-95"
                            }`}
                        >
                          {cell.day}
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ─── Compact Bottom Footer: Single Solid Blue "Done" Button (Zero Shadow) ─── */}
            <div className="mt-3.5 pt-2 flex items-center justify-end">
              <button
                type="button"
                onClick={handleDone}
                className="bg-[#1877F2] hover:bg-[#1565C0] text-white font-semibold text-xs sm:text-sm px-6 py-2 rounded transition-all active:scale-95 cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
