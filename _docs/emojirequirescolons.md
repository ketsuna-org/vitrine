---
layout: doc
title: $emojiRequiresColons[]
translation_key: docs
category: "Moderation"
function_name: emojiRequiresColons
syntax: $emojiRequiresColons[emojiID]
description: "Returns whether the emoji requires colons."
---
# $emojiRequiresColons — Returns whether the emoji requires colons.

## Syntax

```
$emojiRequiresColons[emojiID]
```

## Parameters

- **emojiID** *(id, required)* — The emoji to return its colons state

## Return Value

- Boolean.

## Usage

```
$emojiRequiresColons[emojiID] → result
```

## Example

```bdfd
$sendMessage[$emojiRequiresColons[70001]]
```
