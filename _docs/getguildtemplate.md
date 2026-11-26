---
layout: doc
title: $getGuildTemplate[]
translation_key: docs
category: "Entity Info"
function_name: getGuildTemplate
syntax: $getGuildTemplate[templatecode;(property)]
description: "Gets the data of a guild template."
---
# $getGuildTemplate — Gets the data of a guild template.

## Syntax

```
$getGuildTemplate[templatecode;(property)]
```

## Parameters

- **templatecode** *(text, required)* — The code of the template to get
- **property** *(text, optional)* — The property of the template to return

## Return Value

- Json,Unknown.

## Usage

```
$getGuildTemplate[templatecode;(property)] → result
```

## Example

```bdfd
$sendMessage[$getGuildTemplate[abc123;name]]
```
