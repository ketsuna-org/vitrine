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

### Format the date

```bdfd
$sendMessage[Message sent on $formatDate[$messageTimestamp;MM/DD/YYYY at HH:mm:ss]]
```

### Calculate the age of the message

```bdfd
$sendMessage[Message age: $truncate[$sub[$dateNow;$messageTimestamp]/1000] seconds.]
```

### Display in Discord relative format

```bdfd
$sendMessage[Message sent <t:$truncate[$messageTimestamp/1000]:R>]
```

## Notes

- The timestamp is returned in **milliseconds**. Divide by `1000` to get seconds.
- Use with `$formatDate` for a human-readable display.
- `$dateNow` returns the current timestamp, useful for calculating durations.
- For the edit timestamp, use `$messageEditedTimestamp`.

