import type { Metadata } from "next";
import "./globals.css";
import { ScreenSwitcher } from "@/components/screen-switcher";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: "Ember — Smoke alerts for your address, not your city",
  description:
    "Personalized wildfire smoke alerts for Canada. Tuned to your address, your health, your tolerance.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full font-sans">
        {children}
        <ScreenSwitcher />
        <Analytics />
      </body>
    </html>
  );
}
