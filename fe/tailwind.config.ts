// @ts-ignore
import { Config } from 'tailwindcss';

const config = {
  content: ['./src/component/**/*.{js,jsx}', './src/screen/**/*.{js, jsx}', './src/**/*.jsx'],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        'sm': '576px',
        'md': '768px',
        'lg': '992px',
        'xl': '1200px',
        '2xl': '1400px'
      }
    },
    extend: {
      fontFamily: {
        sans: ['OpenSans']
      },
      fontWeight: {
        medium: '500',
        bold: '700'
      },
      colors: {
        'background-paper': '#F3F4F6',
        'background-default': '#FAFAFA',
        'black-text': '#2E2E2E',
        'white-text': '#FAFAFA',
        'divided-line': '#464646',
        primary: {
          light: '#F3ECFE',
        },
        secondary: {
          light: '#7940ED',
        },
        destructive: {
          light: '#DC143C',
        },
        accent: {
          light: '#33284A',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out'
      }
    }
  },
  plugins: [require('tailwindcss-animate'), require('tailwind-scrollbar')]
} satisfies Config;

export default config;
