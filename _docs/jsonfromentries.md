---
layout: doc
title: $jsonFromEntries[]
translation_key: docs
category: "HTTP & JSON"
function_name: jsonFromEntries
syntax: $jsonFromEntries[variable]
description: "Converts an array of entries into an object"
---
# $jsonFromEntries — Converts an array of entries into an object

## Syntax

```
$jsonFromEntries[variable]
```

## Parameters

- **variable** *(text, required)* — The variable to get entries from

## Return Value

- Json.

## Usage

```
$jsonFromEntries[variable] → result
```

## Example

```bdfd
$sendMessage[$let[e;[["x",1],["y",2]]]$jsonFromEntries[e]]
```
