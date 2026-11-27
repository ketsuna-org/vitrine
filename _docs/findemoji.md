---
layout: doc
title: $findEmoji[]
translation_key: docs
category: "Entity Info"
function_name: findEmoji
syntax: $findEmoji[query]
description: "Finds an emoji"
---
# $findEmoji — Finds an emoji

## Syntax

```
$findEmoji[query]
```

## Parameters

- **query** *(text, required)* — The id, format or emoji name to find

## Return Value

- Emoji.

## Usage

```
$findEmoji[query] → result
```

## Example

```bdfd
$sendMessage[$findEmoji[wave]]
```
