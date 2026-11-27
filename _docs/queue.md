---
layout: doc
title: $queue[]
translation_key: docs
category: "Music"
function_name: queue
syntax: $queue[(start);(end);(text);(separator)]
description: "Lists the queued tracks, one line each."
---
# $queue — Lists the queued tracks, one line each.

## Syntax

```
$queue[(start);(end);(text);(separator)]
```

## Parameters

- **start** *(Number, optional)* — Start index (0 is the next track)
- **end** *(Number, optional)* — End index, as Array.slice
- **text** *(String, optional)* — Line per track, with {position}, {track.title}, {track.author}, {track.duration} and {track.url}
- **separator** *(String, optional)* — Separator (default ",")

## Return Value

- String.

## Usage

```
$queue[start;end;text;separator] → result
```

## Example

```bdfd
$sendMessage[$queue[start;end;text;separator]]
```
