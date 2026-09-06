---
layout: doc
title: $sendResponse
translation_key: docs
category: "Components & Interactions"
function_name: sendResponse
syntax: $sendResponse
description: Sends a direct interaction response with optional ephemeral visibility. Preferred for button, select menu, and modal handlers.
---

# $sendResponse

`$sendResponse` sends a **direct reply** to an interaction (slash command, button, select menu, or modal). It is the recommended way to answer component interactions without building a full embed pipeline first.

## Syntax

```
$sendResponse[content]
```

### Ephemeral modifier

Append `// ephemeral` inside the brackets to make the response visible only to the user who triggered the interaction:

```
$sendResponse[Only you can see this // ephemeral]
```

## Parameters

| Parameter | Description | Required |
|-----------|-------------|:--------:|
| `content` | Text content of the response. Supports `((...))` placeholders. | Yes |

## Description

`$sendResponse` is optimized for **interaction contexts** (`$onInteraction` handlers and slash commands). Unlike `$sendMessage`, it responds directly to the pending interaction token.

Use it when you need a fast confirmation after a button click, select menu choice, or modal submission.

## Examples

### Button verification

```bdfd
$if[((interaction.customId))==button_verify]
  $sendResponse[Your account has been successfully verified! // ephemeral]
  $giveRole[((interaction.userId));112233445566778899]
$endif
```

### Modal submission

```bdfd
$if[((interaction.kind))==modal]
  $sendResponse[Profile successfully configured, ((user.username))! // ephemeral]
$endif
```

### Public role assignment feedback

```bdfd
$if[((interaction.customId))==role_dev]
  $sendResponse[✅ The **Developer** role has been added to your profile! // ephemeral]
$endif
```

## Related functions

- [$ephemeral](/docs/ephemeral/) — flag before `$sendMessage` for ephemeral visibility
- [$defer](/docs/defer/) — acknowledge slow interactions before responding
- [$reply](/docs/reply/) — reply threading flag used with `$sendMessage`
- [$sendMessage](/docs/sendmessage/) — full message with embeds and components
- [Interactions overview](/docs/interactions-overview/) — component workflow guide

## Notes

- Works in slash commands and `$onInteraction` handlers.
- The `// ephemeral` suffix is optional; omit it for public channel responses.
- For responses with embeds or multiple components, use `$sendMessage` after [$defer](/docs/defer/) if processing takes longer than 3 seconds.
