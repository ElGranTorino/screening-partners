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
  },
  plugins: [],
}