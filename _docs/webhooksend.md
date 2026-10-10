---
layout: doc
title: $webhookSend
translation_key: docs
category: "Webhooks & Integrations"
function_name: webhookSend
syntax: $webhookSend[webhookURL;(content);(title);(url);(description);(color);(authorName);(authorIconURL);(footerText);(footerIconURL);(thumbnailURL);(imageURL);(timestamp)]
description: Sends a message (text and/or embed) through a Discord webhook, merging it with the data staged by the other $webhook functions.
---

# $webhookSend

The `$webhookSend` function **sends a message via a Discord webhook**. It sends the data staged for that webhook by `$webhookContent`, `$webhookTitle`, `$webhookDescription`, `$webhookFooter` and `$webhookColor`, completed by the optional arguments below.

## Syntax

```
$webhookSend[webhookURL;(content);(title);(url);(description);(color);(authorName);(authorIconURL);(footerText);(footerIconURL);(thumbnailURL);(imageURL);(timestamp)]
```

## Parameters

Between 1 and 13 arguments are accepted; only `webhookURL` is required. An empty or omitted optional argument leaves what was staged untouched.

| # | Parameter | Description |
|---|---|---|
| 1 | `webhookURL` | **Required.** The full Discord webhook URL (`https://discord.com/api/webhooks/ID/TOKEN`). An invalid URL raises `Invalid Discord webhook URL.` |
| 2 | `content` | Text of the message, 2000 characters maximum. If empty, content staged by `$webhookContent` is kept. |
| 3 | `title` | Embed title, 256 characters maximum. |
| 4 | `url` | Embed URL (`http`/`https`). It is applied to the title, so it has no effect without a title. |
| 5 | `description` | Embed description, 4096 characters maximum. |
| 6 | `color` | Embed color (same formats as `$webhookColor`). |
| 7 | `authorName` | Embed author name, 256 characters maximum. |
| 8 | `authorIconURL` | Embed author icon (`http`/`https`); only used when `authorName` is set. |
| 9 | `footerText` | Embed footer text, 2048 characters maximum. |
| 10 | `footerIconURL` | Embed footer icon (`http`/`https`); only used when `footerText` is set. |
| 11 | `thumbnailURL` | Embed thumbnail (`http`/`https`). |
| 12 | `imageURL` | Embed image (`http`/`https`). |
| 13 | `timestamp` | `yes`/`true` adds the current time to the embed; `no`/`false` does nothing; any other non-empty value raises `Invalid timestamp boolean.` |

## Return Value

An empty string. The message is sent to the webhook and the staged data for this webhook is cleared.

## Behavior

- The message must contain text content or an embed field (other than only a color or a timestamp); otherwise `Webhook message cannot be empty.` is raised.
- The total text of the embed (title, description, author name, footer text) cannot exceed 6000 characters.
- Values passed as arguments override the corresponding staged values.
- Staged data is detached before sending: a failed send does not replay it.

## Examples

### Simple sending

```bdfd
$webhookSend[https://discord.com/api/webhooks/123456/abcdef;Hello World!]
```

### Sending with embed (staged)

```bdfd
$webhookTitle[https://discord.com/api/webhooks/123456/abcdef;Title of the embed]
$webhookDescription[https://discord.com/api/webhooks/123456/abcdef;Detailed description here]
$webhookColor[https://discord.com/api/webhooks/123456/abcdef;#5865F2]
$webhookFooter[https://discord.com/api/webhooks/123456/abcdef;Footer text]
$webhookSend[https://discord.com/api/webhooks/123456/abcdef]
```

### Sending with embed (arguments)

```bdfd
$webhookSend[https://discord.com/api/webhooks/123456/abcdef;;New announcement;;$message;#5865F2]
```

## Notes

- Webhook URLs are sensitive: never expose them in public code.
