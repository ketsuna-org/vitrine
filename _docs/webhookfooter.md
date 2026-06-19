---
layout: doc
title: $webhookFooter
translation_key: docs
category: "Webhooks & Integrations"
function_name: webhookFooter
syntax: $webhookFooter[text]
description: Sets the text of the footer of the embed for the next message sent via $webhookSend.
---

# $webhookFooter

The `$webhookFooter` function allows you to **set the footer** of the embed for the next webhook message.

## Syntax

```
$webhookFooter[text]
```

## Parameters

| Parameter | Description |
|---|---|
| `text` | The text of the footer. Maximum 2048 characters. Supports BDFD variables. |

## Return Value

This function does not return a value. It only sets the footer of the next embed.

## Behavior

- The footer appears at the bottom of the embed, in smaller, grayed-out text.
- Ideal for timestamp information, signatures, or sources.
- The footer is reset after each `$webhookSend`.

## Examples

### Informative footer

```bdfd
$webhookTitle[Command Log]
$webhookDescription[
**Command:** $commandName
**User:** $username ($authorID)
**Channel:** $channelName
]
$webhookFooter[Logger • $date[$day]/$date[$month]/$date[$year] at $date[$hour]:$date[$minute]]
$webhookColor[#5865F2]
$webhookSend[$logHook;]
```

### Signature footer

```bdfd
$webhookTitle[Welcome!]
$webhookDescription[Welcome to **$serverName**, $username! We are now $membersCount members!]
$webhookFooter[Please read the rules in $channelName[$rulesChannelID]]
$webhookColor[#57F287]
$webhookSend[$welcomeHook;]
```

## Notes

- The footer is displayed in smaller, gray text by Discord.
- Maximum 2048 characters.
- Unlike the title and description, the footer does not support markdown.
