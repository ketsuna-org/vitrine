---
layout: doc
title: $messageType
translation_key: docs
category: "Entity Info"
function_name: messageType
syntax: $messageType
description: Returns the type of the triggering message as an integer (0 = normal message, 7 = member joined, etc.).
---

# $messageType

The function `$messageType` returns the **type** of the triggering message as an integer. Type `0` corresponds to a normal user message, while other types correspond to Discord system messages.

## Syntax

```
$messageType
```

## Parameters

None.

## Return Value

| Type | Description |
|---|---|
| `integer` | The type of the message. |

## Common Types

| Type | Meaning |
|---|---|
| `0` | Normal message (DEFAULT) |
| `1` | Member added to group DM (RECIPIENT_ADD) |
| `2` | Member removed from group DM (RECIPIENT_REMOVE) |
| `3` | Voice call message (CALL) |
| `4` | Channel name changed (CHANNEL_NAME_CHANGE) |
| `5` | Channel icon changed (CHANNEL_ICON_CHANGE) |
| `6` | Pinned message notification (CHANNEL_PINNED_MESSAGE) |
| `7` | New member joined (GUILD_MEMBER_JOIN) |
| `8` | Server boost (USER_PREMIUM_GUILD_SUBSCRIPTION) |
| `9` | Boost level 1 reached (GUILD_TIER_1) |
| `10` | Boost level 2 reached (GUILD_TIER_2) |
| `11` | Boost level 3 reached (GUILD_TIER_3) |

## Examples

### Display the type

```bdfd
$sendMessage[Message type: $messageType]
```

### Ignore system messages

```bdfd
$if[$messageType!=0]
  $stop
$endif
$sendMessage[User message processed.]
```

### React to new joins

```bdfd
$if[$messageType==7]
  $sendMessage[Welcome $username!]
$endif
```

## Notes

- Useful for filtering system messages to process only user messages.
- Returns an integer, not a descriptive string.

