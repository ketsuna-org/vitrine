---
title: "$resetGlobalUserVar"
description: "Reset a global-user value to its declared default."
api_type: bdfd
status: extension
---

# $resetGlobalUserVar

**Bot Creator extension, not an official BDFD function.**

```text
$resetGlobalUserVar[Variable name;(User ID)]
```

Resets one value in global-user storage (`user`) to its declared default.
When no user is supplied, it resets the author's value. It never resets every
user and never changes server-member storage (`guildMember`).

This extension preserves historical `$resetUserVar` behavior when migrating
old Bot Creator commands. Official `$resetUserVar` instead acts on user values
per server and resets all users when its user argument is absent.

## Example

Declare `warnings` with a default of `0` in global-user storage first.

```bdfd
$setVar[warnings;3;$authorID]
$resetGlobalUserVar[warnings;$authorID]
Warnings: $getVar[warnings;$authorID]
```

This resets only the author's shared value, leaving server-member values alone.
