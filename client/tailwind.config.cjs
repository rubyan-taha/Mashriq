/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          cream: '#FDFBF9',      // Warm soft background
          creamDark: '#F5F0EA',  // Secondary card background
          charcoal: '#151211',   // High-contrast midnight luxury
          terracotta: '#C85A32', // Vibrant spice accent
          gold: '#D4AF37'        // Elegant metallic border/accent
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', '"Playfair Display"', 'serif'], // Heading font
        sans: ['"Plus Jakarta Sans"', '"Inter"', 'sans-serif'],        // Body font
      },
      backgroundImage: {
        'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%)',
      }
    },
  },
  plugins: [],
}
