---
layout: doc
title: $textSplit[]
translation_key: docs
category: "Math & Text"
function_name: textSplit
syntax: $textSplit[text;separator]
description: Splits a text at every occurrence of a separator and stores the pieces for later access with $splitText[]. It returns nothing.
---
# $textSplit — Split Text into Elements

`$textSplit` splits a text string into multiple elements using a separator. The resulting list is stored in the command's split-text state and can be read with `$splitText[]`, counted with `$getTextSplitLength`, and manipulated with the related split-text functions.

## Syntax

```
$textSplit[text;separator]
```

## Parameters

| Parameter | Description |
|---|---|
| `text` | The text to split. |
| `separator` | The text at which `text` is cut. Exactly two arguments are required: `$textSplit[a;b;c]` (three arguments) is refused ("Invalid argument count"). |

## Behavior

- **Action-only**: `$textSplit` returns an empty string. It performs the split and stores the result; it does not produce output by itself.
- The result is stored for the rest of the command run. Calling `$textSplit` again replaces any previous split.
- Elements are numbered **from 1**: the first element is at index `1`.
- The separator is compared literally and case-sensitively. It is not a regex.
- Each element is kept as it is: there is no trimming.
- Two consecutive separators produce an empty element (`a,,b` split on `,` gives `a`, an empty element, `b`).
- An empty `text` gives one empty element, so `$getTextSplitLength` is `1`, not `0`.
- An empty separator splits the text into single characters.
- A text that does not contain the separator gives a single element.

## Accessing the Result

After calling `$textSplit`, use the following functions to work with the stored elements:

| Function | Description |
|----------|------------|
| `$splitText[index]` | Get the element at a given index (`1`-based, or `<` for the first and `>` for the last) |
| `$getTextSplitLength` | Get the total number of elements |
| `$getTextSplitIndex[value]` | Get the position of the first element equal to `value`, or `-1` |
| `$joinSplitText[separator]` | Join all elements with a new separator |
| `$editSplitText[index;newValue]` | Replace one element |
| `$removeSplitTextElement[index]` | Remove one element |

## Common Use Cases

### Splitting User Input

```bdfd
$textSplit[$message; ]
$sendMessage[First word: $splitText[1]]
```

### CSV Parsing

```bdfd
$textSplit[$getUserVar[data];,]
$sendMessage[Column 3: $splitText[3]]
```

### Multi-line Processing

```bdfd
$textSplit[$message;
]
$sendMessage[You sent $getTextSplitLength lines]
```

## Important Notes

- **Overwrite behavior**: Each new `$textSplit` call replaces the previous split. If you need two splits, finish with the first one before calling the next.
- **Empty elements**: If the separator appears consecutively (for example `a;;b` with separator `;`), an empty element is created between them.
- **No auto-trim**: Leading and trailing spaces of elements are preserved. Use `$trimSpace[]` on an element if needed.
- **Scope**: the elements only exist during the current command run.

## Examples

### Parsing Comma-Separated Values

```bdfd
$textSplit[$message;,]
$title[CSV Data Split]
$description[Parsed **$getTextSplitLength** elements from input.]
$addField[Item 1;$splitText[1];yes]
$addField[Item 2;$splitText[2];yes]
$color[#5865F2]
```
