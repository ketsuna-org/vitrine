---
layout: doc
title: $webhookQuick[]
translation_key: docs
category: "Webhooks & Integrations"
function_name: webhookQuick
syntax: $webhookQuick[url;text]
description: "Sends a plain text message through a webhook, in one call (`$webhookSend` for embeds)."
---
# $webhookQuick — Sends a plain text message through a webhook, in one call (`$webhookSend` for embeds)

## Syntax

```
$webhookQuick[url;text]
```

## Parameters

- **url** *(URL, required)* — A Discord webhook URL.
- **text** *(text, required)* — 1 to 2000 characters.

## Return Value

- empty.

## Usage

```
$webhookQuick[https://discord.com/api/webhooks/ID/TOKEN;Hello]
```

## Important Notes

- Keep the webhook URL in a variable: it is a secret.

## Example

```bdfd
$webhookQuick[https://discord.com/api/webhooks/123456/abcdef;Hello]
```
