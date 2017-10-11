module.exports = {
    "env": {
        "browser": true,
        "node": true,
        "es6": true
    },
    "ecmaFeatures": {
        "modules": true,
        "module":  true
    },
    "parserOptions": {
        "sourceType": "module"
    },
    "globals": {
        "Phaser": true,
        "GAME_TITLE": true
    },
    "extends": "eslint:recommended",
    "rules": {
        "indent": 0,
        "linebreak-style": 0,
        "quotes": 0,
        "semi": [
            "error",
            "always"
        ],
        "no-unused-vars": 1,
        "no-console": 1
    }
};
