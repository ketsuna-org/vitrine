---
layout: doc
title: $deleteStickers[]
translation_key: docs
category: "Moderation"
function_name: deleteStickers
syntax: $deleteStickers[guildID;stickers]
description: "Deletes given stickers, returns the count of stickers deleted."
---
# $deleteStickers — Deletes given stickers, returns the count of stickers deleted.

## Syntax

```
$deleteStickers[guildID;stickers]
```

## Parameters

- **guildID** *(id, required)* — The guild to delete stickers from
- **stickers** *(text, required)* — The stickers to delete

## Return Value

- Number.

## Usage

```
$deleteStickers[guildID;stickers] → result
```

## Example

```bdfd
$sendMessage[$deleteStickers[10;80001]]
```
