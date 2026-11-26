---
layout: doc
title: $clearQueue[]
translation_key: docs
category: Music
function_name: clearQueue
syntax: $clearQueue
description: Removes the upcoming tracks and returns how many were removed
---
Removes every track still waiting in the queue and keeps the current track playing. Returns the number of tracks removed (`0` when the queue was empty). Use `$stopMusic` to stop playback as well. Requires a configured music (Lavalink) service with an active player.

## Examples

### Example

```bdfd
$description[Cleared $clearQueue track(s) from the queue.]
```
