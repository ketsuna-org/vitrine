---
layout: doc
title: config
category: "JavaScript API"
api_type: javascript
sidebar_context: javascript
description: Read-only bot configuration exposed to BDJS scripts.
permalink: /docs/javascript/config/
---

The `config` global exposes the bot's runtime configuration. The bot token is stripped before scripts can access it.

## Properties

| Property | Type | Description |
|----------|------|-------------|
| `intents` | `string[]` | Discord gateway intents |
| `prefix` | `string` | Prefix command trigger |
| `autoRestart` | `boolean` | Auto-restart on crash |
| `presence` | `object` | Bot presence settings |
| `commands` | `array` | Registered command definitions |
| `events` | `array` | Registered event workflows |
| `scheduled` | `array` | Scheduled task definitions |
| `inboundWebhooks` | `array` | Inbound webhook configs |
| `globalVariables` | `object` | Default global variable values |
| `scopedVariableDefinitions` | `array` | User/guild/channel variable schemas |
| `scriptTimeoutMs` | `number` | Script execution timeout (default 30000) |

## Example

```javascript
const prefix = config.prefix;
const timeout = config.scriptTimeoutMs;
const defaults = config.globalVariables;
```

## Related

- [db.global](/docs/javascript/db-global/) — `get` falls back to `config.globalVariables`
- [variables](/docs/javascript/variables/) — merged runtime variable object
- [sandbox](/docs/javascript/sandbox/) — script timeout behavior
