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

import { buildIndex, plan, rankDocs, suggestDocs } from "./planner.mjs";

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
  prompts: { listChanged: false },
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
            instructions: "Use get_schema_manifest to retrieve strict compact type signatures ({ desc, params }) for Blocks (~3k tokens), BDFD, or JS before generating code. Read execution-model before generating commands. For Blocks, nested params (embeds, components, conditions, thenActions) use named types: fetch them with get_schema_manifest mode='types', and ALWAYS run generated Blocks JSON through validate_actions and fix every error before delivering it. Bot Creator unifies Blocks (visual/JSON), BDFD (BDScript), and BDJS (JavaScript). GROUND TRUTH RULES & GOTCHAS: (1) ZERO SYNTAX HALLUCINATIONS: Never output the phantom syntax $let. BDFD temporary variables use $var[name;value] and $var[name]. Persistent database storage uses $setVar/$getVar (global), $setUserVar/$getUserVar (user), $setServerVar/$getServerVar (guild). (2) DISCORD INTERACTION LIFECYCLE: Slash commands, buttons, and modals acknowledge automatically. Never write $sendMessage to reply to an interaction! In BDFD, raw text and embeds reply natively (respondWithMessage); add $ephemeral for private responses. Only use $channelSendMessage[channelID;content] or sendMessage with channelId to target an explicit different channel. (3) PRODUCTION TICKET SYSTEMS: $newTicket and $closeTicket are INCOMPLETE legacy helpers that lack private permissions. Always implement tickets using explicit createChannel with categoryId, editChannelPermissions with targetId and member allow bitmask 68608, a welcome message with a close button ($addButton[no;close_ticket;Close Ticket;danger]), and an interaction handler that removes the channel with removeChannel / $deleteChannels[$channelID]. (4) BLOCKS CONTRACT: Blocks actions map strictly to native BotCreatorActionType (e.g. sendMessage, createChannel, editChannelPermissions, respondWithMessage). Do not invent action names or infer JSON payloads from BDFD function signatures. An action is { type, key?, payload }: to reuse a result later, set `key` ON THE ACTION (not in payload), e.g. {\"type\":\"calculate\",\"key\":\"total\",\"payload\":{...}} then read ((action.total)); without a key the result is action_<position>. (5) SLASH OPTIONS: Access options directly via ((opts.name)) or ((opts.name.id)). Do not call non-existent functions like $slashOption.",
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

      case "prompts/list":
        return { jsonrpc: "2.0", id: req.id, result: { prompts: PROMPTS_META } };

      case "prompts/get":
        return await handlePromptGet(req);

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
    name: "get_schema_manifest",
    description:
      "Get the compact typed grammar/schema dictionary for Bot Creator. Returns parameter types and descriptions for compiler validation. Default mode 'blocks' (~3k tokens) contains every native block action (list them with list_actions). Nested params reference named types (e.g. Embed[], ComponentsDef, Action[]) defined by mode='types'. Fast, strict, and zero-hallucination.",
    inputSchema: {
      type: "object",
      properties: {
        mode: {
          type: "string",
          enum: ["blocks", "bdfd", "javascript", "types", "all"],
          description: "Authoring mode to retrieve. Default is 'blocks'. Use 'types' for the named nested types (Embed, Component, Condition, Action…) referenced by Blocks params.",
          default: "blocks",
        },
        category: {
          type: "string",
          description: "Optional category filter (e.g. 'Messages', 'Moderation', 'Variables', 'Logic').",
        },
        names: {
          type: "array",
          items: { type: "string" },
          description: "Blocks mode: exact action names whose full parameter schemas to return in ONE call (max 20), e.g. ['calculate','setScopedVariable','respondWithMessage'].",
        },
      },
    },
  },
  {
    name: "plan_solution",
    description:
      "START HERE for any BDFD/Blocks command request. One call, no LLM: returns the best-fitting functions (with signatures), the gotchas that apply, a validated skeleton when a known recipe matches, and a decision (auto = write it now, review = docs_get 1-2 functions, ask_user = clarify). Far cheaper than search_docs + get_doc loops.",
    inputSchema: {
      type: "object",
      properties: {
        intent: { type: "string", description: "What the command must do, in the user's words (FR or EN).", maxLength: 500 },
        mode: { type: "string", enum: ["bdfd", "blocks"], description: "Authoring mode. Default 'bdfd'.", default: "bdfd" },
        budget: { type: "integer", description: "Max functions to return (default 10).", default: 10, minimum: 1, maximum: 20 },
      },
      required: ["intent"],
    },
  },
  {
    name: "list_actions",
    description:
      "List every native Blocks action name with its category and description only (very small). Use it to pick action names, then get_doc / get_schema_manifest(category) for their params.",
    inputSchema: {
      type: "object",
      properties: {
        category: { type: "string", description: "Optional category filter (e.g. 'Messages', 'Moderation')." },
      },
    },
  },
  {
    name: "validate_actions",
    description:
      "Validate a Blocks action list ([{ type, payload }]) against the manifest: unknown action names (with suggestions), missing required params, wrong types/enums, unknown params, and nested embeds/components/conditions/thenActions. Call it on generated JSON and fix every error before delivering it.",
    inputSchema: {
      type: "object",
      properties: {
        actions: {
          type: "array",
          description: "Array of Blocks actions, each { type: string, payload: object }.",
          items: { type: "object" },
        },
      },
      required: ["actions"],
    },
  },
  {
    name: "search_docs",
    description:
      "Search Bot Creator Blocks, BDFD and JavaScript documentation. Filter api_type for the requested mode; read execution-model first. Results include compact parameter types ({ params, syntax, description }), compatibility status, and slugs.",
    inputSchema: {
      type: "object",
      properties: {
        query: { type: "string", description: "Search term (matched case-insensitively against name, slug, category)." },
        api_type: { type: "string", enum: ["blocks", "bdfd", "javascript", "general"], description: "Filter documentation by execution mode." },
        limit: { type: "integer", description: "Max results (default 8).", default: 8, minimum: 1, maximum: 100 },
      },
      required: ["query"],
    },
  },
  {
    name: "get_doc",
    description:
      "Read documentation or schema by slug/action name. By default (full_markdown=false), returns the ultra-compact JSON type definition { desc, params } to save tokens and prevent hallucinations. Set full_markdown=true only if you explicitly need the full human guide/examples.",
    inputSchema: {
      type: "object",
      properties: {
        slug: { type: "string", description: "Doc slug or block action name (e.g. 'sendMessage', 'banUser', 'sendmessage', 'execution-model')." },
        full_markdown: {
          type: "boolean",
          description: "If true, returns the raw Markdown documentation. Default is false (returns compact type schema).",
          default: false,
        },
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

// --- Prompt metadata -----------------------------------------------------

const PROMPTS_META = [
  {
    name: "command_authoring_rules",
    description: "Interaction lifecycle rules, variable scope separation ($var vs $setVar), few-shot examples, and LLM gotchas for Bot Creator.",
    arguments: [
      { name: "mode", description: "Authoring mode: 'bdfd' or 'blocks'", required: false },
    ],
  },
  {
    name: "production_ticket_workflow",
    description: "Production-ready Discord ticket system template using private channel creation, permission overwrites, and interactive close button.",
    arguments: [],
  },
];

async function handlePromptGet(req) {
  const name = req?.params?.name;
  if (!name || !PROMPTS_META.some((p) => p.name === name)) {
    return jsonrpcError(req.id, -32602, `Unknown prompt: ${name}`);
  }

  if (name === "command_authoring_rules") {
    return {
      jsonrpc: "2.0",
      id: req.id,
      result: {
        description: "Interaction lifecycle, variable rules, and few-shot examples for Bot Creator.",
        messages: [
          {
            role: "user",
            content: {
              type: "text",
              text: "How should I structure a slash command in Bot Creator without creating broken replies or hallucinating syntax?",
            },
          },
          {
            role: "assistant",
            content: {
              type: "text",
              text: "### Golden Rules for Bot Creator LLM Generation:\n1. NO $let: Use $var[name;val] for temporary command variables. Use $setVar[key;val] for persistent global DB storage, $setUserVar for user-scoped DB variables, $setServerVar for guild-scoped DB variables.\n2. NO $sendMessage IN SLASH COMMANDS: Discord interactions acknowledge automatically. Plain text and embeds outside functions constitute the native slash reply (respondWithMessage). Add $ephemeral for private replies. Use $channelSendMessage[channelID;content] ONLY when deliberately posting into another channel.\n3. NO FAKE FUNCTIONS: $slashOption, $respondWithMessage, $sendResponse do not exist in BDScript. Access slash options via ((opts.name)) or ((opts.name.id)).\n4. BLOCKS CONTRACT: Blocks actions map strictly to BotCreatorActionType (e.g. sendMessage, respondWithMessage, createChannel, editChannelPermissions, ifBlock, forLoop).\n\n### Minimal Few-Shot (BDFD Slash Command):\n```bdfd\n$title[Server Info]\n$description[Welcome to **$serverName**! We have $membersCount members.]\n$color[#5865F2]\n$ephemeral\n```\n\n### Minimal Few-Shot (Blocks Mode JSON):\n```json\n[\n  {\n    \"type\": \"respondWithMessage\",\n    \"payload\": {\n      \"content\": \"Hello ((user.username))!\",\n      \"ephemeral\": true\n    }\n  }\n]\n```",
            },
          },
        ],
      },
    };
  }

  if (name === "production_ticket_workflow") {
    return {
      jsonrpc: "2.0",
      id: req.id,
      result: {
        description: "Production-ready ticket system with private channel creation, explicit permissions, and close button handler.",
        messages: [
          {
            role: "user",
            content: {
              type: "text",
              text: "Provide a working Discord ticket system in Bot Creator.",
            },
          },
          {
            role: "assistant",
            content: {
              type: "text",
              text: "### Production Ticket Workflow:\n\nStep 1: Slash command /ticket\n```bdfd\n$var[ticketChan;$createChannel[ticket-$username;text;123456789012345678]]\n$editChannelPerms[$var[ticketChan];$authorID;+viewchannel;+sendmessages;+readmessagehistory]\n$useChannel[$var[ticketChan]]\n$title[Support & Help]\n$description[Hello <@$authorID>! Please describe your issue below.\\nTo close this ticket, click the red button.]\n$color[#5865F2]\n$addButton[no;close_ticket;Close Ticket;danger]\n$useChannel[]\n$ephemeral\n✅ Your support ticket has been created: <#$var[ticketChan]>\n```\n\nStep 2: Button Click interactionCreate (customId: close_ticket)\n```bdfd\n🔒 Close requested by $username. Deleting this channel in 3 seconds...\n$wait[3s]\n$deleteChannels[$channelID]\n```",
            },
          },
        ],
      },
    };
  }

  return jsonrpcError(req.id, -32601, `Prompt not found: ${name}`);
}

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
      case "get_schema_manifest":
        result = await toolGetSchemaManifest(args);
        break;
      case "plan_solution":
        result = await toolPlanSolution(args);
        break;
      case "list_actions":
        result = await toolListActions(args);
        break;
      case "validate_actions":
        result = await toolValidateActions(args);
        break;
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

async function fetchSchemaManifest() {
  const res = await fetch(`${SITE_ORIGIN}/api/schema-manifest.json`, {
    headers: { Accept: "application/json" },
    cf: { cacheTtl: 300, cacheEverything: true },
  });
  if (!res.ok) throw new Error(`schema-manifest.json returned ${res.status}`);
  return res.json();
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

async function toolGetSchemaManifest({ mode = "blocks", category, names } = {}) {
  const manifest = await fetchSchemaManifest();
  const targetMode = mode || "blocks";

  if (targetMode !== "all" && !["blocks", "bdfd", "javascript", "types"].includes(targetMode)) {
    throw new Error(`Invalid mode: ${targetMode}. Valid modes are 'blocks', 'bdfd', 'javascript', 'types', 'all'.`);
  }

  if (targetMode === "types") {
    return toolText(JSON.stringify(manifest.types || {}));
  }

  // Blocks: the full manifest is ~30 KB and too large for the app to hand back to the model, which then
  // asks category by category. Without a filter return a compact index; `names` fetches exact schemas.
  if (targetMode === "blocks") {
    const blocks = manifest.modes?.blocks || {};
    const wanted = (Array.isArray(names) ? names : typeof names === "string" ? names.split(/[,\s]+/) : []).map((n) => String(n).trim()).filter(Boolean);
    if (wanted.length > 0) {
      const found = {};
      const unknown = [];
      for (const n of wanted.slice(0, 20)) {
        const hit = Object.keys(blocks).find((k) => normalize(k) === normalize(n));
        if (hit) found[hit] = blocks[hit];
        else unknown.push(n);
      }
      return toolText(JSON.stringify(unknown.length ? { ...found, _unknown: unknown, _hint: "Use list_actions for valid names." } : found));
    }
    if (!category) {
      const index = {};
      for (const [name, v] of Object.entries(blocks)) (index[v.category || "Other"] ||= []).push(v.unsupported ? `${name} (unsupported)` : name);
      return toolText(JSON.stringify({ note: "Compact index. Get exact parameters with names=[...] (up to 20 actions, one call) or category=<one of the keys below>. Nested types: mode='types'.", categories: index }));
    }
  }

  let resultData;
  if (targetMode === "all") {
    resultData = manifest.modes || {};
    if (manifest.types) resultData = { ...resultData, types: manifest.types };
    if (category) {
      const catNorm = normalize(category);
      const filtered = {};
      for (const [m, dict] of Object.entries(resultData)) {
        if (m === "types") {
          filtered[m] = dict;
          continue;
        }
        filtered[m] = {};
        for (const [k, v] of Object.entries(dict)) {
          if (normalize(v.category).includes(catNorm)) {
            filtered[m][k] = v;
          }
        }
      }
      resultData = filtered;
    }
  } else {
    const dict = manifest.modes?.[targetMode] || {};
    if (category) {
      const catNorm = normalize(category);
      resultData = {};
      for (const [k, v] of Object.entries(dict)) {
        if (normalize(v.category).includes(catNorm)) {
          resultData[k] = v;
        }
      }
    } else {
      resultData = dict;
    }
  }

  return toolText(JSON.stringify(resultData));
}

let plannerCache = { at: 0, index: null };

async function toolPlanSolution({ intent, mode = "bdfd", budget } = {}) {
  if (typeof intent !== "string" || !intent.trim()) throw new Error("`intent` is required");
  if (!["bdfd", "blocks"].includes(mode)) throw new Error("`mode` must be 'bdfd' or 'blocks'");
  if (!plannerCache.index || Date.now() - plannerCache.at > 300_000) {
    const [docs, manifest] = await Promise.all([fetchDocsIndex(), fetchSchemaManifest()]);
    plannerCache = { at: Date.now(), index: buildIndex({ docs, manifest }) };
  }
  return toolText(JSON.stringify(plan(plannerCache.index, { intent: intent.slice(0, 500), mode, budget })));
}

async function toolListActions({ category } = {}) {
  const manifest = await fetchSchemaManifest();
  const catNorm = category ? normalize(category) : "";
  const actions = Object.entries(manifest.modes?.blocks || {})
    .filter(([, v]) => !catNorm || normalize(v.category).includes(catNorm))
    .map(([name, v]) => ({ name, category: v.category, desc: v.desc }));
  return toolText(JSON.stringify({ count: actions.length, actions }));
}

// --- Blocks validation ---------------------------------------------------

const PRIMITIVES = new Set(["string", "number", "boolean", "object"]);

// Names the Copilot invents to store a result; no Blocks action reads them.
const RESULT_NAMING_FIELDS = new Set(["storeAs", "saveAs", "outputVariable", "outputKey", "resultKey", "resultVariable", "output", "assignTo", "into", "target_variable", "storeIn"]);

function hasPlaceholder(v) {
  return typeof v === "string" && v.includes("((");
}

function levenshtein(a, b) {
  const dp = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)]);
  for (let j = 1; j <= b.length; j++) dp[0][j] = j;
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    }
  }
  return dp[a.length][b.length];
}

