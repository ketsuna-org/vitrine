---
layout: doc
title: $containsAll[]
translation_key: docs
category: "Lists & Helpers"
function_name: containsAll
syntax: $containsAll[text;wordList;(separator);(caseSensitive)]
description: "Tells whether the text contains every word of a list."
---
# $containsAll — Tells whether the text contains every word of a list

## Syntax

```
$containsAll[text;wordList;(separator);(caseSensitive)]
```

## Parameters

- **text** *(text, required)* — The text to check.
- **wordList** *(text, required)* — The words to look for.
- **separator** *(text, optional)* — The text between two items. Default: `,`. `\n` means a new line.
- **caseSensitive** *(`yes` or `no`, optional)* — Default: `no`.

## Return Value

- `true` or `false` (`false` when the word list is empty).

## Usage

```
$containsAll[Hello World;hello,world] → "true"
```

## Example

```bdfd
$sendMessage[$containsAll[Hello World;hello,world]]
```
