---
layout: doc
title: $resumeMusic[]
translation_key: docs
category: Music
function_name: resumeMusic
syntax: $resumeMusic[]
description: Resumes music playback if it was previously paused
---
Resumes the paused player of the server. Takes no argument and returns an empty string. If the bot has no active player, nothing happens (no error). Requires a server and a configured music (Lavalink) service, otherwise an error is raised. Use $lavalinkIsPaused to check whether playback is currently paused before calling resume.

## Examples

### Resume Audio Playback

```bdfd
$resumeMusic
$title[Music Resumed ▶️]
$description[Audio playback continued by <@$authorID>.]
$color[#57F287]
```
