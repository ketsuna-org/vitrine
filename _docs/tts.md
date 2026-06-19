---
layout: doc
title: $tts
translation_key: docs
category: "Embed & Message"
function_name: tts
syntax: $tts
description: Enables text-to-speech (TTS) for the sent message.
---

# $tts

Enables text-to-speech (TTS) for the sent message. The message will be read aloud to the users in the channel.

## Syntax

```
$tts
```

## Description

`$tts` is a **flag** (without arguments) used before `$sendMessage`. It enables Discord's TTS feature: the message content will be read aloud for all users in the channel who have not disabled TTS.

## Examples

### Simple TTS Message

```bdfd
$tts
$sendMessage[Attention to all members!]
```

### With Embeds

```bdfd
$tts
$newEmbed[title=Voice Announcement;description=This is an important announcement;color=#E74C3C]
$sendMessage[Important announcement!]
```

### TTS Alert

```bdfd
$tts
$sendMessage[🚨 Alert: maintenance starts in 5 minutes]
```

## Notes

- Works only if the bot has the `SEND_TTS_MESSAGES` permission.
- Users can disable TTS in their Discord settings.
- `$tts` is a flag, use it before `$sendMessage`.
- TTS reads the text content, not the embed content.
- Use sparingly to avoid disturbing users.