function closest(name, candidates) {
  const n = normalize(name);
  let best = null;
  let bestDist = Infinity;
  for (const c of candidates) {
    const d = levenshtein(n, normalize(c));
    if (d < bestDist) {
      bestDist = d;
      best = c;
    }
  }
  return best !== null && bestDist <= Math.max(2, Math.floor(n.length / 3)) ? best : null;
}

function describeValue(v) {
  if (v === null) return "null";
  return Array.isArray(v) ? "array" : typeof v;
}

function isPlainObject(v) {
  return v !== null && typeof v === "object" && !Array.isArray(v);
}

// Validates `value` against a type spec string ("string?", "Embed[]", "a|b?"…).
// Pushes { path, message } entries into `issues.errors` / `issues.warnings`.
function checkType(value, spec, path, ctx, issues) {
  let base = String(spec).trim();
  if (base.endsWith("?")) base = base.slice(0, -1);

  if (base.endsWith("[]")) {
    if (!Array.isArray(value)) {
      issues.errors.push({ path, message: `expected array (${spec}), got ${describeValue(value)}` });
      return;
    }
    value.forEach((item, i) => checkType(item, base.slice(0, -2), `${path}[${i}]`, ctx, issues));
    return;
  }

  const alts = base.split("|").map((a) => a.trim()).filter(Boolean);

  // Single named type.
  if (alts.length === 1 && ctx.types[alts[0]]) {
    checkNamedType(value, alts[0], path, ctx, issues);
    return;
  }

  for (const alt of alts) {
    if (alt === "string" && typeof value === "string") return;
    if (alt === "number" && (typeof value === "number" || (typeof value === "string" && (hasPlaceholder(value) || (value.trim() !== "" && Number.isFinite(Number(value))))))) return;
    if (alt === "boolean" && (typeof value === "boolean" || (typeof value === "string" && (hasPlaceholder(value) || ["true", "false"].includes(value.toLowerCase()))))) return;
    if (alt === "object" && isPlainObject(value)) return;
    if (ctx.types[alt]) {
      const probe = { errors: [], warnings: [] };
      checkNamedType(value, alt, path, ctx, probe);
      if (probe.errors.length === 0) {
        issues.warnings.push(...probe.warnings);
        return;
      }
    }
    if (!PRIMITIVES.has(alt) && !ctx.types[alt]) {
      if (typeof value === "string" && (hasPlaceholder(value) || normalize(value) === normalize(alt))) return;
    }
  }

  const literals = alts.filter((a) => !PRIMITIVES.has(a) && !ctx.types[a]);
  const hint = literals.length > 0 && alts.length === literals.length ? ` Allowed: ${literals.join(", ")}.` : "";
  issues.errors.push({ path, message: `expected ${alts.join(" | ")}, got ${describeValue(value)}${typeof value === "string" ? ` "${value}"` : ""}.${hint}`.replace(/\.\.$/, ".") });
}

