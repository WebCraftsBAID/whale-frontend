module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "standard-with-typescript",
        "plugin:react/recommended"
    ],
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "indent": ["error", 4, { "ignoredNodes": ["JSXAttribute", "JSXSpreadAttribute"] }],
        "@typescript-eslint/indent": ["error", 4, { "ignoredNodes": ["JSXAttribute", "JSXSpreadAttribute"] }],
        "react/jsx-indent": ["error", 4],
        "react/jsx-indent-props": ["error", "first"],
        "react/react-in-jsx-scope": "off",
        "@typescript-eslint/no-non-null-assertion": "off",
        "space-before-function-paren": "off",
        "@typescript-eslint/space-before-function-paren": "off"
    }
}
