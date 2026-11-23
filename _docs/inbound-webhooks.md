---
layout: doc
title: Inbound webhooks
category: "Meta"
api_type: general
description: Let another service run a workflow of your bot with an HTTP request. Create the webhook, find its URL, keep the secret, read the payload in BDFD and JavaScript, test with curl and fix the common errors.
permalink: /docs/inbound-webhooks/
locale: en
premium: true
translation_key: doc-inbound-webhooks
---

An inbound webhook gives one of your workflows a web address. When another service (a payment page, a game server, a CI job, a form, a script of your own) sends a request to that address, the workflow runs on your bot. The workflow can then read what was sent and post a message, update a variable, and so on.

Inbound webhooks are part of the Premium plan. A bot can have up to 5 of them.

## Create a webhook

1. Create the workflow that should run. A workflow must exist first: the app tells you so if there is none.
2. Open your bot, then the **Webhooks** page (the same page exists in the app and in the Studio).
3. Choose **Add webhook**, then fill in:
   - **Path**: the end of the URL, for example `orders/new`. Two webhooks of the same bot cannot share a path, and the path is not case sensitive.
   - **Workflow target**: the workflow to run.
   - **Webhook secret**: press **Generate**, or type your own. Use a long random value.
4. Save, then use **Copy URL**.

The secret is shown once when it is generated. The Manager does not give it back later, so a webhook created on another device or in the Studio shows "secret isn't stored on this device" when you copy the URL on a new one. Edit the webhook and set a new secret if you lost it. A disabled webhook behaves as if it did not exist.

## The URL

```
https://api.bot-creator.fr/gateway/bots/<bot id>/inbound/<path>
```

Use **Copy URL** in the app to get it with your bot id filled in. Only `POST` is accepted: a `GET` (for example opening the link in a browser) answers `405`.

The body must be a JSON object (a form-encoded body also works and gives one key per field; an empty body is an empty object). On a Dart bot it can be at most 256 KiB.

## Send the secret

Put the secret in a header. Both names work:

```
X-Webhook-Secret: <secret>
X-Bot-Webhook-Secret: <secret>
```

Passing it as `?secret=<secret>` also works but is discouraged: URLs end up in access logs. Prefer the header whenever the caller lets you choose one.

## Test it with curl

```bash
curl -X POST "https://api.bot-creator.fr/gateway/bots/<bot id>/inbound/orders/new" \
  -H "Content-Type: application/json" \
  -H "X-Webhook-Secret: <secret>" \
  -d '{"userID":"123456789012345678","order":{"id":42,"items":["sword","shield"]}}'
```

A success answers `{"ok":true,...}`. The workflow runs after that; read the bot's logs to see its result. The bot must be running to receive the request.

## Read the payload in a BDFD workflow

In a Dart (BDFD or visual) workflow, the request is available as variables and as two functions.

| What | How |
|---|---|
| A field of the JSON | `$inboundPayload[order.id]`. Use `.` for nested objects and a number for an array item: `$inboundPayload[order.items.0]`. Empty when the field is missing. |
| The whole body | `$inboundPayload` without argument returns it as JSON. Combine it with `$jsonParse` to loop over it. |
| A header | `$inboundHeader[X-Event]`, the name is not case sensitive. |
| Caller address | `((inbound.source.ip))` |
| Request id | `((inbound.request.id))` (the `X-Request-Id` header, when the caller sends one) |
| Top-level key | `((inbound.payload.userID))`, only for top-level keys. |
| Raw JSON | `((inbound.payload.json))` |
| A header as a variable | `((inbound.header.x-event))`, the name in lowercase. |

The secret and cookies are never passed to the workflow.

```bdfd
$sendMessage[Order $inboundPayload[order.id] for <@$inboundPayload[userID]>: $inboundPayload[order.items.0]]
```

## Read the payload in a JavaScript workflow

A JavaScript script receives a global object `webhook`:

| Field | Content |
|---|---|
| `webhook.payload` | The JSON body, already parsed. Nested fields work as usual. |
| `webhook.headers` | The request headers (names in lowercase). |
| `webhook.path` | The path of the webhook. |
| `webhook.sourceIp` | The caller address. |
| `webhook.requestId` | The `X-Request-Id` header, or an empty string. |

```js
const id = webhook.payload?.order?.id;
const user = webhook.payload?.userID;
await channel.send(`Order ${id} for <@${user}>`);
```

`interaction` and `message` do not exist in a webhook run.

## Common errors

| Answer | Meaning and fix |
|---|---|
| `401` Invalid webhook secret | The secret is missing or wrong. Send it in `X-Webhook-Secret`. On a JavaScript bot, a webhook without any secret is refused too: set one. |
| `403` Inbound webhooks are disabled | The bot cannot use inbound webhooks (Premium is required). Check the plan of the account that owns the bot. |
| `404` Inbound webhook path not found | The path is wrong, or the webhook is disabled. Compare it with the page of your bot. |
| `405` | You used `GET` (or another method). Use `POST`. |
| `409` Bot is not running | Start the bot, then send the request again. |
| `400` | The body is not a JSON object, or the webhook has no workflow target. |
| `413` | The body is larger than the limit (256 KiB on a Dart bot). |
| `500` | The request could not be handled. Open the logs of the bot to read the error; a failure inside the workflow itself is also written there. |
| `503` runner_not_assigned | The bot is not placed on a node yet. Start it and retry. |

Webhooks created with the API (`/v2/bots/<id>/inbound-webhooks`) follow the same rules.
