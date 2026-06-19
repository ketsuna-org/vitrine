---
layout: doc
title: $channelType
translation_key: docs
category: "Entity Info"
function_name: channelType
syntax: $channelType[(channelID)]
description: Returns the type of a channel Discord (text, voice, category, dm, etc.).
---

# $channelType

The `$channelType` function returns the **type** of a Discord channel. Possible types include `text`, `voice`, `category`, `news`, `stage`, `forum`, and `dm`.

## Syntax

```
$channelType[(channelID)]
```

## Parameters

| Parameter | Description |
|---|---|
| `channelID` | Optional. The ID of the target channel. If omitted, the current channel is used. |

## Return value

| Type | Description |
|---|---|
| `string` | The type of the channel. Possible values: `text`, `voice`, `category`, `news`, `stage`, `forum`, `dm`, `group_dm`. |

## Examples

### Display the type of the channel

```bdfd
$sendMessage[This channel is of type: **$channelType**]
```

### Check if voice channel

```bdfd
$if[$channelType==voice]
  $sendMessage[You are in a voice channel.]
$else
  $sendMessage[You are not in a voice channel.]
$endif
```

### Check if category

```bdfd
$if[$channelType==category]
  $sendMessage[This command cannot be used on a category.]
  $stop
$endif
```

## Notes

- Channel types are returned in lowercase.
- Useful for conditioning the behavior of a command based on the channel type.
- Channels of type `dm` do not have a parent category.
