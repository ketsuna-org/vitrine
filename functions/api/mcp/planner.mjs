// Deterministic solution planner behind the `plan_solution` MCP tool.
//
// Goal: let the Copilot pick the right BDFD functions / Blocks actions for an intent in ONE
// small call (no LLM, no token spent selecting), instead of search_docs + several get_doc.
//
// Pipeline: tokenize + expand the intent (FR/EN synonyms) -> BM25 over the function catalog
// (name > description > category) -> intent recipes (curated, validated by tests) boost their
// functions and supply a skeleton -> greedy selection with a category-diversity penalty ->
// confidence / margin -> Jev-like decision: auto | review | ask_user.

const STOP = new Set(
  ("a an the to of for and or in on at by with my me i is are be it this that do does make create add want need " +
    "un une le la les des du de d l et ou en sur pour avec mon ma mes je tu il elle est sont ce cette ca fais fait faire " +
    "cree creer ajoute ajouter veux voudrais besoin commande command bot qui que quoi dans par au aux se sa son ses " +
    "comme tres plus afficher affiche affiche-moi renvoie reponds repond reponse reply replies show shows").split(" ")
);

// Query-side expansion. Keys are normalized stems; values are extra terms (index vocabulary).
const SYNONYMS = {
  latence: "ping latency", latency: "ping", lag: "ping latency", vitesse: "ping latency", ping: "latency",
  bienvenue: "welcome join member username", welcome: "join member", accueil: "welcome join member",
  arrivee: "join member", rejoint: "join member", rejoindre: "join member",
  joli: "embed title description color footer", beau: "embed color", belle: "embed color", polished: "embed title description color footer",
  design: "embed color", annonce: "embed title description announcement", announcement: "embed title description",
  embed: "title description color footer", couleur: "color", color: "hex", image: "image url", photo: "image url",
  banniere: "banner image", banner: "image", avatar: "useravatar", pdp: "useravatar",
  bannir: "ban", banni: "ban", expulser: "kick", virer: "kick", muet: "mute timeout", sourdine: "mute timeout", mute: "timeout",
  role: "role", roles: "role", grade: "role", salon: "channel", canal: "channel", salons: "channel",
  ticket: "channel permissions button deletechannels createchannel", support: "ticket channel",
  bouton: "button", boutons: "button", menu: "select menu", selection: "select menu",
  variable: "setuservar getuservar var", variables: "setuservar getuservar var", stocker: "setuservar getuservar", sauvegarder: "setuservar getuservar",
  save: "setuservar getuservar", store: "setuservar getuservar", compteur: "setuservar getuservar calculate", counter: "setuservar getuservar calculate",
  economie: "setuservar getuservar calculate", economy: "setuservar getuservar calculate", argent: "setuservar getuservar", money: "setuservar getuservar",
  xp: "setuservar getuservar calculate", niveau: "setuservar getuservar", level: "setuservar getuservar",
  aleatoire: "random randomtext", random: "randomtext", hasard: "random randomtext", dice: "random", pile: "randomtext", face: "randomtext", coin: "randomtext",
  condition: "if onlyif checkcondition", verifier: "onlyif onlyperms checkcondition", permission: "onlyperms", permissions: "onlyperms", admin: "onlyadmin onlyperms",
  supprimer: "delete clear", delete: "clear", effacer: "clear delete", purge: "clear", nettoyer: "clear",
  attendre: "wait", delay: "wait", delai: "wait", timer: "wait", minuteur: "wait",
  requete: "httpget httppost json", api: "httpget httppost json", http: "httpget httppost", json: "jsonparse",
  stats: "info", informations: "info", infos: "info", info: "userinfo serverinfo",
  serveur: "server", guild: "server", membre: "member", membres: "member members", utilisateur: "user username", pseudo: "username nickname",
  heure: "time date", date: "time", temps: "time uptime", musique: "music play", music: "play", jouer: "play",
  texte: "text message", dire: "message", say: "message", sondage: "poll", vote: "poll", cooldown: "cooldown", recharge: "cooldown",
  donner: "give", donne: "give", retirer: "take remove", enlever: "remove take", ajouter: "add give", ajoute: "add give",
  supprime: "delete clear", efface: "clear delete", vider: "clear", vide: "clear", messages: "clear delete message",
  blague: "httpget json api", joke: "httpget json api", recuperer: "httpget json", meme: "httpget json image",
  lecteur: "lavalink play", queue: "lavalink queue", volume: "lavalink volume", pause: "lavalink paused",
  prive: "ephemeral", private: "ephemeral", ephemere: "ephemeral", slash: "slash option args", argument: "args", arguments: "args", option: "args",
  mention: "mentioned", mentionne: "mentioned", message: "message", reaction: "addcmdreactions reactions", reactions: "addcmdreactions",
};

