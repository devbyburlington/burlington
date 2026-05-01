import { resolve } from 'node:path'
import { withSentryConfig } from '@sentry/nextjs'
import type { NextConfig } from 'next'

const config: NextConfig = {
  outputFileTracingRoot: resolve(__dirname, '../../'),
  transpilePackages: [
    '@burlington/ui',
    '@burlington/design-tokens',
    '@burlington/shared',
  ],
}

export default withSentryConfig(config, {
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,
  silent: !process.env.CI,
  widenClientFileUpload: true,
  disableLogger: true,
})
