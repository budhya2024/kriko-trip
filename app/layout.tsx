import type { Metadata } from "next";
import { Suspense } from "react";
import { Poppins } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/shared/AuthContext";
import { SettingsProvider } from "@/components/shared/SettingsContext";
import { getSettings } from "@/lib/api/server/settings";
import RequestCallbackWidget from "@/components/shared/RequestCallbackWidget";

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSettings();

  return (
    <html
      lang="en"
      className={`${poppins.variable} ${poppins.className} h-full antialiased scroll-smooth`}
    >
      <body className={`${poppins.className} min-h-full flex flex-col font-sans antialiased`}>
        <AuthProvider>
          <SettingsProvider settings={settings}>
            {children}
            <Suspense fallback={null}>
              <RequestCallbackWidget />
            </Suspense>
          </SettingsProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
