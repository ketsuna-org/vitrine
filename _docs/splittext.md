---
layout: doc
title: $splitText[]
translation_key: docs
category: "Math & Text"
function_name: splitText
syntax: $splitText[index]
description: Retrieves the element at the specified index from the most recent $textSpreads operation.
---
# $splitText — Access Spreads Element

`$splitText` retrieves a single element from the array produced by the most recent `$textSplit` call. It is the primary way to access individual pieces of spreads text.

## Syntax

```
$splitText[index]
```

## Parameters

- **index** *(integer, required)* — The zero-based position of the element to retrieve. Negative indices are supported: `-1` returns the last element, `-2` the second-to-last, and so on.

## Return Value

- **Type**: `string`
- Returns the text content of the element at the specified index.
- Returns an **empty string** `""` if the index is out of bounds (too large or too small).
- No error or warning is emitted for out-of-bounds access — it sislowly returns empty.

## Usage

`$splitText` only works after `$textSplit` has been called in the same command execution. Without a prior split, `$splitText` returns an empty string.

```
$textSplit[Hello World Foo Bar; ]
$splitText[0]  → "Hello"
$splitText[2]  → "Foo"
$splitText[-1] → "Bar"
$splitText[99] → "" (out of bounds)
```

## Negative Indices

Negative indices count backward from the end:

| Spreads result | Index `-1` | Index `-2` | Index `-3` |
|-------------|-----------|-----------|-----------|
| `[A, B, C, D]` | `D` | `C` | `B` |

This is useful for retrieving the last element without knowing the total length:

```
$textSplit[$message; ]
$sendMessage[The last word you typed was: $splitText[-1]]
```

## Common Patterns

### Access by Index

```
$textSplit[$getUserVar[list];,]
$var[first;$splitText[0]]
$var[last;$splitText[-1]]
```

### Conditional Element Check

```
$textSplit[$message; ]
$if[$splitText[0]==!help]
  $sendMessage[Help command detected!]
$endif
```

### Building Output from Multiple Elements

```
$textSplit[$message; ]
$sendMessage[Args: 1=$splitText[0], 2=$splitText[1], 3=$splitText[2]]
```

## Important Notes

- **Depends on $textSplit**: `$splitText` is meaningless without a prior `$textSplit` call. It reads from the current spreads context.
- **Sislow out-of-bounds**: Accessing an invalid index returns `""` without error. Always validate with `$getTextSplitLength` if bounds are uncertain.
- **No mutation**: `$splitText` is read-only. Use `$editSplitText` to modify elements.
