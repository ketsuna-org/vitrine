---
layout: doc
title: $loadComponent[]
translation_key: docs
category: "Responses"
function_name: loadComponent
syntax: $loadComponent[components]
description: "Alias of $loadComponents."
---
# $loadComponent — Alias of $loadComponents.

## Syntax

```
$loadComponent[components]
```

## Parameters

- **components** *(Json, required)* — Component, row or list of rows

## Return Value

- None.

## Usage

```
$loadComponent[components] → result
```

## Example

```bdfd
$sendMessage[$loadComponent[components]]
```
