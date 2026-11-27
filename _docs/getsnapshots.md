---
layout: doc
title: $getSnapshots[]
translation_key: docs
category: "Entity Info"
function_name: getSnapshots
syntax: $getSnapshots[channelID;messageID;(index);(property);(separator)]
description: "Retrieves data of snapshots from a message"
---
# $getSnapshots — Retrieves data of snapshots from a message

## Syntax

```
$getSnapshots[channelID;messageID;(index);(property);(separator)]
```

## Parameters

- **channelID** *(id, required)* — The channel to pull message from
- **messageID** *(id, required)* — The message to retrieve data from
- **index** *(number, optional)* — The index of the snapshot to get
- **property** *(text, optional)* — The property to pull
- **separator** *(text, optional)* — The separator to use in case of array

## Return Value

- Json.

## Usage

```
$getSnapshots[channelID;messageID;(index);(property);(separator)] → result
```

## Example

```bdfd
$sendMessage[$getSnapshots[30;1000;0;content]]
```
