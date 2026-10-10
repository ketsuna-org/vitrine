---
layout: doc
title: $getVar[]
translation_key: docs
category: "Variables"
function_name: getVar
syntax: $getVar[name;(User ID)]
description: Reads a global variable or a user-scoped variable from the bot's persistent storage.
---

$getVar retrieves values from the bot's persistent storage. Unlike temporary variables (`$var`), global and user-scoped variables survive across command executions and bot restarts. They are stored in the bot's database.

## Global vs User-Scoped Variables

The second parameter determines the scope:

- **Omitted or empty**: the variable is treated as **global** — accessible from any command, any user, any server.
- **User ID provided**: the variable is **user-scoped** (the value shared by all servers for this user) — each user has their own independent value for the same variable name. Use `$authorID` to reference the current user. This is a different storage from `$getUserVar` (which reads the value of the member in a server, except in bots that still use the legacy user-variable setting).

## Storage Details

- Values written by `$setVar` are stored as text. When reading back, you receive the exact string that was stored.
- The name is trimmed. Names are case-sensitive for stored values: `Score` and `score` are two different variables. An empty name raises an error.
- A global variable that has never been set returns an empty string, and reading it creates it with an empty value (it then exists for `$varExists`).
- A user-scoped variable that has no value for that user returns the default value declared for it (see below), or an empty string if none.
- The default of a user-scoped variable is declared in the Variables catalogue, or automatically by the first `$setVar[name;value;User ID]` write for that name, which uses the written value as the default for every user who has no stored value.

## Comparison with $var

| Aspect | $var | $getVar |
|--------|------|---------|
| Persistence | Execution only | Persistent (bot storage) |
| Scope | Local | Global or user |
| Use case | Temporary calculations | Long-term storage |

## Examples

### Read Global Variable

```bdfd
$title[Global Setting]
$description[Maintenance mode: `$getVar[maintenanceMode]`]
$color[#5865F2]
```
