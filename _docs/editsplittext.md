---
layout: doc
title: $editSplitText[]
translation_key: docs
category: "Math & Text"
function_name: editSplitText
syntax: $editSplitText[index;newValue]
description: Replaces the element at the given 1-based position of the current split text (made by $textSplit) with a new value.
---
# $editSplitText — Modify a Split Element

`$editSplitText` replaces one element of the current split-text list, the list filled by `$textSplit[text;separator]`. It returns an empty string.

## Syntax

```
$editSplitText[index;newValue]
```

## Parameters

- **index** *(integer, required)* — The **1-based** position of the element to replace (`1` is the first element). Surrounding spaces are ignored. A value that is not a whole number raises `Expected an integer in argument 1.`
- **newValue** *(string, required)* — The replacement text, used as written (spaces are kept). It can be empty.

## Behavior

- The list must have been created with `$textSplit[text;separator]` earlier in the command; the list lives for the current command execution.
- An index below 1 (including `0` and negative numbers), above the number of elements, or any index when no `$textSplit` was run, raises the error `Split index out of range.` Negative indexes do **not** count from the end.
- The change is kept for the rest of the command: `$splitText[index]` and `$joinSplitText[separator]` show the modified list. The number of elements (`$getTextSplitLength`) does not change.
- Exactly two arguments are accepted.

## Usage

```
$textSplit[John,Jane,Bob;,]
$editSplitText[1;Jonathan]
$splitText[1]  → "Jonathan"
```

```
$textSplit[red,green,blue;,]
$editSplitText[3;purple]
$joinSplitText[, ]  → "red, green, purple"
```

## Common Patterns

### Title-Casing the first word

```
$textSplit[$message; ]
$editSplitText[1;$toTitleCase[$splitText[1]]]
```

### Fixing a specific value

```
$textSplit[$getUserVar[permissions];,]
$editSplitText[3;admin]
$var[updated;$joinSplitText[,]]
```

## Important Notes

- **In-place change**: the original element is lost.
- **Indexes start at 1**, as for `$splitText[]`, `$removeSplitTextElement[]` and `$getTextSplitIndex[]`.
- **Requires a prior split** and a valid index, otherwise an error is raised (nothing is silently ignored).

## Examples

### Modifying an Element

```bdfd
$textSplit[apple,banana,orange;,]
$editSplitText[2;mango]
$title[List Element Updated]
$description[Replaced element 2 with **$splitText[2]**.
Full list: `$joinSplitText[, ]`]
$color[#57F287]
```
