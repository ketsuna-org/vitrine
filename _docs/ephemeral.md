---
layout: doc
translation_key: docs
description: Makes the response visible only to the user who triggered the interaction.
category: "Components & Interactions"
---

# $ephemeral

Makes the response of the script ephemeral (visible only to the user who triggered the interaction).

## Syntax

```text
$ephemeral
```

## Description

`$ephemeral` takes no argument (`$ephemeral[yes]` is an error). It sets the ephemeral flag of the **response message**: the text written in the script, the embed functions, the component rows and a **Components V2 layout** (container, text display, ...). Its position in the script does not matter.

It does **not** apply to a message sent with `$sendMessage[]`: that function sends a separate channel message, which is never ephemeral. A script that only contains `$ephemeral` and `$sendMessage[...]` therefore sends a normal message.

When the response is sent to an interaction that the engine has already acknowledged (it does this automatically before running the script), the response is sent as an ephemeral follow-up.

## Examples

### Simple ephemeral response

```bdfd
$ephemeral
This message is visible only to you.
```

### With embeds

```bdfd
$ephemeral
$title[Information]
$description[Private data]
$color[#9B59B6]
```

### Components V2 response

```bdfd
$ephemeral
$addContainer[secret;#9B59B6]
$addTextDisplay[Only you can see this panel.]
```

### When a button is clicked

Workflow with the event `interactionCreate` and the custom ID filter (`customIdFilter`) `btn_secret`. `$customID` only exists in the script run for the click, never in the slash command.

```bdfd
$ephemeral
Secret action completed!
```

## Notes

- Verified by running the engine: the flag appears on the response payload (`"ephemeral": true`) and not on messages from `$sendMessage[]`.
- A Components V2 response is sent with the ephemeral flag and the Components V2 flag together, also when the interaction was not acknowledged beforehand (a script that contains `$newModal`, `$eval`, `$callWorkflow` or `$funcCall`).
- An ephemeral message cannot be edited by its ID (`$editMessageCV2`, `$editButton`, ...): Discord does not let the bot fetch it.
