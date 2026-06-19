---
layout: doc
title: $mentionedRoles
translation_key: docs
category: "Entity Info"
function_name: mentionedRoles
syntax: $mentionedRoles
description: Returns the list of role IDs mentioned in the message (via @role), separated by commas.
---

# $mentionedRoles

The function `$mentionedRoles` returns the **list of role IDs mentioned** in the message, via the `@role` syntax.

## Syntax

```
$mentionedRoles
```

## Return Value

- **Type** : List of snowflakes separated by commas
- Example: `123456789,987654321`
- Empty string if no roles are mentioned

## Behavior

- `$mentionedRoles` takes **no arguments**.
- Detects role mentions formatted as `@role-name`.
- Only mentionable roles (where the role's "@mention this role" setting is enabled) are detected.

## Examples

### Check mentioned roles

```bdfd
$if[$mentionedRoles!=]
  $let[roles;$splitText[$mentionedRoles;,]]
  $let[count;$arrayCount[$roles]]
  $sendMessage[$count role(s) mentioned.]
$else
  $sendMessage[No roles mentioned.]
$endif
```

### Add a mentioned role

```bdfd
$if[$mentionedRoles!=]
  $let[firstRole;$splitText[$mentionedRoles;,;1]]
  $giveRole[$mentioned;$firstRole]
  $sendMessage[Role <@&$firstRole> added to <@$mentioned>!]
$else
  $sendMessage[Mention a role to assign.]
$endif
```

### List mentioned roles

```bdfd
$if[$mentionedRoles!=]
  $let[roles;$splitText[$mentionedRoles;,]]
  $let[i;0]
  $let[total;$arrayCount[$roles]]
  $let[output;]
  $while[$i<$total]
    $let[roleID;$arrayGet[$roles;$i]]
    $let[output;$output - <@&$roleID>
]
    $let[i;$sum[$i;1]]
  $endwhile
  $sendMessage[Mentioned roles:
$output]
$endif
```

## Notes

- A role must have the "Allow anyone to @mention this role" option enabled to be detected.
- The returned IDs are numeric snowflakes.
- To get the name of a role from its ID, use `$roleName[ID]`.

