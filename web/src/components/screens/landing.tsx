"use client";

import Link from "next/link";
import { T, FONT } from "../ui/tokens";
import { Eyebrow, Photo, Sparkline } from "../ui/primitives";

const ROWS: Array<{ num: string; title: string; desc: string; flip: boolean }> = [
  {
    num: ")01",
    title: "Real-time wildfire signal",
    desc: "We pull from CWFIS, VIIRS satellite detections, and ECCC's FireWork smoke forecast — refreshed every 10 minutes. No delays.",
    flip: false,
  },
  {
    num: ")02",
    title: "Your risk, not average risk",
    desc: "AQHI is calibrated for general population. Ember layers your address, household, and respiratory profile to compute the alert that's actually for you.",
    flip: true,
  },
  {
    num: ")03",
    title: "Clear when clear",
    desc: "We tell you when air returns to your personal safe AQHI. No vague \"improving conditions\" or generic Special Air Quality Statements.",
    flip: false,
  },
];

export function Landing() {
  return (
    <div
      style={{
        minHeight: "100dvh",
        overflowY: "auto",
        background: T.paper,
        fontFamily: FONT.sans,
      }}
    >
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 10,
          background: T.paper,
          borderBottom: `1px solid ${T.rule}`,
          padding: "0 52px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 52,
          flexShrink: 0,
        }}
      >
        <Link
          href="/"
          style={{ display: "flex", alignItems: "center", gap: 10, padding: 0 }}
        >
          <div
            style={{
              width: 22,
              height: 22,
              background: T.e8,
              borderRadius: 3,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="10" height="12" viewBox="0 0 10 12">
              <path
                d="M5 0.5Q9 3 9 6.5Q9 10.5 5 12Q2.5 10.5 2 8.5Q4 9 5.5 7.5Q3.5 9.5 1.5 8Q0 6.5 1 5Q2.5 2 5 0.5Z"
                fill="white"
              />
            </svg>
          </div>
          <span
            style={{
              fontSize: 14,
              fontWeight: 500,
              color: T.ink,
              letterSpacing: "-0.01em",
            }}
          >
            Ember
          </span>
        </Link>
        <div style={{ display: "flex", gap: 40, alignItems: "center" }}>
          {["Features", "How it works", "Pricing"].map((l) => (
            <span
              key={l}
              style={{
                fontSize: 13,
                color: T.ink60,
                cursor: "pointer",
                letterSpacing: "0.01em",
              }}
            >
              {l}
            </span>
          ))}
        </div>
        <Link
          href="/login"
          style={{
            height: 36,
            padding: "0 18px",
            background: T.e8,
            color: T.white,
            fontSize: 13,
            fontWeight: 500,
            borderRadius: 18,
            display: "flex",
            alignItems: "center",
          }}
        >
          Reserve — $1
        </Link>
      </header>

      <section
        style={{
          display: "flex",
          minHeight: "calc(100dvh - 52px)",
        }}
      >
        <div
          style={{
            width: "50%",
            padding: "72px 56px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <h1
            style={{
              fontSize: 68,
              lineHeight: "64px",
              letterSpacing: "-0.02em",
              fontWeight: 200,
              color: T.ink,
              maxWidth: 520,
            }}
          >
            The smoke app for people with lungs.
          </h1>
          <p
            style={{
              marginTop: 24,
              fontSize: 18,
              lineHeight: "26px",
              fontWeight: 300,
              color: T.ink60,
              maxWidth: 460,
            }}
          >
            We tell you what you&apos;re smelling, when it clears, and whether
            it&apos;s safe for your body. British Columbia, Alberta,
            Saskatchewan, Ontario. $29 a year.
          </p>
          <div style={{ marginTop: 40, display: "flex", gap: 14, alignItems: "center" }}>
            <Link
              href="/login"
              style={{
                height: 52,
                padding: "0 28px",
                background: T.e8,
                color: T.white,
                fontSize: 15,
                fontWeight: 500,
                display: "flex",
                alignItems: "center",
              }}
            >
              Reserve &nbsp;— &nbsp;$1
            </Link>
            <Link
              href="/map"
              style={{
                height: 52,
                padding: "0 24px",
                border: `1px solid ${T.rule}`,
                color: T.ink,
                fontSize: 15,
                display: "flex",
                alignItems: "center",
              }}
            >
              See the map
            </Link>
          </div>
          <div
            style={{
              marginTop: 48,
              paddingTop: 24,
              borderTop: `1px solid ${T.rule}`,
              fontSize: 11,
              color: T.ink40,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            In development · Vancouver + Calgary · Est. 2026
          </div>
        </div>
        <div style={{ width: "50%", position: "relative" }}>
          <Photo label="wildfire smoke · interior bc · golden hour" style={{ height: "100%" }} />
          <div
            style={{
              position: "absolute",
              bottom: 32,
              left: 28,
              width: 300,
              background: T.white,
              padding: "18px 20px",
              borderTop: `2px solid ${T.e6}`,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                marginBottom: 10,
              }}
            >
              <Eyebrow n={0} label="Live · Vancouver" />
              <div
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: 3,
                  background: T.e6,
                  animation: "pulse-badge 2s ease-in-out infinite",
                }}
              />
            </div>
            <div
              style={{
                fontSize: 15,
                color: T.ink,
                fontWeight: 400,
                lineHeight: "20px",
                marginBottom: 12,
              }}
            >
              Pemberton RX clearing 19:00
            </div>
            <Sparkline />
          </div>
        </div>
      </section>

      {ROWS.map(({ num, title, desc, flip }) => (
        <section
          key={num}
          style={{
            display: "flex",
            height: 420,
            borderTop: `1px solid ${T.rule}`,
            flexDirection: flip ? "row-reverse" : "row",
          }}
        >
          <Photo label={`editorial · ${title.toLowerCase()}`} style={{ width: "50%" }} />
          <div
            style={{
              width: "50%",
              padding: "52px 56px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              background: flip ? T.white : T.paper,
            }}
          >
            <div
              style={{
                fontSize: 11,
                color: T.e6,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                fontWeight: 500,
                marginBottom: 16,
              }}
            >
              {num}
            </div>
            <h2
              style={{
                fontSize: 32,
                lineHeight: "34px",
                letterSpacing: "-0.015em",
                fontWeight: 400,
                color: T.ink,
                marginBottom: 16,
              }}
            >
              {title}
            </h2>
            <p
              style={{
                fontSize: 15,
                lineHeight: "22px",
                fontWeight: 300,
                color: T.ink60,
                maxWidth: 360,
              }}
            >
              {desc}
            </p>
          </div>
        </section>
      ))}

      <footer
        style={{
          borderTop: `1px solid ${T.rule}`,
          padding: "20px 52px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ fontSize: 11, color: T.ink40, letterSpacing: "0.04em" }}>
          Ember &nbsp;&nbsp;Est. 2026 &nbsp;&nbsp;Vancouver + Calgary
        </div>
        <div style={{ display: "flex", gap: 24 }}>
          {["Privacy", "Terms", "Contact"].map((l) => (
            <span
              key={l}
              style={{
                fontSize: 11,
                color: T.ink40,
                cursor: "pointer",
                letterSpacing: "0.04em",
              }}
            >
              {l}
            </span>
          ))}
        </div>
      </footer>
    </div>
  );
}
