module.exports = {
  bracketSpacing: false,
  printWidth: 85,
  semi: true,
  singleQuote: true,
  trailingComma: 'es5',
  useTabs: false,
  overrides: [
    {
      files: 'package*.json',
      options: {
        printWidth: 1000,
      },
    },
  ],
};
