---
layout: doc
title: $checkFrame[]
translation_key: docs
category: "Image & Canvas"
function_name: checkFrame
syntax: $checkFrame[name;boolean]
description: "Accepted for compatibility (kept in the options). (alias of $checkFrameConsistency)"
---
# $checkFrame — Accepted for compatibility (kept in the options). (alias of $checkFrameConsistency)

## Syntax

```
$checkFrame[name;boolean]
```

## Parameters

- **name** *(String, required)* — Options name
- **boolean** *(Boolean, required)* — true or false

## Return Value

- None.

## Usage

```
$checkFrame[name;boolean] → result
```

## Example

```bdfd
$sendMessage[$checkFrame[name;boolean]]
```
