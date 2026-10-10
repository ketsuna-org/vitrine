---
layout: doc
translation_key: docs
category: "Embed & Message"
---

# $allowMention

Accepted for compatibility. In the engine it does nothing.

## Syntax

```bdfd
$allowMention
```

## Description

`$allowMention` takes no argument (passing one is an error) and returns an empty string. The engine registers it as a no-op: it does not change the mentions of the message, it does not add a ping to `$reply`, and it does not cancel `$noMention`.

To control which mentions can notify, use:

| Function | Effect |
|------|-------|
| `$noMention` | Disables all mention notifications (users and roles) |
| `$allowUserMentions[(userID;...)]` | Only the listed user IDs can be pinged (none if no argument) |
| `$allowRoleMentions[(roleID;...)]` | Only the listed role IDs can be pinged (none if no argument) |

## Examples

### Harmless call

```bdfd
$allowMention
$sendMessage[Hey $username, look at this!]
```

The message is sent exactly as if `$allowMention` were absent.

## Notes

- Engine comment: `$message` returns the raw mention text, so there is nothing to disable.
- It does not need to be placed before `$sendMessage` or combined with `$reply`.
