---
layout: doc
title: $messageWebhookID[]
translation_key: docs
category: "Entity Info"
function_name: messageWebhookID
syntax: $messageWebhookID[channelID;messageID]
description: "Returns the message's webhook id"
---
# $messageWebhookID — Returns the message's webhook id

## Syntax

```
$messageWebhookID[channelID;messageID]
```

## Parameters

- **channelID** *(id, required)* — The channel to pull message from
- **messageID** *(id, required)* — The message to get its webhook id

## Return Value

- Webhook.

## Usage

```
$messageWebhookID[channelID;messageID] → result
```

## Example

```bdfd
$messageWebhookID[30;1000]
$sendMessage[Done]
```
