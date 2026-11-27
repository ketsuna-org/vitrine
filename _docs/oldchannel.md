---
layout: doc
title: $oldChannel[]
translation_key: docs
category: "Events"
function_name: oldChannel
syntax: $oldChannel[property;(separator)]
description: "Previous state of the channel before an update (channelUpdate). Properties: id, name, type, topic, nsfw, position, rawPosition, parentID, slowmode, lastMessageID, lastPinTimestamp."
---
# $oldChannel — Previous state of the channel before an update (channelUpdate). Properties: id, name, type, topic, nsfw, position, rawPosition, parentID, slowmode, lastMessageID, lastPinTimestamp.

## Syntax

```
$oldChannel[property;(separator)]
```

## Parameters

- **property** *(String, required)* — Property to read; see the list above
- **separator** *(String, optional)* — Separator for list values (default comma)

## Return Value

- String.

## Usage

```
$oldChannel[property;(separator)] → value
```

## Example

```bdfd
$sendMessage[$oldChannel[property;(separator)]]
```
