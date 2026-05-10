/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'primary-dark': '#0F2D5E',
        'primary-medium': '#1A4FAF',
        'accent-cyan': '#00C2E0',
        'body-dark': '#2D3E50',
        'gray-text': '#5A6B7D',
        'gray-light': '#8A9AA0',
        'bg-alt': '#F0F4F8',
        'border-card': '#D8E0DC',
        'footer-dark': '#0A1F40',
      },
    },
  },
  plugins: [],
}

