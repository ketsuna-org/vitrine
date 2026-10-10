---
layout: doc
title: $lastPinTimestamp
translation_key: docs
category: "Entity Info"
function_name: lastPinTimestamp
syntax: $lastPinTimestamp
description: Returns the Unix timestamp (in seconds) of the last pinned message in the current channel.
---

# $lastPinTimestamp

The function `$lastPinTimestamp` returns the **timestamp of the last pinned message** in the current Discord channel. If no message is pinned, it returns an empty string.

## Syntax

```
$lastPinTimestamp
```

## Parameters

None. `$lastPinTimestamp` takes no arguments and always reads the current channel.

## Return Value

| Type | Description |
|---|---|
| `integer` or `""` | Unix timestamp in seconds of the last pin, or an empty string if none. |

## Examples

### Display the date of the last pin

```bdfd
$if[$lastPinTimestamp!=]
  $sendMessage[Last pinned message at Unix timestamp $lastPinTimestamp]
$else
  $sendMessage[No pinned messages in this channel.]
$endif
```

### Discord relative format

```bdfd
$if[$lastPinTimestamp!=]
  $sendMessage[Last pin <t:$lastPinTimestamp:R>]
$endif
```

## Notes

- The timestamp is in **seconds** (Unix time), directly usable in Discord `<t:...>` tags.
- Returns an empty string (`""`) if no message is pinned.
- A channel that cannot hold messages raises `Channel does not support messages.`

