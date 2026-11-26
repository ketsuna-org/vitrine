---
layout: doc
title: $botWebhookURL[]
translation_key: docs
category: "Entity Info"
function_name: botWebhookURL
syntax: $botWebhookURL
description: "Returns the client webhook event url"
---
# $botWebhookURL — Returns the client webhook event url

## Syntax

```
$botWebhookURL
```

## Parameters

None.

## Return Value

- URL.

## Usage

```
$botWebhookURL → result
```

## Example

```bdfd
$sendMessage[$botWebhookURL]
```
