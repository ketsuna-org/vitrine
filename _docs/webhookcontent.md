---
layout: doc
title: $webhookContent
translation_key: docs
category: "Webhooks & Integrations"
function_name: webhookContent
syntax: $webhookContent[text]
description: Sets the text content of the next message sent via $webhookSend. Alternative to the second parameter of $webhookSend.
---

# $webhookContent

The `$webhookContent` function allows you to **set the text content** of a webhook message, as an alternative to the second parameter of `$webhookSend`.

## Syntax

```
$webhookContent[text]
```

## Parameters

| Parameter | Description |
|---|---|
| `text` | The text of the message. Supports markdown, emojis, and mentions. Maximum 2000 characters. |

## Return Value

This function does not return a value. It only sets the content for the next `$webhookSend`.

## Behavior

- The defined content replaces the second parameter of `$webhookSend`.
- Supports all Discord markdown formatting.
- If both `$webhookContent` and `$webhookSend[url;text]` are used, the content of `$webhookContent` takes priority.

## Examples

### Simple content

```bdfd
$webhookContent[This is a message sent via webhook!]
$webhookSend[$webhookURL;]
```

### Formatted content

```bdfd
$webhookUsername[Announcements]
$webhookAvatarURL[$serverIcon]
$webhookContent[📢 **New announcement** from $username!
>>> $message]
$webhookSend[$webhookURL;]
```

### With embed and content

```bdfd
$webhookContent[Here are the details below:]
$webhookTitle[Important Details]
$webhookDescription[The detailed information can be found here.]
$webhookColor[#FEE75C]
$webhookSend[$webhookURL;]
```

## Notes

- The limit is 2000 characters for the text content.
- The text content appears above the embed if there is one.
- Use `>>> ` to create a block quote in the content.
