"use client";

import { useState } from "react";
import { T, FONT } from "../ui/tokens";
import { Btn, Chip, Eyebrow, Label, Photo } from "../ui/primitives";
import { NavRail } from "../nav-rail";

const CONDS = ["Asthma", "Young children", "Outdoor athlete", "Cardiac"];

const SENSITIVITY_FROM_CONDITIONS = (
  conditions: string[],
): "general" | "asthma" | "child" | "copd" => {
  if (conditions.includes("Asthma")) return "asthma";
  if (conditions.includes("Cardiac")) return "copd";
  if (conditions.includes("Young children")) return "child";
  return "general";
};

export type ProfileView = {
  address: string | null;
  threshold: number;
  sensitivity: string;
};

export function ProfileScreen({
  initial,
  authed = true,
}: {
  initial: ProfileView;
  authed?: boolean;
}) {
  const [threshold, setThreshold] = useState(initial.threshold);
  const [conditions, setConditions] = useState<string[]>(
    initial.sensitivity === "asthma"
      ? ["Asthma"]
      : initial.sensitivity === "child"
        ? ["Young children"]
        : initial.sensitivity === "copd"
          ? ["Cardiac"]
          : [],
  );
  const [address, setAddress] = useState(initial.address ?? "");
  const [saving, setSaving] = useState(false);
  const [savedMsg, setSavedMsg] = useState<string | null>(null);

  const toggle = (c: string) =>
    setConditions((p) => (p.includes(c) ? p.filter((x) => x !== c) : [...p, c]));

  const handleSave = async () => {
    if (!authed) {
      window.location.href = "/login";
      return;
    }
    setSaving(true);
    setSavedMsg(null);
    const sensitivity = SENSITIVITY_FROM_CONDITIONS(conditions);
    const res = await fetch("/api/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        address: address || null,
        aqhi_threshold: threshold,
        sensitivity,
      }),
    });
    setSaving(false);
    if (!res.ok) {
      setSavedMsg("Save failed");
      return;
    }
    const result = (await res.json()) as { geocoded?: boolean };
    setSavedMsg(
      address && !result.geocoded ? "Saved (address not found)" : "Saved",
    );
    setTimeout(() => setSavedMsg(null), 3000);
  };

  return (
    <div style={{ display: "flex", height: "100dvh", width: "100%", overflow: "hidden" }}>
      <NavRail />
      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
        <Photo
          label="dried native grasses · backlit · interior bc"
          style={{ flex: "0 0 40%" }}
        />
        <div
          style={{
            flex: 1,
            background: T.white,
            padding: "52px 56px",
            overflow: "auto",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Eyebrow n={4} label="Profile" />
          <h1
            style={{
              marginTop: 28,
              fontFamily: FONT.sans,
              fontSize: 32,
              letterSpacing: "-0.015em",
              fontWeight: 400,
              color: T.ink,
              marginBottom: 40,
            }}
          >
            Sensitivity Profile
          </h1>
          <div style={{ marginBottom: 32 }}>
            <Label style={{ marginBottom: 8 }}>Address</Label>
            <input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="2424 Main St, Vancouver BC"
              style={{
                width: "100%",
                maxWidth: 420,
                fontFamily: FONT.sans,
                fontSize: 15,
                color: T.ink,
                background: "none",
                border: "none",
                borderBottom: `1px solid ${T.rule}`,
                padding: "8px 0",
                outline: "none",
                letterSpacing: 0,
                transition: "border-color 150ms cubic-bezier(0.23,1,0.32,1)",
              }}
            />
          </div>
          <div style={{ marginBottom: 32 }}>
            <Label style={{ marginBottom: 10 }}>Health conditions</Label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, maxWidth: 420 }}>
              {CONDS.map((c) => (
                <Chip
                  key={c}
                  label={c}
                  selected={conditions.includes(c)}
                  onToggle={() => toggle(c)}
                />
              ))}
            </div>
          </div>
          <div style={{ marginBottom: 48, maxWidth: 420 }}>
            <Label style={{ marginBottom: 10 }}>Alert threshold (AQHI)</Label>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontFamily: FONT.sans,
                fontSize: 11,
                color: T.ink40,
                fontVariantNumeric: "tabular-nums",
                marginBottom: 10,
                letterSpacing: "0.04em",
              }}
            >
              {[1, 2, 4, 6, 8, 10].map((v) => (
                <span key={v}>{v}</span>
              ))}
            </div>
            <div style={{ position: "relative", height: 18, display: "flex", alignItems: "center" }}>
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  height: 1,
                  background: T.rule,
                }}
              />
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  height: 1,
                  width: `${((threshold - 1) / 9) * 100}%`,
                  background: T.e6,
                  transition: "width 50ms",
                }}
              />
              <input
                type="range"
                min="1"
                max="10"
                step="1"
                value={threshold}
                onChange={(e) => setThreshold(+e.target.value)}
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  width: "100%",
                  opacity: 0,
                  cursor: "pointer",
                  height: 18,
                }}
              />
              <div
                style={{
                  position: "absolute",
                  left: `${((threshold - 1) / 9) * 100}%`,
                  width: 18,
                  height: 18,
                  borderRadius: 9999,
                  background: T.white,
                  border: `1px solid ${T.e6}`,
                  transform: "translateX(-50%)",
                  pointerEvents: "none",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                }}
              />
            </div>
            <div
              style={{
                marginTop: 12,
                fontFamily: FONT.sans,
                fontSize: 13,
                color: T.ink60,
                fontVariantNumeric: "tabular-nums",
              }}
            >
              Alert when AQHI reaches{" "}
              <span style={{ color: T.e6, fontWeight: 500 }}>{threshold}</span>{" "}
              {threshold >= 7 ? "(high risk)" : threshold >= 4 ? "(moderate)" : "(low)"}
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 12, alignItems: "center" }}>
            {savedMsg && (
              <span style={{ fontFamily: FONT.sans, fontSize: 12, color: T.lichen }}>
                {savedMsg}
              </span>
            )}
            <Btn
              primary
              onClick={handleSave}
              disabled={saving}
              style={{ borderRadius: 0, minWidth: 140 }}
            >
              {saving ? "Saving…" : authed ? "Save profile" : "Sign in to save"}
            </Btn>
          </div>
        </div>
      </div>
    </div>
  );
}
