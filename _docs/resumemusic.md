---
layout: doc
title: $resumeMusic[]
translation_key: docs
category: Music
function_name: resumeMusic
syntax: $resumeMusic[]
description: Resumes music playback if it was previously paused
---
Resumes the currently paused track. If no track is paused or playing, this function has no effect. Use $lavalinkIsPaused to check whether playback is currently paused before calling resume.

## Examples

### Resume Audio Playback

```bdfd
$resumeMusic
$title[Music Resumed ▶️]
$description[Audio playback continued by <@$authorID>.]
$color[#57F287]
$sendMessage[]
```
