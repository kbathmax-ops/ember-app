import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { geocodeAddress } from "@/lib/geocode";

export async function PATCH(req: NextRequest) {
  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const body = (await req.json()) as {
    address?: string | null;
    aqhi_threshold?: number;
    sensitivity?: string;
  };

  const update: Record<string, unknown> = {};
  if (typeof body.aqhi_threshold === "number") {
    update.aqhi_threshold = body.aqhi_threshold;
  }
  if (typeof body.sensitivity === "string") {
    update.sensitivity = body.sensitivity;
  }
  if (body.address !== undefined) {
    update.address = body.address || null;
    if (body.address && body.address.trim().length > 3) {
      const geo = await geocodeAddress(body.address);
      if (geo) {
        update.lat = geo.lat;
        update.lng = geo.lng;
        update.region = geo.region;
      } else {
        update.lat = null;
        update.lng = null;
      }
    } else {
      update.lat = null;
      update.lng = null;
    }
  }

  const { error } = await supabase
    .from("profiles")
    .update(update)
    .eq("user_id", userData.user.id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    ok: true,
    geocoded: update.lat != null,
  });
}
