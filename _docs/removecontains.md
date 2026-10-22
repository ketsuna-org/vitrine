---
layout: doc
title: $removeContains
translation_key: docs
category: "Math & Text"
function_name: removeContains
syntax: $removeContains[text;toRemove]
description: Removes all occurrences of a string in a given text. Searches and replaces with an empty string.
---

# $removeContains

The `$removeContains[]` function **removes all occurrences** of a string in a text given as the first argument.

## Syntax

```
$removeContains[text;toRemove]
```

## Parameters

| Parameter | Description |
|---|---|
| `text` | Required. The text in which to remove occurrences (for example `$message`). |
| `toRemove` | Required. The string to remove. |

Both arguments are required: a call with one argument is refused.

## Return Value

- **Type**: String
- The text without the occurrences of `toRemove`.

## Behavior

- Case-sensitive: `$removeContains[aAa;a]` → `A`.
- Removes all occurrences, not just the first one. Occurrences are found from left to right without overlapping: `$removeContains[aaa;aa]` → `a`.
- An empty `toRemove` removes nothing: the text is returned unchanged.
- Exactly two arguments are required; three or more are refused ("Invalid argument count").
- Only the text passed as the first argument is processed.

## Examples

### Clean a message

```bdfd
$sendMessage[Cleaned message: $removeContains[$message;spam]]
; For a message "this is spam marketing"
; Result: "this is  marketing"
```

### Remove bad words

```bdfd
$var[filtered;$removeContains[$message;insult]]
$sendMessage[Filtered message: $var[filtered]]
```

### Multiple cleanup

```bdfd
$sendMessage[$removeContains[$removeContains[$message;badword1];badword2]]
```

## Notes

- For a replacement (not removal), use `$replaceText[]`.
- To remove only links, use `$removeLinks`.
- To remove surrounding spaces, use `$trimContent[]`.

## Difference with BDFD

In the official BDFD wiki, `$removeContains` is a **message purge** (it deletes recent messages that contain the given words). In Bot Creator it is a plain **text removal**: `$removeContains[text;toRemove]` returns the text without the pattern, and nothing is deleted from the channel. This difference is kept on purpose. The BDFD form `[word;...;amount]` is **refused** rather than taken for a text removal. For a replacement use [`$replaceText`](/docs/replacetext/); to delete messages, use [`$clear`](/docs/clear/). See [Differences with BDFD](/docs/bdfd-differences/).
