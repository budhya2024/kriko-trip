"use client";

import React, { useState, useRef, useEffect } from "react";
import { Calendar, ChevronLeft, ChevronRight, X } from "lucide-react";

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
  const containerRef = useRef<HTMLDivElement>(null);

  const handleClose = () => {
    setIsOpen(false);
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

  // Initialize client-side current date inside useEffect to satisfy Next.js 16 prerender requirements
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

  // Check if previous month navigation is allowed (cannot navigate past current month)
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
    const year = viewDate.getFullYear();
    const month = String(viewDate.getMonth() + 1).padStart(2, "0");
    const d = String(day).padStart(2, "0");
    const dateStr = `${year}-${month}-${d}`;
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

  // Format date display for trigger
  const formatDisplay = (dateObj: Date | null) => {
    if (!dateObj) return "";
    return dateObj.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  // Header display (Slice / Axis Banking Style)
  const formatHeaderDisplay = (dateObj: Date | null) => {
    if (!dateObj) return "Select a Travel Date";
    return dateObj.toLocaleDateString("en-IN", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  // Build calendar matrix
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
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

  // Next month leading days to complete full grid
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
      {/* ─── Clean Trigger Input (Eliminates Browser dd-mm-yyyy Overlap) ─── */}
      {!inline && (
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between gap-2 px-3 py-2.5 rounded-lg border border-gray-300 hover:border-gray-400 focus:border-[#1877F2] bg-white transition-colors shadow-2xs text-left cursor-pointer group"
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <Calendar className="w-4 h-4 text-[#1877F2] shrink-0" />
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

          <Calendar className="w-3.5 h-3.5 text-gray-400 group-hover:text-gray-600 shrink-0 transition-colors" />
        </button>
      )}

      {/* ─── Slice & Axis Bank Style Date Picker Popover ─── */}
      {(inline || isOpen) && (
        <>
          {/* Mobile Dimmed Backdrop (closes on tap outside) */}
          {!inline && (
            <div
              className="sm:hidden fixed inset-0 z-[120] bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
              onClick={handleClose}
            />
          )}

          {/* Calendar Card: Centered Modal on Mobile, Dropdown on Desktop */}
          <div
            className={
              inline
                ? "relative w-full bg-white rounded-2xl shadow-2xl border border-gray-200/90 overflow-hidden z-50 animate-in fade-in duration-200"
                : "fixed sm:absolute inset-x-4 top-1/2 -translate-y-1/2 sm:translate-y-0 sm:inset-x-auto sm:top-[calc(100%+8px)] sm:left-0 z-[130] sm:z-50 mx-auto sm:mx-0 w-[calc(100%-32px)] max-w-[330px] sm:w-[310px] bg-white rounded-2xl shadow-2xl border border-gray-200/90 overflow-hidden animate-in fade-in zoom-in-95 sm:zoom-in-100 duration-200"
            }
          >
            {/* Top Site Logo Navy & Sky Blue Brand Banner (Like Slice & Axis Banking) */}
            <div className="relative bg-gradient-to-r from-[#00285C] via-[#0D4B9F] to-[#03ADFF] p-4 text-white">
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#03ADFF] animate-pulse" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-sky-200">
                    TRAVEL DATE
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleClose}
                  className="w-6 h-6 rounded-full hover:bg-white/20 flex items-center justify-center text-white/80 hover:text-white transition-colors cursor-pointer"
                  aria-label="Close date picker"
                >
                  <X className="w-3.5 h-3.5 stroke-[2.5]" />
                </button>
              </div>

              {/* Selected Date Large Heading */}
              <div className="text-base sm:text-lg font-bold tracking-tight text-white leading-tight">
                {formatHeaderDisplay(selectedDateObj)}
              </div>
            </div>

            {/* Calendar Body */}
            <div className="p-3.5 bg-white">
              {/* Month & Year Navigation Row */}
              <div className="flex items-center justify-between mb-3 px-1">
                <span className="text-xs sm:text-sm font-bold text-gray-900 tracking-tight">
                  {MONTH_NAMES[month]} {year}
                </span>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    disabled={isPrevMonthDisabled}
                    onClick={handlePrevMonth}
                    className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors ${
                      isPrevMonthDisabled
                        ? "text-gray-300 cursor-not-allowed opacity-40"
                        : "hover:bg-gray-100 text-gray-600 hover:text-gray-900 cursor-pointer"
                    }`}
                    aria-label="Previous Month"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNextMonth}
                    className="w-7 h-7 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
                    aria-label="Next Month"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

            {/* Weekday Names Header */}
            <div className="grid grid-cols-7 gap-1 text-center mb-1">
              {WEEK_DAYS.map((wd) => (
                <span
                  key={wd}
                  className="text-[10px] sm:text-[11px] font-semibold text-gray-400 uppercase select-none"
                >
                  {wd}
                </span>
              ))}
            </div>

            {/* Days Grid */}
            <div className="grid grid-cols-7 gap-1 text-center">
              {calendarCells.map((cell) => {
                if (!cell.isCurrentMonth) {
                  return (
                    <span
                      key={cell.key}
                      className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center text-[11px] text-gray-300 font-normal select-none"
                    >
                      {cell.day}
                    </span>
                  );
                }

                if (cell.isDisabled) {
                  return (
                    <span
                      key={cell.key}
                      className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center text-[11px] text-gray-300 font-normal select-none cursor-not-allowed"
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
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs transition-all cursor-pointer font-medium select-none ${
                      cell.isSelected
                        ? "bg-[#1877F2] text-white font-bold shadow-md hover:bg-[#00285C]"
                        : cell.isToday
                        ? "border border-[#1877F2] text-[#1877F2] font-semibold hover:bg-blue-50"
                        : "text-gray-800 hover:bg-gray-100"
                    }`}
                  >
                    {cell.day}
                  </button>
                );
              })}
            </div>

            {/* Footer Action Bar */}
            <div className="mt-3.5 pt-2.5 border-t border-gray-100 flex items-center justify-between text-xs font-semibold">
              <button
                type="button"
                onClick={handleClear}
                className="text-gray-500 hover:text-red-500 transition-colors cursor-pointer"
              >
                Clear
              </button>
              <button
                type="button"
                onClick={handleToday}
                className="text-[#1877F2] hover:text-[#00285C] transition-colors cursor-pointer"
              >
                Today
              </button>
            </div>
          </div>
        </div>
      </>
    )}
  </div>
);
}
