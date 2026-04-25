"use client";

import { useEffect, useState } from "react";
import { ensurePushSubscription } from "@/lib/push";
import { T, FONT } from "./ui/tokens";

export function PushPrompt() {
  const [show, setShow] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!("Notification" in window)) return;
    if (Notification.permission === "default") setShow(true);
  }, []);

  const handleEnable = async () => {
    setBusy(true);
    const sub = await ensurePushSubscription();
    setBusy(false);
    if (sub) setShow(false);
  };

  if (!show) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 24,
        right: 24,
        zIndex: 50,
        background: T.ink,
        color: T.white,
        padding: "16px 20px",
        maxWidth: 320,
        boxShadow: "0 4px 24px rgba(0,0,0,0.18)",
        borderTop: `2px solid ${T.e6}`,
        animation: "slideIn 240ms cubic-bezier(0.23,1,0.32,1) forwards",
      }}
    >
      <div
        style={{
          fontFamily: FONT.sans,
          fontSize: 11,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.5)",
          marginBottom: 6,
        }}
      >
        Notifications
      </div>
      <div
        style={{
          fontFamily: FONT.sans,
          fontSize: 14,
          lineHeight: "20px",
          marginBottom: 12,
        }}
      >
        Get a push when AQHI crosses your threshold. We won&apos;t send anything
        else.
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        <button
          onClick={handleEnable}
          disabled={busy}
          style={{
            background: T.e6,
            color: T.white,
            border: "none",
            padding: "8px 14px",
            fontFamily: FONT.sans,
            fontSize: 13,
            fontWeight: 500,
            cursor: "pointer",
            opacity: busy ? 0.6 : 1,
          }}
        >
          {busy ? "Enabling…" : "Enable"}
        </button>
        <button
          onClick={() => setShow(false)}
          style={{
            background: "none",
            color: "rgba(255,255,255,0.6)",
            border: "1px solid rgba(255,255,255,0.18)",
            padding: "8px 14px",
            fontFamily: FONT.sans,
            fontSize: 13,
            cursor: "pointer",
          }}
        >
          Not now
        </button>
      </div>
    </div>
  );
}
