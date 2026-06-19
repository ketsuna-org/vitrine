---
layout: doc
title: $channelNames
translation_key: docs
category: "Entity Info"
function_name: channelNames
syntax: $channelNames[(separator)]
description: Returns a list of all channel names on the server, separated by a customizable separator.
---

# $channelNames

The `$channelNames` function returns the **complete list of names** of all channels on the server, separated by a customizable delimiter.

## Syntax

```
$channelNames[(separator)]
```

## Parameters

| Parameter | Description |
|---|---|
| `separator` | Optional. The separator between each channel name. Default: `, ` (comma + space). |

## Return value

| Type | Description |
|---|---|
| `string` | All channel names concatenated with the chosen separator. |

## Examples

### Simple list

```bdfd
$sendMessage[**Server channels:** $channelNames]
```

### List with newlines

```bdfd
$sendMessage[**List of channels:**
$channelNames[
]]
```

### List with custom separator

```bdfd
$sendMessage[Channels: $channelNames[ | ]]
```

### Count channels by name

```bdfd
$sendMessage[The server has $channelCount channels: $channelNames[, ]]
```

## Notes

- Only channels visible to the bot are listed.
- Categories are included in the list.
- To get IDs instead of names, use a loop with `$findChannel` instead.
