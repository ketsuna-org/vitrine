---
layout: doc
title: $restore[]
translation_key: docs
category: "Image & Canvas"
function_name: restore
syntax: $restore[(canvas)]
description: "Restores the last saved transform and line settings."
---
# $restore — Restores the last saved transform and line settings.

## Syntax

```
$restore[(canvas)]
```

## Parameters

- **canvas** *(String, optional)* — Canvas name (empty: the current canvas)

## Return Value

- None.

## Usage

```
$restore[canvas] → result
```

## Example

```bdfd
$sendMessage[$restore[canvas]]
```
