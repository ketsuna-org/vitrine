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

- **Omitted**: the variable is treated as **global** — accessible from any command, any user, any server.
- **User ID provided**: the variable is **user-scoped** — each user has their own independent value for the same variable name. Use `$authorID` to reference the current user.

## Storage Details

- All values are stored as strings. When reading back, you receive the exact string that was stored.
- Variable names are case-insensitive.
- Returns an empty string if the variable has never been set.

## Comparison with $var

| Aspect | $var | $getVar |
|--------|------|---------|
| Persistence | Execution only | Persistent (DB) |
| Scope | Local | Global or user |
| Performance | Fast (in-memory) | DB read |
| Use case | Temporary calculations | Long-term storage |
