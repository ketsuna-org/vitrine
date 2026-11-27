---
layout: doc
title: $emojiURL[]
translation_key: docs
category: "Moderation"
function_name: emojiURL
syntax: $emojiURL[emojiID]
description: "Returns the emoji url."
---
# $emojiURL — Returns the emoji url.

## Syntax

```
$emojiURL[emojiID]
```

## Parameters

- **emojiID** *(id, required)* — The emoji to return its url

## Return Value

- URL.

## Usage

```
$emojiURL[emojiID] → result
```

## Example

```bdfd
$sendMessage[$emojiURL[70002]]
```
