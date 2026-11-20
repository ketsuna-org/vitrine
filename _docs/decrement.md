---
layout: doc
title: $decrement[]
translation_key: docs
category: "Variables"
function_name: decrement
syntax: $decrement[variable;(amount);(scope);(target);(guildID);(returnValue)]
description: "Subtracts from a number variable and returns the new value."
---
# $decrement — Subtracts from a number variable and returns the new value

## Syntax

```
$decrement[variable;(amount);(scope);(target);(guildID);(returnValue)]
```

## Parameters

- **variable** *(text, required)* — The variable name.
- **amount** *(number, optional)* — Default: 1.
- **scope** *(text, optional)* — Same as `$increment`.
- **target** *(ID, optional)* — Same as `$increment`.
- **guildID** *(ID, optional)* — Same as `$increment`.
- **returnValue** *(true/false, optional)* — Same as `$increment`: `false` updates the variable without returning the new value.

## Return Value

- number.

## Usage

```
$decrement[coins;10]
```

## Example

```bdfd
$sendMessage[$decrement[coins;10]]
```
