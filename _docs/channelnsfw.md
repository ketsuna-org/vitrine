---
layout: doc
title: $channelNSFW
translation_key: docs
category: "Entity Info"
function_name: channelNSFW
syntax: $channelNSFW[(channelID)]
description: Returns "true" if the channel est marqué NSFW, "false" otherwise.
---

# $channelNSFW

The `$channelNSFW` function vérifie if a channel Discord est marqué comme **NSFW** (Not Safe For Work). Elle retourne `"true"` or `"false"` sous forme de string.

## Syntax

```
$channelNSFW[(channelID)]
```

## Parameters

| Parameter | Description |
|---|---|
| `channelID` | Optional. The ID of the channel cible. If omitted, the channel courant is used. |

## Return value

| Type | Description |
|---|---|
| `string` | `"true"` if the channel est NSFW, `"false"` otherwise. |

## Examples

### Vérification simple

```bdfd
$if[$channelNSFW==true]
  $sendMessage[⚠️ Ce channel est marqué NSFW. Contenu sensible possible.]
$else
  $sendMessage[Ce channel est tout public.]
$endif
```

### Bloquer une command en channel NSFW

```bdfd
$if[$channelNSFW==true]
  $sendMessage[Cette command cannot être utilisée en channel NSFW.]
  $stop
$endif
```

### Vérifier a channel spécifique

```bdfd
$if[$channelNSFW[123456789012345678]==true]
  $sendMessage[The channel cible est NSFW.]
$endif
```

## Notes

- La value retournée est une **string** `"true"` or `"false"`, pas un boolean.
- Les channels vocaux peuvent also être marqués NSFW.
- Utile pour restreindre l'accès à certaines commands selon the type de channel.
