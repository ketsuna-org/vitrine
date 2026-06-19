---
layout: doc
title: $emojiName
translation_key: docs
category: "Moderation"
function_name: emojiName
syntax: $emojiName[emojiID]
description: Récupère le nom d'un emoji personnalisé à partir de son ID. Retourne le nom texte de l'emoji.
parameters:
  - name: emojiID
    description: L'ID Discord de l'emoji personnalisé.
returns:
  - type: string
    description: Le nom de l'emoji, ou chaîne vide si l'emoji n'est pas trouvé.
related:
  - $addEmoji
  - $removeEmoji
  - $emojiExists
  - $customEmoji
  - $emojiCount
examples:
  - description: Récupérer le nom d'un emoji
    code: $emojiName[123456789]
  - description: Récupérer depuis un message
    code: $emojiName[$message[1]]
---

# $emojiName

La fonction `$emojiName[]` permet de **récupérer le nom d'un emoji personnalisé** à partir de son ID Discord.

## Syntaxe

```
$emojiName[emojiID]
```

## Paramètres

| Paramètre | Description |
|---|---|
| `emojiID` | L'ID Discord de l'emoji (les chiffres dans `<:nom:ID>`). |

## Valeur de retour

- **Type** : String
- Le nom de l'emoji personnalisé.
- Chaîne vide si l'emoji n'existe pas ou n'est pas accessible.

## Comportement

- Extrait le nom depuis l'ID de l'emoji.
- Fonctionne pour les emojis de n'importe quel serveur accessible par le bot.
- L'ID peut être extrait d'un message contenant l'emoji.

## Exemples

### Identification d'emoji

```bdfd
$let[emojiID;$message[1]]
$let[name;$emojiName[$emojiID]]
$if[$name!=]
  Emoji détecté : **$name** (ID: $emojiID)
$else
  Emoji non trouvé.
$endif
```

### Log des emojis utilisés

```bdfd
$let[id;$message[1]]
$if[$id!=]
  $sendMessage[$channelID[logs];📊 Emoji **$emojiName[$id]** utilisé par $userName dans $channelName.]
$endif
```

### Liste d'emojis

```bdfd
$title[📋 Emojis du serveur]
$description[
$textSplit[$serverEmojis[,];, ]
  $index. $splitText[$index] — $emojiName[$splitText[$index]]
$endTextSplit
]
$sendMessage[]
```

## Notes

- Ne fonctionne qu'avec les emojis personnalisés, pas les emojis Unicode.
- L'emoji doit être sur un serveur auquel le bot a accès.
- Pratique pour les logs et les statistiques d'utilisation d'emojis.
