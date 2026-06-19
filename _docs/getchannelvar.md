---
layout: doc
title: $getChannelVar[]
translation_key: docs
category: "Variables"
function_name: getChannelVar
syntax: $getChannelVar[name] or $getChannelVar[name;Channel ID]
description: Reads the value of a channel-scoped variable. Returns the stored value for the current channel, or a specific channel when a Channel ID is provided.
---
$getChannelVar reads a variable scoped to a Discord channel. The variable value is specific to that channel context within a server. When called with only a `name`, it reads from the channel where the command is being executed (`((channel.id))`). When a Channel ID is provided, the variable is read from the specified channel.

Variables are defined and configured in the Bot Creator Variables UI, where you can set default values per variable. If a variable has not been set via $setChannelVar but a default exists in the definitions, $getChannelVar returns that default. If neither a stored value nor a default exists, an empty string is returned.
