---
layout: doc
translation_key: docs
category: "Embed & Message"
---

# $allowMention

Enables mentions in the response. When replying, the user will be explicitly pinged/mentioned.

## Syntax

```bdfd
$allowMention
```

## Description

`$allowMention` is a **flag** (without arguments) used before `$sendMessage`, generally in combination with `$reply`. It explicitly enables the mention/ping of the user in a response.

Although the default behavior of `$reply` already includes a ping, `$allowMention` allows making the intent explicit and overriding any default configurations.

## Examples

### Response with explicit ping

```bdfd
$reply
$allowMention
$sendMessage[Hey $username, look at this!]
```

### In an interaction

```bdfd
$if[$customID==btn_alert]
  $reply
  $allowMention
  $sendMessage[⚠️ Important alert for you!]
$endif
```

## Comparison

| Flag | Effect |
|------|-------|
| *(none)* | Default behavior |
| `$noMention` | Disables all mentions |
| `$allowMention` | Enables mentions (explicit) |

## Notes

- `$allowMention` enables the pinging of the user in a response.
- Useful for making the intent explicit in the code.
- The flag must be placed before `$sendMessage`.
- Used in conjunction with `$reply`.
