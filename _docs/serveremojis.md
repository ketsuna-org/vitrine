---
layout: doc
title: $serverEmojis[]
translation_key: docs
category: "Entity Info"
function_name: serverEmojis
syntax: $serverEmojis[guildID;separator]
description: Returns the list of custom emojis of a Discord server, joined by a separator.
---

# $serverEmojis[] — Server Emojis List

`$serverEmojis[]` returns the complete list of custom emojis of a server, formatted to be displayed in Discord.

## Syntax

```
$serverEmojis[guildID;separator]
```

The function requires exactly 2 arguments.

## Parameters

| Parameter | Description |
|---|---|
| `guildID` | Required. ID of the server (an invalid ID raises "Invalid guild ID."). |
| `separator` | Required. Text placed between emojis (can be empty). |

## Return Value

- **Type**: `string`
- A string containing all custom emojis of the server joined with the separator, each in the format `<:name:id>` (or `<a:name:id>` for animated emojis).

## Examples

### Display all emojis

```bdfd
$sendMessage[🎨 Emojis of the server: $serverEmojis[$guildID; ]]
```

### Emoji catalog embed

```bdfd
$title[Emojis of $serverName]
$description[$serverEmojis[$guildID; ]]
$footer[Total: $emojiCount emojis]
$color[#F1C40F]
```

### Check emoji count

```bdfd
$if[$emojiCount>=50]
  $sendMessage[🎉 This server has a rich collection of emojis! ($emojiCount)]
$else
  $sendMessage[The server has $emojiCount custom emojis.]
$endif
```

### Server info with emojis

```bdfd
$title[$serverName]
$addField[👥 Members;$membersCount;yes]
$addField[🎨 Emojis;$emojiCount;yes]
$addField[🚀 Boosts;$serverBoostCount;yes]
$thumbnail[$serverIcon]
$color[#5865F2]
```

## Notes

- The list can be very long if the server has many emojis — watch out for the Discord 2,000-character message limit.
- Animated emojis are prefixed with `<a:` instead of `<:`.
- To get only the number of emojis without the list, use `$emojiCount[]`.
- The emoji limit per server depends on the boost level (50 by default, up to 250 at level 3).
