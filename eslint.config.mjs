import { FlatCompat } from "@eslint/eslintrc";
import prettier from "eslint-plugin-prettier/recommended";

const compat = new FlatCompat();

const eslintConfigs = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  prettier,
  {
    files: ["**/*.{js,jsx,cjs,mjs,ts,tsx,cts,mts}"],
  },
  {
    ignores: ["**/dist/", "**/app/", "**/.next/"],
  },
];
export default eslintConfigs;
