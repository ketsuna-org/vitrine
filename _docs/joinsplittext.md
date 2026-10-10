---
layout: doc
title: $joinSplitText[]
translation_key: docs
category: "Math & Text"
function_name: joinSplitText
syntax: $joinSplitText[separator]
description: Joins all elements from the current split text back into a single string, separated by the given delimiter.
---
# $joinSplitText — Join Split Elements

`$joinSplitText` recombines all elements from the current `$textSplit` result into a single string. It's the inverse operation of splitting — useful when you need to transform a split list back into a delimited string, often with a different separator.

## Syntax

```
$joinSplitText[separator]
```

## Parameters

- **separator** *(string, required)* — The string to place between each element. Pass an empty value `$joinSplitText[]` to concatenate with no separation. Exactly one argument is required: `$joinSplitText` without brackets, or with two arguments, is refused ("Invalid argument count"). The separator is not trimmed.

## Return Value

- **Type**: `string`
- Returns the joined string. If `$textSplit` produced `N` elements, the result contains all `N` elements with `(N-1)` separators between them.
- Returns an **empty string** if no split has been performed.

## Usage

```
$textSplit[one two three four; ]
$joinSplitText[-]   → "one-two-three-four"
$joinSplitText[, ]  → "one, two, three, four"
$joinSplitText[]    → "onetwothreefour"
$joinSplitText[ | ] → "one | two | three | four"
```

## Common Patterns

### Changing Delimiters

Transform a semicolon-delimited list into a comma-delimited one (the semicolon separator is written `\;` so it is not read as an argument separator):

```bdfd
$textSplit[$getUserVar[data];\;]
$var[csv;$joinSplitText[,]]
```

### Removing a Separator

Concatenate all words without spaces:

```bdfd
$textSplit[$message; ]
$var[compact;$joinSplitText[]]
```

### Replacing Elements

Modify a few elements (indices start at 1), then rejoin:

```bdfd
$textSplit[$message; ]
$editSplitText[1;Hello]
$editSplitText[2;World]
$sendMessage[$joinSplitText[ ]]
```

## Important Notes

- **Current split only**: `$joinSplitText` operates on the most recent `$textSplit` result.
- **Respects modifications**: If elements were changed via `$editSplitText` or removed via `$removeSplitTextElement`, the joined result reflects those changes.
- **Empty separator**: `$joinSplitText[]` produces a concatenated string with nothing between elements.

## Examples

### Joining Split Elements with Formatted Separator

```bdfd
$textSplit[Ruby,Python,JavaScript,Rust;,]
$title[Joined Language List]
$description[Languages formatted:
• $joinSplitText[
• ]]
$color[#5865F2]
```
