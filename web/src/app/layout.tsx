import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ember — Smoke Alert",
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
      <body className="min-h-full font-sans">{children}</body>
    </html>
  );
}
