---
layout: doc
title: $queueHistory[]
translation_key: docs
category: "Music"
function_name: queueHistory
syntax: $queueHistory[(start);(end);(text);(separator)]
description: "Lists the tracks already played, oldest first."
---
# $queueHistory — Lists the tracks already played, oldest first.

## Syntax

```
$queueHistory[(start);(end);(text);(separator)]
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
$queueHistory[start;end;text;separator] → result
```

## Example

```bdfd
$sendMessage[$queueHistory[start;end;text;separator]]
```
