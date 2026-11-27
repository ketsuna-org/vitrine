---
layout: doc
title: $frameConsistency[]
translation_key: docs
category: "Image & Canvas"
function_name: frameConsistency
syntax: $frameConsistency[name;boolean]
description: "Accepted for compatibility (kept in the options). (alias of $checkFrameConsistency)"
---
# $frameConsistency — Accepted for compatibility (kept in the options). (alias of $checkFrameConsistency)

## Syntax

```
$frameConsistency[name;boolean]
```

## Parameters

- **name** *(String, required)* — Options name
- **boolean** *(Boolean, required)* — true or false

## Return Value

- None.

## Usage

```
$frameConsistency[name;boolean] → result
```

## Example

```bdfd
$sendMessage[$frameConsistency[name;boolean]]
```
