---
layout: doc
title: $autocomplete[]
translation_key: docs
category: "Interactions"
function_name: autocomplete
syntax: $autocomplete
description: "Forces the autocomplete answer. The suggestions added with $appendOptionSuggestion are sent when the script ends, so it has no other effect."
---
# $autocomplete — Forces the autocomplete answer. The suggestions added with $appendOptionSuggestion are sent when the script ends, so it has no other effect.

## Syntax

```
$autocomplete
```

## Parameters

None.

## Return Value

- String.

## Usage

```
$autocomplete → result
```

## Example

```bdfd
$sendMessage[$autocomplete]
```
