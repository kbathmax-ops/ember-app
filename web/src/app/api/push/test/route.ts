import { NextResponse } from "next/server";
import webpush from "web-push";
import { createClient } from "@/lib/supabase/server";

webpush.setVapidDetails(
  process.env.VAPID_SUBJECT!,
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!,
);

export async function POST() {
  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const { data: subs } = await supabase
    .from("push_subscriptions")
    .select("endpoint, p256dh, auth")
    .eq("user_id", userData.user.id);

  if (!subs || subs.length === 0) {
    return NextResponse.json({ error: "no subscriptions" }, { status: 400 });
  }

  const payload = JSON.stringify({
    title: "Ember — test alert",
    body: "Pemberton RX clearing 19:00. AQHI peak 8.",
    url: "/alerts/sample",
    tag: "ember-test",
  });

  const results = await Promise.allSettled(
    subs.map((s) =>
      webpush.sendNotification(
        { endpoint: s.endpoint, keys: { p256dh: s.p256dh, auth: s.auth } },
        payload,
      ),
    ),
  );

  return NextResponse.json({
    sent: results.filter((r) => r.status === "fulfilled").length,
    failed: results.filter((r) => r.status === "rejected").length,
  });
}
