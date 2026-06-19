---
layout: doc
title: $addTimestamp[]
translation_key: docs
category: "Embed & Message"
function_name: addTimestamp
syntax: $addTimestamp[(timestamp);(embedIndex)]
description: Adds a timestamp at the bottom of a Discord embed. By default, it displays the current date and time.
---

# $addTimestamp[]

The `$addTimestamp[]` function adds a **timestamp** to the footer of a Discord embed. By default, it displays the current date and time. The timestamp is displayed at the bottom of the embed, next to the footer if it is present.

## Syntax

```
$addTimestamp[(timestamp);(embedIndex)]
```

## Parameters

| Parameter | Description |
|---|---|
| `timestamp` | Optional. `now` (by default) for the current time, or a Unix timestamp in seconds for a specific date. |
| `embedIndex` | Optional. Index of the targeted embed (0 by default). |

## Return value

Modifies the response currently being constructed. Returns nothing.

## Behavior

- If no parameter is provided (`$addTimestamp`), the current date and time are used.
- The timestamp is displayed at the bottom of the embed, below the fields and the footer.
- Discord automatically formats the timestamp in the timezone of the user viewing it.

## Examples

### Current timestamp

```bdfd
$title[Logs]
$description[A moderation action has been performed.]
$addTimestamp
$color[#ED4245]
$sendMessage[]
```

### Timestamp with a specific date

```bdfd
$title[Past Event]
$description[This event took place on November 19, 2023.]
$addTimestamp[1700000000]
$color[#5865F2]
$sendMessage[]
```

### Timestamp with footer

```bdfd
$title[Welcome!]
$description[
Welcome to the server **$serverName**, $username!
We are delighted to welcome you among us.
]
$footer[$serverName;$serverIcon]
$addTimestamp
$color[#57F287]
$sendMessage[]
```

### Log embed with a dynamic timestamp

```bdfd
$title[🔨 Moderation Log]
$description[
**Moderator:** $username
**Action:** Kick
**Reason:** Breaking the rules
]
$addField[Target user;$var[target];yes]
$addField[ID;$var[targetID];yes]
$footer[Moderation Bot v2.0]
$addTimestamp
$color[#ED4245]
$sendMessage[]
```

## Notes

- The timestamp is automatically localized by Discord according to each user's timezone.
- Use `$getTimestamp` to obtain the current Unix timestamp to pass as a parameter.
- Combine this with `$footer[]` for a complete embed footer (text + icon + timestamp).
- The display format (relative like "2 hours ago" or absolute like "11/19/2023") depends on the recipient's Discord client version.