function checkFields(obj, fields, path, ctx, issues, ignore = []) {
  for (const [key, spec] of Object.entries(fields)) {
    const optional = String(spec).trim().endsWith("?");
    if (obj[key] === undefined || obj[key] === null) {
      if (!optional) issues.errors.push({ path: `${path}.${key}`, message: "required field is missing" });
      continue;
    }
    checkType(obj[key], spec, `${path}.${key}`, ctx, issues);
  }
  for (const key of Object.keys(obj)) {
    if (key in fields || ignore.includes(key)) continue;
    const near = closest(key, Object.keys(fields));
    const accepted = Object.keys(fields).filter((f) => !ignore.includes(f)).join(", ");
    if (RESULT_NAMING_FIELDS.has(key)) {
      // The engine silently ignores these, so the action "works" but its result stays unreadable.
      issues.errors.push({
        path: `${path}.${key}`,
        message: `"${key}" does not exist: the engine ignores it. Name the result with \`key\` on the ACTION itself ({"type":…,"key":"total","payload":{…}}) and read it as ((action.total)). Accepted payload fields: ${accepted || "none"}.`,
      });
      continue;
    }
    issues.warnings.push({ path: `${path}.${key}`, message: `unknown field${near ? `, did you mean "${near}"?` : ""}. Accepted: ${accepted || "none"}` });
  }
}

