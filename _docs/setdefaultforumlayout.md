---
layout: doc
title: $setDefaultForumLayout[]
translation_key: docs
category: "Moderation"
function_name: setDefaultForumLayout
syntax: $setDefaultForumLayout[channelID;layout;(reason)]
description: "Sets a forum's default layout of posts."
---
# $setDefaultForumLayout — Sets a forum's default layout of posts.

## Syntax

```
$setDefaultForumLayout[channelID;layout;(reason)]
```

## Parameters

- **channelID** *(id, required)* — The forum to modify
- **layout** *(text, required)* — The new default layout
- **reason** *(text, optional)* — The reason for modifying default layout

## Return Value

- Boolean.

## Usage

```
$setDefaultForumLayout[channelID;layout;(reason)] → result
```

## Example

```bdfd
$sendMessage[$setDefaultForumLayout[36;1]]
```
