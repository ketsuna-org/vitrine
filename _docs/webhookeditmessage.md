---
layout: doc
title: $webhookEditMessage[]
translation_key: docs
category: "Moderation"
function_name: webhookEditMessage
syntax: $webhookEditMessage[url;messageID;(content);(threadID)]
description: "Edits a webhook message, returns bool"
---
# $webhookEditMessage — Edits a webhook message, returns bool

## Syntax

```
$webhookEditMessage[url;messageID;(content);(threadID)]
```

## Parameters

- **url** *(text, required)* — The webhook url
- **messageID** *(id, required)* — The message to edit
- **content** *(text, optional)* — The new content for the message
- **threadID** *(id, optional)* — The thread this message belongs to

## Return Value

- Boolean.

## Usage

```
$webhookEditMessage[url;messageID;(content);(threadID)] → result
```

## Example

```bdfd
$sendMessage[$webhookEditMessage[https://discord.com/api/webhooks/700/abc;900;Edited]]
```
