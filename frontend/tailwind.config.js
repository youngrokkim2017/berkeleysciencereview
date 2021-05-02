module.exports = {
  purge: [
    './src/**/*.html',
    './src/**/*.js',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    // container: {
    //   screens: {
    //      sm: "100%",
    //      md: "100%",
    //      lg: "500px",
    //      xl: "500px"
    //   }
    // },
    fontFamily: {
      // display: ['adobe-garamond-pro', 'system-ui', 'sans-serif'],
      // body: ['adobe-garamond-pro', 'system-ui', 'sans-serif'],
    },
    // colors: {
    //   primary: {
    //     50: '#f7fee7',
    //     100: '#ecfccb',
    //     200: '#d9f99d',
    //     300: '#bef264',
    //     400: '#a3e635',
    //     500: '#84cc16',
    //     600: '#65a30d',
    //     700: '#4d7c0f',
    //     800: '#3f6212',
    //     900: '#365314',
    //   },
    //   gray: {
    //     50: '#fafafa',
    //     100: '#f4f4f5',
    //     200: '#e4e4e7',
    //     300: '#d4d4d8',
    //     400: '#a1a1aa',
    //     500: '#71717a',
    //     600: '#52525b',
    //     700: '#3f3f46',
    //     800: '#27272a',
    //     900: '#18181b',
    //   },
    // },
    extend: {
      typography: {
        DEFAULT: {
          css: {
            color: 'rgb(51,51,51)',
          },
        },
      },
    }
  },
  important: true,
  plugins: [
    require('@tailwindcss/typography'),
  ],
  variants: {
    textColor: ['active'],
    borderColor: ['focus-within'],
    backgroundColor: ['focus-within'],
    backgroundOpacity: ['focus-within']
  },
}
