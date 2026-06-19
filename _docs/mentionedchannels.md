---
layout: doc
title: $mentionedChannels
translation_key: docs
category: "Entity Info"
function_name: mentionedChannels
syntax: $mentionedChannels
description: Retourne la liste des IDs des salons mentionnés dans le message (via #salon), séparés par des virgules.
parameters: []
returns:
  - type: list (string)
    description: Liste des IDs des salons mentionnés, séparés par des virgules.
related:
  - $mentionedRoles
  - $mentions
  - $mentioned
  - $channelID
examples:
  - description: Obtenir les salons mentionnés
    code: $mentionedChannels
  - description: Afficher les salons mentionnés
    code: |
      $if[$mentionedChannels!=]
        $sendMessage[Salons mentionnés : $mentionedChannels]
      $else
        $sendMessage[Aucun salon mentionné.]
      $endif
---

# $mentionedChannels

La variable `$mentionedChannels` retourne la **liste des IDs des salons mentionnés** dans le message, via la syntaxe `#salon`.

## Syntaxe

```
$mentionedChannels
```

## Valeur de retour

- **Type** : Liste de snowflakes séparés par des virgules
- Exemple : `123456789,987654321`
- Chaîne vide si aucun salon n'est mentionné

## Comportement

- `$mentionedChannels` ne prend **aucun argument**.
- Détecte les mentions de salon au format `#nom-du-salon`.
- Retourne les IDs des salons mentionnés.

## Exemples

### Vérifier les salons mentionnés

```bdfd
$if[$mentionedChannels!=]
  $let[channels;$splitText[$mentionedChannels;,]]
  $let[count;$arrayCount[$channels]]
  $sendMessage[$count salon(s) mentionné(s).]
$else
  $sendMessage[Aucun salon mentionné dans ce message.]
$endif
```

### Agir sur le premier salon mentionné

```bdfd
$if[$mentionedChannels!=]
  $let[firstChannel;$splitText[$mentionedChannels;,;1]]
  $sendMessage[Premier salon mentionné : <#$firstChannel>]
$endif
```

### Déplacer un message

```bdfd
$if[$mentionedChannels!=]
  $let[target;$splitText[$mentionedChannels;,;1]]
  $sendMessage[Message vers <#$target>]
$endif
```

## Notes

- Les mentions de salon utilisent le format `#nom-salon` dans Discord.
- Les IDs retournés sont des snowflakes numériques.
- Pour obtenir le nom d'un salon à partir de son ID, utilisez `$channelName[ID]`.
