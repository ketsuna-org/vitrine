---
layout: doc
title: $canModerate[]
translation_key: docs
category: "Server Helpers"
function_name: canModerate
syntax: $canModerate[targetID;(actorID)]
description: "Tells whether a sanction on a member is possible by the role hierarchy: the actor AND the bot must be above the target."
---
# $canModerate — Tells whether a sanction on a member is possible by the role hierarchy: the actor AND the bot must be above the target

## Syntax

```
$canModerate[targetID;(actorID)]
```

## Parameters

- **targetID** *(ID, required)* — The member to sanction.
- **actorID** *(ID, optional)* — Default: the author of the command.

## Return Value

- `true` or `false`.

## Usage

```
$onlyIf[$canModerate[$mentioned[1]]==true;You cannot sanction this member.]
```

## Important Notes

- It is `false` for the server owner, for the actor himself and for the bot.
- The server owner, as actor, is above everyone.
- It checks the hierarchy only; use `$onlyPerms` for the permission itself.

## Example

```bdfd
$sendMessage[$onlyIf[$canModerate[$mentioned[1]]==true;You cannot sanction this member.]]
```
