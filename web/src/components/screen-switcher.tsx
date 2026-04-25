"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const SCREENS: Array<[string, string]> = [
  ["/onboarding", ")01  Onboarding"],
  ["/map", ")02  Smoke Map"],
  ["/alerts/sample", ")03  Alert Detail"],
  ["/profile", ")04  Profile"],
  ["/", ")05  Landing Page"],
];

export function ScreenSwitcher() {
  const pathname = usePathname();
  return (
    <div
      style={{
        position: "fixed",
        bottom: 20,
        left: "50%",
        transform: "translateX(-50%)",
        background: "rgba(17,17,17,0.88)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        borderRadius: 28,
        padding: "6px 8px",
        display: "flex",
        gap: 2,
        zIndex: 100,
        boxShadow: "0 4px 24px rgba(0,0,0,0.18)",
      }}
    >
      {SCREENS.map(([href, label]) => {
        const active =
          (href === "/" && pathname === "/") ||
          (href !== "/" && pathname.startsWith(href.replace("/sample", "")));
        return (
          <Link
            key={href}
            href={href}
            style={{
              height: 36,
              padding: "0 14px",
              borderRadius: 22,
              background: active ? "#F6F4F0" : "transparent",
              color: active ? "#111111" : "rgba(255,255,255,0.52)",
              fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
              fontSize: 11,
              fontWeight: active ? 500 : 400,
              letterSpacing: "0.04em",
              transition: "background 150ms, color 150ms",
              whiteSpace: "nowrap",
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
            }}
          >
            {label}
          </Link>
        );
      })}
    </div>
  );
}
