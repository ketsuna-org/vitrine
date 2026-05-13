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
        "on-primary": "#490080",
        "primary-container": "#b76dff",
        "on-primary-container": "#400071",
        "secondary": "#c0c1ff",
        "on-secondary": "#1000a9",
        "secondary-container": "#3131c0",
        "on-secondary-container": "#b0b2ff",
        "tertiary": "#c4c1fb",
        "on-tertiary": "#2d2a5b",
        "tertiary-container": "#8e8bc2",
        "on-tertiary-container": "#262354",
        "background": "#0b1326",
        "on-background": "#dae2fd",
        "surface": "#0b1326",
        "on-surface": "#dae2fd",
        "surface-variant": "#2d3449",
        "on-surface-variant": "#cfc2d6",
        "surface-container": "#171f33",
        "surface-container-low": "#131b2e",
        "surface-container-high": "#222a3d",
        "surface-container-highest": "#2d3449",
        "outline": "#988d9f",
        "outline-variant": "#4d4354",
        "inverse-surface": "#dae2fd",
        "inverse-on-surface": "#283044",
        "error": "#ffb4ab",
        "on-error": "#690005",
        "error-container": "#93000a",
        "on-error-container": "#ffdad6",
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
