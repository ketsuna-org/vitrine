---
layout: doc
title: $deleteComponent[]
translation_key: docs
category: "Components & Interactions"
function_name: deleteComponent
syntax: $deleteComponent[customID]
description: "Deletes a message component with given custom id"
---
# $deleteComponent — Deletes a message component with given custom id

## Syntax

```
$deleteComponent[customID]
```

## Parameters

- **customID** *(id, required)* — The component's custom id to delete

## Return Value

- String.

## Usage

```
$deleteComponent[customID] → result
```

## Example

```bdfd
$addButton[yes;a;Ok;primary]$addButton[no;b;No;secondary]$deleteComponent[a]
```
