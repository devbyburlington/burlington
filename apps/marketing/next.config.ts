import { resolve } from 'node:path'
import type { NextConfig } from 'next'

const config: NextConfig = {
  outputFileTracingRoot: resolve(__dirname, '../../'),
  transpilePackages: [
    '@burlington/ui',
    '@burlington/design-tokens',
    '@burlington/shared',
  ],
}

export default config
