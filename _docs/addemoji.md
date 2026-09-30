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

The `$addEmoji[]` function **adds a new custom emoji** to the server from an image URL. The emoji can be public or restricted to a specific role.

## Syntax

```
$addEmoji[name;url;(roleID)]
```

## Parameters

| Parameter | Description |
|---|---|
| `name` | The emoji name (2 to 32 characters, alphanumeric + underscores). |
| `url` | The URL of the image (PNG, JPEG, GIF). The image must be publicly accessible. |
| `roleID` | Optional - ID of the role allowed to use the emoji. If omitted, the emoji is public. |

## Return value

- **Type**: String
- The markup of the created emoji in the format `<:name:ID>` on success.
- An error message if the URL is invalid, the name is already taken, or permissions are insufficient.

## Behavior

- The bot must have the permission `MANAGE_EMOJIS_AND_STICKERS`.
- The name must be unique among the server's emojis.
- Limit of 50 standard emojis (more for boosted servers).
- Animated GIFs are accepted and create an animated emoji.

## Examples

### Simple addition

```bdfd
$if[$checkContains[$userPerms;ManageEmojisAndStickers]==true]
  $var[emoji;$addEmoji[cool;https://example.com/cool.png]]
  $sendMessage[✅ Emoji added : $var[emoji]]
$else
  $sendMessage[❌ Permission denied.]
$endif
```

### Emoji with attachment

```bdfd
$var[url;$getAttachments[$noMentionMessage]]
$if[$var[url]!=]
  $var[firstUrl;$splitText[$var[url];, ;1]]
  $var[emojiName;$noMentionMessage]
  $var[emoji;$addEmoji[$var[emojiName];$var[firstUrl]]]
  $sendMessage[✅ Emoji created : $var[emoji]]
$else
  $sendMessage[❌ No image found. Please attach an image to your message.]
$endif
```

### Staff-restricted emoji

```bdfd
$var[staffRole;$roleID[Staff]]
$var[emoji;$addEmoji[confidential;https://example.com/lock.png;$var[staffRole]]]
$if[$var[emoji]!=]
  $sendMessage[✅ Emoji **$var[emoji]** created and restricted to the role <@&$var[staffRole]>.]
$else
  $sendMessage[❌ Error during emoji creation.]
$endif
```

### Validation of the name

```bdfd
$var[name;$message]
$if[$length[$var[name]]<2]
  $sendMessage[❌ The name must be at least 2 characters.]
$elseif[$length[$var[name]]>32]
  $sendMessage[❌ The name must not exceed 32 characters.]
$elseif[$emojiExists[$var[name]]==true]
  $sendMessage[❌ An emoji named **$var[name]** already exists.]
$else
  $var[emoji;$addEmoji[$var[name];$getAttachments[$noMentionMessage]]]
  $sendMessage[✅ Emoji **$var[emoji]** created !]
$endif
```

## Notes

- The URL must point directly to an image (with extension .png, .jpg, .gif).
- The server has an emoji limit according to its boost level.
- Animated emojis count toward a separate limit.
- The name must only contain letters, numbers, and underscores.

