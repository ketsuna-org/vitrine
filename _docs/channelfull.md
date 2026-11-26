---
layout: doc
title: $channelFull[]
translation_key: docs
category: "Entity Info"
function_name: channelFull
syntax: $channelFull[(channelID)]
description: "Whether a voice channel has reached its user limit."
---
# $channelFull — Whether a voice channel has reached its user limit.

## Syntax

```
$channelFull[(channelID)]
```

## Parameters

- **channelID** *(String, optional)* — Voice channel ID (empty: the current channel)

## Return Value

- Boolean.

## Usage

```
$channelFull[channelID] → result
```

## Example

```bdfd
$sendMessage[$channelFull[channelID]]
```
