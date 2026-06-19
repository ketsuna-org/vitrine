---
layout: doc
title: $setChannelVar[]
translation_key: docs
category: "Variables"
function_name: setChannelVar
syntax: $setChannelVar[name;value] or $setChannelVar[name;value;Channel ID]
description: Stores a value into a channel-scoped variable. Writes to the current channel's variable, or to a specific channel when a Channel ID is provided.
---
$setChannelVar stores a value persistently in the BDFD database under a channel-scoped variable. The variable value is specific to a Discord channel within a server.

When called with two arguments (`name` and `value`), it sets the variable for the current channel (`((channel.id))`). When a Channel ID is provided, the variable is set for the specified channel.

The scope is `channel`, making it ideal for per-channel settings like locks, slowmode, topic tracking, message counters, or channel-specific configurations. This function does not return any output — use $getChannelVar to read the value. To reset, use $resetChannelVar.
