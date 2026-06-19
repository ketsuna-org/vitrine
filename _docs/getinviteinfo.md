---
layout: doc
title: $getInviteInfo
translation_key: docs
category: "Moderation"
function_name: getInviteInfo
syntax: $getInviteInfo[code]
description: Gets information about a Discord invite from its code. Returns details like the server name, number of members, etc.
---

# $getInviteInfo

The function `$getInviteInfo[]` allows **retrieving information** about a Discord invite from its code.

## Syntax

```
$getInviteInfo[code]
```

## Parameters

| Parameter | Description |
|---|---|
| `code` | The invite code (e.g. `abc123` for `discord.gg/abc123`). |

## Return Value

- **Type** : String
- Information about the invite: server name, description, number of members, etc.
- Empty string if the invite is invalid or expired.

## Behavior

- Works with any valid Discord invite code.
- Does not require the bot to be on the target server.
- Returns public information only.

## Examples

### Check an invite

```bdfd
$let[info;$getInviteInfo[$message[1]]]
$if[$info!=]
  $sendMessage[Invite information:
>>> $info]
$else
  $sendMessage[❌ Invalid or expired invite.]
$endif
```

### Invite spam detection

```bdfd
$if[$checkContains[$message;discord.gg]==true]
  $deleteCommand
  $let[code;$replaceText[$message;https://discord.gg/;]]
  $let[info;$getInviteInfo[$code]]
  $if[$info!=]
    $sendMessage[⚠️ $username, external invites are not allowed. \
(Invite to: $info)]
  $else
    $sendMessage[⚠️ $username, invites are not allowed.]
  $endif
$endif
```

## Notes

- The invite must be valid and not expired.
- Useful for anti-spam invite moderation.
- The returned information depends on what the server makes public.
