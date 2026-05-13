module.exports = {
  content: [
    './_drafts/**/*.{html,md}',
    './_includes/**/*.html',
    './_layouts/**/*.html',
    './_posts/**/*.{html,md}',
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
        "primary": "#0058be", // Electric Blue (Action color)
        "primary-dark": "#070235", // Deep Navy
        "indigo-deep": "#1e1b4b",
        "background": "#f8f9ff",
        "surface": "#f8f9ff",
        "on-surface": "#0b1c30",
        "ghost-slate": "#f8fafc",
      },
      fontFamily: {
        "display": ["Space Grotesk", "sans-serif"],
        "sans": ["Inter", "sans-serif"]
      },
      borderRadius: {
        "sm": "0.25rem",
        "DEFAULT": "0.5rem",
        "md": "0.75rem",
        "lg": "1rem",
        "xl": "1.5rem",
        "2xl": "2rem",
        "full": "9999px"
      },
      boxShadow: {
        'ambient': '0 10px 30px rgba(30, 27, 75, 0.05)',
        'premium-hover': '0 20px 40px rgba(30, 27, 75, 0.1)',
      }
    },
  },
  plugins: [],
}
