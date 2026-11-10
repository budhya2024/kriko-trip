"use client";

import React, { useState, useRef, useEffect } from "react";
import { Calendar, ChevronLeft, ChevronRight, ChevronDown, X } from "lucide-react";

interface BankingDatePickerProps {
  value: string; // YYYY-MM-DD
  onChange: (dateStr: string) => void;
  placeholder?: string;
  label?: string;
  minDate?: string; // YYYY-MM-DD default to today
  className?: string;
  inline?: boolean;
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

const SHORT_MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const WEEK_DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

export default function BankingDatePicker({
  value,
  onChange,
  placeholder = "Select Travel Date",
  minDate,
  className = "",
  inline = false,
  onClose,
}: BankingDatePickerProps) {
  const [isOpen, setIsOpen] = useState(inline);
  const [viewMode, setViewMode] = useState<"days" | "months" | "years">("days");
  const containerRef = useRef<HTMLDivElement>(null);

  const handleClose = () => {
    setIsOpen(false);
    setViewMode("days");
    if (onClose) onClose();
  };

  // Initialize view date with deterministic value for SSR/prerender
  const [viewDate, setViewDate] = useState<Date>(() => {
    if (value) {
      const parts = value.split("-");
      if (parts.length === 3) {
        return new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
      }
    }
    return new Date("2026-11-01T00:00:00");
  });

  const [today, setToday] = useState<Date | null>(null);

  // Initialize client-side current date inside useEffect to satisfy Next.js prerender
  useEffect(() => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    setToday(now);
    if (!value) {
      setViewDate(now);
    }
  }, [value]);

  // Effective min date
  const effectiveMinDate = minDate
    ? (() => {
        const parts = minDate.split("-");
        return new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
      })()
    : today;

