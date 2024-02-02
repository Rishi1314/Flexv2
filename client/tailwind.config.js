/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        border: 'border 4s ease infinite',
      },
      fontFamily: {

        homemadeApple: ['Homemade Apple', 'cursive'],
        mukta: ['Mukta', 'sans-serif'],
        lexend: ['Lexend', 'sans-serif'],
        seewead: ['Seaweed Script', 'cursive'],
      },
      keyframes: {
        border: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
    },
  },
  plugins: [],
}