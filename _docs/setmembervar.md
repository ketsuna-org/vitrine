---
layout: doc
title: $setMemberVar[]
translation_key: docs
category: "Variables"
function_name: setMemberVar
syntax: $setMemberVar[name;value] or $setMemberVar[name;value;User ID] or $setMemberVar[name;value;User ID;Guild ID]
description: "Stores a value into a guild-member-scoped variable. Alias: $setGuildMemberVar. Writes to the current member's variable, or to a specific member when IDs are provided."
---
$setMemberVar stores a value persistently in the BDFD database under a guild-member-scoped variable. The context key is composed as `guildId:userId`, making the value unique per user per server. $setGuildMemberVar is an exact alias.

When called with two arguments, it sets the variable for the current command author in the current guild. When a User ID is provided, it sets for that user in the current guild. When both User ID and Guild ID are provided, it sets for the exact guild-member combination.

The scope is `guildMember`, ideal for per-user-per-server data like XP, warnings, ranks, inventory, economy balances (server-specific), and moderation records. This function does not return any output — use $getMemberVar to read. To reset, use $resetMemberVar.
