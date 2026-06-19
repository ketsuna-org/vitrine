---
layout: doc
title: $channelPosition
translation_key: docs
category: "Entity Info"
function_name: channelPosition
syntax: $channelPosition[(channelID)]
description: Returns the position of a channel in the list of channels Discord.
---

# $channelPosition

The `$channelPosition` function returns the **position** of a channel in the list of channels of the server. The position `0` correspond au channel the most haut, and les numbers augmentent en descendant.

## Syntax

```
$channelPosition[(channelID)]
```

## Parameters

| Parameter | Description |
|---|---|
| `channelID` | Optional. The ID of the channel cible. If omitted, the channel courant is used. |

## Return value

| Type | Description |
|---|---|
| `integer` | The position of the channel in the list (0 = tout at the top). |

## Examples

### Afficher the position

```bdfd
$sendMessage[Ce channel est en position $channelPosition]
```

### Comparer les positions

```bdfd
$if[$channelPosition==0]
  $sendMessage[Ce channel est tout at the top of the server !]
$else
  $sendMessage[Ce channel est en position #$channelPosition]
$endif
```

### Channel the most haut d'une catégorie

```bdfd
$sendMessage[Position in the catégorie : $channelPosition]
```

## Notes

- The position est relative à the order d'affichage dans Discord.
- Les catégories ont leur propre système de positionnement.
- The position peut changer if a administrator réorganise les channels.
- Les channels sont sorteds par position within leur catégorie parente.
