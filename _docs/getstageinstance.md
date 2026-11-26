---
layout: doc
title: $getStageInstance[]
translation_key: docs
category: "Entity Info"
function_name: getStageInstance
syntax: $getStageInstance[stageID;(property)]
description: "Returns a stage instance of a guild."
---
# $getStageInstance — Returns a stage instance of a guild.

## Syntax

```
$getStageInstance[stageID;(property)]
```

## Parameters

- **stageID** *(id, required)* — The stage instance to get
- **property** *(text, optional)* — The property of the stage instance to return

## Return Value

- Json,Unknown.

## Usage

```
$getStageInstance[stageID;(property)] → result
```

## Example

```bdfd
$sendMessage[$getStageInstance[32;topic]]
```
