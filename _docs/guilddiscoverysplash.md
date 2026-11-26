---
layout: doc
title: $guildDiscoverySplash[]
translation_key: docs
category: "Entity Info"
function_name: guildDiscoverySplash
syntax: $guildDiscoverySplash[guildID;(size);(extension)]
description: "Returns the guild discovery splash."
---
# $guildDiscoverySplash — Returns the guild discovery splash.

## Syntax

```
$guildDiscoverySplash[guildID;(size);(extension)]
```

## Parameters

- **guildID** *(id, required)* — The guild to retrieve the discovery splash
- **size** *(number, optional)* — The size to use for the image
- **extension** *(text, optional)* — The extension to use for the image

## Return Value

- URL.

## Usage

```
$guildDiscoverySplash[guildID;(size);(extension)] → result
```

## Example

```bdfd
$sendMessage[Value: $guildDiscoverySplash]
```
