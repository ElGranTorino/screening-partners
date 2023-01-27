module.exports = {
  content: [
    "./components/**/*.{js,vue,jsx,tsx,ts}",
    "./layouts/**/*.{vue,js,jsx,tsx}",
    "./pages/**/*.{vue,js,jsx,tsx,ts}",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'montserrat': ['Montserrat', 'sans-serif']
      }
    },
    colors: {
      body: '#151521',
      blue: '#0d6efd',
      indigo: '#6610f2',
      purple: '#6f42c1',
      pink: '#d63384',
      red: '#dc3545',
      orange: '#fd7e14',
      yellow: '#ffc107',
      green: '#198754',
      teal: '#20c997',
      cyan: '#0dcaf0',
      black: '#000000',
      white: '#ffffff',
      light: '#F9F9F9',
      primary: '#3E97FF',
      secondary: '#E1E3EA',
      success: '#75CC68',
      info: '#7239EA',
      warning: '#E78B2F',
      danger: '#F1416C',
      dark: '#181C32',
      gray: {
        100: '#F9F9F9',
        200: '#F4F4F4',
        300: '#E1E3EA',
        400: '#B5B5C3',
        500: '#A1A5B7',
        600: '#7E8299',
        700: '#5E6278',
        800: '#3F4254',
        900: '#181C32',
      },
      'primary-text': '#0a58ca',
      'secondary-text': '#7E8299',
      'success-text': '#146c43',
      'info-text': '#087990',
      'warning-text': '#997404',
      'dange-text': '#b02a37',
      'light-text': '#7E8299',
      'dark-text': '#5E6278',
    }
  },
  plugins: [],
}