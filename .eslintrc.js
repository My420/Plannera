module.exports = {
    parser: '@typescript-eslint/parser',
    extends: ['airbnb','plugin:react/recommended','plugin:@typescript-eslint/recommended', 'prettier/@typescript-eslint', 'plugin:prettier/recommended'],
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
    },
    rules: {
        "react/jsx-filename-extension": "off"
    }
};
