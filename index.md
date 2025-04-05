---
layout: default
title: Home

projects:
    - title: Portfolio Website
      description: A fully responsive portfolio website built with Jekyll and Tailwind CSS. Features a blog section and dynamic content integration.
      link: https://github.com/garder500/portfolio
    - title: SQLiberty
      description: A simple ORM for MySQL databases written in PHP.
      link: https://github.com/garder500/SQLiberty
    - title: SafeStore
      description: A Firebase alternative self-hosted on your server written in Golang.
      link: https://github.com/garder500/safestore

qualities: [
  {"title": "HTML/CSS", image: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg"},
  {"title": "Vue", image: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vuejs/vuejs-original.svg"},
  {"title": "React", image: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg"},
  {"title": "SQL", image: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg"},
  {"title": "Redis", image: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg"},
  {"title": "ElasticSearch", image: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/elasticsearch/elasticsearch-original.svg"},
  { "title": "MongoDB", "image": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg"},
  { "title": "Typescript/Javascript", "image": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg"},
  { "title": "Golang", "image": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/go/go-original.svg" },
  { "title": "Dart", "image": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/dart/dart-original.svg" }
]

socials: [
  {"username": "garder500", "link": "https://x.com/garder500", "icon": "fa-brands fa-x-twitter"},
  {"username": "garder500", "link": "https://github.com/garder500", "icon": "fa-brands fa-github"},
  {"username": "jeremy-soler", "link": "https://www.linkedin.com/in/jeremy-soler/", "icon": "fa-brands fa-linkedin-in"},
  {"username": "contact@jeremysoler.com", "link": "mailto:contact@jeremysoler.com", "icon": "fa-solid fa-envelope"}
]

---

{% include hero.html %}
{% include skills.html %}
{% include projects.html %}
{% include footer.html %}
