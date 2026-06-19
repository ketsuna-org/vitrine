---
layout: doc
title: $randomUserID[]
translation_key: docs
category: "Math & Text"
function_name: randomUserID
syntax: $randomUserID
description: Returns the ID of a random user present on the server.
---

# $randomUserID[]

The `$randomUserID[]` function returns the Discord ID (snowflake) of a random user present on the server.

## Syntax

```
$randomUserID
```

> **Note:** This function takes no parameters.

## Return Value

The Discord ID (snowflake) of a random user on the server, as a string.

## Difference with `$randomUser[]`

`$randomUser[]` and `$randomUserID[]` return the same value: the user ID. The distinction is purely semantic. Use `$randomUserID[]` when you explicitly want to manipulate the ID.

## Examples

### Get a random ID

```bdfd
Random user ID: $randomUserID
```

### Store in a variable

```bdfd
$let[winner;$randomUserID]
The winner is: <@$get[winner]>
```

## Notes

- The user is chosen from the server members.
- To directly mention the user, use `$randomMention[]`.
