/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        pretendard: ['Pretendard'],
      },
      colors: {
        main: '#FFE943',
        dark: '#221313',
        background: {
          point: '#FFFEDF',
          gray: '#F3F4F5',
        },
        gray: {
          1: '#606265',
          2: '#B1B5B9',
        },
      },
    },
  },
  plugins: [],
};
