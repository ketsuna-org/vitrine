---
layout: doc
title: $addTimestamp[]
translation_key: docs
category: "Embed & Message"
function_name: addTimestamp
syntax: $addTimestamp[(embedIndex)]
description: Adds the current date and time as the timestamp of a Discord embed. The optional argument is the embed index (1 to 10).
---

# $addTimestamp[]

The `$addTimestamp[]` function sets the **timestamp** of a Discord embed to the current date and time (UTC, ISO 8601). The timestamp is displayed at the bottom of the embed, next to the footer if it is present.

## Syntax

```
$addTimestamp[(embedIndex)]
```

## Parameters

| Parameter | Description |
|---|---|
| `embedIndex` | Optional. Index of the targeted embed, from 1 to 10 (1 by default, also when empty). Any other value is an error. |

## Return value

Modifies the response currently being constructed. Returns nothing.

## Behavior

- `$addTimestamp` and `$addTimestamp[]` are both valid and target the first embed.
- The timestamp is always the current time; the function does not accept a custom date or Unix timestamp.
- Discord automatically formats the timestamp in the timezone of the user viewing it.

## Examples

### Current timestamp

```bdfd
$title[Logs]
$description[A moderation action has been performed.]
$addTimestamp
$color[#ED4245]
```

### Timestamp on the second embed

```bdfd
$title[Main;1]
$title[Details;2]
$addTimestamp[2]
```

### Timestamp with footer

```bdfd
$title[Welcome!]
$description[
Welcome to the server **$serverName**, $username!
We are delighted to welcome you among us.
]
$footer[$serverName]
$addTimestamp
$color[#57F287]
```

## Notes

- The timestamp is automatically localized by Discord according to each user's timezone.
- Combine this with `$footer[]` to show footer text next to the timestamp.
