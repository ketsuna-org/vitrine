---
layout: doc
title: $messageTimestamp
translation_key: docs
category: "Entity Info"
function_name: messageTimestamp
syntax: $messageTimestamp
description: Returns the creation timestamp of the triggering message.
---

# $messageTimestamp

The function `$messageTimestamp` returns the creation **timestamp** of the triggering message, in milliseconds since the Unix epoch.

## Syntax

```
$messageTimestamp
```

## Parameters

None.

## Return Value

| Type | Description |
|---|---|
| `integer` | Unix timestamp in milliseconds. |

## Examples

### Display the raw timestamp

```bdfd
$sendMessage[Message timestamp: $messageTimestamp]
```

### Display as a Discord date

```bdfd
$sendMessage[Message sent on <t:$floor[$divide[$messageTimestamp;1000]]:f>]
```

### Calculate the age of the message

```bdfd
$sendMessage[Message age: $floor[$divide[$sub[$getTimestampMs;$messageTimestamp];1000]] seconds.]
```

### Display in Discord relative format

```bdfd
$sendMessage[Message sent <t:$floor[$divide[$messageTimestamp;1000]]:R>]
```

## Notes

- The timestamp is returned in **milliseconds**. Divide by `1000` to get seconds.
- Use it in a Discord timestamp (`<t:seconds:format>`) for a human-readable display.
- `$getTimestampMs` returns the current timestamp in milliseconds, useful for calculating durations.
- For the edit timestamp, use `$messageEditedTimestamp`.

