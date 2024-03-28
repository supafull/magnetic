import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
// import wasm from "vite-plugin-wasm";

export default defineConfig({
  // envPrefix: "ELECTRIC_",
  plugins: [
    react(),
    //wasm()
  ],
  server: {
    port: 5000,
    host: "0.0.0.0",
  },
  build: {
    target: "esnext", //browsers can handle the latest ES features
  },
  optimizeDeps: {
    esbuildOptions: {
      // Node.js global to browser globalThis
      define: {
        global: "globalThis",
        "process.env.NODE_DEBUG": "false",
      },
    },
    exclude: ["wa-sqlite"],
  },
});
