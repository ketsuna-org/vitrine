---
layout: doc
title: $compareAndSetVar[]
translation_key: docs
category: "Variables"
function_name: compareAndSetVar
syntax: $compareAndSetVar[variable;expected;new;(scope);(target);(guildID)]
description: "Writes a value only while the variable still equals the expected one, and returns `true` or `false`. An empty expected value matches an empty variable."
---
# $compareAndSetVar — Writes a value only while the variable still equals the expected one, and returns `true` or `false`

## Syntax

```
$compareAndSetVar[variable;expected;new;(scope);(target);(guildID)]
```

## Parameters

- **variable** *(text, required)* — The variable name.
- **expected** *(text, required)* — The value the variable must have now. Empty means "not set yet".
- **new** *(text, required)* — The value to write.
- **scope** *(text, optional)* — Same as `$increment`. Default: `user`.
- **target** *(ID, optional)* — Same as `$increment`.
- **guildID** *(ID, optional)* — Same as `$increment`.

## Return Value

- `true` when the value was written, `false` when the variable had changed.

## Usage

```
$compareAndSetVar[legendary_owner;;$authorID;global] → "true" for the first caller, "false" for the others
```

## Important Notes

- The check and the write cannot be interleaved with another `$compareAndSetVar`, `$increment`, `$decrement` or `$toggleVar` on the same variable in the same bot process. Use it to claim a unique item or a legendary class.
- A plain `$setVar` is not part of this guarantee.

## Example

```bdfd
$if[$compareAndSetVar[legendary_owner;;$authorID;global]==true]
You are the first!
$else
Someone was faster.
$endif
```
