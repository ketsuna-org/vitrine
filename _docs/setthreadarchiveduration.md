---
layout: doc
title: $setThreadArchiveDuration[]
translation_key: docs
category: "Moderation"
function_name: setThreadArchiveDuration
syntax: $setThreadArchiveDuration[channelID;duration;(reason)]
description: "Sets a thread's auto archive duration."
---
# $setThreadArchiveDuration — Sets a thread's auto archive duration.

## Syntax

```
$setThreadArchiveDuration[channelID;duration;(reason)]
```

## Parameters

- **channelID** *(id, required)* — The thread to modify
- **duration** *(text, required)* — The new duration of auto archive
- **reason** *(text, optional)* — The reason for modifying archive duration

## Return Value

- Boolean.

## Usage

```
$setThreadArchiveDuration[channelID;duration;(reason)] → result
```

## Example

```bdfd
$sendMessage[$setThreadArchiveDuration[35;60]]
```
