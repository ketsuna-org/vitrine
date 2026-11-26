---
layout: doc
title: $automodMatchedKeyword[]
translation_key: docs
category: "Events"
function_name: automodMatchedKeyword
syntax: $automodMatchedKeyword
description: "Keyword that matched. (AutoMod events)."
---
# $automodMatchedKeyword — Keyword that matched. (AutoMod events).

## Syntax

```
$automodMatchedKeyword
```

## Parameters

None.

## Return Value

- String.

## Usage

```
$automodMatchedKeyword → result
```

## Example

```bdfd
$sendMessage[$automodMatchedKeyword]
```
