---
layout: doc
title: $emojiID[]
translation_key: docs
category: "Moderation"
function_name: emojiID
syntax: $emojiID[emojiname]
description: "Returns the emoji id."
---
# $emojiID — Returns the emoji id.

## Syntax

```
$emojiID[emojiname]
```

## Parameters

- **emojiname** *(text, required)* — The emoji name to return its id

## Return Value

- Emoji.

## Usage

```
$emojiID[emojiname] → result
```

## Example

```bdfd
$sendMessage[$emojiID[dance]]
```
