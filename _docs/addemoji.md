---
layout: doc
title: $addEmoji
translation_key: docs
category: "Moderation"
function_name: addEmoji
syntax: $addEmoji[name;url;(roleID)]
description: Adds a new custom emoji to the server from a URL. Optionally restrict the emoji to a specific role.
---

# $addEmoji

The `$addEmoji[]` function **ajouter un new custom emoji** to the server from a URL of image. The emoji can be public or restreint to a specific role.

## Syntax

```
$addEmoji[name;url;(roleID)]
```

## Parameters

| Parameter | Description |
|---|---|
| `name` | The emoji name (2 to 32 becauseactères, alphanumérique + underscores). |
| `url` | The URL of the image (PNG, JPEG, GIF). The image must be accessible publicment. |
| `roleID` | Optional - ID of the role allowed to use the emoji. If omitted, emoji public. |

## Return value

- **Type** : String
- Le markup of the emoji created in the format `<:nom:ID>` on success.
- Message error if the URL est invalid, the name déjà pris or les permissions insuffisantes.

## Behavior

- The bot must have the permission `MANAGE_EMOJIS_AND_STICKERS`.
- The name must be unique parmi les emojis of the server.
- Limit of 50 emojis standard (plus for servers boostés).
- Les GIFs animés sont acceptés and créent an emoji animé.

## Examples

### Simple addition

```bdfd
$if[$checkContains[$userPerms;ManageEmojisAndStickers]==true]
  $let[emoji;$addEmoji[cool;https://example.com/cool.png]]
  $sendMessage[✅ Emoji added : $emoji]
$else
  $sendMessage[❌ Permission refusée.]
$endif
```

### Emoji with attachment

```bdfd
$let[url;$getAttachments[$noMentionMessage]]
$if[$url!=]
  $let[firstUrl;$splitText[$url;, ;1]]
  $let[emojiName;$noMentionMessage]
  $let[emoji;$addEmoji[$emojiName;$firstUrl]]
  $sendMessage[✅ Emoji created : $emoji]
$else
  $sendMessage[❌ Aucan image founde. Joignez an image to votre message.]
$endif
```

### Staff-restricted emoji

```bdfd
$let[staffRole;$roleID[Staff]]
$let[emoji;$addEmoji[confidential;https://example.com/lock.png;$staffRole]]
$if[$emoji!=]
  $sendMessage[✅ Emoji **$emoji** created and réservé to the role <@&$staffRole>.]
$else
  $sendMessage[❌ Error during la création of the emoji.]
$endif
```

### Validation of the name

```bdfd
$let[name;$message]
$if[$length[$name]<2]
  $sendMessage[❌ The name must be to the moins 2 becauseactères.]
$elseif[$length[$name]>32]
  $sendMessage[❌ The name must not exceed 32 becauseactères.]
$elseif[$emojiExists[$name]==true]
  $sendMessage[❌ Un emoji nommé **$name** existe déjà.]
$else
  $let[emoji;$addEmoji[$name;$getAttachments[$noMentionMessage]]]
  $sendMessage[✅ Emoji **$emoji** created !]
$endif
```

## Notes

- The URL must point directly vers an image (extension.png,.jpg,.gif).
- The server a une limit of emojis according to son level of boost.
- Les emojis animés comptent in a limit separatede.
- The name ne must contain only lettres, chiffres and underscores.
