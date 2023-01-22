module.exports = {
  tailwindConfig: './tailwind.config.js',
  printWidth: 120,
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: true,
  trailingComma: 'all',
  overrides: [
    {
      files: '**/*.html',
      options: {
        parser: 'html',
      },
    },
    {
      files: '**/*.component.html',
      options: {
        parser: 'angular',
      },
    },
  ],
};
