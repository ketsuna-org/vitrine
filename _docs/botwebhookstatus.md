---
layout: doc
title: $botWebhookStatus[]
translation_key: docs
category: "Entity Info"
function_name: botWebhookStatus
syntax: $botWebhookStatus
description: "Returns the client webhook event status"
---
# $botWebhookStatus — Returns the client webhook event status

## Syntax

```
$botWebhookStatus
```

## Parameters

None.

## Return Value

- ApplicationWebhookEventStatus.

## Usage

```
$botWebhookStatus → result
```

## Example

```bdfd
$sendMessage[$botWebhookStatus]
```
