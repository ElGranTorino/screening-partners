module.exports = {
    content: [
      "./components/**/*.{js,vue,js,jsx,tsx,,ts}",
      "./layouts/**/*.vue,js,jsx,tsx,",
      "./pages/**/*.vue,js,jsx,tsx,",
      "./plugins/**/*.{js,ts}",
      "./nuxt.config.{js,ts}",
    ],
    theme: {
      extend: {
        fontFamily: {
          'montserrat': ['Montserrat', 'sans-serif']
        }
      },
    },
    plugins: [],
  }