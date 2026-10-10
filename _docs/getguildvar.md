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

When called with only a `name`, it reads from the guild where the command is being executed (`((guild.id))`). When a Guild ID is provided as the second argument, the variable is read from the specified guild; an empty Guild ID counts as omitted. If there is no current server, the error `Missing context for guild variables.` is raised. The function takes 1 or 2 arguments.

Reading: the value stored for the selected context is returned. If nothing is stored there (or the stored value is empty, `null` or `empty/null`), the default value declared for this variable in the Bot Creator Variables catalogue is returned and stored when it is not empty; otherwise an empty string is returned. The name is trimmed and a leading `bc_` is ignored. Stored values are case-sensitive (`Score` and `score` are two different values), while declared defaults are matched case-insensitively.

> **JavaScript (BDJS) equivalent:** `await db.guild.get('name')` — see [db.guild](/docs/javascript/db-guild/).

## Examples

### Server Configuration

```bdfd
$title[Server Settings]
$description[Prefix: `$getGuildVar[prefix;$guildID]`\nWelcome channel: <#$getGuildVar[welcomeChan;$guildID]>]
$color[#5865F2]
```
