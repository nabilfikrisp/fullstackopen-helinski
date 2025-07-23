import { defineConfig } from "vite";
import { defineConfig as testConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
const config = defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
    },
  },
});

const tConfig = testConfig({
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./test-setup.ts",
    coverage: {
      provider: "v8",
    },
  },
});

export default {
  ...config,
  ...tConfig,
};
