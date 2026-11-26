---
layout: doc
title: $emojiAnimated[]
translation_key: docs
category: "Emoji"
function_name: emojiAnimated
syntax: $emojiAnimated[emojiID]
description: "Returns whether the emoji is animated (ForgeScript name of $isEmojiAnimated)."
---
# $emojiAnimated — Returns whether the emoji is animated

## Syntax

```
$emojiAnimated[emojiID]
```

## Parameters

- **emojiID** *(id, required)* — The emoji to check

## Return Value

- Boolean.

## Usage

```
$emojiAnimated[emojiID] → true or false
```

## Example

```bdfd
$sendMessage[$emojiAnimated[70002]]
```
