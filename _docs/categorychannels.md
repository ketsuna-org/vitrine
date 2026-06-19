---
layout: doc
title: $categoryChannels
translation_key: docs
category: "Entity Info"
function_name: categoryChannels
syntax: $categoryChannels[categoryID;(separator)]
description: Returns the list noms of channels appartenant to une catégorie specific.
---

# $categoryChannels

The `$categoryChannels` function returns the **list of channels** appartenant to une catégorie specific, identifiée par its ID.

## Syntax

```
$categoryChannels[categoryID;(separator)]
```

## Parameters

| Parameter | Description |
|---|---|
| `categoryID` | The ID of the catégorie. Required. |
| `separator` | Optional. Separator between thes noms of channels. Par default: `, `. |

## Return value

| Type | Description |
|---|---|
| `string` | Les noms of channels of la catégorie, separateds par le délimitur. |

## Examples

### Channels of la catégorie courante

```bdfd
$sendMessage[**Channels in cette catégorie :** $categoryChannels[$categoryID]]
```

### List with retours to la ligne

```bdfd
$sendMessage[
**Channels of la catégorie :**
$categoryChannels[$categoryID;
]]
```

### Channels of une catégorie specific

```bdfd
$sendMessage[Channels admin : $categoryChannels[123456789012345678]]
```

### Vérifier if a catégorie est vide

```bdfd
$if[$categoryChannels[$categoryID]==]
  $sendMessage[Cette catégorie ne contains auca channel.]
$endif
```

## Notes

- Ne list que les channels visibles par the bot.
- La catégorie elle-même is not includede in the list.
- Pour listr all channels of the server, use `$channelNames`.
