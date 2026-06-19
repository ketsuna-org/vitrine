---
layout: doc
title: $webhookDescription
translation_key: docs
category: "Webhooks & Integrations"
function_name: webhookDescription
syntax: $webhookDescription[text]
description: Sets the description (body) of the embed for the next message sent via $webhookSend.
---

# $webhookDescription

The `$webhookDescription` function allows you to **set the description** (main body) of the embed for the next webhook message.

## Syntax

```
$webhookDescription[text]
```

## Parameters

| Parameter | Description |
|---|---|
| `text` | The content of the embed description. Supports markdown, mentions, and emojis. Max 4096 characters. |

## Return Value

This function does not return a value. It only sets the description of the next embed.

## Behavior

- The description appears below the title of the embed.
- Supports full markdown: bold, italics, links, lists, code blocks, etc.
- Line breaks are preserved.
- The description is reset after each `$webhookSend`.

## Examples

### Simple description

```bdfd
$webhookTitle[Server Statistics]
$webhookDescription[
**Members:** $membersCount
**Online:** $onlineMembers
**Bots:** $botCount
**Boost:** Level $boostLevel
]
$webhookColor[#5865F2]
$webhookSend[$webhookURL;]
```

### Formatted description

```bdfd
$webhookTitle[Moderation Report]
$webhookDescription[
**Moderator:** $username
**Action:** Ban
**User:** $userName[$mentioned[1]]
**Reason:** $message[2]

*Action performed on $date[$day]/$date[$month]/$date[$year]*
]
$webhookColor[#ED4245]
$webhookSend[$logHook;]
```

### Conditional description

```bdfd
$if[$checkContains[$message;!report]==true]
  $webhookTitle[New Report]
  $webhookDescription[
  **Reported by:** $username
  **Reported user:** $userName[$mentioned[1]]
  **Reason:** $noMentionMessage
  ]
  $webhookColor[#FEE75C]
  $webhookSend[$reportHook;]
$endif
```

## Notes

- Maximum 4096 characters for the description.
- The description is the main body of the embed.
- Combine title + description + color for a visually complete embed.
