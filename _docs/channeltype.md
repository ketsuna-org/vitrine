---
layout: doc
title: $channelType
translation_key: docs
category: "Entity Info"
function_name: channelType
syntax: $channelType[(channelID)]
description: Returns the type of a channel Discord (text, voice, category, dm, etc.).
---

# $channelType

The `$channelType` function returns the **type** of a channel Discord. The types possibles incluent `text`, `voice`, `category`, `news`, `stage`, `forum` and `dm`.

## Syntax

```
$channelType[(channelID)]
```

## Parameters

| Parameter | Description |
|---|---|
| `channelID` | Optional. The ID of the channel cible. If omitted, the channel courant is used. |

## Return value

| Type | Description |
|---|---|
| `string` | The type of the channel. Values possibles : `text`, `voice`, `category`, `news`, `stage`, `forum`, `dm`, `group_dm`. |

## Examples

### Afficher the type of the channel

```bdfd
$sendMessage[Ce channel est de type : **$channelType**]
```

### Vérifier si channel vocal

```bdfd
$if[$channelType==voice]
  $sendMessage[Vous êtes in a channel vocal.]
$else
  $sendMessage[Vous n'êtes pas in a channel vocal.]
$endif
```

### Vérifier si catégorie

```bdfd
$if[$channelType==category]
  $sendMessage[Cette command cannot être utilisée dans une catégorie.]
  $stop
$endif
```

## Notes

- Les types sont retournés en minuscules.
- Utile pour conditionner le behavior of a command selon the type de channel.
- Les channels de type `dm` do not have de catégorie parente.
