---
layout: doc
title: $leaveVoice[]
translation_key: docs
category: Music
function_name: leaveVoice
syntax: $leaveVoice[]
description: Leaves the current voice channel
---
Leaves the current voice channel and disconnects from voice. Any currently playing music stops immediately. This does not clear the queue — use $stopMusic first if you want to clear the queue before disconnecting.

## Examples

### Disconnect from Voice

```bdfd
$leaveVoice
$title[Voice Disconnected 🔇]
$description[Bot left the voice channel and cleared audio playback.]
$color[#DA373C]
```
