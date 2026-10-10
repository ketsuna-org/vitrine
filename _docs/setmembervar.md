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

When called with two arguments, it sets the variable for the current command author in the current guild. When a User ID is provided, it sets for that user in the current guild. When both User ID and Guild ID are provided, it sets for the exact guild-member combination. An empty User ID or Guild ID counts as omitted. The function takes 2 to 4 arguments. If the server or the user is missing (for example in a DM), the error `A server and user are required for guildMember variables.` is raised.

The scope is `guildMember`. Writing: the value (any text, stored as a string) is stored for the selected context. The variable does not have to be declared beforehand: if no variable with this name is declared for this scope in the Variables catalogue, the first write declares it, **using the written value as its default value**, so any context that has no stored value then reads that first value instead of an empty string. The name is trimmed, a leading `bc_` is ignored, and an empty name raises an error. Stored values are case-sensitive (`Score` and `score` are two different values). It is ideal for per-user-per-server data like XP, warnings, ranks, inventory, economy balances (server-specific), and moderation records. This function does not return any output (empty string) — use $getMemberVar to read. To reset, use $resetMemberVar.

## Examples

### Increase User Reputation

```bdfd
$setMemberVar[reputation;$sum[$getMemberVar[reputation;$authorID];1];$authorID]
$title[Reputation +1 ⭐]
$description[<@$authorID> now has **$getMemberVar[reputation;$authorID]** reputation points!]
$color[#FEE75C]
```
