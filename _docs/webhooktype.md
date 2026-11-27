---
layout: doc
title: $webhookType[]
translation_key: docs
category: "Entity Info"
function_name: webhookType
syntax: $webhookType[webhookID]
description: "Returns the type of a webhook"
---
# $webhookType — Returns the type of a webhook

## Syntax

```
$webhookType[webhookID]
```

## Parameters

- **webhookID** *(id, required)* — The webhook to pull data from

## Return Value

- WebhookType.

## Usage

```
$webhookType[webhookID] → result
```

## Example

```bdfd
$sendMessage[$webhookType[700]]
```
