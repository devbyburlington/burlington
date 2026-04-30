import { resolve } from 'node:path'
import type { NextConfig } from 'next'

const config: NextConfig = {
  outputFileTracingRoot: resolve(__dirname, '../../'),
  transpilePackages: [
    '@burlington/ui',
    '@burlington/design-tokens',
    '@burlington/shared',
  ],
  async redirects() {
    return [
      {
        source: '/resources',
        destination: '/knowledge-centre',
        permanent: true,
      },
      {
        source: '/resources/:slug',
        destination: '/knowledge-centre/:slug',
        permanent: true,
      },
      {
        source: '/cases',
        destination: '/case-profiles',
        permanent: true,
      },
    ]
  },
}

export default config
