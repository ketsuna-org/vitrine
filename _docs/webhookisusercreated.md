---
layout: doc
title: $webhookIsUserCreated[]
translation_key: docs
category: "Entity Info"
function_name: webhookIsUserCreated
syntax: $webhookIsUserCreated[webhookID]
description: "Checks whether given webhook is user created"
---
# $webhookIsUserCreated — Checks whether given webhook is user created

## Syntax

```
$webhookIsUserCreated[webhookID]
```

## Parameters

- **webhookID** *(id, required)* — The webhook to pull data from

## Return Value

- Boolean.

## Usage

```
$webhookIsUserCreated[webhookID] → result
```

## Example

```bdfd
$sendMessage[$webhookIsUserCreated[700]]
```
