---
layout: doc
title: $resetUserVar[]
translation_key: docs
category: "Variables"
function_name: resetUserVar
syntax: $resetUserVar[name] or $resetUserVar[name;User ID]
description: Resets the member-scoped value of a variable to its declared default value, for every member or for one user (as defined in the Bot Creator Variables UI). An error is raised if no default is declared.
---
$resetUserVar restores the server-member values of a variable (the ones written by `$setUserVar`) to the default value declared for that variable. If no default value is declared, the error `No declared default for guildMember variable "name".` is raised and nothing is removed. Global-user values used by `$getVar[name;User ID]` are preserved.

The function takes 1 or 2 arguments (`name`, optional `User ID`). The name cannot be empty.

- With only a `name`, it resets the variable for **every member of every server** where a value is stored. It does **not** target the command author only.
- With a User ID, it resets that user's value in **every server** where a value is stored (not only the current server). The User ID must be a positive number made of digits only, otherwise `A valid user ID is required.` (an empty User ID is refused too).

Bots that still use the legacy user-variable setting (not yet migrated) reset the user values shared across all servers instead of the server-member values.

A variable that was never declared in the Variables UI but was created by a `$set...Var` write has the first written value as its declared default. This function is useful for seasonal resets or reverting users' settings to their defaults. After resetting, `$getUserVar` returns the default value. This function does not return any output (empty string).

## Examples

### Reset User Bio

```bdfd
$resetUserVar[bio;$authorID]
$title[Profile Reset]
$description[Your bio has been reset to its default value on every server.]
$color[#5865F2]
```
