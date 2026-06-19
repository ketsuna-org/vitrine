---
layout: doc
title: $removeContains
translation_key: docs
category: "Text Manipulation"
function_name: removeContains
syntax: $removeContains[text]
description: Removes all occurrences of a string in a given text. Searches and replaces with an empty string.
---

# $removeContains

The `$removeContains[]` function **removes all occurrences** of a string in the text. It operates on the message text ($message) or the current text context.

## Syntax

```
$removeContains[text]
```

## Parameters

| Parameter | Description |
|---|---|
| `text` | The string to remove. |

## Return Value

- **Type**: String
- The text without the occurrences of the target string.

## Behavior

- Case-sensitive.
- Removes all occurrences, not just the first one.
- Works on the user message or the text value in context.

## Examples

### Clean a message

```bdfd
$sendMessage[Cleaned message: $removeContains[spam]]
; For a message "this is spam marketing"
; Result: "this is  marketing"
```

### Remove bad words

```bdfd
$let[filtered;$removeContains[insult]]
$sendMessage[Filtered message: $filtered]
```

### Multiple cleanup

```bdfd
$sendMessage[$removeContains[badword1]]
$sendMessage[$removeContains[badword2]]
```

## Notes

- For a replacement (not removal), use `$replaceText[]`.
- To remove only links, use `$removeLinks`.
- To remove surrounding spaces, use `$trimContent[]`.
