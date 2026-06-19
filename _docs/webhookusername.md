---
layout: doc
title: $webhookUsername
translation_key: docs
category: "Webhooks & Integrations"
function_name: webhookUsername
syntax: $webhookUsername[name]
description: Sets the username displayed for the next message sent via $webhookSend.
---

# $webhookUsername

The `$webhookUsername` function allows you to **set the username** that will be displayed for the next message sent via `$webhookSend`.

## Syntax

```
$webhookUsername[name]
```

## Parameters

| Parameter | Description |
|---|---|
| `name` | The name to display. Maximum 80 characters. Supports emojis and variables. |

## Return Value

This function does not return a value. It only sets the name for the next `$webhookSend`.

## Behavior

- The name replaces the default name of the webhook for this sending.
- The name is reset after each `$webhookSend`.
- If no name is defined, the original name of the webhook is used.

## Examples

### Fixed name

```bdfd
$webhookUsername[📢 Server Announcements]
$webhookContent[New update available!]
$webhookSend[$webhookURL;]
```

### Dynamic name

```bdfd
$webhookUsername[$username (via webhook)]
$webhookAvatarURL[$authorAvatar]
$webhookContent[$message]
$webhookSend[$webhookURL;]
```

### Anonymization

```bdfd
$webhookUsername[Anonymous Message]
$webhookAvatarURL[https://cdn.example.com/anonymous.png]
$webhookContent[$noMentionMessage]
$webhookSend[$confessionHook;]
```

## Notes

- The name cannot exceed 80 characters.
- Webhooks with names impersonating official roles (Admin, Moderator) can be misleading — use them ethically.
- Combine with `$webhookAvatarURL[]` for a complete customization.
