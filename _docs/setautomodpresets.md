---
layout: doc
title: $setAutomodPresets[]
translation_key: docs
category: "AutoMod"
function_name: setAutomodPresets
syntax: $setAutomodPresets[presets]
description: "Stages the keyword presets (Profanity, SexualContent, Slurs) for the next $editAutomodRule."
---
# $setAutomodPresets — Stages the keyword presets (Profanity, SexualContent, Slurs) for the next $editAutomodRule.

## Syntax

```
$setAutomodPresets[presets]
```

## Parameters

- **presets** *(String, required)* — Preset names

## Return Value

- None.

## Usage

```
$setAutomodPresets[presets] → result
```

## Example

```bdfd
$sendMessage[$setAutomodPresets[presets]]
```
