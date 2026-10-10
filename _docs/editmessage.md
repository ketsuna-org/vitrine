---
layout: doc
translation_key: docs
category: "Embed & Message"
---

# $editMessage

Modifies an existing message sent by the bot. Replaces the content and/or the embeds and components of the target message.

## Syntax

```bdfd
$editMessage[channelId;messageId;newContent;(title;description;color;footer)]
```

## Parameters

| Parameter | Description | Required |
|-----------|-------------|:-----------:|
| `channelId` | ID of the channel containing the message | Yes |
| `messageId` | ID of the message to modify | Yes |
| `newContent` | New text content of the message | Yes |
| `title` | Embed title (providing any embed field replaces the embed) | No |
| `description` | Embed description | No |
| `color` | Embed color (`#RRGGBB`) | No |
| `footer` | Embed footer text | No |

## Description

`$editMessage` updates an existing message of a channel. When the optional embed fields (`title`, `description`, `color`, `footer`) are given, the message embed is replaced by an embed built from them.

The `messageId` can be obtained via:
- `$sendMessage[text;yes]`, which returns the ID of the sent message
- A stored variable
- The ID of the triggering message (`$messageID`)

## Examples

### Simple edit

```bdfd
$editMessage[$channelID;123456789012345678;Updated content!]
```

### Edit after sending

```bdfd
$var[id;$sendMessage[Original message;yes]]
$editMessage[$channelID;$var[id];Modified message!]
```

### Edit with a new embed

```bdfd
$var[id;$sendMessage[Original message;yes]]
$editMessage[$channelID;$var[id];;Update;The information has changed;#FFA500]
```

### When a button is clicked

```bdfd
$if[$customID==btn_edit]
  $editMessage[$channelID;$messageID;Message edited by interaction]
$endif
```

## Notes

- The bot can only modify its own messages.
- If `newContent` is empty and no embed field is provided, the message may become empty (behavior depending on version).
- Giving any embed field replaces the original embed.
- Use `$sendMessage[text;yes]` to retrieve the ID of the message sent.
