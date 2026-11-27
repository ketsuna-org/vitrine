---
layout: doc
title: $addMediaItem[]
translation_key: docs
category: "Components & Interactions"
function_name: addMediaItem
syntax: $addMediaItem[url;(description);(spoiler)]
description: "Adds a new media gallery item"
---
# $addMediaItem — Adds a new media gallery item

## Syntax

```
$addMediaItem[url;(description);(spoiler)]
```

## Parameters

- **url** *(text, required)* — The url for the media item
- **description** *(text, optional)* — The description of the media item
- **spoiler** *(boolean, optional)* — Whether to set a spoiler

## Return Value

- String.

## Usage

```
$addMediaItem[url;(description);(spoiler)] → result
```

## Example

```bdfd
$addMediaGallery[g]$addMediaItem[https://example.com/a.png;Picture;true]
```
