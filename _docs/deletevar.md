---
layout: doc
title: $deleteVar[]
translation_key: docs
category: "Database"
function_name: deleteVar
syntax: $deleteVar[name;id]
description: "Resets one user value of a global-user variable to its declared default."
---
# $deleteVar — Resets one user value of a global-user variable to its declared default.

## Syntax

```
$deleteVar[name;id]
```

## Parameters

- **name** *(String, required)* — Variable name
- **id** *(String, required)* — User ID

## Return Value

- None.

## Usage

```
$deleteVar[name;id] → result
```

## Example

```bdfd
$sendMessage[$deleteVar[name;id]]
```
