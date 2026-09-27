import 'rollipop/client';

declare global {
  interface ImportMetaEnv {
    readonly ROLLIPOP_SENTRY_DSN?: string;
  }
}
