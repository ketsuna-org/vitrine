---
layout: doc
title: $deleteGlobalVar[]
translation_key: docs
category: "Database"
function_name: deleteGlobalVar
syntax: $deleteGlobalVar[name]
description: "Removes a global variable."
---
# $deleteGlobalVar — Removes a global variable.

## Syntax

```
$deleteGlobalVar[name]
```

## Parameters

- **name** *(String, required)* — Variable name

## Return Value

- None.

## Usage

```
$deleteGlobalVar[name] → result
```

## Example

```bdfd
$sendMessage[$deleteGlobalVar[name]]
```
