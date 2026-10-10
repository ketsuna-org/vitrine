---
layout: doc
title: $message
translation_key: docs
category: "Entity Info"
function_name: message
syntax: $message / $message[selector;(end)]
description: Returns the text that follows the command, or one of its words, or the value of a named slash-command option.
---

# $message

The function `$message` returns the **raw text content** of the message that triggered the execution of the command. This includes all arguments after the prefix and command name.

## Syntax

```
$message
$message[selector;(end)]
```

## Parameters

| Parameter | Description |
|---|---|
| `selector` | Optional. Which part of the text to return (see the table below). Without it, the whole text is returned. |
| `end` | Optional. Only with a numeric `selector`: the last word of a range. |

Both arguments are optional; a call with more than two arguments is refused. The text is split into words on whitespace.

| Call | Returns |
|---|---|
| `$message` (or `$message[]`) | The full text, as received. |
| `$message[n]` | The n-th word, counting from 1. Empty if there is no such word. |
| `$message[<]` | The first word. |
| `$message[>]` | The last word. |
| `$message[>n]` | Everything after the first `n` words, joined with single spaces (`n` is 0 or more, so `$message[>0]` is all the words). |
| `$message[start;end]` | The words from `start` to `end` inclusive (`start` is 1 or more), joined with single spaces. |
| `$message[start;]` | The words from `start` to the end. |

In a **slash command**, the selector is the name of an option instead: `$message[reason]` returns the value given for the `reason` option (empty if it was not given).

## Return Value

| Type | Description |
|---|---|
| `string` | The text of the triggering message without the command trigger, or the selected part of it. |

## Examples

### Display the message received

```bdfd
$sendMessage[Message received: $message]
```

### Check specific content

```bdfd
$if[$message==hello]
  $sendMessage[Hello to you!]
$else
  $sendMessage[You said: $message]
$endif
```

### Log the message

```bdfd
$channelSendMessage[$channelIDFromName[logs];$username said: $message]
```

### Usage with $argsCheck

```bdfd
$argsCheck[>;Text;Your message after the command]
$sendMessage[Argument: $message]
```

## Notes

- `$message` contains the **full** text of the arguments, not just individual words.
- To read a slice of the words, use the selectors above (`$message[2;4]`, `$message[>1]`).
- In interactions (buttons, select menus), `$message` may not return the expected content.

