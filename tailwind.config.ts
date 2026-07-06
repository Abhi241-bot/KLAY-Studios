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
        white: '#FFFFFF',
        bg: {
          DEFAULT: '#FFFFFF',
          warm: '#FBF5F0',
          deep: '#F4E7DE',
        },
        terracotta: {
          50: '#F6E4D8',
          100: '#E9C7B3',
          300: '#E08A5B',
          500: '#C1592E',
          700: '#8C3F22',
          900: '#5C2A17',
        },
        ink: {
          300: '#B7A99E',
          500: '#7C6B62',
          700: '#4A3B33',
          900: '#241A15',
        },
        line: '#E3D2C6',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Archivo', 'sans-serif'],
        body: ['var(--font-body)', 'Inter', 'sans-serif'],
      },
      fontSize: {
        'hero': 'clamp(3rem, 8vw, 7rem)',
        'display': 'clamp(2rem, 5vw, 3.5rem)',
        'h2': 'clamp(1.5rem, 3vw, 2.25rem)',
        'body-lg': 'clamp(1.1rem, 1.6vw, 1.35rem)',
        'label': '0.8rem',
      },
      letterSpacing: {
        label: '0.08em',
        wide: '0.05em',
      },
      lineHeight: {
        relaxed: '1.6',
        tight: '1.1',
      },
      spacing: {
        section: 'clamp(80px, 12vw, 200px)',
        container: 'clamp(24px, 5vw, 80px)',
      },
      maxWidth: {
        container: '1520px',
      },
      borderRadius: {
        sm: '2px',
        md: '4px',
      },
      boxShadow: {
        card: '0 8px 30px rgba(36,26,21,0.08)',
      },
      transitionTimingFunction: {
        'expo-out': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'expo-in-out': 'cubic-bezier(0.87, 0, 0.13, 1)',
      },
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        scrollDown: {
          '0%, 100%': { transform: 'translateY(0)', opacity: '1' },
          '50%': { transform: 'translateY(8px)', opacity: '0.4' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        marquee: 'marquee var(--marquee-duration, 30s) linear infinite',
        'scroll-down': 'scrollDown 1.8s ease-in-out infinite',
        'fade-up': 'fadeUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
    },
  },
  plugins: [],
}

export default config
