---
layout: doc
title: $jsonFromPairs[]
translation_key: docs
category: "HTTP & JSON"
function_name: jsonFromPairs
syntax: $jsonFromPairs[(key;value;key;value;...)]
description: "Builds a JSON object without any quote to escape."
---
# $jsonFromPairs — Builds a JSON object without any quote to escape

## Syntax

```
$jsonFromPairs[(key;value;key;value;...)]
```

## Parameters

- **key** *(text, required)* — The name of the field.
- **value** *(text, required)* — `true`, `false` and `null` stay literals, a plain number of at most 15 digits is a number, anything else is text (so an ID never loses digits).

## Return Value

- string: the JSON text.

## Usage

```
$jsonFromPairs[name;Ann;age;30] → {"name":"Ann","age":30}
```

## Example

```bdfd
$sendMessage[$jsonFromPairs[name;Ann;age;30]]
```
