import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  plugins: [react(), visualizer()],
  server: { proxy: { "/api": "http://localhost:3001" } },
  build: {
    chunkSizeWarningLimit: 300,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) return id.includes("recharts") ? "recharts" : "vendor";
        },
      },
    },
  },
});