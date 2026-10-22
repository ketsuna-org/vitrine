---
layout: doc
title: $trimContent
translation_key: docs
category: "Math & Text"
function_name: trimContent
syntax: $trimContent[text]
description: Removes leading and trailing whitespace from a text and collapses repeated spaces into one. Without argument, does the same to the incoming message read by $message.
---

# $trimContent

The function `$trimContent[]` **trims a string and collapses its duplicate spaces**. Without argument, it cleans the incoming message that the following functions read.

## Syntax

```
$trimContent[text]
```

## Parameters

| Parameter | Description |
|---|---|
| `text` | Optional. The text to clean. If omitted (`$trimContent`), the incoming message is cleaned instead. |

More than one argument is refused ("Invalid argument count").

## Return Value

- **Type**: String
- With `text`: the text without leading or trailing whitespace, and with each run of spaces or tabs replaced by a single space.
- Without argument: an empty string (the function only cleans the message).

## Behavior

- **With `text`**: runs of two or more spaces or tabs become one space, then leading and trailing whitespace is removed. **Line breaks are kept** (only the edges of the whole text are trimmed).
- **Without argument** (`$trimContent`): the content of the incoming message is cleaned the same way. `$message` (and `$noMentionMessage`) written afterwards return the cleaned content; those evaluated before see the original text. The words given by `$message[n]` and `$argCount` do not change, since they already ignore repeated spaces.
- It differs from `$trimSpace[]`, which only trims the edges and leaves the spaces between words.

## Examples

### Simple cleaning

```bdfd
$sendMessage[Result: "$trimContent[   Hello     World   ]"]
; Displays: Result: "Hello World"
```

### Cleaning user input

```bdfd
$var[input;$trimContent[$message[2]]]
$sendMessage[Cleaned argument: "$var[input]"]
```

### Clean the incoming message first

```bdfd
$trimContent
$message
```

With `!cmd   one     two`, `$message` gives `one two`.

### Comparison without extra spaces

```bdfd
$if[$trimContent[$message[1]]==admin]
  $sendMessage[Mode admin enabled.]
$endif
```

### Cleaning after extraction

```bdfd
$var[extracted;$cropText[$message;10;]]
$var[clean;$trimContent[$var[extracted]]]
$sendMessage[$var[clean]]
```

## Notes

- To remove all spaces (including internal ones), use `$replaceText[text; ;]` with an empty replacement.
- `$disableInnerSpaceRemoval` is accepted but does nothing in this engine; it does not preserve spaces.
