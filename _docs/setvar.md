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

- **Omitted**: the variable is stored as **global** — accessible from any command, any user, any server. Use sparingly for configuration or shared data.
- **User ID provided**: the variable is **user-scoped** — each user gets their own independent copy. Perfect for coins, XP, settings, and any per-user data.

## Important Considerations

- **All values are strings**. If you need numeric operations, use `$add`, `$sub`, `$mul`, `$div` to convert and calculate.
- **Overwrite behavior**: calling `$setVar` on an existing variable replaces its value — there is no append mode.
- **Case insensitivity**: `$setVar[Score;100]` and `$setVar[score;200]` target the same variable.
- **No return value**: this function performs a write action and returns void. It cannot be used inline in a string — use it as a standalone statement.
