---
layout: doc
title: $newEmoji[]
translation_key: docs
category: "Events"
function_name: newEmoji
syntax: $newEmoji[property;(separator)]
description: "Emoji of an emojiCreate or emojiUpdate event (the emoji that was removed for emojiDelete). Properties: id, name, animated, managed, available, requiresColons, roles, authorID, url."
---
# $newEmoji — Emoji of an emojiCreate or emojiUpdate event (the emoji that was removed for emojiDelete). Properties: id, name, animated, managed, available, requiresColons, roles, authorID, url.

## Syntax

```
$newEmoji[property;(separator)]
```

## Parameters

- **property** *(String, required)* — Property
- **separator** *(String, optional)* — Separator for lists

## Return Value

- String.

## Usage

```
$newEmoji[property] → value
```

## Example

```bdfd
$sendMessage[$newEmoji[property]]
```
