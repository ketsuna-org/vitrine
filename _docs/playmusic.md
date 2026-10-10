---
layout: doc
title: $playMusic[]
translation_key: docs
category: Music
function_name: playMusic
syntax: $playMusic[query;channelID?;userId?]
description: Plays a track from a search query or URL, auto-joining a voice channel if needed
---
Loads a track and plays it, or adds it to the queue if something is already playing. A query that starts with `http://` or `https://` is sent to the Lavalink server as a URL (a playlist URL adds all its tracks); any other text is searched on YouTube (`ytsearch:`) and the first result is used. Returns an empty string.

## Parameters

| Parameter | Description |
|---|---|
| `query` | Required - Song name or URL. An empty query raises an error. |
| `channelID` | Optional - ID of the voice channel to play in (a positive number, otherwise `Invalid voice channel ID.`). |
| `userId` | Optional - ID of a user (a positive number, otherwise `Invalid user ID.`): the bot plays in the voice channel this user is in. Ignored when `channelID` is given. Defaults to the command author when both `channelID` and `userId` are empty. |

## Notes

- The bot connects to the target voice channel by itself; if it is in another channel, it is moved to the requested one.
- If the user is not in a voice channel (and no `channelID` is given), the error `You must be in a voice channel` is raised. If nothing is found, the error `No track found for query: <query>` is raised.
- Requires a server and a configured music (Lavalink) service, otherwise an error is raised.

## Examples

### Search and Play Track

```bdfd
$playMusic[$message]
$title[🎵 Music Player]
$description[Searching and queuing: **$message**\nRequested by: <@$authorID>]
$color[#AEEA00]
$addButton[no;music_pause;Pause;secondary;⏸️]
$addButton[no;music_skip;Skip;secondary;⏭️]
$addButton[no;music_stop;Stop;danger;⏹️]
```
