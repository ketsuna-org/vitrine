---
layout: doc
title: $editSplitText[]
translation_key: docs
category: "Math & Text"
function_name: editSplitText
syntax: $editSplitText[index;newValue]
description: Replaces the value of a split element at the specified index with a new value.
parameters:
  - name: index
    type: integer
    required: true
    description: The zero-based index of the element to modify. Negative indices are supported.
  - name: newValue
    type: string
    required: true
    description: The new text value to set at the specified index.
returns:
  type: none (action only)
  description: This function is an action — it modifies the split array in place and does not return a value inline.
related:
  - textSplit
  - splitText
  - removeSplitTextElement
  - joinSplitText
examples:
  - title: Replace a specific element
    code: |
      $textSplit[apple;banana;orange;grape;]
      $editSplitText[1;kiwi]
      $sendMessage[$splitText[1]]
      Result: "kiwi"
  - title: Transform and rejoin
    code: |
      $textSplit[hello;world;foo;]
      $editSplitText[2;bar]
      $sendMessage[$joinSplitText[ ]]
      Result: "hello world bar"
  - title: Replace last element
    code: |
      $textSplit[1;2;3;4;]
      $editSplitText[-1;five]
      $sendMessage[$splitText[-1]]
      Result: "five"
---
# $editSplitText — Modify Split Element

`$editSplitText` replaces the value of a specific element in the current text split array. Use it to transform, correct, or update individual split pieces before rejoining or further processing.

## Syntax

```
$editSplitText[index;newValue]
```

## Parameters

- **index** *(integer, required)* — The zero-based position of the element to edit. Negative indices count from the end (`-1` = last element).
- **newValue** *(string, required)* — The replacement text. Can be any string, including empty.

## Behavior

- **Action-only**: `$editSplitText` is not an inline function. It modifies the internal split array directly.
- The change is permanent for the remainder of the current command execution.
- Subsequent calls to `$splitText[index]` or `$joinSplitText` reflect the modification.
- Editing an out-of-bounds index has no effect (no error emitted).

## Usage

```
$textSplit[John;Jane;Bob;Alice;]
$editSplitText[0;Jonathan]
$splitText[0]  → "Jonathan"
```

```
$textSplit[red;green;blue;]
$editSplitText[-1;purple]
$joinSplitText[, ]  → "red, green, purple"
```

## Common Patterns

### Title-Casing Names

```
$textSplit[$message; ]
$editSplitText[0;$toTitlecase[$splitText[0]]]
```

### Fixing Specific Values

```
$textSplit[$getUserVar[permissions];,]
$editSplitText[2;admin]
$var[updated;$joinSplitText[,]]
```

### Clearing Sensitive Data

```
$editSplitText[3;***REDACTED***]
```

## Important Notes

- **In-place mutation**: The split array is modified directly. The original value is lost.
- **Works with any index**: Both positive and negative indices are supported.
- **No return value**: Do not use `$editSplitText` inside expressions expecting a value.
- **Requires prior split**: Must be called after `$textSplit`, otherwise nothing happens.
