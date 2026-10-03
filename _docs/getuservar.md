---
layout: doc
title: $getUserVar[]
translation_key: docs
category: "Variables"
function_name: getUserVar
syntax: $getUserVar[name] or $getUserVar[name;User ID] or $getUserVar[name;User ID;Guild ID]
description: Reads the value of a user-scoped variable. Returns the stored value for the current user, or a specific user when an ID is provided.
---
$getUserVar reads a persistent variable for a user in a server. With only a name, it uses the current author and current server. Values are isolated by the `guildMember` context `guildId:userId`.

The optional User ID selects another user; the optional Guild ID selects another server. An empty User ID uses the author. For a user value shared across all servers, use `$getVar[name;User ID]`.

Existing bots without a completed variable migration retain their legacy user-global behavior until migrated.

Variables are defined and configured in the Bot Creator Variables UI, where you can set default values. If a variable has not been set via $setUserVar but a default value exists in the definitions, $getUserVar returns that default. If neither a stored value nor a default exists, an empty string is returned.

> **JavaScript (BDJS) equivalent:** `await db.user.get('name')` — see [db.user](/docs/javascript/db-user/).

## Examples

### User Wallet Balance

```bdfd
$title[User Balance 🪙]
$description[<@$authorID>, you have **$getUserVar[coins;$authorID]** coins in your wallet!]
$color[#FEE75C]
$sendMessage[]
```
