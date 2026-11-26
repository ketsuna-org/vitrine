---
layout: doc
title: $getAvailableProviders[]
translation_key: docs
category: "Music"
function_name: getAvailableProviders
syntax: $getAvailableProviders
description: "Sources that $playMusic and $searchMusic understand: YouTube, YouTubeMusic, SoundCloud and Spotify."
---
# $getAvailableProviders — Sources that $playMusic and $searchMusic understand: YouTube, YouTubeMusic, SoundCloud and Spotify.

## Syntax

```
$getAvailableProviders
```

## Parameters

None.

## Return Value

- String.

## Usage

```
$getAvailableProviders → result
```

## Example

```bdfd
$sendMessage[$getAvailableProviders]
```
