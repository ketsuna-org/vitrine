---
layout: doc
title: $setVoiceRegion[]
translation_key: docs
category: "Moderation"
function_name: setVoiceRegion
syntax: $setVoiceRegion[channelID;(region);(reason)]
description: "Sets the region of a voice channel, returns bool."
---
# $setVoiceRegion — Sets the region of a voice channel, returns bool.

## Syntax

```
$setVoiceRegion[channelID;(region);(reason)]
```

## Parameters

- **channelID** *(id, required)* — The channel to set region
- **region** *(text, optional)* — The region to set, leave empty to remove a fixed region
- **reason** *(text, optional)* — The reason to set the voice region

## Return Value

- Boolean.

## Usage

```
$setVoiceRegion[channelID;(region);(reason)] → result
```

## Example

```bdfd
$sendMessage[$setVoiceRegion[32;eu-west]]
```
