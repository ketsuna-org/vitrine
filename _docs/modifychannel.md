---
layout: doc
title: $modifyChannel
translation_key: docs
category: "Moderation"
function_name: modifyChannel
syntax: $modifyChannel[channelID;(name);(topic);(nsfw);(position);(categoryID)]
description: Modifies the properties of an existing channel, such as its name, topic, NSFW status, position, and category.
---

# $modifyChannel

The function `$modifyChannel` allows you to modify the properties of an existing channel.

## Syntax

```
$modifyChannel[channelID;(name);(topic);(nsfw);(position);(categoryID)]
```

## Parameters

| Parameter | Description |
|---|---|
| `channelID` | Required. The ID of the channel to modify (a positive integer, otherwise an error is raised). |
| `name` | Optional - The new name (1 to 100 characters). Empty keeps the current name. |
| `topic` | Optional - The new topic (max 1024 characters, 4096 for a forum). An empty value clears the topic. |
| `nsfw` | Optional - `yes`/`no` (or `true`/`false`) for NSFW status. Empty keeps the current value; any other value raises an error. |
| `position` | Optional - The new position of the channel, as a positive integer starting at 1. Empty keeps the current position. |
| `categoryID` | Optional - The ID of the new parent category (must be a category of the same server). Empty keeps the current category. |

## Return Value

This function does not return any value.

## Behavior

- The bot must have the `Manage Channels` permission on the channel.
- Optional parameters can be left empty (or set to `!unchanged`) to keep their current value, except `topic` where an empty value clears the topic (use `!unchanged` to keep it).
- The parameter order is important — use empty semicolons `;` to skip parameters.
- There is no slowmode parameter.

## Examples

### Renaming a channel

```bdfd
$modifyChannel[$channelID;archives-$date]
$sendMessage[Channel renamed.]
```

### Changing the NSFW status

```bdfd
$modifyChannel[$channelID;;;no]
$sendMessage[Channel is no longer NSFW.]
```

### Moving to a category

```bdfd
$modifyChannel[$channelID;;;;;123456789]
$sendMessage[Channel moved.]
```

### Modifying all properties

```bdfd
$modifyChannel[$channelID;rules;Server Rules - updated on $date;no;1;123456789]
$sendMessage[Channel updated successfully.]
```

## Notes

- Use empty parameters (`;`) to skip options you do not want to modify.
- Channel names must follow the same rules as in `$createChannel[]`.
- To modify channel permissions, use `$modifyChannelPerms[]`.
