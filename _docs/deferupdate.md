---
layout: doc
title: $deferUpdate[]
translation_key: docs
category: "Interactions"
function_name: deferUpdate
syntax: $deferUpdate
description: "Acknowledges the interaction without a reply or a "thinking" message, to update the message later."
---
# $deferUpdate — Acknowledges the interaction without a reply or a "thinking" message, to update the message later.

## Syntax

```
$deferUpdate
```

## Parameters

None.

## Return Value

- None.

## Usage

```
$deferUpdate
```

## Example

```bdfd
$sendMessage[$deferUpdate]
```
