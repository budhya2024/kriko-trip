import type { Metadata } from "next";
import { Suspense } from "react";
import { Poppins } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/shared/AuthContext";
import RequestCallbackWidget from "@/components/shared/RequestCallbackWidget";
import TravelAssistantWidget from "@/components/shared/TravelAssistantWidget";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "KrikoTrip - All-in-one Travel Booking",
  description: "Find Your Perfect Tour Package with KrikoTrip",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${poppins.className} h-full antialiased scroll-smooth`}
    >
      <body className={`${poppins.className} min-h-full flex flex-col font-sans antialiased`}>
        <AuthProvider>
          {children}
          <Suspense fallback={null}>
            <RequestCallbackWidget />
            <TravelAssistantWidget />
          </Suspense>
        </AuthProvider>
      </body>
    </html>
  );
}
