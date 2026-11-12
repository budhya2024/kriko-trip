"use client";

import React from "react";
import {
  Building,
  Utensils,
  Car,
  Users,
  Languages,
  PawPrint,
  Calendar,
  Leaf,
  Tag,
} from "lucide-react";

interface PackageAboutSpecsProps {
  overview: string;
  hotelStars?: number;
}

/**
 * Renders the "About Tour Package" overview paragraph and 9-item specification grid.
 */
export default function PackageAboutSpecs({
  overview,
  hotelStars = 5,
}: PackageAboutSpecsProps) {
  return (
    <div className="mt-6 md:mt-10">
      <h2 className="text-2xl sm:text-[26px] font-semibold text-gray-900 mb-3 tracking-tight">
        About Tour Package
      </h2>
      <p className="text-sm sm:text-[15px] text-gray-600 leading-relaxed font-normal mb-7">
        {overview}
      </p>

      {/* 9-Item Specs Box */}
      <div className="rounded-2xl border border-gray-200/90 bg-white p-4 sm:p-8 shadow-xs">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-y-5 sm:gap-y-7 gap-x-4 sm:gap-x-8">
          <div className="flex items-center gap-3.5">
            <Building className="w-5 h-5 text-gray-500 shrink-0 stroke-[1.6]" />
            <div>
              <span className="block text-xs sm:text-[13px] text-gray-500 font-normal">
                Accomodation
              </span>
              <span className="text-sm sm:text-[15px] font-semibold text-gray-900">
                {hotelStars} Star Hotel
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <Utensils className="w-5 h-5 text-gray-500 shrink-0 stroke-[1.6]" />
            <div>
              <span className="block text-xs sm:text-[13px] text-gray-500 font-normal">
                Meals
              </span>
              <span className="text-sm sm:text-[15px] font-semibold text-gray-900">
                Breakfast &amp; Dinner
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <Car className="w-5 h-5 text-gray-500 shrink-0 stroke-[1.6]" />
            <div>
              <span className="block text-xs sm:text-[13px] text-gray-500 font-normal">
                Transportation
              </span>
              <span className="text-sm sm:text-[15px] font-semibold text-gray-900">
                Taxi,Car
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <Users className="w-5 h-5 text-gray-500 shrink-0 stroke-[1.6]" />
            <div>
              <span className="block text-xs sm:text-[13px] text-gray-500 font-normal">
                Group Size
              </span>
              <span className="text-sm sm:text-[15px] font-semibold text-gray-900">
                10-20
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <Languages className="w-5 h-5 text-gray-500 shrink-0 stroke-[1.6]" />
            <div>
              <span className="block text-xs sm:text-[13px] text-gray-500 font-normal">
                Language
              </span>
              <span className="text-sm sm:text-[15px] font-semibold text-gray-900">
                English, Spanish
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <PawPrint className="w-5 h-5 text-gray-500 shrink-0 stroke-[1.6]" />
            <div>
              <span className="block text-xs sm:text-[13px] text-gray-500 font-normal">
                Animal
              </span>
              <span className="text-sm sm:text-[15px] font-semibold text-gray-900">
                Cat, Pet only
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <Calendar className="w-5 h-5 text-gray-500 shrink-0 stroke-[1.6]" />
            <div>
              <span className="block text-xs sm:text-[13px] text-gray-500 font-normal">
                Age Range
              </span>
              <span className="text-sm sm:text-[15px] font-semibold text-gray-900">
                18-45 (Year)
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <Leaf className="w-5 h-5 text-gray-500 shrink-0 stroke-[1.6]" />
            <div>
              <span className="block text-xs sm:text-[13px] text-gray-500 font-normal">
                Season
              </span>
              <span className="text-sm sm:text-[15px] font-semibold text-gray-900">
                Winter Season
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <Tag className="w-5 h-5 text-gray-500 shrink-0 stroke-[1.6]" />
            <div>
              <span className="block text-xs sm:text-[13px] text-gray-500 font-normal">
                Category
              </span>
              <span className="text-sm sm:text-[15px] font-semibold text-gray-900">
                Adventure
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

