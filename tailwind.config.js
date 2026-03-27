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
  theme: {
    extend: {
      fontFamily: {
        display: ['Space Grotesk', 'IBM Plex Sans', 'sans-serif'],
        sans: ['IBM Plex Sans', 'Segoe UI', 'sans-serif'],
      },
    }
  },
  plugins: []
}
