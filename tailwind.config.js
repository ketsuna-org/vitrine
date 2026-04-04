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
      colors: {
        'bot-purple': {
          dark: '#1e0b38',
          DEFAULT: '#7214c7',
          light: '#a855f7',
          glow: 'rgba(168, 85, 247, 0.4)',
        },
        'bot-bg': {
          darkest: '#050308',
          dark: '#0a0512',
          card: 'rgba(20, 15, 30, 0.65)',
          border: 'rgba(255, 255, 255, 0.08)'
        }
      },
      boxShadow: {
        'glow-sm': '0 0 10px rgba(168, 85, 247, 0.2)',
        'glow-md': '0 0 20px rgba(168, 85, 247, 0.3)',
        'glow-lg': '0 0 40px rgba(168, 85, 247, 0.4)',
      },
      animation: {
        'blob': 'blob 7s infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        blob: {
          '0%': {
            transform: 'translate(0px, 0px) scale(1)',
          },
          '33%': {
            transform: 'translate(30px, -50px) scale(1.1)',
          },
          '66%': {
            transform: 'translate(-20px, 20px) scale(0.9)',
          },
          '100%': {
            transform: 'translate(0px, 0px) scale(1)',
          },
        }
      }
    }
  },
  plugins: []
}
