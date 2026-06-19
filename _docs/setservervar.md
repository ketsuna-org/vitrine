---
layout: doc
title: $setServerVar[]
translation_key: docs
category: "Variables"
function_name: setServerVar
syntax: $setServerVar[name;value] or $setServerVar[name;value;Guild ID]
description: "Stores a value into a guild-scoped variable. Alias: $setGuildVar. Writes to the current server's variable, or to a specific server when a Guild ID is provided."
---
$setServerVar stores a value persistently in the BDFD database under a guild-scoped variable. The variable value is shared by all members within that server context. $setGuildVar is an exact alias and can be used interchangeably.

When called with two arguments (`name` and `value`), it sets the variable for the current guild (`((guild.id))`). When a Guild ID is provided, the variable is set for the specified server.

The scope is `guild`, meaning the value is shared server-wide. This is ideal for server settings such as prefixes, welcome channels, auto-roles, logging channels, and similar configuration values. This function does not return any output — use $getServerVar to read the value. To reset, use $resetServerVar.
