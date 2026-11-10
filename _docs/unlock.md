---
layout: doc
title: $unlock[]
translation_key: docs
category: "Variables"
function_name: unlock
syntax: $unlock[name]
description: "Releases a lock taken with `$tryLock`."
---
# $unlock — Releases a lock taken with `$tryLock`

## Syntax

```
$unlock[name]
```

## Parameters

- **name** *(text, required)* — The lock name.

## Return Value

- Empty.

## Usage

```
$unlock[forge]
```

## Important Notes

- Releasing a lock that is not held does nothing.

## Example

```bdfd
$unlock[forge]
```
