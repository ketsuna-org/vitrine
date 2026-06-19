---
layout: doc
title: $allowUserMentions[]
translation_key: docs
category: "Embed & Message"
function_name: allowUserMentions
syntax: $allowUserMentions
description: Allows user mentions in the current message. Without this call, mentioning users in the message content will not notify the concerned individuals.
---

# $allowUserMentions[] — Allow User Mentions

`$allowUserMentions[]` enables user notifications when they are mentioned in the message. Without this call, tags like `<@userId>` appear visually but do **not** trigger a notification.

## Syntax

```
$allowUserMentions
```

## Parameters

No parameters.

## Return value

Enables user mentions for the next message. Mentioned users will receive a notification.

## Usage

### Personal notification

```bdfd
$allowUserMentions
$sendMessage[<@$authorID> Your profile has been successfully updated!]
```

### Response to a command

```bdfd
$allowUserMentions
$title[Confirmation]
$description[<@$authorID>, your order #$var[orderId] has been confirmed.]
$addField[Status;In preparation;yes]
$color[#2ECC71]
```

### Multiple mentions

```bdfd
$allowUserMentions
$sendMessage[<@$var[winner1]> and <@$var[winner2]> won the giveaway! 🎉]
```

### Combination with RoleMentions

```bdfd
$allowUserMentions
$allowRoleMentions
$sendMessage[<@$authorID> suggested an idea. <@&$roleID[Admin]> please check.]
```

### Conditional

```bdfd
$if[$var[notify]==yes]
$allowUserMentions
$sendMessage[<@$var[targetId]> You have a new message!]
$else
$noMentions
$sendMessage[You have a new message (silent notification)]
$endif
```

## Mention Control

| Function | Effect |
|----------|-------|
| `$allowRoleMentions` | Enables notifications for role mentions |
| `$allowUserMentions` | Enables notifications for user mentions |
| `$allowMentions` | Enables all mentions (roles + users) |
| `$noMentions` | Disables all mention notifications |

## Notes

- Without this function, `<@userId>` displays as a visual mention but without an audible ping or notification.
- The effect is **one-time**: it only applies to the next message sent.
- For important announcements, combine it with `$allowRoleMentions[]`.
- To send a completely silent message (even for mentioned users), use `$noMentions[]`.
- Respect your server rules regarding excessive pinging.
