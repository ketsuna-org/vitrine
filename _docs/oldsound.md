---
layout: doc
title: $oldSound[]
translation_key: docs
category: "Events"
function_name: oldSound
syntax: $oldSound[property;(separator)]
description: "Sound before a soundboardSoundUpdate event. Properties: name, id, guildID, userID, emoji, volume, timestamp, available, url."
---
# $oldSound — Sound before a soundboardSoundUpdate event. Properties: name, id, guildID, userID, emoji, volume, timestamp, available, url.

## Syntax

```
$oldSound[property;(separator)]
```

## Parameters

- **property** *(String, required)* — Property
- **separator** *(String, optional)* — Ignored

## Return Value

- String.

## Usage

```
$oldSound[property] → value
```

## Example

```bdfd
$sendMessage[$oldSound[property]]
```
