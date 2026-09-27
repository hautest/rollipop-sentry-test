import { sentryRollupPlugin } from '@sentry/rollup-plugin';
import { defineConfig } from 'rollipop';

export default defineConfig({
  entry: 'index.js',
  treeshake: true,
  transform: {
    swc: {
      rules: [
        {
          options: {
            env: {
              // Keep Rollipop's hermes-v1 defaults when extending this list.
              include: [
                'transform-block-scoping',
                'transform-class-properties',
                'transform-private-methods',
                'transform-private-property-in-object',
                'transform-async-to-generator',
              ],
            },
          },
        },
      ],
    },
  },
  plugins: [
    sentryRollupPlugin({
      release: {
        name: process.env.SENTRY_RELEASE,
        dist: process.env.SENTRY_DIST,
        uploadLegacySourcemaps: './build/android',
      },
    }),
  ],
});
