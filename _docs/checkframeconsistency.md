---
layout: doc
title: $checkFrameConsistency[]
translation_key: docs
category: "Image & Canvas"
function_name: checkFrameConsistency
syntax: $checkFrameConsistency[name;boolean]
description: "Accepted for compatibility (kept in the options)."
---
# $checkFrameConsistency — Accepted for compatibility (kept in the options).

## Syntax

```
$checkFrameConsistency[name;boolean]
```

## Parameters

- **name** *(String, required)* — Options name
- **boolean** *(Boolean, required)* — true or false

## Return Value

- None.

## Usage

```
$checkFrameConsistency[name;boolean] → result
```

## Example

```bdfd
$sendMessage[$checkFrameConsistency[name;boolean]]
```
