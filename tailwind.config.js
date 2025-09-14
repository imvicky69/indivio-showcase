// Tailwind config
const config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // 1. Color Palette
      // We are defining our brand colors here as CSS variables.
      // This makes it easy to manage and reference them throughout the app.
      colors: {
        primary: '#004aad', // Your main brand blue
        accent: '#f97316', // Your brand orange
        dark: '#1a1a1a', // A softer black for text
        light: '#ffffff', // Pure white
      },

      // 2. Font Families
      // We'll use Inter for body text and Poppins for headings.
      fontFamily: {
        sans: ['var(--font-inter)'], // Default body font
        display: ['var(--font-poppins)'], // Heading/display font
      },

      // 3. Background Gradients
      // Here we create a custom utility for the faded gradient background.
      backgroundImage: {
        'hero-gradient':
          'radial-gradient(circle at top, #f0f4ff 30%, #ffffff 100%)',
      },
    },
  },
  plugins: [],
};
module.exports = config;
