---
layout: doc
title: $isMentionable
translation_key: docs
category: "Entity Info"
function_name: isMentionable
syntax: $isMentionable[roleID]
description: "Checks if a role is mentionable. Returns \"true\" or \"false\"."
---

# $isMentionable

The function `$isMentionable` checks if a Discord role is **mentionable** by server members. A mentionable role can be used in messages with `@Role`.

## Syntax

```
$isMentionable[roleID]
```

## Parameters

| Parameter | Description |
|---|---|
| `roleID` | Required. The ID of the role (in the current server). An invalid ID raises "Invalid role ID."; an ID that is not a role of the server raises "Role not found." |

## Return Value

| Type | Description |
|---|---|
| `string` | `"true"` if the role is mentionable, `"false"` otherwise. |

## Examples

### Check a role

```bdfd
$if[$isMentionable[$roleID[Announcements]]==true]
  $sendMessage[The Announcements role is mentionable.]
$else
  $sendMessage[The Announcements role is not mentionable.]
$endif
```

### List mentionable roles

```bdfd
$sendMessage[The Admin role is $isMentionable[$roleID[Admin]].]
```

### Alert if not mentionable

```bdfd
$if[$isMentionable[$roleID[Modo]]==false]
  $sendMessage[⚠️ The Modo role is not mentionable. Members cannot ping it.]
$endif
```

## Notes

- Returns a string `"true"` or `"false"`.
- Takes exactly one argument; there is no `guildID` parameter.
- Useful for checking before sending a role mention.
