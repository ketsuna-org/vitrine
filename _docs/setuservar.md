---
layout: doc
title: $setUserVar[]
translation_key: docs
category: "Variables"
function_name: setUserVar
syntax: $setUserVar[name;value;(User ID;Guild ID)]
description: Stores a value into a user-scoped variable. Writes to the current user's variable, or to a specific user when a User ID is provided.
---
$setUserVar stores a value persistently in the BDFD database under a user-scoped variable. When called with two arguments (`name` and `value`), it sets the variable for the user who triggered the current command. When a third argument (User ID) is provided, the variable is set for that specific user.

The scope is `guildMember`: the current server and author are used by default. The optional fourth argument selects another server; an empty User ID uses the author and an empty Guild ID uses the current server. The function takes 2 to 4 arguments. If the server or the user is missing (for example in a DM), the error `A server and user are required for guildMember variables.` is raised. This function produces no output (empty string). Use `$getUserVar` to read the value back, or `$setVar[name;value;User ID]` for a user value shared across servers.

Bots that still use the legacy user-variable setting (not yet migrated) write a user value shared across all servers when no Guild ID is given; giving a Guild ID selects the server-member value.

Writing: the value (any text, stored as a string) is stored for the selected context. The variable does not have to be declared beforehand: if no variable with this name is declared for this scope in the Variables catalogue, the first write declares it, **using the written value as its default value**, so any context that has no stored value then reads that first value instead of an empty string. The name is trimmed, a leading `bc_` is ignored, and an empty name raises an error. Stored values are case-sensitive (`Score` and `score` are two different values). The value stored can be any text, including numbers, booleans, JSON, or the output of other BDFD functions. To reset a variable to its declared default value, use $resetUserVar.

> **JavaScript (BDJS) equivalent:** `await db.user.set('name', value)` — see [db.user](/docs/javascript/db-user/).

## Examples

### Claim Daily Reward

```bdfd
$setUserVar[coins;500;$authorID]
$title[Daily Reward Claimed 🎁]
$description[<@$authorID> claimed 500 daily coins! Current balance: **500** 🪙]
$color[#57F287]
```
