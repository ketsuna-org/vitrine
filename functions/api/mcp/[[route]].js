// Cloudflare Pages Function: /api/mcp/[[route]]
//
// Stateless Streamable HTTP MCP server exposing read-only access to the
// Bot Creator documentation and blog posts.
//
// Protocol: Model Context Protocol 2025-11-25, Streamable HTTP transport,
// stateless mode (no sessions, no SSE, single JSON-RPC response per POST).
// See https://modelcontextprotocol.io/specification/2025-11-25/basic/transports
//
// Why no @modelcontextprotocol/sdk dependency?
//   The SDK's StreamableHTTPServerTransport is shaped around Node http and
//   session management. For a stateless read-only server on Cloudflare's
//   edge runtime, raw JSON-RPC 2.0 dispatch is simpler, smaller, and immune
//   to SDK API churn between minor versions. Every method we implement
//   returns a single JSON-RPC `result` to the caller — no notifications,
//   no server-initiated messages — so we do not lose any spec compliance.

const SITE_ORIGIN = "https://bot-creator.fr";
const GITHUB_RAW = "https://raw.githubusercontent.com/ketsuna-org/vitrine/master";
const PROTOCOL_VERSION = "2025-11-25";
const SERVER_INFO = {
  name: "bot-creator",
  version: "1.0.0",
};
const CAPABILITIES = {
  tools: { listChanged: false },
  resources: { list: true, listChanged: false },
};

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, GET, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Accept, Mcp-Session-Id, Last-Event-ID",
  "Access-Control-Expose-Headers": "Mcp-Session-Id",
};

// --- Cloudflare Pages Function entrypoints -------------------------------

export async function onRequestOptions() {
  return new Response(null, { status: 204, headers: CORS });
}

export async function onRequestGet() {
  // Clients probe the endpoint with GET before POSTing JSON-RPC. Instead of
  // returning 405 (which some clients treat as fatal), return 200 with
  // server metadata so the endpoint is discovered as alive and well.
  return json(
    {
      jsonrpc: "2.0",
      id: "probe",
      result: {
        protocolVersion: PROTOCOL_VERSION,
        capabilities: CAPABILITIES,
        serverInfo: SERVER_INFO,
        message: "Use POST for JSON-RPC requests.",
      },
    },
    200,
    { Allow: "POST", ...CORS }
  );
}

export async function onRequestDelete() {
  // Stateless: nothing to terminate.
  return new Response(null, { status: 204, headers: CORS });
}

export async function onRequestPost({ request }) {
  let body;
  try {
    body = await request.json();
  } catch {
    return json(jsonrpcError(null, -32700, "Parse error"), 400, CORS);
  }

  // The transport allows batched requests (JSON-RPC array). Handle each
  // independently and return the array of responses (omitting notifications).
  if (Array.isArray(body)) {
    const responses = await Promise.all(body.map(handleSingle));
    const out = responses.filter((r) => r !== null);
    return json(out, 200, CORS);
  }

  const result = await handleSingle(body);
  if (result === null) {
    // Notification accepted, no response body.
    return new Response(null, { status: 202, headers: CORS });
  }
  return json(result, 200, CORS);
}

// --- JSON-RPC dispatch ---------------------------------------------------

async function handleSingle(req) {
  if (!req || typeof req !== "object" || req.jsonrpc !== "2.0") {
    return jsonrpcError(req?.id ?? null, -32600, "Invalid Request");
  }

  // Notifications (no id): we have nothing to act on, so just accept.
  if (req.id === undefined || req.id === null) {
    return null;
  }

  try {
    switch (req.method) {
      case "initialize":
        return {
          jsonrpc: "2.0",
          id: req.id,
          result: {
            protocolVersion: PROTOCOL_VERSION,
            capabilities: CAPABILITIES,
            serverInfo: SERVER_INFO,
          },
        };

      case "notifications/initialized":
        return null;

      case "ping":
        return { jsonrpc: "2.0", id: req.id, result: {} };

      case "tools/list":
        return { jsonrpc: "2.0", id: req.id, result: { tools: TOOLS_META } };

      case "tools/call":
        return await handleToolCall(req);

      case "resources/list":
        return { jsonrpc: "2.0", id: req.id, result: { resources: [] } };

      default:
        return jsonrpcError(req.id, -32601, `Method not found: ${req.method}`);
    }
  } catch (err) {
    console.error("MCP handler error", err);
    return jsonrpcError(req.id, -32603, `Internal error: ${err?.message ?? String(err)}`);
  }
}

