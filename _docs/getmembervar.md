---
layout: doc
title: $getMemberVar[]
translation_key: docs
category: "Variables"
function_name: getMemberVar
syntax: $getMemberVar[name] or $getMemberVar[name;User ID] or $getMemberVar[name;User ID;Guild ID]
description: "Reads the value of a guild-member-scoped variable. Alias: $getGuildMemberVar. Returns the stored value for the current member, or a specific member when IDs are provided."
---
$getMemberVar reads a variable scoped to a guild member — a specific user within a specific server. The context key is composed as `guildId:userId`, making the variable value unique per user per server. $getGuildMemberVar is an exact alias and can be used interchangeably.

When called with only a `name`, it reads the variable of the current command author in the current guild (`((guild.id)):((author.id))`). When a User ID is provided, the current guild is still used. When both User ID and Guild ID are provided, the variable is read from the exact guild-member combination.

Variables are defined and configured in the Bot Creator Variables UI, where you can set default values. If a variable has not been set via $setMemberVar but a default exists in the definitions, $getMemberVar returns that default. If neither exists, an empty string is returned.

> **JavaScript (BDJS) equivalent:** `await db.guildMember.get('name')` — see [db.guildMember](/docs/javascript/db-guild-member/).
