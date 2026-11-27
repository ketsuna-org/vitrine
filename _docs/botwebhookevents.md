---
layout: doc
title: $botWebhookEvents[]
translation_key: docs
category: "Entity Info"
function_name: botWebhookEvents
syntax: $botWebhookEvents[(separator)]
description: "Returns the client webhook event types"
---
# $botWebhookEvents — Returns the client webhook event types

## Syntax

```
$botWebhookEvents[(separator)]
```

## Parameters

- **separator** *(text, optional)* — The separator to use for every type

## Return Value

- ApplicationWebhookEventType[].

## Usage

```
$botWebhookEvents[(separator)] → result
```

## Example

```bdfd
$sendMessage[$botWebhookEvents]
```
