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

Resets the value of a variable in global-user storage (`user`) to its declared default. It never changes server-member storage (`guildMember`).

- **With a user ID**, it resets only that user's value.
- **Without a user ID**, it resets the variable for **every user** that has a stored value: it does *not* default to the author. Pass `$authorID` to reset only the author's value.

The variable must be declared in global-user storage with a default value, otherwise the function fails with `No declared default for user variable "<name>".` An empty name raises `A variable name is required.`, and a user ID that is not a positive number raises `A valid user ID is required.` The function takes 1 or 2 arguments and returns an empty string.

When migrating a script, `$resetUserVar[name;user]` written without a server is rewritten by the Bot Creator migration into `$resetGlobalUserVar[name;user]` (using `$authorID` when no user was given). The official-semantics `$resetUserVar` of the engine works on server-member storage, and it also resets every user when its user argument is absent.

## Example

Declare `warnings` with a default of `0` in global-user storage first.

```bdfd
$setVar[warnings;3;$authorID]
$resetGlobalUserVar[warnings;$authorID]
Warnings: $getVar[warnings;$authorID]
```

This resets only the author's shared value, leaving the values of other users and the server-member values alone.

## Notes

- Behavior read from the engine code (`variable_functions.dart`, `variable_service.dart`); it could not be run offline because it needs a declared variable in the bot's storage.
