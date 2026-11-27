---
layout: doc
title: $newChannel[]
translation_key: docs
category: "Events"
function_name: newChannel
syntax: $newChannel[property;(separator)]
description: "State of the channel after an update (channelUpdate). Properties: id, name, type, topic, nsfw, position, rawPosition, parentID, slowmode, lastMessageID, lastPinTimestamp."
---
# $newChannel — State of the channel after an update (channelUpdate). Properties: id, name, type, topic, nsfw, position, rawPosition, parentID, slowmode, lastMessageID, lastPinTimestamp.

## Syntax

```
$newChannel[property;(separator)]
```

## Parameters

- **property** *(String, required)* — Property to read; see the list above
- **separator** *(String, optional)* — Separator for list values (default comma)

## Return Value

- String.

## Usage

```
$newChannel[property;(separator)] → value
```

## Example

```bdfd
$sendMessage[$newChannel[property;(separator)]]
```
