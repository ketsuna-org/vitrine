---
layout: doc
title: $defer
translation_key: docs
category: "Control Flow"
function_name: defer
syntax: $defer[(ephemeral)]
description: Marks the interaction as acknowledged (optionally ephemeral) in the execution state. The engine already acknowledges interactions automatically.
---

`$defer` marks the interaction as acknowledged in the execution state. It is not needed to give a script more than 3 seconds: the engine already acknowledges the interaction itself before running the script.

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

- `$defer` sets three flags in the execution state: the interaction is acknowledged, a defer was requested, and (with `yes`/`true`) the response is ephemeral. Its position in the script does not matter.
- Reading the code, the only consumer of the "defer requested" and "ephemeral" flags is the sandbox, which simulates a `deferInteraction` effect. The normal executor does not send anything to Discord for `$defer`.
- Before running a script for an interaction, the executor acknowledges the interaction automatically, except when the script contains `$newModal`, `$callWorkflow`, `$eval` or `$funcCall` (a modal must be the first response). So a slow script does not hit the 3-second limit because of a missing `$defer`.
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
