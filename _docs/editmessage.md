---
layout: doc
translation_key: docs
category: "Embed & Message"
---

# $editMessage

Edits an existing message sent by the bot: replaces its text and, optionally, its embed.

## Syntax

```bdfd
$editMessage[channelId;messageId;newContent;(title;description;color;footer)]
```

## Parameters

| Parameter | Description | Required |
|-----------|-------------|:-----------:|
| `channelId` | ID of the channel containing the message | Yes |
| `messageId` | ID of the message to modify | Yes |
| `newContent` | New text content of the message (the argument must be present; it can be empty). Maximum 2000 characters. | Yes |
| `title` | Embed title, maximum 256 characters (providing the 4th argument, even empty, replaces the embed) | No |
| `description` | Embed description, maximum 4096 characters | No |
| `color` | Embed color: `#RRGGBB`, `RRGGBB` (hex) or an integer. A value made only of digits is read as a decimal integer. Invalid values raise `Invalid embed color.` | No |
| `footer` | Embed footer text, maximum 2048 characters | No |

## Description

`$editMessage` updates an existing message of a channel and returns an empty string. The text of the message is always replaced by `newContent`. When at least one of the optional embed arguments is present (3 to 7 arguments are accepted), the embed of the message is replaced by one built from them; if all of them are empty the embed is removed. Components are not changed.

The edit is performed immediately, on an existing message, and affects neither the pending response nor `$sendMessage[]`. Both IDs must be positive integers (`Invalid Discord ID.` otherwise).

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

- `newContent` always replaces the text of the message, even when it is empty.
- Giving the embed arguments (even empty ones) replaces the original embed; omitting them leaves the embed untouched.
- The combined length of title, description and footer cannot exceed 6000 characters (`Embed text exceeds Discord limits.`).
- Editing a message written by someone else fails with `Only the bot own messages can be edited.`
- Use `$sendMessage[text;yes]` to retrieve the ID of the message sent.
