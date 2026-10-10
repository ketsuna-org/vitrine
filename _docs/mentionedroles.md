---
layout: doc
title: $mentionedRoles
translation_key: docs
category: "Entity Info"
function_name: mentionedRoles
syntax: $mentionedRoles[index]
description: Returns the ID of the role mentioned at the given position in the message (1, < for the first, > for the last).
---

# $mentionedRoles

The function `$mentionedRoles` returns the **ID of the role mentioned** at a given position in the message, via the `@role` syntax.

## Syntax

```
$mentionedRoles[index]
```

## Parameters

| Parameter | Description |
|---|---|
| `index` | Required. Position of the mention: a positive integer (1 is the first), `<` for the first, `>` for the last. Any other value (including `0`, a negative number or text) raises `Mention index must be positive, < or >.` |

## Return Value

- **Type** : Snowflake (numeric string) or empty string
- ID of the role mentioned at the requested position
- Empty string if there is no such mention

## Behavior

- `$mentionedRoles` requires exactly one argument: a bare `$mentionedRoles` is invalid. It has no fallback argument.
- Reads the role mentions of the message; it raises the error `Use message options for slash commands.` in a slash command (use the command options instead).
- The mentions are read from the `message.roleMentions` context variable supplied by the host (a comma-separated list of role IDs).
- Returns a single ID per call; call it with several indexes to read several roles.

## Examples

### Check mentioned roles

```bdfd
$if[$mentionedRoles[1]!=]
  $sendMessage[At least one role is mentioned.]
$else
  $sendMessage[No roles mentioned.]
$endif
```

### Add a mentioned role

```bdfd
$if[$mentionedRoles[1]!=]
  $var[firstRole;$mentionedRoles[1]]
  $giveRole[$mentioned[1];$var[firstRole]]
  $sendMessage[Role <@&$var[firstRole]> added to <@$mentioned[1]>!]
$else
  $sendMessage[Mention a role to assign.]
$endif
```

### First and last mentioned roles

```bdfd
$if[$mentionedRoles[1]!=]
  $sendMessage[First role: <@&$mentionedRoles[<]>, last role: <@&$mentionedRoles[>]>]
$endif
```

## Notes

- To get the name of a role from its ID, use `$roleName[ID]`.

