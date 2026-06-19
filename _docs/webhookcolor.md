---
layout: doc
title: $webhookColor
translation_key: docs
category: "Webhooks & Integrations"
function_name: webhookColor
syntax: $webhookColor[hexColor]
description: Sets the color of the sidebar of the embed for the next message sent via $webhookSend.
---

# $webhookColor

The `$webhookColor` function allows you to **set the color of the embed** (left sidebar) for the next webhook message.

## Syntax

```
$webhookColor[hexColor]
```

## Parameters

| Parameter | Description |
|---|---|
| `hexColor` | Hexadecimal color code, with or without the `#` prefix. Examples: `#FF0000`, `5865F2`, `00FF00`. |

## Return Value

This function does not return a value. It only sets the color of the next embed.

## Behavior

- The color applies to the left sidebar of the embed.
- If no embed is defined (no `$webhookTitle` or `$webhookDescription`), the color is ignored.
- The color is reset after each `$webhookSend`.

## Examples

### Colored embed

```bdfd
$webhookTitle[Success]
$webhookDescription[The operation was completed successfully.]
$webhookColor[#57F287]
$webhookFooter[✅ Operation successful]
$webhookSend[$webhookURL;]
```

### Conditional colors

```bdfd
$if[$checkContains[$message;error]==true]
  $webhookColor[#ED4245]
  $webhookTitle[Error Detected]
$else
  $webhookColor[#5865F2]
  $webhookTitle[Information]
$endif
$webhookDescription[$message]
$webhookSend[$logHook;]
```

## Notes

- Use consistent colors for readability: red for errors, green for success, blue for info.
- The default Discord color is `#000000` (no colored sidebar).
- Very light colors may be hard to see in light theme.
