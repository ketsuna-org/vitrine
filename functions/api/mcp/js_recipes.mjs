// plan_solution for JavaScript (BDJS) bots. No BM25 index: the JS API is small, so the planner returns the
// API contract every script needs plus the recipe that matches the intent. decision is always "auto" for a
// recognised recipe so the model writes the script immediately instead of looping on documentation.

const CORE = {
  globals: "interaction, db, message, client, guild, channel, member, config, variables, console, fetch, voice (music, Premium), require(name). `db` is a GLOBAL (never interaction.client.db).",
  body: "The script is the BODY of an async function: top-level await and return work; never import/export/module.exports (use require(name) for Node modules; the script runs in the runner process with no isolation).",
  reply: "await interaction.reply('text') or await interaction.reply({ content, ephemeral?, embeds?, components? }); deferReply()/editReply() for slow work. Reply once per interaction.",
  options: "interaction.options.getString(name, required?) / getInteger / getNumber / getBoolean / getUser / getMember / getChannel / getRole. Options MUST be declared on the command (local_create_command `options`), otherwise getString returns null.",
  storage: "await db.user.get(key) / set(key, value) / delete(key) (also db.global, db.guild, db.channel, db.guildMember). In a guild db.user routes to the member scope. Values are JSON; coerce with Number().",
  voice: "Music (Lavalink, Premium bots only): the global `voice` object, no event handler to write. await voice.play(query | url, { channelId?, source?, next? }) joins the voice channel of the person who ran the command (or channelId) and plays or queues; returns { track, queued, position, playlist? }; source: youtube (default) | youtubemusic | soundcloud | spotify. Also: await voice.search(query, { limit?, source? }), pause(), resume(), stop() (clears the queue), skip() (next track or null), seek(position, 'seconds'?), setVolume(0-200), getVolume(), setLoopMode('off'|'track'|'queue'), getLoopMode(), getQueue(), nowPlaying(), remove(rank), clear(), shuffle(), join(channelId?), leave(), isConnected(), isPlaying(), isPaused(), voice.enabled. A track is { title, author, url, duration (ms), durationText, isStream, thumbnail, source, identifier, requestedBy }. Without Premium (or with Lavalink off in the bot settings, Lavalink tab) every call throws; wrap in try/catch. The user must be in a voice channel unless channelId is given.",
  strings: "Inside a template literal never write unescaped backticks (a backtick-quoted `/cmd` ends the string): use quotes or escape it as \\`.",
};

const RECIPES = [
  {
    id: "chat",
    words: ["chat", "discuter", "parler", "talk", "conversation", "reponse", "reply", "answer", "dialog", "общ", "чат", "говор", "розмов", "спілкув"],
    options: [{ type: "string", name: "message", description: "What to say", required: true }],
    skeleton: "const text = (interaction.options.getString('message') || '').toLowerCase();\nconst replies = ['...', '...', '...'];\nlet reply = replies[Math.floor(Math.random() * replies.length)];\nif (text.includes('hello')) reply = 'Hello!';\nawait interaction.reply(`${reply}`);",
  },
  {
    id: "guess-game",
    words: ["guess", "devine", "deviner", "number game", "jeu", "game", "play", "jouer", "игр", "гра", "вгад", "угад", "ігр"],
    options: [{ type: "integer", name: "guess", description: "Your guess (omit to start)", required: false, minValue: 1, maxValue: 100 }],
    skeleton: "const guess = interaction.options.getInteger('guess');\nconst secret = Number(await db.user.get('secret'));\nif (guess === null || !secret) {\n  await db.user.set('secret', Math.floor(Math.random() * 100) + 1);\n  return interaction.reply('I picked a number from 1 to 100. Use the guess option.');\n}\nif (guess === secret) { await db.user.delete('secret'); return interaction.reply('You found it!'); }\nawait interaction.reply(guess < secret ? 'Higher!' : 'Lower!');",
  },
  {
    id: "counter-economy",
    words: ["coins", "money", "argent", "economy", "economie", "xp", "level", "niveau", "counter", "compteur", "points", "daily", "balance"],
    options: [],
    skeleton: "const coins = Number(await db.user.get('coins')) || 0;\nawait db.user.set('coins', coins + 10);\nawait interaction.reply(`You now have ${coins + 10} coins.`);",
  },
  {
    id: "embed",
    words: ["embed", "annonce", "announcement", "info", "profil", "profile", "card"],
    options: [],
    skeleton: "await interaction.reply({ embeds: [{ title: '...', description: '...', color: 0x5865f2 }] });",
  },
  {
    id: "image-attachment",
    words: ["image", "images", "photo", "picture", "img", "pic", "meme", "avatar", "gif", "canvas"],
    options: [{ type: "string", name: "url", description: "Image URL", required: true }],
    skeleton: "const { AttachmentBuilder } = require('discord.js');\nconst url = interaction.options.getString('url', true);\nawait interaction.deferReply();\ntry {\n  const res = await fetch(url);\n  if (!res.ok) throw new Error('HTTP ' + res.status);\n  const buf = Buffer.from(await res.arrayBuffer());\n  await interaction.editReply({ files: [new AttachmentBuilder(buf, { name: 'image.png' })] });\n} catch (error) {\n  await interaction.editReply('Could not fetch the image: ' + error.message);\n}",
  },
  {
    id: "music",
    words: ["music", "musique", "play", "jouer", "vocal", "voice", "lavalink", "song", "chanson", "skip", "queue", "playlist", "radio"],
    options: [{ type: "string", name: "query", description: "Song name or URL", required: true }],
    skeleton: "const query = interaction.options.getString('query', true);\nawait interaction.deferReply();\ntry {\n  const result = await voice.play(query);\n  await interaction.editReply(result.queued ? `Queued (#${result.position}): ${result.track.title}` : `Now playing: ${result.track.title}`);\n} catch (error) {\n  await interaction.editReply(`Cannot play: ${error.message}`);\n}",
  },
];

function norm(s) {
  return String(s ?? "").toLowerCase().normalize("NFKD").replace(/[̀-ͯ]/g, "");
}

export function planJavascript({ intent }) {
  const text = norm(intent);
  const hits = RECIPES.filter((r) => r.words.some((w) => text.includes(norm(w))));
  return {
    decision: hits.length ? "auto" : "review",
    mode: "javascript",
    contract: CORE,
    recipes: hits.map((r) => ({ id: r.id, options: r.options, skeleton: r.skeleton })),
    gotchas: [
      "Write execution_mode javascript only; never BDFD $functions.",
      "Declare every option the script reads in the same local_create_command call.",
      "There is no JS sandbox: local_test_command only runs BDFD/blocks, so do not use it for a JS bot.",
      "Slow work (fetch, images, AI) must follow await interaction.deferReply() within 3 seconds, then interaction.editReply; wrap it in try/catch and always answer the user. Discord caches are almost empty: use guild.members.fetch(id), not .cache.",
    ],
    next: hits.length
      ? "write the script from the recipe and call local_create_command with options + script; no further docs calls"
      : "docs_get one of: interaction, db, components, discordjs-builders, then write the script",
  };
}
