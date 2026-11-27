---
layout: doc
title: $webhookExists[]
translation_key: docs
category: "Entity Info"
function_name: webhookExists
syntax: $webhookExists[webhookID]
description: "Checks whether given webhook id exists"
---
# $webhookExists — Checks whether given webhook id exists

## Syntax

```
$webhookExists[webhookID]
```

## Parameters

- **webhookID** *(id, required)* — The webhook id to check for

## Return Value

- Boolean.

## Usage

```
$webhookExists[webhookID] → result
```

## Example

```bdfd
$sendMessage[$webhookExists[700]]
```
