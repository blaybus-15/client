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
          1: '#E0E5EA',
          2: '#B1B5B9',
          3: '#606265',
        },
        red: '#FF5050',
      },
      boxShadow: {
        inner: 'inset 0 0 0 1px #FFE943',
        innerblue: 'inset 0 0 0 1px #24ABFF',
      },
    },
  },
  plugins: [],
};
