---
layout: doc
title: $removeSplitTextElement[]
translation_key: docs
category: "Math & Text"
function_name: removeSplitTextElement
syntax: $removeSplitTextElement[index]
description: Removes the element at the specified index from the current text split array.
parameters:
  - name: index
    type: integer
    required: true
    description: The zero-based index of the element to remove. Negative indices count from the end (-1 = last element).
returns:
  type: none (action only)
  description: This function is an action — it modifies the split array in place and does not return a value inline.
related:
  - textSplit
  - splitText
  - editSplitText
  - joinSplitText
examples:
  - title: Remove first element
    code: |
      $textSplit[apple;banana;orange;grape;]
      $removeSplitTextElement[0]
      $sendMessage[$joinSplitText[, ]]
      Result: "banana, orange, grape"
  - title: Remove last element
    code: |
      $textSplit[1;2;3;4;5;]
      $removeSplitTextElement[-1]
      $sendMessage[$joinSplitText[ ]]
      Result: "1 2 3 4"
  - title: Remove specific element and re-access
    code: |
      $textSplit[red;green;blue;yellow;]
      $removeSplitTextElement[1]
      $sendMessage[$splitText[0] $splitText[1] $splitText[2]]
      Result: "red blue yellow"
---
# $removeSplitTextElement — Remove Split Element

`$removeSplitTextElement` deletes a single element from the current text split array. After removal, the array shrinks by one, and all subsequent elements shift down to fill the gap.

## Syntax

```
$removeSplitTextElement[index]
```

## Parameters

- **index** *(integer, required)* — The zero-based position of the element to remove. Negative indices are supported.

## Behavior

- **Action-only**: This function modifies the split array directly and does not return a value.
- Elements after the removed one shift left by one position.
- The total length decreases by 1.
- Removing an out-of-bounds index has no effect.

## Usage

### Before and After

```
$textSplit[A;B;C;D;E;]
$removeSplitTextElement[2]   // Remove "C"

Before: [A, B, C, D, E]  (length: 5)
After:  [A, B, D, E]     (length: 4)
```

Now `$splitText[2]` returns `"D"` instead of `"C"`.

### With Negative Index

```
$textSplit[one;two;three;four;]
$removeSplitTextElement[-1]   // Remove "four"
$joinSplitText[ ]  → "one two three"
```

## Common Patterns

### Remove Known Value

```
$textSplit[$getUserVar[tags];,]
$removeSplitTextElement[0]   // Remove first tag
$var[updatedTags;$joinSplitText[,]]
```

### Clean Up Before Rejoining

```
$textSplit[$message; ]
$removeSplitTextElement[0]      // Remove command prefix
$removeSplitTextElement[0]      // Remove another prefix
$var[args;$joinSplitText[ ]]
```

### Filter First/Last

```
$textSplit[$message; ]
$removeSplitTextElement[-1]     // Drop last word
$sendMessage[$joinSplitText[ ]]
```

## Important Notes

- **Index shift**: After removal, all higher indices shift down. If you need to remove multiple elements, work from highest index to lowest to avoid index corruption.
- **Out-of-bounds**: Removing an invalid index silently does nothing.
- **No return**: Do not use inline; it's an action function.
- **Permanent for this execution**: The removal cannot be undone within the same command, but the original text is not permanently lost — it can be re-split from the source.
