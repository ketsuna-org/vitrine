---
layout: doc
title: $randomUserID[]
translation_key: docs
category: "Math & Text"
function_name: randomUserID
syntax: $randomUserID
description: Returns the ID of a random member of the server.
---

# $randomUserID[]

The `$randomUserID[]` function returns the Discord ID (snowflake) of a random member of the server.

## Syntax

```
$randomUserID
```

> **Note:** This function takes no arguments (it is an error to pass any).

## Return Value

The Discord ID of a random member, as a string, or an empty string if the member list is empty.

## Difference with `$randomUser[]`

`$randomUserID[]` returns the member ID, whereas `$randomUser[]` returns the member username.

## Examples

### Get a random ID

```bdfd
Random user ID: $randomUserID
```

### Store in a variable

```bdfd
$var[winner;$randomUserID]
The winner is: <@$var[winner]>
```

## Notes

- The candidates are all the members of the server returned by Discord, bots included.
- To directly mention a member, use `$randomMention`.
