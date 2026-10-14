import { defineConfig } from "vitest/config";

// Standalone from vite.config.ts on purpose: that file sets `root: "client"`
// for the Vite app build, which would make Vitest only look for tests under
// client/ and miss server/. This config targets the server-side unit tests.
export default defineConfig({
  test: {
    include: ["server/**/*.test.ts"],
  },
});
