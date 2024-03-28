import type { Session, SupabaseClient } from "@supabase/supabase-js";
import { createContext } from "react";

interface SupabaseContextObject {
  supabase: SupabaseClient;
  session: Session | null;
}

export const SupabaseContext = createContext<SupabaseContextObject | null>(
  null
);
