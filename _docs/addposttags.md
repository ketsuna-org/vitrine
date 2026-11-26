---
layout: doc
title: $addPostTags[]
translation_key: docs
category: "Moderation"
function_name: addPostTags
syntax: $addPostTags[channelID;(reason);tags]
description: "Adds tags to a forum post, returns bool."
---
# $addPostTags — Adds tags to a forum post, returns bool.

## Syntax

```
$addPostTags[channelID;(reason);tags]
```

## Parameters

- **channelID** *(id, required)* — The post to edit tags on
- **reason** *(text, optional)* — The reason for adding post tags
- **tags** *(text, required)* — The tags for the post

## Return Value

- Boolean.

## Usage

```
$addPostTags[channelID;(reason);tags] → result
```

## Example

```bdfd
$sendMessage[$addPostTags[37;;Help]]
```
