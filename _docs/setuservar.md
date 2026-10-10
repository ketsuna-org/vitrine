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

The scope is `guildMember`: the current server and author are used by default. The optional fourth argument selects another server; an empty User ID uses the author. This function produces no output. Use `$getUserVar` to read the value back, or `$setVar[name;value;User ID]` for a user value shared across servers.

Existing bots without a completed variable migration retain their legacy user-global behavior until migrated.

Variables must first be defined in the Bot Creator Variables UI. The value stored can be any string, including numbers, booleans, JSON, or the output of other BDFD functions. To reset a variable to its default value, use $resetUserVar.

> **JavaScript (BDJS) equivalent:** `await db.user.set('name', value)` — see [db.user](/docs/javascript/db-user/).

## Examples

### Claim Daily Reward

```bdfd
$setUserVar[coins;500;$authorID]
$title[Daily Reward Claimed 🎁]
$description[<@$authorID> claimed 500 daily coins! Current balance: **500** 🪙]
$color[#57F287]
```
