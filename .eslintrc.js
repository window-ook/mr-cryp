module.exports = {
  extends: ['next/core-web-vitals', 'plugin:prettier/recommended'],
  plugins: ['prettier'],
  rules: {
    'no-undef': 'error',
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        semi: true,
        tabWidth: 2,
        trailingComma: 'all',
        printWidth: 80,
        bracketSpacing: true,
        arrowParens: 'avoid',
      },
    ],
  },
  env: {
    browser: true, // ✅ 브라우저에서 Promise 사용 가능
    es2021: true, // ✅ 최신 ECMAScript 환경 지원
  },
  parserOptions: {
    ecmaVersion: 'latest', // ✅ 최신 JavaScript 지원
    sourceType: 'module',
  },
};
