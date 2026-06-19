---
layout: doc
title: $getCustomStatus
translation_key: docs
category: "Entity Info"
function_name: getCustomStatus
syntax: $getCustomStatus[(userID)]
description: Gets the custom status (text and emoji) of a Discord user. Returns the text of the custom status.
---

# $getCustomStatus

The `$getCustomStatus[]` function allows you to **retrieve the custom status** of a Discord user. The custom status is a custom text (and optionally an emoji) that the user sets in their profile.

## Syntax

```
$getCustomStatus[(userID)]
```

## Parameters

| Parameter | Description |
|---|---|
| `userID` | Optional - The ID of the target user. Default: the command author. |

## Return Value

- **Type**: String
- The custom status text of the user.
- An empty string if the user has not set a custom status.

## Behavior

- Reads the custom status from the Discord presence of the user.
- Only returns the text, not the optionally associated emoji.
- The user must be visible to the bot (shared server, presence accessible).

## Examples

### Simple display

```bdfd
$title[💬 Custom Status]
$let[status;$getCustomStatus[$authorID]]
$if[$status!=]
  Your custom status: **$status**
$else
  You have not set a custom status.
$endif
$sendMessage[]
```

### Rich profile card

```bdfd
$title[👤 $userName[$mentioned[1]]]
$description[
**Status:** $userStatus[$mentioned[1]]
**Custom Status:** $getCustomStatus[$mentioned[1]]
**HypeSquad:** $hypeSquad[$mentioned[1]]
]
$thumbnail[$userAvatar[$mentioned[1]]]
$color[#5865F2]
$sendMessage[]
```

### Status change log

```bdfd
$let[newStatus;$getCustomStatus[$authorID]]
$if[$newStatus!=]
  📝 **$userName** changed their custom status: *$newStatus*
$endif
```

## Notes

- The custom status is distinct from the presence status (online, dnd, etc.) which is retrieved via `$userStatus[]`.
- If the user has set an emoji in their status, only the text is returned.
- The custom status can contain up to 128 characters.
