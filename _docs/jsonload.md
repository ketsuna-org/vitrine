---
layout: doc
title: $jsonLoad[]
translation_key: docs
category: "HTTP & JSON"
function_name: jsonLoad
syntax: $jsonLoad[variable;json]
description: "Loads JSON to an env variable"
---
# $jsonLoad — Loads JSON to an env variable

## Syntax

```
$jsonLoad[variable;json]
```

## Parameters

- **variable** *(text, required)* — The variable to load json to
- **json** *(text, required)* — The json data

## Return Value

- String.

## Usage

```
$jsonLoad[variable;json] → result
```

## Example

```bdfd
$sendMessage[$jsonLoad[o;{"a":1}]$env[o;a]]
```
