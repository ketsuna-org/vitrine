---
layout: doc
title: sandbox
category: "JavaScript API"
api_type: javascript
sidebar_context: javascript
description: Script execution limits, timeouts, and security restrictions in BDJS.
permalink: /docs/javascript/sandbox/
---

BDJS scripts run in an isolated sandbox with security restrictions and resource limits.

## Script timeout

Each script has a maximum execution time controlled by `config.scriptTimeoutMs` (default **30 seconds**). Long-running scripts are terminated when the deadline is reached.

## Timers

`setTimeout` and `clearTimeout` are available in the sandbox for short delays within the script timeout window.

```javascript
await new Promise((resolve) => setTimeout(resolve, 1000));
```

## require() whitelist

Only these modules can be imported:

| Module | Purpose |
|--------|---------|
| `discord.js` | Builders and constants only |
| `canvas` | Image generation |
| `@discordjs/voice` | Voice audio |
| `crypto` / `node:crypto` | Hashing, random bytes |
| `util` / `node:util` | inspect, format, type checks |
| `url` / `node:url` | URL parsing |
| `querystring` / `node:querystring` | Query string encode/decode |

Any other module throws at runtime.

## Blocked operations

| Restriction | Details |
|-------------|---------|
| `new Client()` | Use the global `client` object |
| `client.token` | Token access is blocked |
| Local file paths | Canvas, voice, and fetch assets must use `http(s)` or `data:` URLs |
| Nested `client` | Dynamic proxy blocks recursive client access |

## Discord.js dynamic proxies

Most discord.js methods on `client`, `interaction`, `message`, `guild`, `channel`, and `member` work through a sandbox bridge. Method calls cross the isolate boundary asynchronously.

## fetch restrictions

`fetch()` supports HTTP requests. Asset URLs loaded into canvas or voice must not point to local filesystem paths.

## Related

- [require()](/docs/javascript/require/) — module reference
- [config](/docs/javascript/config/) — `scriptTimeoutMs` setting
