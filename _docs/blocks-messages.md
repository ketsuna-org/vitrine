---
layout: doc
title: Blocks — messages and slash responses
category: "Blocks"
api_type: blocks
description: respondWithMessage versus sendMessage; content, embeds, channels and interaction context.
---

# Message Blocks

| Action | Purpose | Payload |
|---|---|---|
| `respondWithMessage` | Reply to the active interaction; without an interaction, falls back to a channel send when a client and channel are available. | `content` string; optional `embeds` list, `components` list, `ephemeral` boolean, `channelId` string for fallback. |
| `sendMessage` | Send a channel message. | `content` string, `channelId` string (or available channel context), optional `embeds` and `components` lists. |

Slash example:

```json
{"type":"respondWithMessage","key":"reply","payload":{"content":"Hello ((user.username))!","ephemeral":true}}
```

An embed response does not require a separate `sendMessage`:

```json
{"type":"respondWithMessage","payload":{"embeds":[{"title":"Welcome","description":"Hello ((user.username))!","color":65280}]}}
```

A workflow message to an explicit channel:

```json
{"type":"sendMessage","key":"notification","payload":{"channelId":"123456789012345678","content":"The workflow finished."}}
```

Replace example IDs with your channel IDs. A message must have content, an embed, components or an attachment. `ephemeral` belongs to interaction responses; it does not turn an ordinary channel message into a private response. Component lists have their own structure: do not insert `$addButton` strings as Blocks components.
