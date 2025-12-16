import type { Config } from 'tailwindcss'

export default {
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#1C3163',    // Deep navy blue
          secondary: '#000718',  // Almost black
          accent: '#D6B585',     // Gold/Tan
          light: '#FEFFFF',      // Off-white
        }
      }
    }
  }
} satisfies Config