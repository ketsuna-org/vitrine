import { readFile, writeFile, readdir, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const docsDir = path.join(root, '_docs');
const blocksGrammarPath = path.join(root, '_data', 'blocks_grammar.json');
const outDir = path.join(root, '_site', 'api');

function parseFrontmatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return {};
  const yaml = match[1];
  const data = {};
  for (const line of yaml.split(/\r?\n/)) {
    const colon = line.indexOf(':');
    if (colon === -1) continue;
    const key = line.slice(0, colon).trim();
    let val = line.slice(colon + 1).trim();
    if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
    else if (val.startsWith("'") && val.endsWith("'")) val = val.slice(1, -1);
    data[key] = val;
  }
  return data;
}

function extractParamsFromSyntax(syntax) {
  if (!syntax) return null;
  const match = syntax.match(/\[(.*)\]/);
  if (!match) return {};
  const inside = match[1];
  if (!inside.trim()) return {};
  const args = inside.split(';').map(s => s.trim());
  const params = {};
  for (const arg of args) {
    const clean = arg.replace(/[^a-zA-Z0-9_()]/g, '');
    const optMatch = clean.match(/^\((.+)\)$/);
    if (optMatch) {
      params[optMatch[1]] = 'string?';
    } else if (clean) {
      params[clean] = 'string';
    }
  }
  return params;
}

function functionNameFromSlug(slug) {
  return '$' + slug.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('');
}

async function collectDocs(dir, prefix = '') {
  const entries = await readdir(dir, { withFileTypes: true });
  let files = [];
  for (const entry of entries) {
    if (entry.isDirectory()) {
      const nested = await collectDocs(path.join(dir, entry.name), path.join(prefix, entry.name));
      files = files.concat(nested);
    } else if (entry.name.endsWith('.md')) {
      files.push({
        fullPath: path.join(dir, entry.name),
        relPath: path.join(prefix, entry.name),
        slug: path.basename(entry.name, '.md')
      });
    }
  }
  return files;
}

async function main() {
  const blocksGrammarRaw = await readFile(blocksGrammarPath, 'utf8');
  const blocksGrammar = JSON.parse(blocksGrammarRaw);

  const docFiles = await collectDocs(docsDir);
  const bdfd = {};
  const javascript = {};
  const docsIndex = [];

  for (const file of docFiles) {
    const content = await readFile(file.fullPath, 'utf8');
    const data = parseFrontmatter(content);
    const slug = file.slug;
    const apiType = data.api_type || (file.relPath.startsWith('javascript') ? 'javascript' : 'bdfd');
    const name = data.title || functionNameFromSlug(slug);
    const desc = data.description || '';
    const category = data.category || (apiType === 'javascript' ? 'JavaScript API' : 'General');
    const syntax = data.syntax || null;

    let params = null;
    if (blocksGrammar[slug]) {
      params = blocksGrammar[slug].params;
    } else if (data.function_name && blocksGrammar[data.function_name]) {
      params = blocksGrammar[data.function_name].params;
    } else if (syntax) {
      params = extractParamsFromSyntax(syntax);
    }

    if (apiType === 'bdfd' && (syntax || data.function_name || name.startsWith('$'))) {
      bdfd[name] = {
        desc,
        category,
        syntax: syntax || undefined,
        params: params || {}
      };
    } else if (apiType === 'javascript') {
      javascript[name] = {
        desc,
        category,
        slug,
        params: params || undefined
      };
    }

    docsIndex.push({
      slug,
      name,
      category,
      api_type: apiType,
      description: desc,
      status: data.status || 'documented',
      syntax: syntax || undefined,
      params: params || undefined,
      markdown_url: `https://bot-creator.fr/api/docs/${slug}.md`,
      url: `https://bot-creator.fr/docs/${slug}/`
    });
  }

  docsIndex.sort((a, b) => a.slug.localeCompare(b.slug));

  const manifest = {
    version: '1.0',
    modes: {
      blocks: blocksGrammar,
      bdfd,
      javascript
    }
  };

  await mkdir(outDir, { recursive: true });
  await writeFile(path.join(outDir, 'schema-manifest.json'), JSON.stringify(manifest, null, 2), 'utf8');
  console.log(`Generated _site/api/schema-manifest.json with ${Object.keys(blocksGrammar).length} blocks, ${Object.keys(bdfd).length} BDFD functions, and ${Object.keys(javascript).length} JS modules.`);

  await writeFile(path.join(outDir, 'docs-index.json'), JSON.stringify(docsIndex, null, 2), 'utf8');
  console.log(`Updated _site/api/docs-index.json with ${docsIndex.length} entries.`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
