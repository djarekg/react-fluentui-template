import griffel from '@griffel/vite-plugin';
import { reactRouter } from '@react-router/dev/vite';
import { defineConfig } from 'vite';
import babel from 'vite-plugin-babel';
import { cjsInterop } from 'vite-plugin-cjs-interop';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig(({ command }) => ({
  plugins: [
    reactRouter(),
    tsconfigPaths(),
    babel({
      filter: /\.[jt]sx?$/,
      babelConfig: {
        presets: ['@babel/preset-typescript'], // if you use TypeScript
        plugins: [['babel-plugin-react-compiler']],
      },
    }),

    // Add CJS interop plugin for Fluent UI packages until they are ESM compatible
    cjsInterop({
      dependencies: ['@fluentui/react-components'],
    }),
    // Add Griffel plugin for production optimization
    command === 'build' && griffel(),
  ],

  // Required for Fluent UI icons in SSR
  ssr: {
    noExternal: ['@fluentui/react-icons'],
  },

  server: {
    port: 5173,
  },
}));
