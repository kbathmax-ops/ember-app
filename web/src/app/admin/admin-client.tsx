"use client";

import Link from "next/link";
import { useState } from "react";
import { T, FONT } from "@/components/ui/tokens";
import { Btn, Eyebrow, Label } from "@/components/ui/primitives";

const SCREENS: Array<[string, string, string]> = [
  ["/", ")05 Landing", "Hero, alert card, waitlist capture"],
  ["/onboarding", ")01 Onboarding", "Calibrate sensitivity chips"],
  ["/map", ")02 Smoke Map", "CWFIS WMS + nearest-source panel"],
  ["/alerts/sample", ")03 Alert Detail", "Mobile frame, sparkline reveal"],
  ["/profile", ")04 Profile", "Address, threshold slider, conditions"],
];

export function AdminClient({ initialAuthed }: { initialAuthed: boolean }) {
  const [authed, setAuthed] = useState(initialAuthed);
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setErr(null);
    const res = await fetch("/api/admin/unlock", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code }),
    });
    setBusy(false);
    if (!res.ok) {
      setErr(res.status === 401 ? "Wrong code" : "Server error");
      return;
    }
    setAuthed(true);
  };

  const handleLogout = async () => {
    await fetch("/api/admin/unlock", { method: "DELETE" });
    setAuthed(false);
  };

  return (
    <div
      style={{
        minHeight: "100dvh",
        background: T.paper,
        padding: "52px 56px",
        fontFamily: FONT.sans,
      }}
    >
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          maxWidth: 880,
        }}
      >
        <Eyebrow n={0} label="Admin · Ember" />
        {authed && (
          <button
            onClick={handleLogout}
            style={{
              background: "none",
              border: "none",
              fontFamily: FONT.sans,
              fontSize: 11,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: T.ink40,
              cursor: "pointer",
            }}
          >
            Sign out
          </button>
        )}
      </header>

      {!authed ? (
        <form
          onSubmit={handleSubmit}
          style={{ marginTop: 60, maxWidth: 360 }}
        >
          <h1
            style={{
              fontFamily: FONT.display,
              fontSize: 46,
              lineHeight: "44px",
              letterSpacing: "-0.035em",
              fontWeight: 700,
              color: T.ink,
              marginBottom: 24,
            }}
          >
            Access code
          </h1>
          <Label style={{ marginBottom: 8 }}>Enter code</Label>
          <input
            type="password"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            autoFocus
            style={{
              width: "100%",
              fontFamily: FONT.sans,
              fontSize: 17,
              color: T.ink,
              background: "none",
              border: "none",
              borderBottom: `1px solid ${T.ink}`,
              padding: "8px 0",
              outline: "none",
              marginBottom: 28,
              letterSpacing: "0.08em",
            }}
          />
          {err && (
            <div
              style={{
                fontFamily: FONT.sans,
                fontSize: 13,
                color: T.e6,
                marginBottom: 16,
              }}
            >
              {err}
            </div>
          )}
          <Btn primary type="submit" disabled={busy} style={{ width: "100%" }}>
            {busy ? "Checking…" : "Unlock"}
          </Btn>
        </form>
      ) : (
        <div style={{ marginTop: 60, maxWidth: 880 }}>
          <h1
            style={{
              fontFamily: FONT.display,
              fontSize: 46,
              lineHeight: "44px",
              letterSpacing: "-0.035em",
              fontWeight: 700,
              color: T.ink,
              marginBottom: 16,
            }}
          >
            All five screens
          </h1>
          <p
            style={{
              fontFamily: FONT.sans,
              fontSize: 15,
              color: T.ink60,
              marginBottom: 40,
              maxWidth: 520,
              lineHeight: "22px",
            }}
          >
            The bottom screen switcher only appears for sessions with this
            cookie. Public visitors land on the marketing page. Sign out above
            to test the visitor experience.
          </p>

          <div style={{ borderTop: `1px solid ${T.rule}` }}>
            {SCREENS.map(([href, title, desc]) => (
              <Link
                key={href}
                href={href}
                style={{
                  display: "flex",
                  padding: "20px 0",
                  borderBottom: `1px solid ${T.rule}`,
                  justifyContent: "space-between",
                  alignItems: "center",
                  textDecoration: "none",
                }}
              >
                <div>
                  <div
                    style={{
                      fontFamily: FONT.display,
                      fontSize: 22,
                      letterSpacing: "-0.02em",
                      fontWeight: 700,
                      color: T.ink,
                      marginBottom: 4,
                    }}
                  >
                    {title}
                  </div>
                  <div
                    style={{
                      fontFamily: FONT.sans,
                      fontSize: 13,
                      color: T.ink60,
                    }}
                  >
                    {desc}
                  </div>
                </div>
                <div
                  style={{
                    fontFamily: FONT.sans,
                    fontSize: 13,
                    color: T.e6,
                    letterSpacing: "0.04em",
                  }}
                >
                  Open →
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
