import electricDataProvider from "./ra-data-electric";
import { supabase } from "./supabase";

export const dataProvider = electricDataProvider({ supabase });
