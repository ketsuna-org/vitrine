---
layout: doc
title: $getGuildMemberVar[]
translation_key: docs
category: "Variables"
function_name: getGuildMemberVar
syntax: $getGuildMemberVar[name] or $getGuildMemberVar[name;User ID] or $getGuildMemberVar[name;User ID;Guild ID]
description: "Reads the value of a guild-member-scoped variable. Alias: $getMemberVar. Returns the stored value for the current member, or a specific member when IDs are provided."
---
$getGuildMemberVar reads a variable scoped to a guild member — a specific user within a specific server. The context key is composed as `guildId:userId`, making the variable value unique per user per server. $getMemberVar is an exact alias and can be used interchangeably.

When called with only a `name`, it reads the variable of the current command author in the current guild (`((guild.id)):((author.id))`). When a User ID is provided, the current guild is still used. When both User ID and Guild ID are provided, the variable is read from the exact guild-member combination. An empty User ID or Guild ID counts as omitted. The function takes 1 to 3 arguments. If the server or the user is missing (for example in a DM), the error `A server and user are required for guildMember variables.` is raised.

Reading: the value stored for the selected context is returned. If nothing is stored there (or the stored value is empty, `null` or `empty/null`), the default value declared for this variable in the Bot Creator Variables catalogue is returned and stored when it is not empty; otherwise an empty string is returned. The name is trimmed and a leading `bc_` is ignored. Stored values are case-sensitive (`Score` and `score` are two different values), while declared defaults are matched case-insensitively.

## Examples

### Guild Member Level

```bdfd
$title[Member Level]
$description[User <@$authorID> is Level **$getGuildMemberVar[level;$authorID;$guildID]**!]
$color[#5865F2]
```
