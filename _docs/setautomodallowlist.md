---
layout: doc
title: $setAutomodAllowList[]
translation_key: docs
category: "AutoMod"
function_name: setAutomodAllowList
syntax: $setAutomodAllowList[words]
description: "Stages the allowed words of the rule for the next $editAutomodRule."
---
# $setAutomodAllowList — Stages the allowed words of the rule for the next $editAutomodRule.

## Syntax

```
$setAutomodAllowList[words]
```

## Parameters

- **words** *(String, required)* — Words

## Return Value

- None.

## Usage

```
$setAutomodAllowList[words] → result
```

## Example

```bdfd
$sendMessage[$setAutomodAllowList[words]]
```
