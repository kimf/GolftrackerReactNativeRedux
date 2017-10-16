module.exports = {
  parser: "babel-eslint",
  plugins: [
    "react",
    "react-native",
  ],
  extends: [
    "airbnb"
  ],
  globals: {
    "__DEV__": true,
    "__OFFLINE__": true,
    "window": true,
    "navigator": true,
    "fetch": true,
    "requestAnimationFrame": true
  },
  rules: {
    "valid-jsdoc": 2,
    "no-var": 2,
    "react/jsx-uses-react": 2,
    "react/jsx-uses-vars": 2,
    "react/jsx-no-undef": 2,
    "react/jsx-wrap-multilines": 2,
    "react/jsx-filename-extension": 0,
    "comma-dangle": [2, "never"],
    semi: [2, "never"],
    "no-undef": 2,
    "no-unused-vars": 2,
    "global-require": 0,
    "object-curly-newline": [
      "error", { "multiline": true, "minProperties": 5 }
    ]
  },
  settings: {
    "import/parser": "babel-eslint",
    "import/resolver": {
      "babel-module": {}
    }
  }
}
