require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
    "extends": [
      "airbnb-typescript/base",
      "plugin:prettier/recommended"
    ],
    "env": {
      "mocha": true
    },
    "plugins": ["prettier", "unicorn", "no-only-tests"],
    "parser": "@typescript-eslint/parser",
    "parserOptions":{
      "project": "tools/toolchain/includes/tsconfig.web.json"
    },
    "rules": {
      "no-console": "error",
      "import/prefer-default-export": "off",
      "no-empty-pattern": "off",
      "import/no-cycle": "off",
      "import/no-duplicates": "off",
      "no-empty-function": "off",
      "no-underscore-dangle": "off",
      "no-useless-constructor": "off",
      "class-methods-use-this": "off",
      "@typescript-eslint/quotes": ["error", "double"],
      "no-empty-interface": "off",
      "ordered-imports": "off",
      "object-literal-sort-keys": "off",
      "no-param-reassign": ["error", { "props": true, "ignorePropertyModificationsFor": ["propertyDesciptor", "handlers"]}],
      "@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
      "no-only-tests/no-only-tests": "error",
      "unicorn/filename-case": [
        "error",
        {
          "case": "kebabCase"
        }
      ],
      "curly": "error"
    },
    "overrides": [
      {
          "files": "*.spec.ts",
          "rules": {
            "no-unused-expressions": "off",
            "@typescript-eslint/no-unused-expressions": "off"
          }
      }
    ],
  }