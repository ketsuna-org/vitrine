---
layout: doc
title: $timestamp[]
translation_key: docs
category: "Embed & Message"
function_name: timestamp
syntax: $timestamp[(ms);(index)]
description: "Adds an embed timestamp"
---
# $timestamp — Adds an embed timestamp

## Syntax

```
$timestamp[(ms);(index)]
```

## Parameters

- **ms** *(number, optional)* — The timestamp time to add
- **index** *(number, optional)* — The index to add this data to

## Return Value

- String.

## Usage

```
$timestamp[(ms);(index)] → result
```

## Example

```bdfd
$addField[A;B]
$timestamp[0]
```
