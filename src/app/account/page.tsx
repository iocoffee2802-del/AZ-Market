import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { signOut } from "@/app/auth/actions";

export default async function AccountPage() {
 const supabase = await createClient();
 const { data: { user } } = await supabase.auth.getUser();
 if (!user) redirect("/login");
 const { data: profile } = await supabase.from("profiles").select("full_name, role").eq("id", user.id).maybeSingle();
 return <main className="min-h-screen px-5 py-10"><div className="mx-auto max-w-3xl rounded-2xl border bg-white p-8"><Link href="/" className="font-bold text-teal-800">← AZ MARKET</Link><h1 className="mt-6 text-3xl font-black">Tài khoản của tôi</h1><p className="mt-3 text-slate-600">Xin chào {profile?.full_name || user.email}</p><p className="mt-2 text-sm text-slate-500">Email: {user.email}</p><p className="mt-1 text-sm text-slate-500">Vai trò: {profile?.role || "buyer"}</p><div className="mt-7 flex flex-wrap gap-3"><Link href="/seller" className="rounded-xl bg-teal-800 px-5 py-3 font-bold text-white">Kênh người bán</Link>{profile?.role === "admin" && <Link href="/admin" className="rounded-xl border px-5 py-3 font-bold">Quản trị</Link>}<form action={signOut}><button className="rounded-xl border px-5 py-3 font-bold">Đăng xuất</button></form></div></div></main>;
}
