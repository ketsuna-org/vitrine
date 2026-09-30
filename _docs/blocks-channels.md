---
layout: doc
title: Blocks — channels, permissions and tickets
category: "Blocks"
api_type: blocks
description: createChannel, editChannelPermissions and removeChannel contracts; explicit ticket creation instead of incomplete BDFD helpers.
---

# Channel Blocks

## createChannel

Requires a guild context and the bot's Manage Channels permission. The action result is the channel ID; a failure raises an action error.

| Payload field | Type / meaning |
|---|---|
| `name` | Required nonempty string. |
| `type` | String: `text` (default), `voice`, `announcement`, `stage`, `forum`, `category`. |
| `categoryId` | Optional parent category ID string. Use this field, not `parentId`. |
| `topic` | Optional topic string. |
| `nsfw` | Optional boolean or boolean string. |
| `slowmode` | Optional seconds or duration string such as `5s`. |

## editChannelPermissions

Edits one channel permission overwrite. The bot needs permission to change the channel's overwrites.

| Payload field | Type / meaning |
|---|---|
| `channelId` | Channel ID string, or available channel context. |
| `targetType` | `member` (default), `role` or `everyone`. |
| `targetId` | User/role ID string; ignored for `everyone`, which uses the guild ID. |
| `allow`, `deny` | Permission bitmasks as integer strings, both default `0`. |
| `permissions` | Optional map of permission keys to `allow`, `deny`, `unset`; when nonempty, takes precedence over bitmasks. |

## Explicit ticket sequence

Create a **private parent category first**, with access denied to everyone and allowed for the bot and staff. Replace the category ID below. The sequence creates a text channel, grants its creator View Channel (1024), Send Messages (2048) and Read Message History (65536), sends a welcome, and replies to the slash interaction.

```json
[
  {"type":"createChannel","key":"ticket_channel","payload":{"name":"ticket-((user.id))","type":"text","categoryId":"123456789012345678"}},
  {"type":"editChannelPermissions","payload":{"channelId":"((action.ticket_channel))","targetType":"member","targetId":"((user.id))","allow":"68608","deny":"0"}},
  {"type":"sendMessage","payload":{"channelId":"((action.ticket_channel))","content":"Welcome <@((user.id))>. Describe your issue here."}},
  {"type":"respondWithMessage","payload":{"content":"Ticket created: <#((action.ticket_channel))>","ephemeral":true}}
]
```

This sequence is the channel creation step, not a complete ticket lifecycle. Store the created ID in scoped storage to track open tickets and enforce limits. Review inherited staff/bot permissions. Creation and permission updates are separate operations: if an update fails, the channel can still exist and requires cleanup or repair.

## removeChannel

`payload.channelId` is the required ID string. Requires Manage Channels; the result is the deleted ID. For a close command, verify its caller's permission and confirm the channel ID against stored ticket data before this action. A channel's name alone is not proof that it is a ticket.

```json
{"type":"removeChannel","payload":{"channelId":"((channel.id))"}}
```

Deletion cannot be undone. `updateChannel` edits a channel; archived/locked settings are thread-specific and do not delete a text-channel ticket.
