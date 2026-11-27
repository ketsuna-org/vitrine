---
layout: doc
title: $trackInfo[]
translation_key: docs
category: "Music"
function_name: trackInfo
syntax: $trackInfo[property]
description: "Information of the current track: title, author, duration (ms), position (ms) or volume."
---
# $trackInfo — Information of the current track: title, author, duration (ms), position (ms) or volume.

## Syntax

```
$trackInfo[property]
```

## Parameters

- **property** *(String, required)* — Property

## Return Value

- String.

## Usage

```
$trackInfo[property] → result
```

## Example

```bdfd
$sendMessage[$trackInfo[property]]
```
