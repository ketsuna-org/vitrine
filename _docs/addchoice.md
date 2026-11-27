---
layout: doc
title: $addChoice[]
translation_key: docs
category: "Components & Interactions"
function_name: addChoice
syntax: $addChoice[choicename;choicevalue]
description: "Adds an autocomplete choice"
---
# $addChoice — Adds an autocomplete choice

## Syntax

```
$addChoice[choicename;choicevalue]
```

## Parameters

- **choicename** *(text, required)* — The name for this choice
- **choicevalue** *(text, required)* — The value for this choice

## Return Value

- String.

## Usage

```
$addChoice[choicename;choicevalue] → result
```

## Example

```bdfd
$addChoice[Pizza;pizza]
```
