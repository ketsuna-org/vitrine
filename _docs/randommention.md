---
layout: doc
title: $randomMention[]
translation_key: docs
category: "Math & Text"
function_name: randomMention
syntax: $randomMention
description: Returns the mention (format <@id>) of a random user present on the server.
---

# $randomMention[]

The `$randomMention[]` function returns the formatted mention of a random user present on the server. The mention is in `<@id>` format, which creates a ping for the targeted user.

## Syntax

```
$randomMention
```

> **Note:** This function takes no parameters.

## Return Value

The formatted mention (`<@id>`) of a random user on the server.

## Difference with similar functions

| Function | Returns |
|----------|---------|
| `$randomMention` | `<@id>` — clickable mention with ping |
| `$randomUser` | `id` — raw ID |
| `$randomUserID` | `id` — raw ID |

## Examples

### Direct mention

```bdfd
$randomMention, you have been chosen randomly!
```

### Winner announcement

```bdfd
$title[🎊 Prize draw]
$description[Congratulations $randomMention! You win the giveaway!]
$color[#FFD700]
$footer[Good luck to everyone for the next draw]
```

### Random tag

```bdfd
Tag, it's your turn $randomMention!
```

## Notes

- The user receives a notification (ping) when mentioned.
- Use `$randomUserID[]` if you do not want to ping the user.
