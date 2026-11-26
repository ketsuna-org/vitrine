---
layout: doc
title: $deleteForumTags[]
translation_key: docs
category: "Moderation"
function_name: deleteForumTags
syntax: $deleteForumTags[channelID;tags...]
description: "Deletes tags from a forum, returns bool"
---
# $deleteForumTags — Deletes tags from a forum, returns bool

## Syntax

```
$deleteForumTags[channelID;tags...]
```

## Parameters

- **channelID** *(id, required)* — The forum to delete tags from
- **tags...** *(text, required)* — The tags to delete

## Return Value

- Boolean.

## Usage

```
$deleteForumTags[channelID;tags...] → result
```

## Example

```bdfd
$sendMessage[$deleteForumTags[36;Help]]
```
