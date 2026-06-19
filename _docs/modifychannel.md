---
layout: doc
title: $modifyChannel
translation_key: docs
category: "Moderation"
function_name: modifyChannel
syntax: $modifyChannel[channelID;name;(topic);(categoryID);(nsfw);(slowmode)]
description: Modifies the properties of an existing channel, such as its name, topic, category, NSFW status, and slowmode.
---

# $modifyChannel

The function `$modifyChannel` allows you to modify the properties of an existing channel.

## Syntax

```
$modifyChannel[channelID;name;(topic);(categoryID);(nsfw);(slowmode)]
```

## Parameters

| Parameter | Description |
|---|---|
| `channelID` | The ID of the channel to modify. |
| `name` | The new name of the channel. |
| `topic` | Optional - The new topic (max 1024 characters). |
| `categoryID` | Optional - The ID of the new category, `0` for none. |
| `nsfw` | Optional - `true`/`false` for NSFW status. |
| `slowmode` | Optional - The slowmode delay in seconds (0-21600). |

## Return Value

This function does not return any value.

## Behavior

- The bot must have the `MANAGE_CHANNELS` permission.
- Optional parameters can be left empty to keep their current value.
- The parameter order is important — use empty semicolons `;` to skip parameters.

## Examples

### Renaming a channel

```bdfd
$modifyChannel[$channelID;archives-$date]
$sendMessage[Channel renamed.]
```

### Changing the slowmode

```bdfd
$modifyChannel[$channelID;$channelName;;;false;5]
$sendMessage[Slowmode set to 5 seconds.]
```

### Moving to a category

```bdfd
$modifyChannel[$channelID;$channelName;;123456789]
$sendMessage[Channel moved.]
```

### Modifying all properties

```bdfd
$modifyChannel[$channelID;rules;Server Rules - updated on $date;123456789;false;0]
$sendMessage[Channel updated successfully.]
```

## Notes

- Use empty parameters (`;`) to skip options you do not want to modify.
- Channel names must follow the same rules as in `$createChannel[]`.
- To modify channel permissions, use `$modifyChannelPerms[]`.
