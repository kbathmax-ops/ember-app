"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { T } from "./ui/tokens";
import {
  IcoBell,
  IcoGear,
  IcoGlobe,
  IcoPerson,
  IcoPin,
  IcoWind,
} from "./ui/primitives";

const NAV = [
  { id: "home", href: "/map", Icon: IcoPin, badge: false },
  { id: "alert", href: "/alerts", Icon: IcoBell, badge: true },
  { id: "air", href: "/map", Icon: IcoWind, badge: false },
  { id: "profile", href: "/profile", Icon: IcoPerson, badge: false },
  { id: "settings", href: "/profile", Icon: IcoGear, badge: false },
  { id: "landing", href: "/", Icon: IcoGlobe, badge: false },
];

export function NavRail() {
  const pathname = usePathname();
  return (
    <div
      style={{
        width: 56,
        minWidth: 56,
        height: "100%",
        background: T.paper,
        borderRight: `1px solid ${T.rule}`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: 18,
        gap: 2,
        flexShrink: 0,
      }}
    >
      <Link
        href="/"
        style={{
          width: 28,
          height: 28,
          marginBottom: 18,
          background: T.e8,
          borderRadius: 3,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <svg width="12" height="14" viewBox="0 0 12 14">
          <path
            d="M6 1 Q10 3.5 10 7 Q10 11 6 13 Q3.5 11 3 9 Q5 9.5 6.5 8 Q4.5 10 2.5 8 Q1 6.5 2 4.5 Q3.5 2 6 1Z"
            fill="white"
          />
        </svg>
      </Link>
      {NAV.map(({ id, href, Icon, badge }) => {
        const active =
          (id === "home" && pathname === "/map") ||
          (id === "alert" && pathname.startsWith("/alerts")) ||
          (id === "profile" && pathname === "/profile") ||
          (id === "landing" && pathname === "/");
        return (
          <Link
            key={id}
            href={href}
            style={{
              width: 44,
              height: 44,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: active ? T.ink : T.ink40,
              borderLeft: `2px solid ${active ? T.e6 : "transparent"}`,
              transition: "color 150ms, border-color 150ms",
              position: "relative",
            }}
          >
            <Icon />
            {badge && (
              <div
                style={{
                  position: "absolute",
                  top: 9,
                  right: 9,
                  width: 5,
                  height: 5,
                  borderRadius: 99,
                  background: T.e6,
                }}
              />
            )}
          </Link>
        );
      })}
    </div>
  );
}
