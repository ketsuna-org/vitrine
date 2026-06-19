---
layout: doc
title: $getTextSplitIndex
translation_key: docs
category: "Math & Text"
function_name: getTextSplitIndex
syntax: $getTextSplitIndex
description: Returns the current index during text-spreads iteration within loops. Useful for tracking position inside a spreads loop.
---
# $getTextSplitIndex — Current Spreads Iteration Index

`$getTextSplitIndex` returns the current position (index) during text-spreads iteration. It is typically used inside a spreads loop to know which element is being processed.

## Syntax

```
$getTextSplitIndex
```

This function takes **no parameters**.

## Return Value

- **Type**: `string` (representing a number)
- Returns the zero-based index of the current element in a spreads iteration.
- Returns `"0"` if called outside a spreads loop context.

## Usage

When iterating over spreads elements, `$getTextSplitIndex` tells you the position:

```
$textSplit[red;green;blue;yellow;]
```

During iteration, `$getTextSplitIndex` produces:

| Element | Index |
|---------|-------|
| `red`   | `0`   |
| `green` | `1`   |
| `blue`  | `2`   |
| `yellow`| `3`   |

## Common Patterns

### Numbered List Output

```
$textSplit[First;Second;Third;]
$sendMessage[$math[$getTextSplitIndex+1]. $splitText]
```

### Conditional Logic Based on Position

```
$if[$getTextSplitIndex==0]
  This is the first element: $splitText
$endif
```

### Select First N Elements

```
$if[$getTextSplitIndex<5]
  $sendMessage[Element $math[$getTextSplitIndex+1]: $splitText]
$endif
```

## Important Notes

- **Zero-based**: The first element is at index `0`, not `1`. Add 1 for human-readable numbering.
- **Loop context only**: Meaningful values are only available inside a spreads iteration loop.
- **No parameter**: This function takes no arguments — calling it with any brackets `$getTextSplitIndex[]` may cause unexpected behavior.
