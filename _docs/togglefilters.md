---
layout: doc
title: $toggleFilters[]
translation_key: docs
category: "Music"
function_name: toggleFilters
syntax: $toggleFilters[filters]
description: "Toggles audio filters: Bassboost_low, Bassboost, Bassboost_high, Subboost, Treble, 8d, Vaporwave, Nightcore, Lofi, Tremolo, Vibrato, Karaoke, Mono, Earrape. The FFMPEG-only filters of ForgeMusic (Phaser, Reverse, Flanger...) are refused."
---
# $toggleFilters — Toggles audio filters: Bassboost_low, Bassboost, Bassboost_high, Subboost, Treble, 8d, Vaporwave, Nightcore, Lofi, Tremolo, Vibrato, Karaoke, Mono, Earrape. The FFMPEG-only filters of ForgeMusic (Phaser, Reverse, Flanger...) are refused.

## Syntax

```
$toggleFilters[filters]
```

## Parameters

- **filters** *(String, required)* — Filter names, one argument each

## Return Value

- String.

## Usage

```
$toggleFilters[filters] → result
```

## Example

```bdfd
$sendMessage[$toggleFilters[filters]]
```