function checkNamedType(value, name, path, ctx, issues) {
  if (name === "Action") {
    checkAction(value, path, ctx, issues);
    return;
  }
  const def = ctx.types[name];
  if (!isPlainObject(value)) {
    issues.errors.push({ path, message: `expected ${name} object, got ${describeValue(value)}` });
    return;
  }
  if (def.oneOf) {
    // Condition: leaf vs group is decided by the presence of `group`.
    if (name === "Condition") {
      checkNamedType(value, value.group !== undefined ? "ConditionGroup" : "ConditionLeaf", path, ctx, issues);
      return;
    }
    const probes = def.oneOf.map((alt) => {
      const probe = { errors: [], warnings: [] };
      checkNamedType(value, alt, path, ctx, probe);
      return probe;
    });
    if (!probes.some((p) => p.errors.length === 0)) issues.errors.push(...probes[0].errors);
    return;
  }
  if (def.discriminator) {
    const kind = value[def.discriminator];
    const variants = def.variants || {};
    if (typeof kind !== "string" || !variants[kind]) {
      const near = typeof kind === "string" ? closest(kind, Object.keys(variants)) : null;
      issues.errors.push({
        path: `${path}.${def.discriminator}`,
        message: `unknown ${name} ${def.discriminator} ${JSON.stringify(kind)}${near ? `, did you mean "${near}"?` : `. Allowed: ${Object.keys(variants).join(", ")}`}`,
      });
      return;
    }
    checkFields(value, variants[kind], path, ctx, issues, [def.discriminator]);
    return;
  }
  checkFields(value, def.fields || {}, path, ctx, issues);
}

