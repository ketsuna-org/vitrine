---
layout: doc
title: $setDefaultThreadSlowmode[]
translation_key: docs
category: "Moderation"
function_name: setDefaultThreadSlowmode
syntax: $setDefaultThreadSlowmode[channelID;seconds;(reason)]
description: "Sets a forum's default slowmode for posts."
---
# $setDefaultThreadSlowmode — Sets a forum's default slowmode for posts.

## Syntax

```
$setDefaultThreadSlowmode[channelID;seconds;(reason)]
```

## Parameters

- **channelID** *(id, required)* — The forum to modify
- **seconds** *(number, required)* — The new default slowmode
- **reason** *(text, optional)* — The reason for modifying default slowmode

## Return Value

- Boolean.

## Usage

```
$setDefaultThreadSlowmode[channelID;seconds;(reason)] → result
```

## Example

```bdfd
$sendMessage[$setDefaultThreadSlowmode[36;5]]
```
