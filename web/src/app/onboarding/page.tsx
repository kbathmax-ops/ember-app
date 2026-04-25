import { redirect } from "next/navigation";
import { Onboarding } from "@/components/screens/onboarding";
import { createClient } from "@/lib/supabase/server";

export default async function Page() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  if (!data.user) redirect("/login");
  return <Onboarding />;
}
