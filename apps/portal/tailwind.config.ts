import type { Config } from 'tailwindcss'
import baseConfig from '@burlington/tailwind-config'

const config: Config = {
  presets: [baseConfig],
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    '../../packages/ui/src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'off-white': '#F7F7F5',
        'warm-gray': '#F0F0EC',
        'burl-gray': {
          100: '#E8E7E3',
          200: '#D4D3CF',
          300: '#A8A7A3',
          400: '#78776F',
          500: '#545349',
          700: '#2D2C28',
        },
      },
    },
  },
}

export default config