// Curated intents. `words` are normalized query stems; `need` = how many must match.
// Every function / skeleton token here is validated against _docs by tests/planner.test.mjs.
const RECIPES = [
  {
    id: "ping", mode: "bdfd", need: 1, words: ["ping", "latence", "latency", "lag"],
    fns: ["$ping", "$title", "$description", "$color", "$footer", "$addTimestamp", "$userName"],
    skeleton: "$color[5865F2]\n$title[🏓 Pong!]\n$description[Latence : **$ping ms**]\n$footer[Demandé par $userName]\n$addTimestamp",
  },
  {
    id: "embed", mode: "bdfd", need: 1, words: ["embed", "annonce", "announcement", "joli", "polished"],
    fns: ["$title", "$description", "$color", "$footer", "$thumbnail", "$image", "$addField", "$addTimestamp"],
    skeleton: "$title[Titre]\n$description[Texte]\n$color[5865F2]\n$footer[Pied de page]\n$addTimestamp",
  },
  {
    id: "userinfo", mode: "bdfd", need: 1, words: ["userinfo", "profil", "profile", "avatar", "pdp"],
    fns: ["$userName", "$userID", "$userAvatar", "$title", "$description", "$thumbnail", "$color"],
    skeleton: "$title[$userName]\n$thumbnail[$userAvatar]\n$description[ID : $userID]\n$color[5865F2]",
  },
  {
    id: "serverinfo", mode: "bdfd", need: 1, words: ["serverinfo", "serveur", "server", "guild"],
    fns: ["$serverName", "$membersCount", "$serverIcon", "$title", "$description", "$thumbnail", "$color"],
    skeleton: "$title[$serverName]\n$thumbnail[$serverIcon]\n$description[Membres : **$membersCount**]\n$color[5865F2]",
  },
  {
    id: "moderation", mode: "bdfd", need: 1, prio: 2, words: ["ban", "bannir", "kick", "expulser", "mute", "timeout", "moderation"],
    fns: ["$onlyPerms", "$onlyBotPerms", "$ban", "$kick", "$timeout", "$mentioned", "$onlyIf", "$banID", "$nomention"],
    skeleton: "$nomention\n$onlyPerms[banmembers;Permission Ban Members requise.]\n$onlyBotPerms[banmembers;Le bot a besoin de Ban Members.]\n$onlyIf[$mentioned[1]!=;Usage : !ban @membre]\n$ban[Banni par $userName]\nMembre banni.",
    gotchas: ["$ban[(reason)] bans the FIRST MENTIONED user (reason is not a user ID); use $banID[reason;userID] for an explicit ID. Guard with $onlyPerms/$onlyBotPerms."],
  },
  {
    id: "warn", mode: "bdfd", need: 1, prio: 2, words: ["warn", "avertir", "avertissement", "strike", "sanction"],
    fns: ["$onlyPerms", "$onlyIf", "$findUser", "$message", "$setGuildMemberVar", "$getGuildMemberVar", "$calculate", "$var"],
    skeleton: "$onlyPerms[moderatemembers;Permission Modérer les membres requise.]\n$var[cible;$findUser[$message[membre]]]\n$onlyIf[$var[cible]!=;Membre introuvable.]\n$setGuildMemberVar[warns;$calculate[$getGuildMemberVar[warns;$var[cible]]+1];$var[cible]]\n⚠️ <@$var[cible]> a maintenant $getGuildMemberVar[warns;$var[cible]] avertissement(s).",
    gotchas: ["Slash options are read by name: $message[optionName] ($args is empty in a slash invocation).", "Per-server counters: $setGuildMemberVar/$getGuildMemberVar[key;userID]; an unset value is empty, so declare a default of 0 with local_set_variable."],
  },
  {
    id: "variables", mode: "bdfd", need: 1, words: ["variable", "stocker", "sauvegarder", "save", "compteur", "counter", "economie", "economy", "xp", "niveau", "level", "argent", "money"],
    fns: ["$setUserVar", "$getUserVar", "$setServerVar", "$getServerVar", "$setVar", "$getVar", "$var", "$calculate"],
    skeleton: "$setUserVar[points;$calculate[$getUserVar[points]+1]]\nPoints : **$getUserVar[points]**",
    gotchas: ["Temporary values: $var[name;value]; persistent: $setUserVar/$setServerVar/$setVar. Never $let."],
  },
  {
    id: "random", mode: "bdfd", need: 1, words: ["random", "aleatoire", "hasard", "dice", "pile", "coin"],
    fns: ["$random", "$randomText"],
    skeleton: "$randomText[Pile;Face]",
  },
  {
    id: "buttons", mode: "bdfd", need: 1, words: ["bouton", "boutons", "button", "buttons"],
    fns: ["$addButton", "$addActionRow", "$ephemeral"],
    skeleton: "$addButton[no;mon_bouton;Cliquer;primary]\n$sendMessage[Clique ci-dessous]",
    gotchas: ["Button clicks are handled by an interaction command with the same customId."],
  },
  {
    id: "ticket", mode: "bdfd", need: 1, prio: 3, words: ["ticket", "tickets", "support"],
    fns: ["$createChannel", "$editChannelPerms", "$useChannel", "$addButton", "$deleteChannels", "$var", "$wait"],
    skeleton: "$var[chan;$createChannel[ticket-$userName;text]]\n$editChannelPerms[$var[chan];$authorID;68608;0]\n$useChannel[$var[chan]]\nTicket ouvert par <@$authorID>\n$addButton[no;close_ticket;Close Ticket;danger]",
    gotchas: ["Do not use $newTicket/$closeTicket (incomplete legacy). Create the channel, grant the author 68608 with $editChannelPerms, add a close button; the close_ticket button handler runs $deleteChannels[$channelID]."],
  },
  {
    id: "welcome", mode: "bdfd", need: 1, words: ["welcome", "bienvenue", "accueil", "join", "rejoint", "arrivee"],
    fns: ["$userName", "$serverName", "$membersCount", "$channelSendMessage", "$title", "$description", "$color"],
    skeleton: "$title[Bienvenue $userName !]\n$description[Tu es le membre n°$membersCount de **$serverName**.]\n$color[57F287]",
  },
  {
    id: "counter-blocks", mode: "blocks", need: 1, prio: 2, words: ["warn", "avertir", "avertissement", "compteur", "counter", "points", "xp", "niveau", "level", "increment"],
    fns: ["getScopedVariable", "calculate", "setScopedVariable", "respondWithMessage"],
    skeleton: '[{"type":"getScopedVariable","key":"prev","payload":{"scope":"guildMember","key":"warns","contextId":"((guild.id)):((opts.membre))"}},{"type":"calculate","key":"total","payload":{"expression":"((action.prev)) + 1"}},{"type":"setScopedVariable","payload":{"scope":"guildMember","key":"warns","valueType":"number","numberValue":"((action.total))","contextId":"((guild.id)):((opts.membre))"}},{"type":"respondWithMessage","payload":{"content":"<@((opts.membre))> a maintenant ((action.total)) avertissement(s)."}}]',
    gotchas: ["Chain results with `key` ON THE ACTION (not in payload): calculate with key \"total\" is read as ((action.total)). The `storeAs` field exists only on getScopedVariable and queryArray.", "An unset scoped value reads empty: declare a number default of 0 with local_set_variable (scope guildMember) so ((action.prev)) + 1 works the first time.", "Slash options are ((opts.<name>)); the member option's user id is ((opts.membre)). A guildMember variable's contextId is \"<guildId>:<userId>\", i.e. ((guild.id)):((opts.membre)) (a bare user id fails at runtime)."],
  },
  {
    id: "ping-blocks", mode: "blocks", need: 1, words: ["ping", "latence", "latency"],
    fns: ["respondWithMessage"],
    skeleton: '[{"type":"respondWithMessage","payload":{"embeds":[{"title":"🏓 Pong!","description":"Latence : **((bot.ping)) ms**","color":"#5865F2"}]}}]',
  },
];

