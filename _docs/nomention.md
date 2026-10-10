---
layout: doc
translation_key: docs
category: "Embed & Message"
---

# $noMention

Disables mention notifications in the message: nothing is pinged (users and roles).

## Syntax

```
$noMention
```

## Description

`$noMention` takes no argument (passing one is an error). It sets the allowed mentions of the message being built to "none" (`parse: []`): mentions such as `<@userId>` or `<@&roleId>` are displayed but nobody is notified.

The setting is stored on the pending state of the command and is applied to:

- the command's main response (text, embeds and components built by the command);
- the messages sent with `$sendMessage[]` after it, until the main response has been sent.

`$sendEmbedMessage[]` does not use this setting: it first sends the pending main response, then sends its own message without any mention restriction.

It replaces any earlier `$allowUserMentions[]` / `$allowRoleMentions[]` restriction. Those functions called afterwards add their listed IDs back on top of it.

## Examples

### Silent reply

```bdfd
$reply
$noMention
Here is your reply, without a notification
```

### Silent message

```bdfd
$noMention
$sendMessage[Hello <@$authorID>, nobody is pinged by this message.]
```

## Comparison

| Function | Effect |
|------|-------|
| *(none)* | The engine adds no mention restriction |
| `$noMention` | Nobody is pinged |
| `$allowUserMentions[(userID;...)]` | Only the listed users can be pinged |
| `$allowRoleMentions[(roleID;...)]` | Only the listed roles can be pinged |
| `$allowMention` | Accepted but does nothing |

## Notes

- Place it before the `$sendMessage[]` it should affect; the main response is covered wherever it is placed.
