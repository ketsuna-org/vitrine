/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './_layouts/**/*.html',
    './_includes/**/*.html',
    './tutorials/_posts/**/*.{html,md}',
    './fr/**/*.{html,md}',
    './*.md',
    './*.html',
    './blog/**/*.html',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        "primary": "#ddb7ff",
        "primary-container": "#b76dff",
        "on-primary-container": "#400071",
        "secondary": "#c0c1ff",
        "secondary-container": "#3131c0",
        "tertiary": "#c4c1fb",
        "background": "#0b1326",
        "surface": "#0b1326",
        "surface-container": "#171f33",
        "surface-container-low": "#131b2e",
        "surface-container-high": "#222a3d",
        "surface-container-highest": "#2d3449",
        "on-surface": "#dae2fd",
        "on-surface-variant": "#cfc2d6",
        "outline": "#988d9f",
        "outline-variant": "#4d4354",
      },
      fontFamily: {
        "display": ["Space Grotesk", "sans-serif"],
        "sans": ["Space Grotesk", "sans-serif"]
      },
      borderRadius: {
        "sm": "0.125rem",
        "DEFAULT": "0.25rem",
        "md": "0.375rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "2xl": "1rem",
        "full": "9999px"
      },
      boxShadow: {
        'neon': '0 0 15px -3px rgba(221, 183, 255, 0.4)',
        'neon-strong': '0 0 20px -2px rgba(183, 109, 255, 0.6)',
      }
    },
  },
  plugins: [],
}
