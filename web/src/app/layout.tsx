import type { Metadata } from "next";
import { cookies } from "next/headers";
import "./globals.css";
import { ScreenSwitcher } from "@/components/screen-switcher";
import { Analytics } from "@vercel/analytics/react";

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
    <html lang="en" className="h-full">
      <body className="min-h-full font-sans">
        {children}
        {isAdmin && <ScreenSwitcher />}
        <Analytics />
      </body>
    </html>
  );
}
