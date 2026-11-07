import React from "react";
import Link from "next/link";
import { Header, Footer, ScrollToTop } from "@/components/shared";

export const metadata = {
    title: "Contact Us | KrikoTrip Travel Agency",
    description:
        "Get in touch with KrikoTrip Travel Agency for all your tour and booking needs.",
};

export default function ContactUsPage() {
    return (
        <div className="min-h-screen bg-white flex flex-col font-sans">
            <Header />
            <main className="flex-1">
                <section className="w-full bg-[#08182B] text-white py-14 sm:py-16 text-center">
                    <div className="container">
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
                            Contact Us
                        </h1>
                        <div className="flex items-center justify-center gap-2 mt-3 text-sm text-gray-300 font-medium">
                            <Link href="/" className="hover:text-white transition-colors">
                                Home
                            </Link>
                            <span>/</span>
                            <span className="text-[#1877F2]">Contact Us</span>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
            <ScrollToTop />
        </div>
    );
}
