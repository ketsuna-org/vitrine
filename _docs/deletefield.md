---
layout: doc
title: $deleteField[]
translation_key: docs
category: "Embed & Message"
function_name: deleteField
syntax: $deleteField[fieldindex;(index)]
description: "Deletes an embed field"
---
# $deleteField — Deletes an embed field

## Syntax

```
$deleteField[fieldindex;(index)]
```

## Parameters

- **fieldindex** *(number, required)* — The index field to delete
- **index** *(number, optional)* — The index to delete this field on

## Return Value

- String.

## Usage

```
$deleteField[fieldindex;(index)] → result
```

## Example

```bdfd
$addField[A;B]
$addField[C;D]
$deleteField[0]
```
