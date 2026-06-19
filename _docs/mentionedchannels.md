---
layout: doc
title: $mentionedChannels
translation_key: docs
category: "Entity Info"
function_name: mentionedChannels
syntax: $mentionedChannels
description: Returns the list des IDs des channels mentionnés in the message (via #channel), separateds par des virgules.
---

# $mentionedChannels

The variable `$mentionedChannels` retourne la **list des IDs des channels mentionnés** in the message, via la syntaxe `#channel`.

## Syntax

```
$mentionedChannels
```

## Return Value

- **Type** : List de snowflakes separateds par des virgules
- Example: `123456789,987654321`
- String vide si no channel n'est mentionné

## Behavior

- `$mentionedChannels` ne prend **no argument**.
- Détecte les mentions de channel au format `#nom-du-channel`.
- Returns thes IDs des channels mentionnés.

## Examples

### Vérifier les channels mentionnés

```bdfd
$if[$mentionedChannels!=]
  $let[channels;$splitText[$mentionedChannels;,]]
  $let[count;$arrayCount[$channels]]
  $sendMessage[$count channel(s) mentionné(s).]
$else
  $sendMessage[Aucun channel mentionné dans this message.]
$endif
```

### Agir sur le first channel mentionné

```bdfd
$if[$mentionedChannels!=]
  $let[firstChannel;$splitText[$mentionedChannels;,;1]]
  $sendMessage[Premier channel mentionné : <#$firstChannel>]
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

- Les mentions de channel utilisent le format `#nom-channel` dans Discord.
- Les IDs retournés sont des snowflakes numériques.
- Pour obtenir the name of a channel from son ID, utilisez `$channelName[ID]`.
