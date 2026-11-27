---
layout: doc
title: $emoji[]
translation_key: docs
category: "Moderation"
function_name: emoji
syntax: $emoji[emojiID]
description: "Formats given emoji."
---
# $emoji — Formats given emoji.

## Syntax

```
$emoji[emojiID]
```

## Parameters

- **emojiID** *(id, required)* — The emoji id to format

## Return Value

- String.

## Usage

```
$emoji[emojiID] → result
```

## Example

```bdfd
$sendMessage[$emoji[70002]]
```