export function normalize(s) {
  return String(s ?? "").toLowerCase().normalize("NFKD").replace(/[̀-ͯ]/g, "");
}

function stem(w) {
  if (w.length > 4 && w.endsWith("s")) return w.slice(0, -1);
  return w;
}

function splitCamel(s) {
  return String(s ?? "").replace(/([a-z0-9])([A-Z])/g, "$1 $2");
}

export function tokenize(text, { keepStop = false } = {}) {
  return normalize(text)
    .split(/[^a-z0-9]+/)
    .filter((t) => t.length > 1 && (keepStop || !STOP.has(t)))
    .map(stem);
}

function nameTokens(name) {
  const bare = String(name).replace(/^\$/, "").replace(/\[\]$/, "");
  const parts = tokenize(splitCamel(bare), { keepStop: true });
  const whole = normalize(bare).replace(/[^a-z0-9]/g, "");
  return [...parts, whole];
}

const W_NAME = 4;
const W_DESC = 1;
const W_CAT = 0.5;
const K1 = 1.2;
const B = 0.75;

const key = (name) => normalize(String(name).replace(/\[\]$/, "")).replace(/^\$/, "");

// docs: docs-index.json rows; manifest: schema-manifest.json. Both are public, already cached.
export function buildIndex({ docs = [], manifest = {} }) {
  const entries = new Map();
  const add = (e) => {
    const k = `${e.mode}:${key(e.name)}`;
    const prev = entries.get(k);
    entries.set(k, { ...prev, ...Object.fromEntries(Object.entries(e).filter(([, v]) => v != null)) });
  };
  const bdfd = manifest.modes?.bdfd ?? {};
  for (const d of docs) {
    if ((d.api_type || "bdfd") !== "bdfd") continue;
    add({ mode: "bdfd", name: `$${d.slug}`, desc: d.description, category: d.category, status: d.status });
  }
  for (const [name, v] of Object.entries(bdfd)) {
    const display = `$${name.replace(/\[\]$/, "").replace(/^\$/, "")}`;
    add({ mode: "bdfd", name: display, desc: v.desc, category: v.category, sig: v.syntax });
    // A display name from the manifest keeps its real casing ($userName rather than $username).
    const e = entries.get(`bdfd:${key(display)}`);
    if (e) e.name = display;
  }
  for (const [name, v] of Object.entries(manifest.modes?.blocks ?? {})) {
    const params = Object.entries(v.params ?? {}).map(([p, t]) => (String(t).trim().endsWith("?") ? `${p}?` : p));
    add({ mode: "blocks", name, desc: v.desc, category: v.category, sig: `${name}(${params.join(", ")})`, status: v.unsupported ? "unsupported" : "documented" });
  }
  const list = [];
  for (const e of entries.values()) {
    if (!e.mode) continue;
    const tf = new Map();
    const bump = (tokens, w) => tokens.forEach((t) => tf.set(t, (tf.get(t) ?? 0) + w));
    bump(nameTokens(e.name), W_NAME);
    bump(tokenize(e.desc), W_DESC);
    bump(tokenize(e.category), W_CAT);
    let len = 0;
    for (const v of tf.values()) len += v;
    list.push({ ...e, tf, len });
  }
  const byMode = { bdfd: [], blocks: [] };
  for (const e of list) byMode[e.mode].push(e);
  const stats = {};
  for (const [mode, items] of Object.entries(byMode)) {
    const df = new Map();
    for (const e of items) for (const t of e.tf.keys()) df.set(t, (df.get(t) ?? 0) + 1);
    stats[mode] = { items, df, n: items.length, avgLen: items.reduce((s, e) => s + e.len, 0) / Math.max(1, items.length) };
  }
  return { stats, lookup: entries };
}

