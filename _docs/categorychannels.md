---
layout: doc
title: $categoryChannels
translation_key: docs
category: "Entity Info"
function_name: categoryChannels
syntax: $categoryChannels[categoryID;(separator)]
description: Returns the list des noms of channels appartenant à une catégorie spécifique.
---

# $categoryChannels

The `$categoryChannels` function returns the **list of channels** appartenant à une catégorie spécifique, identifiée par its ID.

## Syntax

```
$categoryChannels[categoryID;(separator)]
```

## Parameters

| Parameter | Description |
|---|---|
| `categoryID` | The ID of the catégorie. Required. |
| `separator` | Optional. Separator between thes noms de channels. Par default: `, `. |

## Return value

| Type | Description |
|---|---|
| `string` | Les noms of channels de la catégorie, separateds par le délimitur. |

## Examples

### Channels de la catégorie courante

```bdfd
$sendMessage[**Channels dans cette catégorie :** $categoryChannels[$categoryID]]
```

### List avec retours à la ligne

```bdfd
$sendMessage[
**Channels de la catégorie :**
$categoryChannels[$categoryID;
]]
```

### Channels d'une catégorie spécifique

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
