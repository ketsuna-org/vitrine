---
layout: doc
title: $userReacted
translation_key: docs
category: "Entity Info"
function_name: userReacted
syntax: $userReacted[messageID;userID;emoji]
description: Checks if a specific user reacted with a given emoji on a message. Returns true or false.
---

# $userReacted

The `$userReacted` function checks if a user has reacted with a specific emoji on a given message.

## Syntax

```
$userReacted[messageID;userID;emoji]
```

## Parameters

| Parameter | Description |
|---|---|
| `messageID` | The ID of the message on which to check the reaction. |
| `userID` | The ID of the user to check. |
| `emoji` | The emoji to check (Unicode or `name:ID` for custom emojis). |

## Return Value

- **Type**: String (boolean)
- `true` if the user has reacted with the specified emoji.
- `false` if the user has not reacted or has reacted with a different emoji.

## Behavior

- Checks the reaction list of the message for the given emoji.
- Works with standard Unicode emojis (✅, ❌, 👍, etc.).
- Works with custom server emojis.
- The message must be accessible to the bot.

## Examples

### Verification system via reaction

```bdfd
$nominalTrigger
$let[msgID;$sendMessage[✅ React to accept the rules.]]
$addCmdReactions[✅]

$onReactionAdd[✅]
$if[$userReacted[$msgID;$authorID;✅]==true]
  $giveRole[$authorID;$roleID[Member]]
  $sendDM[$authorID;Welcome! You have accepted the rules.]
$endif
```

### Interactive poll

```bdfd
$let[pollMsg;$sendMessage[Vote for your choice!]]
$addCmdReactions[👍;👎]

$let[voted;$userReacted[$pollMsg;$authorID;👍]]
$if[$voted==true]
  $sendMessage[Thanks for your vote 👍!]
$else
  $sendMessage[You have not voted 👍 yet.]
$endif
```

### Condition for a giveaway

```bdfd
$if[$userReacted[$giveawayMsg;$authorID;🎉]==true]
  $sendMessage[✅ You are participating in the giveaway!]
$else
  $sendMessage[❌ You must react with 🎉 to participate.]
$endif
```

## Notes

- For custom emojis, use the `name:ID` format.
- The function is case-sensitive for custom emoji names.
- The bot must have access to the message (in the same channel) to check reactions.