function expandQuery(intent) {
  const base = tokenize(intent);
  const weights = new Map();
  const put = (t, w) => weights.set(t, Math.max(weights.get(t) ?? 0, w));
  for (const t of base) {
    put(t, 1);
    for (const extra of (SYNONYMS[t] ?? SYNONYMS[stem(t)] ?? "").split(" ").filter(Boolean)) put(stem(extra), 0.6);
  }
  return { base, weights };
}

function bm25(stat, weights) {
  const scores = [];
  for (const e of stat.items) {
    if (e.status === "unsupported") continue;
    let s = 0;
    for (const [t, qw] of weights) {
      const f = e.tf.get(t);
      if (!f) continue;
      const df = stat.df.get(t) ?? 0;
      const idf = Math.log(1 + (stat.n - df + 0.5) / (df + 0.5));
      s += qw * idf * ((f * (K1 + 1)) / (f + K1 * (1 - B + (B * e.len) / stat.avgLen)));
    }
    if (s > 0) scores.push({ e, s: e.status === "incomplete" ? s * 0.5 : s });
  }
  return scores.sort((a, b) => b.s - a.s);
}

// Recipes whose trigger words the user wrote explicitly, best first. Distinct stems only, so
// "ticket"/"tickets" count once; `prio` breaks ties toward the more specific recipe.
function matchRecipes(base, mode) {
  const found = [];
  for (const r of RECIPES) {
    if (r.mode !== mode) continue;
    const direct = new Set(r.words.map(stem).filter((w) => base.includes(w)));
    if (direct.size < r.need) continue;
    found.push({ r, score: direct.size + (r.prio ?? 0) * 0.1, direct: direct.size });
  }
  return found.sort((a, b) => b.score - a.score);
}

