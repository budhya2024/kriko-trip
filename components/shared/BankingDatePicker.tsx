"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
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

// Weekdays starting on Monday matching reference screenshot
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
  const [tripType, setTripType] = useState<"Round trip" | "One way">("Round trip");
  const [returnDate, setReturnDate] = useState<string>("");
  const [activeMonthPicker, setActiveMonthPicker] = useState<number | null>(null); // 0 for m1, 1 for m2
  const containerRef = useRef<HTMLDivElement>(null);

  const handleClose = () => {
    setIsOpen(false);
    setActiveMonthPicker(null);
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

  // Initialize client date inside useEffect for Next.js SSR/prerender safety
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

  // Navigation handlers
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

  // Day click handler
  const handleSelectDay = (y: number, m: number, d: number) => {
    const monthStr = String(m + 1).padStart(2, "0");
    const dayStr = String(d).padStart(2, "0");
    const dateStr = `${y}-${monthStr}-${dayStr}`;

    const clickedDate = new Date(y, m, d);
    clickedDate.setHours(0, 0, 0, 0);

    // If round-trip is active and start is selected, clicking a date after sets return
    if (tripType === "Round trip" && selectedStartObj && !selectedEndObj) {
      if (clickedDate >= selectedStartObj) {
        setReturnDate(dateStr);
        return;
      }
    }

    // Default / first click: sets departure date
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
  const formatDatePill = (dateObj: Date | null) => {
    if (!dateObj) return "Fri, 24 May";
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

  // Year options list
  const currentYear = today ? today.getFullYear() : 2026;
  const yearOptions = Array.from({ length: 11 }, (_, i) => currentYear + i);

  // Month 1 (Left) and Month 2 (Right) dates
  const m1Date = new Date(viewDate.getFullYear(), viewDate.getMonth(), 1);
  const m2Date = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1);

  // Helper to generate calendar matrix for a month (Monday-start)
  const generateMonthMatrix = (targetDate: Date) => {
    const y = targetDate.getFullYear();
    const m = targetDate.getMonth();
    const daysInMonth = new Date(y, m + 1, 0).getDate();

    // Shift so Monday = 0, ..., Sunday = 6
    const firstDayOfWeek = (new Date(y, m, 1).getDay() + 6) % 7;

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
      const cellDate = new Date(y, m, d);
      cellDate.setHours(0, 0, 0, 0);

      const dayOfWeek = (cellDate.getDay() + 6) % 7;
      const isWeekendSat = dayOfWeek === 5;
      const isWeekendSun = dayOfWeek === 6;

      const isDisabled = effectiveMinDate ? cellDate < effectiveMinDate : false;

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

    return { year: y, month: m, cells };
  };

  const month1 = generateMonthMatrix(m1Date);
  const month2 = generateMonthMatrix(m2Date);

  // Render Month Table (Exact visual matching reference screenshot)
  const renderMonthTable = (
    data: ReturnType<typeof generateMonthMatrix>,
    isSecondMonth = false
  ) => {
    const monthPickerIndex = isSecondMonth ? 1 : 0;
    const isPickerOpen = activeMonthPicker === monthPickerIndex;

    return (
      <div className="flex-1 min-w-0 relative">
        {/* Month Title (Matching Reference: e.g. "May", "June") */}
        <div className="mb-4 px-1 relative">
          <button
            type="button"
            onClick={() =>
              setActiveMonthPicker((prev) =>
                prev === monthPickerIndex ? null : monthPickerIndex
              )
            }
            className="flex items-center gap-1.5 text-base sm:text-lg font-bold text-[#0F172A] hover:text-[#1877F2] transition-colors cursor-pointer group"
          >
            <span>{MONTH_NAMES[data.month]}</span>
            <span className="text-xs font-normal text-gray-400 group-hover:text-gray-600">
              {data.year}
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#1877F2]" />
          </button>

          {/* Clean Quick Month & Year Picker Dropdown */}
          {isPickerOpen && (
            <div className="absolute top-8 left-0 z-30 bg-white rounded-xl shadow-xl border border-gray-200 p-3 w-[260px] animate-in fade-in zoom-in-95 duration-100">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-gray-100">
                <span className="text-xs font-semibold text-gray-700">Select Month & Year</span>
                <select
                  value={data.year}
                  onChange={(e) => {
                    const newY = parseInt(e.target.value);
                    setViewDate(new Date(newY, viewDate.getMonth(), 1));
                  }}
                  className="text-xs font-bold text-[#1877F2] bg-blue-50 px-2 py-0.5 rounded cursor-pointer border-none outline-none"
                >
                  {yearOptions.map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-3 gap-1.5">
                {MONTH_NAMES.map((name, idx) => (
                  <button
                    key={name}
                    type="button"
                    onClick={() => {
                      setViewDate(
                        new Date(data.year, isSecondMonth ? idx - 1 : idx, 1)
                      );
                      setActiveMonthPicker(null);
                    }}
                    className={`py-1.5 px-2 rounded-lg text-xs font-medium transition-colors ${
                      idx === data.month
                        ? "bg-[#1877F2] text-white font-semibold"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {name.slice(0, 3)}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Weekday Row: Mon-Fri gray, Sat blue, Sun red */}
        <div className="grid grid-cols-7 gap-y-1 mb-2.5 text-center select-none">
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

        {/* Days Grid: Mon-Fri dark, Sat light-blue, Sun red, Solid blue active circle, Light-blue range ribbon */}
        <div className="grid grid-cols-7 gap-y-1.5 text-center">
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
            const hasRange = Boolean(selectedStartObj && selectedEndObj);

            return (
              <div
                key={`day-${cell.day}-${idx}`}
                className="relative h-9 sm:h-10 flex items-center justify-center"
              >
                {/* ─── Continuous Range Ribbon matching Screenshot ─── */}
                {hasRange && (
                  <>
                    {/* Start Date: ribbon flows from center to right */}
                    {cell.isStart && (
                      <div className="absolute top-0 bottom-0 left-1/2 right-0 bg-[#EEF4FF] z-0" />
                    )}
                    {/* In-between Dates: full background ribbon */}
                    {cell.isInRange && (
                      <div className="absolute inset-0 bg-[#EEF4FF] z-0" />
                    )}
                    {/* End Date: ribbon flows from left into center */}
                    {cell.isEnd && (
                      <div className="absolute top-0 bottom-0 left-0 right-1/2 bg-[#EEF4FF] z-0" />
                    )}
                  </>
                )}

                {cell.isDisabled ? (
                  <span className="text-sm text-gray-300 font-normal select-none cursor-not-allowed relative z-10">
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
                        ? "bg-[#1877F2] text-white font-bold shadow-xs hover:bg-[#1565C0]"
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

      {/* ─── Exact Reference Calendar Card ─── */}
      {(inline || isOpen) && (
        <>
          {/* Mobile Backdrop */}
          {!inline && (
            <div
              className="sm:hidden fixed inset-0 z-[120] bg-black/40 backdrop-blur-xs animate-in fade-in duration-150"
              onClick={handleClose}
            />
          )}

          {/* Calendar Card: Matches Reference Screenshot Pixel-by-Pixel */}
          <div
            className={
              inline
                ? "relative w-full bg-white rounded-xl shadow-xl border border-gray-200/90 p-4 sm:p-7 z-50 animate-in fade-in duration-150"
                : "fixed sm:absolute inset-x-2 sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 top-1/2 -translate-y-1/2 sm:translate-y-0 sm:top-[calc(100%+8px)] z-[130] sm:z-50 mx-auto sm:mx-0 w-[calc(100%-16px)] max-w-[760px] md:w-[740px] bg-white rounded-xl shadow-2xl border border-gray-200/90 p-4 sm:p-7 animate-in fade-in zoom-in-95 sm:zoom-in-100 duration-150"
            }
          >
            {/* ─── Top Bar: "Round trip ▾", "Reset", and Dual Date Input Boxes ─── */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-6 mb-6 border-b border-gray-100">
              {/* Left Side: "Round trip ▾" & "Reset" */}
              <div className="flex items-center gap-6">
                <button
                  type="button"
                  onClick={() =>
                    setTripType((prev) =>
                      prev === "Round trip" ? "One way" : "Round trip"
                    )
                  }
                  className="flex items-center gap-1.5 text-[15px] font-semibold text-[#1e293b] hover:text-[#1877F2] transition-colors cursor-pointer"
                >
                  <span>{tripType}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                </button>

                <button
                  type="button"
                  onClick={handleReset}
                  className="text-[14px] font-medium text-[#3b82f6] hover:underline cursor-pointer"
                >
                  Reset
                </button>
              </div>

              {/* Right Side: Departure Box & Return Box */}
              <div className="flex items-center gap-3">
                {/* Departure Box (Active Outline matching screenshot) */}
                <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-md border border-[#3b82f6] bg-[#f0f6ff]/40">
                  <Calendar className="w-4 h-4 text-[#3b82f6] shrink-0" />
                  <span className="text-[14px] font-semibold text-[#1e293b]">
                    {formatDatePill(selectedStartObj)}
                  </span>
                  <div className="flex items-center gap-1 ml-1.5">
                    <button
                      type="button"
                      disabled={isPrevMonthDisabled}
                      onClick={() => handlePrevMonth()}
                      className={`w-5 h-5 rounded-full flex items-center justify-center transition-colors ${
                        isPrevMonthDisabled
                          ? "text-gray-300 cursor-not-allowed"
                          : "hover:bg-blue-100 text-[#3b82f6] cursor-pointer"
                      }`}
                      aria-label="Previous Month"
                    >
                      <ChevronLeft className="w-3.5 h-3.5 stroke-[2.5]" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleNextMonth()}
                      className="w-5 h-5 rounded-full hover:bg-blue-100 flex items-center justify-center text-[#3b82f6] transition-colors cursor-pointer"
                      aria-label="Next Month"
                    >
                      <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
                    </button>
                  </div>
                </div>

                {/* Return Box (matching screenshot) */}
                <div
                  onClick={() => setTripType("Round trip")}
                  className={`hidden sm:flex items-center gap-2.5 px-3 py-1.5 rounded-md border transition-all cursor-pointer ${
                    selectedEndObj
                      ? "border-[#3b82f6] bg-[#f0f6ff]/40"
                      : "border-gray-200 bg-white hover:border-gray-300"
                  }`}
                >
                  <Calendar
                    className={`w-4 h-4 shrink-0 ${
                      selectedEndObj ? "text-[#3b82f6]" : "text-gray-400"
                    }`}
                  />
                  <span
                    className={`text-[14px] font-semibold ${
                      selectedEndObj ? "text-[#1e293b]" : "text-gray-400"
                    }`}
                  >
                    {selectedEndObj
                      ? formatDatePill(selectedEndObj)
                      : formatDatePill(selectedStartObj)}
                  </span>
                  <div className="flex items-center gap-1 ml-1.5">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center text-gray-300">
                      <ChevronLeft className="w-3.5 h-3.5 stroke-[2.5]" />
                    </div>
                    <div className="w-5 h-5 rounded-full flex items-center justify-center text-gray-300">
                      <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ─── Dual-Month Calendar Body with Floating Chevrons ─── */}
            <div className="relative">
              {/* Floating Left Circular Arrow Button matching screenshot */}
              <button
                type="button"
                disabled={isPrevMonthDisabled}
                onClick={() => handlePrevMonth()}
                className={`hidden md:flex absolute -left-5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white shadow-md border border-gray-200 items-center justify-center transition-all ${
                  isPrevMonthDisabled
                    ? "opacity-30 cursor-not-allowed"
                    : "text-[#1877F2] hover:bg-blue-50 cursor-pointer hover:scale-105"
                }`}
                aria-label="Previous Month"
              >
                <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
              </button>

              {/* Floating Right Circular Arrow Button matching screenshot */}
              <button
                type="button"
                onClick={() => handleNextMonth()}
                className="hidden md:flex absolute -right-5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white shadow-md border border-gray-200 items-center justify-center text-[#1877F2] hover:bg-blue-50 transition-all hover:scale-105 cursor-pointer"
                aria-label="Next Month"
              >
                <ChevronRight className="w-4 h-4 stroke-[2.5]" />
              </button>

              {/* 2 Months Side by Side (Desktop) or 1 Month (Mobile) */}
              <div className="flex flex-col md:flex-row gap-8 md:gap-14">
                {renderMonthTable(month1, false)}
                <div className="hidden md:block flex-1 min-w-0">
                  {renderMonthTable(month2, true)}
                </div>
              </div>
            </div>

            {/* ─── Bottom Footer: Single Solid Blue "Done" Button matching screenshot ─── */}
            <div className="mt-8 pt-4 flex items-center justify-end">
              <button
                type="button"
                onClick={handleDone}
                className="bg-[#1877F2] hover:bg-[#1565C0] text-white font-semibold text-sm px-8 py-2.5 rounded-md shadow-xs active:scale-95 transition-all cursor-pointer"
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
