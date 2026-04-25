function urlBase64ToUint8Array(base64String: string): ArrayBuffer {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const raw = window.atob(base64);
  const buf = new ArrayBuffer(raw.length);
  const view = new Uint8Array(buf);
  for (let i = 0; i < raw.length; ++i) view[i] = raw.charCodeAt(i);
  return buf;
}

export async function ensurePushSubscription(): Promise<PushSubscription | null> {
  if (typeof window === "undefined") return null;
  if (!("serviceWorker" in navigator) || !("PushManager" in window)) return null;

  const registration = await navigator.serviceWorker.register("/sw.js");
  await navigator.serviceWorker.ready;

  const permission = await Notification.requestPermission();
  if (permission !== "granted") return null;

  const existing = await registration.pushManager.getSubscription();
  if (existing) return existing;

  const sub = await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(
      process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
    ),
  });

  await fetch("/api/push/subscribe", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(sub.toJSON()),
  });

  return sub;
}
