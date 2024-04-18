import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from "path";
import rollupReplace from '@rollup/plugin-replace'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    rollupReplace({
      preventAssignment: true,
      values: {
        __DEV__: JSON.stringify(true),
        'process.env.NODE_ENV': JSON.stringify('development'),
      },
    }),
    react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
});
