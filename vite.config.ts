import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';

// ----------------------------------------------------------------------

const PORT = 8081;

export default defineConfig({
  plugins: [
    react(),
    checker({
      typescript: true,
      eslint: {
        useFlatConfig: true,
        lintCommand: 'eslint "./src/**/*.{js,jsx,ts,tsx}"',
        dev: { logLevel: ['error'] },
      },
      overlay: {
        position: 'tl',
        initialIsOpen: false,
      },
    }),
  ],
  resolve: {
    alias: [
      {
        find: /^src(.+)/,
        replacement: path.resolve(process.cwd(), 'src/$1'),
      },
      {
        find: /^minimal\/(.+)/,
        replacement: path.resolve(process.cwd(), 'minimal/$1'),
      },
      {
        find: '@',
        replacement: path.resolve(process.cwd(), 'src'),
      },
      {
        find: '@public',
        replacement: path.resolve(process.cwd(), 'public'),
      },
      {
        find: '@minimal',
        replacement: path.resolve(process.cwd(), 'minimal'),
      },
      {
        find: '@modules',
        replacement: path.resolve(process.cwd(), 'modules'),
      },
      {
        find: '@core',
        replacement: path.resolve(process.cwd(), 'core'),
      },
      {
        find: '@components',
        replacement: path.resolve(process.cwd(), 'core/components'),
      },
      {
        find: '@utils',
        replacement: path.resolve(process.cwd(), 'core/utils'),
      }, {
        find: '@types',
        replacement: path.resolve(process.cwd(), 'core/types'),
      },
    ],
  },
  server: { port: PORT, host: true },
  preview: { port: PORT, host: true },
});
