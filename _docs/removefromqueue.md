---
layout: doc
title: $removeFromQueue[]
translation_key: docs
category: Music
function_name: removeFromQueue
syntax: $removeFromQueue[position]
description: Removes an upcoming track and returns its title
---
Removes the upcoming track at `position` (1 is the next track) and returns its title. Raises the error `bad-position` when there is no track at that position and `Invalid queue position.` when the value is not a number. Requires a configured music (Lavalink) service with an active player.

## Parameters

| Parameter | Description |
|---|---|
| `position` | Required - Position of the track in the upcoming queue, starting at 1. |

## Examples

### Example

```bdfd
$description[Removed **$removeFromQueue[$message]**.]
```
