/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "bg_img": "url('https://dnvefa72aowie.cloudfront.net/origin/smb/201908/1CA8A52BB2211C0E9CE0D767BEB7780C284AD9EB18CCCE5AF3B46B47FE7759FA.jpg?q=95&s=1440x1440&t=inside')",
      },
    },
  },
  plugins: [],
};

module.exports = config;
