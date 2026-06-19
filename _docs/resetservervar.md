---
layout: doc
title: $resetServerVar[]
translation_key: docs
category: "Variables"
function_name: resetServerVar
syntax: $resetServerVar[name] or $resetServerVar[name;Guild ID]
description: "Resets a guild-scoped variable to its default value (as defined in the Bot Creator Variables UI). Alias: $resetGuildVar."
---
$resetServerVar restores a guild-scoped variable to its default value defined in the Bot Creator Variables UI. If no default is defined, the stored value is removed. $resetGuildVar is an exact alias and can be used interchangeably.

When called with only a `name`, it resets the variable for the current guild. When a Guild ID is provided, it resets the variable for the specified server.

Use this function to revert server settings to their defaults, clear maintenance mode, or perform bulk resets. After resetting, $getServerVar returns the default value (if defined) or an empty string. This function does not return any output.
