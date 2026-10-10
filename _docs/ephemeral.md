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

`$ephemeral` takes no argument (`$ephemeral[yes]` is an error). It sets the ephemeral flag of the **response message**: the text written in the script, the embed functions and the component rows. Its position in the script does not matter.

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

### In an interaction

```bdfd
$if[$customID==btn_secret]
  $ephemeral
  Secret action completed!
$endif
```

## Notes

- Verified by running the engine: the flag appears on the response payload (`"ephemeral": true`) and not on messages from `$sendMessage[]`.
- Code reading only: a Components V2 response (container, text display, ...) does not take the flag from `$ephemeral`; its ephemeral state comes from the component definition, which the engine does not set.
