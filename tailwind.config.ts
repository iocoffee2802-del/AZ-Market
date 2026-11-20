import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: { extend: { colors: { ink: "#17211d", leaf: "#176b4d", cream: "#f7f7f2" } } },
  plugins: []
};
export default config;
