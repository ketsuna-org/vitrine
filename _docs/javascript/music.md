---
layout: doc
title: voice (Music)
category: "JavaScript API"
api_type: javascript
sidebar_context: javascript
function_name: voice
syntax: await voice.play(query | url, options?)
description: Play music in a voice channel from JavaScript bots with the global voice object (Lavalink, Premium).
permalink: /docs/javascript/music/
---

# `voice` — music in voice channels

The global `voice` object plays music through Lavalink. You do not write any event handler: the queue advances by itself, and the bot leaves the channel after 5 minutes without a track (or 2 minutes alone in it).

> **Premium feature.** Music is available to bots whose owner has Premium, like Lavalink in Dart bots. Without Premium, every action throws `Music is not available for this bot…` and `voice.enabled` is `false`. Turn music on in the bot settings (Lavalink).

For raw audio streams with `require('@discordjs/voice')`, see [voice (low level)](/docs/javascript/voice/).

## Methods

| Method | Description |
|--------|-------------|
| `await voice.play(query \| url, { channelId?, source?, next? })` | Joins the voice channel of the person who ran the script (or `channelId`) and plays, or queues the track. A playlist URL queues every track. Returns `{ track, queued, position, playlist? }` (`position` 0 = playing now). `source`: `youtube` (default), `youtubemusic`, `soundcloud`, `spotify`. `next: true` puts the track at the front of the queue. |
| `await voice.search(query, { limit?, source? })` | Finds tracks (10 at most) without playing anything. |
| `await voice.pause()` / `await voice.resume()` | Pause and resume the current track. |
| `await voice.skip()` | Next track. Returns it, or `null` when the queue is over. Skips even in `track` loop. |
| `await voice.stop()` | Stops and empties the queue. The bot stays in the channel. |
| `await voice.seek(ms)` | Jumps to a position (milliseconds) in the current track. |
| `await voice.setVolume(0-200)` | Volume, 100 is normal. Returns the applied value. |
| `voice.getVolume()` | Current volume. |
| `voice.setLoopMode('off' \| 'track' \| 'queue')` | Repeat nothing, the current track, or the whole queue. |
| `voice.getLoopMode()` | Current loop mode. |
| `voice.getQueue()` | `{ connected, channelId, current, upcoming, loop, volume, paused }`. |
| `voice.nowPlaying()` | The current track with `positionMs`, or `null`. |
| `voice.remove(position)` | Removes a queued track (position starts at 1) and returns it. |
| `voice.clear()` | Empties the upcoming tracks (the current one keeps playing). Returns how many were removed. |
| `voice.shuffle()` | Shuffles the upcoming tracks. |
| `await voice.join(channelId?)` | Connects to a voice channel (default: the author's). |
| `await voice.leave()` | Disconnects. Returns `false` if the bot was not connected. |
| `voice.isConnected()` / `voice.isPlaying()` / `voice.isPaused()` | State helpers. |
| `voice.enabled` | `true` when music is available for this bot. |

`setLoopMode`, `getQueue`, `nowPlaying`, `remove`, `clear`, `shuffle` and the `get…`/`is…` helpers answer immediately; the others return a promise, use `await`.

Every method works on the server where the script runs and throws a readable `Error` on failure (no voice channel, nothing playing, no result, queue full at 500 tracks). Catch it to answer the user.

## Track object

| Field | Description |
|-------|-------------|
| `title`, `author` | Title and artist |
| `url` | Source link, or `null` |
| `duration`, `durationText` | Length in milliseconds and as `m:ss` (`LIVE` for a stream) |
| `isStream` | `true` for a live stream |
| `thumbnail` | Artwork URL, or `null` |
| `source`, `identifier` | Provider and track id |
| `requestedBy` | Discord id of who asked for it |

## Example: `/play`

```javascript
const query = interaction.options.getString('query');
await interaction.deferReply();
try {
  const result = await voice.play(query);
  await interaction.editReply(
    result.queued
      ? `Queued (#${result.position}): ${result.track.title}`
      : `Now playing: ${result.track.title}`
  );
} catch (error) {
  await interaction.editReply(`Could not play: ${error.message}`);
}
```

## Example: queue and controls

```javascript
const queue = voice.getQueue();
if (!queue.current) return interaction.reply('Nothing is playing.');

const next = queue.upcoming.slice(0, 5).map((t, i) => `${i + 1}. ${t.title}`).join('\n');
await interaction.reply(`Now playing **${queue.current.title}** (${queue.loop})\n${next}`);
```

## Servers

The bot tests the public Lavalink v4 servers and keeps the fastest ones. Your own servers (bot settings, up to 10) are used as a fallback. Passwords are never visible from a script: `config.lavalink` only exposes `enabled`.

## BDFD equivalent

BDScript music functions (`$playMusic`, `$joinVoice`, `$skipMusic`…) use the same Lavalink service. See the [Music](/docs/#music) function category.
