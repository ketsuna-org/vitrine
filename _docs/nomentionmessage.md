---
layout: doc
title: $noMentionMessage
translation_key: docs
category: "Variables"
function_name: noMentionMessage
syntax: $noMentionMessage[n]
description: Gets the content of the message with user, role and channel mentions removed, or its nth word (the last one with >) once they are removed.
---
# $noMentionMessage

The function `$noMentionMessage` returns the **message content** with all user, role and channel mentions removed. With `[n]` or `[>]`, it returns one word of that text.

## Syntax

```
$noMentionMessage[n]
```

## Parameters

| Parameter | Description |
|---|---|
| `n` | Optional. A positive number (1 is the first word) or `>` (the last word). The words are those of the text once the mentions are removed, split on whitespace. |

An invalid selector (text, `0`, negative number, empty) raises the error "Argument number must be a positive number or >.".

## Return Value

- **Type** : String
- Without argument: the message content (`message.cleanContent`, or `message.content` if it is not set) with the mentions removed. For a prefix command this content is the text after the command name.
- With `[n]`: the nth word, or an empty string if there are fewer than `n` words.
- With `[>]`: the last word, or an empty string if there is no word.

## Behavior

- `<@userID>`, `<@!userID>` and `<@&roleID>` (user and role mentions) are deleted from the text.
- `<#channelID>` (channel mentions) are deleted from the text.
- Nothing is replaced by a name: the mention is simply removed, and the spaces around it are kept.
- Other text is left untouched (including `@everyone`, `@here` and custom emojis).
- The word selection (`[n]`, `[>]`) happens after the removal, so a mention never counts as a word.

## Examples

### Logging a message without its mentions

```bdfd
$channelSendMessage[123456789;Message from $username: $noMentionMessage]
```

### Say command without mentions

```bdfd
$sendMessage[$noMentionMessage]
```

### First and last word without mentions

```bdfd
$noMentionMessage[1] / $noMentionMessage[>]
```

With `hello <@123> big world`, this gives `hello / world`.

### Relaying a message

```bdfd
$useChannel[123456789]
$title[Relayed message from $username]
$description[$noMentionMessage]
$footer[From channel $channelID]
```

## Notes

- Unlike `$message`, the mentions are removed from the text.
- If nothing is left after removing the mentions, the result is empty (for example `$sendMessage[$noMentionMessage]` then fails because a message text is required).
