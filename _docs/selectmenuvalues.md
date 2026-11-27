---
layout: doc
title: $selectMenuValues[]
translation_key: docs
category: "Components & Interactions"
function_name: selectMenuValues
syntax: $selectMenuValues[(index);(separator)]
description: "Returns select menu values"
---
# $selectMenuValues — Returns select menu values

## Syntax

```
$selectMenuValues[(index);(separator)]
```

## Parameters

- **index** *(number, optional)* — The index of the value
- **separator** *(text, optional)* — The separator to use for each value

## Return Value

- String[].

## Usage

```
$selectMenuValues[(index);(separator)] → result
```

## Example

```bdfd
$selectMenuValues[;|]/$selectMenuValues[1]
```
