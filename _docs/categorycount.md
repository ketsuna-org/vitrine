---
layout: doc
title: $categoryCount
translation_key: docs
category: "Entity Info"
function_name: categoryCount
syntax: $categoryCount
description: Returns the namebre de catégories on the server Discord.
---

# $categoryCount

The `$categoryCount` function returns the **number total de catégories** présentes on the server Discord.

## Syntax

```
$categoryCount
```

## Parameters

No parameters.

## Return value

| Type | Description |
|---|---|
| `integer` | The namebre de catégories on the server. |

## Examples

### Number de catégories

```bdfd
$sendMessage[Ce server a $categoryCount catégories.]
```

### Compareason channels / catégories

```bdfd
$sendMessage[
**Statistiques of the server :**
Catégories : $categoryCount
Channels : $channelCount
]
```

### Server without catégories

```bdfd
$if[$categoryCount==0]
  $sendMessage[Ce server n'a noe catégorie.]
$endif
```

## Notes

- Ne compte que les channels de type `category`.
- Utile pour des statistiques or a affichage de structure of the server.
