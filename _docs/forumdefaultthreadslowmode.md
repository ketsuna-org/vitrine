---
layout: doc
title: $forumDefaultThreadSlowmode[]
translation_key: docs
category: "Entity Info"
function_name: forumDefaultThreadSlowmode
syntax: $forumDefaultThreadSlowmode[channelID]
description: "Returns the default slowmode for threads of a forum."
---
# $forumDefaultThreadSlowmode — Returns the default slowmode for threads of a forum.

## Syntax

```
$forumDefaultThreadSlowmode[channelID]
```

## Parameters

- **channelID** *(id, required)* — The channel to get default slowmode from

## Return Value

- Number.

## Usage

```
$forumDefaultThreadSlowmode[channelID] → result
```

## Example

```bdfd
$sendMessage[$forumDefaultThreadSlowmode[36]]
```
