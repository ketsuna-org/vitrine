---
layout: doc
title: $allowUserMentions[]
translation_key: docs
category: "Embed & Message"
function_name: allowUserMentions
syntax: $allowUserMentions[(userID;...)]
description: Restricts which users can be pinged by the message to the listed user IDs. Without any ID, no user is pinged.
---

# $allowUserMentions[(userID;...)] — Restrict User Mentions

By default the message can ping every user it mentions. `$allowUserMentions` limits user pings to the IDs you list. Called without arguments, it allows **no** user ping: `<@userId>` is displayed but nobody is notified.

## Syntax

```
$allowUserMentions[(userID;...)]
```

## Parameters

| Parameter | Description | Required |
|-----------|-------------|:--------:|
| `userID` | A Discord user ID allowed to be pinged (repeatable). Surrounding spaces are removed and empty values are ignored. | No |

## Return value

None (empty string). The restriction is stored on the message being built. A value that is not a positive number raises the error `Invalid Discord ID.`

## Examples

### Ping only the author

```bdfd
$allowUserMentions[$authorID]
$sendMessage[<@$authorID> Your profile has been successfully updated!]
```

### Mention without notifying

```bdfd
$allowUserMentions
$title[Confirmation]
$description[<@$authorID>, your order #$var[orderId] has been confirmed.]
$addField[Status;In preparation;yes]
$color[#2ECC71]
```

### Several allowed users

```bdfd
$allowUserMentions[123456789012345678;234567890123456789]
$sendMessage[<@123456789012345678> and <@234567890123456789> won the giveaway! 🎉]
```

### Combination with RoleMentions

```bdfd
$allowUserMentions[$authorID]
$allowRoleMentions[123456789012345678]
$sendMessage[<@$authorID> suggested an idea. <@&123456789012345678> please check.]
```

### Conditional

```bdfd
$if[$var[notify]==yes]
$sendMessage[<@$var[targetId]> You have a new message!]
$else
$noMention
$sendMessage[You have a new message (silent notification)]
$endif
```

## Mention Control

| Function | Effect |
|----------|--------|
| `$allowRoleMentions[(roleID;...)]` | Restricts role pings to the listed role IDs (none if no argument) |
| `$allowUserMentions[(userID;...)]` | Restricts user pings to the listed user IDs (none if no argument) |
| `$noMention` | Disables all mention notifications (users and roles) |

## Notes

- Without any of these functions (and without `$noMention`), the engine adds no mention restriction to the message.
- `$noMention` replaces the whole mention setting with "ping nobody"; a later `$allowUserMentions[userID]` restores the listed users only.
- The setting applies to the message being built, so call it before the `$sendMessage` that sends it.
- Combine `$allowUserMentions` and `$allowRoleMentions` to control users and roles independently.
- To send a completely silent message, use `$noMention`.
- Respect your server rules regarding excessive pinging.
