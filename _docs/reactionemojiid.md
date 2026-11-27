---
layout: doc
title: $reactionEmojiID[]
translation_key: docs
category: "Events"
function_name: reactionEmojiID
syntax: $reactionEmojiID
description: "Returns the ID of the custom emoji used (empty for a unicode emoji)."
---
# $reactionEmojiID — Returns the ID of the custom emoji used (empty for a unicode emoji).

## Syntax

```
$reactionEmojiID
```

## Parameters

None.

## Return Value

- String.

## Usage

```
$reactionEmojiID → result
```

## Example

```bdfd
$sendMessage[$reactionEmojiID]
```
