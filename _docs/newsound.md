---
layout: doc
title: $newSound[]
translation_key: docs
category: "Events"
function_name: newSound
syntax: $newSound[property;(separator)]
description: "State of the sound of a soundboardSound event. Properties: name, id, guildID, userID, emoji, volume, timestamp, available, url."
---
# $newSound — State of the sound of a soundboardSound event. Properties: name, id, guildID, userID, emoji, volume, timestamp, available, url.

## Syntax

```
$newSound[property;(separator)]
```

## Parameters

- **property** *(String, required)* — Property
- **separator** *(String, optional)* — Ignored

## Return Value

- String.

## Usage

```
$newSound[property] → value
```

## Example

```bdfd
$sendMessage[$newSound[property]]
```
