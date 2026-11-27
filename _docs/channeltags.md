---
layout: doc
title: $channelTags[]
translation_key: docs
category: "Entity Info"
function_name: channelTags
syntax: $channelTags[channelID;(separator)]
description: "Retrieves tags from a forum thread."
---
# $channelTags — Retrieves tags from a forum thread.

## Syntax

```
$channelTags[channelID;(separator)]
```

## Parameters

- **channelID** *(id, required)* — The channel to get tags of
- **separator** *(text, optional)* — The separator to use for every tag

## Return Value

- ForumTag[].

## Usage

```
$channelTags[channelID;(separator)] → result
```

## Example

```bdfd
$sendMessage[$channelTags[36]]
```
