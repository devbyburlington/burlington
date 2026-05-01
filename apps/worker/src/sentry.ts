import * as Sentry from '@sentry/node'

const dsn = process.env.SENTRY_DSN

if (dsn) {
  Sentry.init({
    dsn,
    tracesSampleRate: 1.0,
    environment: process.env.NODE_ENV ?? 'development',
  })
  console.info('[sentry] Initialised')
} else {
  console.warn('[sentry] No SENTRY_DSN set — errors will only log to stdout')
}

export { Sentry }
