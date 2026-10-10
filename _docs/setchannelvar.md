---
layout: doc
title: $setChannelVar[]
translation_key: docs
category: "Variables"
function_name: setChannelVar
syntax: $setChannelVar[name;value] or $setChannelVar[name;value;Channel ID]
description: Stores a value into a channel-scoped variable. Writes to the current channel's variable, or to a specific channel when a Channel ID is provided.
---
$setChannelVar stores a value persistently in the BDFD database under a channel-scoped variable. The variable value is specific to a Discord channel.

When called with two arguments (`name` and `value`), it sets the variable for the current channel (`((channel.id))`). When a Channel ID is provided, the variable is set for the specified channel; an empty Channel ID counts as omitted. If there is no current channel, the error `Missing context for channel variables.` is raised. The function takes 2 or 3 arguments.

The scope is `channel`. Writing: the value (any text, stored as a string) is stored for the selected context. The variable does not have to be declared beforehand: if no variable with this name is declared for this scope in the Variables catalogue, the first write declares it, **using the written value as its default value**, so any context that has no stored value then reads that first value instead of an empty string. The name is trimmed, a leading `bc_` is ignored, and an empty name raises an error. Stored values are case-sensitive (`Score` and `score` are two different values). It is ideal for per-channel settings like locks, slowmode, topic tracking, message counters, or channel-specific configurations. This function does not return any output — use $getChannelVar to read the value. To reset, use $resetChannelVar.

## Examples

### Set Channel Alert Flag

```bdfd
$setChannelVar[alertMuted;true;$channelID]
$title[Channel Alerts]
$description[Channel <#$channelID> alerts have been muted.]
$color[#5865F2]
```
