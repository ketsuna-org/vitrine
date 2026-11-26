---
layout: doc
title: $guildSplashURL[]
translation_key: docs
category: "Entity Info"
function_name: guildSplashURL
syntax: $guildSplashURL[guildID;(size);(extension)]
description: "Returns the guild splash url."
---
# $guildSplashURL — Returns the guild splash url.

## Syntax

```
$guildSplashURL[guildID;(size);(extension)]
```

## Parameters

- **guildID** *(id, required)* — The guild to retrieve the splash
- **size** *(number, optional)* — The size to use for the image
- **extension** *(text, optional)* — The extension to use for the image

## Return Value

- URL.

## Usage

```
$guildSplashURL[guildID;(size);(extension)] → result
```

## Example

```bdfd
$sendMessage[$guildSplashURL]
```
