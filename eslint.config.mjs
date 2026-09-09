import { FlatCompat } from "@eslint/eslintrc";
import prettier from "eslint-config-prettier";
const compat = new FlatCompat({ baseDirectory: import.meta.dirname });
export default [
  { ignores: [".next/**", "node_modules/**", "coverage/**", "next-env.d.ts", "artifacts/**"] },
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  prettier,
];
