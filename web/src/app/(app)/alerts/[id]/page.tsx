import { notFound } from "next/navigation";
import { AlertDetail, type AlertView } from "@/components/screens/alert-detail";
import { createClient } from "@/lib/supabase/server";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  if (id === "sample") {
    const sample: AlertView = {
      triggeredAt: "14:22",
      source: "Pemberton RX, BCWS",
      clearingBy: "Thursday 19:00",
      risk: "elevated",
    };
    return <AlertDetail alert={sample} />;
  }

  const supabase = await createClient();
  const { data: alert } = await supabase
    .from("alerts")
    .select("triggered_at, station_name, forecast_text, aqhi_value, threshold, status")
    .eq("id", id)
    .maybeSingle();

  if (!alert) notFound();

  const triggeredAt = new Date(alert.triggered_at).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  const view: AlertView = {
    triggeredAt,
    source: alert.station_name ?? "Wildfire smoke event",
    clearingBy:
      alert.forecast_text ??
      (alert.status === "resolved" ? "Cleared" : "Forecast pending"),
    risk:
      alert.aqhi_value >= 9
        ? "very_high"
        : alert.aqhi_value >= alert.threshold
          ? "elevated"
          : "low",
  };

  return <AlertDetail alert={view} />;
}
