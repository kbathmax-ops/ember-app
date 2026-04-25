"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { T, FONT } from "../ui/tokens";
import { Btn, Chip, Eyebrow, Photo } from "../ui/primitives";
import { createClient } from "@/lib/supabase/client";

const CHIPS = ["Asthma", "Young children at home", "Outdoor athlete", "Wildfire-zone resident"];

const SENSITIVITY_MAP: Record<string, string> = {
  Asthma: "asthma",
  "Young children at home": "child",
  "Outdoor athlete": "general",
  "Wildfire-zone resident": "general",
};

export function Onboarding() {
  const router = useRouter();
  const [sel, setSel] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);
  const toggle = (c: string) =>
    setSel((p) => (p.includes(c) ? p.filter((x) => x !== c) : [...p, c]));

  const handleContinue = async () => {
    setSaving(true);
    const supabase = createClient();
    const { data } = await supabase.auth.getUser();
    if (data.user) {
      const sensitivity = sel.find((c) => SENSITIVITY_MAP[c] !== "general")
        ? SENSITIVITY_MAP[sel.find((c) => SENSITIVITY_MAP[c] !== "general")!]
        : "general";
      await supabase
        .from("profiles")
        .update({ sensitivity })
        .eq("user_id", data.user.id);
    }
    router.push("/map");
  };

  return (
    <div style={{ display: "flex", height: "100dvh", width: "100%", position: "relative" }}>
      <div
        style={{
          width: "40%",
          padding: "52px 48px",
          background: T.paper,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          zIndex: 2,
          flexShrink: 0,
        }}
      >
        <div>
          <Eyebrow n={1} label="Calibrate" />
          <h1
            style={{
              marginTop: 36,
              fontFamily: FONT.sans,
              fontSize: 52,
              lineHeight: "50px",
              letterSpacing: "-0.02em",
              fontWeight: 300,
              color: T.ink,
              maxWidth: 320,
            }}
          >
            What do your lungs need?
          </h1>
          <p
            style={{
              marginTop: 20,
              fontFamily: FONT.sans,
              fontSize: 15,
              lineHeight: "22px",
              color: T.ink60,
              fontWeight: 300,
              maxWidth: 300,
            }}
          >
            We&apos;ll tune your alerts to your risk level and household.
          </p>
        </div>
        <div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 32 }}>
            {CHIPS.map((c) => (
              <Chip
                key={c}
                label={c}
                selected={sel.includes(c)}
                onToggle={() => toggle(c)}
              />
            ))}
          </div>
          <Btn primary onClick={handleContinue} disabled={saving} style={{ width: "100%" }}>
            {saving ? "Saving…" : "Continue to Smoke Map"}
          </Btn>
        </div>
      </div>
      <Photo label="coastal fog · howe sound · bc" style={{ flex: 1 }} />
    </div>
  );
}
