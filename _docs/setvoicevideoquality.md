---
layout: doc
title: $setVoiceVideoQuality[]
translation_key: docs
category: "Moderation"
function_name: setVoiceVideoQuality
syntax: $setVoiceVideoQuality[channelID;quality;(reason)]
description: "Sets the video quality of a voice channel, returns bool."
---
# $setVoiceVideoQuality — Sets the video quality of a voice channel, returns bool.

## Syntax

```
$setVoiceVideoQuality[channelID;quality;(reason)]
```

## Parameters

- **channelID** *(id, required)* — The channel to edit video quality
- **quality** *(text, required)* — The new video quality
- **reason** *(text, optional)* — The reason to change the video quality

## Return Value

- Boolean.

## Usage

```
$setVoiceVideoQuality[channelID;quality;(reason)] → result
```

## Example

```bdfd
$sendMessage[$setVoiceVideoQuality[32;1]]
```
