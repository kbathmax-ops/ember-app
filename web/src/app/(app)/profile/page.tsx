import { ProfileScreen, type ProfileView } from "@/components/screens/profile";
import { createClient } from "@/lib/supabase/server";

export default async function Page() {
  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();
  const { data: profile } = await supabase
    .from("profiles")
    .select("address, aqhi_threshold, sensitivity")
    .eq("user_id", userData.user!.id)
    .maybeSingle();

  const initial: ProfileView = {
    address: profile?.address ?? null,
    threshold: profile?.aqhi_threshold ?? 7,
    sensitivity: profile?.sensitivity ?? "general",
  };

  return <ProfileScreen initial={initial} />;
}
