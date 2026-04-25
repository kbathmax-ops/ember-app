"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { T, FONT } from "../ui/tokens";
import { Btn, Eyebrow, Label, Num, SmokeIllustration, Sparkline } from "../ui/primitives";
import { NavRail } from "../nav-rail";
import { SmokeMap } from "../smoke-map";

export function MapScreen() {
  const router = useRouter();
  const [plume, setPlume] = useState<string | null>(null);
  const panelEmber = plume === "pemberton";
  const bg = panelEmber ? T.e8 : T.white;

  return (
    <div style={{ display: "flex", height: "100dvh", width: "100%", overflow: "hidden" }}>
      <NavRail />
      <div style={{ flex: "0 0 62%", position: "relative", background: T.m50, overflow: "hidden" }}>
        <SmokeMap selectedPlume={plume} onSelectPlume={setPlume} />
        {plume === "pemberton" && (
          <div
            style={{
              position: "absolute",
              left: 195,
              top: 120,
              width: 220,
              background: T.white,
              padding: "14px 16px",
              borderTop: `2px solid ${T.e6}`,
              boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
              animation: "slideIn 240ms cubic-bezier(0.23,1,0.32,1) forwards",
            }}
          >
            <Label style={{ color: T.e6, marginBottom: 6 }}>Pemberton RX Burn</Label>
            <div
              style={{
                fontFamily: FONT.sans,
                fontSize: 13,
                color: T.ink60,
                fontVariantNumeric: "tabular-nums",
                lineHeight: "18px",
              }}
            >
              50.3149, −122.8086
              <br />
              <span style={{ color: T.ink, fontWeight: 500 }}>BCWS C30751</span>
            </div>
            <div style={{ marginTop: 10, display: "flex", gap: 10, alignItems: "center" }}>
              <SmokeIllustration color={T.e6} />
              <div>
                <div style={{ fontFamily: FONT.sans, fontSize: 11, color: T.ink40, marginBottom: 2 }}>
                  Burn window
                </div>
                <div
                  style={{
                    fontFamily: FONT.sans,
                    fontSize: 15,
                    fontVariantNumeric: "tabular-nums",
                    color: T.ink,
                  }}
                >
                  04:20 → 19:00
                </div>
              </div>
            </div>
            <button
              onClick={() => setPlume(null)}
              style={{
                position: "absolute",
                top: 8,
                right: 10,
                background: "none",
                border: "none",
                cursor: "pointer",
                color: T.ink40,
                fontSize: 16,
                lineHeight: 1,
              }}
            >
              ×
            </button>
          </div>
        )}
        {!plume && (
          <div
            style={{
              position: "absolute",
              bottom: 20,
              left: 20,
              fontFamily: FONT.sans,
              fontSize: 11,
              color: T.ink40,
              letterSpacing: "0.04em",
              pointerEvents: "none",
            }}
          >
            Click a smoke plume for details
          </div>
        )}
      </div>
      <div
        style={{
          flex: "0 0 38%",
          background: bg,
          borderLeft: `1px solid ${T.rule}`,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          transition: "background 200ms ease",
        }}
      >
        <div style={{ padding: "28px 28px 0" }}>
          <Eyebrow n={2} label="Nearest Source" light={panelEmber} />
          <div
            style={{
              marginTop: 16,
              fontFamily: FONT.sans,
              fontSize: 36,
              lineHeight: "38px",
              letterSpacing: "-0.015em",
              fontWeight: 400,
              color: panelEmber ? T.white : T.ink,
              whiteSpace: "pre-line",
            }}
          >
            {plume === "pemberton" ? "Pemberton RX C30751" : "No active\nsource nearby"}
          </div>
        </div>
        <div
          style={{
            padding: "24px 28px",
            display: "flex",
            gap: 0,
            borderBottom: `1px solid ${panelEmber ? "rgba(255,255,255,0.12)" : T.rule}`,
          }}
        >
          {(
            [
              ["Distance", "1.3 km"],
              ["Burn window", "04:20→19:00"],
              ["AQHI range", "4 → 8"],
            ] as const
          ).map(([lbl, val], i) => (
            <div
              key={lbl}
              style={{
                flex: 1,
                paddingRight: 16,
                borderRight:
                  i < 2
                    ? `1px solid ${panelEmber ? "rgba(255,255,255,0.12)" : T.rule}`
                    : "none",
                paddingLeft: i > 0 ? 16 : 0,
              }}
            >
              <Label light={panelEmber} style={{ marginBottom: 6 }}>
                {lbl}
              </Label>
              <div
                style={{
                  fontFamily: FONT.sans,
                  fontSize: 18,
                  fontVariantNumeric: "tabular-nums",
                  fontWeight: 400,
                  color: panelEmber ? T.white : T.ink,
                  lineHeight: 1,
                }}
              >
                {val}
              </div>
            </div>
          ))}
        </div>
        <div style={{ flex: 1, padding: "24px 28px", display: "flex", flexDirection: "column", gap: 16 }}>
          <Eyebrow n={3} label="Your Exposure Forecast" light={panelEmber} />
          <div>
            <Label light={panelEmber} style={{ marginBottom: 8 }}>
              Peak AQHI
            </Label>
            <Num size={56} thin light={panelEmber}>
              8
            </Num>
            <div
              style={{
                fontFamily: FONT.sans,
                fontSize: 13,
                color: panelEmber ? "rgba(255,255,255,0.5)" : T.ink40,
                marginTop: 2,
              }}
            >
              High risk · 18:00
            </div>
          </div>
          <Sparkline light={panelEmber} />
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 4 }}>
            <SmokeIllustration color={panelEmber ? "rgba(255,255,255,0.5)" : T.e6} />
            <div>
              <Label light={panelEmber} style={{ marginBottom: 4 }}>
                Risk level
              </Label>
              <div
                style={{
                  fontFamily: FONT.sans,
                  fontSize: 13,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  fontWeight: 500,
                  color: panelEmber ? T.white : T.e6,
                }}
              >
                Elevated
              </div>
            </div>
          </div>
        </div>
        <div style={{ padding: "0 28px 28px", display: "flex", gap: 10 }}>
          <Btn
            primary
            onClick={() => router.push("/alerts/sample")}
            style={{
              flex: 1,
              borderRadius: panelEmber ? 0 : 24,
              background: panelEmber ? "rgba(255,255,255,0.15)" : T.e8,
              border: panelEmber ? "1px solid rgba(255,255,255,0.25)" : "none",
            }}
          >
            Alert me
          </Btn>
          <Btn
            ghost
            onClick={() => router.push("/alerts/sample")}
            style={{
              flex: 1,
              borderRadius: panelEmber ? 0 : 24,
              color: panelEmber ? T.white : T.ink,
              border: panelEmber
                ? "1px solid rgba(255,255,255,0.25)"
                : `1px solid ${T.rule}`,
            }}
          >
            Share
          </Btn>
        </div>
      </div>
    </div>
  );
}
