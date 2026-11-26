---
layout: doc
title: $createStageInstance[]
translation_key: docs
category: "Moderation"
function_name: createStageInstance
syntax: $createStageInstance[channelID;topic;(privacylevel);(notify);(eventID)]
description: "Creates a new stage instance, returns instance id."
---
# $createStageInstance — Creates a new stage instance, returns instance id.

## Syntax

```
$createStageInstance[channelID;topic;(privacylevel);(notify);(eventID)]
```

## Parameters

- **channelID** *(id, required)* — The channel to create stage instance on
- **topic** *(text, required)* — The topic of the stage instance
- **privacylevel** *(text, optional)* — The privacy level of the stage instance
- **notify** *(yes/no, optional)* — Whether to notify @everyone that the stage instance has started
- **eventID** *(id, optional)* — The scheduled event associated with the stage instance

## Return Value

- StageInstance.

## Usage

```
$createStageInstance[channelID;topic;(privacylevel);(notify);(eventID)] → result
```

## Example

```bdfd
$sendMessage[$createStageInstance[32;Town hall]]
```
