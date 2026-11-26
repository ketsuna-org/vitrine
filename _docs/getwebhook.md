---
layout: doc
title: $getWebhook[]
translation_key: docs
category: "Entity Info"
function_name: getWebhook
syntax: $getWebhook[webhookID;(property)]
description: "Returns a webhook from a channel"
---
# $getWebhook — Returns a webhook from a channel

## Syntax

```
$getWebhook[webhookID;(property)]
```

## Parameters

- **webhookID** *(id, required)* — The webhook to get
- **property** *(text, optional)* — The property of the webhook to return

## Return Value

- Json.

## Usage

```
$getWebhook[webhookID;(property)] → result
```

## Example

```bdfd
$sendMessage[$getWebhook[700;name]]
```
