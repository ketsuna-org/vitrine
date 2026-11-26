---
layout: doc
title: $editForumTag[]
translation_key: docs
category: "Moderation"
function_name: editForumTag
syntax: $editForumTag[channelID;tagID;(name);(emoji);(moderated)]
description: "Edits an existing forum tag, returns bool"
---
# $editForumTag — Edits an existing forum tag, returns bool

## Syntax

```
$editForumTag[channelID;tagID;(name);(emoji);(moderated)]
```

## Parameters

- **channelID** *(id, required)* — The forum to edit tag on
- **tagID** *(id, required)* — The tag to edit
- **name** *(text, optional)* — The new name for the tag
- **emoji** *(text, optional)* — The new emoji for the tag
- **moderated** *(boolean, optional)* — Whether the tag can only be applied by mods

## Return Value

- Boolean.

## Usage

```
$editForumTag[channelID;tagID;(name);(emoji);(moderated)] → result
```

## Example

```bdfd
$sendMessage[$editForumTag[36;900;Support]]
```
