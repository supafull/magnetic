import type { SupabaseClient } from "@supabase/supabase-js";
import { Contacts } from "./generated/client";

export async function getSupabaseJWT(supabase: SupabaseClient) {
  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token;
  if (!token) {
    throw new Error("No token");
  }
  return token;
}

export function removeDupes(
  arr: Contacts[],
  map = new Map<string, Contacts>()
) {
  arr.forEach((o) => map.set(o.id, o));
  return [...map.values()];
}
