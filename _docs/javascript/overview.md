---
layout: doc
title: JavaScript API Overview
category: "JavaScript API"
api_type: javascript
sidebar_context: javascript
description: Script globals available in BDJS (JavaScript) bots — db, interaction, message, and more.
permalink: /docs/javascript/
---

Bot Creator supports two scripting modes: **BDScript** (`$functions`) and **BDJS** (JavaScript). When your bot uses BDJS, command handlers run as async JavaScript with a sandboxed set of globals.

Check your bot's mode with [$scriptLanguage](/docs/scriptlanguage/) — it returns `bdjs` or `bdscript`.

## Available globals

| Global | Description |
|--------|-------------|
| `db` | Persistent storage (`db.user`, `db.global`, …) |
| `interaction` | Slash command / component interaction (when applicable) |
| `message` | Text message context (when applicable) |
| `client` | Discord client proxy |
| `guild`, `channel`, `member` | Context entities |
| `config` | Bot configuration (token stripped) |
| `variables` | Runtime variables object |
| `webhook` | Webhook payload context or `null` |
| `console` | `log`, `info`, `warn`, `error`, `debug` |
| `fetch` | HTTP requests (proxied) |
| `require(name)` | Whitelisted Node modules |

## Quick example

```javascript
const coins = await db.user.get('coins');
await db.user.set('coins', (Number(coins) || 0) + 10);
await interaction.reply(`You now have ${Number(coins) + 10} coins!`);
```

## BDFD equivalent

Many BDJS features map to BDFD `$functions`. See the [BDFD Variables](/docs/#variables) category for `$getUserVar`, `$setUserVar`, and related functions.

## Sections

- [db — Storage API](/docs/javascript/db/)
- [interaction](/docs/javascript/interaction/) — slash commands and replies
- [Components](/docs/javascript/components/) — buttons, selects, modals
- [Autocomplete](/docs/javascript/autocomplete/) — dynamic slash suggestions
- [discord.js builders](/docs/javascript/discordjs-builders/) — embeds and UI components
- [config](/docs/javascript/config/) and [variables](/docs/javascript/variables/)
- [canvas](/docs/javascript/canvas/) and [voice](/docs/javascript/voice/)
- [sandbox](/docs/javascript/sandbox/) — limits and restrictions
- [require()](/docs/javascript/require/)
- [Placeholders](/docs/javascript/placeholders/)
- [Events & placeholders](/docs/events-and-placeholders/) — `((...))` in BDScript
