---
layout: doc
title: $allowRoleMentions[]
translation_key: docs
category: "Embed & Message"
function_name: allowRoleMentions
syntax: $allowRoleMentions
description: Allows role mentions in the current message. Without this call, mentioning roles in the message content will not notify the members.
---

# $allowRoleMentions[] — Allow Role Mentions

`$allowRoleMentions[]` enables member notifications when a role is mentioned in the message. Without this call, role tags like `<@&roleId>` are displayed but do **not** trigger a notification.

## Syntax

```
$allowRoleMentions
```

## Parameters

No parameters.

## Return value

Enables role mentions for the next message sent. Roles mentioned in the content will notify their members.

## Usage

### Announcement with ping

```bdfd
$allowRoleMentions
$sendMessage[<@&$roleID[Moderator]> A report has been submitted, please check.]
```

### Event notification

```bdfd
$allowRoleMentions
$title[🎉 Server Event]
$description[<@&$roleID[Event_Ping]> A new event begins in 1 hour!]
$addField[Details;Weekly tournament;yes]
$addField[Reward;5000 gold coins;yes]
$color[#F1C40F]
```

### Reminder with mention

```bdfd
$allowRoleMentions
$sendMessage[⏰ <@&$roleID[Staff]> Staff meeting in 10 minutes!]
```

### Conditional message

```bdfd
$if[$var[important]==yes]
$allowRoleMentions
$sendMessage[<@&$roleID[Everyone_Important]> Critical alert!]
$else
$noMentions
$sendMessage[Minor update available]
$endif
```

## Notes

- Without `$allowRoleMentions[]`, mentioned roles appear as text but do not trigger a notification.
- The effect only applies to the next message sent (via `$sendMessage` or other sending functions).
- To explicitly disable all mentions, use `$noMentions[]`.
- `$allowRoleMentions[]` only affects **role mentions**. For users, use `$allowUserMentions[]`.
- Useful for important announcements while avoiding accidental pings in ordinary messages.
