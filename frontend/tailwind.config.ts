import {heroui} from '@heroui/theme';
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/components/image.js"
  ],
  theme: {
    extend: {
      colors: {
        'dusty-rose': '#966d7e',
        'pastel-pink': '#d697b8',
        'vibrant-pink': '#c83f8d',
        'olive-green': '#8d9c57',
        'deep-green': '#5d6f3e',
      },
    },
  },
  plugins: [heroui()],
};