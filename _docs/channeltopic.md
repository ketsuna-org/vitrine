---
layout: doc
title: $channelTopic
translation_key: docs
category: "Entity Info"
function_name: channelTopic
syntax: $channelTopic[(channelID)]
description: Returns the sujet (topic) of a channel textuel Discord.
---

# $channelTopic

The `$channelTopic` function returns the **sujet** (topic) of a channel textuel Discord. The sujet est le text displayed at the top of the channel, generally utilisé pour décrire son utilité.

## Syntax

```
$channelTopic[(channelID)]
```

## Parameters

| Parameter | Description |
|---|---|
| `channelID` | Optional. The ID of the channel cible. If omitted, the channel courant is used. |

## Return value

| Type | Description |
|---|---|
| `string` | Le sujet of the channel. Returns a string vide si no sujet n'est set or if the channel is not textuel. |

## Examples

### Afficher le sujet

```bdfd
$sendMessage[**Sujet of the channel :** $channelTopic]
```

### Vérifier if a sujet existe

```bdfd
$if[$channelTopic!=]
  $sendMessage[Sujet : $channelTopic]
$else
  $sendMessage[Ce channel does not have de sujet.]
$endif
```

### Sujet in an embed

```bdfd
$title[#$channelName]
$description[Sujet : $channelTopic]
$color[#5865F2]
$sendMessage[]
```

## Notes

- Ne functionne que for channels de type `text` and `news`.
- For channels vocaux, les catégories, etc., la function retourne a string vide.
- Longueur maximale d'un sujet : 1024 becauseactères.
