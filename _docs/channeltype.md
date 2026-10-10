---
layout: doc
title: $channelType
translation_key: docs
category: "Entity Info"
function_name: channelType
syntax: $channelType[channelID]
description: Returns the type of a Discord channel from its ID (text, voice, category, dm, etc.).
---

# $channelType

The `$channelType` function returns the **type** of a Discord channel. Possible types include `text`, `voice`, `category`, `announcement`, `thread`, `stage`, `forum`, `media`, and `dm`.

## Syntax

```
$channelType[channelID]
```

## Parameters

| Parameter | Description |
|---|---|
| `channelID` | Required. The ID of the target channel. Use `$channelID` for the current channel. An invalid ID raises `Invalid channel ID.` and an unknown channel raises `Channel not found.` |

## Return value

| Type | Description |
|---|---|
| `string` | The type of the channel. Possible values: `text`, `voice`, `category`, `announcement`, `thread`, `stage`, `forum`, `media`, `dm` (private and group DMs), `unknown`. |

## Examples

### Display the type of the channel

```bdfd
$sendMessage[This channel is of type: **$channelType[$channelID]**]
```

### Check if voice channel

```bdfd
$if[$channelType[$channelID]==voice]
  $sendMessage[You are in a voice channel.]
$else
  $sendMessage[You are not in a voice channel.]
$endif
```

### Check if category

```bdfd
$if[$channelType[$channelID]==category]
  $sendMessage[This command cannot be used on a category.]
  $stop
$endif
```

## Notes

- Channel types are returned in lowercase.
- Useful for conditioning the behavior of a command based on the channel type.
- Channels of type `dm` do not have a parent category.
- Announcement channels (formerly "news") are returned as `announcement`.
