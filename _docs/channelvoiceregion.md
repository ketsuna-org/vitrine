---
layout: doc
title: $channelVoiceRegion[]
translation_key: docs
category: "Entity Info"
function_name: channelVoiceRegion
syntax: $channelVoiceRegion[channelID]
description: "Returns the region of a voice channel."
---
# $channelVoiceRegion — Returns the region of a voice channel.

## Syntax

```
$channelVoiceRegion[channelID]
```

## Parameters

- **channelID** *(id, required)* — The channel to get its region

## Return Value

- VoiceRegionType.

## Usage

```
$channelVoiceRegion[channelID] → result
```

## Example

```bdfd
$sendMessage[$channelVoiceRegion[32]]
```
