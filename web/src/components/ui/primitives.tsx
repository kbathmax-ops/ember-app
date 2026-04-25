"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { T, FONT } from "./tokens";

export function Eyebrow({
  n,
  label,
  light,
}: {
  n: number;
  label: string;
  light?: boolean;
}) {
  return (
    <div
      style={{
        fontFamily: FONT.sans,
        fontSize: 11,
        lineHeight: "14px",
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        fontWeight: 500,
        color: light ? "rgba(255,255,255,0.5)" : T.ink40,
        display: "flex",
        alignItems: "center",
        gap: 8,
      }}
    >
      <span
        style={{
          color: light ? "rgba(255,255,255,0.3)" : T.e6,
          fontWeight: 400,
          letterSpacing: 0,
        }}
      >
        ){String(n).padStart(2, "0")}
      </span>
      {label}
    </div>
  );
}

export function Label({
  children,
  light,
  style = {},
}: {
  children: ReactNode;
  light?: boolean;
  style?: CSSProperties;
}) {
  return (
    <div
      style={{
        fontFamily: FONT.sans,
        fontSize: 11,
        lineHeight: "14px",
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        fontWeight: 400,
        color: light ? "rgba(255,255,255,0.45)" : T.ink40,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export function Num({
  children,
  size = 64,
  thin,
  light,
  style = {},
}: {
  children: ReactNode;
  size?: number;
  thin?: boolean;
  light?: boolean;
  style?: CSSProperties;
}) {
  return (
    <div
      style={{
        fontFamily: FONT.sans,
        fontSize: size,
        lineHeight: 1,
        letterSpacing: "-0.02em",
        fontVariantNumeric: "tabular-nums",
        fontWeight: thin ? 200 : 400,
        color: light ? T.white : T.ink,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export function Photo({
  label,
  style = {},
}: {
  label: string;
  style?: CSSProperties;
}) {
  const reactId = useId();
  const id = `ph${reactId.replace(/:/g, "")}`;
  return (
    <div
      style={{
        position: "relative",
        background: "#1B1813",
        overflow: "hidden",
        ...style,
      }}
    >
      <svg
        width="100%"
        height="100%"
        style={{ position: "absolute", inset: 0 }}
        preserveAspectRatio="none"
      >
        <defs>
          <pattern
            id={id}
            patternUnits="userSpaceOnUse"
            width="28"
            height="28"
            patternTransform="rotate(32)"
          >
            <rect width="28" height="28" fill="#1B1813" />
            <line x1="0" y1="0" x2="0" y2="28" stroke="#25201B" strokeWidth="14" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${id})`} />
        <rect width="100%" height="100%" fill="rgba(165,108,48,0.08)" />
      </svg>
      <div
        style={{
          position: "absolute",
          bottom: 20,
          left: 20,
          fontFamily: "monospace",
          fontSize: 10,
          color: "rgba(255,255,255,0.22)",
          textTransform: "uppercase",
          letterSpacing: "0.09em",
          pointerEvents: "none",
        }}
      >
        {label}
      </div>
    </div>
  );
}

export function Btn({
  children,
  primary,
  ghost,
  onClick,
  type = "button",
  disabled,
  style = {},
}: {
  children: ReactNode;
  primary?: boolean;
  ghost?: boolean;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  style?: CSSProperties;
}) {
  const [pressed, setPressed] = useState(false);
  const bg = primary ? T.e8 : "transparent";
  const border = ghost
    ? `1px solid ${T.rule}`
    : primary
      ? "none"
      : `1px solid ${T.ink}`;
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
      style={{
        fontFamily: FONT.sans,
        fontSize: 15,
        fontWeight: 500,
        letterSpacing: 0,
        background: bg,
        color: primary ? T.white : T.ink,
        border,
        padding: "0 24px",
        height: 52,
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,
        transform: pressed ? "scale(0.97)" : "scale(1)",
        transition: "transform 160ms cubic-bezier(0.23,1,0.32,1), background 180ms",
        borderRadius: 24,
        ...style,
      }}
    >
      {children}
    </button>
  );
}

export function Chip({
  label,
  selected,
  onToggle,
}: {
  label: string;
  selected?: boolean;
  onToggle?: () => void;
}) {
  const [pressed, setPressed] = useState(false);
  return (
    <button
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
      onClick={onToggle}
      style={{
        height: 44,
        padding: "0 18px",
        borderRadius: 24,
        border: `1px solid ${selected ? T.e8 : T.rule}`,
        background: selected ? T.e8 : "transparent",
        color: selected ? T.white : T.ink,
        fontFamily: FONT.sans,
        fontSize: 14,
        cursor: "pointer",
        transform: pressed ? "scale(0.97)" : "",
        transition: "all 150ms cubic-bezier(0.23,1,0.32,1)",
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </button>
  );
}

const IC = { p: 1.5, s: "round" as const };
export function IcoPin() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={IC.p} strokeLinecap={IC.s} strokeLinejoin={IC.s}>
      <circle cx="10" cy="8" r="3" />
      <path d="M10 18c0 0-6-4.8-6-10a6 6 0 1 1 12 0c0 5.2-6 10-6 10z" />
    </svg>
  );
}
export function IcoBell() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={IC.p} strokeLinecap={IC.s} strokeLinejoin={IC.s}>
      <path d="M10 2.5A5.5 5.5 0 0 0 4.5 8v4L3 14h14l-1.5-2V8A5.5 5.5 0 0 0 10 2.5z" />
      <path d="M8.5 16.5a1.5 1.5 0 0 0 3 0" />
    </svg>
  );
}
export function IcoWind() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={IC.p} strokeLinecap={IC.s}>
      <path d="M3 8.5h10a2.5 2.5 0 1 0-2.5-2.5" />
      <path d="M3 12h7a2 2 0 1 1-2 2" />
    </svg>
  );
}
export function IcoPerson() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={IC.p} strokeLinecap={IC.s} strokeLinejoin={IC.s}>
      <circle cx="10" cy="7" r="3.5" />
      <path d="M3.5 18c0-3.6 2.9-6.5 6.5-6.5s6.5 2.9 6.5 6.5" />
    </svg>
  );
}
export function IcoGear() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={IC.p} strokeLinecap={IC.s}>
      <circle cx="10" cy="10" r="2.5" />
      <path d="M10 2v2M10 16v2M2 10h2M16 10h2M4.3 4.3l1.4 1.4M14.3 14.3l1.4 1.4M4.3 15.7l1.4-1.4M14.3 5.7l1.4-1.4" />
    </svg>
  );
}
export function IcoGlobe() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={IC.p} strokeLinecap={IC.s}>
      <circle cx="10" cy="10" r="7.5" />
      <path d="M10 2.5c-2 2-3 4.5-3 7.5s1 5.5 3 7.5M10 2.5c2 2 3 4.5 3 7.5s-1 5.5-3 7.5M2.5 10h15" />
    </svg>
  );
}

export function SmokeIllustration({ color = "currentColor" }: { color?: string }) {
  return (
    <svg width="72" height="108" viewBox="0 0 72 108" fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round">
      <path d="M36 88 Q31 74 36 60 Q41 46 34 32 Q30 22 36 10" strokeWidth="1.5" />
      <path d="M42 88 Q50 70 46 54 Q42 40 48 26" strokeWidth="1" opacity="0.45" />
      <path d="M30 88 Q22 71 26 56 Q30 43 24 30" strokeWidth="1" opacity="0.45" />
      <path d="M28 98 L44 98 L46 88 Q36 83 26 88 Z" strokeWidth="1.5" />
      <rect x="33" y="98" width="6" height="8" strokeWidth="1.5" />
      <line x1="14" y1="106" x2="58" y2="106" strokeWidth="1" opacity="0.4" />
      <path d="M4 106 Q18 102 36 106 Q54 110 68 106" strokeWidth="0.75" opacity="0.25" />
    </svg>
  );
}

export function Sparkline({ light }: { light?: boolean }) {
  const ref = useRef<SVGSVGElement>(null);
  useEffect(() => {
    if (ref.current) ref.current.style.clipPath = "inset(0 0% 0 0)";
  }, []);
  const stroke = light ? "rgba(255,255,255,0.7)" : T.e6;
  const fill = light ? "rgba(255,255,255,0.12)" : T.e1;
  const tick = light ? "rgba(255,255,255,0.35)" : T.ink40;
  const pts =
    "0,52 30,48 60,42 90,38 120,28 150,14 180,8 210,6 240,10 270,22 300,36 330,44 360,50 390,52";
  const area = pts + " 390,64 0,64";
  return (
    <div style={{ position: "relative", width: "100%", height: 64 }}>
      <svg
        ref={ref}
        viewBox="0 0 390 64"
        width="100%"
        height="64"
        preserveAspectRatio="none"
        style={{
          clipPath: "inset(0 100% 0 0)",
          transition: "clip-path 800ms cubic-bezier(0.77,0,0.175,1)",
          display: "block",
        }}
      >
        <polygon points={area} fill={fill} />
        <polyline points={pts} fill="none" stroke={stroke} strokeWidth="1.5" />
        {(
          [
            ["12:00", 0],
            ["14:00", 130],
            ["16:00", 195],
            ["18:00", 260],
            ["20:00", 325],
            ["22:00", 390],
          ] as const
        ).map(([t, x]) => (
          <g key={t}>
            <line x1={x} y1="58" x2={x} y2="64" stroke={tick} strokeWidth="0.75" />
            <text
              x={x}
              y="62"
              textAnchor="middle"
              fontFamily={FONT.sans}
              fontSize="7"
              fill={tick}
              style={{ pointerEvents: "none", fontVariantNumeric: "tabular-nums" }}
            >
              {t}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
