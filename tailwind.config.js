module.exports = {
  content: [
    './_drafts/**/*.html',
    './_includes/**/*.html',
    './_layouts/**/*.html',
    './_posts/*.md',
    './*.md',
    './*.html',
    './blog/*.html',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          600: '#9333ea',  // Purple accent
          700: '#7e22ce',
        },
        dark: {
          900: '#0a0a0a',   // Dark grey
          950: '#010101',
        },
        purple: {
          100: '#f3e8ff',
          600: '#9333ea',
          700: '#7e22ce'
        },
      }
    }
  },
  plugins: []
}
