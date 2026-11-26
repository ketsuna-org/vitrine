---
layout: doc
title: $modifyPostTags[]
translation_key: docs
category: "Moderation"
function_name: modifyPostTags
syntax: $modifyPostTags[channelID;(reason);tags]
description: "Modifies tags of a forum post, returns bool."
---
# $modifyPostTags — Modifies tags of a forum post, returns bool.

## Syntax

```
$modifyPostTags[channelID;(reason);tags]
```

## Parameters

- **channelID** *(id, required)* — The post to edit tags on
- **reason** *(text, optional)* — The reason for modifying post tags
- **tags** *(text, required)* — The tags for the post

## Return Value

- Boolean.

## Usage

```
$modifyPostTags[channelID;(reason);tags] → result
```

## Example

```bdfd
$sendMessage[$modifyPostTags[37;;Help]]
```
