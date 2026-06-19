---
layout: doc
translation_key: docs
category: "Embed & Message"
---

# $tts

Active la synthèse vocale (Text-To-Speech) for the message sent. The message sera lu to haute voix to the users of the channel.

## Syntax

```
$tts
```

## Description

`$tts` est un **flag** (without arguments) qui s'utilise before `$sendMessage`. Il active the function TTS of Discord : le contenu of the message sera lu to voix haute pour all users of the channel qui n'ont pas désenabled le TTS.

## Examples

### Message TTS simple

```
$tts
$sendMessage[Attention to all members !]
```

### Avec embeds

```
$tts
$newEmbed[title=Annonce vocale;description=Ceci est une annonce importante;color=#E74C3C]
$sendMessage[Annonce importante !]
```

### Alerte TTS

```
$tts
$sendMessage[🚨 Alerte : la maintenance commence in 5 minutes]
```

## Notes

- Functionne only si the bot a la permission `SEND_TTS_MESSAGES`.
- Les users can désenable the TTS in theurs parameters Discord.
- `$tts` est un flag, utilisez-le before `$sendMessage`.
- Le TTS reads the text content, pas le contenu embeds.
- À use with parcimonie pour ne pas déranger les users.
