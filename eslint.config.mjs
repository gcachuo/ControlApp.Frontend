/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    rules: {
      "no-console": ["error", { allow: ["info", "warn", "error"] }],
    },
  },
];