function checkAction(action, path, ctx, issues) {
  if (!isPlainObject(action)) {
    issues.errors.push({ path, message: `expected action object { type, payload }, got ${describeValue(action)}` });
    return;
  }
  const type = action.type;
  if (typeof type !== "string" || !type) {
    issues.errors.push({ path: `${path}.type`, message: "action type is required (string)" });
    return;
  }
  const def = ctx.blocks[type];
  if (!def) {
    const near = closest(type, Object.keys(ctx.blocks));
    issues.errors.push({
      path: `${path}.type`,
      message: `unknown action "${type}"${near ? `, did you mean "${near}"?` : ". Use list_actions to see valid names."}`,
    });
    return;
  }
  if (def.unsupported) {
    issues.errors.push({ path: `${path}.type`, message: `action "${type}" cannot be used here: ${def.unsupported}` });
    return;
  }
  const payload = action.payload ?? {};
  if (!isPlainObject(payload)) {
    issues.errors.push({ path: `${path}.payload`, message: `payload must be an object, got ${describeValue(payload)}` });
    return;
  }
  // The action's own fields (key, enabled, depend_on, error) live next to `type`, not in the payload.
  const own = ctx.types.Action?.fields || {};
  for (const field of Object.keys(action)) {
    if (field === "type" || field === "payload") continue;
    if (!own[field]) issues.warnings.push({ path: `${path}.${field}`, message: `unknown action field (known: ${Object.keys(own).join(", ")})` });
    else checkType(action[field], own[field], `${path}.${field}`, ctx, issues);
  }
  if (payload.key !== undefined && !(def.params && "key" in def.params)) {
    issues.warnings.push({
      path: `${path}.payload.key`,
      message: `"key" is ignored inside payload for ${type}: put it on the action itself ({"type":"${type}","key":"${String(payload.key)}","payload":{…}}) so the result is readable as ((action.${String(payload.key)}))`,
    });
  }
  checkFields(payload, def.params || {}, `${path}.payload`, ctx, issues, ["tryCatch"]);
  ctx.count += 1;
}

