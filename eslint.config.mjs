import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";
import importPlugin, { configs } from "eslint-plugin-import";
import reactHooks from "eslint-plugin-react-hooks";
import parser from "@typescript-eslint/parser";

export default [
  {
    files: ["**/*.{tsx,ts,js}"],
    languageOptions: {
      sourceType: "script",
      parser: parser,
    },
    plugins: {
      import: importPlugin,
      "react-hooks": reactHooks,
    },
    rules: {
      ...configs.recommended.rules,
      ...reactHooks.recommended,
    },
  },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReactConfig,
];
