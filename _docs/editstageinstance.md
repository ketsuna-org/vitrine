---
layout: doc
title: $editStageInstance[]
translation_key: docs
category: "Moderation"
function_name: editStageInstance
syntax: $editStageInstance[stageID;(topic);(privacylevel)]
description: "Edits a stage instance, returns bool."
---
# $editStageInstance — Edits a stage instance, returns bool.

## Syntax

```
$editStageInstance[stageID;(topic);(privacylevel)]
```

## Parameters

- **stageID** *(id, required)* — The stage instance to edit
- **topic** *(text, optional)* — The new topic of the stage instance
- **privacylevel** *(text, optional)* — The new privacy level of the stage instance

## Return Value

- Boolean.

## Usage

```
$editStageInstance[stageID;(topic);(privacylevel)] → result
```

## Example

```bdfd
$sendMessage[$editStageInstance[32;New topic]]
```
