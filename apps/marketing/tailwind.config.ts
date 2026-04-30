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
        dark: {
          base: '#040A0F',
          800: '#0A1018',
          700: '#0F1A24',
          600: '#162230',
        },
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
      animation: {
        'ring-float': 'ring-float 10s ease-in-out infinite',
        'scan-down': 'scan-down 7s linear infinite',
        'hero-fade-up': 'hero-fade-up 1.2s cubic-bezier(.16,1,.3,1) both',
        'dot-pulse': 'dot-pulse 2s ease-in-out infinite',
        'ticker-scroll': 'ticker-scroll 45s linear infinite',
        'assess-fade-in': 'assess-fade-in 0.4s ease-out both',
        'assess-fade-out': 'assess-fade-out 0.25s ease-in both',
      },
      keyframes: {
        'assess-fade-in': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'assess-fade-out': {
          '0%': { opacity: '1', transform: 'translateY(0)' },
          '100%': { opacity: '0', transform: 'translateY(-8px)' },
        },
      },
    },
  },
}

export default config
