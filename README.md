# Porfolio

<!-- Replace with your project name -->

**A modern Jekyll website** | *Clean, responsive, and easy to maintain*

---

## Features

- GitHub-flavored Markdown support
- Automatic syntax highlighting
- Responsive design (mobile-first approach)
- SEO-optimized structure
- Built-in blog functionality
- Customizable through `_config.yml`
- RSS feed integration
- Social media sharing capabilities

## Quick Start

### Prerequisites
- Ruby ≥ 3.0
- Bundler gem
- Jekyll ≥ 4.3
- Node.js & npm for assets compilation

### Installation

git clone https://github.com/your-username/your-repo.git
cd your-repo
bundle install
npm install

### Local Development

bundle exec jekyll serve
Access at http://localhost:4000

## Configuration

Essential `_config.yml` settings:
```yml
title: Your Site Title
description: >-
A brief description of your website
baseurl: ""
url: "https://your-domain.com"

# Optional features
plugins:
    jekyll-feed
    jekyll-seo-tag
social:
    github: your-username
    twitter: your-handle
```

## Content Structure

.
├── _posts/ # Blog posts (YYYY-MM-DD-title.md)
├── _pages/ # Custom pages (about.md, contact.md)
├── _data/ # Structured content
├── _includes/ # Reusable components
├── _layouts/ # Page templates
├── assets/ # CSS/JS/images
└── _config.yml # Site configuration

## Writing Content

### Blog Posts

layout: post
title: "My First Post"
date: 2025-02-09
categories: [general]
tags: [jekyll, webdev]
Content in Markdown format...

### Custom Pages

layout: page
title: About
permalink: /about/

Our Story
Section content...

## Deployment

### GitHub Pages
1. Enable GitHub Pages in repository settings
2. Set source branch to `gh-pages`
3. Add this to `_config.yml`:
```yml
    github:
    repo: https://github.com/your-username/your-repo
```

### Netlify
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/your-username/your-repo)

## Customization Tips

1. **Themes**: Override theme defaults in `_sass/`
2. **Navigation**: Edit `_data/navigation.yml`
3. **SEO**: Use `{% seo %}` tag in layouts
4. **Analytics**: Add tracking IDs to `_config.yml`

## Contributing

Contributing to this project is prohobited as it is a personal project.

## License

This project is unliscensed. You are free to use it as you wish.

## Acknowled

This project use TailwindCSS v3 for styling and Jekyll for static site generation.

## Support

For any inquiries, reach out to me at [contact@jeremysoler.com](mailto:contact@jeremysoler.com)
