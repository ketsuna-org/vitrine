---
layout: doc
title: $channelNSFW
translation_key: docs
category: "Entity Info"
function_name: channelNSFW
syntax: $channelNSFW[(channelID)]
description: Returns "true" if the channel is marked as NSFW, "false" otherwise.
---

# $channelNSFW

The `$channelNSFW` function checks if a Discord channel is marked as **NSFW** (Not Safe For Work). It returns `"true"` or `"false"` in the form of a string.

## Syntax

```
$channelNSFW[(channelID)]
```

## Parameters

| Parameter | Description |
|---|---|
| `channelID` | Optional. The ID of the target channel. If omitted, the current channel is used. |

## Return value

| Type | Description |
|---|---|
| `string` | `"true"` if the channel is NSFW, `"false"` otherwise. |

## Examples

### Simple check

```bdfd
$if[$channelNSFW==true]
  $sendMessage[⚠️ This channel is marked as NSFW. Sensitive content is allowed.]
$else
  $sendMessage[This channel is safe for work (SFW).]
$endif
```

### Block a command in an NSFW channel

```bdfd
$if[$channelNSFW==true]
  $sendMessage[This command cannot be used in NSFW channels.]
  $stop
$endif
```

### Check a specific channel

```bdfd
$if[$channelNSFW[123456789012345678]==true]
  $sendMessage[The target channel is NSFW.]
$endif
```

## Notes

- The returned value is a **string** `"true"` or `"false"`, not a boolean.
- Voice channels can also be marked as NSFW.
- Useful for restricting access to certain commands depending on the channel type.
