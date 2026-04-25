import { cookies } from "next/headers";
import { AdminClient } from "./admin-client";

export default async function Page() {
  const cookieStore = await cookies();
  const isAdmin = cookieStore.get("ember_admin")?.value === "1";
  return <AdminClient initialAuthed={isAdmin} />;
}
