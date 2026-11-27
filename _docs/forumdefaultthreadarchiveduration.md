---
layout: doc
title: $forumDefaultThreadArchiveDuration[]
translation_key: docs
category: "Entity Info"
function_name: forumDefaultThreadArchiveDuration
syntax: $forumDefaultThreadArchiveDuration[channelID]
description: "Returns the default auto archive duration for threads of a forum."
---
# $forumDefaultThreadArchiveDuration — Returns the default auto archive duration for threads of a forum.

## Syntax

```
$forumDefaultThreadArchiveDuration[channelID]
```

## Parameters

- **channelID** *(id, required)* — The channel to get default sort order from

## Return Value

- ThreadAutoArchiveDuration.

## Usage

```
$forumDefaultThreadArchiveDuration[channelID] → result
```

## Example

```bdfd
$sendMessage[$forumDefaultThreadArchiveDuration[36]]
```
