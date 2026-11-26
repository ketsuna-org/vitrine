---
layout: doc
title: $setAutomodRegexFilter[]
translation_key: docs
category: "AutoMod"
function_name: setAutomodRegexFilter
syntax: $setAutomodRegexFilter[regexes]
description: "Stages the regular expressions of the rule for the next $editAutomodRule."
---
# $setAutomodRegexFilter — Stages the regular expressions of the rule for the next $editAutomodRule.

## Syntax

```
$setAutomodRegexFilter[regexes]
```

## Parameters

- **regexes** *(String, required)* — Regular expressions (checked before use)

## Return Value

- None.

## Usage

```
$setAutomodRegexFilter[regexes] → result
```

## Example

```bdfd
$sendMessage[$setAutomodRegexFilter[regexes]]
```
