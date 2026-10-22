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

In a prefix command, the full text keeps its line breaks and spaces as typed (`!say a⏎b   c` gives `a⏎b   c`); only the word selectors (`$message[n]`, `$argCount`) split it.

## Slash commands

In a **slash command**, the selector is the name of an option: `$message[reason]` returns the value given for the `reason` option (empty if it was not given). `$message` alone joins the option values with a space.

What an option returns depends on its type:

| Option type | `$message[option]` returns |
|---|---|
| `string`, `integer`, `number`, `boolean` | The value as typed |
| `user` | The user **ID** |
| `channel` | The channel **ID** |
| `role` | The role **ID** |
| `mentionable` | The user or role **ID** |

The ID is the value Discord sends, so `$banID[$message[reason];$message[member]]` and `$findUser[$message[member];no]` work as written. `$message[member.id]` is still accepted and gives the same ID. Until 2026-10-22 the engine returned the **name** for these options; scripts that relied on it must now ask for the name explicitly.

To get a name from the ID:

| Need | Write |
|---|---|
| User name | `$username[$message[member]]` (or `$message[member.username]`) |
| Channel name | `$channelName[$message[channel]]` |
| Role name | `$roleName[$message[role]]` |

Positions also work in slash commands. `$message[1]`, `$message[>]`, `$message[>1]` and ranges such as `$message[1;2]` read the option values **in order**, like `$message` and `$argCount` (`$message[1]` of a `user` option is its ID). An existing option name always wins over a position. A name that is neither an option nor a position returns an empty string: `$message[1;reason]` with no `reason` given never falls back to the first option.

In visual blocks, `((opts.option))` is still the name and `((opts.option.id))` the ID.

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
- Slash `user`/`channel`/`role`/`mentionable` options return an ID, never a name.
- In interactions (buttons, select menus), `$message` may not return the expected content.

