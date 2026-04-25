import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { NavRail } from "@/components/nav-rail";
import { Eyebrow, Label } from "@/components/ui/primitives";
import { T, FONT } from "@/components/ui/tokens";

export default async function Page() {
  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();
  const { data: alerts } = userData.user
    ? await supabase
        .from("alerts")
        .select("id, triggered_at, station_name, aqhi_value, threshold, status")
        .eq("user_id", userData.user.id)
        .order("triggered_at", { ascending: false })
        .limit(50)
    : { data: null };

  return (
    <div style={{ display: "flex", height: "100dvh", width: "100%", background: T.paper }}>
      <NavRail />
      <div style={{ flex: 1, padding: "52px 56px", overflow: "auto" }}>
        <Eyebrow n={3} label="Alert history" />
        <h1
          style={{
            marginTop: 24,
            fontFamily: FONT.sans,
            fontSize: 46,
            letterSpacing: "-0.035em",
            fontWeight: 700,
            color: T.ink,
            marginBottom: 40,
          }}
        >
          Your smoke timeline
        </h1>

        {!alerts || alerts.length === 0 ? (
          <div style={{ maxWidth: 460 }}>
            <Label style={{ marginBottom: 12 }}>No alerts yet</Label>
            <p
              style={{
                fontFamily: FONT.sans,
                fontSize: 15,
                lineHeight: "22px",
                color: T.ink60,
                fontWeight: 300,
              }}
            >
              When AQHI at your address crosses your threshold, we&apos;ll log
              it here. In the meantime, you can{" "}
              <Link href="/alerts/sample" style={{ color: T.e6 }}>
                preview a sample alert
              </Link>
              .
            </p>
          </div>
        ) : (
          <div style={{ borderTop: `1px solid ${T.rule}`, maxWidth: 720 }}>
            {alerts.map((a) => {
              const time = new Date(a.triggered_at).toLocaleString([], {
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              });
              return (
                <Link
                  key={a.id}
                  href={`/alerts/${a.id}`}
                  style={{
                    display: "flex",
                    padding: "20px 0",
                    borderBottom: `1px solid ${T.rule}`,
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <Label style={{ marginBottom: 4 }}>{time}</Label>
                    <div
                      style={{
                        fontFamily: FONT.sans,
                        fontSize: 16,
                        color: T.ink,
                      }}
                    >
                      {a.station_name ?? "Wildfire smoke event"}
                    </div>
                  </div>
                  <div
                    style={{
                      fontFamily: FONT.sans,
                      fontSize: 22,
                      fontVariantNumeric: "tabular-nums",
                      color: a.aqhi_value >= 7 ? T.e6 : T.ink,
                      fontWeight: 500,
                    }}
                  >
                    AQHI {a.aqhi_value}
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
