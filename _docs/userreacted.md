---
layout: doc
title: $userReacted
translation_key: docs
category: "Entity Info"
function_name: userReacted
syntax: $userReacted[messageID;userID;emoji]
description: Checks if un user spécifique a réagi with a emoji donné sur un message. Returns true or false.
---

# $userReacted

The function `$userReacted[]` allows **vérifier if a user a réagi** with a emoji spécifique sur un message donné.

## Syntax

```
$userReacted[messageID;userID;emoji]
```

## Parameters

| Parameter | Description |
|---|---|
| `messageID` | The ID of the message sur lequel vérifier la réaction. |
| `userID` | The ID of the user à vérifier. |
| `emoji` | L'emoji à vérifier (unicode or `nom:ID` for the emojis customs). |

## Return Value

- **Type** : String (boolean)
- `true` si the user a réagi with the emoji spécifié.
- `false` si the user n'a pas réagi or a réagi with a autre emoji.

## Behavior

- Checks la list des réactions of the message for the emoji donné.
- Functionne with thes emojis unicode standards (✅, ❌, 👍, etc.).
- Functionne with thes emojis customs of the server.
- The message must be accessible par the bot.

## Examples

### Système de vérification par réaction

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
  $sendMessage[✅ Vous participez au giveaway !]
$else
  $sendMessage[❌ Vous devez réagir avec 🎉 pour participer.]
$endif
```

## Notes

- Pour les emojis customs, utilisez le format `nom:ID`.
- The function est sensible à la casse for the noms d'emojis customs.
- The bot doit avoir accès au message (même channel) pour vérifier les réactions.
