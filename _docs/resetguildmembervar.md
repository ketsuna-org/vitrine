---
layout: doc
title: $resetGuildMemberVar[]
translation_key: docs
category: "Variables"
function_name: resetGuildMemberVar
syntax: $resetGuildMemberVar[name] or $resetGuildMemberVar[name;User ID] or $resetGuildMemberVar[name;User ID;Guild ID]
description: "Resets a guild-member-scoped variable to its default value (as defined in the Bot Creator Variables UI). Alias: $resetMemberVar."
---
$resetGuildMemberVar restores a guild-member-scoped variable to its default value defined in the Bot Creator Variables UI. If no default is declared for the variable, the error `No declared default for guildMember variable "name".` is raised and nothing is removed. A variable that was never declared in the Variables UI but was created by a `$set...Var` write has the first written value as its declared default. $resetMemberVar is an exact alias.

The function takes 1 to 3 arguments (`name`, optional `User ID`, optional `Guild ID`). The name cannot be empty.

- With only a `name`, it resets the variable for **every member of every server** where a value is stored (it does **not** target the command author).
- With a User ID, it resets that user's value in **every server** where a value is stored (not only the current server).
- With a User ID and a Guild ID, it resets the exact guild-member combination.
- The User ID must be a positive number made of digits only (otherwise `A valid user ID is required.`; an empty User ID is refused too, so a Guild ID cannot be given without a User ID); the Guild ID must be digits only (`A valid guild ID is required.`).

Use this function to clear warnings, reset XP after a season, remove moderation flags, or restore member defaults after an unban/unmute. After resetting, $getGuildMemberVar returns the default value. This function does not return any output (empty string).

## Examples

### Reset Member Warnings

```bdfd
$resetGuildMemberVar[warnings;$authorID;$guildID]
$title[Reset Member Warnings]
$description[Reset warnings for member <@$authorID> back to 0.]
$color[#57F287]
```
