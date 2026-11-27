---
layout: doc
title: $setRAMLimit[]
translation_key: docs
category: "Image & Canvas"
function_name: setRAMLimit
syntax: $setRAMLimit[name;limit]
description: "Sets the memory limit of a set of decode options (kept, the decoder has its own limits). (alias of $setMemoryLimit)"
---
# $setRAMLimit — Sets the memory limit of a set of decode options (kept, the decoder has its own limits). (alias of $setMemoryLimit)

## Syntax

```
$setRAMLimit[name;limit]
```

## Parameters

- **name** *(String, required)* — Options name
- **limit** *(Number, required)* — Limit

## Return Value

- None.

## Usage

```
$setRAMLimit[name;limit] → result
```

## Example

```bdfd
$sendMessage[$setRAMLimit[name;limit]]
```
