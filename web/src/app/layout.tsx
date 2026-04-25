import type { Metadata } from "next";
import localFont from "next/font/local";
import { cookies } from "next/headers";
import "./globals.css";
import { ScreenSwitcher } from "@/components/screen-switcher";
import { Analytics } from "@vercel/analytics/react";

const okine = localFont({
  src: [
    { path: "../fonts/Okine-Regular.otf", weight: "400", style: "normal" },
    { path: "../fonts/Okine-Medium.otf", weight: "500", style: "normal" },
    { path: "../fonts/Okine-Bold.otf", weight: "700", style: "normal" },
    { path: "../fonts/Okine-Black.otf", weight: "900", style: "normal" },
  ],
  variable: "--font-okine",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ember — Smoke alerts for your address, not your city",
  description:
    "Personalized wildfire smoke alerts for Canada. Tuned to your address, your health, your tolerance.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const isAdmin = cookieStore.get("ember_admin")?.value === "1";

  return (
    <html lang="en" className={`h-full ${okine.variable}`}>
      <body className="min-h-full font-sans">
        {children}
        {isAdmin && <ScreenSwitcher />}
        <Analytics />
      </body>
    </html>
  );
}
