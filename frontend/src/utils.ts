import type { SupabaseClient } from "@supabase/supabase-js";

import { Contact } from "./types";

export async function getSupabaseJWT(supabase: SupabaseClient) {
  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token;
  if (!token) {
    throw new Error("No token");
  }
  return token;
}

export function removeDupes(arr: Contact[], map = new Map<string, Contact>()) {
  arr.forEach((o) => map.set(o.id as string, o));
  return [...map.values()];
}
