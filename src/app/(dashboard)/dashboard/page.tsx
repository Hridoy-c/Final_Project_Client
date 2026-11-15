import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";

const roleHome: Record<string, string> = {
  seeker: "/dashboard/seeker",
  recruiter: "/dashboard/recruiter",
  admin: "/dashboard/admin",
};

export default async function DashboardIndexPage() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    redirect("/sign-in");
  }

  const role = (session.user as { role?: string }).role ?? "seeker";

  redirect(roleHome[role] ?? roleHome.seeker);
}
