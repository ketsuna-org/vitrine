---
layout: doc
title: $removeSplitTextElement[]
translation_key: docs
category: "Math & Text"
function_name: removeSplitTextElement
syntax: $removeSplitTextElement[index]
description: Removes the element at the given 1-based index from the current split text. An index out of range is an error.
---
# $removeSplitTextElement — Remove Split Text Element

`$removeSplitTextElement` deletes a single element from the current split text. After removal, the list shrinks by one, and all subsequent elements shift down to fill the gap.

## Syntax

```
$removeSplitTextElement[index]
```

## Parameters

- **index** *(integer, required)* — The position of the element to remove, **starting at 1**. Surrounding spaces are ignored. The selectors `<` and `>` of `$splitText[]` are **not** accepted here; a non-integer raises "Expected an integer in argument 1.".

## Behavior

- **Action-only**: This function modifies the split text and returns an empty string.
- Elements after the removed one shift left by one position.
- The total length decreases by 1.
- An index below `1` (including `0` and negative numbers) or above the current length raises the error "Split index out of range." and stops the command. It is also an error when no `$textSplit` has been run.

## Usage

### Before and After

```
$textSplit[A,B,C,D,E;,]
$removeSplitTextElement[3]   // Remove "C"

Before: [A, B, C, D, E]  (length: 5)
After:  [A, B, D, E]     (length: 4)
```

Now `$splitText[3]` returns `"D"` instead of `"C"`.

### Remove the Last Element

Negative indices are not supported; use `$getTextSplitLength` as the index:

```bdfd
$textSplit[one two three four; ]
$removeSplitTextElement[$getTextSplitLength]
$joinSplitText[ ]
```

The result is `one two three`.

## Common Patterns

### Remove the First Element

```bdfd
$textSplit[$getUserVar[tags];,]
$removeSplitTextElement[1]
$var[updatedTags;$joinSplitText[,]]
```

### Clean Up Before Rejoining

```bdfd
$textSplit[$message; ]
$removeSplitTextElement[1]
$removeSplitTextElement[1]
$var[args;$joinSplitText[ ]]
```

### Drop the Last Word

```bdfd
$textSplit[$message; ]
$removeSplitTextElement[$getTextSplitLength]
$sendMessage[$joinSplitText[ ]]
```

## Important Notes

- **Index shift**: After removal, all higher indices shift down. If you need to remove several elements, work from the highest index to the lowest.
- **Out-of-range is an error**: removing an invalid index does not silently do nothing; it stops the command with "Split index out of range.". Check `$getTextSplitLength` first if the message may have too few words (note that splitting an empty text gives one empty element).
- **No return value**: it returns an empty string.
- **Local to the split**: only the stored list changes; the source text is untouched, and a new `$textSplit` rebuilds the list.

## Examples

### Deleting an Element

```bdfd
$textSplit[cat,dog,rabbit,hamster;,]
$removeSplitTextElement[3]
$title[Removed Element]
$description[Remaining pets after removing element 3: `$joinSplitText[, ]`]
$color[#5865F2]
```
