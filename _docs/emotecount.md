---
layout: doc
title: $emojiCount / $emoteCount
translation_key: docs
category: "Moderation"
function_name: emojiCount
syntax: $emojiCount / $emoteCount
description: Returns the total number of custom emojis on the current server. $emoteCount is an alias of $emojiCount.
---

# $emojiCount / $emoteCount

The `$emojiCount` function (alias `$emoteCount`) allows you to **retrieve the total number of custom emojis** present on the current server.

## Syntax

```
$emojiCount
```
or
```
$emoteCount
```

## Parameters

No parameters.

## Return value

- **Type**: String (number)
- The total number of custom emojis on the server.
- Includes both static and animated emojis.

## Behavior

- `$emoteCount` is an exact alias of `$emojiCount` (same behavior).
- Counts all custom emojis of the server.
- Useful for checking the usage slots of available emojis.

## Examples

### Emoji Statistics

```bdfd
$title[🎨 Server Emojis]
$description[
**Total number:** $emojiCount
**Limit:** 50 emojis (more for boosted servers)
**Remaining slots:** $math[50-$emojiCount]
]
$color[#5865F2]
$sendMessage[]
```

### Limit alert

```bdfd
$if[$emojiCount>=50]
  $sendMessage[⚠️ The emoji limit has been reached ($emojiCount/50). Delete some unused emojis.]
$else
  $sendMessage[✅ $math[50-$emojiCount] emoji slots available.]
$endif
```

### Display using alias

```bdfd
$title[📊 Server Info]
$description[
**Members:** $membersCount
**Channels:** $channelCount
**Roles:** $roleCount
**Emojis:** $emoteCount
]
$sendMessage[]
```

## Notes

- The two names (`$emojiCount` and `$emoteCount`) are interchangeable.
- The base limit is 50 emojis, which increases with server boosts.
- Animated and static emojis share separate limits.
