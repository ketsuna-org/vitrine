---
layout: doc
title: $env[]
translation_key: docs
category: "Variables"
function_name: env
syntax: $env[name;(key)]
description: "Reads a local variable, or a key of its JSON value."
---
# $env — Reads a local variable, or a key of its JSON value.

## Syntax

```
$env[name;(key)]
```

## Parameters

- **name** *(text, required)* — Variable name.
- **key** *(text, optional)* — Key or index to read inside the value (repeatable).

## Return Value

- string.

## Usage

```
$env[user;name] → "Ana"
```

## Example

```bdfd
$let[u;{"name":"Ana"}]
$sendMessage[$env[u;name]]
```
