---
layout: doc
title: $reactionCount
translation_key: docs
category: "Moderation"
function_name: reactionCount
syntax: $reactionCount[channelID;messageID;emoji;(type)]
description: Returns how many reactions a message has for an emoji, normal, super or both, without listing the users. Bot Creator function, not in BDFD.
---

# $reactionCount

The function `$reactionCount` **returns the number of reactions** a message has for one emoji. It reads the count Discord keeps on the message, so it does not list the users like `$getReactions` does. This function does not exist in BDFD: it is specific to Bot Creator.

## Syntax

```
$reactionCount[channelID;messageID;emoji;(type)]
```

## Parameters

| Parameter | Description |
|---|---|
| `channelID` | Required. The ID of the channel containing the message (digits only, otherwise `Invalid Discord ID.`). |
| `messageID` | Required. The ID of the message (digits only). |
| `emoji` | Required. A Unicode emoji (`👍`), a custom emoji (`<:name:ID>` or `<a:name:ID>`), the ID of a custom emoji, or a `:name:` alias known to the engine. |
| `type` | Optional. `normal` (default, also when empty) counts the normal reactions, `super` (or `burst`) the super reactions, `all` (or `total`) both. Any other value raises `The reaction type must be normal, super or all.` |

## Return value

- **Type**: Number
- The count of reactions of that emoji and that type, `0` when nobody used the emoji. The bot's own reaction is counted.

## Examples

### Votes of a poll

```bdfd
$sendMessage[👍 $reactionCount[$channelID;$messageID;👍] · 👎 $reactionCount[$channelID;$messageID;👎]]
```

### Super reactions

```bdfd
$sendMessage[🔥 super reactions: $reactionCount[$channelID;$messageID;🔥;super]]
```

### Reaching a goal

```bdfd
$if[$reactionCount[$channelID;$messageID;🎉;all]>=10]
  The goal is reached!
$endif
```

## Notes

- The message must exist and the channel must be a message channel (`Reactions require a message channel.`). The bot needs to read the message.
- `$getReactions` lists the users of the normal reactions, `$getSuperReactions` those of the super reactions.
- JavaScript: `message.reactions.cache.get(emoji)?.count`, and `countDetails.normal` / `countDetails.burst` for each type.
