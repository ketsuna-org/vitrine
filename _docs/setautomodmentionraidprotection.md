---
layout: doc
title: $setAutomodMentionRaidProtection[]
translation_key: docs
category: "AutoMod"
function_name: setAutomodMentionRaidProtection
syntax: $setAutomodMentionRaidProtection[enabled]
description: "Stages the mention raid protection for the next $editAutomodRule."
---
# $setAutomodMentionRaidProtection — Stages the mention raid protection for the next $editAutomodRule.

## Syntax

```
$setAutomodMentionRaidProtection[enabled]
```

## Parameters

- **enabled** *(String, required)* — true or false

## Return Value

- None.

## Usage

```
$setAutomodMentionRaidProtection[enabled] → result
```

## Example

```bdfd
$sendMessage[$setAutomodMentionRaidProtection[enabled]]
```
