---
layout: doc
title: $categoryCount
translation_key: docs
category: "Entity Info"
function_name: categoryCount
syntax: $categoryCount
description: Returns the namebre of catégories on the server Discord.
---

# $categoryCount

The `$categoryCount` function returns the **number total of catégories** présentes on the server Discord.

## Syntax

```
$categoryCount
```

## Parameters

No parameters.

## Return value

| Type | Description |
|---|---|
| `integer` | The namebre of catégories on the server. |

## Examples

### Number of catégories

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

- Ne compte que les channels of type `category`.
- Utile pour statistiques or a affichage of structure of the server.
