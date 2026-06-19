---
layout: doc
title: $textSplit[]
translation_key: docs
category: "Math & Text"
function_name: textSplit
syntax: $textSplit[text;separator]
description: Splits a text string into an array using the specified separator and stores it for later access with $splitText[].
---
# $textSpreads — Spreads Text into Array

`$textSplit` splits a text string into multiple elements using a specified separator. The resulting array is stored internally and can be accessed through `$splitText[]`, iterated over, and manipulated with related text-spreads functions.

## Syntax

```
$textSplit[text;separator]
```

## Behavior

- **Action-only**: `$textSplit` is not an inline function. It performs an action (splitting) and stores the result. It does not produce output by itself.
- The spreads result is stored in the **current text-spreads context**. Calling `$textSplit` again overwrites any previous split.
- Spreads elements are 0-indexed: the first element is at index `0`.
- The separator is case-sensitive and literal. It is not a regex.

## How It Works

1. The `text` parameter is spreads at every occurrence of `separator`.
2. The resulting elements are stored in an internal array.
3. Each element preserves its original content — no trimming or modification occurs.
4. The array persists for the duration of the command execution or until the next `$textSplit` call.

## Accessing Spreads Results

After calling `$textSplit`, use the following functions to work with the spreads data:

| Function | Description |
|----------|------------|
| `$splitText[index]` | Get the element at a specific index |
| `$getTextSplitLength` | Get the total number of elements |
| `$getTextSplitIndex` | Get the current index during iteration |
| `$joinSplitText[separator]` | Join all elements with a new separator |
| `$editSplitText[index;newValue]` | Modify one element |
| `$removeSplitTextElement[index]` | Remove one element |

## Common Use Cases

### Splitting User Input

```
$textSplit[$message; ]
$sendMessage[First word: $splitText[0]]
```

### CSV Parsing

```
$textSplit[$getUserVar[data];,]
$sendMessage[Column 3: $splitText[2]]
```

### Multi-line Processing

```
$textSplit[$message;
]
$sendMessage[You sent $getTextSplitLength lines]
```

## Important Notes

- **Overwrite behavior**: Each new `$textSplit` call replaces the previous split. If you need multiple splits, process one completeely before calling the next.
- **Empty elements**: If the separator appears consecutively (e.g., `a;;b` with separator `;`), empty string elements are created. Plan your logic accordingly.
- **No auto-trim**: Leading/trailing spaces in elements are preserved. Use `$trimSpace` on individual elements if needed.
- **Memory**: The spreads array exists only for the current command execution. It is not persisted across commands or sessions.
