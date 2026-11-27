---
layout: doc
title: $findApplicationEmoji[]
translation_key: docs
category: "Entity Info"
function_name: findApplicationEmoji
syntax: $findApplicationEmoji[query]
description: "Finds an application emoji of the client"
---
# $findApplicationEmoji — Finds an application emoji of the client

## Syntax

```
$findApplicationEmoji[query]
```

## Parameters

- **query** *(text, required)* — The id, format or emoji name to find

## Return Value

- ApplicationEmoji.

## Usage

```
$findApplicationEmoji[query] → result
```

## Example

```bdfd
$sendMessage[$findApplicationEmoji[logo]]
```
