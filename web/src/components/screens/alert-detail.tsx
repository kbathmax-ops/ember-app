"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { T, FONT } from "../ui/tokens";
import { Btn, Eyebrow, Label, Sparkline } from "../ui/primitives";
import { NavRail } from "../nav-rail";

export type AlertView = {
  triggeredAt: string;
  source: string;
  clearingBy: string;
  risk: "elevated" | "very_high" | "low";
};

export function AlertDetail({ alert }: { alert: AlertView }) {
  const router = useRouter();
  const [drawn, setDrawn] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setDrawn(true), 120);
    return () => clearTimeout(t);
  }, []);

  const riskLabel =
    alert.risk === "very_high"
      ? "VERY HIGH"
      : alert.risk === "low"
        ? "LOW"
        : "ELEVATED";

  const rows: Array<[string, string]> = [
    ["Source", alert.source],
    ["Clearing by", alert.clearingBy],
    ["Your risk", riskLabel],
  ];

  return (
    <div style={{ display: "flex", height: "100dvh", width: "100%", background: T.paper, overflow: "hidden" }}>
      <NavRail />
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "32px 0",
        }}
      >
        <div
          style={{
            width: 390,
            height: 780,
            background: T.paper,
            border: `1px solid ${T.rule}`,
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              height: 44,
              padding: "0 24px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottom: `1px solid ${T.rule}`,
              flexShrink: 0,
            }}
          >
            <div
              style={{
                fontFamily: FONT.sans,
                fontSize: 11,
                fontVariantNumeric: "tabular-nums",
                color: T.ink60,
                letterSpacing: "0.04em",
              }}
            >
              {alert.triggeredAt}
            </div>
            <Label>Ember</Label>
          </div>
          <div
            style={{
              flex: 1,
              padding: "28px 28px 0",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Eyebrow n={3} label={`Alert · ${alert.triggeredAt}`} />
            <div
              style={{
                marginTop: 20,
                fontFamily: FONT.sans,
                fontSize: 40,
                lineHeight: "38px",
                letterSpacing: "-0.035em",
                fontWeight: 700,
                color: T.ink,
                maxWidth: 280,
              }}
            >
              Is this smoke safe?
            </div>
            <div
              style={{
                marginTop: 14,
                fontFamily: FONT.sans,
                fontSize: 24,
                lineHeight: "28px",
                letterSpacing: "-0.01em",
                fontWeight: 500,
                color: T.e8,
              }}
            >
              {alert.risk === "low" ? "Yes — for now." : "No — not for you."}
            </div>
            <div style={{ marginTop: 28, borderTop: `1px solid ${T.rule}` }}>
              {rows.map(([lbl, val]) => (
                <div
                  key={lbl}
                  style={{
                    padding: "14px 0",
                    borderBottom: `1px solid ${T.rule}`,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                  }}
                >
                  <Label>{lbl}</Label>
                  <div
                    style={{
                      fontFamily: FONT.sans,
                      fontSize: 15,
                      color: lbl === "Your risk" ? T.e6 : T.ink,
                      fontWeight: lbl === "Your risk" ? 500 : 400,
                      letterSpacing: lbl === "Your risk" ? "0.06em" : 0,
                    }}
                  >
                    {val}
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 24 }}>
              <Label style={{ marginBottom: 10 }}>AQHI Forecast Today</Label>
              {drawn && <Sparkline />}
            </div>
          </div>
          <div style={{ padding: "16px 28px 32px", display: "flex", flexDirection: "column", gap: 10, flexShrink: 0 }}>
            <Btn
              primary
              onClick={() => {}}
              style={{ width: "100%", height: 52, background: T.e8 }}
            >
              Hide indoors until {alert.clearingBy.replace(/.*\s/, "")}
            </Btn>
            <Btn
              ghost
              onClick={() => router.push("/map")}
              style={{ width: "100%", height: 52 }}
            >
              See the smoke on the map
            </Btn>
          </div>
        </div>
      </div>
    </div>
  );
}
