---
layout: doc
title: $setDefaultThreadArchiveDuration[]
translation_key: docs
category: "Moderation"
function_name: setDefaultThreadArchiveDuration
syntax: $setDefaultThreadArchiveDuration[channelID;duration;(reason)]
description: "Sets a forum's default auto archive duration of posts."
---
# $setDefaultThreadArchiveDuration — Sets a forum's default auto archive duration of posts.

## Syntax

```
$setDefaultThreadArchiveDuration[channelID;duration;(reason)]
```

## Parameters

- **channelID** *(id, required)* — The forum to modify
- **duration** *(text, required)* — The new duration of auto archive
- **reason** *(text, optional)* — The reason for modifying archive duration

## Return Value

- Boolean.

## Usage

```
$setDefaultThreadArchiveDuration[channelID;duration;(reason)] → result
```

## Example

```bdfd
$sendMessage[$setDefaultThreadArchiveDuration[36;1440]]
```
