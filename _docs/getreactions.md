---
layout: doc
title: $getReactions
translation_key: docs
category: "Moderation"
function_name: getReactions
syntax: $getReactions[channelID;messageID;separator;emoji]
description: Returns the list of the users who reacted to a message with a given emoji, separated by the chosen separator.
---

# $getReactions

The function `$getReactions[]` retrieves the **users who reacted** to a message with a specific emoji.

## Syntax

```
$getReactions[channelID;messageID;separator;emoji]
```

## Parameters

| Parameter | Description |
|---|---|
| `channelID` | The ID of the channel containing the message. Required. |
| `messageID` | The ID of the target message. Required. |
| `separator` | The text inserted between each user name. Required (may be empty). |
| `emoji` | The emoji to read. Unicode (`👍`), custom (`<:name:ID>` or `<a:name:ID>`), the ID of a custom emoji, or a `:name:` alias known to the engine. Required. |

## Return Value

- **Type**: String
- The names of the users who reacted with this emoji, joined with the separator (all pages of reactions are read).
- The user name, followed by `#discriminator` only for accounts that still have one.
- An empty string if nobody reacted with this emoji.
- An error is raised if an ID is invalid, if the emoji is empty or invalid, or if the message cannot be read.

## Behavior

- Returns the users, not a count.
- Each user appears once.
- The bot must have access to the channel to read the reactions.

## Examples

### Poll results

```bdfd
$title[Results of the poll]
$description[
**Yes:** $getReactions[$channelID;$messageID;, ;👍]
**No:** $getReactions[$channelID;$messageID;, ;👎]
]
$color[#5865F2]
```

### Nobody has validated

```bdfd
$if[$getReactions[$channelID;$messageID;,;✅]==]
  $sendMessage[Nobody has reacted with ✅ yet.]
$else
  $sendMessage[Validated by: $getReactions[$channelID;$messageID;, ;✅]]
$endif
```

### Giveaway

```bdfd
$sendMessage[Participants: $getReactions[$channelID;$messageID;, ;🎉]]
```

## Notes

- To test whether one given user reacted, use `$userReacted[channelID;messageID;userID;emoji]`.
- To count the reactions, split the result with `$textSplit[]` and read `$getTextSplitLength` (an empty result still gives one empty element).
