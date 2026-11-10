"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  X,
  RotateCcw,
} from "lucide-react";

interface BankingDatePickerProps {
  value: string; // YYYY-MM-DD
  onChange: (dateStr: string) => void;
  placeholder?: string;
  label?: string;
  minDate?: string; // YYYY-MM-DD
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

// Week starts on Monday matching reference screenshot
const WEEK_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

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
  const [tripType, setTripType] = useState<"One way" | "Round trip">("One way");
  const [returnDate, setReturnDate] = useState<string>("");
  const containerRef = useRef<HTMLDivElement>(null);

  const handleClose = () => {
    setIsOpen(false);
    if (onClose) onClose();
  };

  // Base view date (Month 1 on left)
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

  // Initialize client date in useEffect for SSR/prerender compatibility
  useEffect(() => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    setToday(now);
    if (!value) {
      setViewDate(new Date(now.getFullYear(), now.getMonth(), 1));
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

  // Navigation handlers (moves by 1 month)
  const isPrevMonthDisabled = today
    ? viewDate.getFullYear() < today.getFullYear() ||
      (viewDate.getFullYear() === today.getFullYear() &&
        viewDate.getMonth() <= today.getMonth())
    : false;

  const handlePrevMonth = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (isPrevMonthDisabled) return;
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1));
  };

  const handleNextMonth = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1));
  };

  // Day selection (handles single date or round-trip range)
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

    // Default: set departure date
    onChange(dateStr);
    setReturnDate("");
  };

  // Reset / Clear handler
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

  // Format date helper: "Fri, 24 May"
  const formatDatePill = (dateObj: Date | null) => {
    if (!dateObj) return "Select date";
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

  // Current year & range options for dropdowns
  const currentYear = today ? today.getFullYear() : 2026;
  const yearOptions = Array.from({ length: 11 }, (_, i) => currentYear + i);

  // Month 1 (Left) & Month 2 (Right) dates
  const m1Date = new Date(viewDate.getFullYear(), viewDate.getMonth(), 1);
  const m2Date = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1);

  // Helper to generate calendar matrix for a given month (Monday-start)
  const generateMonthMatrix = (targetDate: Date) => {
    const y = targetDate.getFullYear();
    const m = targetDate.getMonth();
    const daysInMonth = new Date(y, m + 1, 0).getDate();

    // In JS getDay(): Sunday = 0, Monday = 1, ... Saturday = 6
    // Shift so Monday = 0, ..., Sunday = 6
    const firstDayOfWeek = (new Date(y, m, 1).getDay() + 6) % 7;

    const cells: {
      day: number | null;
      fullDate?: Date;
      isWeekendSat?: boolean;
      isWeekendSun?: boolean;
      isDisabled?: boolean;
      isToday?: boolean;
      isStart?: boolean;
      isEnd?: boolean;
      isInRange?: boolean;
    }[] = [];

    // Leading empty slots for preceding month
    for (let i = 0; i < firstDayOfWeek; i++) {
      cells.push({ day: null });
    }

    // Days in current month
    for (let d = 1; d <= daysInMonth; d++) {
      const cellDate = new Date(y, m, d);
      cellDate.setHours(0, 0, 0, 0);

      const dayOfWeek = (cellDate.getDay() + 6) % 7;
      const isWeekendSat = dayOfWeek === 5;
      const isWeekendSun = dayOfWeek === 6;

      const isDisabled = effectiveMinDate ? cellDate < effectiveMinDate : false;
      const isToday = today ? cellDate.getTime() === today.getTime() : false;

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
        isToday,
        isStart: Boolean(isStart),
        isEnd: Boolean(isEnd),
        isInRange: Boolean(isInRange),
      });
    }

    return { year: y, month: m, cells };
  };

  const month1 = generateMonthMatrix(m1Date);
  const month2 = generateMonthMatrix(m2Date);

  // Month Table Component
  const renderMonthTable = (
    data: ReturnType<typeof generateMonthMatrix>,
    isSecondMonth = false
  ) => {
    return (
      <div className="flex-1 min-w-0">
        {/* Month Header with Year & Month Dropdown Select */}
        <div className="flex items-center gap-1.5 mb-4 px-1">
          <select
            value={data.month}
            onChange={(e) => {
              const newM = parseInt(e.target.value);
              setViewDate(
                new Date(data.year, isSecondMonth ? newM - 1 : newM, 1)
              );
            }}
            className="text-base sm:text-lg font-bold text-[#0F172A] bg-transparent hover:bg-gray-100 rounded-md px-1.5 py-0.5 cursor-pointer outline-none transition-colors"
          >
            {MONTH_NAMES.map((name, idx) => (
              <option key={name} value={idx}>
                {name}
              </option>
            ))}
          </select>

          <select
            value={data.year}
            onChange={(e) => {
              const newY = parseInt(e.target.value);
              setViewDate(new Date(newY, viewDate.getMonth(), 1));
            }}
            className="text-base sm:text-lg font-bold text-[#0F172A] bg-transparent hover:bg-gray-100 rounded-md px-1.5 py-0.5 cursor-pointer outline-none transition-colors"
          >
            {yearOptions.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>

        {/* Weekday Row (Mon-Fri gray, Sat blue-tint, Sun red-tint) */}
        <div className="grid grid-cols-7 gap-y-1 mb-2 text-center select-none">
          {WEEK_DAYS.map((wd, idx) => (
            <span
              key={wd}
              className={`text-[12px] font-normal ${
                idx === 5
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

        {/* Days Grid (Starts on Monday, Sat blue, Sun red, Blue circle on active, Light blue range ribbon) */}
        <div className="grid grid-cols-7 gap-y-1 text-center">
          {data.cells.map((cell, idx) => {
            if (!cell.day || !cell.fullDate) {
              return (
                <div
                  key={`empty-${idx}`}
                  className="h-9 sm:h-10 w-full"
                />
              );
            }

            const isHighlighted = cell.isStart || cell.isEnd;

            return (
              <div
                key={`day-${cell.day}-${idx}`}
                className={`relative h-9 sm:h-10 flex items-center justify-center ${
                  cell.isInRange ? "bg-[#EEF4FF]" : ""
                } ${
                  cell.isStart && selectedEndObj
                    ? "rounded-l-full bg-gradient-to-r from-transparent to-[#EEF4FF]"
                    : ""
                } ${
                  cell.isEnd && selectedStartObj
                    ? "rounded-r-full bg-gradient-to-l from-transparent to-[#EEF4FF]"
                    : ""
                }`}
              >
                {cell.isDisabled ? (
                  <span className="text-sm text-gray-300 font-normal select-none cursor-not-allowed">
                    {cell.day}
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={() =>
                      handleSelectDay(data.year, data.month, cell.day!)
                    }
                    className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-sm font-medium transition-all cursor-pointer relative z-10 ${
                      isHighlighted
                        ? "bg-[#1877F2] text-white font-bold shadow-sm"
                        : cell.isWeekendSun
                        ? "text-[#ef4444] hover:bg-gray-100"
                        : cell.isWeekendSat
                        ? "text-[#60a5fa] hover:bg-gray-100"
                        : "text-gray-700 hover:bg-gray-100 active:scale-95"
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
    );
  };

  return (
    <div ref={containerRef} className={`relative w-full ${className}`}>
      {/* ─── Clean Trigger Input (when not inline) ─── */}
      {!inline && (
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between gap-2 px-3.5 py-2.5 rounded-lg border border-gray-300 hover:border-gray-400 focus:border-[#1877F2] bg-white transition-colors shadow-2xs text-left cursor-pointer group"
        >
          <div className="flex items-center gap-2.5 min-w-0">
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
          </div>
          <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-gray-600 shrink-0 transition-transform duration-200" />
        </button>
      )}

      {/* ─── Reference Design Calendar Card ─── */}
      {(inline || isOpen) && (
        <>
          {/* Mobile Backdrop */}
          {!inline && (
            <div
              className="sm:hidden fixed inset-0 z-[120] bg-black/40 backdrop-blur-xs animate-in fade-in duration-150"
              onClick={handleClose}
            />
          )}

          {/* Calendar Container matching Reference Image */}
          <div
            className={
              inline
                ? "relative w-full bg-white rounded-2xl shadow-xl border border-gray-100 p-4 sm:p-6 z-50 animate-in fade-in duration-150"
                : "fixed sm:absolute inset-x-2 sm:inset-x-auto sm:left-0 top-1/2 -translate-y-1/2 sm:translate-y-0 sm:top-[calc(100%+8px)] z-[130] sm:z-50 mx-auto sm:mx-0 w-[calc(100%-16px)] max-w-[740px] md:w-[720px] bg-white rounded-2xl shadow-2xl border border-gray-150 p-4 sm:p-6 animate-in fade-in zoom-in-95 sm:zoom-in-100 duration-150"
            }
          >
            {/* ─── Top Bar: Trip Type, Reset, Departure Date Pill & Return Date Pill ─── */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-5 mb-5 border-b border-gray-100">
              {/* Left: Round trip / One way & Reset */}
              <div className="flex items-center gap-4">
                <div className="relative">
                  <button
                    type="button"
                    onClick={() =>
                      setTripType((prev) =>
                        prev === "One way" ? "Round trip" : "One way"
                      )
                    }
                    className="flex items-center gap-1.5 text-sm font-semibold text-[#0F172A] hover:text-[#1877F2] transition-colors cursor-pointer"
                  >
                    <span>{tripType}</span>
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleReset}
                  className="text-sm font-medium text-[#1877F2] hover:underline cursor-pointer"
                >
                  Reset
                </button>
              </div>

              {/* Right: Date Pills Side-by-Side (Departure & Return) */}
              <div className="flex items-center gap-2.5">
                {/* Departure Date Pill (Active) */}
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[#60A5FA] bg-[#F0F6FF]">
                  <Calendar className="w-4 h-4 text-[#1877F2] shrink-0" />
                  <span className="text-xs sm:text-sm font-medium text-[#0F172A]">
                    {formatDatePill(selectedStartObj)}
                  </span>
                  <div className="flex items-center gap-0.5 ml-1">
                    <button
                      type="button"
                      disabled={isPrevMonthDisabled}
                      onClick={() => handlePrevMonth()}
                      className={`w-5 h-5 rounded-full flex items-center justify-center transition-colors ${
                        isPrevMonthDisabled
                          ? "text-gray-300 cursor-not-allowed"
                          : "hover:bg-blue-100 text-[#1877F2] cursor-pointer"
                      }`}
                      aria-label="Previous Month"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleNextMonth()}
                      className="w-5 h-5 rounded-full hover:bg-blue-100 flex items-center justify-center text-[#1877F2] transition-colors cursor-pointer"
                      aria-label="Next Month"
                    >
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Return Date Pill (Optional / Round-trip) */}
                <div
                  onClick={() => setTripType("Round trip")}
                  className={`hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                    selectedEndObj
                      ? "border-[#60A5FA] bg-[#F0F6FF]"
                      : "border-gray-200 bg-white hover:border-gray-300"
                  }`}
                >
                  <Calendar
                    className={`w-4 h-4 shrink-0 ${
                      selectedEndObj ? "text-[#1877F2]" : "text-gray-400"
                    }`}
                  />
                  <span
                    className={`text-xs sm:text-sm font-medium ${
                      selectedEndObj ? "text-[#0F172A]" : "text-gray-500"
                    }`}
                  >
                    {selectedEndObj
                      ? formatDatePill(selectedEndObj)
                      : "Return date"}
                  </span>
                  <div className="flex items-center gap-0.5 ml-1">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center text-gray-400">
                      <ChevronLeft className="w-3.5 h-3.5" />
                    </div>
                    <div className="w-5 h-5 rounded-full flex items-center justify-center text-gray-400">
                      <ChevronRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ─── Dual-Month Calendar Body with Floating Chevrons ─── */}
            <div className="relative">
              {/* Floating Left Arrow Button */}
              <button
                type="button"
                disabled={isPrevMonthDisabled}
                onClick={() => handlePrevMonth()}
                className={`hidden md:flex absolute -left-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white shadow-md border border-gray-200 items-center justify-center transition-all ${
                  isPrevMonthDisabled
                    ? "opacity-30 cursor-not-allowed"
                    : "text-[#1877F2] hover:bg-blue-50 cursor-pointer hover:scale-105"
                }`}
                aria-label="Previous Month"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {/* Floating Right Arrow Button */}
              <button
                type="button"
                onClick={() => handleNextMonth()}
                className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white shadow-md border border-gray-200 items-center justify-center text-[#1877F2] hover:bg-blue-50 transition-all hover:scale-105 cursor-pointer"
                aria-label="Next Month"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              {/* 2 Months Side by Side (Desktop) or 1 Month (Mobile) */}
              <div className="flex flex-col md:flex-row gap-6 md:gap-10">
                {renderMonthTable(month1, false)}
                <div className="hidden md:block flex-1 min-w-0">
                  {renderMonthTable(month2, true)}
                </div>
              </div>
            </div>

            {/* ─── Bottom Footer Bar: Done Button ─── */}
            <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
              <span className="text-xs text-gray-400 font-normal">
                {selectedStartObj
                  ? `Selected: ${formatTriggerDisplay(selectedStartObj)}${
                      selectedEndObj
                        ? ` → ${formatTriggerDisplay(selectedEndObj)}`
                        : ""
                    }`
                  : "Pick your travel departure date"}
              </span>

              <button
                type="button"
                onClick={handleDone}
                className="bg-[#1877F2] hover:bg-[#1565C0] text-white font-semibold text-sm px-8 py-2.5 rounded-lg shadow-sm active:scale-95 transition-all cursor-pointer"
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
