---
layout: doc
translation_key: docs
category: "Embed & Message"
---

# $noMention

Disables user mentions in the reply. When replying to a message, the user will not be pinged/mentioned.

## Syntax

```
$noMention
```

## Description

`$noMention` is a **flag** (without arguments) that is used before `$sendMessage`, generally in combination with `$reply`. It prevents pinging/mentioning the user in a reply, which is useful for silent replies.

By default, `$reply` pings the author of the target message. `$noMention` disables this behavior.

## Examples

### Silent Reply

```bdfd
$reply
$noMention
$sendMessage[Here is your reply, without a notification]
```

### Discrete reply with embeds

```bdfd
$reply
$noMention
$newEmbed[title=Result;description=Operation completed;color=#2ECC71]
$sendMessage[]
```

### In an interaction

```bdfd
$onInteraction
$if[$customID==btn_silent]
  $reply
  $noMention
  $sendMessage[Action performed silently]
$endif
```

## Comparison

| Flag | Effect |
|------|-------|
| *(none)* | Default behavior |
| `$noMention` | Disables all user mentions |
| `$allowMention` | Enables user mentions (explicit) |

## Notes

- `$noMention` disables user pings, not other types of mentions (like `@everyone` or `@role`).
- Particularly useful with `$reply` for non-intrusive responses.
- Flag should be placed before `$sendMessage`.
