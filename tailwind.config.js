module.exports = {
  purge: {
    enabled: false,
    content: ['./src/html/**/*.html'],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ['Montserrat', 'sans-serif']
    },
    fontSize: {
      xs: ['0.75rem', '1.15'],
      sm: ['0.875rem', '1.375'],
      tiny: ['0.875rem', '1.375'],
      base: ['1rem', '1.375'],
      lg: ['1.125rem', '1.625'],
      xl: ['1.25rem', '1.375'],
      '2xl': ['1.5rem', '1.375'],
      '3xl': ['1.875rem', '1.2'],
      '4xl': ['2.25rem', '1.2'],
      '5xl': ['3rem', '1.2'],
      '6xl': ['4rem', '1.2'],
      '7xl': ['5rem', '1.2']
    },
    extend: {
      colors: {
        yellow: {
          light: '#FBF8E9',
          pastel: '#F7EFB4'
        },
        gray: {
          rich: '#1F1F1F',
          dark: '#333333'
        }
      },
      spacing: {
        'fb': '1.125rem',
        '500': '31.25rem'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('tailwindcss'),
    require('autoprefixer')
  ],
}
