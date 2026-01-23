import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ restaurant: string }>;
}) {
  const { restaurant } = await params;

  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");

  // ❌ No hay sesión
  if (!session) {
    redirect(`/${restaurant}/login`);
  }

  // ❌ Sesión no corresponde al restaurante
  if (session.value !== restaurant) {
    redirect(`/${restaurant}/login`);
  }

  // ✅ OK
  return <>{children}</>;
}