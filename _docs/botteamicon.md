---
layout: doc
title: $botTeamIcon[]
translation_key: docs
category: "Entity Info"
function_name: botTeamIcon
syntax: $botTeamIcon[(size);(extension)]
description: "Returns the client's team icon"
---
# $botTeamIcon — Returns the client's team icon

## Syntax

```
$botTeamIcon[(size);(extension)]
```

## Parameters

- **size** *(number, optional)* — The size to use for the image
- **extension** *(text, optional)* — The extension to use for the image

## Return Value

- URL.

## Usage

```
$botTeamIcon[(size);(extension)] → result
```

## Example

```bdfd
$sendMessage[$botTeamIcon]
```
