import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        // "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        // "gradient-conic":
        //   "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        //   "bg_img": "url('https://media.istockphoto.com/id/1262998467/ko/%EC%82%AC%EC%A7%84/%EB%AF%B8%EA%B5%AD-%EB%8B%AC%EB%9F%AC-%EC%9C%A0%EB%A1%9C-%ED%94%84%EB%9E%AD%ED%81%AC-%EC%97%94-%EA%B8%88%EC%9C%B5-%EB%8F%88-%EA%B8%80%EB%A1%9C%EB%B2%8C-%EA%B8%88%EC%9C%B5-%EC%A3%BC%EC%8B%9D-%EC%8B%9C%EC%9E%A5-%EB%B0%B0%EA%B2%BD.jpg?s=612x612&w=0&k=20&c=oSd8A2LVGFOjVcomW6kRI9EQHvp11-JHXfXOzxSikoQ=')",
        "bg_img": "url('/images/bg-image.jpg')",

      },

      
    },
  },
  plugins: [],
};
export default config;
