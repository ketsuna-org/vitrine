---
layout: doc
title: $mentioned
translation_key: docs
category: "Entity Info"
function_name: mentioned
syntax: $mentioned
description: Returns the ID of the first user mentioned in the message. Equivalent to the first element of $mentions.
---

# $mentioned

The function `$mentioned` returns the **ID of the first user mentioned** in the command message.

## Syntax

```
$mentioned
```

## Return Value

- **Type** : Snowflake (numeric string) or empty string
- ID of the first user mentioned
- Empty string if no user mention is present

## Behavior

- `$mentioned` takes **no arguments**.
- Returns only the **first** user mention.
- To retrieve all mentions, use `$mentions`.

## Examples

### Act on the mentioned user

```bdfd
$if[$mentioned!=]
  $title[Information on <@$mentioned>]
  $description[
  **ID:** $mentioned
  **Name:** $username[$mentioned]
  ]
  $thumbnail[$userAvatar[$mentioned]]
  $color[#5865F2]
  $sendMessage[]
$else
  $sendMessage[You must mention a user.]
$endif
```

### Kick the first mentioned user

```bdfd
$if[$mentioned!=]
  $if[$checkContains[$userPerms;KickMembers]==true]
    $kick[$mentioned]
    $sendMessage[<@$mentioned> was kicked.]
  $else
    $sendMessage[Permission denied.]
  $endif
$else
  $sendMessage[Mention the user to kick.]
$endif
```

## Notes

- `$mentioned` is convenient for commands that target a single user.
- If multiple users are mentioned, only the first is returned.
- Use `$userExists[$mentioned]` to validate that the mentioned user exists.
- Does not detect `@everyone` or `@here` mentions.

