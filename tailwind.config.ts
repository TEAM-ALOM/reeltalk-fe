import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ReelTalk_DeepBlue: "#1E88E5",
        ReelTalk_LightBlue: "#E3F2FD",
        ReelTalk_Yellow: "#FFC107",
      },
    },
  },
  plugins: [],
};
export default config;
