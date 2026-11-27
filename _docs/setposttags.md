---
layout: doc
title: $setPostTags[]
translation_key: docs
category: "Moderation"
function_name: setPostTags
syntax: $setPostTags[channelID;(reason);(tags)]
description: "Sets tags to a forum post, returns bool."
---
# $setPostTags — Sets tags to a forum post, returns bool.

## Syntax

```
$setPostTags[channelID;(reason);(tags)]
```

## Parameters

- **channelID** *(id, required)* — The post to set tags on
- **reason** *(text, optional)* — The reason for setting post tags
- **tags** *(text, optional)* — The tags for the post

## Return Value

- Boolean.

## Usage

```
$setPostTags[channelID;(reason);(tags)] → result
```

## Example

```bdfd
$sendMessage[$setPostTags[37;;Help]]
```
