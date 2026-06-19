---
layout: doc
translation_key: docs
category: "Embed & Message"
---

# $editMessage

Modifies an existing message sent by the bot. Replaces the content and/or the embeds and components of the target message.

## Syntax

```
$editMessage[messageId;newContent]
```

## Parameters

| Parameter | Description | Required |
|-----------|-------------|:-----------:|
| `messageId` | ID of the message to modify | Yes |
| `newContent` | New text content of the message | Yes |

## Description

`$editMessage` allows updating a message previously sent by the bot. Just like `$sendMessage`, the embeds and components built before the call are included in the modification.

The `messageId` can be obtained via:
- `$sentMessageId` after a `$sendMessage`
- A stored variable
- The ID of the triggering message (`$messageID`)

## Examples

### Simple edit

```
$editMessage[123456789012345678;Updated content!]
```

### Edit after sending

```
$sendMessage[Original message]
$editMessage[$sentMessageId;Modified message!]
```

### Edit with new embeds

```
$newEmbed[title=Update;description=The information has changed;color=#FFA500]
$editMessage[$sentMessageId;]
```

### Edit with updated buttons

```
$addActionRow
$addButtonCV2[btn_done;Done;success;true]
$editMessage[$sentMessageId;Action completed ✅]
```

### In $onInteraction

```
$onInteraction
$if[$customID==btn_edit]
  $editMessage[$messageID;Message edited by interaction]
$endif
```

## Notes

- The bot can only modify its own messages.
- If `newContent` is empty and no embed/component is provided, the message may become empty (behavior depending on version).
- Embeds and components completely replace those of the original message.
- Use `$sentMessageId` right after `$sendMessage` to retrieve the ID of the last message sent.
