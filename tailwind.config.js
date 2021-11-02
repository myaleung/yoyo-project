module.exports = {
  purge: {
    enabled: true,
    content: ['./src/html/**/*.html'],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ['Montserrat', 'sans-serif']
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
