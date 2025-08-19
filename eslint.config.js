import js from "@eslint/js";

export default [
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        console: "readonly",
        process: "readonly"
      },
    },
    ignores: [
      "node_modules/**"
    ],
    rules: {
      "no-var": "error",
      "semi": ["error", "always"],
      "quotes": ["error", "double"],
    }
  }
];