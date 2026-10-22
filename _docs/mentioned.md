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
| `index` | Required. Position of the mention: a positive integer (1 is the first), `<` for the first, `>` for the last. Any other value (including `0`, a negative number or text) raises `Mention index must be positive, < or >.` |
| `returnSelf` | Optional (`yes`/`no`, `true`/`false`). If no user is mentioned at this position, return the ID of the command author instead. Defaults to `yes`. Any other value raises `Mention fallback must be yes or no.` The value is trimmed and case-insensitive. |

## Return Value

- **Type** : Snowflake (numeric string) or empty string
- ID of the user mentioned at the requested position
- If there is no such mention: the author's ID when `returnSelf` is `yes` (default), otherwise an empty string

## Behavior

- `$mentioned` requires at least one argument: a bare `$mentioned` is invalid.
- Reads the user mentions of the message; it raises the error `Use message options for slash commands.` in a slash command (use the command options instead).
- The mentions are read from the `message.mentions` context variable supplied by the host (a comma-separated list of user IDs).
- The numbering follows the **order of the text**: with `<@300> <@200>`, `$mentioned[1]` is 300 (not the ID-sorted order returned by the Discord API). A mention that is not in the text, such as the ping of a replied-to message, comes after the others.
- **Always write `;no` in guards.** The default (`yes`) returns the command author when nobody is mentioned, so `$if[$mentioned[1]!=]` is always true and `$ban`-style scripts end up targeting the author or the server owner (the "cannot ban the owner" failure). Use `$if[$mentioned[1;no]!=]`.
- Index `>` with no mention at all, or an index larger than the number of mentions, counts as "no such mention".
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
  $if[$checkUserPerms[$authorID;KickMembers]==true]
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
- Because `returnSelf` defaults to `yes` (BDFD's historical default), use `$mentioned[1;no]` in every guard and every moderation script: it gives an empty string when nobody is mentioned.
- Use `$userExists[$mentioned[1;no]]` to validate that the mentioned user exists.


