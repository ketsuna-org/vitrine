---
layout: doc
title: $userReacted
translation_key: docs
category: "Entity Info"
function_name: userReacted
syntax: $userReacted[messageID;userID;emoji]
description: Checks if un user specific a réagi with a emoji donné on a message. Returns true or false.
---

# $userReacted

The function `$userReacted[]` allows **check if a user a réagi** with a emoji specific on a message donné.

## Syntax

```
$userReacted[messageID;userID;emoji]
```

## Parameters

| Parameter | Description |
|---|---|
| `messageID` | The ID of the message on lequel check the réaction. |
| `userID` | The ID of the user to vérifier. |
| `emoji` | L'emoji to check (unicode or `nom:ID` for the emojis customs). |

## Return Value

- **Type** : String (boolean)
- `true` si the user a réagi with the emoji spécifié.
- `false` si the user n'a pas réagi or a réagi with a autre emoji.

## Behavior

- Checks la list réactions of the message for the emoji donné.
- Functionne with thes emojis unicode standards (✅, ❌, 👍, etc.).
- Functionne with thes emojis customs of the server.
- The message must be accessible par the bot.

## Examples

### Système of vérification par réaction

```bdfd
$nominalTrigger
$let[msgID;$sendMessage[✅ Réagissez pour accepter les règles.]]
$addCmdReactions[✅]

$onReactionAdd[✅]
$if[$userReacted[$msgID;$authorID;✅]==true]
  $giveRole[$authorID;$roleID[Member]]
  $sendDM[$authorID;Bienvenue ! Vous avez accepté les règles.]
$endif
```

### Sondage interactif

```bdfd
$let[pollMsg;$sendMessage[Votez pour votre choix !]]
$addCmdReactions[👍;👎]

$let[voted;$userReacted[$pollMsg;$authorID;👍]]
$if[$voted==true]
  $sendMessage[Merci pour votre vote 👍 !]
$else
  $sendMessage[Vous n'avez pas encore voté 👍.]
$endif
```

### Condition for a giveaway

```bdfd
$if[$userReacted[$giveawayMsg;$authorID;🎉]==true]
  $sendMessage[✅ Vous participez to the giveaway !]
$else
  $sendMessage[❌ Vous devez réagir with 🎉 pour participer.]
$endif
```

## Notes

- Pour les emojis customs, utilisez le format `nom:ID`.
- The function est sensible to la casse for the noms of emojis customs.
- The bot doit avoir accès to the message (même channel) pour check thes réactions.
