---
layout: doc
title: $editApplicationEmoji[]
translation_key: docs
category: "Moderation"
function_name: editApplicationEmoji
syntax: $editApplicationEmoji[emojiID;name]
description: "Edits an application emoji, returns bool"
---
# $editApplicationEmoji — Edits an application emoji, returns bool

## Syntax

```
$editApplicationEmoji[emojiID;name]
```

## Parameters

- **emojiID** *(id, required)* — The emoji to edit
- **name** *(text, required)* — The new name for the emoji

## Return Value

- Boolean.

## Usage

```
$editApplicationEmoji[emojiID;name] → result
```

## Example

```bdfd
$sendMessage[$editApplicationEmoji[800;renamed]]
```
