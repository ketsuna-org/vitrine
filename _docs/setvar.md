---
layout: doc
title: $setVar[]
translation_key: docs
category: "Variables"
function_name: setVar
syntax: $setVar[name;value;(User ID)]
description: Creates or updates a global variable or a user-scoped variable in the bot's persistent storage.
---

$setVar writes values to the bot's persistent database. This is the counterpart to `$getVar` and is used for any data that needs to survive beyond the current command execution.

## Global vs User-Scoped Variables

The third parameter determines the scope:

- **Omitted or empty**: the variable is stored as **global** — accessible from any command, any user, any server. Use sparingly for configuration or shared data.
- **User ID provided**: the variable is **user-scoped** (one value per user, shared by all servers) — each user gets their own independent copy. Perfect for coins, XP, settings, and any per-user data. Read it back with `$getVar[name;User ID]`.

## Important Considerations

- **All values are text**. If you need numeric operations, use `$sum`, `$sub`, `$multi`, `$divide` to calculate before storing.
- **Overwrite behavior**: calling `$setVar` on an existing variable replaces its value — there is no append mode.
- **Case sensitivity**: `$setVar[Score;100]` and `$setVar[score;200]` write two different variables. The name is trimmed and cannot be empty.
- **No return value**: this function returns an empty string; use it as a standalone statement.
- **Declaration**: with a User ID, if no user variable with this name is declared yet, the first write declares it with the written value as its default value, so other users who have no stored value read that first value. A global write (no User ID) does not declare anything.

## Examples

### Save Global Variable

```bdfd
$setVar[announcementBanner;Welcome all new members!]
$title[Global Variable Set]
$description[Saved global banner: **$getVar[announcementBanner]**]
$color[#5865F2]
```
