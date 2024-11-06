import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    outDir: "dist",
    rollupOptions: {
      input: {
        // script: "src/script.js",
        widget: "src/widget.js",
      },
      output: {
        format: "amd",
        entryFileNames: "[name].js",
      },
      preserveEntrySignatures: "exports-only",
      treeshake: false,
      external: ["lib/components/base/modal", "moment"],
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern-compiler",
      },
    },
  },
  resolve: {
    alias: {
      "@": "/src/",
    },
  },
});
