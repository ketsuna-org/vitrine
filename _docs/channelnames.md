---
layout: doc
title: $channelNames
translation_key: docs
category: "Entity Info"
function_name: channelNames
syntax: $channelNames[separator;(guildID)]
description: Returns a list of all channel names on the server, joined by the separator you provide.
---

# $channelNames

The `$channelNames` function returns the **complete list of names** of all channels on the server, joined by the separator you provide.

## Syntax

```
$channelNames[separator;(guildID)]
```

## Parameters

| Parameter | Description |
|---|---|
| `separator` | Required. The text inserted between each channel name. |
| `guildID` | Optional. The ID of the server to list. Defaults to the current server; an invalid ID raises `Invalid guild ID.` |

## Return value

| Type | Description |
|---|---|
| `string` | All channel names concatenated with the chosen separator. |

## Examples

### Simple list

```bdfd
$sendMessage[**Server channels:** $channelNames[, ]]
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

- Categories are included in the list.
- Active threads are not included.
