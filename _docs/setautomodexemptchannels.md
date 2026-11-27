---
layout: doc
title: $setAutomodExemptChannels[]
translation_key: docs
category: "AutoMod"
function_name: setAutomodExemptChannels
syntax: $setAutomodExemptChannels[channels]
description: "Stages the exempt channels (50 at most) for the next $editAutomodRule."
---
# $setAutomodExemptChannels — Stages the exempt channels (50 at most) for the next $editAutomodRule.

## Syntax

```
$setAutomodExemptChannels[channels]
```

## Parameters

- **channels** *(String, required)* — Channel IDs

## Return Value

- None.

## Usage

```
$setAutomodExemptChannels[channels] → result
```

## Example

```bdfd
$sendMessage[$setAutomodExemptChannels[channels]]
```
