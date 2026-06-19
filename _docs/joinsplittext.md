---
layout: doc
title: $joinSplitText[]
translation_key: docs
category: "Math & Text"
function_name: joinSplitText
syntax: $joinSplitText[separator]
description: Joins all elements from the current text split back into a single string, separated by the given delimiter.
parameters:
  - name: separator
    type: string
    required: true
    description: The delimiter to insert between each element in the resulting string. Can be empty to concatenate without any separator.
returns:
  type: string
  description: A single string containing all split elements joined by the specified separator. Returns an empty string if no split has been performed.
related:
  - textSplit
  - splitText
  - editSplitText
  - removeSplitTextElement
examples:
  - title: Join with spaces
    code: |
      $textSplit[hello;world;foo;bar;]
      $sendMessage[$joinSplitText[ ]]
      Result: "hello world foo bar"
  - title: Join with commas
    code: |
      $textSplit[apple;banana;orange;]
      $sendMessage[$joinSplitText[, ]]
      Result: "apple, banana, orange"
  - title: Concatenate without separator
    code: |
      $textSplit[a;b;c;d;]
      $sendMessage[$joinSplitText[]]
      Result: "abcd"
---
# $joinSplitText — Join Split Elements

`$joinSplitText` recombines all elements from the current `$textSplit` result into a single string. It's the inverse operation of splitting — useful when you need to transform a split array back into a delimited string, often with a different separator.

## Syntax

```
$joinSplitText[separator]
```

## Parameters

- **separator** *(string, required)* — The string to place between each element. Pass an empty value `$joinSplitText[]` to concatenate with no separation.

## Return Value

- **Type**: `string`
- Returns the joined string. If `$textSplit` produced `N` elements, the result contains all `N` elements with `(N-1)` separators between them.
- Returns an **empty string** if no split has been performed (split array is empty/missing).

## Usage

```
$textSplit[one;two;three;four;]
$joinSplitText[-]   → "one-two-three-four"
$joinSplitText[, ]  → "one, two, three, four"
$joinSplitText[]    → "onetwothreefour"
$joinSplitText[ | ] → "one | two | three | four"
```

## Common Patterns

### Changing Delimiters

Transform a semicolon-delimited list into a comma-delimited one:

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

- **Current split only**: `$joinSplitText` operates on the most recent `$textSplit` result.
- **Respects modifications**: If elements were changed via `$editSplitText` or removed via `$removeSplitTextElement`, the joined result reflects those changes.
- **Empty separator**: `$joinSplitText[]` with no argument produces a concatenated string with nothing between elements.
