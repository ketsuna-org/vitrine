---
layout: doc
title: $loadComponents[]
translation_key: docs
category: "Responses"
function_name: loadComponents
syntax: $loadComponents[components]
description: "Adds components from Discord JSON (action rows, buttons and string select menus) to the response."
---
# $loadComponents — Adds components from Discord JSON (action rows, buttons and string select menus) to the response.

## Syntax

```
$loadComponents[components]
```

## Parameters

- **components** *(Json, required)* — Component, row or list of rows

## Return Value

- None.

## Usage

```
$loadComponents[components] → result
```

## Example

```bdfd
$sendMessage[$loadComponents[components]]
```
