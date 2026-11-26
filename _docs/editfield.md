---
layout: doc
title: $editField[]
translation_key: docs
category: "Embed & Message"
function_name: editField
syntax: $editField[fieldindex;(name);(value);(inline);(index)]
description: "Edits an embed field"
---
# $editField — Edits an embed field

## Syntax

```
$editField[fieldindex;(name);(value);(inline);(index)]
```

## Parameters

- **fieldindex** *(number, required)* — The index field to edit
- **name** *(text, optional)* — The name for the field
- **value** *(text, optional)* — The value for the field
- **inline** *(boolean, optional)* — Whether this field will be inline
- **index** *(number, optional)* — The index to edit this data on

## Return Value

- String.

## Usage

```
$editField[fieldindex;(name);(value);(inline);(index)] → result
```

## Example

```bdfd
$addField[A;B]
$editField[0;New name;New value;yes]
```
