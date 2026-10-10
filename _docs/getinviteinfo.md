---
layout: doc
title: $getInviteInfo
translation_key: docs
category: "Moderation"
function_name: getInviteInfo
syntax: $getInviteInfo[code;property]
description: Gets a property of a Discord invite from its code (channel, creation date, inviter, temporary status, number of uses).
---

# $getInviteInfo

The function `$getInviteInfo[]` allows **retrieving a property** of a Discord invite from its code.

## Syntax

```
$getInviteInfo[code;property]
```

## Parameters

| Parameter | Description |
|---|---|
| `code` | The invite code (e.g. `abc123` for `discord.gg/abc123`). Required, must not be empty. |
| `property` | The property to read, among: `channel`, `creationDate`, `inviter`, `isTemporary`, `uses`. Required, case-sensitive. |

## Return Value

- **Type** : String
- The value of the requested property for this invite.
- An empty string if no information is available for this invite.
- An error is raised if the code is empty or if the property is unknown.

## Behavior

- The engine has no invite lookup service: the values are read from the invite data supplied by the host (context variables `invite[code].property`).
- If the host did not describe the invite, the function returns an empty string.

## Examples

### Check an invite

```bdfd
$var[uses;$getInviteInfo[$message[1];uses]]
$if[$var[uses]!=]
  $sendMessage[Number of uses: $var[uses]]
$else
  $sendMessage[❌ No information available for this invite.]
$endif
```

### Find who created an invite

```bdfd
$var[inviter;$getInviteInfo[$message[1];inviter]]
$if[$var[inviter]!=]
  $sendMessage[Invite created by: $var[inviter]]
$endif
```

## Notes

- The properties `channel`, `creationDate`, `inviter`, `isTemporary` and `uses` are the only ones accepted.
- The returned information depends on what the host supplies for the invite.
