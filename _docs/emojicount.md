---
layout: doc
title: $emojiCount
translation_key: docs
category: "Entity Info"
function_name: emojiCount
syntax: $emojiCount[(serverID)]
description: Returns the number of custom emojis of the current server, or of the server whose ID is given.
---

# $emojiCount — Number of Emojis

The `$emojiCount` function returns the number of custom emojis of a server (all the emojis returned by Discord for the server's emoji list, static and animated alike).

## Syntax

```
$emojiCount[(serverID)]
```

## Parameters

| Parameter | Description | Required |
|-----------|-------------|:--------:|
| `serverID` | ID of the server to count. If omitted or empty, the current server is used. A value that is not a positive number raises `Invalid guild ID.` | No |

## Return value

- **Type**: `integer`
- The number of custom emojis of the server. `0` if it has none.
- Outside a server (and without `serverID`) the lookup fails with `Emoji listing requires a guild.`

## Examples

### Simple display

```bdfd
$sendMessage[🎨 There are **$emojiCount** custom emojis on this server!]
```

### Another server

```bdfd
$sendMessage[That server has $emojiCount[123456789012345678] custom emojis.]
```

### Server Info Embed

```bdfd
$title[📊 $serverName]
$addField[🎨 Emojis;$emojiCount;yes]
$addField[🚀 Boosts;$serverBoostCount;yes]
$thumbnail[$serverIcon]
$color[#5865F2]
```

## Notes

- Related: `$emoteCount` (emojis of the current server only, no argument) and `$serverEmojis`, which lists the emojis of a server rather than counting them.
- The list is requested from Discord each time the function runs.
