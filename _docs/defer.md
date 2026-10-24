---
layout: doc
title: $defer
translation_key: docs
category: "Control Flow"
function_name: defer
syntax: $defer[(ephemeral)]
description: Acknowledges the interaction (optionally ephemeral) when the script was not acknowledged beforehand, for example a script that can open a modal. The engine already acknowledges most interactions automatically.
---

`$defer` acknowledges the interaction and marks it as acknowledged in the execution state. For most scripts it is not needed to give more than 3 seconds: the engine already acknowledges the interaction itself before running the script. It matters for the scripts that are **not** acknowledged beforehand (see below).

## Syntax

```text
$defer
$defer[ephemeral]
```

| Parameter | Description |
|---|---|
| `ephemeral` | Optional. `yes` or `true` records that the deferred response is ephemeral; any other value is ignored (no error). |

`$defer` takes 0 or 1 argument and returns an empty string.

## What the engine does

- Before running a script for an interaction, the executor acknowledges the interaction automatically, except when the script contains `$newModal`, `$callWorkflow`, `$eval` or `$funcCall` (a modal must be the first response). In those scripts, **`$defer` acknowledges the interaction itself**: without it nobody would acknowledge, and the interaction token would expire after 3 seconds. The acknowledgement is ephemeral with `$defer[yes]` or when the script contains `$ephemeral`. If Discord refuses it, the error is `Could not defer the interaction: <cause>`.
- In every case `$defer` sets three flags in the execution state: the interaction is acknowledged, a defer was requested, and (with `yes`/`true`) the response is ephemeral. Its position in the script does not matter. In a script that was already acknowledged beforehand, or in a host that owns no interaction (such as the sandbox), it only sets these flags.
- Because `$defer` marks the interaction as acknowledged, `$newModal` called after it fails with `Modal must be the first interaction response.`

## Example

```bdfd
$defer
$wait[1s]
Done!
```

The text is sent when the script ends.

## Notes

- Calling it several times has no additional effect.
- To make the response ephemeral, use `$ephemeral`.
