---
layout: doc
title: $removeEmoji
translation_key: docs
category: "Moderation"
function_name: removeEmoji
syntax: $removeEmoji[name]
description: Removes a custom emoji from the server by its name. The emoji will no longer be usable after removal.
---

# $removeEmoji

The `$removeEmoji[]` function allows **removing a custom emoji** from the server using its name.

## Syntax

```
$removeEmoji[name]
```

## Parameters

| Parameter | Description |
|---|---|
| `name` | The name of the emoji to remove (without the colons `:`). |

## Return Value

- **Type**: String (empty on success)
- Empty string if the removal succeeds.
- Error message if the emoji doesn't exist or if the bot lacks permissions.

## Behavior

- The bot must have the `MANAGE_EMOJIS_AND_STICKERS` permission.
- The emoji is permanently removed from the server.
- All messages using this emoji will display the text name instead of the image.

## Examples

### Simple removal

```bdfd
$if[$checkUserPerms[$authorID;ManageEmojis]==true]
  $if[$emojiExists[$noMentionMessage]==true]
    $removeEmoji[$noMentionMessage]
    $sendMessage[✅ Emoji **$noMentionMessage** removed.]
  $else
    $sendMessage[❌ The emoji **$noMentionMessage** does not exist.]
  $endif
$else
  $sendMessage[❌ Permission denied.]
$endif
```

### Secure removal with confirmation

```bdfd
$var[name;$noMentionMessage]
$if[$emojiExists[$var[name]]==true]
  $removeEmoji[$var[name]]
  $title[🗑️ Emoji removed]
  $description[
  **Name:** $var[name]
  **Removed by:** $userName[$authorID]
  ]
  $color[#ED4245]
$else
  $sendMessage[❌ No emoji named **$var[name]** found.]
$endif
```

## Notes

- The emoji name is case-sensitive.
- Removal is irreversible.
- Always check the emoji's existence with `$emojiExists[]` before removing.
