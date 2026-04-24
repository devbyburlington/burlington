import type { Config } from 'tailwindcss'
import { colors, fontFamily } from '@burlington/design-tokens'

const config: Config = {
  content: [],
  theme: {
    extend: {
      colors,
      fontFamily: {
        serif: [...fontFamily.serif],
        sans: [...fontFamily.sans],
      },
    },
  },
  plugins: [],
}

export default config
