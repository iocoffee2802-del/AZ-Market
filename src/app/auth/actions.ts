"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function signIn(formData: FormData) {
  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "");
  if (!email || !password) redirect("/login?error=missing");
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) redirect("/login?error=invalid");
  redirect("/account");
}

export async function signUp(formData: FormData) {
  const fullName = String(formData.get("full_name") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "");
  if (!fullName || !email || password.length < 8) redirect("/register?error=invalid");
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email, password, options: { data: { full_name: fullName } },
  });
  if (error) redirect("/register?error=signup");
  if (data.session) redirect("/account");
  redirect("/login?message=confirm-email");
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}
