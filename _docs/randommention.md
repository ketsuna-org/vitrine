---
layout: doc
title: $randomMention[]
translation_key: docs
category: "Math & Text"
function_name: randomMention
syntax: $randomMention
description: Returns the mention (format <@id>) of a random member of the server.
---

# $randomMention[]

The `$randomMention[]` function returns the mention of a random member of the server, in `<@id>` format.

## Syntax

```
$randomMention
```

> **Note:** This function takes no arguments (it is an error to pass any).

## Return Value

The mention `<@id>` of a random member of the server, or an empty string if the member list is empty.

## Behavior

- The candidates are all the members of the server returned by Discord (bots included).
- The mention uses the member ID.

## Examples

### Direct mention

```bdfd
$randomMention, you have been chosen randomly!
```

## Notes

- Use `$randomUserID` for the bare ID of a random member.
