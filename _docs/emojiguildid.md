---
layout: doc
title: $emojiGuildID[]
translation_key: docs
category: "Moderation"
function_name: emojiGuildID
syntax: $emojiGuildID[emojiID]
description: "Returns the emoji guild id."
---
# $emojiGuildID — Returns the emoji guild id.

## Syntax

```
$emojiGuildID[emojiID]
```

## Parameters

- **emojiID** *(id, required)* — The emoji to return its guild id

## Return Value

- Guild.

## Usage

```
$emojiGuildID[emojiID] → result
```

## Example

```bdfd
$sendMessage[$emojiGuildID[70001]]
```
