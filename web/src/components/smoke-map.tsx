"use client";

import { useEffect, useState } from "react";
import { T, FONT } from "./ui/tokens";

export function SmokeMap({
  selectedPlume,
  onSelectPlume,
}: {
  selectedPlume: string | null;
  onSelectPlume: (p: string | null) => void;
}) {
  const [pulse, setPulse] = useState(0);
  useEffect(() => {
    let raf: number;
    let t0: number | null = null;
    const tick = (ts: number) => {
      if (!t0) t0 = ts;
      setPulse(((ts - t0) % 2000) / 2000);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);
  const pR = 12 + 14 * pulse;
  const pO = 0.32 * (1 - pulse);

  return (
    <svg viewBox="0 0 680 460" width="100%" height="100%" style={{ display: "block" }}>
      <rect width="680" height="460" fill={T.m50} />
      <polygon points="0,0 92,0 72,460 0,460" fill={T.mw} />
      <polygon
        points="184,96 190,76 215,58 248,50 272,58 308,68 344,80 370,100 388,138 384,180 372,222 358,270 336,326 294,388 250,408 210,392 186,354 168,294 162,242 156,196 150,162 146,140 152,114 168,98"
        fill={T.mw}
      />
      <path d="M92,0 Q124,28 114,60 Q106,88 132,108 Q150,120 168,98" fill="none" stroke={T.ml} strokeWidth="0.8" opacity="0.65" />
      <path d="M75,0 Q108,38 98,72 Q88,104 116,122" fill="none" stroke={T.ml} strokeWidth="0.8" opacity="0.42" />
      <path d="M58,0 Q90,46 80,82 Q70,118 100,134" fill="none" stroke={T.ml} strokeWidth="0.8" opacity="0.25" />
      <path d="M92,460 Q124,408 116,346 Q110,284 128,230 Q142,186 150,162" fill="none" stroke={T.ml} strokeWidth="0.8" opacity="0.65" />
      <path d="M72,460 Q100,400 92,336 Q86,272 106,216 Q122,170 138,148" fill="none" stroke={T.ml} strokeWidth="0.8" opacity="0.42" />
      <path d="M680,88 Q564,104 494,144 Q448,174 428,208 Q414,234 404,268" fill="none" stroke={T.ml} strokeWidth="0.8" opacity="0.62" />
      <path d="M680,134 Q578,152 516,190 Q470,216 452,252 Q438,280 428,310" fill="none" stroke={T.ml} strokeWidth="0.8" opacity="0.42" />
      <path d="M680,200 Q605,212 558,238 Q520,258 502,286 Q486,310 476,336" fill="none" stroke={T.ml} strokeWidth="0.8" opacity="0.26" />
      <path d="M298,460 Q310,436 320,408 Q328,388 336,326" fill="none" stroke={T.ml} strokeWidth="0.8" opacity="0.52" />
      <path d="M196,460 Q212,442 218,416 Q222,400 210,392" fill="none" stroke={T.ml} strokeWidth="0.8" opacity="0.42" />

      <polygon
        points="88,26 148,14 190,30 210,62 200,92 184,96 168,98 146,84 122,70 96,56 86,40"
        fill={selectedPlume === "pemberton" ? T.e1 : "rgba(252,228,213,0.62)"}
        stroke={T.e6}
        strokeWidth={selectedPlume === "pemberton" ? 1.75 : 1}
        style={{ cursor: "pointer", transition: "all 300ms cubic-bezier(0.23,1,0.32,1)" }}
        onClick={() =>
          onSelectPlume(selectedPlume === "pemberton" ? null : "pemberton")
        }
      />
      <text
        x="98"
        y="44"
        fontFamily={FONT.sans}
        fontSize="7.5"
        fill={T.e8}
        letterSpacing="0.05em"
        fontWeight="500"
        style={{ pointerEvents: "none", userSelect: "none" }}
      >
        BCWS C30751
      </text>

      <polygon
        points="478,80 560,64 642,82 680,108 680,214 620,230 545,210 480,184 460,148 458,114"
        fill="rgba(166,160,152,0.2)"
        stroke="rgba(138,133,126,0.36)"
        strokeWidth="1"
        strokeDasharray="4,3"
      />
      <text
        x="510"
        y="118"
        fontFamily={FONT.sans}
        fontSize="7.5"
        fill={T.ink40}
        letterSpacing="0.05em"
        style={{ pointerEvents: "none", userSelect: "none" }}
      >
        OKANAGAN DRIFT
      </text>

      {selectedPlume === "pemberton" && (
        <g>
          <line x1="150" y1="62" x2="222" y2="142" stroke={T.e6} strokeWidth="0.75" strokeDasharray="3,2.5" />
          <circle cx="150" cy="62" r="2.5" fill={T.e6} />
        </g>
      )}

      <circle cx="322" cy="190" r={pR} fill="none" stroke={T.e6} strokeWidth="1.5" opacity={pO} />
      <circle cx="322" cy="190" r="5" fill={T.e6} />

      <text x="176" y="112" fontFamily="monospace" fontSize="7.5" fill={T.ink40} letterSpacing="0.02em">
        49.2827, −123.1207
      </text>

      {(
        [
          ["VANCOUVER", 104, 158],
          ["NORTH SHORE", 100, 74],
          ["BURNABY", 328, 210],
          ["RICHMOND", 188, 316],
          ["FRASER VALLEY", 425, 182],
        ] as const
      ).map(([t, x, y]) => (
        <text
          key={t}
          x={x}
          y={y}
          fontFamily={FONT.sans}
          fontSize="8.5"
          fill={T.ink40}
          letterSpacing="0.065em"
          fontWeight="500"
        >
          {t}
        </text>
      ))}
    </svg>
  );
}
