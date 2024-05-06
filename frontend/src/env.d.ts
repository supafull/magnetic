interface ImportMetaEnv {
  VITE_SUPABASE_URL: string;
  VITE_SUPABASE_ANON_KEY: string;
  VITE_SUPABASE_SERVICE_KEY: string;
  VITE_ELECTRIC_URL: string;
  VITE_ELECTRIC_CLIENT_DB: "wa-sqlite" | "pglite";
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// Extend the window object
interface Window {
  electric: any;
}