async function toolValidateActions({ actions } = {}) {
  if (typeof actions === "string") {
    try {
      actions = JSON.parse(actions);
    } catch {
      throw new Error("`actions` must be an array of { type, payload } (got an unparsable string)");
    }
  }
  if (isPlainObject(actions)) actions = [actions];
  if (!Array.isArray(actions)) throw new Error("`actions` must be an array of { type, payload }");

  const manifest = await fetchSchemaManifest();
  const ctx = { blocks: manifest.modes?.blocks || {}, types: manifest.types || {}, count: 0 };
  const issues = { errors: [], warnings: [] };
  actions.forEach((a, i) => checkAction(a, `actions[${i}]`, ctx, issues));

  return toolText(
    JSON.stringify({ valid: issues.errors.length === 0, checked: ctx.count, errors: issues.errors, warnings: issues.warnings })
  );
}

// Search rows stay small: the model reads them on every following turn.
function compactDoc(d) {
  const description = String(d.description ?? "");
  return {
    slug: d.slug,
    name: d.name,
    ...(d.syntax ? { syntax: d.syntax } : {}),
    ...(description ? { description: description.length > 90 ? `${description.slice(0, 87)}...` : description } : {}),
    ...(d.status && d.status !== "documented" ? { status: d.status } : {}),
    ...(d.api_type && d.api_type !== "bdfd" ? { api_type: d.api_type } : {}),
  };
}

