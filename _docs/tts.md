---
layout: doc
title: $tts
translation_key: docs
category: "Embed & Message"
function_name: tts
syntax: $tts
description: Sets a tts flag on the command's main response. In the current engine the flag is not read when the message is sent, so it has no visible effect.
---

# $tts

Sets a `tts` flag on the command's **main response**.

## Syntax

```
$tts
```

## Description

`$tts` is a **flag** without arguments (passing one is an error). It sets the `tts` option of the main response of the command (the text, embeds and components built by the command itself). It returns an empty string.

> **Current limitation:** the engine only stores the flag in the response payload. No code of the message senders reads it, so the message is sent as a normal message and is not read aloud.

It does **not** affect messages sent with `$sendMessage[]` or `$sendEmbedMessage[]`: those are separate messages and are sent without the flag.

## Examples

### Simple TTS Message

```bdfd
$tts
Attention to all members!
```

### TTS Alert

```bdfd
$tts
🚨 Alert: maintenance starts in 5 minutes
```

## Notes

- The flag applies to the main response, wherever `$tts` is placed in the code.
- Do not rely on it to produce a text-to-speech message with this engine.
