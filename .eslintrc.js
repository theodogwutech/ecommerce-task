export default {
    env: {
        es2021: true,
        node: true,
        mocha: true,
    },
    extends: "standard",
    parserOptions: {
        ecmaVersion: 2017,
        sourceType: "module",
    },
    rules: {
        semi: ["error", "always"],
        quotes: ["error", "double"],
        indent: ["error", 2],
    },
};
