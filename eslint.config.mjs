import js from "@eslint/js";
import globals from "globals";

const languageOptions = {
  languageOptions: { globals: { ...globals.browser } },
};

export default [
  js.configs.recommended,
  languageOptions,
  {
    rules: {
      "no-unused-vars": "warn",
      "no-undef": "warn",
    },
  },
];
