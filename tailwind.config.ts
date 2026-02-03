import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Elegant wedding color palette inspired by autumn vineyards
        primary: {
          50: '#faf7f5',
          100: '#f3ede8',
          200: '#e6d9ce',
          300: '#d5bfad',
          400: '#c1a089',
          500: '#b08a6e',
          600: '#a37860',
          700: '#886351',
          800: '#6f5246',
          900: '#5b443b',
          950: '#30231e',
        },
        gold: {
          50: '#fdfaed',
          100: '#f9f1cb',
          200: '#f3e193',
          300: '#eccc5a',
          400: '#e6b832',
          500: '#d69e1a',
          600: '#b97b13',
          700: '#945814',
          800: '#7a4617',
          900: '#673a18',
          950: '#3c1e09',
        },
        sage: {
          50: '#f4f7f4',
          100: '#e3ebe3',
          200: '#c8d7c8',
          300: '#a1b9a1',
          400: '#769576',
          500: '#567856',
          600: '#436043',
          700: '#374d37',
          800: '#2e3f2e',
          900: '#273427',
          950: '#121c12',
        },
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['Montserrat', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
