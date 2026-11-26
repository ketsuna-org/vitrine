---
layout: doc
title: $emojiAuthorID[]
translation_key: docs
category: "Moderation"
function_name: emojiAuthorID
syntax: $emojiAuthorID[emojiID]
description: "Returns the author id of an emoji."
---
# $emojiAuthorID — Returns the author id of an emoji.

## Syntax

```
$emojiAuthorID[emojiID]
```

## Parameters

- **emojiID** *(id, required)* — The emoji to return its author

## Return Value

- User.

## Usage

```
$emojiAuthorID[emojiID] → result
```

## Example

```bdfd
$sendMessage[$emojiAuthorID[70001]]
```
