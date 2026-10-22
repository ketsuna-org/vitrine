---
layout: doc
translation_key: docs
category: "Embed & Message"
function_name: noMention
syntax: $noMention
description: Disables all mention notifications of the response, including mentions written on purpose.
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

`$sendEmbedMessage[]` follows this setting too. `$channelSendMessage[]` does not read it.

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

## Difference with BDFD

`$noMention` cuts **all** notifications of the response (`allowedMentions: {parse: []}`), **including** the `<@id>` and `<@&role>` you wrote on purpose: `$noMention <@$mentioned[1;no]> warned` pings nobody. The BDFD wiki only describes removing the automatic mention of the author, which this engine never adds; in BDFD, mentions you write still notify. This difference is kept on purpose, to protect against mass pings. To notify someone anyway, add `$allowUserMentions[ID]` or `$allowRoleMentions[ID]` after it. The response, `$sendMessage` and `$sendEmbedMessage` follow this setting; `$channelSendMessage` does not read it. See [Differences with BDFD](/docs/bdfd-differences/).