const GLOBAL_GOTCHAS = {
  bdfd: "Slash/button replies are automatic: write text/embed functions, never $sendMessage to reply; $ephemeral = private reply.",
  blocks: "Blocks are {type,key?,payload}. To reuse a result, set `key` ON THE ACTION, not in payload ({\"type\":\"calculate\",\"key\":\"total\",\"payload\":{…}} then ((action.total))); without a key it is action_<position>. Validate with docs_validate_actions.",
};

/**
 * @returns {{decision, confidence, margin, functions, gotchas, skeleton?, next, recipe?}}
 */
export function plan(index, { intent, mode = "bdfd", budget = 10 }) {
  const stat = index.stats[mode];
  if (!stat) throw new Error(`mode must be 'bdfd' or 'blocks'`);
  const limit = Math.min(20, Math.max(1, Number.parseInt(budget, 10) || 10));
  const expanded = expandQuery(intent);
  if (expanded.base.length === 0) {
    return { decision: "ask_user", confidence: 0, margin: 0, functions: [], gotchas: [], next: "ask the user what the command should do" };
  }
  const ranked = bm25(stat, expanded.weights);
  const top = ranked[0]?.s ?? 0;
  const matches = matchRecipes(expanded.base, mode);
  const recipe = matches[0] ?? null;
  const extra = matches.slice(1).filter((m) => m.score >= recipe.score * 0.6);

  // Candidate pool: lexical top + recipe functions (boosted above the lexical top so the curated set leads).
  const pool = new Map();
  for (const { e, s } of ranked.slice(0, 40)) pool.set(key(e.name), { e, s: s / (top || 1), recipe: false });
  if (recipe) {
    recipe.r.fns.forEach((fn, i) => {
      const e = index.lookup.get(`${mode}:${key(fn)}`);
      const entry = { ...(e ?? { mode, category: "", desc: "" }), name: fn }; // curated casing wins
      pool.set(key(fn), { e: entry, s: 2 - i * 0.02, recipe: true });
    });
  }

  for (const m of extra) {
    m.r.fns.forEach((fn, i) => {
      const k = key(fn);
      if (pool.has(k)) return;
      pool.set(k, { e: { ...(index.lookup.get(`${mode}:${k}`) ?? { mode, category: "", desc: "" }), name: fn }, s: 1.5 - i * 0.02, recipe: true });
    });
  }

  const chosen = [];
  const perCategory = new Map();
  const cutoff = recipe ? 0.85 : 0.4;
  const candidates = [...pool.values()].sort((a, b) => b.s - a.s);
  while (chosen.length < limit && candidates.length) {
    let bestIdx = -1;
    let bestScore = -Infinity;
    candidates.forEach((c, i) => {
      const crowd = c.recipe ? 0 : (perCategory.get(c.e.category) ?? 0) * 0.12;
      const v = c.s - crowd;
      if (v > bestScore) [bestIdx, bestScore] = [i, v];
    });
    const [pick] = candidates.splice(bestIdx, 1);
    if (!pick.recipe && pick.s < cutoff) break;
    if (!pick.recipe && recipe && chosen.length >= recipe.r.fns.length + extra.reduce((n, m) => n + m.r.fns.length, 0) + 1) break;
    chosen.push(pick);
    perCategory.set(pick.e.category, (perCategory.get(pick.e.category) ?? 0) + 1);
  }

  // Coverage: share of intent words explained by the chosen functions (or by the recipe).
  const covered = new Set();
  for (const { e } of chosen) {
    if (!e.tf) continue;
    for (const t of expanded.base) {
      const alts = (SYNONYMS[t] ?? SYNONYMS[stem(t)] ?? "").split(" ").filter(Boolean).map(stem);
      if (e.tf.has(t) || alts.some((a) => e.tf.has(a))) covered.add(t);
    }
  }
  for (const m of recipe ? [recipe, ...extra] : []) for (const w of m.r.words) if (expanded.base.includes(stem(w))) covered.add(stem(w));
  const coverage = covered.size / expanded.base.length;
  const second = ranked[1]?.s ?? 0;
  const margin = top ? Number(((top - second) / top).toFixed(2)) : 0;
  const confidence = Number(Math.min(0.99, recipe ? 0.7 + 0.3 * coverage : coverage * (0.5 + 0.5 * margin)).toFixed(2));
  const decision = chosen.length === 0 || coverage === 0 ? "ask_user" : recipe || confidence >= 0.5 ? "auto" : "review";

  const gotchas = [];
  if (GLOBAL_GOTCHAS[mode]) gotchas.push(GLOBAL_GOTCHAS[mode]);
  for (const g of recipe?.r.gotchas ?? []) gotchas.push(g);
  for (const { e } of chosen) if (e.status === "incomplete") gotchas.push(`${e.name} is incomplete: prefer explicit actions.`);

  const short = (s) => (s && s.length > 70 ? `${s.slice(0, 67)}...` : s || "");
  const out = {
    decision,
    confidence,
    margin,
    functions: chosen.map(({ e }) => ({ n: e.name, sig: e.sig || e.name, d: short(e.desc) })),
    gotchas,
    next: decision === "auto" ? (mode === "bdfd" ? "write the script, then local_validate_bdfd" : "write the actions, then docs_validate_actions") : decision === "review" ? "docs_get on the 1-2 uncertain functions, then write" : "ask the user to clarify the intent",
  };
  if (recipe) {
    out.recipe = recipe.r.id;
    out.skeleton = recipe.r.skeleton;
  }
  return out;
}

