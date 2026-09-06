---
layout: doc
title: voice
category: "JavaScript API"
api_type: javascript
sidebar_context: javascript
description: Voice channel audio with require('@discordjs/voice') in BDJS scripts.
permalink: /docs/javascript/voice/
---

Play audio in voice channels with `require('@discordjs/voice')`. Remote audio URLs are supported; local file paths are blocked. HTTP URLs require FFmpeg on the runner host.

## Key exports

| Export | Description |
|--------|-------------|
| `joinVoiceChannel(options)` | Connect to a voice channel |
| `joinVoiceChannelReady(channel, adapterCreator)` | Connect and wait until ready |
| `createAudioPlayer()` | Playback controller |
| `createAudioResource(source)` | Audio source from URL or stream |
| `playAudio(player, resource)` | Start playback helper |
| `getVoiceConnection(guildId)` | Get active connection |
| `entersState(resource, status, timeout)` | Wait for state transition |

## Constants

`AudioPlayerStatus`, `VoiceConnectionStatus`, `StreamType`, `NoSubscriberBehavior`, `EndBehaviorType`

## Example

```javascript
const { joinVoiceChannel, createAudioPlayer, createAudioResource } = require('@discordjs/voice');

const connection = joinVoiceChannel({
  channelId: channel.id,
  guildId: guild.id,
  adapterCreator: guild.voiceAdapterCreator,
});

const player = createAudioPlayer();
const resource = createAudioResource('https://example.com/audio.mp3');
player.play(resource);
connection.subscribe(player);
```

## BDFD equivalent

BDScript music functions (`$playMusic`, `$joinVoice`, etc.) use Lavalink. See the [Music](/docs/#music) function category.

## Restrictions

- Local filesystem paths are blocked for audio sources.
- FFmpeg must be available for HTTP audio URLs.
