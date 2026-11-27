---
layout: doc
title: $modal[]
translation_key: docs
category: "Components & Interactions"
function_name: modal
syntax: $modal[customID;title]
description: "Creates a modal"
---
# $modal — Creates a modal

## Syntax

```
$modal[customID;title]
```

## Parameters

- **customID** *(id, required)* — The custom id for this modal
- **title** *(text, required)* — The title for the modal

## Return Value

- String.

## Usage

```
$modal[customID;title] → result
```

## Example

```bdfd
$modal[form;Profile]
```
