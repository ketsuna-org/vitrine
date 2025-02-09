---
layout: default
title: Home
project:
    - title: Portfolio Website
      description: A fully responsive portfolio website built with Jekyll and Tailwind CSS. Features a blog section and dynamic content integration.
      link: https://github.com/garder500/portfolio
    - title: SQLiberty
      description: A simple ORM for MySQL databases written in PHP.
      link: https://github.com/garder500/SQLiberty
    - title: SafeStore
      description: A Firebase alternative self-hosted on your server written in Golang.
      link: https://github.com/garder500/safestore
languages: ["JavaScript", "Python", "Golang", "Rust", "PHP", "HTML5 & CSS3", "SQL", "Bash/Shell Scripting"]
tools: ["VS Code", "Git & GitHub", "Postman", "Docker", "Webpack & Babel"]
frontend: ["HTML5", "CSS3", "JavaScript (ES6+)", "React.js", "Tailwind CSS", "Vue.js", "Svelte", "Solid.js", "NextJS"]
backend: ["Node.js", "Express.js", "Nest.Js Fastify", "Gorilla Mux", "Tokio", "NextJS"]
databases: ["MySQL", "PostgreSQL", "MongoDB", "SQLite", "Redis", "Firebase", "Elasticsearch"]
devops: ["Docker", "GitHub Actions"]

---

<div class="bg-gray-900 text-purple-100 min-h-screen py-8 px-6">
    <p class="text-purple-200 leading-relaxed mb-8">
        Hello! I'm a passionate developer with a focus on creating efficient, scalable, and user-friendly solutions.
        Below, you'll find more about my skills, projects, and the tools I use to bring ideas to life.
    </p>
    <section class="mb-12">
        <h2 class="text-3xl font-semibold text-purple-300 mb-4">Skills</h2>
        <ul class="list-disc list-inside text-purple-200 space-y-2">
            <li>Frontend Development: {{ page.frontend | join: ', ' }}</li>
            <li>Backend Development: {{ page.backend | join: ', ' }}</li>
            <li>Database Management: {{ page.databases | join: ', ' }}</li>
            <li>Version Control: Git & GitHub</li>
            <li>DevOps: {{ page.devops | join: ', ' }}</li>
        </ul>
    </section>
    <section class="mb-12">
        <h2 class="text-3xl font-semibold text-purple-300 mb-4">Projects</h2>
        <div class="space-y-6">
        {% for project in page.project %}
            <div class="bg-gray-800 p-6 rounded-lg shadow-md">
                <h3 class="text-xl font-bold text-purple-200">{{ project.title }}</h3>
                <p class="text-purple-100 mt-2">{{ project.description }}</p>
                <a href="{{ project.link }}" class="text-purple-400 hover:text-white underline mt-2 block">View Project</a>
            </div>
        {% endfor %}
        </div>
    </section>
    <section class="mb-12">
        <h2 class="text-3xl font-semibold text-purple-300 mb-4">Languages Used</h2>
        <ul class="grid grid-cols-2 gap-x-8 gap-y-4 text-purple-200">
            {% for language in page.languages %}
                <li>{{ language }}</li>
            {% endfor %}
        </ul>
    </section>
    <section class="mb-12">
        <h2 class="text-3xl font-semibold text-purple-300 mb-4">Tools I Use</h2>
        <ul class="grid grid-cols-2 gap-x-8 gap-y-4 text-purple-200">
            {% for tool in page.tools %}
                <li>{{ tool }}</li>
            {% endfor %}
        </ul>
    </section>
    <section class="mb-12">
        <h2 class="text-3xl font-semibold text-purple-300 mb-4">Get in Touch</h2>
        <p class="text-purple-200 leading-relaxed">
            I'm always open to discussing new projects, creative ideas, or opportunities to collaborate.
            Feel free to reach out via email at
            <a href="mailto:contact@jeremysoler.com" class="text-purple-400 hover:text-white underline">contact@jeremysoler.com</a>.
        </p>
    </section>
</div>
