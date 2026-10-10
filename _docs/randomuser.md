---
layout: doc
title: $randomUser[]
translation_key: docs
category: "Math & Text"
function_name: randomUser
syntax: $randomUser
description: Returns the username of a random member of the server.
---

# $randomUser[]

The `$randomUser[]` function returns the **username** of a random member of the server where the command runs. It does not return the ID: use `$randomUserID` for that.

## Syntax

```
$randomUser
```

> **Note:** This function takes no arguments (it is an error to pass any).

## Return Value

The username of a random member (the `username` field of the member snapshot, not the nickname), or an empty string if the member list is empty.

## Behavior

- The candidates are all the members of the server returned by Discord, bots included.
- Each member has the same chance of being picked.

## Examples

### Show a random username

```bdfd
Random user: $randomUser
```

### Announce a winner

```bdfd
Congratulations $randomUser, you won!
```

## Notes

- Do not write `<@$randomUser>`: the value is a name, not an ID. Use `$randomMention` for a mention or `$randomUserID` for the ID.
