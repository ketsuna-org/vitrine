---
layout: doc
title: $setMemoryLimit[]
translation_key: docs
category: "Image & Canvas"
function_name: setMemoryLimit
syntax: $setMemoryLimit[name;limit]
description: "Sets the memory limit of a set of decode options (kept, the decoder has its own limits)."
---
# $setMemoryLimit — Sets the memory limit of a set of decode options (kept, the decoder has its own limits).

## Syntax

```
$setMemoryLimit[name;limit]
```

## Parameters

- **name** *(String, required)* — Options name
- **limit** *(Number, required)* — Limit

## Return Value

- None.

## Usage

```
$setMemoryLimit[name;limit] → result
```

## Example

```bdfd
$sendMessage[$setMemoryLimit[name;limit]]
```
