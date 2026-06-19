---
layout: doc
title: $getReactions
translation_key: docs
category: "Moderation"
function_name: getReactions
syntax: $getReactions[channelID;messageID;emoji]
description: Returns the number de réactions for a emoji spécifique sur un message donné. Allows compter les votes or interactions.
---

# $getReactions

The function `$getReactions[]` allows **compter the namebre de réactions** for a emoji spécifique sur un message donné.

## Syntax

```
$getReactions[channelID;messageID;emoji]
```

## Parameters

| Parameter | Description |
|---|---|
| `channelID` | The ID of the canal contenant the message. |
| `messageID` | The ID of the message cible. |
| `emoji` | L'emoji à compter. Unicode (`👍`) or custom (`<:nom:ID>`). |

## Return Value

- **Type** : Integer
- The namebre de fois que l'emoji was utilisé en réaction sur this message.
- Returns `0` si l'emoji is not présent.

## Behavior

- Counts UNIQUEMENT the namebre de réactions, pas les users spécifiques.
- Une même personne peut compter pour 1 even if elle a réagi several fois (a single réaction par emoji par user).
- The bot doit avoir accès au canal pour lire les réactions.

## Examples

### Result de sondage

```bdfd
$let[yes;$getReactions[$channelID;$messageID;👍]]
$let[no;$getReactions[$channelID;$messageID;👎]]

$title[Results du sondage]
$description[
**Pour :** $yes vote(s)
**Contre :** $no vote(s)
**Total :** $sum[$yes;$no] votes
]
$color[#5865F2]
$sendMessage[]
```

### Vérification de seuil

```bdfd
$let[votes;$getReactions[$channelID;$messageID;✅]]
$if[$votes>=5]
  $sendMessage[Seuil de 5 votes atteint ! Action executed.]
$else
  $sendMessage[Encore $sub[5;$votes] vote(s) nécessaire(s).]
$endif
```

### Giveaway

```bdfd
$let[participants;$getReactions[$channelID;$giveawayMsg;🎉]]
$if[$participants>0]
  $sendMessage[**$participants** participant(s) au giveaway !]
$else
  $sendMessage[Aucun participant for the moment.]
$endif
```

## Notes

- Le compte kicks the bot lui-even if celui-ci a réagi.
- Utile for the systèmes de vote, sondages and giveaways.
- Pour obtenir la list des users ayant réagi, des méthodes alternatives sont nécessaires.
