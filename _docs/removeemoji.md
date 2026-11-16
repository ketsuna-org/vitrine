---
layout: doc
title: $removeEmoji
translation_key: docs
category: "Moderation"
function_name: removeEmoji
syntax: $removeEmoji[emojiID;(reason)]
description: Removes a custom emoji from the current server by its ID.
---

# $removeEmoji

The `$removeEmoji[]` function allows **removing a custom emoji** from the current server using its **ID**.

## Syntax

```
$removeEmoji[emojiID;(reason)]
```

## Parameters

| Parameter | Description |
|---|---|
| `emojiID` | The numeric ID of the emoji to remove (the digits in `<:name:ID>`). Required; if it is not a positive number the error `Invalid emoji ID.` is raised. A name is not accepted. |
| `reason` | Optional. Reason recorded in the server's audit log (up to 512 characters). Empty, or absent, uses the reason set with `$auditLogReason`, if any. |

## Return Value

- **Type**: String (empty)
- Empty string if the removal succeeds. Failures raise an error.

## Behavior

- The emoji is deleted from the current server (the command needs a server, otherwise an error is raised). If the ID does not belong to an emoji of the current server, the Discord call fails with an error.
- The bot must have the `Manage Guild Expressions` permission, or have `Create Guild Expressions` and be the creator of that emoji; otherwise an error is raised.
- The deletion is performed on Discord and cannot be undone by the engine.

## Examples

### Simple removal

```bdfd
$if[$checkUserPerms[$authorID;ManageEmojis]==true]
  $if[$emojiExists[$message[1]]==true]
    $removeEmoji[$message[1]]
    $sendMessage[✅ Emoji **$message[1]** removed.]
  $else
    $sendMessage[❌ No emoji has the ID **$message[1]**.]
  $endif
$else
  $sendMessage[❌ Permission denied.]
$endif
```

## Notes

- Removal is irreversible.
- Check the emoji with `$emojiExists[emojiID]` before removing it.

## Audit log reason

The last, optional argument `reason` is the reason shown next to this action in the server's audit log (Discord's `X-Audit-Log-Reason`). Without it, the reason set earlier in the script with `$auditLogReason` is used; with neither, no reason is recorded.
