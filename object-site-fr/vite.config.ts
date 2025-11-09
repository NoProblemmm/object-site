import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tanstackRouter({
      target: "react",
      autoCodeSplitting: true,
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "src/components/"),
      "@store": path.resolve(__dirname, "src/store/"),
      "@api": path.resolve(__dirname, "src/api/"),
      "@common": path.resolve(__dirname, "src/common/"),
      "@theme": path.resolve(__dirname, "src/theme/"),
      "@locales": path.resolve(__dirname, "src/locales/"),
    },
  },
});
