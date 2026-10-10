---
layout: doc
title: $getTextSplitLength
translation_key: docs
category: "Math & Text"
function_name: getTextSplitLength
syntax: $getTextSplitLength
description: Returns the total number of elements in the current split text, as produced by the last $textSplit.
---
# $getTextSplitLength — Count Split Text Elements

`$getTextSplitLength` returns the number of elements currently held by the split text — the pieces produced by the most recent `$textSplit` call, minus any removed with `$removeSplitTextElement`.

## Syntax

```
$getTextSplitLength
```

This function takes **no parameters**; any argument is refused ("Invalid argument count").

## Return Value

- **Type**: `string` (representing a number)
- Returns the total number of elements. For example, splitting `a,b,c` on `,` yields `3`.
- Returns `0` if no `$textSplit` has been called yet.
- Splitting an empty text gives **one** empty element, so the length is `1`, not `0`.

## Usage

```
$textSplit[apple,banana,orange,grape;,]
$getTextSplitLength  → "4"
```

```
$textSplit[hello world; ]
$getTextSplitLength  → "2"
```

## Common Patterns

### Bounds Checking

Prevent empty reads by validating the length first (indices start at 1):

```bdfd
$textSplit[$message; ]
$if[$getTextSplitLength>=3]
  $sendMessage[Third argument: $splitText[3]]
$else
  $sendMessage[Please provide at least 3 arguments]
$endif
```

### Last Element

```bdfd
$textSplit[$message; ]
$sendMessage[Last word: $splitText[$getTextSplitLength]]
```

## Important Notes

- **Read-only**: This function reports the count; it does not modify the split text.
- **After each $textSplit**: The length reflects the most recent split. Calling `$textSplit` again replaces it.
- **Changes with edits**: `$removeSplitTextElement` lowers the length by one.
- **Empty text**: `$textSplit[;,]` has length `1` (one empty element); do not use a `0` check to detect an empty string, compare the text itself instead.

## Examples

### Counting Split Items

```bdfd
$textSplit[$message; ]
$title[Word Count Breakdown]
$description[Your message contains **$getTextSplitLength** words.]
$addField[First Word;$splitText[<];yes]
$addField[Last Word;$splitText[>];yes]
$color[#5865F2]
```
