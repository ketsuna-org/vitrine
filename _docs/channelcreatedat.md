---
layout: doc
title: $channelCreatedAt[]
translation_key: docs
category: "Entity Info"
function_name: channelCreatedAt
syntax: $channelCreatedAt[channelID]
description: "Returns the channel timestamp."
---
# $channelCreatedAt — Returns the channel timestamp.

## Syntax

```
$channelCreatedAt[channelID]
```

## Parameters

- **channelID** *(id, required)* — The id of the channel

## Return Value

- Number.

## Usage

```
$channelCreatedAt[channelID] → result
```

## Example

```bdfd
$sendMessage[$channelCreatedAt[30]]
```
