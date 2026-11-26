---
layout: doc
title: $launchActivity[]
translation_key: docs
category: "Interactions"
function_name: launchActivity
syntax: $launchActivity
description: "Answers the interaction by launching the Activity of the application (it must be the first response, and the application must have Activities enabled)."
---
# $launchActivity — Answers the interaction by launching the Activity of the application (it must be the first response, and the application must have Activities enabled).

## Syntax

```
$launchActivity
```

## Parameters

None.

## Return Value

- String.

## Usage

```
$launchActivity → result
```

## Example

```bdfd
$sendMessage[$launchActivity]
```
