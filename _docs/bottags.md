---
layout: doc
title: $botTags[]
translation_key: docs
category: "Entity Info"
function_name: botTags
syntax: $botTags[(separator)]
description: "Returns the client tags"
---
# $botTags — Returns the client tags

## Syntax

```
$botTags[(separator)]
```

## Parameters

- **separator** *(text, optional)* — The separator to use for every tag

## Return Value

- String[].

## Usage

```
$botTags[(separator)] → result
```

## Example

```bdfd
$sendMessage[$botTags]
```
