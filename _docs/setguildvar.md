---
layout: doc
title: $setGuildVar[]
translation_key: docs
category: "Variables"
function_name: setGuildVar
syntax: $setGuildVar[name;value] or $setGuildVar[name;value;Guild ID]
description: "Stores a value into a guild-scoped variable. Alias: $setServerVar. Writes to the current server's variable, or to a specific server when a Guild ID is provided."
---
$setGuildVar stores a value persistently in the BDFD database under a guild-scoped variable. The variable value is shared by all members within that server context. $setServerVar is an exact alias and can be used interchangeably.

When called with two arguments (`name` and `value`), it sets the variable for the current guild (`((guild.id))`). When a Guild ID is provided, the variable is set for the specified server.

The scope is `guild`, meaning the value is shared server-wide. This is ideal for server settings such as prefixes, welcome channels, auto-roles, logging channels, and similar configuration values. This function does not return any output — use $getGuildVar to read the value. To reset, use $resetGuildVar.
