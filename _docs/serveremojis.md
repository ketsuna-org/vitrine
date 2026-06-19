---
layout: doc
title: $serverEmojis[]
translation_key: docs
category: "Entity Info"
function_name: serverEmojis
syntax: $serverEmojis
description: Retourne la liste des émojis personnalisés disponibles sur le serveur Discord.
parameters: []
returns:
  type: string (liste)
  description: "Une chaîne contenant tous les émojis personnalisés du serveur, formatés pour Discord (ex: \"<:nom:id>\")."
related:
  - $emojiCount
  - $serverInfo
  - $emojiID
examples:
  - description: Afficher tous les émojis
    code: |
      $sendMessage[$serverEmojis]
  - description: Compter et afficher les émojis
    code: |
      $sendMessage[Nombre d'émojis: "$emojiCount. Liste : $serverEmojis]"
---

# $serverEmojis[] — Liste des Émojis du Serveur

`$serverEmojis[]` retourne la liste complète des émojis personnalisés du serveur, formatés pour être affichés dans Discord.

## Syntaxe

```
$serverEmojis
```

## Paramètres

Aucun paramètre.

## Valeur de retour

- **Type** : `string`
- Une chaîne contenant tous les émojis personnalisés du serveur, chacun au format `<:nom:id>` (ou `<a:nom:id>` pour les émojis animés).

## Utilisation

### Afficher tous les émojis

```bdfd
$sendMessage[🎨 Émojis du serveur : $serverEmojis]
```

### Embed catalogue d'émojis

```bdfd
$title[Émojis de $serverName]
$description[$serverEmojis]
$footer[Total : $emojiCount émojis]
$color[#F1C40F]
$sendEmbedMessage
```

### Condition sur le nombre d'émojis

```bdfd
$if[$emojiCount>=50]
$sendMessage[🎉 Ce serveur a une riche collection d'émojis ! ($emojiCount)]
$else
$sendMessage[Le serveur a $emojiCount émojis personnalisés.]
$endif
```

### Info serveur avec émojis

```bdfd
$title[$serverName]
$addField[👥 Membres;$membersCount;yes]
$addField[🎨 Émojis;$emojiCount;yes]
$addField[🚀 Boosts;$serverBoostCount;yes]
$thumbnail[$serverIcon]
$color[#5865F2]
$sendEmbedMessage
```

## Notes

- La liste peut être très longue si le serveur a beaucoup d'émojis — attention à la limite de 2000 caractères des messages Discord.
- Les émojis animés sont préfixés par `<a:` au lieu de `<:`.
- Pour obtenir uniquement le nombre d'émojis sans la liste, utilisez `$emojiCount[]`.
- La limite d'émojis par serveur dépend du niveau de boost (50 par défaut, jusqu'à 250 au niveau 3).
