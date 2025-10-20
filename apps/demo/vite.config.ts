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
  // ssr: {
  //   // Workaround for resolving dependencies in the server bundle
  //   // Without this, the React context will be different between direct import and transitive imports in development environment
  //   // For more information, see https://github.com/mui/material-ui/issues/45878#issuecomment-2987441663
  //   optimizeDeps: { //     include: ['@fluentui/*'],
  //   },
  //   noExternal: ['@fluentui/*'],
  // },

  // Required for Fluent UI icons in SSR
  ssr: {
    noExternal: ['@fluentui/react-icons'],
  },

  server: {
    port: 5173,
  },
}));
