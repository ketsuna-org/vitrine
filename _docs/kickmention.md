---
layout: doc
title: $kickMention
translation_key: docs
category: "Moderation"
function_name: kickMention
syntax: $kickMention
description: Kicks the user mentioned in the message.
---

# $kickMention

The function `$kickMention` **automatically kicks the user mentioned** in the triggering message. This is a convenient shortcut that avoids the need to specify an ID. The bot must have the `Kick Members` permission.

## Syntax

```
$kickMention
```

## Parameters

No parameters. The function automatically detects the mentioned user.

## Return Value

None. The mentioned user is kicked.

## Examples

### Simple kick

```bdfd
$kickMention
$sendMessage[Member kicked successfully!]
```

### Kick with default reason

```bdfd
$kickMention
$sendMessage[<@$mentioned[1]> has been kicked for violating the rules.]
```

## Notes

- The triggering message must contain a user mention.
- The bot must have the `Kick Members` permission.
- To kick a specific user by ID, use `$kick`.
- If no mention is present, the behavior may be undefined.
