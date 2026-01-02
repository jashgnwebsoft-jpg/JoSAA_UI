/**
 * @type {import("prettier").Config}
 * Need to restart IDE when changing configuration
 * Open the command palette (Ctrl + Shift + P) and execute the command > Reload Window.
 */
const config = {
  // Basic formatting
  semi: true,
  tabWidth: 2,
  useTabs: false,
  endOfLine: 'lf',
  printWidth: 100,
  singleQuote: true,
  trailingComma: 'es5',
  
  // JSX specific
  jsxSingleQuote: true,
  bracketSpacing: true,
  bracketSameLine: false,
  arrowParens: 'avoid',
  
  // Additional options for better consistency
  quoteProps: 'as-needed',
  requirePragma: false,
  insertPragma: false,
  proseWrap: 'preserve',
  htmlWhitespaceSensitivity: 'css',
  
  // File specific overrides
  overrides: [
    {
      files: ['*.json', '*.jsonc'],
      options: {
        tabWidth: 2,
        singleQuote: false,
      },
    },
    {
      files: ['*.md', '*.markdown'],
      options: {
        printWidth: 80,
        proseWrap: 'always',
      },
    },
    {
      files: ['*.yaml', '*.yml'],
      options: {
        tabWidth: 2,
        singleQuote: false,
      },
    },
  ],
};

export default config;
