interface ImportMetaEnv {
  VITE_SUPABASE_URL: string;
  VITE_SUPABASE_ANON_KEY: string;
  VITE_SUPABASE_SERVICE_KEY: string;
  VITE_ELECTRIC_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
