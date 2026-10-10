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

When called with two arguments (`name` and `value`), it sets the variable for the current guild (`((guild.id))`). When a Guild ID is provided, the variable is set for the specified server; an empty Guild ID counts as omitted. If there is no current server, the error `Missing context for guild variables.` is raised. The function takes 2 or 3 arguments.

The scope is `guild`, meaning the value is shared server-wide. Writing: the value (any text, stored as a string) is stored for the selected context. The variable does not have to be declared beforehand: if no variable with this name is declared for this scope in the Variables catalogue, the first write declares it, **using the written value as its default value**, so any context that has no stored value then reads that first value instead of an empty string. The name is trimmed, a leading `bc_` is ignored, and an empty name raises an error. Stored values are case-sensitive (`Score` and `score` are two different values). This is ideal for server settings such as prefixes, welcome channels, auto-roles, logging channels, and similar configuration values. This function does not return any output — use $getGuildVar to read the value. To reset, use $resetGuildVar.

## Examples

### Set Moderation Log Channel

```bdfd
$setGuildVar[modLogChan;123456789012345678;$guildID]
$title[Audit Logs Configured]
$description[Moderation logs will be posted to <#123456789012345678>.]
$color[#57F287]
```
