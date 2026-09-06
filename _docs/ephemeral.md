---
layout: doc
translation_key: docs
description: Makes the response visible only to the user who triggered the interaction.
category: "Components & Interactions"
---

# $ephemeral

Makes the response ephemeral (visible only to the user who triggered the interaction). Used as a flag before `$sendMessage`.

## Syntax

```
$ephemeral
```

## Description

`$ephemeral` is a **flag** (without arguments) that, when placed before `$sendMessage`, makes the message visible only to the target user. The message appears with the label "Only you can see this" and disappears after some time or when the user closes Discord.

This function is particularly useful for:
- Discrete confirmation messages
- Errors or warnings
- Responses to interactions on buttons or select menus
- Sensitive information

## Examples

### Simple ephemeral response

```
$ephemeral
$sendMessage[This message is visible only to you.]
```

### With embeds

```
$ephemeral
$newEmbed[title=Information;description=Private data;color=#9B59B6]
$sendMessage[]
```

### In an interaction

```
$onInteraction
$if[$customID==btn_secret]
  $ephemeral
  $sendMessage[🔒 Secret action completed!]
$endif
```

### Ephemeral error message

```
$if[$argsCount==0]
  $ephemeral
  $sendMessage[❌ You must provide an argument!]
  $stop
$endif
```

## Notes

- Only works in the context of interactions (slash commands, buttons, select menus).
- Does NOT work for classic prefix commands (message commands).
- The flag must be placed before `$sendMessage`.
- Practical for keeping channels clean of system messages.
