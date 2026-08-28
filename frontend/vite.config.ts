import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@stellar/stellar-sdk": path.resolve(__dirname, "node_modules/@stellar/stellar-sdk"),
    },
  },
  server: {
    proxy: {
      "/api": "http://localhost:3001",
    },
  },
});
