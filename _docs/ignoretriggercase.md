---
layout: doc
title: $ignoreTriggerCase
translation_key: docs
category: "Flags & Debug"
function_name: ignoreTriggerCase
syntax: $ignoreTriggerCase
description: Makes the trigger of a prefix command case-insensitive in BDFD. Accepted in Bot Creator, where it has no effect.
---

# $ignoreTriggerCase

In BDFD (premium) this declaration makes a prefix command trigger case-insensitive.

## Syntax

```
$ignoreTriggerCase
```

## Behavior

- Takes no argument and returns an empty string.
- Bot Creator already matches triggers and aliases without regard to case (`!HeLp` runs `help`), and the trigger is decided before any script runs. The declaration is accepted so that imported BDFD code works, but it changes nothing.

## Examples

```bdfd
$ignoreTriggerCase
Pong!
```
