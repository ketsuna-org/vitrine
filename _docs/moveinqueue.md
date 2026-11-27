---
layout: doc
title: $moveInQueue[]
translation_key: docs
category: Music
function_name: moveInQueue
syntax: $moveInQueue[from;to]
description: Moves an upcoming track to another position and returns its title
---
Moves the upcoming track at `from` to position `to` (both start at 1, 1 is the next track) and returns its title. Raises the error `bad-from` or `bad-to` when a position is outside the upcoming queue. Requires a configured music (Lavalink) service with an active player.

## Parameters

| Parameter | Description |
|---|---|
| `from` | Required - Current position of the track. |
| `to` | Required - New position of the track. |

## Examples

### Example

```bdfd
$description[Moved **$moveInQueue[2;1]** to the front.]
```
