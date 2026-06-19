---
layout: doc
title: $userReacted
translation_key: docs
category: "Entity Info"
function_name: userReacted
syntax: $userReacted[messageID;userID;emoji]
description: Vérifie si un utilisateur spécifique a réagi avec un emoji donné sur un message. Retourne true ou false.
---

# $userReacted

La fonction `$userReacted[]` permet de **vérifier si un utilisateur a réagi** avec un emoji spécifique sur un message donné.

## Syntaxe

```
$userReacted[messageID;userID;emoji]
```

## Paramètres

| Paramètre | Description |
|---|---|
| `messageID` | L'ID du message sur lequel vérifier la réaction. |
| `userID` | L'ID de l'utilisateur à vérifier. |
| `emoji` | L'emoji à vérifier (unicode ou `nom:ID` pour les emojis personnalisés). |

## Valeur de retour

- **Type** : String (booléen)
- `true` si l'utilisateur a réagi avec l'emoji spécifié.
- `false` si l'utilisateur n'a pas réagi ou a réagi avec un autre emoji.

## Comportement

- Vérifie la liste des réactions du message pour l'emoji donné.
- Fonctionne avec les emojis unicode standards (✅, ❌, 👍, etc.).
- Fonctionne avec les emojis personnalisés du serveur.
- Le message doit être accessible par le bot.

## Exemples

### Système de vérification par réaction

```bdfd
$nominalTrigger
$let[msgID;$sendMessage[✅ Réagissez pour accepter les règles.]]
$addCmdReactions[✅]

$onReactionAdd[✅]
$if[$userReacted[$msgID;$authorID;✅]==true]
  $giveRole[$authorID;$roleID[Membre]]
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

### Condition pour un giveaway

```bdfd
$if[$userReacted[$giveawayMsg;$authorID;🎉]==true]
  $sendMessage[✅ Vous participez au giveaway !]
$else
  $sendMessage[❌ Vous devez réagir avec 🎉 pour participer.]
$endif
```

## Notes

- Pour les emojis personnalisés, utilisez le format `nom:ID`.
- La fonction est sensible à la casse pour les noms d'emojis personnalisés.
- Le bot doit avoir accès au message (même salon) pour vérifier les réactions.
