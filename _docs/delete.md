---
layout: doc
title: $delete[]
translation_key: docs
category: "Variables"
function_name: delete
syntax: $delete[name]
description: "Deletes a local variable."
---
# $delete — Deletes a local variable.

## Syntax

```
$delete[name]
```

## Parameters

- **name** *(text, required)* — Variable name.

## Return Value

- string.

## Usage

```
$delete[n]
```

## Example

```bdfd
$let[n;1]
$delete[n]
$sendMessage[$has[n]]
```