async function toolSearchDocs({ query, limit, api_type }) {
  const lim = clampLimit(limit, 8);
  if (!normalize(query)) throw new Error("`query` is required");
  if (api_type && !["blocks", "bdfd", "javascript", "general"].includes(api_type)) throw new Error("Invalid api_type");

  const docs = await fetchDocsIndex();
  const pool = docs.filter((d) => !api_type || (d.api_type || "bdfd") === api_type);
  const ranked = rankDocs(pool, query, lim).map((x) => compactDoc(x.doc));
  if (ranked.length > 0) return toolText(JSON.stringify({ count: ranked.length, results: ranked }));

  // Never dead-end: the closest documents for each word of the query, so the next call can be get_doc.
  const closest = suggestDocs(pool, query, 5).map(compactDoc);
  return toolText(
    closest.length === 0
      ? `No docs matched "${query}". Try a function name (e.g. "ban", "setuservar") or call plan_solution with the intent.`
      : JSON.stringify({ count: 0, message: `Nothing matched all of "${query}". Closest documents by word:`, suggestions: closest })
  );
}

async function toolGetDoc({ slug, full_markdown = false }) {
  if (!slug || typeof slug !== "string") throw new Error("`slug` is required");
  // Defensive: only allow simple slugs and identifiers.
  if (!/^[a-z0-9_$-]+$/i.test(slug)) throw new Error("Invalid slug");

  const docs = await fetchDocsIndex();
  const doc = docs.find((d) => normalize(d.slug) === normalize(slug) || normalize(d.name) === normalize(slug));

  if (!full_markdown) {
    let manifest = null;
    try {
      manifest = await fetchSchemaManifest();
    } catch {
      manifest = null;
    }

    if (manifest?.modes) {
      // 1. Match Blocks action
      for (const [key, val] of Object.entries(manifest.modes.blocks || {})) {
        if (normalize(key) === normalize(slug)) {
          return toolText(JSON.stringify({ type: key, ...val }));
        }
      }
      // 2. Match BDFD function
      for (const [key, val] of Object.entries(manifest.modes.bdfd || {})) {
        if (normalize(key) === normalize(slug) || normalize(key) === normalize(`$${slug}`)) {
          return toolText(JSON.stringify({ name: key, ...val }));
        }
      }
      // 3. Match JavaScript module
      for (const [key, val] of Object.entries(manifest.modes.javascript || {})) {
        if (normalize(key) === normalize(slug) || normalize(val.slug) === normalize(slug)) {
          return toolText(JSON.stringify({ module: key, ...val }));
        }
      }
    }

    if (doc?.params) {
      return toolText(JSON.stringify({
        name: doc.name,
        desc: doc.description,
        syntax: doc.syntax,
        params: doc.params,
        api_type: doc.api_type || "bdfd",
      }));
    }
  }

  if (!doc) return { ...toolText(`Doc not found: ${slug}. Use search_docs to find the correct slug or get_schema_manifest for types.`), isError: true };
  const url = `${SITE_ORIGIN}/api/docs/${doc.slug}.md`;
  const res = await fetch(url, { cf: { cacheTtl: 600, cacheEverything: true } });
  if (res.status === 404) {
    return { ...toolText(`Doc not found: ${slug}. Use search_docs to find the correct slug.`), isError: true };
  }
  if (!res.ok) throw new Error(`Documentation returned ${res.status}`);
  const markdown = await res.text();
  return toolText(`Mode: ${doc.api_type || "bdfd"}\nStatus: ${doc.status || "documented"}\nSource: ${doc.url}\n\n${markdown}`);
}

async function toolListPosts({ locale, limit }) {
  const lim = clampLimit(limit, 25);
  let posts = await fetchPostsIndex();
  if (locale) {
    const l = normalize(locale);
    posts = posts.filter((p) => normalize(p.locale) === l);
  }
  posts = posts.slice(0, lim);
  return toolText(JSON.stringify({ count: posts.length, results: posts }));
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
      : JSON.stringify({ count: scored.length, results: scored })
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
