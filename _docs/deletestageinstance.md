---
layout: doc
title: $deleteStageInstance[]
translation_key: docs
category: "Moderation"
function_name: deleteStageInstance
syntax: $deleteStageInstance[stageID]
description: "Deletes a stage instance, returns bool."
---
# $deleteStageInstance — Deletes a stage instance, returns bool.

## Syntax

```
$deleteStageInstance[stageID]
```

## Parameters

- **stageID** *(id, required)* — The stage instance to delete

## Return Value

- Boolean.

## Usage

```
$deleteStageInstance[stageID] → result
```

## Example

```bdfd
$sendMessage[$deleteStageInstance[32]]
```
