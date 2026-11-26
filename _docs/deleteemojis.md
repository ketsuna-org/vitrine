---
layout: doc
title: $deleteEmojis[]
translation_key: docs
category: "Moderation"
function_name: deleteEmojis
syntax: $deleteEmojis[guildID;emojis]
description: "Deletes given emojis from a guild, returns the count of emotes deleted."
---
# $deleteEmojis — Deletes given emojis from a guild, returns the count of emotes deleted.

## Syntax

```
$deleteEmojis[guildID;emojis]
```

## Parameters

- **guildID** *(id, required)* — The guild to delete emotes from
- **emojis** *(text, required)* — The emojis to delete

## Return Value

- Number.

## Usage

```
$deleteEmojis[guildID;emojis] → result
```

## Example

```bdfd
$sendMessage[$deleteEmojis[10;70001;70002]]
```
