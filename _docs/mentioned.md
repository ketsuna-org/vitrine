---
layout: doc
title: $mentioned
translation_key: docs
category: "Entity Info"
function_name: mentioned
syntax: $mentioned[index;(returnSelf)]
description: Returns the ID of the user mentioned at the given position in the message (1, < for the first, > for the last).
---

# $mentioned

The function `$mentioned[]` returns the **ID of the user mentioned** at a given position in the command message.

## Syntax

```
$mentioned[index;(returnSelf)]
```

## Parameters

| Parameter | Description |
|---|---|
| `index` | Required. Position of the mention: a positive integer (1 is the first), `<` for the first, `>` for the last. Any other value raises an error. |
| `returnSelf` | Optional (`yes`/`no`, `true`/`false`). If no user is mentioned at this position, return the ID of the command author instead. Defaults to `yes`. Any other value raises an error. |

## Return Value

- **Type** : Snowflake (numeric string) or empty string
- ID of the user mentioned at the requested position
- If there is no such mention: the author's ID when `returnSelf` is `yes` (default), otherwise an empty string

## Behavior

- `$mentioned` requires at least one argument: a bare `$mentioned` is invalid.
- Reads the user mentions of the message; it raises an error in a slash command (use the command options instead).
- To retrieve all mentions, use `$mentions`.

## Examples

### Act on the mentioned user

```bdfd
$if[$mentioned[1;no]!=]
  $title[Information on <@$mentioned[1;no]>]
  $description[
  **ID:** $mentioned[1;no]
  **Name:** $username[$mentioned[1;no]]
  ]
  $thumbnail[$userAvatar[$mentioned[1;no]]]
  $color[#5865F2]
$else
  $sendMessage[You must mention a user.]
$endif
```

### Kick the first mentioned user

```bdfd
$if[$mentioned[1;no]!=]
  $if[$checkContains[$userPerms;KickMembers]==true]
    $kick[$mentioned[1;no]]
    $sendMessage[<@$mentioned[1;no]> was kicked.]
  $else
    $sendMessage[Permission denied.]
  $endif
$else
  $sendMessage[Mention the user to kick.]
$endif
```

## Notes

- `$mentioned[1]` is convenient for commands that target a single user.
- Because `returnSelf` defaults to `yes`, use `$mentioned[1;no]` to get an empty string when nobody is mentioned.
- Use `$userExists[$mentioned[1;no]]` to validate that the mentioned user exists.
- Does not detect `@everyone` or `@here` mentions.

