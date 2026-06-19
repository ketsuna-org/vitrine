---
layout: doc
title: $varExistsError[]
translation_key: docs
category: "Variables"
function_name: varExistsError
syntax: $varExistsError[name]
description: A compatibility stub that always returns an empty string. Provided so that BDFD scripts using the original bot's $varExistsError function continue to work without modification.
---

$varExistsError is a **no-op stub** included solely for backward compatibility with scripts originally written for the classic BDFD (Bot Designer For Discord) application. In the original BDFD, this function would halt execution with an error if the variable did not exist. In this implementation, it does nothing — it always returns an empty string and never interrupts execution.

## Why This Exists

When migrating BDFD scripts to Bot Creator, existing code may call `$varExistsError` to check that required variables are present before proceeding. Instead of removing these calls manually from every script, this stub silently accepts them, allowing the script to run without modification.

## Behavior

- Accepts one parameter (the variable name).
- Always returns an empty string.
- Never raises an error, regardless of whether the variable exists.
- Has no side effects on variables or the execution state.

## Recommendation

Do not use `$varExistsError` in new code. Use `$varExists` combined with your own conditional logic to handle missing variables gracefully:

```
$if[$varExists[required]==false]
Erreur : variable requise manquante.
$stop
$endif
```
