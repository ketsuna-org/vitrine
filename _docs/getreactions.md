---
layout: doc
title: $getReactions
translation_key: docs
category: "Moderation"
function_name: getReactions
syntax: $getReactions[channelID;messageID;emoji]
description: Returns the number of réactions for a emoji specific on a message donné. Allows count thes votes or interactions.
---

# $getReactions

The function `$getReactions[]` allows **count the namebre of réactions** for a emoji specific on a message donné.

## Syntax

```
$getReactions[channelID;messageID;emoji]
```

## Parameters

| Parameter | Description |
|---|---|
| `channelID` | The ID of the canal contenant the message. |
| `messageID` | The ID of the message cible. |
| `emoji` | L'emoji to compter. Unicode (`👍`) or custom (`<:nom:ID>`). |

## Return Value

- **Type** : Integer
- The namebre of fois que l'emoji was utilisé en réaction on this message.
- Returns `0` si l'emoji is not présent.

## Behavior

- Counts UNIQUEMENT the namebre of réactions, pas les users specifics.
- Une même personne peut count pour 1 even if elle a réagi several fois (a single réaction par emoji par user).
- The bot doit avoir accès to the canal pour lire les réactions.

## Examples

### Result of sondage

```bdfd
$let[yes;$getReactions[$channelID;$messageID;👍]]
$let[no;$getReactions[$channelID;$messageID;👎]]

$title[Results of the sondage]
$description[
**Pour :** $yes vote(s)
**Contre :** $no vote(s)
**Total :** $sum[$yes;$no] votes
]
$color[#5865F2]
$sendMessage[]
```

### Vérification of seuil

```bdfd
$let[votes;$getReactions[$channelID;$messageID;✅]]
$if[$votes>=5]
  $sendMessage[Seuil of 5 votes atteint ! Action executed.]
$else
  $sendMessage[Encore $sub[5;$votes] vote(s) nécessaire(s).]
$endif
```

### Giveaway

```bdfd
$let[participants;$getReactions[$channelID;$giveawayMsg;🎉]]
$if[$participants>0]
  $sendMessage[**$participants** participant(s) to the giveaway !]
$else
  $sendMessage[Aucun participant for the moment.]
$endif
```

## Notes

- Le compte kicks the bot lui-even if celui-ci a réagi.
- Utile for the systèmes of vote, sondages and giveaways.
- Pour obtenir la list users ayant réagi, méthodes alternatives sont nécessaires.
