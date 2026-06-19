---
layout: doc
title: $randomUser[]
translation_key: docs
category: "Math & Text"
function_name: randomUser
syntax: $randomUser
description: Returns the ID or mention of a random user present on the server.
---

# $randomUser[]

The `$randomUser[]` function returns the ID of a random user present on the server where the command is executed.

## Syntax

```
$randomUser
```

> **Note:** This function takes no parameters.

## Return Value

The Discord ID (snowflake) of a random user on the server, as a string.

## Examples

### Mention a random user

```bdfd
Random user: <@$randomUser>
```

### Announce a winner

```bdfd
$title[🎉 Prize draw]
$description[Congratulations <@$randomUser>! You won!]
$color[#FFD700]
```

### Get the ID only

```bdfd
Random ID: $randomUser
```

## Notes

- The selected user is a member of the server.
- The bot must have access to the member list for this function to work correctly.
- To get only the ID without formatting, use `$randomUserID[]`.
- For a direct mention (with the `<@id>` format), use `$randomMention[]`.
