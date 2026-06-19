---
layout: doc
title: $getTextSplitLength
translation_key: docs
category: "Math & Text"
function_name: getTextSplitLength
syntax: $getTextSplitLength
description: Returns the total number of elements in the current text split array.
---
# $getTextSplitLength — Count Split Elements

`$getTextSplitLength` returns the number of elements in the current text split array — the total count of pieces produced by the most recent `$textSplit` call.

## Syntax

```
$getTextSplitLength
```

This function takes **no parameters**.

## Return Value

- **Type**: `string` (representing a number)
- Returns the total number of elements. For example, splitting `"a;b;c"` by `;` yields `3`.
- Returns `"0"` if no `$textSplit` has been called yet.

## Usage

```
$textSplit[apple;banana;orange;grape;]
$getTextSplitLength  → "4"
```

```
$textSplit[hello world; ]
$getTextSplitLength  → "2"
```

## Common Patterns

### Bounds Checking

Prevent out-of-bounds access by validating index first:

```
$textSplit[$message; ]
$if[$getTextSplitLength>2]
  $sendMessage[Third argument: $splitText[2]]
$else
  $sendMessage[Please provide at least 3 arguments]
$endif
```

### Conditional Empty Check

```
$textSplit[$getUserVar[list];,]
$if[$getTextSplitLength==0]
  $sendMessage[The list is empty]
$else
  $sendMessage[The list contains $getTextSplitLength items]
$endif
```

### Iteration Count Display

Display progress inside a split loop:

```
Processing element $math[$getTextSplitIndex+1] of $getTextSplitLength...
```

## Important Notes

- **Read-only**: This function reports the count; it does not modify the split array.
- **After each $textSplit**: The length reflects the most recent split. Calling `$textSplit` again resets it.
- **No parameter**: This function takes no arguments.
