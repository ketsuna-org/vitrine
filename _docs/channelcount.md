---
layout: doc
title: $channelCount
translation_key: docs
category: "Entity Info"
function_name: channelCount
syntax: $channelCount[(categoryID)]
description: Returns the namebre total de channels on the server, or the namebre de channels dans une catégorie spécifique.
---

# $channelCount

The `$channelCount` function returns the **number de channels** on the server Discord. En fournissant an ID de catégorie, elle peut also compter les channels d'une catégorie spécifique.

## Syntax

```
$channelCount[(categoryID)]
```

## Parameters

| Parameter | Description |
|---|---|
| `categoryID` | Optional. The ID d'une catégorie pour compter only their channels. If omitted, compte all channels of the server. |

## Return value

| Type | Description |
|---|---|
| `integer` | The namebre de channels correspondant au filtre. |

## Examples

### Number total de channels

```bdfd
$sendMessage[Ce server compte $channelCount channels.]
```

### Channels dans une catégorie

```bdfd
$sendMessage[La catégorie contains $channelCount[123456789012345678] channels.]
```

### Compareason

```bdfd
$if[$channelCount>50]
  $sendMessage[Ce server est immense ! ($channelCount channels)]
$else
  $sendMessage[Ce server a $channelCount channels.]
$endif
```

## Notes

- Counts all types de channels (textuels, vocaux, etc.), except les catégories elles-mêmes.
- Pour compter les catégories, use `$categoryCount`.
- Les channels privates (non visibles par the bot) are not comptés.
