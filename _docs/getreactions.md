---
layout: doc
title: $getReactions
translation_key: docs
category: "Moderation"
function_name: getReactions
syntax: $getReactions[channelID;messageID;emoji]
description: Retourne le nombre de réactions pour un émoji spécifique sur un message donné. Permet de compter les votes ou interactions.
parameters:
  - name: channelID
    description: L'ID du canal contenant le message.
  - name: messageID
    description: L'ID du message cible.
  - name: emoji
    description: L'émoji dont on souhaite compter les réactions (Unicode ou personnalisé).
returns:
  - type: integer
    description: Le nombre de réactions pour l'émoji spécifié, ou 0 si aucune.
related:
  - $addReactions
  - $addMessageReactions
  - $clearReactions
examples:
  - description: Compter les 👍
    code: $getReactions[$channelID;$messageID;👍]
  - description: Compter un émoji personnalisé
    code: $getReactions[$channelID;$messageID;<:upvote:123456789>]
---

# $getReactions

La fonction `$getReactions[]` permet de **compter le nombre de réactions** pour un émoji spécifique sur un message donné.

## Syntaxe

```
$getReactions[channelID;messageID;emoji]
```

## Paramètres

| Paramètre | Description |
|---|---|
| `channelID` | L'ID du canal contenant le message. |
| `messageID` | L'ID du message cible. |
| `emoji` | L'émoji à compter. Unicode (`👍`) ou personnalisé (`<:nom:ID>`). |

## Valeur de retour

- **Type** : Nombre entier
- Le nombre de fois que l'émoji a été utilisé en réaction sur ce message.
- Retourne `0` si l'émoji n'est pas présent.

## Comportement

- Compte UNIQUEMENT le nombre de réactions, pas les utilisateurs spécifiques.
- Une même personne peut compter pour 1 même si elle a réagi plusieurs fois (une seule réaction par émoji par utilisateur).
- Le bot doit avoir accès au canal pour lire les réactions.

## Exemples

### Résultat de sondage

```bdfd
$let[yes;$getReactions[$channelID;$messageID;👍]]
$let[no;$getReactions[$channelID;$messageID;👎]]

$title[Résultats du sondage]
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
  $sendMessage[Seuil de 5 votes atteint ! Action exécutée.]
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
  $sendMessage[Aucun participant pour le moment.]
$endif
```

## Notes

- Le compte exclut le bot lui-même si celui-ci a réagi.
- Utile pour les systèmes de vote, sondages et giveaways.
- Pour obtenir la liste des utilisateurs ayant réagi, des méthodes alternatives sont nécessaires.
