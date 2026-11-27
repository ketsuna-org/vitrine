---
layout: doc
title: $interactionDelete[]
translation_key: docs
category: "Interactions"
function_name: interactionDelete
syntax: $interactionDelete
description: "Deletes the reply of the current interaction. Does nothing outside an interaction."
---
# $interactionDelete — Deletes the reply of the current interaction. Does nothing outside an interaction.

## Syntax

```
$interactionDelete
```

## Parameters

None.

## Return Value

- String.

## Usage

```
$interactionDelete → result
```

## Example

```bdfd
$sendMessage[$interactionDelete]
```
