import { logoutAction } from "../actions";
import { requireAdminSession } from "@/lib/auth/session";
import { AdminShell } from "@/components/admin/AdminShell";

export default async function AdminAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const profile = await requireAdminSession();

  return (
    <AdminShell
      profile={{
        email: profile.email ?? "",
        full_name: profile.full_name ?? null,
        role: profile.role,
      }}
      logoutAction={logoutAction}
    >
      {children}
    </AdminShell>
  );
}
