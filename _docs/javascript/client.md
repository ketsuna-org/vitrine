---
layout: doc
title: client, guild, channel
category: "JavaScript API"
api_type: javascript
sidebar_context: javascript
description: Discord context proxies available in BDJS scripts.
permalink: /docs/javascript/client/
---

## client

Proxy to the Discord.js client. Dangerous nested properties are blocked.

```javascript
const botId = client.user?.id;
const botName = client.user?.username;
```

## guild

Current guild context, or `null` in DMs.

| Property | Description |
|----------|-------------|
| `id` | Guild ID |
| `name` | Guild name |

## channel

Current channel context.

| Property | Description |
|----------|-------------|
| `id` | Channel ID |
| `name` | Channel name (nullable) |

## member

Current member object (dynamic proxy) when available in guild context.

## config

Bot configuration as a key/value object. The bot token is **never** exposed.

## variables

Runtime variables defined in the Bot Creator UI, as a plain object.

## webhook

When the script runs from a webhook context: `{ path, payload, headers }`. Otherwise `null`.
