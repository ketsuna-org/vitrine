---
layout: doc
title: $setVoiceBitrate[]
translation_key: docs
category: "Moderation"
function_name: setVoiceBitrate
syntax: $setVoiceBitrate[channelID;bitrate;(reason)]
description: "Sets the bitrate quality of a voice channel, returns bool."
---
# $setVoiceBitrate — Sets the bitrate quality of a voice channel, returns bool.

## Syntax

```
$setVoiceBitrate[channelID;bitrate;(reason)]
```

## Parameters

- **channelID** *(id, required)* — The channel to edit bitrate
- **bitrate** *(number, required)* — The new bitrate
- **reason** *(text, optional)* — The reason to change the bitrate

## Return Value

- Boolean.

## Usage

```
$setVoiceBitrate[channelID;bitrate;(reason)] → result
```

## Example

```bdfd
$sendMessage[$setVoiceBitrate[32;64000]]
```
