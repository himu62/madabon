/// <reference types="vitest" />
import { defineConfig } from "vitest/config";
import { config } from "dotenv";
import swc from "unplugin-swc";

export default defineConfig({
  test: {
    globals: true,
    env: config({ path: "./.env.test" }).parsed,
    include: ["./test/**/*.e2e-spec.ts"],
  },
  plugins: [swc.vite()],
});
