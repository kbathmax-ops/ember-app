"use client";

import { useState } from "react";
import { track } from "@vercel/analytics/react";
import { T, FONT } from "../ui/tokens";
import { Eyebrow, Sparkline } from "../ui/primitives";

const POINTS: Array<[string, string]> = [
  ["01", "Live Canadian wildfire data, ECCC AQHI, and satellite smoke detections."],
  ["02", "Alerts you when the air at your address crosses your threshold."],
  ["03", "Tuned to you, not a city average."],
];

export function Landing() {
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setErr(null);
    track("waitlist_submit_attempt");
    const res = await fetch("/api/waitlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, source: "landing-v1" }),
    });
    setBusy(false);
    if (!res.ok) {
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      setErr(data.error ?? "Something went wrong");
      track("waitlist_submit_error", { error: data.error ?? "unknown" });
      return;
    }
    setDone(true);
    track("waitlist_submit_success");
  };

  return (
    <div
      style={{
        position: "relative",
        minHeight: "100dvh",
        background: T.paper,
        fontFamily: FONT.sans,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <div className="ember-grid-bg" aria-hidden="true" />
      <div className="ember-radial-accent" aria-hidden="true" />
      <header
        style={{
          position: "relative",
          zIndex: 1,
          padding: "24px 28px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 10,
        }}
        className="md:px-[52px]"
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
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
        </div>
        <a
          href="/admin"
          style={{
            fontSize: 11,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            fontWeight: 500,
            color: T.ink40,
            textDecoration: "none",
            padding: "6px 12px",
            border: `1px solid ${T.rule}`,
            borderRadius: 999,
            transition: "color 150ms, border-color 150ms",
          }}
        >
          Admin
        </a>
      </header>

      <section
        style={{ position: "relative", zIndex: 1 }}
        className="flex-1 grid grid-cols-1 md:grid-cols-[1.1fr_1fr] items-stretch md:items-center"
      >
        <div className="px-7 md:px-14 py-10 md:py-0 max-w-[720px]">
          <Eyebrow n={0} label="Reserve list · BC + AB" />
          <h1
            style={{
              marginTop: 28,
              fontFamily: FONT.display,
              fontSize: "clamp(40px, 5vw, 78px)",
              lineHeight: 0.92,
              letterSpacing: "-0.04em",
              fontWeight: 800,
              color: T.ink,
              maxWidth: 640,
            }}
          >
            Smoke alerts for your{" "}
            <span style={{ color: T.e6 }}>address</span>, not for your
            community.
          </h1>

          <p
            style={{
              marginTop: 20,
              fontFamily: FONT.sans,
              fontSize: 18,
              lineHeight: "27px",
              fontWeight: 400,
              color: T.ink60,
              maxWidth: 520,
              letterSpacing: "-0.005em",
            }}
          >
            A personalized wildfire-smoke alert system for Canadians, tuned to
            a specific address and a specific person&apos;s tolerance. Not a
            city-wide AQHI average.
          </p>

          <ol
            style={{
              marginTop: 32,
              listStyle: "none",
              padding: 0,
              borderTop: `1px solid ${T.rule}`,
              maxWidth: 480,
            }}
          >
            {POINTS.map(([n, body]) => (
              <li
                key={n}
                style={{
                  display: "flex",
                  gap: 16,
                  padding: "16px 0",
                  borderBottom: `1px solid ${T.rule}`,
                  alignItems: "baseline",
                }}
              >
                <span
                  style={{
                    fontFamily: FONT.sans,
                    fontSize: 11,
                    fontWeight: 500,
                    letterSpacing: "0.12em",
                    color: T.e6,
                    flexShrink: 0,
                    paddingTop: 4,
                  }}
                >
                  ){n}
                </span>
                <span
                  style={{
                    fontFamily: FONT.sans,
                    fontSize: 17,
                    lineHeight: "24px",
                    fontWeight: 600,
                    color: T.ink,
                    letterSpacing: "-0.005em",
                  }}
                >
                  {body}
                </span>
              </li>
            ))}
          </ol>

          {done ? (
            <div
              style={{
                marginTop: 40,
                padding: "20px 24px",
                borderTop: `2px solid ${T.e6}`,
                background: T.white,
                maxWidth: 480,
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  fontWeight: 500,
                  color: T.e6,
                  marginBottom: 8,
                }}
              >
                You&apos;re on the list
              </div>
              <p
                style={{
                  fontSize: 15,
                  lineHeight: "22px",
                  color: T.ink,
                }}
              >
                We&apos;ll email when Ember opens for testers in your region.
                Meanwhile, you can{" "}
                <a
                  href="/map"
                  style={{ color: T.e6, textDecoration: "underline" }}
                >
                  see the live smoke map
                </a>
                .
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              style={{ marginTop: 40, maxWidth: 480 }}
            >
              <div
                style={{
                  display: "flex",
                  gap: 0,
                  borderBottom: `1px solid ${T.ink}`,
                  paddingBottom: 4,
                }}
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@yourdomain.com"
                  disabled={busy}
                  style={{
                    flex: 1,
                    fontFamily: FONT.sans,
                    fontSize: 17,
                    color: T.ink,
                    background: "none",
                    border: "none",
                    padding: "8px 0",
                    outline: "none",
                  }}
                />
                <button
                  type="submit"
                  disabled={busy}
                  style={{
                    background: T.e8,
                    color: T.white,
                    border: "none",
                    fontFamily: FONT.sans,
                    fontSize: 14,
                    fontWeight: 600,
                    padding: "0 22px",
                    height: 44,
                    cursor: busy ? "wait" : "pointer",
                    letterSpacing: 0,
                  }}
                >
                  {busy ? "…" : "Reserve →"}
                </button>
              </div>
              {err && (
                <div
                  style={{
                    marginTop: 12,
                    fontSize: 13,
                    color: T.e6,
                  }}
                >
                  {err}
                </div>
              )}
              <div
                style={{
                  marginTop: 14,
                  fontSize: 12,
                  color: T.ink40,
                  letterSpacing: "0.02em",
                }}
              >
                Free reserve list. We&apos;ll only email you when Ember opens.
              </div>
            </form>
          )}
        </div>

        <div
          className="md:h-full"
          style={{
            position: "relative",
            minHeight: 420,
            background: T.e8,
            color: T.white,
            padding: "40px 28px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 11,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.55)",
            }}
          >
            <span>Live · Vancouver, BC</span>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: 3,
                  background: T.e1,
                  animation: "pulse-badge 2s ease-in-out infinite",
                }}
              />
              AQHI 8
            </span>
          </div>

          <div style={{ marginTop: 32 }}>
            <div
              style={{
                fontSize: 11,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.55)",
                marginBottom: 14,
              }}
            >
              Pemberton RX · BCWS C30751
            </div>
            <p
              style={{
                fontFamily: FONT.display,
                fontSize: "clamp(22px, 2.4vw, 32px)",
                lineHeight: 1.15,
                fontWeight: 700,
                letterSpacing: "-0.025em",
                maxWidth: "32ch",
              }}
            >
              Smoke arriving from the northeast in roughly 90 minutes. Plan
              outdoor windows now.
            </p>
            <div style={{ marginTop: 28, maxWidth: 360 }}>
              <Sparkline light />
            </div>
          </div>

          <div
            style={{
              marginTop: 32,
              fontSize: 11,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.55)",
            }}
          >
            Sample alert · your threshold · your address
          </div>
        </div>
      </section>
    </div>
  );
}
