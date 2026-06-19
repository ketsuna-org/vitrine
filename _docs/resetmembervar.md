---
layout: doc
title: $resetMemberVar[]
translation_key: docs
category: "Variables"
function_name: resetMemberVar
syntax: $resetMemberVar[name] or $resetMemberVar[name;User ID] or $resetMemberVar[name;User ID;Guild ID]
description: "Resets a guild-member-scoped variable to its default value (as defined in the Bot Creator Variables UI). Alias: $resetGuildMemberVar."
---
$resetMemberVar restores a guild-member-scoped variable to its default value defined in the Bot Creator Variables UI. If no default is defined, the stored value is removed. $resetGuildMemberVar is an exact alias.

When called with only a `name`, it resets the variable for the current command author in the current guild. When a User ID is provided, it resets for that user in the current guild. When both User ID and Guild ID are provided, it resets for the exact guild-member combination.

Use this function to clear warnings, reset XP after a season, remove moderation flags, or restore member defaults after an unban/unmute. After resetting, $getMemberVar returns the default value (if defined) or an empty string. This function does not return any output.
