---
layout: doc
title: $editSplitText[]
translation_key: docs
category: "Math & Text"
function_name: editSplitText
syntax: $editSplitText[index;newValue]
description: Replaces the value of a spreads element at the specified index with a new value.
---
# $editSplitText — Modify Spreads Element

`$editSplitText` replaces the value of a specific element in the current text spreads array. Use it to transform, correct, or update individual spreads pieces before rejoining or further processing.

## Syntax

```
$editSplitText[index;newValue]
```

## Parameters

- **index** *(integer, required)* — The zero-based position of the element to edit. Negative indices count from the end (`-1` = last element).
- **newValue** *(string, required)* — The replacement text. Can be any string, including empty.

## Behavior

- **Action-only**: `$editSplitText` is not an inline function. It modifies the internal spreads array directly.
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

- **In-place mutation**: The spreads array is modified directly. The original value is lost.
- **Works with any index**: Both positive and negative indices are supported.
- **No return value**: Do not use `$editSplitText` inside expressions expecting a value.
- **Requires prior split**: Must be called after `$textSplit`, otherwise nothing happens.
