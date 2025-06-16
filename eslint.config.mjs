import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

// Option 1: Completely disable ESLint
const eslintConfig = [];

// Option 2: Keep Next.js config but disable specific rules (uncomment to use)
// const eslintConfig = [
//   ...compat.extends("next/core-web-vitals", "next/typescript"),
//   {
//     rules: {
//       "@typescript-eslint/no-explicit-any": "off",
//       // Add other rules you want to disable
//     },
//   },
// ];

// Option 3: Disable ESLint for specific file patterns (uncomment to use)
// const eslintConfig = [
//   ...compat.extends("next/core-web-vitals", "next/typescript"),
//   {
//     ignores: [
//       "**/*.js",
//       "**/*.jsx",
//       "**/*.ts",
//       "**/*.tsx",
//       // Or specify specific files/folders to ignore
//     ],
//   },
// ];

export default eslintConfig;