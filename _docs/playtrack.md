---
layout: doc
title: $playTrack[]
translation_key: docs
category: "Music"
function_name: playTrack
syntax: $playTrack[channelID;query]
description: "Plays a track by query in a voice channel (the other ForgeMusic arguments are ignored)."
---
# $playTrack — Plays a track by query in a voice channel (the other ForgeMusic arguments are ignored).

## Syntax

```
$playTrack[channelID;query]
```

## Parameters

- **channelID** *(String, required)* — Voice channel ID
- **query** *(String, required)* — Track name or link

## Return Value

- None.

## Usage

```
$playTrack[channelID;query] → result
```

## Example

```bdfd
$sendMessage[$playTrack[channelID;query]]
```
