---
layout: doc
title: $getServerVar[]
translation_key: docs
category: "Variables"
function_name: getServerVar
syntax: $getServerVar[name] or $getServerVar[name;Guild ID]
description: "Reads the value of a guild-scoped variable. Alias: $getGuildVar. Returns the stored value for the current server, or a specific server when a Guild ID is provided."
---
$getServerVar reads a variable scoped to a Discord guild (server). The variable value is shared by all members within that server context. $getGuildVar is an exact alias and can be used interchangeably.

When called with only a `name`, it reads from the guild where the command is being executed (`((guild.id))`). When a Guild ID is provided as the second argument, the variable is read from the specified guild; an empty Guild ID counts as omitted. If there is no current server, the error `Missing context for guild variables.` is raised. The function takes 1 or 2 arguments.

Reading: the value stored for the selected context is returned. If nothing is stored there (or the stored value is empty, `null` or `empty/null`), the default value declared for this variable in the Bot Creator Variables catalogue is returned and stored when it is not empty; otherwise an empty string is returned. The name is trimmed and a leading `bc_` is ignored. Stored values are case-sensitive (`Score` and `score` are two different values), while declared defaults are matched case-insensitively.

## Examples

### Server Auto-Role

```bdfd
$title[Guild Configuration]
$description[Auto-role ID: <@&$getServerVar[autoRole]>]
$color[#5865F2]
```
