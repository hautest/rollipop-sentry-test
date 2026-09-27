import { sentryRollupPlugin } from '@sentry/rollup-plugin';
import { defineConfig } from 'rollipop';

export default defineConfig({
  entry: 'index.js',
  treeshake: true,
  plugins: [sentryRollupPlugin()],
});
