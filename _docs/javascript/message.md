---
layout: doc
title: message
category: "JavaScript API"
api_type: javascript
sidebar_context: javascript
description: Text message context object in BDJS scripts.
permalink: /docs/javascript/message/
---

The `message` global is available when a command runs from a text message trigger.

## Properties

| Property | Description |
|----------|-------------|
| `content` | Message text |
| `author.id` | Author user ID |
| `author.username` | Author username |

## Methods

### `await message.reply(content)`

Reply in the same channel.

```javascript
const args = message.content.split(' ');
const body = args.slice(1).join(' ');
await message.reply(body || 'Usage: !echo <text>');
```
