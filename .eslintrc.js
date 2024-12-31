module.exports = {
    "env": {
        node: true,
        // The Follow config only works with eslint-plugin-vue v8.0.0+
        "vue/setup-compiler-macros": true,
    },
    "extends": [
        "eslint:recommended",
        "plugin:vue/essential"
    ],
    "parserOptions": {
        "ecmaVersion": 12,
        "sourceType": "module"
    },
    "plugins": [
        "vue"
    ],
    "rules": {
    }
};
