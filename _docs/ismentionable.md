---
layout: doc
title: $isMentionable
translation_key: docs
category: "Entity Info"
function_name: isMentionable
syntax: $isMentionable[roleID;(guildID)]
description: "Checks if a role is mentionable. Returns \"true\" or \"false\"."
---

# $isMentionable

The function `$isMentionable` checks if a Discord role is **mentionable** by server members. A mentionable role can be used in messages with `@Role`.

## Syntax

```
$isMentionable[roleID;(guildID)]
```

## Parameters

| Parameter | Description |
|---|---|
| `roleID` | The ID of the role. Required. |
| `guildID` | Optional. The ID of the target server. |

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

### Retrieve via $roleInfo

```bdfd
$sendMessage[Mentionable: $roleInfo[123456789012345678;mentionable]]
```

## Notes

- Returns a string `"true"` or `"false"`.
- Equivalent to `$roleInfo[roleID;mentionable]`.
- Useful for checking before sending a role mention.
