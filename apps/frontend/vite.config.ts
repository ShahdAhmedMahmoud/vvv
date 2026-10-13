import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true,
    port: 5080,
    strictPort: true,
    watch: {
      ignored: ["**/dist/**"],
    },
    proxy: {
      "/api": {
        target: "http://127.0.0.1:5070",
        changeOrigin: true,
        xfwd: true,
      },
    },
  },
});
