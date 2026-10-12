#!/usr/bin/env node
/**
 * Audits vitrine URLs and generates Cloudflare Pages _redirects for /fr/* removal.
 * Also checks _docs slug collisions with planned /docs/javascript/* paths.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const DOCS_DIR = path.join(ROOT, '_docs');
const POSTS_DIR = path.join(ROOT, '_posts');
const OUTPUT = path.join(ROOT, '_redirects');

const JS_PLANNED_SLUGS = [
  'javascript',
  'javascript-db',
  'javascript-db-user',
  'javascript-db-global',
  'javascript-db-guild',
  'javascript-db-channel',
  'javascript-db-message',
  'javascript-db-guild-member',
  'javascript-interaction',
  'javascript-message',
  'javascript-client',
  'javascript-console',
  'javascript-fetch',
  'javascript-require',
  'javascript-placeholders',
  'getting-started',
];

// /fr/, /fr/download/ and /fr/faq/ are real French pages now. The rules below only cover old French
// addresses of pages that have no French version (docs, guides, legal): they go to the English page.
const STATIC_REDIRECTS = [
  ['/fr/blog', '/blog/'],
  ['/fr/blog/', '/blog/'],
  ['/fr/privacy', '/privacy-policy.html'],
  ['/fr/privacy/', '/privacy-policy.html'],
  ['/fr/cgv', '/terms-of-sale.html'],
  ['/fr/cgv/', '/terms-of-sale.html'],
  ['/fr/guides/runner-docker-api-only', '/guides/runner-docker-api-only/'],
  ['/fr/guides/runner-docker-api-only/', '/guides/runner-docker-api-only/'],
];

// French-era guide addresses (the /fr/ posts were removed). Each one points at its English guide.
const FR_ERA_POSTS = [
  ['/getting-started/2025/05/18/comment-creer-un-token-de-bot-discord-bot-creator', '/getting-started/2025/05/18/how-to-create-a-bot-token-bot-creator/'],
  ['/reference-deployment/2026/05/22/variables-li-aux-evenements', '/reference-deployment/2026/05/22/available-variables-per-event-exhaustive/'],
  ['/building-commands/2026/05/23/gerer-les-interactions-riches-boutons-menus-selection-modales', '/building-commands/2026/05/23/handling-rich-interactions-in-bot-creator-buttons-select-menus-modals/'],
  ['/advanced-topics/2026/05/30/ciblage-avance-des-utilisateurs-et-mentions-en-bdfd', '/advanced-topics/2026/05/30/advanced-user-targeting-and-mentions-in-bdfd/'],
  ['/advanced-topics/2026/05/30/comment-creer-un-systeme-de-warn-de-moderation-en-bdfd', '/advanced-topics/2026/05/30/how-to-build-a-moderation-warn-system-in-bdfd/'],
  ['/getting-started/2026/05/30/comment-creer-une-commande-ping-parfaite-en-bdfd', '/getting-started/2026/05/30/how-to-create-a-perfect-ping-command-in-bdfd/'],
  ['/building-commands/2026/05/30/construire-des-boutons-et-menus-selection-interactifs-en-bdfd', '/building-commands/2026/05/30/building-interactive-buttons-and-select-menus-in-bdfd/'],
  ['/building-commands/2026/05/30/creer-des-embeds-discord-sublimes-en-bdfd', '/building-commands/2026/05/30/designing-stunning-discord-embeds-in-bdfd/'],
  ['/advanced-topics/2026/05/30/maitriser-les-variables-de-base-de-donnees-persistantes-en-bdfd', '/advanced-topics/2026/05/30/mastering-persistent-database-variables-in-bdfd/'],
];

// Category folders that guides were published under at some point, seen by Google in Search Console
// (October 2026) and answering 404. Key: the guide's slug-with-date path; value: extra old folders.
const HISTORICAL_FOLDERS = {
  '2025/05/18/how-to-create-a-bot-token-bot-creator': ['setup/security', 'tutorials'],
  '2025/05/18/comment-creer-un-token-de-bot-discord-bot-creator': ['setup/securite', 'getting%20started'],
  '2026/05/23/handling-rich-interactions-in-bot-creator-buttons-select-menus-modals': ['introduction'],
  '2026/05/22/available-variables-per-event-exhaustive': ['reference'],
  '2026/05/22/variables-li-aux-evenements': ['reference%20&%20deployment'],
};

// Old blog pagination pages that no longer exist.
const BLOG_PAGES_GONE = ['/blog/page4/', '/blog/page5/'];

function parseFrontmatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return {};
  const fm = {};
  for (const rawLine of match[1].split('\n')) {
    const line = rawLine.trim();
    if (!line) continue;
    const m = line.match(/^([a-zA-Z0-9_]+):\s*(.*)$/);
    if (m) {
      let val = m[2].trim();
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      fm[m[1]] = val.replace(/\r$/, '');
    }
  }
  return fm;
}

function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

function postUrl(fm, filename) {
  if (fm.permalink) {
    const p = fm.permalink.endsWith('/') ? fm.permalink : `${fm.permalink}/`;
    return p;
  }
  const date = new Date(fm.date);
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');
  const category = slugify(fm.category || 'uncategorized');
  const title = slugify(path.basename(filename, path.extname(filename)).replace(/^\d{4}-\d{2}-\d{2}-/, ''));
  return `/${category}/${year}/${month}/${day}/${title}/`;
}

function listDocs() {
  return fs
    .readdirSync(DOCS_DIR)
    .filter((f) => f.endsWith('.md'))
    .map((f) => path.basename(f, '.md'));
}

function listPosts() {
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith('.md'))
    .map((f) => {
      const content = fs.readFileSync(path.join(POSTS_DIR, f), 'utf8');
      const fm = parseFrontmatter(content);
      return { filename: f, fm, url: postUrl(fm, f) };
    });
}

function main() {
  const docs = listDocs();
  const posts = listPosts();

  console.log('=== Docs slug audit ===');
  const collisions = JS_PLANNED_SLUGS.filter((s) => docs.includes(s));
  if (collisions.length) {
    console.error('COLLISION with planned JS slugs:', collisions);
    process.exitCode = 1;
  } else {
    console.log(`OK: ${docs.length} doc slugs, no collision with ${JS_PLANNED_SLUGS.length} planned JS paths`);
  }

  console.log('\n=== FR post → EN redirect pairs ===');
  const enByKey = new Map();
  for (const p of posts) {
    if (p.fm.locale === 'en' && p.fm.translation_key) {
      enByKey.set(p.fm.translation_key, p.url);
    }
  }

  const postRedirects = [];
  const frPosts = posts.filter((p) => p.fm.locale === 'fr');
  for (const fr of frPosts) {
    const key = fr.fm.translation_key;
    let target = '/blog/';
    if (key && enByKey.has(key)) {
      target = enByKey.get(key);
    } else if (key === 'FR') {
      target = '/reference-deployment/2026/05/22/available-variables-per-event-exhaustive.html';
    }
    const from = fr.url.endsWith('/') ? fr.url.slice(0, -1) : fr.url;
    const fromSlash = fr.url.endsWith('/') ? fr.url : `${fr.url}/`;
    postRedirects.push([from, target]);
    postRedirects.push([fromSlash, target]);
    console.log(`${fr.url} → ${target} (key: ${key || 'none'})`);
  }

  // Posts used to be published under their raw category ("/getting started/..."), with spaces and "&" in the
  // URL. _plugins/seo.rb now slugifies the category; keep the old addresses alive.
  const legacyRedirects = [];
  for (const p of posts.filter((x) => x.fm.locale === 'en' && !x.fm.permalink)) {
    const oldPath = p.url.replace(/^\/[^/]+\//, `/${encodeURIComponent((p.fm.category || 'uncategorized').toLowerCase()).replace(/%26/g, '&')}/`).replace(/\/$/, '.html');
    if (oldPath !== p.url) legacyRedirects.push([oldPath, p.url]);
    // Short-lived intermediate form (slugified category, .html); Cloudflare Pages already strips .html.
    legacyRedirects.push([p.url.replace(/\/$/, '.html'), p.url]);
  }

  // Old addresses of the French-era guides, and old folders, each with and without ".html".
  const extraRedirects = [];
  const seen = new Set(legacyRedirects.map(([from]) => from));
  const addVariants = (folder, tail, target) => {
    for (const from of [`/${folder}/${tail}.html`, `/${folder}/${tail}`]) {
      if (from === target.replace(/\/$/, '')) continue;
      if (!seen.has(from)) { seen.add(from); extraRedirects.push([from, target]); }
    }
  };
  for (const [frPath, target] of FR_ERA_POSTS) {
    const m = frPath.match(/^\/([^/]+)\/(\d{4}\/\d{2}\/\d{2}\/.+)$/);
    const category = m[1];
    const tail = m[2];
    // the raw category ("getting started") that the posts used to be published under
    if (category !== 'reference-deployment') addVariants(category.replace(/-/g, '%20'), tail, target);
    for (const folder of HISTORICAL_FOLDERS[tail] || []) addVariants(folder, tail, target);
  }
  // Same for the English guides: extensionless forms of the raw-category addresses, and the old folders.
  for (const p of posts.filter((x) => x.fm.locale === 'en' && !x.fm.permalink)) {
    const m = p.url.match(/^\/([^/]+)\/(\d{4}\/\d{2}\/\d{2}\/[^/]+)\/$/);
    const rawCategory = encodeURIComponent((p.fm.category || 'uncategorized').toLowerCase()).replace(/%26/g, '&');
    if (rawCategory !== m[1]) addVariants(rawCategory, m[2], p.url);
    for (const folder of HISTORICAL_FOLDERS[m[2]] || []) addVariants(folder, m[2], p.url);
  }

  const lines = [
    '# Generated by scripts/generate-redirects.js — do not edit by hand',
    '# Re-run: node scripts/generate-redirects.js',
    '',
    ...STATIC_REDIRECTS.map(([from, to]) => `${from}\t${to}\t301`),
    ...postRedirects.map(([from, to]) => `${from}\t${to}\t301`),
    '',
    '# French-era guides (removed): old addresses, with and without .html, point at the English guide',
    ...FR_ERA_POSTS.flatMap(([from, to]) => [`${from}.html`, `${from}.html/`].map((f) => `${f}\t${to}\t301`)),
    '',
    '# Legacy post URLs (raw category in the path, then .html)',
    ...legacyRedirects.map(([from, to]) => `${from}\t${to}\t301`),
    '',
    '# Old addresses Google still knows (raw category with spaces, old folders, extensionless forms)',
    ...extraRedirects.map(([from, to]) => `${from}\t${to}\t301`),
    '',
    '# Blog pagination pages that no longer exist',
    ...BLOG_PAGES_GONE.map((from) => `${from}\t/blog/\t301`),
    // No "/fr/*" catch-all: it would also catch the French pages, since redirects run before static files.
  ];

  fs.writeFileSync(OUTPUT, lines.join('\n'));
  console.log(`\nWrote ${OUTPUT} (${lines.length} lines)`);
}

main();
