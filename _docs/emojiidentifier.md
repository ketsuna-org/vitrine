---
layout: doc
title: $emojiIdentifier[]
translation_key: docs
category: "Moderation"
function_name: emojiIdentifier
syntax: $emojiIdentifier[emojiID]
description: "Returns the emoji identifier."
---
# $emojiIdentifier — Returns the emoji identifier.

## Syntax

```
$emojiIdentifier[emojiID]
```

## Parameters

- **emojiID** *(id, required)* — The emoji to return its identifier

## Return Value

- String.

## Usage

```
$emojiIdentifier[emojiID] → result
```

## Example

```bdfd
$sendMessage[$emojiIdentifier[70002]]
```
