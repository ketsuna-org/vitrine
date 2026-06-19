---
layout: doc
title: $channelCount
translation_key: docs
category: "Entity Info"
function_name: channelCount
syntax: $channelCount[(categoryID)]
description: Returns the namebre total of channels on the server, or the namebre of channels in a catégorie specific.
---

# $channelCount

The `$channelCount` function returns the **number of channels** on the server Discord. En fournissant an ID of catégorie, elle peut also count thes channels of une catégorie specific.

## Syntax

```
$channelCount[(categoryID)]
```

## Parameters

| Parameter | Description |
|---|---|
| `categoryID` | Optional. The ID of une catégorie pour count only their channels. If omitted, compte all channels of the server. |

## Return value

| Type | Description |
|---|---|
| `integer` | The namebre of channels correspondant to the filtre. |

## Examples

### Number total of channels

```bdfd
$sendMessage[Ce server compte $channelCount channels.]
```

### Channels in a catégorie

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

- Counts all types of channels (textuels, vocaux, etc.), except les catégories elles-mêmes.
- Pour count thes catégories, use `$categoryCount`.
- Les channels privates (non visibles par the bot) are not comptés.
