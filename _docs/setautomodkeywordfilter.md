---
layout: doc
title: $setAutomodKeywordFilter[]
translation_key: docs
category: "AutoMod"
function_name: setAutomodKeywordFilter
syntax: $setAutomodKeywordFilter[words]
description: "Stages the forbidden words of the rule that the next $editAutomodRule sends."
---
# $setAutomodKeywordFilter — Stages the forbidden words of the rule that the next $editAutomodRule sends.

## Syntax

```
$setAutomodKeywordFilter[words]
```

## Parameters

- **words** *(String, required)* — Words, one per argument or comma separated

## Return Value

- None.

## Usage

```
$setAutomodKeywordFilter[words] → result
```

## Example

```bdfd
$sendMessage[$setAutomodKeywordFilter[words]]
```
