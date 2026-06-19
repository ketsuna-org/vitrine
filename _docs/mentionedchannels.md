---
layout: doc
title: $mentionedChannels
translation_key: docs
category: "Entity Info"
function_name: mentionedChannels
syntax: $mentionedChannels
description: Returns the list IDs channels mentionnés in the message (via #channel), separateds par virgules.
---

# $mentionedChannels

The variable `$mentionedChannels` retourne la **list IDs channels mentionnés** in the message, via la syntaxe `#channel`.

## Syntax

```
$mentionedChannels
```

## Return Value

- **Type** : List of snowflakes separateds par virgules
- Example: `123456789,987654321`
- String vide si no channel n'est mentionné

## Behavior

- `$mentionedChannels` ne prend **no argument**.
- Détecte les mentions of channel to the format `#nom-du-channel`.
- Returns thes IDs channels mentionnés.

## Examples

### Vérifier les channels mentionnés

```bdfd
$if[$mentionedChannels!=]
  $let[channels;$splitText[$mentionedChannels;,]]
  $let[count;$arrayCount[$channels]]
  $sendMessage[$count channel(s) mentionné(s).]
$else
  $sendMessage[Aucun channel mentionné in this message.]
$endif
```

### Agir on the first channel mentionné

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

- Les mentions of channel utilisent le format `#nom-channel` in Discord.
- Les IDs retournés sont snowflakes numériques.
- Pour obtenir the name of a channel from son ID, utilisez `$channelName[ID]`.
