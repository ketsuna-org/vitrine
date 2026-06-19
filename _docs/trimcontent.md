---
layout: doc
title: $trimContent
translation_key: docs
category: "Math & Text"
function_name: trimContent
syntax: $trimContent[text]
description: Removes leading and trailing spaces from a text (trim). Does not modify spaces within the text.
---

# $trimContent

The function `$trimContent[]` **removes leading and trailing spaces** from a string (trim).

## Syntax

```
$trimContent[text]
```

## Parameters

| Parameter | Description |
|---|---|
| `text` | The text to clean (leading/trailing spaces will be removed). |

## Return Value

- **Type**: String
- The text without leading or trailing spaces.

## Behavior

- Does NOT affect spaces between words.
- Removes spaces, tabs, and newlines at the beginning/end.
- Very useful after extraction or concatenation.

## Examples

### Simple Cleaning

```bdfd
$sendMessage[Result: "$trimContent[   Hello World   ]"]
; Displays: Result: "Hello World"
```

### Cleaning User Input

```bdfd
$let[input;$trimContent[$message[2]]]
$sendMessage[Cleaned argument: "$input"]
```

### Comparison Without Spaces

```bdfd
$if[$trimContent[$message[1]]==admin]
  $sendMessage[Mode admin enabled.]
$endif
```

### Cleaning After Extraction

```bdfd
$let[extracted;$subString[$message;0;10]]
$let[clean;$trimContent[$extracted]]
$sendMessage[$clean]
```

## Notes

- More efficient than `$replaceText[text; ;]` because it only modifies the ends.
- To remove all spaces (including internal ones), use `$replaceText[text; ;]`.
- To preserve all spaces, use `$disableInnerSpaceRemoval`.

