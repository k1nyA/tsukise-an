import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      "src/components/badge/**",
      "src/components/button/**",
      "src/components/card/**",
      "src/components/column/**",
      "src/components/container/**",
      "src/components/dropdown/**",
      "src/components/grid/**",
      "src/components/heading/**",
      "src/components/icon/**",
      "src/components/icon-button/**",
      "src/components/image/**",
      "src/components/material-layer/**",
      "src/components/menu-item/**",
      "src/components/navbar/**",
      "src/components/placeholder-block/**",
      "src/components/row/**",
      "src/components/section/**",
      "src/components/select/**",
      "src/components/snackbar/**",
      "src/components/state-layer/**",
      "src/components/sticker/**",
      "src/components/switch/**",
      "src/components/tab-content/**",
      "src/components/tab-link/**",
      "src/components/tab-menu/**",
      "src/components/tabs/**",
      "src/components/text/**",
      "src/components/text-input/**",
      "src/components/theme/**",
      "src/components/theme-controller/**",
      "src/lib/colorUtils.ts",
      "src/lib/componentUtils.ts",
      "src/lib/utilities.ts",
      "src/lib/types/**"
    ],
  },
  ...compat.extends("next/core-web-vitals", "next/typescript"),
];

export default eslintConfig;
