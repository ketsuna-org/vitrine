---
layout: doc
title: $trimContent
translation_key: docs
category: "Math & Text"
function_name: trimContent
syntax: $trimContent[text]
description: Removes leading and trailing whitespace from a text (trim). Does not modify spaces within the text. Same behaviour as $trimSpace.
---

# $trimContent

The function `$trimContent[]` **removes leading and trailing whitespace** from a string (trim). It behaves exactly like `$trimSpace[]`.

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
- Removes spaces, tabs, line breaks and other Unicode whitespace at the beginning/end.
- Exactly one argument is required ("Invalid argument count" otherwise).
- Very useful after extraction or concatenation.

## Examples

### Simple Cleaning

```bdfd
$sendMessage[Result: "$trimContent[   Hello World   ]"]
; Displays: Result: "Hello World"
```

### Cleaning User Input

```bdfd
$var[input;$trimContent[$message[2]]]
$sendMessage[Cleaned argument: "$var[input]"]
```

### Comparison Without Spaces

```bdfd
$if[$trimContent[$message[1]]==admin]
  $sendMessage[Mode admin enabled.]
$endif
```

### Cleaning After Extraction

```bdfd
$var[extracted;$cropText[$message;10;]]
$var[clean;$trimContent[$var[extracted]]]
$sendMessage[$var[clean]]
```

## Notes

- To remove all spaces (including internal ones), use `$replaceText[text; ;]` with an empty replacement.
- `$disableInnerSpaceRemoval` is accepted but does nothing in this engine; it does not preserve spaces.

