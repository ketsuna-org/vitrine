---
layout: doc
title: $allowRoleMentions[]
translation_key: docs
category: "Embed & Message"
function_name: allowRoleMentions
syntax: $allowRoleMentions[(roleID;...)]
description: Restricts which roles can be pinged by the message to the listed role IDs. Without any ID, no role is pinged.
---

# $allowRoleMentions[(roleID;...)] — Restrict Role Mentions

By default the message can ping every role it mentions. `$allowRoleMentions` limits role pings to the IDs you list. Called without arguments, it allows **no** role ping: `<@&roleId>` is displayed but nobody is notified.

## Syntax

```
$allowRoleMentions[(roleID;...)]
```

## Parameters

| Parameter | Description | Required |
|-----------|-------------|:--------:|
| `roleID` | A Discord role ID allowed to be pinged (repeatable). Surrounding spaces are removed and empty values are ignored. | No |

## Return value

None (empty string). The restriction is stored on the message being built. A value that is not a positive number raises the error `Invalid Discord ID.`

## Examples

### Announcement pinging only one role

```bdfd
$allowRoleMentions[123456789012345678]
$sendMessage[<@&123456789012345678> A report has been submitted, please check.]
```

### Mention a role without notifying

```bdfd
$allowRoleMentions
$sendMessage[<@&123456789012345678> will not be notified by this message.]
```

### Roles and users together

```bdfd
$allowUserMentions[$authorID]
$allowRoleMentions[123456789012345678]
$sendMessage[<@$authorID> suggested an idea. <@&123456789012345678> please check.]
```

## Notes

- Without `$allowRoleMentions[]` (and without `$noMention`), the message is sent without any mention restriction from the engine.
- `$allowRoleMentions[]` only affects **role mentions**. For users, use `$allowUserMentions[]`.
- The two functions can be combined; each one restricts only its own kind of mention.
- `$noMention` replaces the whole mention setting (users and roles) with "ping nobody". A later `$allowRoleMentions[roleID]` restores the listed roles only.
- The setting applies to the message being built, so it must be called before the `$sendMessage` that sends it.
