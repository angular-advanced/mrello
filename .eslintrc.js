module.exports = {
  "root": true,
  "env": {
    "es6": true
  },
  "parserOptions": {
    "ecmaVersion": 2018
  },
  "ignorePatterns": ["projects/**/*"],
  "overrides": [
    {
      "files": ["*.ts"],
      "parserOptions": {
        "project": ["tsconfig.json"],
        "createDefaultProgram": true
      },
      "extends": [
        "plugin:@angular-eslint/ng-cli-compat",
        "plugin:@angular-eslint/ng-cli-compat--formatting-add-on",
        "plugin:@angular-eslint/template/process-inline-templates",
        "plugin:prettier/recommended"
      ],
      "rules": {     
        "@angular-eslint/no-output-on-prefix": 0,
        "@angular-eslint/component-selector": [
          "error",
          {
            "type": "element",
            "prefix": "",
            "style": "kebab-case"
          }
        ],
        "@angular-eslint/directive-selector": [
          "error",
          {
            "type": "attribute",
            "prefix": "",
            "style": "camelCase"
          }
        ],
        "@typescript-eslint/dot-notation": "off",
        "@typescript-eslint/explicit-function-return-type": 0,
        "@typescript-eslint/explicit-member-accessibility": [
          "off",
          {
            "accessibility": "explicit"
          }
        ],
        "@typescript-eslint/no-inferrable-types": "off",
        "comma-dangle": ["error", "always-multiline"],
        "arrow-parens": 0,
        "brace-style": ["off", "off"],
        "import/order": "off",
        "max-len": [
          "error",
          {
            "ignorePattern": "^import |^export | implements",
            "code": 180
          }
        ],
        "no-underscore-dangle": "off",
        "object-shorthand": "off",
        "quote-props": ["error", "as-needed"]
      }
    },
    {
      "files": ["*.html"],
      "excludedFiles": ["*inline-template-*.component.html"],
      "extends": [
        "plugin:@angular-eslint/template/recommended",
        "plugin:prettier/recommended"
      ],
      "rules": {}
    },
    {
      "files": ["*.scss"],
      "extends": [
        "plugin:prettier/recommended"
      ],
      "rules": {}
    }
  ]
}
