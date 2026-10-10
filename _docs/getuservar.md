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

The optional User ID selects another user; the optional Guild ID selects another server. An empty User ID uses the author and an empty Guild ID uses the current server. The function takes 1 to 3 arguments. If the server or the user is missing (for example in a DM), the error `A server and user are required for guildMember variables.` is raised. For a user value shared across all servers, use `$getVar[name;User ID]`.

Bots that still use the legacy user-variable setting (not yet migrated) read a user value shared across all servers when no Guild ID is given; giving a Guild ID selects the server-member value.

Reading: the value stored for the selected context is returned. If nothing is stored there (or the stored value is empty, `null` or `empty/null`), the default value declared for this variable in the Bot Creator Variables catalogue is returned and stored when it is not empty; otherwise an empty string is returned. The name is trimmed and a leading `bc_` is ignored. Stored values are case-sensitive (`Score` and `score` are two different values), while declared defaults are matched case-insensitively.

> **JavaScript (BDJS) equivalent:** `await db.user.get('name')` — see [db.user](/docs/javascript/db-user/).

## Examples

### User Wallet Balance

```bdfd
$title[User Balance 🪙]
$description[<@$authorID>, you have **$getUserVar[coins;$authorID]** coins in your wallet!]
$color[#FEE75C]
```