function jsonrpcError(id, code, message) {
  return { jsonrpc: "2.0", id, error: { code, message } };
}

// --- Tool metadata -------------------------------------------------------

const TOOLS_META = [
  {
    name: "search_docs",
    description:
      "Search Bot Creator function documentation by name, slug, or category. Returns matching docs with their slugs (use get_doc to read full content).",
    inputSchema: {
      type: "object",
      properties: {
        query: { type: "string", description: "Search term (matched case-insensitively against name, slug, category)." },
        limit: { type: "integer", description: "Max results (default 25).", default: 25, minimum: 1, maximum: 100 },
      },
      required: ["query"],
    },
  },
  {
    name: "get_doc",
    description:
      "Fetch the raw markdown for a Bot Creator function doc by slug (e.g. 'sendmessage', 'canvas_draw_arc'). Returns the file's full markdown content.",
    inputSchema: {
      type: "object",
      properties: {
        slug: { type: "string", description: "Doc slug (filename without .md, e.g. 'sendmessage')." },
      },
      required: ["slug"],
    },
  },
  {
    name: "list_posts",
    description:
      "List Bot Creator blog posts, optionally filtered by locale ('en' or 'fr'). Returns metadata only (use get_post for content).",
    inputSchema: {
      type: "object",
      properties: {
        locale: { type: "string", enum: ["en", "fr"], description: "Filter by locale. Omit for all." },
        limit: { type: "integer", description: "Max results (default 25).", default: 25, minimum: 1, maximum: 100 },
      },
    },
  },
  {
    name: "search_posts",
    description:
      "Search Bot Creator blog posts by title or description. Returns matching post metadata (use get_post for content).",
    inputSchema: {
      type: "object",
      properties: {
        query: { type: "string", description: "Search term (matched case-insensitively against title and description)." },
        limit: { type: "integer", description: "Max results (default 25).", default: 25, minimum: 1, maximum: 100 },
      },
      required: ["query"],
    },
  },
  {
    name: "get_post",
    description:
      "Fetch the raw markdown of a Bot Creator blog post by slug (the filename without the leading date and .md extension).",
    inputSchema: {
      type: "object",
      properties: {
        slug: { type: "string", description: "Post slug (without date prefix or .md), e.g. 'image-creation-canvas-functions-in-bdfd'." },
      },
      required: ["slug"],
    },
  },
];

// --- Tool dispatch -------------------------------------------------------

async function handleToolCall(req) {
  const name = req?.params?.name;
  const args = req?.params?.arguments ?? {};

  if (!name || !TOOLS_META.some((t) => t.name === name)) {
    return jsonrpcError(req.id, -32602, `Unknown tool: ${name}`);
  }

  let result;
  try {
    switch (name) {
      case "search_docs":
        result = await toolSearchDocs(args);
        break;
      case "get_doc":
        result = await toolGetDoc(args);
        break;
      case "list_posts":
        result = await toolListPosts(args);
        break;
      case "search_posts":
        result = await toolSearchPosts(args);
        break;
      case "get_post":
        result = await toolGetPost(args);
        break;
      default:
        return jsonrpcError(req.id, -32601, `Tool not implemented: ${name}`);
    }
  } catch (err) {
    console.error(`Tool ${name} failed`, err);
    return {
      jsonrpc: "2.0",
      id: req.id,
      result: {
        content: [{ type: "text", text: `Tool execution failed: ${err?.message ?? String(err)}` }],
        isError: true,
      },
    };
  }

  return { jsonrpc: "2.0", id: req.id, result };
}

// --- Tool implementations ------------------------------------------------

function toolText(text) {
  return { content: [{ type: "text", text: String(text) }] };
}

function clampLimit(raw, def = 25) {
  const n = Number.parseInt(raw, 10);
  if (!Number.isFinite(n)) return def;
  return Math.min(100, Math.max(1, n));
}

function normalize(s) {
  return String(s ?? "")
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "");
}

async function fetchDocsIndex() {
  const res = await fetch(`${SITE_ORIGIN}/api/docs-index.json`, {
    headers: { Accept: "application/json" },
    cf: { cacheTtl: 300, cacheEverything: true },
  });
  if (!res.ok) throw new Error(`docs-index.json returned ${res.status}`);
  return res.json();
}

