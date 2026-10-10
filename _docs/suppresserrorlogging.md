---
layout: doc
title: $suppressErrorLogging
translation_key: docs
category: "Control Flow"
function_name: suppressErrorLogging
syntax: $suppressErrorLogging
description: Sets the "suppress error logging" flag of the script. The engine does not read this flag, so it has no visible effect.
---

`$suppressErrorLogging` sets the "suppress error logging" flag of the script. In the current engine this flag has no visible effect.

## Syntax

```text
$suppressErrorLogging
```

`$suppressErrorLogging` takes no argument (`$suppressErrorLogging[x]` is refused: `Invalid argument count`). It returns an empty string.

## What it does

- It sets a flag on the execution context for the **current script** (the flag is reset when a new script starts).
- Reading the code of the engine and of the host packages, **nothing reads this flag**: it does not change what is logged, and it does not change what the user sees. Errors are raised and displayed exactly as without it.

## Relationship with Other Suppression Functions

| Function | User-visible errors |
|----------|--------------------|
| `$suppressErrors[(message)]` | Replaced by a text message (or nothing) |
| `$embedSuppressErrors[...]` | Replaced by a custom embed |
| `$suppressErrorLogging` | Unchanged (no effect) |

## Example

```bdfd
$suppressErrorLogging
$title[Silent Execution]
$description[The flag is set, but errors are still reported.]
$color[#5865F2]
```
