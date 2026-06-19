---
layout: doc
title: $serverEmojis[]
translation_key: docs
category: "Entity Info"
function_name: serverEmojis
syntax: $serverEmojis
description: Returns a list of custom emojis available on the Discord server.
---

# $serverEmojis[] — Server Emojis List

`$serverEmojis[]` returns the complete list of custom emojis on the server, formatted to be displayed in Discord.

## Syntax

```
$serverEmojis
```

## Parameters

No parameters.

## Return Value

- **Type**: `string`
- A string containing all custom emojis on the server, each in the format `<:name:id>` (or `<a:name:id>` for animated emojis).

## Usage

### Display all emojis

```bdfd
$sendMessage[🎨 Emojis of the server: $serverEmojis]
```

### Emoji catalog embed

```bdfd
$title[Emojis of $serverName]
$description[$serverEmojis]
$footer[Total: $emojiCount emojis]
$color[#F1C40F]
$sendEmbedMessage
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
$sendEmbedMessage
```

## Notes

- The list can be very long if the server has many emojis — watch out for the Discord 2,000-character message limit.
- Animated emojis are prefixed with `<a:` instead of `<:`.
- To get only the number of emojis without the list, use `$emojiCount[]`.
- The emoji limit per server depends on the boost level (50 by default, up to 250 at level 3).
