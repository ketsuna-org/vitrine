---
layout: doc
title: $setChannelArchiveDuration[]
translation_key: docs
category: "Moderation"
function_name: setChannelArchiveDuration
syntax: $setChannelArchiveDuration[channelID;duration;(reason)]
description: "Modifies a channel's archive duration."
---
# $setChannelArchiveDuration — Modifies a channel's archive duration.

## Syntax

```
$setChannelArchiveDuration[channelID;duration;(reason)]
```

## Parameters

- **channelID** *(id, required)* — The channel to modify
- **duration** *(text, required)* — The new duration of archive
- **reason** *(text, optional)* — The reason for modifying archive duration

## Return Value

- Boolean.

## Usage

```
$setChannelArchiveDuration[channelID;duration;(reason)] → result
```

## Example

```bdfd
$sendMessage[$setChannelArchiveDuration[35;60]]
```
