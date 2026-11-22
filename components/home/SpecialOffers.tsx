import React from "react";
import SpecialOffersSlider, { OfferSlideItem } from "./SpecialOffersSlider";
import { getOffers } from "@/lib/api/server/offers";

import offerImg1 from "@/public/assets/images/home1-offer-img2-4-2.webp";
import offerImg2 from "@/public/assets/images/home1-offer-img3-4-2.webp";
import offerImg3 from "@/public/assets/images/home1-offer-img4-4-2.webp";
import offerImg4 from "@/public/assets/images/home1-offer-img5-4-2.webp";

const fallbackOffers: OfferSlideItem[] = [
  {
    id: "fallback-1",
    image: offerImg1,
    title: "Exclusive Tour Package Offer",
    href: "/tour-packages",
  },
  {
    id: "fallback-2",
    image: offerImg2,
    title: "Save Upto 40% OFF - Family Travel Tour",
    href: "/tour-packages",
  },
  {
    id: "fallback-3",
    image: offerImg3,
    title: "Andaman Islands - Total Price ₹18,500",
    href: "/tour-packages/andaman-short-stay",
  },
  {
    id: "fallback-4",
    image: offerImg4,
    title: "Travel Across Incredible India - 30% OFF",
    href: "/tour-packages",
  },
];

export default async function SpecialOffers() {
  const cmsOffers = await getOffers();

  const offers: OfferSlideItem[] =
    cmsOffers.length > 0
      ? cmsOffers.map((o) => ({
          id: o.id,
          title: o.title,
          href: o.linkUrl || "/tour-packages",
          image: o.photoUrl || fallbackOffers[0]!.image,
        }))
      : fallbackOffers;

  return (
    <section className="w-full bg-white py-8 md:py-16">
      <div className="container">
        <div className="text-center max-w-lg mx-auto pb-6 md:pb-8">
          <h2 className="section-title">
            Discounts &amp; Offers
          </h2>
          <p className="section-details max-w-xl mx-auto">
            A curated list of the most popular travel packages based on different
            destinations.
          </p>
        </div>

        <SpecialOffersSlider offers={offers} />
      </div>
    </section>
  );
}
