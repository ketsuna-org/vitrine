---
layout: doc
title: $message
translation_key: docs
category: "Entity Info"
function_name: message
syntax: $message
description: Returns the raw text content of the message that triggered the command.
---

# $message

The function `$message` returns the **raw text content** of the message that triggered the execution of the command. This includes all arguments after the prefix and command name.

## Syntax

```
$message
```

## Parameters

None.

## Return Value

| Type | Description |
|---|---|
| `string` | The full text of the triggering message (excluding the command name and prefix). |

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
- If you only want a slice of the arguments, use `$messageSlice[]`.
- In interactions (buttons, select menus), `$message` may not return the expected content.

