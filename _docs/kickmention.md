---
layout: doc
title: $kickMention
translation_key: docs
category: "Moderation"
function_name: kickMention
syntax: $kickMention[reason]
description: Kicks the first user mentioned in a prefix command.
---

# $kickMention

`$kickMention` targets the first user mention in the triggering message. It takes a reason argument, which may be empty.

## Syntax

```text
$kickMention[reason]
```

The argument is required: a bare `$kickMention` is invalid. Use `$kickMention[]` for an empty reason.

## Examples

### Prefix command example

Configure a prefix command named `kick`. Invoke it as `!kick @member`.

```bdfd
$nomention
$onlyPerms[kickmembers;You need Kick Members permission.]
$onlyBotPerms[kickmembers;The bot needs Kick Members permission.]
$onlyIf[$mentioned[1]!=;Usage: !kick @member]
$onlyIf[$mentioned[1]!=$authorID;You cannot kick yourself.]
$onlyIf[$mentioned[1]!=$serverOwner;The server owner cannot be kicked.]
$kickMention[Rules violation]
Member kicked successfully.
```

A missing mention fails target validation ("Missing or invalid user ID."). The bot must have a highest role above the target's highest role. To supply a user ID explicitly, use `$kick[userID;reason]`.
