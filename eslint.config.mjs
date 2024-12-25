// module.exports = {
//   extends: [
//     "eslint:recommended",
//     "plugin:react/recommended",
//     "plugin:react/jsx-runtime",
//     "@electron-toolkit/eslint-config-ts/recommended",
//     "@electron-toolkit/eslint-config-prettier",
//   ],
//   configs: {
//     recommended
//   },
//   ignorePatterns: ["node_modules", "dist", "out", ".gitignore"],
// };

import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import ts from "typescript-eslint";
import prettier from "eslint-plugin-prettier/recommended";

const compat = new FlatCompat();

export default [
  js.configs.recommended,
  ...ts.configs.recommended,
  prettier,
  ...compat.extends("plugin:react/recommended", "plugin:react/jsx-runtime"),
  {
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  {
    files: ["**/*.{js,jsx,cjs,mjs,ts,tsx,cts,mts}"],
  },
  {
    ignores: ["**/dist/", "**/out/"],
  },
];
