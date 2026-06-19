---
layout: doc
title: $splitText[]
translation_key: docs
category: "Math & Text"
function_name: splitText
syntax: $splitText[index]
description: Retrieves the element at the specified index from the most recent $textSplit operation.
parameters:
  - name: index
    type: integer
    required: true
    description: The zero-based index of the split element to retrieve. Negative indices count from the end (-1 = last element).
returns:
  type: string
  description: The text content of the split element at the given index. Returns an empty string if the index is out of bounds.
related:
  - textSplit
  - joinSplitText
  - getTextSplitIndex
  - getTextSplitLength
  - editSplitText
examples:
  - title: Get first element
    code: |
      $textSplit[one;two;three;four;five;]
      $sendMessage[First: $splitText[0]]
      Result: "First: one"
  - title: Get last element with negative index
    code: |
      $textSplit[alpha;beta;gamma;delta;]
      $sendMessage[Last: $splitText[-1]]
      Result: "Last: delta"
  - title: Iterate and display all elements
    code: |
      $textSplit[red;green;blue;]
      $sendMessage[$splitText[0] | $splitText[1] | $splitText[2]]
      Result: "red | green | blue"
---
# $splitText — Access Split Element

`$splitText` retrieves a single element from the array produced by the most recent `$textSplit` call. It is the primary way to access individual pieces of split text.

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
- No error or warning is emitted for out-of-bounds access — it silently returns empty.

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

| Split result | Index `-1` | Index `-2` | Index `-3` |
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

- **Depends on $textSplit**: `$splitText` is meaningless without a prior `$textSplit` call. It reads from the current split context.
- **Silent out-of-bounds**: Accessing an invalid index returns `""` without error. Always validate with `$getTextSplitLength` if bounds are uncertain.
- **No mutation**: `$splitText` is read-only. Use `$editSplitText` to modify elements.
