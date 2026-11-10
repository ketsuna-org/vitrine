---
layout: doc
title: $toggleVar[]
translation_key: docs
category: "Variables"
function_name: toggleVar
syntax: $toggleVar[variable;(scope);(target);(guildID)]
description: "Flips a variable between `true` and `false` and returns the new value. An empty variable counts as `false`."
---
# $toggleVar — Flips a variable between `true` and `false` and returns the new value

## Syntax

```
$toggleVar[variable;(scope);(target);(guildID)]
```

## Parameters

- **variable** *(text, required)* — The variable name.
- **scope** *(text, optional)* — Same as `$increment`. Default: `user`.
- **target** *(ID, optional)* — Same as `$increment`.
- **guildID** *(ID, optional)* — Same as `$increment`.

## Return Value

- `true` or `false`.

## Usage

```
$toggleVar[notifications] → "true"
```

## Example

```bdfd
$sendMessage[$toggleVar[notifications]]
```
