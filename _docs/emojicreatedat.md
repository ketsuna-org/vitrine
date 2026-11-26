---
layout: doc
title: $emojiCreatedAt[]
translation_key: docs
category: "Moderation"
function_name: emojiCreatedAt
syntax: $emojiCreatedAt[emojiID]
description: "Returns the emoji creation timestamp."
---
# $emojiCreatedAt — Returns the emoji creation timestamp.

## Syntax

```
$emojiCreatedAt[emojiID]
```

## Parameters

- **emojiID** *(id, required)* — The emoji to return its creation timestamp

## Return Value

- Number.

## Usage

```
$emojiCreatedAt[emojiID] → result
```

## Example

```bdfd
$sendMessage[$emojiCreatedAt[70001]]
```
