---
layout: doc
title: $containsAny[]
translation_key: docs
category: "Lists & Helpers"
function_name: containsAny
syntax: $containsAny[text;wordList;(separator);(caseSensitive)]
description: "Tells whether the text contains at least one word of a list. Replaces many `$checkContains` calls."
---
# $containsAny — Tells whether the text contains at least one word of a list

## Syntax

```
$containsAny[text;wordList;(separator);(caseSensitive)]
```

## Parameters

- **text** *(text, required)* — The text to check.
- **wordList** *(text, required)* — The words to look for.
- **separator** *(text, optional)* — The text between two items. Default: `,`. `\n` means a new line.
- **caseSensitive** *(`yes` or `no`, optional)* — Default: `no`.

## Return Value

- `true` or `false`.

## Usage

```
$containsAny[Hello World;foo,world] → "true"
```

## Example

```bdfd
$sendMessage[$containsAny[Hello World;foo,world]]
```
