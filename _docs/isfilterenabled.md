---
layout: doc
title: $isFilterEnabled[]
translation_key: docs
category: "Music"
function_name: isFilterEnabled
syntax: $isFilterEnabled[filter]
description: "Whether an audio filter is enabled."
---
# $isFilterEnabled — Whether an audio filter is enabled.

## Syntax

```
$isFilterEnabled[filter]
```

## Parameters

- **filter** *(String, required)* — Filter name

## Return Value

- Boolean.

## Usage

```
$isFilterEnabled[filter] → result
```

## Example

```bdfd
$sendMessage[$isFilterEnabled[filter]]
```
