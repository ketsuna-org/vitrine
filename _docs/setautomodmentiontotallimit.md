---
layout: doc
title: $setAutomodMentionTotalLimit[]
translation_key: docs
category: "AutoMod"
function_name: setAutomodMentionTotalLimit
syntax: $setAutomodMentionTotalLimit[limit]
description: "Stages the mention limit (1 to 50) for the next $editAutomodRule."
---
# $setAutomodMentionTotalLimit — Stages the mention limit (1 to 50) for the next $editAutomodRule.

## Syntax

```
$setAutomodMentionTotalLimit[limit]
```

## Parameters

- **limit** *(String, required)* — Number

## Return Value

- None.

## Usage

```
$setAutomodMentionTotalLimit[limit] → result
```

## Example

```bdfd
$sendMessage[$setAutomodMentionTotalLimit[limit]]
```