  // Sync viewDate if value changes externally
  useEffect(() => {
    if (value) {
      const parts = value.split("-");
      if (parts.length === 3) {
        setViewDate(new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2])));
      }
    }
  }, [value]);

  // Click outside to close (handles mouse and mobile touch)
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

  // Selected date object
  const selectedDateObj = value
    ? (() => {
        const parts = value.split("-");
        if (parts.length === 3) {
          return new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
        }
        return null;
      })()
    : null;

  // Check if previous month navigation is allowed
  const isPrevMonthDisabled = today
    ? viewDate.getFullYear() < today.getFullYear() ||
      (viewDate.getFullYear() === today.getFullYear() &&
        viewDate.getMonth() <= today.getMonth())
    : false;

  // Month navigation
  const handlePrevMonth = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isPrevMonthDisabled) return;
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1));
  };

  const handleNextMonth = (e: React.MouseEvent) => {
    e.stopPropagation();
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1));
  };

  // Day selection
  const handleSelectDay = (day: number) => {
    const y = viewDate.getFullYear();
    const m = String(viewDate.getMonth() + 1).padStart(2, "0");
    const d = String(day).padStart(2, "0");
    const dateStr = `${y}-${m}-${d}`;
    onChange(dateStr);
    handleClose();
  };

  // Clear date
  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange("");
    handleClose();
  };

  // Quick Today
  const handleToday = (e: React.MouseEvent) => {
    e.stopPropagation();
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, "0");
    const d = String(now.getDate()).padStart(2, "0");
    onChange(`${y}-${m}-${d}`);
    setViewDate(now);
    handleClose();
  };

  // Format date display for trigger input
  const formatDisplay = (dateObj: Date | null) => {
    if (!dateObj) return "";
    return dateObj.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  // Active year & month numbers
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  // Year options list
  const currentYear = today ? today.getFullYear() : 2026;
  const yearOptions = Array.from({ length: 12 }, (_, i) => currentYear + i);

  // Build calendar matrix
  const firstDayIndex = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const prevMonthDays = new Date(year, month, 0).getDate();

  // Days array
  const calendarCells = [];

  // Previous month trailing days
  for (let i = firstDayIndex - 1; i >= 0; i--) {
    calendarCells.push({
      day: prevMonthDays - i,
      isCurrentMonth: false,
      isDisabled: true,
      key: `prev-${i}`,
    });
  }

  // Current month days
  for (let d = 1; d <= daysInMonth; d++) {
    const cellDate = new Date(year, month, d);
    cellDate.setHours(0, 0, 0, 0);

    const isPast = effectiveMinDate ? cellDate < effectiveMinDate : false;
    const isToday = today ? cellDate.getTime() === today.getTime() : false;
    const isSelected =
      selectedDateObj && cellDate.getTime() === selectedDateObj.getTime();

    calendarCells.push({
      day: d,
      isCurrentMonth: true,
      isDisabled: isPast,
      isToday,
      isSelected,
      key: `curr-${d}`,
    });
  }

  // Next month leading days to complete full grid (always 42 cells)
  const remainingCells = 42 - calendarCells.length;
  for (let i = 1; i <= remainingCells; i++) {
    calendarCells.push({
      day: i,
      isCurrentMonth: false,
      isDisabled: true,
      key: `next-${i}`,
    });
  }

  return (
    <div ref={containerRef} className={`relative w-full ${className}`}>
      {/* ─── Clean Professional Trigger Input (when not inline) ─── */}
      {!inline && (
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between gap-2 px-3.5 py-2.5 rounded-lg border border-gray-300 hover:border-gray-400 focus:border-[#1877F2] bg-white transition-colors shadow-2xs text-left cursor-pointer group"
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <Calendar className="w-4 h-4 text-gray-400 group-hover:text-[#1877F2] transition-colors shrink-0" />
            {value ? (
              <span className="text-xs sm:text-sm font-medium text-gray-900 truncate">
                {formatDisplay(selectedDateObj)}
              </span>
            ) : (
              <span className="text-xs sm:text-sm font-normal text-gray-400 select-none truncate">
                {placeholder}
              </span>
            )}
          </div>
          <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-gray-600 shrink-0 transition-transform duration-200" />
        </button>
      )}

      {/* ─── Professional Clean Calendar Popover / Modal ─── */}
      {(inline || isOpen) && (
        <>
          {/* Mobile Dimmed Backdrop */}
          {!inline && (
            <div
              className="sm:hidden fixed inset-0 z-[120] bg-black/40 backdrop-blur-xs animate-in fade-in duration-150"
              onClick={handleClose}
            />
          )}

          {/* Calendar Card: Zero Gradients, Minimalist Professional White UI */}
          <div
            className={
              inline
                ? "relative w-full bg-white rounded-2xl shadow-xl border border-gray-150 p-4 sm:p-5 z-50 animate-in fade-in duration-150"
                : "fixed sm:absolute inset-x-4 top-1/2 -translate-y-1/2 sm:translate-y-0 sm:inset-x-auto sm:top-[calc(100%+8px)] sm:left-0 z-[130] sm:z-50 mx-auto sm:mx-0 w-[calc(100%-32px)] max-w-[340px] sm:w-[320px] bg-white rounded-2xl shadow-2xl border border-gray-150 p-4 sm:p-5 animate-in fade-in zoom-in-95 sm:zoom-in-100 duration-150"
            }
          >
            {/* ─── Header: Month Select + Year Select + Nav Arrows ─── */}
            <div className="flex items-center justify-between pb-3 mb-2 border-b border-gray-100">
              <div className="flex items-center gap-1">
                {/* Month Select Button */}
                <button
                  type="button"
                  onClick={() =>
                    setViewMode((prev) => (prev === "months" ? "days" : "months"))
                  }
                  className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${
                    viewMode === "months"
                      ? "bg-blue-50 text-[#1877F2]"
                      : "text-gray-900 hover:bg-gray-100"
                  }`}
                  aria-label="Select month"
                >
                  <span>{MONTH_NAMES[month]}</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-200 ${
                      viewMode === "months" ? "rotate-180 text-[#1877F2]" : ""
                    }`}
                  />
                </button>

                {/* Year Select Button */}
                <button
                  type="button"
                  onClick={() =>
                    setViewMode((prev) => (prev === "years" ? "days" : "years"))
                  }
                  className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${
                    viewMode === "years"
                      ? "bg-blue-50 text-[#1877F2]"
                      : "text-gray-900 hover:bg-gray-100"
                  }`}
                  aria-label="Select year"
                >
                  <span>{year}</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-200 ${
                      viewMode === "years" ? "rotate-180 text-[#1877F2]" : ""
                    }`}
                  />
                </button>
              </div>

              {/* Prev / Next Month Navigation Buttons */}
              <div className="flex items-center gap-0.5">
                {viewMode === "days" && (
                  <>
                    <button
                      type="button"
                      disabled={isPrevMonthDisabled}
                      onClick={handlePrevMonth}
                      className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${
                        isPrevMonthDisabled
                          ? "text-gray-200 cursor-not-allowed"
                          : "hover:bg-gray-100 text-gray-600 hover:text-gray-900 cursor-pointer"
                      }`}
                      aria-label="Previous Month"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={handleNextMonth}
                      className="w-7 h-7 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
                      aria-label="Next Month"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </>
                )}

                {!inline && (
                  <button
                    type="button"
                    onClick={handleClose}
                    className="w-7 h-7 ml-1 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-700 transition-colors cursor-pointer"
                    aria-label="Close"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* ─── Mode 1: Month Picker Grid ─── */}
            {viewMode === "months" && (
              <div className="py-2 animate-in fade-in duration-150">
                <div className="grid grid-cols-3 gap-2">
                  {SHORT_MONTHS.map((name, idx) => {
                    const isSelectedMonth = idx === month;
                    const isPastMonth =
                      today &&
                      year === today.getFullYear() &&
                      idx < today.getMonth();

                    return (
                      <button
                        key={name}
                        type="button"
                        disabled={Boolean(isPastMonth)}
                        onClick={() => {
                          setViewDate(new Date(year, idx, 1));
                          setViewMode("days");
                        }}
                        className={`py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                          isSelectedMonth
                            ? "bg-[#1877F2] text-white shadow-xs"
                            : isPastMonth
                            ? "text-gray-300 cursor-not-allowed"
                            : "text-gray-700 hover:bg-gray-100 active:scale-98"
                        }`}
                      >
                        {name}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ─── Mode 2: Year Picker Grid ─── */}
            {viewMode === "years" && (
              <div className="py-2 animate-in fade-in duration-150">
                <div className="grid grid-cols-3 gap-2 max-h-[220px] overflow-y-auto pr-1">
                  {yearOptions.map((y) => {
                    const isSelectedYear = y === year;
                    return (
                      <button
                        key={y}
                        type="button"
                        onClick={() => {
                          setViewDate(new Date(y, month, 1));
                          setViewMode("days");
                        }}
                        className={`py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                          isSelectedYear
                            ? "bg-[#1877F2] text-white shadow-xs"
                            : "text-gray-700 hover:bg-gray-100 active:scale-98"
                        }`}
                      >
                        {y}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ─── Mode 3: Standard Days View ─── */}
            {viewMode === "days" && (
              <>
                {/* Weekdays Header */}
                <div className="grid grid-cols-7 gap-1 text-center py-1 mb-1 text-gray-400 text-[11px] font-semibold uppercase tracking-wider select-none">
                  {WEEK_DAYS.map((wd) => (
                    <span key={wd}>{wd}</span>
                  ))}
                </div>

                {/* Days Grid */}
                <div className="grid grid-cols-7 gap-1 text-center">
                  {calendarCells.map((cell) => {
                    if (!cell.isCurrentMonth) {
                      return (
                        <span
                          key={cell.key}
                          className="w-8 h-8 sm:w-9 sm:h-9 mx-auto flex items-center justify-center text-xs text-gray-300 font-normal select-none"
                        >
                          {cell.day}
                        </span>
                      );
                    }

                    if (cell.isDisabled) {
                      return (
                        <span
                          key={cell.key}
                          className="w-8 h-8 sm:w-9 sm:h-9 mx-auto flex items-center justify-center text-xs text-gray-300 font-normal select-none cursor-not-allowed"
                        >
                          {cell.day}
                        </span>
                      );
                    }

                    return (
                      <button
                        key={cell.key}
                        type="button"
                        onClick={() => handleSelectDay(cell.day)}
                        className={`w-8 h-8 sm:w-9 sm:h-9 mx-auto rounded-full flex flex-col items-center justify-center text-xs sm:text-[13px] transition-all cursor-pointer select-none relative ${
                          cell.isSelected
                            ? "bg-[#1877F2] text-white font-semibold shadow-xs"
                            : cell.isToday
                            ? "text-[#1877F2] font-semibold hover:bg-blue-50/70"
                            : "text-gray-800 font-medium hover:bg-gray-100 active:scale-95"
                        }`}
                      >
                        <span>{cell.day}</span>
                        {/* Apple/Google Style Subtle Dot for Today */}
                        {cell.isToday && !cell.isSelected && (
                          <span className="absolute bottom-1 w-1 h-1 rounded-full bg-[#1877F2]" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </>
            )}

            {/* ─── Footer Action Bar ─── */}
            <div className="mt-3.5 pt-2.5 border-t border-gray-100 flex items-center justify-between text-xs">
              <button
                type="button"
                onClick={handleClear}
                className="text-gray-500 hover:text-red-500 font-medium transition-colors cursor-pointer px-2 py-1 rounded hover:bg-gray-50"
              >
                Clear
              </button>
              <button
                type="button"
                onClick={handleToday}
                className="text-[#1877F2] hover:text-[#00285C] font-semibold transition-colors cursor-pointer px-3 py-1 rounded-full hover:bg-blue-50"
              >
                Today
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
