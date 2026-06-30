---
layout: doc
title: $getGuildVar[]
translation_key: docs
category: "Variables"
function_name: getGuildVar
syntax: $getGuildVar[name] or $getGuildVar[name;Guild ID]
description: "Reads the value of a guild-scoped variable. Alias: $getServerVar. Returns the stored value for the current server, or a specific server when a Guild ID is provided."
---
$getGuildVar reads a variable scoped to a Discord guild (server). The variable value is shared by all members within that server context. $getServerVar is an exact alias and can be used interchangeably.

When called with only a `name`, it reads from the guild where the command is being executed (`((guild.id))`). When a Guild ID is provided as the second argument, the variable is read from the specified guild.

Variables are defined and configured in the Bot Creator Variables UI, where you can set default values per variable. If a variable has not been set via $setGuildVar but a default exists in the definitions, $getGuildVar returns that default. If neither a stored value nor a default exists, an empty string is returned.