async function fetchPostsIndex() {
  const res = await fetch(`${SITE_ORIGIN}/api/posts-index.json`, {
    headers: { Accept: "application/json" },
    cf: { cacheTtl: 300, cacheEverything: true },
  });
  if (!res.ok) throw new Error(`posts-index.json returned ${res.status}`);
  return res.json();
}

async function toolSearchDocs({ query, limit }) {
  const q = normalize(query);
  const lim = clampLimit(limit, 25);
  if (!q) throw new Error("`query` is required");

  const docs = await fetchDocsIndex();
  const scored = docs
    .map((d) => {
      const haystack = [normalize(d.slug), normalize(d.name), normalize(d.category)].join(" ");
      let score = 0;
      if (normalize(d.slug) === q) score += 100;
      if (normalize(d.name) === q) score += 90;
      if (normalize(d.slug).includes(q)) score += 50;
      if (normalize(d.name).includes(q)) score += 40;
      if (normalize(d.category).includes(q)) score += 10;
      if (haystack.includes(q)) score += 5;
      return { d, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, lim)
    .map((x) => x.d);

  return toolText(
    scored.length === 0
      ? `No docs matched "${query}".`
      : JSON.stringify({ count: scored.length, results: scored }, null, 2)
  );
}

async function toolGetDoc({ slug }) {
  if (!slug || typeof slug !== "string") throw new Error("`slug` is required");
  // Defensive: only allow simple slugs.
  if (!/^[a-z0-9_-]+$/i.test(slug)) throw new Error("Invalid slug");

  const url = `${GITHUB_RAW}/_docs/${slug}.md`;
  const res = await fetch(url, { cf: { cacheTtl: 600, cacheEverything: true } });
  if (res.status === 404) {
    return toolText(`Doc not found: ${slug}. Use search_docs to find the correct slug.`);
  }
  if (!res.ok) throw new Error(`GitHub returned ${res.status} for ${url}`);
  const markdown = await res.text();
  return toolText(markdown);
}

async function toolListPosts({ locale, limit }) {
  const lim = clampLimit(limit, 25);
  let posts = await fetchPostsIndex();
  if (locale) {
    const l = normalize(locale);
    posts = posts.filter((p) => normalize(p.locale) === l);
  }
  posts = posts.slice(0, lim);
  return toolText(JSON.stringify({ count: posts.length, results: posts }, null, 2));
}

async function toolSearchPosts({ query, limit }) {
  const q = normalize(query);
  const lim = clampLimit(limit, 25);
  if (!q) throw new Error("`query` is required");

  const posts = await fetchPostsIndex();
  const scored = posts
    .map((p) => {
      const haystack = [normalize(p.title), normalize(p.description)].join(" ");
      let score = 0;
      if (normalize(p.title) === q) score += 100;
      if (normalize(p.title).includes(q)) score += 50;
      if (normalize(p.description).includes(q)) score += 20;
      if (haystack.includes(q)) score += 5;
      return { p, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, lim)
    .map((x) => x.p);

  return toolText(
    scored.length === 0
      ? `No posts matched "${query}".`
      : JSON.stringify({ count: scored.length, results: scored }, null, 2)
  );
}

async function toolGetPost({ slug }) {
  if (!slug || typeof slug !== "string") throw new Error("`slug` is required");
  if (!/^[a-z0-9_-]+$/i.test(slug)) throw new Error("Invalid slug");

  // The deployed post URL on the site uses Jekyll's slug, but the source
  // file on GitHub is named `<date>-<slug>.md`. Resolve via posts-index
  // to find the date prefix, then fetch from GitHub.
  const posts = await fetchPostsIndex();
  const match = posts.find((p) => p.slug === slug);
  if (!match) {
    return toolText(`Post not found: ${slug}. Use search_posts or list_posts to find the correct slug.`);
  }

  const datePrefix = String(match.date || "").slice(0, 10);
  const filename = datePrefix ? `${datePrefix}-${slug}.md` : `${slug}.md`;
  const url = `${GITHUB_RAW}/_posts/${filename}`;
  const res = await fetch(url, { cf: { cacheTtl: 600, cacheEverything: true } });
  if (!res.ok) throw new Error(`GitHub returned ${res.status} for ${url}`);
  const markdown = await res.text();
  return toolText(markdown);
}

// --- helpers --------------------------------------------------------------

function json(body, status = 200, extraHeaders = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
      ...extraHeaders,
    },
  });
}
