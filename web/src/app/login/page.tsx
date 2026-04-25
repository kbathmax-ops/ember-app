"use client";

import { useState } from "react";
import { Btn, Eyebrow, Label, Photo } from "@/components/ui/primitives";
import { T, FONT } from "@/components/ui/tokens";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setErr(null);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback?next=/onboarding`,
      },
    });
    setBusy(false);
    if (error) setErr(error.message);
    else setSent(true);
  };

  return (
    <div style={{ display: "flex", height: "100dvh", width: "100%" }}>
      <div
        style={{
          width: "50%",
          padding: "52px 56px",
          background: T.paper,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Eyebrow n={0} label="Reserve · Ember" />
        <h1
          style={{
            marginTop: 28,
            fontFamily: FONT.sans,
            fontSize: 52,
            lineHeight: "50px",
            letterSpacing: "-0.02em",
            fontWeight: 300,
            color: T.ink,
            maxWidth: 380,
          }}
        >
          Save your place on the list.
        </h1>
        <p
          style={{
            marginTop: 20,
            fontFamily: FONT.sans,
            fontSize: 15,
            lineHeight: "22px",
            color: T.ink60,
            fontWeight: 300,
            maxWidth: 360,
          }}
        >
          We&apos;ll send a sign-in link to your email — no password.
          Reserve-list members get first access when Ember opens in BC and AB.
        </p>

        {sent ? (
          <div style={{ marginTop: 40, maxWidth: 360 }}>
            <Label style={{ marginBottom: 8 }}>Check your inbox</Label>
            <p
              style={{
                fontFamily: FONT.sans,
                fontSize: 15,
                color: T.ink,
                lineHeight: "22px",
              }}
            >
              We sent a sign-in link to <strong>{email}</strong>. Click it to
              continue.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ marginTop: 40, maxWidth: 360 }}>
            <Label style={{ marginBottom: 8 }}>Email</Label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@yourdomain.com"
              style={{
                width: "100%",
                fontFamily: FONT.sans,
                fontSize: 15,
                color: T.ink,
                background: "none",
                border: "none",
                borderBottom: `1px solid ${T.rule}`,
                padding: "8px 0",
                outline: "none",
                marginBottom: 28,
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
              {busy ? "Sending…" : "Send sign-in link"}
            </Btn>
          </form>
        )}
      </div>
      <Photo label="interior bc · pemberton valley · smoke" style={{ flex: 1 }} />
    </div>
  );
}
