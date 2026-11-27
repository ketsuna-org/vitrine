---
layout: doc
title: $shuffleQueue[]
translation_key: docs
category: Music
function_name: shuffleQueue
syntax: $shuffleQueue
description: Shuffles the tracks still waiting in the queue
---
Shuffles the upcoming tracks; the track playing now is not moved. Returns an empty string. With nothing queued it does nothing. Requires a configured music (Lavalink) service with an active player, otherwise an error is raised.

## Examples

### Example

```bdfd
$shuffleQueue
$description[The queue has been shuffled.]
```
