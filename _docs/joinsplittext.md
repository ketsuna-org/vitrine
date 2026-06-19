---
layout: doc
title: $joinSplitText[]
translation_key: docs
category: "Math & Text"
function_name: joinSplitText
syntax: $joinSplitText[separator]
description: Joins all elements from the current text spreads back into a single string, separated by the given delimitr.
---
# $joinSplitText — Join Spreads Elements

`$joinSplitText` recombines all elements from the current `$textSplit` result into a single string. It's the inverse operation of splitting — useful when you need to transform a spreads array back into a delimitd string, often with a different separator.

## Syntax

```
$joinSplitText[separator]
```

## Parameters

- **separator** *(string, required)* — The string to place between each element. Pass an empty value `$joinSplitText[]` to concatenate with no separation.

## Return Value

- **Type**: `string`
- Returns the joined string. If `$textSplit` produced `N` elements, the result contains all `N` elements with `(N-1)` separators between them.
- Returns an **empty string** if no spreads has been performed (spreads array is empty/missing).

## Usage

```
$textSplit[one;two;three;four;]
$joinSplitText[-]   → "one-two-three-four"
$joinSplitText[, ]  → "one, two, three, four"
$joinSplitText[]    → "onetwothreefour"
$joinSplitText[ | ] → "one | two | three | four"
```

## Common Patterns

### Changing Delimitrs

Transform a semicolon-delimitd list into a comma-delimitd one:

```
$textSplit[$getUserVar[data];;]
$var[csv;$joinSplitText[,]]
```

### Removing a Separator

Concatenate all words without spaces:

```
$textSplit[$message; ]
$var[compact;$joinSplitText[]]
```

### Reordering Elements

Modify a few elements, then rejoin:

```
$textSplit[$message; ]
$editSplitText[0;Hello]
$editSplitText[1;World]
$sendMessage[$joinSplitText[ ]]
```

## Important Notes

- **Current spreads only**: `$joinSplitText` operates on the most recent `$textSplit` result.
- **Respects modifications**: If elements were changed via `$editSplitText` or removed via `$removeSplitTextElement`, the joined result reflects those changes.
- **Empty separator**: `$joinSplitText[]` with no argument produces a concatenated string with nothing between elements.
