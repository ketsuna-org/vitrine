---
layout: doc
title: $oldEmoji[]
translation_key: docs
category: "Events"
function_name: oldEmoji
syntax: $oldEmoji[property;(separator)]
description: "Emoji before an emojiUpdate event. Properties: id, name, animated, managed, available, requiresColons, roles, authorID, url."
---
# $oldEmoji — Emoji before an emojiUpdate event. Properties: id, name, animated, managed, available, requiresColons, roles, authorID, url.

## Syntax

```
$oldEmoji[property;(separator)]
```

## Parameters

- **property** *(String, required)* — Property
- **separator** *(String, optional)* — Separator for lists

## Return Value

- String.

## Usage

```
$oldEmoji[property] → value
```

## Example

```bdfd
$sendMessage[$oldEmoji[property]]
```
