---
layout: doc
title: $forumDefaultLayout[]
translation_key: docs
category: "Entity Info"
function_name: forumDefaultLayout
syntax: $forumDefaultLayout[channelID]
description: "Returns the default layout of a forum."
---
# $forumDefaultLayout — Returns the default layout of a forum.

## Syntax

```
$forumDefaultLayout[channelID]
```

## Parameters

- **channelID** *(id, required)* — The channel to get default layout from

## Return Value

- ForumLayoutType.

## Usage

```
$forumDefaultLayout[channelID] → result
```

## Example

```bdfd
$sendMessage[$forumDefaultLayout[36]]
```