// --- Documentation search ------------------------------------------------------------------------
//
// search_docs used to look for the WHOLE query as one substring, so any multi-word query
// ("find user", "sum math") matched nothing and the model kept rephrasing, one model round per
// attempt. rankDocs scores word by word (names, joined neighbours, descriptions, synonyms).

function docWords(d) {
  const slug = key(d.slug ?? "");
  const name = key(d.name ?? "");
  return {
    slug,
    name,
    nameParts: new Set(nameTokens(d.name || d.slug || "")),
    desc: new Set(tokenize(d.description)),
    cat: new Set(tokenize(d.category)),
  };
}

function scoreDoc(w, tokens, expanded, flat) {
  let score = 0;
  if (flat && (w.slug === flat || w.name === flat)) score += 100;
  const one = (t, weight) => {
    let s = 0;
    if (w.slug === t || w.name === t) s += 20;
    else if (t.length >= 3 && (w.slug.includes(t) || w.name.includes(t))) s += 8;
    if (w.nameParts.has(t)) s += 6;
    if (w.desc.has(t)) s += 2;
    if (w.cat.has(t)) s += 1;
    return s * weight;
  };
  for (const t of tokens) score += one(t, 1);
  for (const [t, weight] of expanded) if (!tokens.includes(t)) score += one(t, weight);
  for (let i = 0; i + 1 < tokens.length; i++) {
    if (w.slug === tokens[i] + tokens[i + 1] || w.slug === tokens[i + 1] + tokens[i]) score += 25;
  }
  return score;
}

/** Ranks docs-index rows for a free-text query. Returns [{ doc, score }] best first, score > 0 only. */
export function rankDocs(docs, query, limit = 8) {
  const { base, weights } = expandQuery(query);
  const flat = normalize(query).replace(/[^a-z0-9]/g, "");
  const tokens = [...new Set(base)];
  if (tokens.length === 0 && !flat) return [];
  const ranked = [];
  for (const d of docs) {
    const score = scoreDoc(docWords(d), tokens, weights, flat);
    if (score > 0) ranked.push({ doc: d, score });
  }
  return ranked.sort((a, b) => b.score - a.score || String(a.doc.slug).localeCompare(String(b.doc.slug))).slice(0, limit);
}

/** Closest documents when nothing matched the whole query: best hit of each single word. */
export function suggestDocs(docs, query, limit = 5) {
  const seen = new Set();
  const out = [];
  for (const t of [...new Set(tokenize(query))]) {
    for (const { doc } of rankDocs(docs, t, 2)) {
      if (!seen.has(doc.slug)) {
        seen.add(doc.slug);
        out.push(doc);
      }
    }
  }
  return out.slice(0, limit);
}

export { RECIPES, SYNONYMS };
