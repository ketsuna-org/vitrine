---
layout: doc
title: $webhookTitle
translation_key: docs
category: "Webhooks & Integrations"
function_name: webhookTitle
syntax: $webhookTitle[text]
description: Sets the title of the embed for the next message sent via $webhookSend.
---

# $webhookTitle

The `$webhookTitle` function allows you to **set the title** of the embed for the next webhook message.

## Syntax

```
$webhookTitle[text]
```

## Parameters

| Parameter | Description |
|---|---|
| `text` | The title of the embed. Maximum 256 characters. Supports emojis and variables. |

## Return Value

This function does not return a value. It only sets the title of the next embed.

## Behavior

- The title appears at the top of the embed, in larger, bold text.
- If no title is defined but a description is, the embed will be created without a title.
- The title is reset after each `$webhookSend`.

## Examples

### Dynamic title

```bdfd
$webhookTitle[🔨 Moderation Action]
$webhookDescription[
**Action:** $message[1]
**User:** $userName[$mentioned[1]]
**Reason:** $noMentionMessage
]
$webhookColor[#ED4245]
$webhookFooter[Moderation • $username]
$webhookSend[$modHook;]
```

### Title with emoji

```bdfd
$webhookTitle[✅ Task Completed]
$webhookDescription[The automatic data backup was completed successfully.]
$webhookColor[#57F287]
$webhookSend[$webhookURL;]
```

### Multiple embeds (conceptual)

```bdfd
$webhookTitle[First embed]
$webhookDescription[Content of the first embed.]
$webhookSend[$webhookURL;]

$webhookTitle[Second embed]
$webhookDescription[Content of the second embed.]
$webhookColor[#FEE75C]
$webhookSend[$webhookURL;]
```

## Notes

- Maximum 256 characters for the title.
- The title is bold and larger than the description.
- An embed can exist without a title (description only), but a title alone (without description) also works.
